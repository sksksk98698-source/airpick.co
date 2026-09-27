---
title: Windows 11 网络代理配置与系统代理设置完全指南
description: 2026 年最新 Win11 代理设置教程：从 WinINet/WinHTTP 双栈机理、Windows 手动配置代理、PAC 自动代理脚本配置，到系统代理开关失灵的注册表级排障。含 9 项量化对比矩阵、抓包诊断命令手册与避坑防骗清单 · airpick.co
head:
  - - meta
    - name: keywords
      content: Win11代理设置教程, Windows手动配置代理, 系统代理开关失灵, PAC自动代理脚本配置, Win11网络设置
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Windows 11 网络代理配置与系统代理设置完全指南
  - - meta
    - property: og:description
      content: 从 WinINet/WinHTTP 双栈机理到 TUN 虚拟网卡接管，一份写给工程师的 Win11 系统代理配置与排障手册。
---

# Windows 11 网络代理配置与系统代理设置完全指南

> 面向工程师的 Win11 代理栈拆解：不教你怎么点开关，而是告诉你开关背后改了哪个注册表项、为什么 Chrome 生效而 Steam 不生效、以及"系统代理开关失灵"到底是谁在跟你抢方向盘。

## 一、TL;DR：三句话先给结论

1. **Windows 11 的"系统代理"只写 WinINet 注册表，不写 WinHTTP，也不管环境变量。** 你打开设置页面里的代理开关，实际改动的是 `HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings` 下的 `ProxyEnable` / `ProxyServer` / `AutoConfigURL` 四个值。任何不走 `wininet.dll` 的程序（Node.js、Go 二进制、Java、部分游戏客户端）压根看不见这个开关。

2. **"系统代理"和"TUN 模式"是两条技术路线，不是两个选项。** 系统代理是应用层显式接力，只覆盖遵守 HTTP 代理约定或读取 WinINet 的进程；TUN 是网络层劫持，用 WinTUN 虚拟网卡 + 路由表覆盖全协议（含 UDP/QUIC、ICMP）。想做全局无感，只有 TUN 或透明网关。

3. **90% 的"代理开了没网/时好时坏"，根因不在机场，在本机 DNS 缓存、PAC 解析超时、UWP 环回隔离或组策略锁定。** 先用 `netsh winhttp show proxy` 和 `curl.exe -v` 把链路切开，再谈节点质量。

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

## 二、底层机理：Win11 的代理栈到底有几层

### 2.1 WinINet 与 WinHTTP 的双栈割裂

Windows 从 NT4 时代就把网络栈拆成了两条互不相干的腿：

- **WinINet（`wininet.dll`）** —— 面向交互式桌面应用。IE、旧版 Edge、Office 的联网组件、大部分国产客户端、Electron 应用（Chromium 默认读系统代理）、系统设置 UI 全部走这条线。
- **WinHTTP（`winhttp.dll`）** —— 面向服务与后台任务。Windows Update、BITS 后台传输、部分企业 VPN 组件、某些安装器走这条线。

两者**各自维护独立的代理配置**。设置 UI 只改 WinINet，WinHTTP 必须用命令行改：

```powershell
# 查看当前 WinHTTP 代理（跟设置 UI 完全无关）
netsh winhttp show proxy

# 设置 WinHTTP 代理（需要管理员权限）
netsh winhttp set proxy proxy-server="127.0.0.1:7890" bypass-list="localhost;127.*;10.*;172.16.*;192.168.*"

# 恢复系统默认（直连/自动发现）
netsh winhttp reset proxy
```

这就解释了一个经典现象：**浏览器能上网，但某个软件的更新检查、Steam 下载、Epic 启动器死活连不上。** 它走的是 WinHTTP。注意 `netsh winhttp` 不允许把代理指向环回地址用于本地服务转发以外的场景，且它是机器级设置，需要管理员。

### 2.2 一个容易被忽略的细节：应用层协议崇拜

不同运行时读代理的姿势完全不一样：

| 运行时 | 代理来源 | 备注 |
| --- | --- | --- |
| Chromium / Electron | WinINet 系统代理 + 命令行 `--proxy-server` | 命令行优先级更高 |
| Firefox | 自身设置（默认「使用系统代理设置」） | 可独立覆盖 |
| Node.js | `HTTP_PROXY` / `HTTPS_PROXY` 环境变量 | 完全不读系统代理 |
| Go 二进制 | 同上环境变量 | `NO_PROXY` 决定直连白名单 |
| Java (JVM) | `-Dhttps.proxyHost` 启动参数 | 或系统属性 |
| Python requests | 环境变量 / 显式传参 | urllib 部分读注册表 |
| UWP / 商店应用 | WinINet，但受 AppContainer 环回隔离限制 | 见 2.4 |

