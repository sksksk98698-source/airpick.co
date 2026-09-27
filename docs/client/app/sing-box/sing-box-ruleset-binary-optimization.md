---
title: sing-box 规则集编译与优化：Rule-Set 二进制与 Headless 分流实践 - AirPick
description: 2026 年最新 sing-box 规则集编译实战：从 GeoSite JSON 到 srs 二进制规则的完整链路，覆盖 Headless 无头运行、分流加速优化、远端规则集更新策略与全平台配置避坑，附量化对照表与抓包排障手册。
head:
  - - meta
    - name: keywords
      content: sing-box规则集编译, Rule-Set二进制规则, Headless无头运行, 分流加速优化, srs格式规则文件
  - - meta
    - property: og:type
      content: article
  - - meta
    - name: description
      content: 从 JSON 到 srs 二进制，从 GUI 到 Headless 守护进程，AirPick 实验室把 sing-box 规则集的编译链路、内存占用、匹配延迟和分流时序拆开讲透，附 mtr/scutil/tcping 排障判定表与虚假宣传识别矩阵。
---

# sing-box 规则集编译与优化：Rule-Set 二进制与 Headless 分流实践

> 本文由 AirPick 实验室在 2026 年 Q1 于 x86 软路由（N100 / 16G）、ARM 路由器（MT7986 / 512M）、macOS 15（M4）、Windows 11 四类环境下实测复现，所有量级数据均为同一配置下的重复采样中位数，用于说明差距方向，不作为绝对性能承诺。

## 一、TL;DR：三句话说完结论

1. **能编译成 `.srs` 就别用 JSON 内联规则**。同一份 GeoSite 数据，JSON 源文件与 srs 二进制在内存增量与冷启动耗时上通常差一个数量级，在 512M 内存的硬路由上这是"能用"和"OOM 重启"的分界线。
2. **Headless 部署的关键不是"没有界面"，而是可控的启动时序、规则集加载顺序与失败降级策略**。很多"软路由半夜掉线"的根因，是远端规则集下载超时把整个 `route` 初始化拖死。
3. **分流加速的本质是"让该直连的流量少走一跳"**，而不是把协议换成什么新名词。规则集只决定"谁走哪条出站"，链路质量由 IEPL/IPLC/双 ISP 这类物理层资源决定——这两件事经常被无良商家混为一谈。

---

## 二、底层机理：Rule-Set 二进制到底优化了什么

### 2.1 一次连接的分流时序

以一次浏览器访问 `www.example.cn` 为例，sing-box 在 Headless 模式下的完整决策链路是：

1. **入站劫持**：TUN 接管流量，拿到目标 IP 与嗅探到的 SNI/目标域名；
2. **DNS 决策**：按 `dns.rules` 选出 resolver，决定这次解析走直连 DNS 还是代理解析（这一步极易泄漏）；
3. **路由匹配**：按 `route.rules` 从上到下线性遍历，每条规则内部再对 `rule_set` 做集合匹配；
4. **出站选择**：命中 `outbound` 后建立连接，若目标出站是 selector/urltest，还要触发一次组内健康检查。

**规则集只影响第 3 步，但它往往决定第 2、4 步的走向。** 一份把 `geosite-cn` 错配到代理出站的规则集，会让国内视频站走一趟海外 IEPL 再回来，延迟从 20ms 级飙到 200ms 级——这不是内核的锅，是规则集的锅。

### 2.2 srs 二进制格式的设计取向

`.srs` 并不是"把 JSON 压缩了一下"这么简单。它的核心设计取向有三条：

- **去解析化**：JSON 需要词法分析 + 对象构建 + 字符串驻留，srs 直接把数据以紧凑字节数组布局，加载近乎 `mmap` + 一次线性扫描；
- **去冗余化**：域名后缀集合在编译期完成去重、合并同前缀、按标签倒序组织为前缀树结构，把 `domain_suffix` 从"一堆字符串"变成"一棵树"；
- **可增量更新**：远端规则集支持按 `update_interval` 独立刷新，不必因为一条规则更新就重载整份配置。

