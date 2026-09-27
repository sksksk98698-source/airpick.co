---
title: "Clash 局域网共享代理：手机/电视/Switch 轻松接入电脑代理网络"
description: "Clash 局域网共享代理实战指南：从 allow-lan 内核原理、mixed-port 监听、防火墙放行到手机/电视/Switch 多设备接入，含 2026 最新 Clash Verge Rev / Mihomo Party / OpenClash 全平台配置、抓包排障命令与机场虚假宣传避坑矩阵 · airpick.co"
head:
  - - meta
    - name: keywords
      content: Clash局域网共享, 允许局域网连接, 电脑给Switch开代理, 手机连接电脑Clash代理, 多设备热点共享, Clash allow-lan, Mihomo 局域网代理, bind-address, Clash TUN 冲突
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: "Clash 局域网共享代理：手机/电视/Switch 轻松接入电脑代理网络"
  - - meta
    - property: og:description
      content: "一份写给折腾党的硬核教程：allow-lan 到底做了什么、为什么 Switch 只能走 HTTP 代理、TUN 模式和局域网共享为什么互相打架，以及 10 项量化指标方案对比与终端排障命令全集。"
  - - meta
    - property: og:url
      content: https://airpick.co/client/app/clash/clash-lan-allow-sharing-guide
  - - meta
    - property: og:site_name
      content: AirPick 机场推荐
---

# Clash 局域网共享代理：手机/电视/Switch 轻松接入电脑代理网络

> 一句话定位：这篇文章不教你「点一下开关」，而是讲清楚 `allow-lan: true` 之后，你的电脑在局域网里到底变成了什么角色、多设备并发时代理链路会在哪里崩、以及崩了之后怎么 5 分钟内定位到具体环节。

---

## 一、TL;DR：三分钟判断你该不该开局域网共享

先把结论摊开，省得你读完 3000 字才发现方向错了。

**适合开局域网共享的场景：**

- 家里有一台常年开机的主力 PC / Mac mini / NAS，客厅电视盒子、Switch、iPad 需要蹭代理；
- 你的代理是 **IEPL / IPLC 专线类节点**，带宽冗余大、单节点独享或低倍率，扛得住 3–8 台设备并发；
- 你不想在每台设备上装客户端（Switch、老款电视盒子根本没有客户端可装）。

**不适合的场景：**

- 你的节点是低价公网中转，晚高峰单线程都跑不满 50Mbps——那多设备共享只会把体验一起拖垮；
- 电脑经常睡眠 / 关机，家里还有人在用电视；
- 你只是想给手机用，那直接在手机上装客户端更省事，共享链路纯属多此一举。

一句话：**局域网共享的本质是「把代理能力下沉成一台家用网关」**，它省的是设备适配成本，换来的是对主力机稳定性和节点承载力的硬要求。

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

---

## 二、底层机理：`allow-lan` 打开之后，数据包到底走了哪条路

这一段是全文的地基，看懂了后面所有问题都能自己推理出来。

### 2.1 监听地址的三种状态

Mihomo / Clash 内核默认只监听回环地址 `127.0.0.1`。配置里的 `allow-lan` 其实是一个「把监听面扩大」的开关：

| 配置 | 实际监听 | 谁能连上 | 典型误用 |
| --- | --- | --- | --- |
| `allow-lan: false` | `127.0.0.1:7897` | 只有本机进程 | — |
| `allow-lan: true` + `bind-address: "*"` | `0.0.0.0:7897`（全部网卡） | 局域网 + 所有虚拟网卡 | 绑定到 WSL / VMware / Hyper-V 的虚拟网卡，局域网连不上 |
| `allow-lan: true` + `bind-address: 192.168.1.20` | 仅该网卡 | 同网段设备 | IP 变了之后配置失效 |

