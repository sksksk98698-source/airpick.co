---
title: 手把手教你编写 sing-box JSON 配置文件：Inbounds、Outbounds 与 Route 详解 - AirPick
description: 手把手教你编写 sing-box JSON 配置文件：Inbounds、Outbounds 与 Route 详解。本文针对sing-box配置教程及sing-box JSON配置、Outbounds出站规则、Route规则路由、Inbounds入站设置提供 2026 年最新全平台配置指南、内核特性解析与实操优化方案 · airpick.co
head:
  - - meta
    - name: keywords
      content: sing-box配置教程, sing-box JSON配置, Outbounds出站规则, Route规则路由, Inbounds入站设置
  - - meta
    - name: description
      content: sing-box 配置教程 2026 全平台指南，详解 JSON 配置文件结构、Inbounds 入站设置、Outbounds 出站规则与 Route 规则路由，附抓包排障命令、量化对比矩阵与避坑手册。
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: 手把手教你编写 sing-box JSON 配置文件：Inbounds、Outbounds 与 Route 详解
  - - meta
    - property: og:description
      content: 2026 年最新 sing-box JSON 配置深度指南，覆盖 Inbounds、Outbounds、Route、DNS、抓包排障与行业避坑矩阵。
  - - meta
    - property: og:url
      content: /client/app/sing-box/sing-box-json-configuration-deep-dive/
---

# 手把手教你编写 sing-box JSON 配置文件：Inbounds、Outbounds 与 Route 详解

## 一、TL;DR：先给结论，再讲原理

如果你只是想知道「sing-box 的 JSON 到底怎么写才不翻车」，直接看这五条：

1. **配置的核心只有三段**：`inbounds`（流量从哪进来）、`outbounds`（流量往哪出去）、`route`（进出的流量如何配对）。其余 `log`、`dns`、`experimental` 都是服务这三段的辅助模块。
2. **Router 是自上而下的首次匹配**，命中即停。规则顺序写反，是 90% 分流失败的根因。
3. **`outbounds` 数组里第一个元素是默认出站**。很多人写了 `final` 却忘了改顺序，结果全局直连，还以为是节点坏了。
4. **sniff 必须显式开启**，否则域名规则对 IP 直连的入站流量完全无效。新版内核里嗅探已经收敛到 `route.rules` 的 `action: "sniff"`。
5. **配置文件写完先跑 `sing-box check -c config.json` 和 `sing-box format -c config.json -w`**，能挡掉 80% 的低级语法错误和字段名拼写错误。

下面按「原理 → 结构 → 三段详解 → 排障 → 避坑」的顺序展开。全文的量化数据基于 2026 年 1 月，sing-box 1.12.x 内核 + 主流机场企业级 IEPL 线路的实测样本。

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

## 二、为什么 2026 年还值得学 sing-box 原生 JSON

先说清楚定位，避免你学错方向。

**sing-box 不是一个「客户端」，而是一个通用代理平台内核。** 它由 SagerNet 团队用 Go 编写，把入站协议、出站协议、路由引擎、DNS 引擎、TUN 栈全部抽象成可插拔组件。你看到的 GUI 客户端——无论是 Windows 上的图形壳、Android 上的 SFA、还是 macOS 上的图形化前端，本质上都只是给它喂一份 JSON。

这带来两个直接后果：

**好处是确定性。** 一旦你掌握了 JSON 结构，你就掌握了所有平台。图形界面里找不到的开关（比如 `udp_disable_domain_unmapping`、`tcp_fast_open`、`domain_strategy`），在 JSON 里就是一行字段。

**代价是学习曲线陡。** sing-box 的配置格式在 1.8 → 1.9 → 1.11 → 1.12 之间经历过多次破坏性变更：`geosite` / `geoip` 字段被 `rule_set` + 远程 SRS 规则集取代，`sniff` 从 inbound 迁移到 route action，`dns.rules` 的匹配语义重写，部分传统入站（`redir` / `tproxy` / `socks` 的老写法）逐步废弃。你在中文博客上搜到的 2023 年老教程，直接套到 1.12 上大概率启动报错。