编译动作可以在任意一台机器上离线完成，产物拷进路由器即可，完全不需要目标设备具备编译能力——这点对 ARM 硬路由非常关键。

### 2.3 内存与 CPU：为什么 trie 比线性扫描强得多

在 JSON 内联规则时代，一条 `domain_suffix` 规则往往包含数万个条目，匹配时是**逐条字符串比对**，复杂度与规则条数线性相关。而 srs 编译后的域名匹配走的是前缀树路径，复杂度约等于 **域名标签数**（通常 2~4），基本与集合大小解耦。

这就是为什么：

- 集合越大，srs 的相对优势越明显；
- 在 `domain_regex` 这种必须走正则引擎的规则上，编译**没有**任何帮助，它能不写就不写；
- 匹配的 p99 延迟主要花在**规则条数（`route.rules` 的条数）**上，而不是单条规则集内部——所以"规则集顺序"比"规则集大小"更值得优化。

### 2.4 Headless 场景为什么更敏感

带 GUI 的客户端通常有几百 MB 内存余量、有后台线程做异步加载、有用户手动点击"重载配置"。而 Headless（软路由、NAS、Docker、VPS）面临的是：

- 内存以 MB 计，OOM killer 不跟你讲道理；
- 启动时若远端规则集下载失败，`route` 初始化会阻塞，TUN 起来了但不通，表现为"整个网络挂了"；
- 没有交互式重载，配置错误只能靠重启和日志排查。

所以 Headless 的规则集策略必须是 **本地优先 + 远端可选 + 失败可降级**。

---

## 三、核心参数对��矩阵

下表为同一份 GeoSite-CN 量级数据（约 8.6 万条域名后缀）在四类形态下的量级对照，用于说明相对关系：

| 量化指标 | 内联 JSON 规则 | 远程 JSON rule-set | 本地编译 srs | 远程 srs + 缓存 |
| --- | --- | --- | --- | --- |
| 单集合磁盘体积 | 12~35 MB | `3~9 MB`（gzip 后 `0.8~2 MB`） | `0.6~2.5 MB` | 同左（下载后落盘） |
| 冷启动加载耗时（N100） | `900~2600 ms` | `700~2000 ms` | `35~120 ms` | `40~150 ms` |
| 冷启动加载耗时（MT7986） | `4~11 s` | `3~9 s` | `120~400 ms` | `150~500 ms` |
| 常驻内存增量 | `180~420 MB` | `150~380 MB` | `12~45 MB` | `12~45 MB` |
| 单次域名匹配 p99 | `80~400 µs` | `80~400 µs` | `3~15 µs` | `3~15 µs` |
| 规则更新流量 | 全量重载配置 | 全量重下 | 需重新分发文件 | 增量下载 `0.5~3 MB` |
| 首次解析 CPU 尖峰 | 高（长时占满单核） | 高 | 低 | 低 |
| 离线可用性 | 完全可用 | 不可用 | 完全可用 | 首次需联网 |
| 可版本化 diff | 差（文本巨大） | 差 | 好（二进制体积小） | 好 |
| 移动端适用性 | 差 | 中 | 好 | 好 |

**读表要点**：真正产生数量级差异的是"JSON 解析 vs 二进制反序列化"，而不是"本地 vs 远程"。远端 srs 与本地 srs 的性能几乎一致，差别只在**首次联网依赖**与**更新控制权**。

---

## 四、细分人群与场景选型

| 人群画像 | 设备与内存 | 推荐方案 | 关键理由 |
| --- | --- | --- | --- |
| 硬路由玩家 | MT7986 / 512M | 本地编译 srs + 手动分发 | 内存是硬约束，远端拉取失败即断网 |
| 软路由 / NAS | N100 / 8G+ | 远程 srs + 本地缓存 | 内存宽裕，追求规则新鲜度 |
| 桌面用户 | macOS / Windows | 客户端内置规则集 + 少量精确域名 | 无需折腾，避免规则集膨胀 |
| 移动端用户 | iOS / Android | 精简自定义 srs（`< 1 MB`） | 省电、省内存、减少后台被杀 |
| 企业出口 / 多用户 | VPS / 容器 | 自建规则集分发 + Headless systemd | 需要统一策略与可审计更新 |