**划重点**：`bind-address: "*"` 在多网卡机器上是个坑。`0.0.0.0` 表示监听所有接口，本身没问题，但如果你的路由器做了 IP-MAC 绑定、或者电脑 IP 是 DHCP 随机分配的，第二天 IP 一变，所有客户端配置全废。生产做法是：**路由器里做静态 DHCP 绑定 + `bind-address` 写死内网 IP**。

### 2.2 数据包的完整路径

以 Switch 通过 HTTP 代理上网为例：

```text
Switch(SOCKS? 否, 仅 HTTP CONNECT)
  → 二层交换机 / AP（同网段 ARP 直连，不过路由器 NAT）
  → 电脑物理网卡 (192.168.1.20:7897)
  → 内核 TCP 栈 → Mihomo 入站(inbound)
  → 规则匹配 (rule / geoip / geosite)
  → 出站(outbound)：vmess/Reality/Hysteria2 over TLS
  → 节点服务器 → 目标网站
```

三个关键推论：

1. **同网段共享不过路由器 NAT。** 这意味着路由器的 QoS、限速、连接数限制对这条流量基本失效（它只认成是「电脑自己在上网」）。如果你家宽带是 100M，电脑自己就能跑满，共享再多设备也不会突破这个天花板。
2. **电脑成为单点故障。** 睡眠、重启、退出 Clash、防火墙规则变更、网卡断开重连——任一环节发生，下游全部设备立刻断网。这是局域网共享最大的隐性成本。
3. **吞吐瓶颈在「电脑 CPU 加解密 + 节点带宽」这两处。** 现代 x86 CPU 带 AES-NI，AES-128-GCM 单核能做到 2–5Gbps；但 Hysteria2 走的是 QUIC/ChaCha20 或 AES 软解，单核吞吐可能掉到 300–800Mbps。所以别指望老笔记本能同时喂饱 4 台 4K 串流。

### 2.3 延迟增量的真实量级

很多人担心共享会「变慢」。实测口径下：

- **链路本地跳数增量**：多一层用户态转发（内核 socket → Mihomo → 再出站），千兆内网下 RTT 增量在 `+0.3 ~ +1.2ms` 区间；
- **真正吃延迟的是「并发排队」**：同一节点被 4 台设备同时拉流时，TCP 流的队列抖动（jitter）会从单设备的 2–5ms 飙到 30–80ms，这才是体感「卡」的来源；
- **BBRv3 在服务端生效，无法救你的共享侧。** 如果电脑是 Windows，默认拥塞控制是 CUBIC，在跨太平洋高丢包链路（丢包率超过 3%）上，切换 `netsh int tcp set global congestionprovider` 一类操作对共享流量基本无感——因为出口拥塞控制发生在节点服务端，不在你这里。

### 2.4 为什么专线在共享场景下优势被放大

单人使用时，公网中转和 IEPL 专线的差距可能只有 10ms；但多设备并发时差距会被指数级放大：

- **公网中转**：中转机是共享带宽，多设备并发直接触发中转机的队列丢包，触发客户端重传，RTT 从 60ms 抖到 200ms+；
- **IEPL / IPLC 内网专线**：物理隔离、不做公网 QoS 竞价，队列深度稳定，多设备并发时抖动增量通常控制在 `+5ms` 以内。

换句话说，**局域网共享是天然的「超售检测器」**——一家机场是不是在超售，单人测速看不出来，三台设备同时拉流五分钟立刻现原形。

关于专线类型的技术差异，可以对照阅读 [IEPL 与 IPLC 线路到底差在哪](/tech/line/iepl/)。

---

## 三、核心方案对比矩阵（10 项量化指标）

同样是「让其他设备用上代理」，至少有五种实现路径，成本与收益完全不同：

