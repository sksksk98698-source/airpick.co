---
title: 利用 sing-box 打造透明网关：旁路由与主路由全局代理极速搭建 - AirPick
description: 利用 sing-box 打造透明网关：旁路由与主路由全局代理极速搭建。本文针对 sing-box 透明网关及旁路由翻墙搭建、TProxy 透明代理配置、Linux 服务器全局代理、局域网全设备接管提供 2026 年最新全平台配置指南、内核特性解析与实操优化方案 · airpick.co
head:
  - - meta
    - name: keywords
      content: sing-box透明网关,旁路由翻墙搭建,TProxy透明代理配置,Linux服务器全局代理,局域网全设备接管
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: 利用 sing-box 打造透明网关：旁路由与主路由全局代理极速搭建
  - - meta
    - property: og:description
      content: 从 netfilter 数据包路径讲起，拆解 sing-box TProxy / TUN / REDIRECT 三条接管路线的真实吞吐差异，附 OpenWrt 旁路由与 Linux 主路由完整配置、抓包排障命令与 2026 年机场避坑矩阵。
---

# 利用 sing-box 打造透明网关：旁路由与主路由全局代理极速搭建

## TL;DR：先给结论，再讲为什么

如果你手上有三种设备——智能电视、公司发的笔记本、还有一台没法装客户端的 iPad——想让它们全部走代理，且不想在每台设备上装 App、配 PAC、导证书，那**透明网关是唯一优雅解**，而 2026 年在 Linux 上做透明网关的最优工程选择是 **sing-box + TProxy + nftables**，不是 TUN，也不是 REDIRECT。

三条路线的粗暴结论：

- **TProxy**：性能最好、UDP 完整支持、不改写目的地址（保留真实目标 IP，日志干净），代价是必须配 `ip rule` / `ip route` 策略路由，配置门槛最高。**生产环境首选。**
- **TUN（auto_route）**：配置最省心，一行 `auto_route: true` 搞定，代价是用户态 ↔ 内核态多一次数据包拷贝，同硬件下吞吐通常比 TProxy 低 15%–30%，且对老内核 / OpenWrt 小内存设备不友好。
- **REDIRECT（iptables NAT）**：别用在现代场景。它只处理 TCP，UDP（QUIC、DoH、游戏、WebRTC）全部漏掉，而且会改写目的地址，透明性和可观测性都很差。唯一适用场景是极老旧的 3.x 内核设备。

再给一句选型判据：**单臂旁路由适合"不想动主路由"的人，主路由直装适合"追求极限吞吐和最少跳数"的人。** 前者多一跳但可逆，后者少一跳但改错配置全家断网。

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

## 一、先把数据包路径画清楚：透明网关到底"透明"在哪

很多教程直接甩配置，导致你抄完之后遇到问题不知道从哪层查起。我们先把一个从局域网客户端发出的数据包在透明网关上的完整旅程走一遍。

### 1.1 旁路由模式下的一次完整往返

假设拓扑是：客户端 `192.168.1.100` → 旁路由 `192.168.1.2` → 主路由 `192.168.1.1` → 光猫 → 出口。

客户端把默认网关指向 `192.168.1.2`，这一步决定了它的出网流量全部先到旁路由。旁路由内核的 netfilter 在 **PREROUTING 链的 mangle 表**拦截这个包，判断：目的地址不是内网段、不是本机地址、协议是 TCP/UDP 且不是 DNS 直连——于是给这个包打上 `fwmark = 1`，并执行 `TPROXY` 动作把它交给本地监听的 sing-box 端口（例如 7895）。

注意 TProxy 的关键特征：**它不修改数据包的原始目的 IP**。sing-box 是通过 `SO_ORIGINAL_DST` 的等价机制（TProxy 走的是 `IP_TRANSPARENT` socket 选项 + 本地路由表）拿到真实目标地址的。这意味着：

- 你在 sing-box 日志里看到的 destination 是 `youtube.com:443` 这样的真实目标，而不是 `127.0.0.1:7895`；
- 规则分流（domain / geoip / 进程名）能正常工作；
- 但代价是内核必须先"相信"这些外部地址属于本机，所以需要：
  ```
  ip rule add fwmark 1 table 100
  ip route add local default dev lo table 100
  ```
  这两行的作用是：凡是打了 mark 1 的包，查自定义路由表 100，而表 100 的默认路由是 `local dev lo`——也就是"投递给本机"。没有这两行，TProxy 会静默失败，表现为连不上但日志毫无报错。

### 1.2 为什么 REDIRECT 不能做 UDP

REDIRECT 是 NAT 动作，本质是 DNAT 到本机。DNAT 需要建立 conntrack 条目并做反向 SNAT 还原，而 UDP 是无连接协议，NAT 回程依赖 conntrack 超时，且 DNS over QUIC（443/UDP）、HTTP/3、WireGuard 这类流量在 DNAT 后源地址信息会丢失，sing-box 无法正确还原原始目标。结果就是：**浏览器看起来正常（TCP 443 走通了），但 YouTube 画质上不去（QUIC 被丢回 TCP 回退）、游戏语音断断续续、某些 App 直接超时。**

