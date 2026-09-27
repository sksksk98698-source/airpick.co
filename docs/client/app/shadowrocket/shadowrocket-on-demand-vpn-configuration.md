---
title: 小火箭按需连接（On Demand）配置：无感自动启停的高级极客玩法 - AirPick
description: 小火箭按需连接（On Demand）配置：无感自动启停的高级极客玩法。本文针对小火箭按需连接及 On Demand 自动开关、连 WiFi 自动关代理、切到 4G 自动开代理、极客无感代理配置提供 2026 年最新全平台配置指南、内核特性解析与实操优化方案 · airpick.co
head:
  - - meta
    - name: keywords
      content: 小火箭按需连接, On Demand自动开关, 连WiFi自动关代理, 切到4G自动开代理, 极客无感代理配置
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: 小火箭按需连接（On Demand）配置：无感自动启停的高级极客玩法
  - - meta
    - property: og:description
      content: 从 iOS NetworkExtension 判定时序到 SSID 规则编排，一份可落地的 Shadowrocket On Demand 极客配置与排障指南。
---

# 小火箭按需连接（On Demand）配置：无感自动启停的高级极客玩法

## 一、TL;DR：先给结论，再讲原理

如果你只是想知道"到底怎么设"，这里是压缩到 30 秒的答案：

1. **主用场景是"家/公司 Wi-Fi + 蜂窝"混合**：用"按 SSID 断开 + 接口类型为蜂窝时连接"的双条件规则，其他网络用默认策略兜底。
2. **规则顺序是从上往下命中即停**，把最具体、最特殊的 SSID 放在最上面，宽泛的"蜂窝 / 其他 Wi-Fi"放最下面。
3. **公共 Wi-Fi（机场、酒店、咖啡厅）**要单独拎出来，否则 Captive Portal 认证会被隧道劫持，表现为"连上 Wi-Fi 但打不开任何网页"。
4. **合理预期**：SSID 切换后到代理真正生效，系统侧耗时通常在 0.8–2.5 秒之间。任何宣称"零延迟瞬时切换"的说法都不成立，因为 iOS 的规则判定跑在内核扩展拉起之前。
5. **耗电**：按需连接本身几乎不额外耗电，真正吃电的是隧道加密转发。按需模式在 Wi-Fi 下主动断开，反而是省电的做法。

<div style="margin: 1.5rem 0; padding: 1.2rem; background: var(--vp-c-bg-alt); border: 1.5px dashed var(--vp-c-brand-1); border-radius: 10px;">
  <strong>💡 🥉 2026 轻度高性价比 · 【微风网络】读者专享特惠通道：</strong><br>
  <span style="font-size: 0.92rem; color: var(--vp-c-text-2); display: inline-block; margin: 6px 0;">IEPL 专线，年付折合 7 元/月，50GB/月起步，小流量用户首选，网页社交与学术搜索极速稳定：</span>
  <div style="margin: 8px 0;">
    <CopyCoupon code="flat888" discount="9折特惠" url="https://edp01.breezenetaff.com/#/?code=t3huofyI" brandName="微风网络" tip="点击复制专属优惠码并直达官网" />
  </div>
  <div style="font-size: 0.85rem; margin-top: 6px;">
    👉 <a href="/reviews/breezenet/">查看【微风网络】实验室 2026 最新测速报告与深度评测 →</a>
  </div>
</div>

为什么要把微风网络放在这里？因为按需连接这套玩法有一个隐藏前提——**你的节点必须在"隧道刚建立的那一瞬间"就能用**。很多廉价机场的落地在 TCP 首包阶段就要多花 300–800ms，叠加系统的 1–2 秒切换开销后，你会误以为是"按需连接不生效"。IEPL 专线省掉了公网绕行，握手阶段的抖动小得多，这件事对无感体验的影响，比多买 500GB 流量大得多。

---

## 二、底层机理：On Demand 到底在系统里发生了什么

### 2.1 iOS 的 VPN 不是常驻进程

这是理解一切的前提。在小火箭这类基于 NetworkExtension 的代理 App 里，真正干活的是 **Packet Tunnel Provider**——一个由系统托管、按需拉起的网络扩展（NEExtension）。主 App 只是个配置界面，你不点它、它也可以在后台完全不运行。

系统的调度中枢是 `nehelper` 与 `nesessionmanager` 这两个守护进程。它们负责：读取你配置的 On Demand 规则 → 监听网络状态变化 → 决定是否拉起隧道扩展。

### 2.2 NEOnDemandRule 的四种判定动作

在 Apple 的 NetworkExtension 框架里，按需规则本质上是四类动作的组合：

- **Connect**：条件命中 → 建立隧道
- **Disconnect**：条件命中