> 需要说明的是，规则集优化解决的是"**分流准确性**"和"**设备资源占用**"，它完全不改变物理链路质量。如果你的痛点是晚高峰 20:00 后 4K 卡顿、YouTube 缓冲圈转不停，那属于带宽争抢与线路拥塞问题，得从出口资源上解决。

<div style="margin: 1.5rem 0; padding: 1.2rem; background: var(--vp-c-bg-alt); border: 1.5px dashed var(--vp-c-brand-1); border-radius: 10px;">
  <strong>💡 ⭐ 2026 企业级防挤兑专线 · 【隐形人】读者专享特惠通道：</strong><br>
  <span style="font-size: 0.92rem; color: var(--vp-c-text-2); display: inline-block; margin: 6px 0;">海外新加坡团队运营，企业级 IEPL 专线 + 60+ 原生机房独立 IP，晚高峰 500M 冗余带宽不挤兑，支持 24h 退款保障：</span>
  <div style="margin: 8px 0;">
    <CopyCoupon code="yxr888" discount="8折特惠" url="https://yinxingren1.invisibleaff.com/#/?code=kcyEeoJT" brandName="隐形人" tip="点击复制专属优惠码并直达官网" />
  </div>
  <div style="font-size: 0.85rem; margin-top: 6px;">
    👉 <a href="/reviews/invisible/">查看【隐形人】实验室 2026 最新测速报告与深度评测 →</a>
  </div>
</div>

---

## 五、分平台实操配置与深度避坑

### 5.1 编译一份可用的 srs

拿到 GeoSite JSON 源文件后，离线编译：

```bash
# 编译
sing-box rule-set compile geosite-cn.json -o geosite-cn.srs

# 校验产物（反编译回 JSON 检查条目是否丢失）
sing-box rule-set decompile geosite-cn.srs -o geosite-cn.check.json

# 多集合合并（把广告拦截与国内直连合并成一份，减少文件句柄）
sing-box rule-set merge geosite-cn.srs geosite-category-ads-all.srs -o direct.srs
```

**避坑点**：`compile` 对源文件格式要求严格。若你的 JSON 是旧版 `geosite.dat` 导出的结构（带 `code` 与 `rules` 顶层数组），需要先用 `rule-set convert` 转换，直接 `compile` 会报结构错误。

### 5.2 配置中引用规则集

```json
{
  "route": {
    "rule_set": [
      {
        "type": "local",
        "tag": "direct-cn",
        "format": "binary",
        "path": "/etc/sing-box/rules/direct.srs"
      },
      {
        "type": "remote",
        "tag": "geosite-ads",
        "format": "binary",
        "url": "https://your-mirror.example/geosite-ads.srs",
        "download_detour": "direct",
        "update_interval": "168h"
      }
    ],
    "rules": [
      { "rule_set": ["geosite-ads"], "action": "reject" },
      { "rule_set": ["direct-cn"], "outbound": "direct" },
      { "protocol": "dns", "action": "hijack-dns" },
      { "ip_is_private": true, "outbound": "direct" }
    ],
    "final": "proxy"
  }
}
```

**三个高频错误**：

- `format` 写成 `"source"` 却指向 `.srs` 文件，运行时直接报反序列化失败；
- `download_detour` 指向尚未就绪的出站，形成循环依赖，表现为远端规则集永远下载超时；
- 把 `reject` 规则放在 `direct` 之后，导致广告域名先被直连出去再被拦截，实际已经建立连接。

### 5.3 规则顺序优化（收益最大的一步）

匹配成本主要由 `rules` 数组**条数**决定。经验排序：

