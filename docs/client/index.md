---
title: 客户端与设备指南 · 全平台代理软件配置与装机推荐
description: 2026 全平台科学上网客户端与设备配置全景指南：涵盖 Clash Verge、Shadowrocket 小火箭、v2rayN、sing-box 及 Win/Mac/iOS/安卓/软路由。
keywords: 客户端推荐, Clash机场, Shadowrocket小火箭, v2rayN配置, sing-box, 软路由翻墙, iPhone翻墙
---

# 客户端与设备指南 · 全平台装机与配置枢纽

在 **AirPick**（[airpick.co](/)），我们深知：“**好机场配好工具，体验才能翻倍**”。无论您使用的是 Windows 办公主机、Mac 生产力笔记本、iPhone、安卓手机还是家庭软路由，本专区为您提供全套装机选型与保姆级图文配置指引。

---

## 核心专题导航矩阵

### 1. 客户端软件 (`/client/app/`)
主流核心开源代理工具测评与实操：
- **[2.1.1 Clash 机场推荐](/client/app/clash/)**：支持 Clash Verge Rev 与 Mihomo 内核的优质机场、规则集分流与 TUN 模式。
- **[2.1.2 Shadowrocket 机场推荐](/client/app/shadowrocket/)**：iOS 装机必备“小火箭”专属机场、美区 Apple ID 获取与防锁机指南。
- **[2.1.3 v2rayN 机场推荐](/client/app/v2rayn/)**：Windows 经典老牌工具、Xray/sing-box 双核心切换与系统代理修复。
- **[2.1.4 sing-box 机场推荐](/client/app/sing-box/)**：下一代通用全能核心、低内存占用、狂暴吞吐量与透明网关搭建。

### 2. 硬件设备端 (`/client/device/`)
针对不同操作系统与终端特性的专属优化：
- **[2.2.1 Windows 机场推荐](/client/device/windows/)**：Win10/Win11 代理设置、终端 PowerShell/Git 走代理、关代理后断网修复。
- **[2.2.2 Mac 机场推荐](/client/device/mac/)**：macOS 生产力配置、Surge vs Clash 对比、终端 Homebrew 极速克隆。
- **[2.2.3 iPhone 机场推荐](/client/device/iphone/)**：免拔卡刷 TikTok、后台保活省电设置、快捷指令自动化启停。
- **[2.2.4 Android 机场推荐](/client/device/android/)**：v2rayNG/SFA 选型、分应用代理（银行炒股走直连）、后台防杀保活。
- **[2.2.5 路由器与电视机场](/client/device/router/)**：OpenWrt/iStoreOS 软路由全屋翻墙、Apple TV 4K 与智能电视盒子免客户端出海。

---

## 全平台客户端最佳组合速查表

| 设备操作系统 | 推荐客户端软件 | 优势特性 | 新手上手难度 | 深度教程入口 |
| :--- | :--- | :--- | :--- | :--- |
| **Windows 10/11** | **Clash Verge Rev** | 现代界面、TUN 虚拟网卡、自动测优 | ★★☆☆☆ (简单) | [Windows 配置指南](/client/device/windows/) |
| **macOS (M1-M4)** | **Clash Verge Rev / Surge** | 系统无感集成、增强模式、极低内存 | ★★☆☆☆ (简单) | [Mac 生产力配置](/client/device/mac/) |
| **iPhone / iPad** | **Shadowrocket (小火箭)** | 规则强大、去广告、支持 URL 唤醒 | ★☆☆☆☆ (极简) | [小火箭配置教程](/client/app/shadowrocket/) |
| **Android 安卓** | **v2rayNG / sing-box (SFA)** | 开源轻量、分应用代理、后台省电 | ★★☆☆☆ (适中) | [安卓系统翻墙大全](/client/device/android/) |
| **软路由 / 客厅 TV** | **OpenClash / tvOS 小火箭** | 全屋设备自动翻墙、大屏 4K 零配置 | ★★★★☆ (进阶) | [软路由与电视专栏](/client/device/router/) |

---

## 客户端使用三大核心原则
1. **坚决在 GitHub 官方仓库下载**：开源软件请认准官方 Release 页面，绝不使用百度搜索前排包含盗号木马的第三方“打包版”。
2. **正确处理分流模式**：日常使用建议选择 **Rule（规则模式）**，国内网站直连不扣流量，海外网站走代理。
3. **退款或换软件前先关系统代理**：直接强制退出软件可能导致 Windows 注册表残留代理配置而断网，详见 [《连接失败与断网修复》](/help/faq/connect-fail/)。