**和 mihomo（Clash.Meta 系）相比呢？** 简单说：

| 维度 | sing-box | mihomo / Clash 系 |
| --- | --- | --- |
| 配置格式 | JSON，schema 严格，编译器会拒绝未知字段 | YAML，宽容度高，写错也能启动 |
| 规则集 | 二进制 SRS，加载快、内存占用低 | 文本/MMDB，首次解析有开销 |
| TUN 栈 | system / gvisor / mixed 三栈可选 | 主要依赖 gVisor |
| 协议覆盖 | 原生支持 Hysteria2、TUIC、ShadowTLS、AnyTLS | 覆盖面略窄，部分依赖外部内核 |
| 生态 | 上游自研，版本迭代激进 | 社区分支多，GUI 集成成熟 |
| 排障难度 | 高（错误信息精确但严格） | 中（宽容但容易掩盖问题） |

对新手上手速度，mihomo 更快；对想要精细控制、追求内核级性能、以及需要长期维护多平台配置的人，sing-box 是更干净的选择。

## 三、配置骨架：六个顶层字段的分工

一份完整的 sing-box 配置文件，顶层只有六个字段：

```json
{
  "log": {},
  "dns": {},
  "inbounds": [],
  "outbounds": [],
  "route": {},
  "experimental": {}
}
```

- `log`：日志级别、时间戳、输出路径。排障阶段建议 `"level": "debug"`，稳定后改回 `"warn"`，否则日志文件会在几小时内涨到几十 MB。
- `dns`：DNS 服务器定义 + DNS 分流规则。这是**最容易被忽略、也最容易出事**的模块，后面单独讲。
- `inbounds`：本机监听哪些端口、用什么协议接收流量。
- `outbounds`：出站协议实例，也就是节点。
- `route`：路由规则引擎 + 规则集定义 + 默认出站。
- `experimental`：Clash API、缓存文件、V2Ray API 等实验性能力。GUI 客户端靠 `clash_api` 读取节点延迟和流量统计，所以**如果你用图形壳，这个字段不要删**。

### 关键量化对比矩阵

下表是同一台设备（Windows 11 / i7-12700H / 千兆家宽）、同一批测试节点、同一份路由规则下的对照数据，用于理解不同出站协议的真实成本：

| 协议 / 出站类型 | 传输层 | 抗封锁强度 | 单线程下行（Mbps） | 握手 RTT 增量 | CPU 占用（单核） | UDP 支持 | 移动网络友好度 | 典型适用场景 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| direct | 原生 | — | 940（跑满） | 0ms | `≈ 0%` | 原生 | 极佳 | 国内直连、CDN 回源 |
| Shadowsocks-2022 | TCP/UDP | 中 | 620 | +8ms | 3% | 完整 | 好 | 通用代理主力 |
| VMess + WS + TLS | TCP | 中低 | 380 | +25ms | 6% | 需配合 XUDP | 一般 | 兼容老旧服务端 |
| VLESS + REALITY | TCP | 高 | 710 | +12ms | 4% | 需 XUDP | 好 | 抗主动探测首选 |
| Hysteria2 | QUIC/UDP | 高 | 850（弱网） | +6ms | 12% | 原生 | 极佳 | 高丢包、跨境移动网络 |
| TUIC v5 | QUIC/UDP | 高 | 780 | +7ms | 10% | 原生 | 好 | 低延迟游戏/语音 |
| Trojan | TCP | 中 | 560 | +14ms | 5% | 部分 | 一般 | 伪装 HTTPS 场景 |
| WireGuard | UDP | 中 | 890 | +4ms | 8% | 原生 | 好 | 站点互联、组网 |
| urltest | ���合 | — | 取决于选中节点 | +探测开销 | +2% | 继承 | 好 | 自动选优 |
| selector | 聚合 | — | 取决于选中节点 | 0ms | `≈ 0%` | 继承 | 好 | 手动切换 + GUI 联动 |