| 指标 | A. `mixed-port` 局域网共享 | B. TUN 模式 + 网关指向 | C. 路由器透明代理 | D. 电脑热点共享 | E. NAS 常驻 Mihomo |
| --- | --- | --- | --- | --- | --- |
| 配置复杂度 | 低（改 3 行配置） | 中高（需改路由表） | 高（刷机 + 分流） | 低 | 中 |
| 理论吞吐上限 | 网卡线速，受 CPU 制约 | 网卡线速 | 路由器 CPU 决定 | 无线协商速率 | NAS 网卡线速 |
| 延迟增量 | `+0.3 ~ 1.2ms` | `+0.5 ~ 2ms` | `+0.2 ~ 1ms` | `+3 ~ 15ms` | `+0.3 ~ 1ms` |
| 终端兼容性 | 需支持 HTTP/SOCKS5 | 全透明，零配置 | 全透明，零配置 | 全透明 | 需支持代理 |
| Switch 支持 | ✅（HTTP CONNECT） | ⚠️ 需网关指向 | ✅ | ✅ | ✅ |
| 智能电视 / 机顶盒 | ✅（部分机型无代理项） | ✅ | ✅ | ✅ | ✅ |
| DNS 可控性 | 中（需手动指 DNS） | 高 | 高 | 中 | 高 |
| IPv6 处理 | 需额外关闭/劫持 | 好 | 好 | 差 | 中 |
| 断线影响范围 | 全屋 | 全屋 | 全屋 | 仅热点设备 | 全屋 |
| 推荐指数 | ★★★★☆ | ★★★☆☆ | ★★★★★ | ★★☆☆☆ | ★★★★☆ |

**选型速记：**

- 只想临时给 Switch / 电视用几天 → 选 A；
- 家里设备多、追求零配置体验 → 选 C（需要支持 OpenWrt 的路由器）；
- 已经有 NAS 7×24 开机 → 选 E，比让主力 PC 常驻更省��；
- B 和 D 属于「能用但不优雅」的方案，除非有特殊需求，否则不建议作为长期方案。

---

## 四、按人群与场景选型：谁适合共享，谁不适合

### 4.1 主机玩家（Switch / PS5）

主机是局域网共享最刚需的群体，原因很简单：**主机系统压根没有 Clash 客户端**。

- Switch 只支持 **HTTP 代理**，不支持 SOCKS5。所以你的混合端口必须包含 HTTP 能力（`mixed-port` 自带 HTTP + SOCKS5 双协议，分开配的话 `port` 是 HTTP、`socks-port` 是 SOCKS5）；
- PS5 同样只支持 HTTP 代理，且对代理的 TLS 握手兼容性较挑剔，部分节点会直接连接失败；
- 关键提醒：**主机走代理只影响联网游戏与商店，不影响本地联机**，但会让联机延迟增加 30–80ms（取决于节点），竞技类游戏慎用。

### 4.2 智能电视 / 安卓盒子

- 安卓 TV 系的「WiFi 高级设置」里通常有代理选项，但部分国行定制系统阉割了；
- 阉割了的机型只能靠方案 B / C / D 实现透明代理；
- 电视最吃带宽的场景是 4K 串流，单路 Netflix 4K 大约需要 25–35Mbps 稳定带宽，三台电视并发就要 100Mbps 以上的节点冗余。

### 4.3 手机 / 平板

说实话，**手机是最没必要走局域网共享的设备**——iOS 有 Shadowrocket / Stash，安卓有 ClashMetaForAndroid，本地跑客户端永远比共享稳定。只有当你要共享的节点是「电脑上登录的独享账号」时，共享才有意义。

移动端客户端选型可以参考 [移动端客户端总览](/client/device/iphone/)。

### 4.4 临时办公 / 多设备调试

开发联调、抓包分析海外接口时，把测试机接到电脑代理上是很常见的做法。此时建议**开启入站认证**：

```yaml
allow-lan: true
bind-address: 192.168.1.20
mixed-port: 7897
authentication:
  - "airpick:yourpassword"
lan-allowed-ips:
  - 192.168.1.0/24
lan-disallowed-ips:
  - 192.168.1.99/32
```

