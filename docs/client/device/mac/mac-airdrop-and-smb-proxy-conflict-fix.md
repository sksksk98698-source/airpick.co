---
title: Mac 隔空投送（AirDrop）与局域网文件共享受代理影响排查 - AirPick
description: Mac 隔空投送（AirDrop）与局域网文件共享受代理影响排查。本文针对 AirDrop 与代理冲突解决及隔空投送搜不到设备、局域网 SMB 共享被拦截、Bonjour 协议代理放行、本地局域网旁路规则提供 2026 年最新全平台配置指南、内核特性解析与实操优化方案 · airpick.co
head:
  - - meta
    - name: keywords
      content: AirDrop与代理冲突解决,隔空投送搜不到设备,局域网SMB共享被拦截,Bonjour协议代理放行,本地局域网旁路规则
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Mac 隔空投送（AirDrop）与局域网文件共享受代理影响排查 - AirPick
  - - meta
    - property: og:description
      content: 深度拆解 AWDL、Bonjour/mDNS 与 TUN 代理的三方冲突机理，给出 Clash/Mihomo、Surge、sing-box、Quantumult X 的局域网旁路配置模板与 tcpdump/dns-sd 抓包排障手册。
  - - meta
    - property: og:url
      content: https://airpick.co/client/device/mac/mac-airdrop-and-smb-proxy-conflict-fix
---

# Mac 隔空投送（AirDrop）与局域网文件共享受代理影响排查

## 一、TL;DR：先把结论拍在你脸上

如果你正经历「一开代理，AirDrop 就搜不到同事 / 连自家 NAS 的 SMB 共享转圈一分钟然后超时」，那么 90% 以上概率**不是节点问题、不是机场跑路、更不是 Mac 坏了**，而是你的代理内核在**本地链路层三处同时动了刀**：

1. **TUN 路由表把组播地址吞了**。`224.0.0.0/4`、`ff02::fb` 这些 Bonjour 赖以生存的组播流量，被塞进了 `utun` 隧道，结果就是 mDNS 广播出不了物理网卡。
2. **Fake-IP DNS 把 `.local` 域名劫持了**。你的 Mac 把 `MacBook-Pro.local` 解析成了 `198.18.x.x` 这个假地址，自然找不到任何设备。
3. **私有网段被代理规则误伤**。`192.168.x.x` 的 SMB（TCP 445）命中了某条 `MATCH`/`FINAL` 兜底规则，被送去海外绕了一圈，你不超时谁超时。

**正确解法不是关代理**，而是在内核配置里同时做三件事：**组播直连放行 + `.local` 加入 Fake-IP 白名单 + UDP 5353 强制走物理网卡出口**。本文后续会给出可直接抄的配置模板。

判断优先级：先查 `scutil --dns`（DNS 层） → 再查 `netstat -rn | grep 224`（路由层） → 最后 `sudo tcpdump -i awdl0`（链路层）。这三板斧能覆盖 80%