所以「Win11 网络设置」里那把开关，本质只服务了一半生态。

### 2.3 PAC 的解析链路：为什么你的脚本"配了但没生效"

PAC（Proxy Auto-Config）是一个返回字符串的 JavaScript 函数 `FindProxyForURL(url, host)`。Win11 支持三种注入方式：

1. **设置 UI 里的「使用脚本」** → 写 `AutoConfigURL` 注册表值，指向 `http(s)://` 或 `file:///` 地址。
2. **WPAD 自动发现** → 通过 DHCP Option 252 或 DNS 查询 `wpad.` 前缀获取。
3. **组策略下发** → 企业环境常见，会覆盖用户侧设置。

PAC 失效的三大真实原因：

- **脚本 MIME 类型不对。** 从某些 CDN 拉 PAC 时返回 `text/html` 而非 `application/x-ns-proxy-autoconfig`，WinINet 会静默拒绝执行。
- **`file:///` 路径用了反斜杠。** 必须写 `file:///C:/proxy.pac`，写成 `file://C:\proxy.pac` 直接失效。
- **PAC 缓存未刷新。** WinINet 对 PAC 有内存缓存，改完脚本内容但 URL 没变时，需要重启浏览器进程或触发一次网络状态变更。最粗暴有效的办法是重启 `explorer.exe` 或直接注销。

另外，PAC 的性能是有代价的：**每次请求都要过一遍 JS 引擎**。复杂正则 + `isInNet` 大量调用，在高并发（比如同时开 200 个连接）时能吃掉可观的 CPU，并引入毫秒级额外延迟。规则超过 500 条，建议直接换 TUN + 规则分流。

### 2.4 UWP 环回隔离与「应用商店走不了代理」

Windows 有安全沙箱（AppContainer）机制，**默认禁止 UWP 应用访问 127.0.0.1**。你的代理内核监听在本机环回地址上，商店应用自然连不上。解决办法是给它开环回豁免：

```powershell
# 查看当前豁免列表
CheckNetIsolation.exe LoopbackExempt -s

# 为指定包添加豁免（示例）
CheckNetIsolation.exe LoopbackExempt -a -n="microsoft.windowscommunicationsapps_8wekyb3d8bbwe"
```

图形化工具可以用 `LoopbackExempt` 的命令行包装，或者直接让代理内核监听 `0.0.0.0` 并在防火墙放行——但这个做法有安全代价，本机其他设备也能连你的代理端口，不建议在公共网络下使用。

### 2.5 别把锅都甩给本机：真正决定体验的是那一段

系统代理只解决「流量怎么交给内核」。剩下的 90% 体验由链路决定：

- **IEPL / IPLC 专线** —— 两端点对点内网，不经过公网国际出口，晚高峰不抖动的前提。判断真专线的硬指标是：晚 20:00–23:00 的 `mtr` 全程无第三跳丢包，且路由跳数通常在 5 跳以内。
- **BGP 中转** —— 入口接在优化线路上（如 CN2 GIA、CMI、4837），出口落地在目标地区。成本比专线低，但会被上游 QoS 影响。
- **QoS 与限速** —— 运营商对 UDP 大流量、非标准端口的限速策略，是「测速跑满、看视频卡顿」的常见原因。
- **BBRv3 / 拥塞控制** —— 丢包环境下的吞吐救命稻草，但只在服务端启用才有效，客户端无法代劳。
- **TLS Reality / XTLS Vision** —— 解决握手特征识别问题，影响的是「能不能连」，不是「连得快不快」。

**结论：本机配置决定「能不能用」，链路质量决定「好不好用」。两者必须分开诊断。**

## 三、六种代理接管方式横向参数矩阵

