---
title: DNS 缓存污染清理：Windows ipconfig /flushdns 与 Chrome 清理全实操 - AirPick
description: DNS 缓存污染清理：Windows ipconfig /flushdns 与 Chrome 清理全实操。本文深度解析刷新清理DNS缓存实操及ipconfig flushdns命令、清除Chrome内部DNS缓存、解决域名解析死锁、瞬间恢复网页正常访问，为出海用户提供 2026 年最新故障排查速查、防跑路预警与资金维权应急实战手册 · airpick.co
head:
  - - meta
    - name: keywords
      content: 刷新清理DNS缓存实操, ipconfig flushdns命令, 清除Chrome内部DNS缓存, 解决域名解析死锁, 瞬间恢复网页正常访问
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: DNS 缓存污染清理：Windows ipconfig /flushdns 与 Chrome 清理全实操 - AirPick
  - - meta
    - property: og:description
      content: 从 DNS 解析链路底层机理讲起，覆盖 Windows / macOS / Linux / Chrome / 代理客户端全域清缓存实操，附 mtr、curl、tcping 抓包判定表与行业避坑矩阵。
---

# DNS 缓存污染清理：Windows ipconfig /flushdns 与 Chrome 清理全实操

## 一、TL;DR：先给结论，再谈原理

如果你现在的症状是「同一台电脑换个浏览器就能打开、代理节点没掉线、但页面就是转圈」，那么有极高概率，你遇到的不是线路故障，而是**域名解析死锁**——本地某个缓存层里躺着一条已经失效、被污染、或者被 fake-ip 覆盖的 A 记录。

先把最容易踩错的五点结论放在最前面：

1. **`ipconfig /flushdns` 只清 Windows DNS Client 服务（dnscache）这一层**，它不会碰 Chrome 的 Host Resolver Cache、不会碰路由器的 dnsmasq、更不会碰 Clash / sing-box 的 fake-ip 映射表。很多人「清了没用」，是因为清错了层。
2. **Chrome 有一份完全独立的 DNS 缓存**，在 `chrome://net-internals/#dns` 里。它的容量默认可达上千条，且生命周期不完全跟随系统缓存，是「系统能 ping 通、浏览器打不开」这类怪病的头号嫌疑人。
3. **`nslookup` 会绕过系统解析器缓存**直接向 DNS 服务器发包。这意味着：`nslookup` 成功但浏览器失败，问题几乎一定在应用层或代理层，而不是在 DNS 服务器上。
4. **DNS 排障的正确顺序是自内向外**：浏览器内部缓存 → 操作系统解析器缓存 → 本地代理客户端 → 路由器 → 上游递归服务器。逆着来会浪费大量时间。
5. **NXDOMAIN 负缓存同样会被缓存**。一个域名刚刚注册或刚刚切 DNS，你在前 5 分钟访问失败，之后即使权威记录已生效，你仍会在 TTL 到期前持续失败——这就是所谓的「域名解析死锁」。

<div style="margin: 1.5rem 0; padding: 1.2rem; background: var(--vp-c-bg-alt); border: 1.5px dashed var(--vp-c-brand-1); border-radius: 10px;">
  <strong>💡 ⭐ 2026 均衡专线首选 · 【暮光加速】读者专享特惠通道：</strong><br>
  <span style="font-size: 0.92rem; color: var(--vp-c-text-2); display: inline-block; margin: 6px 0;">20 元 120GB 黄金流量档，全线 VLESS + IEPL 专线，长连接稳定不掉线：</span>
  <div style="margin: 8px 0;">
    <CopyCoupon code="muguang5555" discount="新人特惠" url="https://varnexa.twilightaff.com/#/?code=D1LHglg3" brandName="暮光加速" tip="点击复制专属优惠码并直达官网" />
  </div>
  <div style="font-size: 0.85rem; margin-top: 6px;">
    👉 <a href="/reviews/twilight/">查看【暮光加速】实验室 2026 最新测速报告与深度评测 →</a>
  </div>
</div>

> 补充一句：清缓存能解决的问题，本质上都是**本地状态机陈旧**。如果清完之后 30 分钟内复发，那就不要再清第三次了——那是一张明确的信号，说明上游链路或落地解析策略在持续抖动，需要去查线路，而不是继续折腾本地缓存。相关线路侧排查思路可参考 [/help/faq/connect-fail/](/help/faq/)。

---

## 二、DNS 缓存到底散落在哪：一次解析的完整链路

要清得干净，先得知道缓存有几层。一次 `https://example.com` 的访问，实际上会经过下面这条链路，**每一层都可能是故障点**：

