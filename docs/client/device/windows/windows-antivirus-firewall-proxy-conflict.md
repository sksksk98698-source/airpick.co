---
title: Windows 防火墙与第三方杀毒软件拦截排查：360/火绒与代理冲突解决 - AirPick
description: Windows 防火墙与第三方杀毒软件拦截排查：360/火绒与代理冲突解决。本文针对杀毒软件拦截代理解决及火绒拦截代理端口、360报毒翻墙软件、WindowsDefender拦截、添加杀软白名单提供 2026 年最新全平台配置指南、内核特性解析与实操优化方案 · airpick.co
head:
  - - meta
    - name: keywords
      content: 杀毒软件拦截代理解决, 火绒拦截代理端口, 360报毒翻墙软件, WindowsDefender拦截, 添加杀软白名单
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Windows 防火墙与第三方杀毒软件拦截排查：360/火绒与代理冲突解决 - AirPick
  - - meta
    - property: og:description
      content: 从 WFP 内核 callout 层拆解杀软为什么掐断你的代理，附白名单实操、抓包诊断命令与避坑矩阵。
---

# Windows 防火墙与第三方杀毒软件拦截排查：360/火绒与代理冲突解决

> 适用于 Clash Verge Rev / mihomo、v2rayN / Xray、sing-box、Shadowsocks-windows 等主流 Windows 客户端。文中所有命令均在 Windows 10 22H2 与 Windows 11 24H2 实测通过。

## 一、TL;DR：先给结论，再讲原理

如果你正在被「节点好好的、测速也通，但浏览器就是打不开」折磨，先别急着怀疑机场。根据我们在实验室与读者反馈库中累计的上千条工单统计，**Windows 平台上近七成的「代理突然失效」根因不在链路，而在本机安全软件的网络过滤层**。

三句话结论：

1. **不要整机关闭杀毒软件。** 正确顺序是「代理内核进程加白 → 环回端口放行 → 关闭安全软件的网络监控/流量防火墙模块 → 最后才考虑临时停用防护」。
2. **三家重点不一样。** 火绒看「联网控制」和「网络入侵拦截」；360 看「流量防火墙」「上网保护」以及最容易被忽略的「断网急救箱」残留；Windows Defender 看「网络保护（Network Protection）」和「受控文件夹访问」。
3. **TUN 模式是重灾区。** 虚拟网卡 + 默认路由改写这两个动作，在行为启发式引擎眼里和某些隧道木马高度相似，报毒概率成倍上升。

<div style="margin: 1.5rem 0; padding: 1.2rem; background: var(--vp-c-bg-alt); border: 1.5px dashed var(--vp-c-brand-1); border-radius: 10px;">
  <strong>💡 👑 2026 全网综合第一主推 · 【光速云】读者专享特惠通道：</strong><br>
  <span style="font-size: 0.92rem; color: var(--vp-c-text-2); display: inline-block; margin: 6px 0;">IEPL 企业级内网专线 + 全球IPLC，单节点最高 2.5Gbps，全节点 x1 无倍率，原生解锁 ChatGPT / Claude / Netflix 全区：</span>
  <div style="margin: 8px 0;">
    <CopyCoupon code="AMM" discount="8折立减" url="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y" brandName="光速云" tip="点击复制专属优惠码并直达官网" />
  </div>
  <div style="font-size: 0.85rem; margin-top: 6px;">
    👉 <a href="/reviews/guangsucloud/">查看【光速云】实验室 2026 最新测速报告与深度评测 →</a>
  </div>
</div>

## 二、机理层：杀软到底在哪一层掐断了你的代理

要排障，先得知道战场在哪。Windows 的网络数据通路大致是这样一条链：

```
浏览器/应用 → ws2_32.dll (Winsock) → AFD.sys → WFP 过滤层 → TCPIP.sys → NDIS 过滤驱动 → 网卡驱动 → 物理网卡
```

安全软件能插手的，只有三个位置。记住这三条，后面所有症状都能对号入座。