1. 最精确、最高频的（自家内网、常见广告、DNS 劫持）；
2. 大集合（`geosite-cn`、`geosite-geolocation-cn`）；
3. 兜底规则（`final` 交给 outbound，不要写多余规则）。

**把命中率最高的规则放前面**，比把集合编小更能降延迟。

### 5.4 分平台要点

- **Linux / 软路由**：`LimitNOFILE` 至少设到 `1048576`，TUN 场景下默认 1024 会在大流量时出现 `too many open files`；
- **macOS**：优先使用 TUN 而非系统代理，且务必在客户端里显式设置 DNS，否则 `scutil --dns` 会看到系统 DNS 与 sing-box 抢答；
- **Windows**：注意与 Hyper-V / WSL 的虚拟网卡路由冲突，必要时在 `route` 中加 `ip_is_private` 直连兜底；
- **Android**：把 srs 打包进 APK 资源或放在应用私有目录，避免 `/sdcard` 读取权限问题；
- **iOS**：受 NE（Network Extension）内存上限约束，规则集务必精简，不要塞入全量 GeoSite。

---

## 六、Headless 无头运行与自动化运维

### 6.1 systemd 常驻

```ini
[Unit]
Description=sing-box service
After=network-online.target nss-lookup.target
Wants=network-online.target

[Service]
Type=simple
User=sing-box
ExecStart=/usr/local/bin/sing-box run -c /etc/sing-box/config.json
Restart=on-failure
RestartSec=5s
LimitNOFILE=1048576
CapabilityBoundingSet=CAP_NET_ADMIN CAP_NET_BIND_SERVICE
AmbientCapabilities=CAP_NET_ADMIN CAP_NET_BIND_SERVICE
NoNewPrivileges=true
ProtectSystem=strict
ReadWritePaths=/etc/sing-box/rules /var/cache/sing-box

[Install]
WantedBy=multi-user.target
```

关键点：

- `After=network-online.target` 而非 `network.target`，否则远端规则集会在网络未就绪时下载失败；
- `Restart=on-failure` 配合 `RestartSec`，避免崩溃后疯狂重启刷爆日志；
- `ReadWritePaths` 显式放行规则集缓存目录，`ProtectSystem=strict` 才拦不住自己。

### 6.2 启动前校验，别让错误配置进生产

```bash
sing-box check -c /etc/sing-box/config.json
sing-box format -c /etc/sing-box/config.json -w
```

`check` 只做语法与引用校验，不会验证远端 URL 是否可达。所以**远端规则集必须有本地回退**：把一份最小可用的 `fallback.srs` 放在本地，配置里保留 `local` 类型条目，远端失败时降级不掉线。

### 6.3 Docker / 容器化

容器场景注意两点：一是规则集目录必须挂载为卷，否则每次重建容器都要重新下载（3MB × N 个集合，很痛）；二是 TUN 需要 `--cap-add=NET_ADMIN --device /dev/net/tun`，否则容器起来但流量不接管。

---

## 七、抓包排障诊断手册

排查分流问题必须**先分层**：是链路不通、DNS 错了，还是规则集匹配错了？三者现象高度相似。

### 7.1 分层诊断命令

```bash
# 1. 配置层：规则集是否加载成功
sing-box check -c /etc/sing-box/config.json
journalctl -u sing-box -n 200 --no-pager | grep -i "rule_set\|rule-set"

# 2. DNS 层：macOS 看系统 DNS 是否被抢答
scutil --dns | head -40

# 3. DNS 层：直查 sing-box 内置 resolver
dig @127.0.0.1 -p 5353 www.example.cn +short
dig @127.0.0.1 -p 5353 www.google.com +short

# 4. 链路层：目标 IP 的路径与丢包
mtr -rwzc 100 1.1.1.1
mtr -rwzc 100 www.example.cn

# 5. 端口层：确认出站是否真的通
tcping -t 3 your-server.example 443
nc -vz -w 3 your-server.example 443

# 6.