**第 1 层：浏览器应用缓存。** Chromium 系内核（Chrome / Edge / Brave / 各类指纹浏览器）维护一份独立的 Host Resolver Cache，同时还有一份 Socket Pool（套接字连接池）。前者缓存域名到 IP 的映射，后者缓存已经建立的 TCP/TLS 连接。两者独立于操作系统，这就是为什么「同一个域名，Chrome 打不开但 Edge 秒开」这种诡异现象完全可能发生。

**第 2 层：操作系统解析器缓存。** Windows 上是 `DNS Client`（服务名 `Dnscache`）在管；macOS 上是 `mDNSResponder`；Linux 上视发行版可能是 `systemd-resolved`、`nscd` 或直接没有守护进程。这一层是 `ipconfig /flushdns` 的作用域。

**第 3 层：本地代理客户端。** 当你在跑 Clash、sing-box、Surge 这类工具时，情况会复杂一个数量级。开启 TUN 模式或 `fake-ip` 模式后，客户端会维护一张「域名 → 虚拟 IP（通常是 198.18.0.0/16 段）」的映射表，DNS 请求甚至根本不会走系统解析器，而是被内核层劫持后由代理自己转发。这时候你清系统 DNS 缓存，等于在给一台已经断电的机器按重启键。

**第 4 层：路由器 / 家庭网关。** 大部分家用路由器跑的是 dnsmasq 或 Unbound，对局域网所有设备提供递归解析。它的缓存是全家共用的。如果只有你家全部设备打不开某个域名，而切 4G 就正常，那八成是路由器这一层脏了。

**第 5 层：上游递归解析器。** 运营商 DNS、公共 DNS（1.1.1.1 / 8.8.8.8 / 9.9.9.9）、以及 DoH/DoT 服务商。这一层的缓存你无法直接清理，只能靠切换服务器或等待 TTL 过期。

理解了这条链路，你就会明白为什么「刷新清理 DNS 缓存实操」这件事，必须分平台、分客户端地做，而不是背一条命令完事。

---

## 三、核心参数对比矩阵：九层缓存量化对照

下表是我们在实验室环境（Windows 11 23H2 + macOS 14 + Chrome 122 + Clash Meta 内核）实测整理的缓存层参数对照，可以作为排障时的索引表：

| 缓存层级 | 默认容量 | 驻留时长 | `ipconfig /flushdns` 是否覆盖 | 标准清除方式 | 典型故障特征 | 清理耗时 |
| --- | --- | --- | --- | --- | --- | --- |
| Chrome Host Resolver Cache | 约 1000 条 | 跟随记录 TTL，常见 60s–300s | 否 | `chrome://net-internals/#dns` → Clear host cache | 仅浏览器打不开，`ping` 正常 | 小于 1 秒 |
| Chrome Socket Pool | 每组约 256 个套接字 | 空闲约 6 分钟后回收 | 否 | `chrome://net-internals/#sockets` → Flush socket pools | 页面卡在「正在建立安全连接」 | 小于 1 秒 |
| Windows DNS Client（dnscache） | 无硬上限 | 受 TTL 与负缓存约束 | 是 | `ipconfig /flushdns` | 全系统域名均无法解析 | 小于 1 秒 |
| macOS mDNSResponder | 动态 | 受 TTL 约束 | 不适用 | `sudo killall -HUP mDNSResponder` | Safari / 终端同时异常 | 1–3 秒 |
| Linux systemd-resolved | 动态 | 受 TTL 约束 | 不适用 | `sudo resolvectl flush-caches` | 容器内正常、宿主异常 | 小于 1 秒 |
| 代理客户端 fake-ip 池 | 默认 2048 条映射 | 内核运行期常驻 | 否 | 重启内核 / 清理内核缓存 | 解析到 `198.18.x.x` 后连接失败 | 2–10 秒 |
| 家用路由器 dnsmasq | 默认 150 条 | 受 TTL 约束 | 否 | 重启服务或整机软重启 | 全家设备同时异常 | 5–30 秒 |
| 运营商递归解析器 | 极大 | TTL 与最小缓存时间共同生效 | 否 | 无法本地清理，只能换 DNS | 特定域名被投毒指向错误 IP | 不可控 |
| 系统 hosts 文件 | 静态 | 永久生效直至手动修改 | 否 | 手动编辑删除条目 | 固定解析到某个异常 IP | 手动 |
| 浏览器安全 DNS（DoH） | 边缘节点缓存 | 受 TTL 约束 | 否 | 切换 DoH 提供商或临时关闭 | 部分域名解析结果与系统不一致 | 秒级 |

这张表里最值得反复看的是第 3 列和第 6 列。**判断故障在哪一层的核心方法，是比对不同工具给出的解析结果是否一致**，而不是凭感觉反复清缓存。