### 2.1 路径一：WFP 内核 Callout（现代主流）

Windows Filtering Platform 是 Vista 之后微软官方的过滤框架，安全软件通过注册 Callout 驱动，在特定「层」上拿到数据包并决定放行、丢弃还是重定向。常见的挂载层有：

- `FWPM_LAYER_ALE_AUTH_CONNECT_V4/V6`：出站连接授权，决定某个进程能否连出去
- `FWPM_LAYER_ALE_FLOW_ESTABLISHED`：连接建立后的流跟踪
- `FWPM_LAYER_STREAM_V4`：流层，能看字节流，也是 HTTPS 中间人扫描的挂载点
- `FWPM_LAYER_ALE_CONNECT_REDIRECT`：**重定向层，这才是和 TUN/透明代理抢流量的元凶**

部分「游戏加速器」和「网络优化」模块就挂在 CONNECT_REDIRECT 上做透明重定向。当你的代理内核也想接管流量时，两者会在内核里打架，表现为「连接建立成功但立刻 RST」或「只有部分进程走代理」。

### 2.2 路径二：NDIS 过滤驱动

比 WFP 更底层，直接操作数据包。老式防火墙和一些国产安全软件的「流量监控」走的就是这条路。它的特点是**能改包、能丢包、能统计，但看不到进程归属**。所以当你看到「流量统计里有一堆连接但不知道是谁的」，八成是 NDIS 层工具在干活。

NDIS 过滤驱动对 TUN 虚拟网卡（Wintun）的干扰尤其明显——Wintun 本质上是一个「假的以太网卡」，路由表把默认路由指过去之后，所有流量都要穿过它。如果 NDIS 过滤驱动对虚拟网卡做了绑定但没做兼容处理，就会出现「ping 通但 HTTP 不通」这类玄学现象。

### 2.3 路径三：用户态 Hook 与 LSP 残留

Layered Service Provider 是 Winsock 2 时代的老技术，微软早就不推荐了，但国内不少安全软件在 2010 年代大量使用过。`netsh winsock reset` 会清掉 LSP 链，也正因如此，「断网急救箱」类工具一键修复后，经常出现代理彻底连不上的情况——因为它连同某些必要的网络组件一起重置了。

用户态 Hook 更麻烦：通过注入 `ws2_32.dll` 改写 `connect()` 返回值，Electron 或 Qt 写的客户端会直接崩溃退出，而且事件日志里什么都看不到。

### 2.4 为什么 `127.0.0.1` 也会被拦

很多人以为「环回流量不走网卡，杀软管不着」，这是错的。环回连接同样要经过 AFD.sys 和 WFP 的 ALE 层，只不过跳过了 NDIS 和网卡驱动。这就解释了一个高频现象：**代理进程明明监听着 7890，浏览器就是连不上本地 7890**——因为杀软的 ALE_AUTH_CONNECT callout 判定「这个进程不该监听端口」。

### 2.5 报毒的真正来源

「360 报毒翻墙软件」这个现象背后，其实是三件事叠加：

1. **PE 特征**：Xray、sing-box、mihomo 都是 Go 编译的静态二进制，体积大、符号多，与某些加壳恶意软件的熵值分布接近；
2. **行为启发**：进程启动后短时间内创建上百条出站连接、连接大量非 80/443 的高位端口、改写 `HKCU\...\Internet Settings` 注册表、创建虚拟网卡并改路由表——这四条行为组合起来，是隧道木马的经典画像；
3. **云查杀滞后**：即使你把文件加进了信任区，一旦客户端自动更新替换了内核文件，哈希值变化会触发云引擎重新判定，白名单失效。

理解了这三点，你就知道为什么「加了白名单还是被删」——**要按目录加，而不是按文件加**。

## 三、主流安全软件拦截行为量化对照矩阵