| 维度 | 系统代理（手动） | PAC 脚本 | TUN 虚拟网卡 | 进程级代理（Proxifier 类） | 路由器透明代理 | 浏览器插件 |
| --- | --- | --- | --- | --- | --- | --- |
| 接管层级 | 应用层（WinINet） | 应用层 + JS 决策 | 网络层（L3） | 进程级 socket 劫持 | 网关层 | 应用内 |
| 覆盖协议 | HTTP/HTTPS | HTTP/HTTPS | 全协议含 UDP/QUIC | TCP 为主，UDP 视内核 | 全协议 | 仅浏览器 |
| UWP/商店应用 | 受限（环回隔离） | 受限 | 完全覆盖 | 受限 | 完全覆盖 | 不覆盖 |
| DNS 处理 | 依赖应用 | 依赖应用 | 可劫持重定向 | 依赖应用 | 可劫持 | 依赖浏览器 |
| 游戏/语音延迟 | 不支持 | 不支持 | 支持 | 部分支持 | 支持 | 不支持 |
| 系统侵入性 | 极低 | 低 | 中（装驱动） | 中 | 高（需刷机） | 无 |
| 需要管理员 | 否（仅当前用户） | 否 | 是 | 视配置 | 是 | 否 |
| 典型配置耗时 | 1 分钟 | 10 分钟 | 5 分钟 | 20 分钟 | 60 分钟以上 | 1 分钟 |
| 典型额外延迟 | 接近 0 | 0–3 ms（规则复杂度相关） | 1–5 ms | 1–3 ms | 0–2 ms | 0 |
| 推荐场景 | 轻度、单浏览器 | 企业内网分流 | 全设备日用主力 | 只代理特定程序 | 全屋设备 | 临时应急 |

**选型口诀：只刷浏览器用系统代理；要打游戏/看原生画质用 TUN；要管全家设备上路由器；只有一两个程序需要走代理上进程级方案。**

## 四、分场景实操：手动配置 / PAC / TUN 全流程

### 4.1 手动配置代理（最快见效）

图形路径：`设置 → 网络和 Internet → 代理 → 手动设置代理 → 编辑`

- 「地址」填 `127.0.0.1`，「端口」填你本地内核的混合端口（Clash 系常见 `7890`，V2Ray 常见 `10809`/`10808`）。
- 「请勿对以下列条目开头的地址使用代理服务器」填：`localhost;127.*;10.*;172.16.*;172.17.*;172.18.*;192.168.*;<local>`
- 打开「使用代理服务器」开关。

命令行等价操作（免点鼠标、便于脚本化）：

```powershell
$k = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings"
Set-ItemProperty -Path $k -Name ProxyEnable -Value 1
Set-ItemProperty -Path $k -Name ProxyServer -Value "127.0.0.1:7890"
Set-ItemProperty -Path $k -Name ProxyOverride -Value "localhost;127.*;10.*;172.16.*;192.168.*;<local>"

# 关闭系统代理
Set-ItemProperty -Path $k -Name ProxyEnable -Value 0
```

改完注册表后，需要通知系统刷新（否则部分程序仍读旧值）：

```powershell
# 触发 WinINet 刷新最可靠的方式是重启相关进程
Stop-Process -Name explorer -Force   # 会重启桌面，谨慎
```

### 4.2 PAC 自动代理脚本配置

本地 PAC 文件写法（保存为 `C:\proxy.pac`，注意 UTF-8 无 BOM）：

```javascript
function FindProxyForURL(url, host) {
  // 内网直连
  if (isPlainHostName(host) ||
      shExpMatch(host, "*.local") ||
      isInNet(dnsResolve(host), "10.0.0.0", "255.0.0.0") ||
      isInNet(dnsResolve(host), "192.168.0.0", "255.255.0.0")) {
    return "DIRECT";
  }
  // 国内域名直连
  if (shExpMatch(host, "*.cn") || shExpMatch(host, "*.baidu.com")) {
    return "DIRECT";
  }
  return "PROXY 127.0.0.1:7890; DIRECT";
}
```

填入设置 UI 的「使用脚本地址」时，本地文件必须写 `file:///C:/proxy.pac`。远程脚本建议自建 HTTP 服务并确保响应头为 `application/x-ns-proxy-autoconfig`。

**PAC 的最大坑是 `dnsResolve()`。** 它会让 WinINet 同步解析域名，在大规模并发下阻塞明显，甚至可以造成 DNS 泄漏。能不用 `dnsResolve` 就不用，改用 `shExpMatch` 和预置域名列表。

### 4.3 TUN 模式（推荐给绝大多数人）

以 Clash Verge Rev / Mihomo 内核为例：

