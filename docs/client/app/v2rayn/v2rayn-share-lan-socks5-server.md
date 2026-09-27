---
title: v2rayN 局域网分享给全屋：搭建家庭简易 Socks5 代理服务器 - AirPick
description: v2rayN 局域网分享给全屋实战：从 0.0.0.0 监听、Windows 防火墙放行到手机/平板/电视接入，附 10 项量化对照表、抓包排障命令手册、避坑矩阵与 2026 年家庭多设备共享上网选型建议 · airpick.co
head:
  - - meta
    - name: keywords
      content: v2rayN局域网分享,电脑开代理给手机,v2rayN搭建Socks5代理,局域网设备代理设置,家庭多设备共享上网
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: v2rayN 局域网分享给全屋：搭建家庭简易 Socks5 代理服务器
  - - meta
    - property: og:description
      content: 把 Windows 上的 v2rayN 变成家庭 Socks5 网关：监听配置、防火墙放行、全平台接入与抓包排障全流程。
  - - meta
    - name: twitter:card
      content: summary_large_image
---

# v2rayN 局域网分享给全屋：搭建家庭简易 Socks5 代理服务器

## 一、先说结论（TL;DR）

把 Windows 上跑着的 v2rayN 变成「家庭 Socks5 服务器」，本质只有一句话：**让 Xray 内核的 inbound 从 `127.0.0.1:10808` 改成 `0.0.0.0:10808`，再放行防火墙的 TCP 入站规则。**

具体三步：

1. v2rayN → 设置 → 参数设置 → 基础设置，勾选 **「允许来自局域网的连接」**；
2. Windows 防火墙放行 TCP `10808`（Socks5）与 `10809`（HTTP），并把当前网络配置文件切换为「专用网络」；
3. 手机/平板/电视端填写宿主机内网 IP（如 `192.168.1.100`）+ 端口 `10808`，协议选 SOCKS5。

**三个必须先知道的坑：**

- iOS 系统 Wi-Fi 代理**只支持 HTTP**，不支持 SOCKS5。要么填 `10809`（HTTP 端口），要么装 Shadowrocket 这类客户端。
- 客户端 DNS 解析走本地还是走代理端，直接决定成败。用 `socks5h://` 或 `--socks5-hostname` 让代理端解析域名，才能避开 DNS 污染。
- 宿主机一旦睡眠、休眠或 Wi-Fi 省电断连，**全屋断网**。电源计划必须先改。

如果这三条都做到了还是慢，问题几乎一定不在局域网这一段，而在跨境出口的那一跳。局域网千兆内网的延迟开销通常在 1–3 ms，而跨境段的抖动往往是它的十倍以上。

---

## 二、底层机理：v2rayN