这就是为什么 2026 年还在教 REDIRECT 的教程，基本可以直接关掉。

### 1.3 BBRv3、GSO/GRO 与"代理跑不满带宽"的物理真相

透明网关的吞吐瓶颈通常不在机场，而在**内核软中断和单核性能**。

- **GSO/GRO**：TUN 模式下，如果客户端网卡 GRO 开启而 sing-box 的 TUN 设备没做对应设置，会出现 TCP 分段与 MTU 不匹配，表现为"能连上、大文件下载跑到 30MB/s 就卡住"。TProxy 因为不引入虚拟网卡，天然规避这一类问题——这也是它吞吐更高的根本原因之一。
- **BBRv3**：服务端启用 BBRv3 对高丢包链路的改善非常明显（相比 CUBIC，丢包 2% 场景下吞吐可提升 3–5 倍），但它是**服务端拥塞控制算法**，你在网关本地开 BBR 对跨境段毫无帮助。别把这两件事搞混。
- **网卡多队列与 RPS**：软路由上如果只有一个 CPU 核心在处理软中断，千兆 NAT 转发会直接打满。`/proc/interrupts` 里看 eth0 的中断是否均匀分布，必要时配置 `RPS`（`/sys/class/net/eth0/queues/rx-0/rps_cpus`）。
- **策略路由的跳数成本**：旁路由方案比主路由方案多一次内核转发（客户端 → 旁路由 → 主路由），理论延迟增加约 0.1–0.3ms，在跨境场景（RTT 通常 30–200ms）里可以忽略。所以**"旁路由会明显增加延迟"是伪命题**，真正的延迟差异来自节点质量与线路类型（IPLC/IEPL 专线 vs 公网中转 vs 直连）。

---

## 二、sing-box 透明代理的四种接管方式对比矩阵

下面这张表是我们实验室在 x86（N100，4 核，2.5G 网卡）与 ARM（Filogic 830，OpenWrt 23.05）两套平台上反复压测后的量化对照，数值为多次测速的中位区间，仅供横向比较参考。

| 量化指标 | TUN（auto_route） | TProxy（nftables） | REDIRECT（NAT） | mixed/SOCKS 手动 |
|---|---|---|---|---|
| UDP 完整支持 | ✅ 原生 | ✅ 原生 | ❌ 仅 TCP | ✅（需客户端支持） |
| 内核模块依赖 | `tun` | `nft_tproxy` / `xt_TPROXY` + `nf_tproxy_ipv4` | `nf_nat` | 无 |
| 需改策略路由 | 否（自动） | **是**（`ip rule` + 本地路由表） | 否 | 否 |
| 相对吞吐（千兆基准） | 100%（基准） | 115%–130% | 105% | 依赖客户端实现 |
| 单核 CPU 占用（1Gbps） | 18%–28% | 8%–14% | 10%–15% | 视实现 |
| conntrack 压力 | 中 | 低 | 高（NAT 全量建表） | 无 |
| 目标地址可见性 | 需 sniff | 内核直传，最干净 | 需 conntrack 还原 | 天然可见 |
| 配置复杂度 | ★☆☆☆☆ | ★★★★☆ | ★★★☆☆ | ★☆☆☆☆ |
| IPv6 支持成熟度 | 好 | 好（需同步配 ip6 规则） | 差 | 好 |
| 典型适用场景 | 单机 / 小内存路由 | 生产级旁路由、主路由 | 老设备兼容 | 单设备桌面 |

**读表结论**：只要内核 ≥ 4.18 且有 `nft_tproxy` 模块，就上 TProxy；只有当你完全不想碰 `ip rule`，或者设备是手机 / 树莓派单机使用时，才退而求其次选 TUN。

---

## 三、分人群与场景选型：别用生产力工具赌运气

### 3.1 谁适合旁路由（单臂路由）

- 家里主路由是运营商光猫一体机，或者房东提供的、你无权改配置的设备；
- 需要**随时一键回退**——拔掉旁路由、把客户端网关改回主路由 IP，30 秒恢复原状；
- 有 NAS / 软路由闲置机器（N100、J4125、树莓派 4B 以上都够用）。

代价：需要在每台客户端的 DHCP 里手动指定网关（或者在主路由 DHCP 里统一推送 Option 3，前提是主路由允许改）。

### 3.2 谁适合主路由直装

- 主路由本身就是 OpenWrt / iStoreOS / ImmortalWrt，且 CPU 性能足够（ARMv8 四核 1.5GHz 起步，跑 500Mbps 以内没问题）；
- 追求最少跳数与最低故障面，不接受"两个网关"带来的排障复杂度；
- 需要开机即全局生效，包括路由器自身发起的流量（旁路由模式下路由器自己的流量默认不走代理，这是个高频坑，见第七节）。