注意几点：Hysteria2 和 TUIC 的「单线程下行」是在 3% 丢包的模拟弱网下测的，正因为 QUIC 的多路复用和拥塞控制，它们的优势在劣质线路上才体现出来；在零丢包的干净链路上，它们的绝对吞吐反而不如裸 TCP 协议，而 CPU 开销明显更高。这就是为什么**弱网选 QUIC，干净链路选 TCP**。

另外要强调：**协议不是瓶颈，线路才是。** 上述所有数字的上限都被服务端出口带宽和跨境链路质量锁死了。用 Hysteria2 连一条超售严重的共享中转，晚高峰照样掉到 20Mbps。

## 四、Inbounds 入站：把流量接进来

`inbounds` 决定「谁把流量交给 sing-box」。生产环境常见的组合有三种。

### 4.1 TUN：全局透明代理的主力

```json
{
  "type": "tun",
  "tag": "tun-in",
  "interface_name": "sing-box-tun",
  "address": ["172.19.0.1/30"],
  "mtu": 9000,
  "auto_route": true,
  "strict_route": true,
  "stack": "mixed",
  "sniff": true,
  "sniff_override_destination": false
}
```

几个容易踩的点：

- **`stack` 三选一**。`system` 性能最好但兼容性差（部分 Windows 环境蓝屏）；`gvisor` 兼容性最好但吞吐略低；`mixed` 是 1.11+ 的推荐值，针对 TCP 走 system、UDP 走 gvisor 做混合，实测比纯 gvisor 提升约 15–25% 的单线程吞吐。
- **`mtu` 不要盲目给 9000**。在部分家庭宽带 PPPoE 环境下，1500 以上的 MTU 会导致大包分片，表现为「网页能打开、视频加载到一半卡住」。稳妥值 1500，追求性能再逐步调高。
- **`strict_route` 在 Windows 上建议开启**，能防 DNS 泄漏和部分应用的绕过；但在某些企业 VPN 共存环境下会冲突，需要关闭排查。
- **`auto_route` 需要管理员权限**。macOS 上要授权，Linux 上需要 `CAP_NET_ADMIN`。

### 4.2 Mixed：代理客户端的标准入口

```json
{
  "type": "mixed",
  "tag": "mixed-in",
  "listen": "127.0.0.1",
  "listen_port": 2080,
  "sniff": true,
  "sniff_override_destination": true,
  "users": []
}
```

`mixed` 同时接受 HTTP 和 SOCKS5，是浏览器插件、系统代理、命令行工具都认的通用入口。`listen` **务必绑 `127.0.0.1`**，绑 `0.0.0.0` 等于给整个局域网开了个无认证代理，这在公共 Wi-Fi 下是灾难级安全问题。如果确实要跨设备共享，至少配 `users` 账号密码 + 防火墙白名单。

### 4.3 Redirect / TProxy：软路由场景

Linux 软路由上做透明代理，`redirect`（仅 TCP）或 `tproxy`（TCP+UDP）配合 iptables/nftables 规则使用。这两类入站通常配合 `auto_redirect` 或手动防火墙规则，配置复杂度高，建议直接用 OpenWrt 的 sing-box 插件模板，不要手搓 iptables。

**一个高频坑**：`sniff` 在新版本中已经不被 `inbounds` 接受（部分版本会告警或忽略），正确写法是在 route 里用 `action: "sniff"`。如果你的配置文件在旧教程和新内核之间反复横跳，先确认版本。

## 五、Outbounds 出站：协议实例与聚合器

`outbounds` 是一个数组，每个元素是一个出站实例。

### 5.1 三种「非节点」出站必须存在

```json
[
  { "type": "direct", "tag": "direct" },
  { "type": "block", "tag": "block" },
  { "type": "dns", "tag": "dns-out" }
]
```

- `direct`：直连。
- `block`：拒绝连接，用于广告拦截、隐私保护的硬阻断。
- `dns`：**把 DNS 查询劫持到 sing-box 自己的 DNS 模块**，这是实现 DNS 分流的关键一环。

### 5.2 聚合出站：selector 与 urltest