1. 安装并授予服务模式（会注册 `clash-verge-service`，避免每次 UAC 弹窗）。
2. 开启 TUN 模式，栈类型选 `gVisor`（兼容性优先）或 `System`（性能优先），Windows 上推荐先试 `gVisor`。
3. 确认「DNS 劫持」开启，防止系统 DNS 绕过。
4. 配置 `bypass` 局域网：`192.168.0.0/16`、`10.0.0.0/8`、`172.16.0.0/12`。

验证是否真的接管了：

```powershell
# 查看路由表，默认路由应指向 TUN 虚拟网卡
route print 0.0.0.0

# 或
Get-NetRoute -DestinationPrefix "0.0.0.0/0" | Format-Table ifIndex, NextHop, RouteMetric
```

如果默认路由仍指向物理网卡（`NextHop` 是网关 IP 而不是 `0.0.0.0`），说明 TUN 没接管成功，通常是内核没有以管理员/服务模式运行。

### 4.4 让不走系统代理的程序走代理

给 Node.js / Go / Python 类工具注入环境变量：

```powershell
setx HTTP_PROXY  "http://127.0.0.1:7890"
setx HTTPS_PROXY "http://127.0.0.1:7890"
setx NO_PROXY    "localhost,127.0.0.1,::1,192.168.0.0/16"
```

`setx` 只对新开的终端生效。需要立即生效就用 `$env:HTTP_PROXY="http://127.0.0.1:7890"`。

## 五、抓包排障诊断手册：八条命令定位问题层

| 命令 | 作用 | 关键判读 |
| --- | --- | --- |
| `netsh winhttp show proxy` | 看 WinHTTP 层配置 | 显示 `Direct access` 却没网 → 服务级直连被墙 |
| `reg query "HKCU\...\Internet Settings" /v ProxyEnable` | 看 WinINet 开关真实值 | 值为 `0x0` 但 UI 显示开着 → 被组策略覆盖 |
| `curl.exe -v -x http://127.0.0.1:7890 https://www.gstatic.com/generate_204` | 绕过一切应用层干扰，直达内核 | 返回 204 说明内核+出口正常，问题在应用侧 |
| `Test-NetConnection 1.1.1.1 -Port 443` | 测 TCP 可达性 | `TcpTestSucceeded : False` → 通道被切断 |
| `tracert -d -h 15 1.1.1.1` | 看路由走向 | 第 3 跳全是 `*` 且持续 → 上游过滤 ICMP，不代表断网 |
| `Resolve-DnsName google.com -Server 127.0.0.1 -DnsOnly` | 验证 DNS 是否走内核 | `QueryType` 超时 → 内核 DNS 劫持未生效 |
| `netstat -ano \| findstr 7890` | 看内核端口监听状态 | 无输出 → 内核根本没起 |
| `Get-NetAdapter \| Where-Object {$_.InterfaceDescription -like "*TUN*"}` | 检查 TUN 网卡 | 无结果 → TUN 未创建 |

**典型现象 → 根因判定表：**

| 现象 | 高概率根因 | 验证动作 | 处置 |
| --- | --- | --- | --- |
| 浏览器正常，Steam/Epic 不下载 | WinHTTP 未设代理 | `netsh winhttp show proxy` | 执行 `netsh winhttp set proxy` |
| 设置里开关自动回弹 | 组策略或安全软件锁定 `Internet Settings` | 查 `HKLM\SOFTWARE\Policies\Microsoft\Windows\CurrentVersion\Internet Settings` | 删除策略键或退出拦截软件 |
| 全部断网但内核日志正常 | DNS 泄漏被污染 / 内核 DNS 未劫持 | `Resolve-DnsName -Server 127.0.0.1` | 打开 DNS 劫持，或用 DoH |
| 握手失败、证书报错 | 系统时间偏差超过 5 分钟 | `w32tm /stripchart /computer:time.windows.com` | 同步 NTP |
| 开了代理走局域网 NAS 失败 | bypass 规则未包含内网段 | `route print` | 补充 `192.168.0.0/16` 直连 |
| UWP 应用无法联网 | AppContainer 环回隔离 | `CheckNetIsolation.exe LoopbackExempt -s` | 添加包豁免 |
| 晚高峰丢包严重 | 公网中转线路被 QoS | 定时 `mtr` 对比白天/夜间 | 换 IEPL 专线类服务商 |

## 六、行业避坑矩阵：识别虚假宣传与超售

| 宣传话术 | 真相 | 鉴别方法 |
| --- | --- | --- |
| 「无限流量、不限速」 | 通常配合连接数限制或晚高峰软限速 | 连续跑 30 分钟大文件下载，看速率是否