---

## 四、Windows 实操：ipconfig /flushdns 命令族全解

Windows 是绝大多数出海用户的主力平台，命令也最集中。

**第一步，先看缓存里有什么，再决定要不要清：**

```powershell
ipconfig /displaydns
Get-DnsClientCache | Select-Object Entry, RecordName, Data, TimeToLive
```

`/displaydns` 会把当前缓存全部打印出来，重点看三类异常记录：指向 `0.0.0.0` 或 `127.0.0.1` 的条目、TTL 还剩很久但你已知切过 IP 的条目、以及 `198.18.x.x` 段的条目（后者说明代理内核在接管解析，属于正常现象，不要误杀）。

**第二步，执行清理：**

```powershell
ipconfig /flushdns
Clear-DnsClientCache
```

两条命令等价，前者是经典写法，后者是 PowerShell 原生 cmdlet。`/flushdns` 在普通用户权限下通常即可执行，但如果返回 `请求的操作需要提升`（错误 5），以管理员身份重开终端即可。

**第三步，如果清除后立刻复发，说明 DNS Client 服务本身状态异常：**

```powershell
net stop dnscache
net start dnscache
```

或者：

```powershell
Restart-Service -Name Dnscache -Force
```

**这里有一个 90% 的人不知道的坑**：部分「系统优化工具」会擅自把 `DNS Client` 服务设为禁用。在这种状态下，`ipconfig /flushdns` 会**静默返回成功但实际什么都没做**，因为缓存守护进程压根没在跑。排障时务必先确认服务状态：

```powershell
Get-Service -Name Dnscache | Select-Object Name, Status, StartType
```

**第四步，只有当出现「能 ping 通 IP 但完全无法解析任何域名」这种协议栈级故障时**，才考虑重置网络栈：

```powershell
netsh winsock reset
netsh int ip reset
ipconfig /registerdns
```

注意这三条命令需要管理员权限，且执行后必须重启系统。**不要把它当成日常操作**——`winsock reset` 会重置所有 LSP 分层服务提供者，某些安全软件、VPN 客户端需要重新安装适配层。

---

## 五、macOS 与 Linux：别再用十年前的老命令

**macOS（Big Sur 及以后版本）：**

```bash
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder
sudo killall -HUP mDNSResponderHelper
```

注意：网上大量教程仍在教你执行 `sudo discoveryutil mdnsflushcache`，这个命令从 OS X 10.9 起就已经不存在了，执行只会报 command not found。macOS 上 `mDNSResponder` 承担的角色，等同于 Windows 的 `Dnscache`。

**Linux（systemd 体系）：**

```bash
sudo resolvectl flush-caches
sudo systemd-resolve --flush-caches   # 旧版兼容写法
sudo resolvectl statistics            # 查看当前缓存条目数
```

如果发行版用的是 `nscd`：

```bash
sudo systemctl restart nscd
```

如果是自建 dnsmasq：

```bash
sudo systemctl restart dnsmasq
```

**容器环境特别注意**：Docker 容器有独立的 `/etc/resolv.conf` 和独立的解析缓存路径。你在宿主机上清缓存，对容器内毫无影响。容器内排障要先看 `cat /etc/resolv.conf` 指向的是 `127.0.0.11`（Docker 内嵌 DNS）还是自定义上游。

---

## 六、Chrome 内部 DNS 缓存清理：分步骤 + 三个连带动作

Chromium 系的缓存清理是本文的核心关键词之一，步骤必须精确。

**动作一：清空主机缓存**

地址栏输入：

```
chrome://net-internals/#dns
```

点击 `Clear host cache`。这一步只清域名到 IP 的映射。

**动作二：清空套接字池**

地址栏输入：

```
chrome://net-internals/#sockets
```

点击 `Flush socket pools`。这一步很多人会漏，但它在排查「域名解析已经正确、连接依然卡死」时是关键操作——旧的 TCP 连接还挂在池子里，Chrome 复用它，自然继续失败。

**动作三：处理 HSTS / 安全 DNS 残留**

如果你遇到的是证书错误或强制跳转 HTTPS ���异常，还需要检查 `chrome://net-internals/#hsts` 里的域名策略；如果怀疑是 DoH 提供商返回了异常解析，到 `chrome://settings/security` 里临时关闭「使用安全 DNS」再测一次。

**补充判定技巧：**

- 用**无痕窗口**再访问一次。无痕窗口会复用部分缓存但不会加载扩展，如果无痕正常、普通窗口异常，问题在扩展层而不是 DNS 层。
- 从任务管理器里**彻底结束所有 Chrome 进程**再重启