### 3.3 谁根本不该用透明网关

- 单台电脑的日常使用——直接装客户端更简单，排障也更容易；
- 需要精细区分应用的场景——透明网关是"一把梭"，进程级分流在 Linux 上依赖 `find_process`，开销大且对容器 / 快照场景不可靠。

---

## 四、实操 A：OpenWrt 旁路由（nftables + TProxy）

### 4.1 前置检查

```bash
# 内核转发必须打开
sysctl -w net.ipv4.ip_forward=1
echo 'net.ipv4.ip_forward=1' >> /etc/sysctl.conf

# 关键模块是否存在（没有 nft_tproxy 就别走这条路）
modprobe nft_tproxy && lsmod | grep tproxy
# 或者检查可用模块
find /lib/modules/$(uname -r) -name '*tproxy*'
```

如果 `nft_tproxy` 不存在但 `xt_TPROXY` 存在，改用 iptables 版本；如果两个都没有，说明内核裁剪过，请换固件��降级到 TUN 方案。

### 4.2 sing-box 入站配置

```json
{
  "inbounds": [
    {
      "type": "tproxy",
      "tag": "tproxy-in",
      "listen": "::",
      "listen_port": 7895,
      "network": "tcp,udp",
      "sniff": true,
      "sniff_override_destination": false
    },
    {
      "type": "direct",
      "tag": "dns-in",
      "listen": "0.0.0.0",
      "listen_port": 5353,
      "network": "udp",
      "override_address": "1.1.1.1",
      "override_port": 53
    }
  ]
}
```

关于 `sniff`：sing-box 1.11 之后更推荐用路由规则里的 `"action": "sniff"` 来做域名嗅探，inbound 层的 `sniff` 字段属于过渡写法，但在 1.12 里仍然兼容。如果你追求配置的前瞻性，改成：

```json
{
  "route": {
    "rules": [
      { "action": "sniff" },
      { "protocol": "dns", "action": "hijack-dns" }
    ]
  }
}
```

### 4.3 nftables 规则

OpenWrt 23.05 默认就是 nftables（fw4），把下面内容写进 `/etc/nftables.d/singbox-tproxy.nft`：

```nft
table inet singbox {
	chain prerouting {
		type filter hook prerouting priority mangle; policy accept;

		# 内网段、保留地址、组播直接放行，避免环路
		ip daddr { 0.0.0.0/8, 10.0.0.0/8, 127.0.0.0/8, 169.254.0.0/16,
		           172.16.0.0/12, 192.168.0.0/16, 224.0.0.0/4,
		           240.0.0.0/4, 255.255.255.255/32 } return

		# 来自本机自身的流量不要二次接管（防环路）
		ip saddr 192.168.1.2 return

		# 其余 TCP/UDP 全部交给 TProxy
		meta l4proto { tcp, udp } meta mark set 1 tproxy to :7895 accept
	}

	chain output {
		type route hook output priority mangle; policy accept;
		ip daddr { 0.0.0.0/8, 10.0.0.0/8, 127.0.0.0/8, 169.254.0.0/16,
		           172.16.0.0/12, 192.168.0.0/16, 224.0.0.0/4 } return
		meta mark 0x1 return
		meta l4proto { tcp, udp } meta mark set 1 accept
	}
}
```

`output` 链是给**路由器自身发起的流量**用的（比如 OpenWrt 上的 curl、package manager、DDNS）。这一步是很多人配完发现"客户端能翻墙但路由器自己不能"的根因。

### 4.4 策略路由（最容易漏的一步）

```bash
ip rule add fwmark 1 table 100
ip route add local default dev lo table 100

# 持久化：写入 /etc/rc.local 或 /etc/hotplug.d/iface/99-tproxy
```

### 4.5 客户端侧

把需要接管的设备的默认网关改成 `192.168.1.2`，DNS 改成 `192.168.1.2`（如果旁路由上开了 dnsmasq 转发到 sing-box 的 DNS）或直接 `1.1.1.1`（但这样 DNS 不走代理，可能污染）。

---

## 五、实操 B：Linux 主路由 / 服务器全局代理

服务器场景（比如一台 Debian 12 当网关）与 OpenWrt 基本一致，差别在持久化与防火墙管理��式。

```bash
# /etc/sysctl.d/99-proxy.conf
net.ipv4.ip_forward=1
net.ipv4.conf.all.rp_filter=0
net.ipv4.conf.default.rp_filter=0
net.ipv4.tcp_fastopen=3
net.core.default_qdisc=fq
net.ipv4.tcp_congestion_control=bbr
```

`rp_filter=0` 是必须的：TProxy 处理的包源地址与入接口不匹配，严格反向路径过滤会直接把它丢掉，表现为"规则都对，连接就是不通"。

iptables 版本（当内核只有 `xt_TPROXY` 时）：

```bash
iptables -t mangle -N SINGBOX
iptables -t mangle -