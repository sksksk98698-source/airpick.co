---
title: Windows 终端命令行科学上网：PowerShell、CMD 与 Git 走代理全攻略
description: 2026 年最新 Windows 终端走代理实战指南：详解 PowerShell 设置代理、CMD 命令行代理、Git 克隆加速与终端加速环境变量，附抓包排障命令、量化指标对照表与避坑矩阵。
head:
  - - meta
    - name: keywords
      content: Windows终端走代理,PowerShell设置代理,Git克隆加速,CMD命令行代理,终端加速环境变量
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Windows 终端命令行科学上网：PowerShell、CMD 与 Git 走代理全攻略
  - - meta
    - property: og:description
      content: 详解 PowerShell、CMD、Git、SSH 与 WSL2 的代理接管链路，附排障命令与避坑矩阵。
---

## 一、TL;DR：先给结论，再讲原理

如果你只想拿一个能跑的答案，抄这段就够了：

```powershell
# PowerShell（当前会话生效，最稳）
$env:HTTP_PROXY  = "http://127.0.0.1:7890"
$env:HTTPS_PROXY = "http://127.0.0.1:7890"
$env:ALL_PROXY   = "socks5://127.0.0.1:7891"
$env:NO_PROXY    = "localhost,127.0.0.1,::1,*.local,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16"
```

```bat
:: CMD
set http_proxy=http://127.0.0.1:7890
set https_proxy=http://127.0.0.1:7890
```

```bash
# Git（只对 HTTPS 远端生效，SSH 需要另配）
git config --global http.proxy  http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890
```

三条铁律，记住能省你三天时间：

1. **Windows 设置里的"系统代理"开关，对 90% 的命令行程序无效**。它只写进注册表的 Internet Settings，真正读它的只有 WinINET 家族（IE/旧 Edge/部分 Office 组件）。`curl.exe`、`git`、`npm`、Go/Rust 工具链一律不看它。
2. **环境变量只对"新启动的进程"生效**。你改完变量，必须关掉当前终端重开，或者在当前会话里手动 export。
3. **端口号以你自己的客户端为准**。本文示例用 Clash 系的 `7890`（HTTP/Mixed）与 `7891`（SOCKS5）；v2rayN 系通常是 `10809`/`10808`，请自行替换。用错端口的表现是 `Failed to connect to 127.0.0.1 port 7890`，别去怀疑节点。

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

## 二、底层机理：为什么命令行总是"绕过"你的代理

Windows 的网络接管链路是分层且碎片化的，很多人只按了 UI 上那个开关，就以为万事大吉。

**第一层：WinINET。** 注册表路径 `HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings`，`ProxyEnable` + `ProxyServer` 两个值。浏览器、Electron 应用（VS Code、Slack、Discord）、部分 .NET Framework 应用读它。这也是"开系统代理浏览器能上"的原因。

**第二层：WinHTTP。** 完全独立的一套栈，服务于 Windows 服务、BITS、Windows Update、部分企业 VPN 客户端。用 `netsh winhttp` 配置，默认**不跟随 IE 设置**。想同步得手动 `netsh winhttp import proxy source=ie`。这条链路和 Git、curl 依然无关。

**第三层：应用自带网络栈。** 这是终端场景的主战场：

- `curl.exe`（Win10 1803+ 内置）来自 libcurl，只认环境变量 `http_proxy` / `HTTPS_PROXY` / `ALL_PROXY`，**完全不读注册表**。
- PowerShell 5.1 的 `Invoke-WebRequest` 基于 .NET Framework，会读 IE 设置；而 **PowerShell 7 基于 .NET Core，默认不读 IE 设置**。这是"PowerShell 5.1 能下包、pwsh 7 却超时"的根因。
- Git 的 HTTP 传输层是 libcurl，读 `http.proxy` 配置或环境变量，同样不看注册表。
- Go 的 `net/http`、Rust 的 reqwest 都读 `HTTP_PROXY` 系环境变量。
- npm/pnpm 有自己的一套 config 系统。

**第四层：SOCKS 与 UDP。** HTTP 代理只处理 TCP，且要求客户端实现 `CONNECT`。SSH 协议走的是裸 TCP，不会被 `http.proxy` 接管；DNS 的 UDP 53 查询也不会。要彻底覆盖，只能靠 TUN 模式在 WFP/路由层做流量劫持。

**为什么终端对链路质量如此敏感？** 因为命令行工具绝大多数是长连接 + 大流量 + 无重试缓冲的场景（`git clone`、`docker pull`、`pip install`）。丢包率从 `0.1%` 涨到 `1%`，TCP 拥塞窗口就会频繁折半，配合 BBRv3 的带宽探测收敛，实测吞吐可能直接掉 60% 以上。这也解释了为什么"网页能开、clone 卡死"很常见——网页是短连接小包，能忍；clone 是长肥管道，忍不了。

## 三、核心参数对照矩阵

### 表 1：四种终端代理接管方式（量化对比）

| 维度 | 系统代理开关 | 环境变量 | 客户端端口映射（HTTP/SOCKS） | TUN 模式 |
| --- | --- | --- | --- | --- |
| 命令行覆盖率 | 约