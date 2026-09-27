import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

const clientData = require('./data/client');

const docsRoot = path.resolve(__dirname, '../docs');

function generateClientArticleContent(art, cluster, sub, cat) {
  const dateStr = '2026-09-26';
  const secKeywordsText = art.secondaryKeywords.join('、');
  
  let intentBadge = '';
  switch (art.searchIntent) {
    case '决策': intentBadge = '客户端与工具选型指南'; break;
    case '教程': intentBadge = '实操配置与调优教程'; break;
    case '故障': intentBadge = '网络排障与故障自愈'; break;
    case '知识': intentBadge = '底层协议与内核全解'; break;
    case '购买': intentBadge = '软硬件选型与部署'; break;
    default: intentBadge = '专业深度评测';
  }

  const internalLinksMarkdown = art.internalLinks.map(link => {
    return `- [**${link.anchor}**](${link.target})：查看配套的节点推荐、系统调优或故障排查方案。`;
  }).join('\n');

  const longTailText = art.longTailKeywords.slice(0, 8).join('、');

  return `---
title: ${art.title} - AirPick
description: ${art.title}。本文针对${art.primaryKeyword}及${secKeywordsText}提供 2026 年最新全平台配置指南、内核特性解析与实操优化方案 · airpick.co
keywords: ${art.primaryKeyword}, ${art.secondaryKeywords.join(', ')}
lastUpdated: ${dateStr}
---

# ${art.title}

> **文章定位**：AirPick · ${intentBadge} | **核心主词**：\`${art.primaryKeyword}\` | **更新日期**：${dateStr} | **官方评测站**：[airpick.co](https://airpick.co)

---

## 一、直接答案 (TL;DR)

关于 **${art.primaryKeyword}**，核心结论如下：在 2026 年现代操作系统与代理协议演进下，选择与配置客户端的核心原则是 **“内核驱动优先、强隔离智能分流、首选 TUN 虚拟网卡模式”**。

对于 Windows 与 macOS 用户，首选基于 Mihomo/Meta 内核的 **Clash Verge Rev** 或全协议栈的 **sing-box**；iOS 平台首推 **Shadowrocket（小火箭）** 或 Quantumult X；Android 端推荐轻量极速的 **sing-box for Android (SFA)** 或 **v2rayNG**；家庭与多设备局域网环境则建议通过 **OpenWrt 软路由 PassWall/OpenClash** 实现无感全局透明代理。严禁使用闭源或未经数字签名的破解版客户端，谨防本地私钥泄露。

---

## 二、详细原因与底层技术背景

为什么在探讨 **${art.primaryKeyword}**（涵盖 ${secKeywordsText} 等关键诉求）时，不同客户端与系统环境的实际体验天差地别？深入理解以下三项底层运行机制至关重要：

### 1. 系统代理（System Proxy）与 TUN 模式虚拟网卡的根本区别
传统客户端通过设置操作系统环境变量（\`http_proxy\` / \`socks5\`）工作。这种模式仅对遵循系统代理约定的浏览器等应用生效，对于终端命令行（Git/SSH）、海外网络游戏（UDP 流量）及某些强制直连的应用完全无效。而开启 **TUN 模式（TUN Interface）** 后，客户端会在系统底层创建一张虚拟网卡，接管整台设备全部三层（IP 层）网络数据流，真正实现“全应用接管”与“UDP 全息透明转发”。

### 2. DNS 污染治理与分流解析（Fake-IP vs Real-IP）
GFW 最主要的封锁手段之一是 DNS 投毒污染。现代优质客户端（如 Clash Verge Rev、sing-box）采用了先进的 **Fake-IP（虚拟 IP 映射）** 架构。当应用程序发起域名请求时，客户端内核直接在本地高频分配一个假 IP（如 198.18.0.x）立即返回，并将真实域名封装入远程加密报文发往境外节点再做精准解析，彻底规避本地 DNS 污染并大幅降低网络解析握手等待时间（RTT 缩短 40% 以上）。

### 3. 多协议支持与内核并发调度机制
随着 Shadowsocks (SS) 传统特征逐步被深度包检测（DPI）识别，现代网络环境高度依赖 **VLESS with Reality、Hysteria 2、TUIC v5** 等抗审查抗封锁协议。新一代内核（如 Mihomo / sing-box core）通过 Go 协程并发调度与内存零拷贝技术，在高负载千兆吞吐场景下，CPU 占用率较旧版客户端降低 35%，彻底告别发热降频与丢包卡顿。

---

## 三、操作步骤与落地方案

针对 **${art.title}** 的应用场景，请按照以下经 AirPick 实验室实测验证的标准流程进行配置：

### 步骤一：安全获取正版客户端与依赖运行库
- **源码与正规渠道校验**：访问 GitHub 官方 Releases 仓库或官方应用商店（如 App Store、Google Play），核对安装包 SHA256 哈希校验码。
- **系统运行环境准备**：Windows 平台务必确认已安装 Microsoft Visual C++ Redistributable 最新运行库以及 WebView2 运行时；macOS 平台需授予相应的“网络扩展”或“系统辅助功能”权限。

### 步骤二：订阅链接安全导入与自动更新设置
1. 复制服务商提供的通用订阅链接（或点击“一键导入 Clash/sing-box”）。
2. 在客户端中添加订阅，建议将 **自动更新间隔（Auto Update Interval）** 设为 **12 小时至 24 小时**，确保节点列表与阻断封锁规则时刻保持最新。
3. 检查订阅源安全性，切勿通过不可信的第三方在线转换 API 解析包含个人 Token 的私密订阅。

### 步骤三：开启智能规则分流与高级模式
- **切换分流模式**：确保出站模式选择 **Rule（规则分流模式）**，切勿长期开启 Global（全局模式）以免浪费昂贵境外流量并拖慢境内网页访问速度。
- **启用 TUN 模式 / 服务模式**：在设置中安装 Service Core（服务模式），开启 TUN 模式开关。
- **策略组优选**：对于流媒体播放，选中带有“解锁/原生”标识的策略组；针对办公与 AI 工具，绑定专用低延迟专线节点。

<div style="margin: 1.5rem 0; padding: 1.2rem; background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-brand-1); border-radius: 8px;">
  <strong>💡 AirPick 读者专享福利提示：</strong><br>
  搭配本教程配置的高速低延迟专线节点，输入优惠码结账立享专享折减：
  <div style="margin-top: 8px;">
    <CopyCoupon code="AIRPICK2026" discount="立减20%" tip="点击一键复制AirPick独家折扣码" />
  </div>
</div>

---

## 四、关键量化指标与验收标准

在完成配置后，请按照以下专业标准进行网络连通性与安全性验收：

1. **DNS 泄漏测试与分流验证**：
   - 访问 [BrowserLeaks IP/DNS Leak Test](https://browserleaks.com/ip)，查看 DNS 服务器所在地。如果 DNS 归属地显示为境内运营商，说明存在严重 DNS 泄漏；合格状态应显示为代理节点同区域机房 DNS。
   - 访问国内百度或淘宝，展示本机真实国内 IP；访问 \`ipinfo.io\`，展示海外节点 IP，证明智能分流精准生效。
2. **TUN 模式下命令行代理验证**：
   - 打开 Windows PowerShell 或 macOS Terminal，无需配置任何代理环境变量，直接执行：
     \`\`\`bash
     curl -I https://www.google.com
     \`\`\`
   - 若能秒级返回 \\\`HTTP/2 200\\\` 状态码，证明 TUN 网卡接管成功。
3. **系统资源占用与长连接保活**：
   - 保持客户端在后台待机 2 小时，内存占用应保持在 80MB~200MB 以内，CPU 空闲占用率 **< 0.5%**。
   - 执行 10,000 次长连接测试，网络断连自动重连耗时应 **< 1 秒**。

---

## 五、注意事项与避坑警示

> [!WARNING] 常见配置陷阱排查
> - **端口冲突与循环代理**：严禁同时开启两个不同的代理软件（如同时打开 Clash 与 Shadowsocks），会导致本地 7890 端口冲突或网络死锁断网。
> - **系统休眠后无法上网**：部分 Windows 电脑睡眠唤醒后虚拟网卡未正常激活，可将客户端彻底退出后重新以管理员身份运行。
> - **切勿盲目使用第三方在线转换器**：公网在线订阅转换工具极易在服务器端缓存你的私人订阅链接并进行节点盗刷，敏感场景建议本地搭建 Subconverter 或使用客户端原生解析。
> - **合规与数字安全边界**：请规范使用科学网络，禁止在公共或不安全网络环境下关闭客户端的证书安全校验（Skip-Cert-Verify）。

---

## 六、延伸阅读与相关专题推荐

为进一步提升您的多端网络配置与设备协同体验，推荐阅读以下技术指南：

${internalLinksMarkdown}

---

> **本文收录于 [AirPick · 客户端与设备指南](https://airpick.co)**  
> 检索关键词覆盖：${longTailText} 等。欢迎收藏本站并分享给身边的技术同好。
`;
}

let generatedCount = 0;
clientData.subcategories.forEach(sub => {
  sub.clusters.forEach(cluster => {
    const clusterDir = path.join(docsRoot, clientData.id, sub.id, cluster.id);
    if (!fs.existsSync(clusterDir)) {
      fs.mkdirSync(clusterDir, { recursive: true });
    }

    cluster.articles.forEach(art => {
      const filePath = path.join(clusterDir, `${art.slug}.md`);
      const content = generateClientArticleContent(art, cluster, sub, clientData);
      fs.writeFileSync(filePath, content, 'utf-8');
      generatedCount++;
    });
  });
});

console.log(`Successfully generated ${generatedCount} comprehensive articles for Category 2 (/client/)!`);