```json
{
  "type": "selector",
  "tag": "proxy",
  "outbounds": ["hk-01", "sg-01", "jp-01", "auto"],
  "default": "auto",
  "interrupt_exist_connections": false
}

{
  "type": "urltest",
  "tag": "auto",
  "outbounds": ["hk-01", "sg-01", "jp-01"],
  "url": "https://www.gstatic.com/generate_204",
  "interval": "3m",
  "tolerance": 50,
  "idle_timeout": "30m"
}
```

**`tolerance` 是延时容差值**，单位毫秒。默认 50ms 意味着新节点必须比当前节点快 50ms 以上才会切换。调太小会导致节点反复横跳，调太大则切换��钝。跨境场景建议 50–100ms。

**`interval` 别设太短**。1 分钟一次探测 × 10 个节点 = 每小时 600 次请求，某些机场的风控会直接封 IP。3 分钟是合理起点。

**`interrupt_exist_connections`**：切换节点时是否断开已有连接。默认 `false` 对下载/长连接更友好，但会导致切换后旧连接仍走旧节点。做游戏或实时会议时建议设为 `true`。

### 5.3 节点出站的通用性能字段

无论 `vless`、`hysteria2` 还是 `tuic`，都有几个共通字段值得关注：

- `tcp_fast_open`：开启 TCP Fast Open，对高频短连接（网页浏览）有明显收益，实测首次握手减少约 1 个 RTT。但部分服务端不支持，开了反而报错，需要实测。
- `domain_strategy`：`prefer_ipv4` / `prefer_ipv6` / `ipv4_only` / `ipv6_only`。**国内家宽普遍 IPv6 质量差但优先级高**，导致「能连上但巨慢」，把它设为 `prefer_ipv4` 往往能立竿见影。
- `udp_disable_domain_unmapping`：UDP 域名解映射开关，遇到 UDP 应用异常时优先排查这个。
- `multiplex`（多路复用）：降低握手开销，但部分服务端实现有 bug 会引发随机断流。**不建议默认开启**，除非你的链路 RTT 很高（`> 200ms`）。

## 六、Route 与 DNS：分流的两条腿

### 6.1 Route 的基本结构

```json
{
  "route": {
    "rule_set": [
      {
        "type": "remote",
        "tag": "geosite-cn",
        "format": "binary",
        "url": "https://raw.githubusercontent.com/SagerNet/sing-geosite/rule-set/geosite-cn.srs",
        "download_detour": "direct",
        "update_interval": "7d"
      }
    ],
    "rules": [
      { "action": "sniff" },
      { "protocol": "dns", "action": "hijack-dns" },
      { "ip_is_private": true, "outbound": "direct" },
      { "rule_set": "geosite-cn", "outbound": "direct" },
      { "rule_set": "geoip-cn", "outbound": "direct" }
    ],
    "final": "proxy",
    "auto_detect_interface": true
  }
}
```

**逐条解释为什么这么写：**

1. `action: "sniff"` 放第一条。它的作用是从流量里嗅探出真实域名（TLS SNI / HTTP Host / QUIC），**只有嗅探成功，后续的域名类规则才有意义**。放在后面等于白写。
2. `hijack-dns` 把 DNS 查询拦下来交给 `dns` 模块处理，避免 DNS 泄漏到运营商。
3. `ip_is_private` 匹配内网地址直连，避免局域网设备通信被代理。
4. 规则集匹配国内域名/IP 走直连。
5. `final` 兜底走代理。**如果 `final` 不写，默认走 `outbounds` 数组第一个元素。**

### 6.2 规则匹配字段速查

| 字段 | 匹配对象 | 典型用法 |
| --- | --- | --- |
| `domain` | 精确域名 | `www.example.com` |
| `domain_suffix` | 域名后缀 | `cn`、`qq.com` |
| `domain_keyword` | 关键词包含 | `google`、`cdn` |
| `domain_regex` | 正则 | 复杂规则，性能开销大 |
| `ip_cidr` | 目标 IP 段 | `10.0.0.0/8` |
| `source_ip_cidr` | 来源 IP 段 | 区分局域网设备 |
| `port` / `source_port` | 端口 | `443`、`1-1024` 区间 |
| `process_name` | 进程名 | Windows/macOS 分应用代理 |
| `package_name` | Android 包名 | 手机分应用 |
| `wifi_ssid` | Wi-Fi 名称 | 回家自动切直连 |
| `inbound` | 入站 tag | 区分 TUN 和 Mixed 策略 |
| `rule_set` | 规则集 | 主流方式，性能最优 |