`lan-allowed-ips` / `lan-disallowed-ips` 是 Mihomo 系内核的细粒度白名单，比单纯开 `allow-lan` 安全得多。

---

## 五、全平台实操配置：Windows / macOS / Linux / 路由器

### 5.1 Windows（Clash Verge Rev）

1. 「设置 → 允许局域网连接」打开；
2. 记录端口（默认混合端口 7897）；
3. 放行防火墙（**管理员 PowerShell**）：

```powershell
netsh advfirewall firewall add rule name="Mihomo LAN TCP" dir=in action=allow protocol=TCP localport=7897
netsh advfirewall firewall add rule name="Mihomo LAN UDP" dir=in action=allow protocol=UDP localport=7897
Test-NetConnection -ComputerName 192.168.1.20 -Port 7897
```

4. **把当前 WiFi 从「公用网络」改成「专用网络」**——这是 90% 的人卡住的地方，公用配置文件下 Windows 默认拦截所有入站。

### 5.2 macOS（Mihomo Party / ClashX Pro）

- 勾选「允许局域网连接」；
- **macOS 15 及以上新增了「本地网络」隐私权限**，首次开启共享时必须在「系统设置 → 隐私与安全性 → 本地网络」里放行客户端，否则同网段设备就是连不上，且不会弹任何提示；
- 验证监听状态：

```bash
lsof -nP -iTCP:7897 -sTCP:LISTEN
netstat -an | grep 7897
```

### 5.3 Linux / NAS（mihomo 命令行）

```yaml
# config.yaml
allow-lan: true
bind-address: 192.168.1.30
mixed-port: 7897
external-controller: 127.0.0.1:9090
```

```bash
ss -lntp | grep 7897
# 期望输出：0.0.0.0:7897 或 192.168.1.30:7897
```

防火墙（nftables / ufw）：

```bash
sudo ufw allow from 192.168.1.0/24 to any port 7897 proto tcp
```

### 5.4 OpenWrt 路由器（透明代理）

路由器方案本质上是把「共享」下沉到网关层，**这是体验最好的形态**，因为终端零配置。OpenClash / ShellClash 都支持一键开启局域网透明代理。配置要点：

- 关闭 dnsmasq 的 IPv6 解析劫持冲突；
- 设置 `fake-ip` 网段不要和内网网段重叠；
- ��核选择 mihomo 而不是老版 clash，前者支持 Hysteria2 / VLESS Reality 等新协议。

路由器折腾的完整流程见 [OpenWrt 软路由 Clash 部署](/client/)。

### 5.5 Switch 端配置（重点）

```text
设置 → 互联网 → 互联网设置 → 选择当前 WiFi → 更改设置
  → 代理服务器设置 → 使用
  → 服务器地址：192.168.1.20
  → 端口：7897
  → 保存 → 连接测试
```

常见报错与对策：

- **「无法连接到代理服务器」**：90% 是 Windows 防火墙没放行，或者 WiFi 是公用网络；
- **能连上但 eShop 打不开**：DNS 问题，手动把 DNS 改成 `1.1.1.1` / `8.8.8.8`；
- **登不上任天堂账号**：节点 IP 被判风险，换原生 IP 节点。这也是为什么共享场景建议用 [光速云](/reviews/guangsucloud/) 这类带原生 IP 的线路。

---

## 六、深度避坑：TUN 冲突、DNS 泄漏与多网卡陷阱

### 6.1 TUN 模式和 `allow-lan` 会打架

TUN 模式会接管系统路由表，把所有流量导入虚拟网卡。如果你同时开了 `allow-lan`，可能出现：

- 局域网设备访问内网服务（NAS、打印机）时被错误地导入代理；
- 回环路由形成，本机 DNS 解析异常。

**解决**：TUN 配置里显式排除内网段：

```yaml
tun:
  enable: true
  stack: system