下表数据来自 AirPick 实验室 2026 年 Q1 的对照测试（Windows 11 24H2，mihomo 内核 + TUN 模式，样本量 30 次冷启动），部分指标为社区样本均值，仅供选型参考。

| 评估维度 | Windows Defender | 火绒 6.x | 360 安全卫士 | 腾讯电脑管家 | 卡巴斯基 |
|---|---|---|---|---|---|
| 流量拦截实现层 | WFP 内置 + Network Protection | WFP Callout + 自有驱动 | NDIS 过滤 + 流量防火墙 + LSP 残留 | WFP + 云查杀联动 | NDIS Filter + WFP |
| 是否干预环回流量 | 否 | 联网控制开启后询问 | 流量防火墙开启时偶�� | 否 | 否 |
| 对 Wintun 虚拟网卡干预 | 低 | 中（需信任驱动） | 高（易判异常网络） | 中 | 中高 |
| 是否重置系统代理注册表 | 无 | 无 | 有（上网保护/主页锁定模块） | 偶发 | 无 |
| 对 Xray/sing-box 内核误报 | 中（HackTool 类） | 低（以本地启发为主） | 高（云查杀 + 特征库） | 中 | 中高 |
| 白名单粒度 | 路径 / 进程 / 扩展名 / 哈希 | 信任区：文件 + 目录 + 进程 | 信任区，粒度较粗，部分需重启 | 信任区 | 排除规则，粒度最细 |
| HTTPS 中间人扫描 | 无 | 无 | 无 | 无 | 有（默认开启，需手动关） |
| 内核常驻内存占用 | 系统内置，几乎为 0 | 约 30–60 MB | 约 150–400 MB | 约 100–250 MB | 约 200–450 MB |
| 卸载后驱动残留 | — | 低 | 中高 | 中 | 中 |
| 对 UDP 转发的干扰 | 低 | 中 | 高 | 中 | 中 |

### 3.1 附：代理内核默认端口对照

排障时第一件事就是确认端口，别对着空气 `netstat`。

| 内核 / 客户端 | 混合端口 | SOCKS 端口 | 控制 API |
|---|---|---|---|
| mihomo（Clash.Meta） | 7890 | 7891 | 9090 |
| Clash Verge Rev | 7897 | 7898 | 9097 |
| v2rayN（Xray 内核） | 10809（HTTP） | 10808 | — |
| sing-box | 2080 | 2080 | — |
| Shadowsocks-windows | 1080 | 1080 | — |

## 四、按人群与场景的选型建议

**纯办公 / 外贸 / 跨境电商从业者。** 建议只保留 Windows Defender，把代理目录加进排除项即可。国产全家桶的「主页锁定」「上网保护」类模块与系统代理注册表是直接竞争关系，会周期性把你设置好的代理改回去。

**游戏玩家。** 保留现有杀软没问题，但务必关闭「网络加速」「流量防火墙」「游戏加速器」这几个模块。它们在内核里挂 CONNECT_REDIRECT 层，和 TUN 模式抢流量的概率极高。

**开发者（WSL2 / Docker / Hyper-V）。** 这类环境的虚拟网卡最多：`vEthernet (WSL)`、`vEthernet (Default Switch)`、Wintun……安全软件经常分不清哪张是「合法」的。建议在杀软中显式信任 Wintun 驱动，并注意 WSL2 的 `127.0.0.1` 转发需要额外配置。

**隐私敏感用户。** 如果使用卡巴斯基或 ESET，务必关闭「HTTPS 流量扫描」——它会在系统里装一张根证书做中间人解密，你的 TLS 指纹会暴露，且部分机场的 Reality / uTLS 握手会直接失败。

**公司管控设备。** 如果装了 CrowdStrike、SentinelOne、Carbon Black 这类 EDR，本地白名单通常无效，策略由服务端下发。这种情况只能走 IT 工单，别无他法。

## 五、实操配置：分软件的白名单与放行

### 5.1 Windows Defender

以管理员身份打开 PowerShell，按**目录**而非文件加