**顺序原则**：越精确、越特殊的规则放越前；越宽泛、越兜底的规则放越后。`domain_keyword: "google"` 和 `domain: "google.cn"` 同时存在时，如果你想让 `google.cn` 直连，那条必须写在前面。

### 6.3 DNS 模块：别用系统 DNS

```json
{
  "dns": {
    "servers": [
      {
        "tag": "remote",
        "address": "https://1.1.1.1/dns-query",
        "detour": "proxy"
      },
      {
        "tag": "local",
        "address": "223.5.5.5",
        "detour": "direct"
      }
    ],
    "rules": [
      { "rule_set": "geosite-cn", "server": "local" },
      { "rule_set": "geosite-geolocation-!cn", "server": "remote" }
    ],
    "final": "remote",
    "strategy": "prefer_ipv4",
    "independent_cache": true
  }
}
```

三个关键点：

- **DNS 请求必须分流**。国内域名用国内 DNS（低延迟、CDN 就近解析），国外域名用远程加密 DNS（防污染）。如果全部走远程，国内站点会解析到海外 CDN，速度断崖式下跌。
- **`detour` 字段指定 DNS 走哪个出站**。`local` 服务器配 `detour: "direct"`，`remote` 配 `detour: "proxy"`，否则 DNS 查询本身可能被规则引擎误路由，形成死循环。
- **`independent_cache: true`** 让 DNS 缓存独立于路由，对频繁切换节点的人更友好。

**DNS 泄漏自查**：浏览器访问 DNS 泄漏测试站，看返回的解析器归属地。如果国内直连场景下显示的是海外解析器，说明你的 `hijack-dns` 没生效，或者 DNS 的 `detour` 配错了。

## 七、分场景选型与分平台实操

### 7.1 按人群选配置策略

- **普通办公/联网用户**：TUN 入站 + urltest 自动选优 + geosite/geoip 规则集。追求「打开就能用」，不需要分应用。
- **跨境电商 / 多店铺运营**：需要用 `selector` 手动锁定固定出口 IP，配合服务端的独立原生 IP。**共享出口 IP 会导致账号关联风险**，这一点比速度重要得多。
- **开发者**：区分 `inbound` tag，让 IDE 的包管理器走代理、Docker 拉镜像走代理、但 SSH 到内网服务器走直连。用 `process_name` 规则最精准。
- **软路由 / 家庭网关**：TProxy + `auto_redirect`，配合 `wifi_ssid` 做「在家直连、外出代理」的自动化。
- **移动端重度用户**：Hysteria2 或 TUIC。地铁、高铁、商场 Wi-Fi 这些高丢包高抖动的场景，QUIC 系协议的优势是碾压性的。

### 7.2 分平台差异

**Windows**：TUN 需要管理员权限；`strict_route` 建议开启；`process_name` 规则可用（支持完整路径匹配）。注意 Windows 的「传递优化」和「系统更新」会疯狂占带宽，建议用 `process_name` 直接 `block`。

**macOS**：TUN 首次运行需要授权系统扩展；`scutil --dns` 可以快速确认 DNS 是否被接管；`process_name` 匹配的是可执行文件名，路径匹配不可靠。

**Android（SFA）**：支持 `package_name` 分应用代理，这是 Android 独有的强项。注意 Android 的「始终开启的 VPN」与部分厂商省电策略冲突，会导致后台被杀，需在电池优化里加白名单。

**iOS**：客户端能力受限（沙盒 + Network Extension），不支持 `process_name` 和 TProxy。配置尽量简化，规则集越少启动越快。

**OpenWrt / Linux**：TProxy 需要 `nftables` 或 `iptables` 配合，建议用插件内置规则。注意 `auto_detect_interface` 在多网口