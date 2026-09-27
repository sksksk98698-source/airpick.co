import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

const tutorialData = require('./data/tutorial');

const docsRoot = path.resolve(__dirname, '../docs');

function generateTutorialArticleContent(art, cluster, sub, cat) {
  const dateStr = '2026-09-26';
  const secKeywordsText = art.secondaryKeywords.join('、');
  
  let intentBadge = '';
  switch (art.searchIntent) {
    case '知识': intentBadge = '网络通识与原理精解'; break;
    case '教程': intentBadge = '新手实操与调优教程'; break;
    case '决策': intentBadge = '选型对比与决策指南'; break;
    case '购买': intentBadge = '避坑选购与资产防范'; break;
    case '故障': intentBadge = '故障自查与诊断手册'; break;
    default: intentBadge = '专业深度评测';
  }

  const internalLinksMarkdown = art.internalLinks.map(link => {
    return `- [**${link.anchor}**](${link.target})：查看与之配套的基础概念、客户端配置或横向对比实测。`;
  }).join('\n');

  const longTailText = art.longTailKeywords.slice(0, 8).join('、');

  return `---
title: ${art.title} - AirPick
description: ${art.title}。本文系统化讲解${art.primaryKeyword}及${secKeywordsText}，为新手到进阶技术用户提供 2026 年最新实操指引、底层认知与对比评测 · airpick.co
keywords: ${art.primaryKeyword}, ${art.secondaryKeywords.join(', ')}
lastUpdated: ${dateStr}
---

# ${art.title}

> **文章定位**：AirPick · ${intentBadge} | **核心主词**：\`${art.primaryKeyword}\` | **更新日期**：${dateStr} | **官方评测站**：[airpick.co](https://airpick.co)

---

## 一、直接答案 (TL;DR)

关于 **${art.primaryKeyword}**，核心结论如下：无论是新手入门还是进阶调优，掌握出海科学网络的关键是 **“理解底层数据流向、选对现代抗封锁协议、善用规则分流保护隐私”**。

“机场”本质上是基于 Shadowsocks、VLESS、Hysteria 2 等现代网络协议建立的分布式多节点集群转发服务。新手使用时，切忌盲目依赖一键全代理或不明来源的破解软件，应通过主流开源客户端（如 Clash Verge Rev、sing-box、Shadowrocket）配合正规订阅链接，遵循 **“Rule 规则分流、本地 DNS 防污染、先月付后长付”** 的最佳实践，既能享受秒开外网的顺畅体验，又能最大程度保障个人数字隐私与财产安全。

---

## 二、详细原因与底层技术背景

为什么在 **${art.primaryKeyword}**（涉及 ${secKeywordsText} 等核心维度）的实操与选型中，存在如此多的门道与认知误区？深入探究以下三项底层机理：

### 1. 传统 VPN 与现代“机场代理”的本质架构差异
很多人常把机场与 VPN 混为一谈。传统 VPN（如 OpenVPN、IPSec）最初设计用于企业远程安全组网，其数据包特征极其明显，极易被防火墙深度包检测（DPI）一眼识别并瞬间切断阻断。而现代“机场”使用的是 **应用层加密混淆代理（如 Shadowsocks、VLESS with Reality）**，能够将跨境流量伪装成正常的 HTTPS（TLS 1.3）公网网页访问，或通过 UDP 暴力发包（Hysteria 2），在兼顾低延迟的同时实现高度抗审查。

### 2. 规则分流（Routing Rules）与国内外流量分道扬镳
如果开启全局代理（Global Mode），你访问国内的微信、淘宝、爱奇艺等服务也会经由海外节点绕行一圈，不仅会导致访问变慢、网银登录报警，还会白白消耗昂贵的机场境外流量配额。现代客户端通过本地 GeoIP 与 GeoSite 数据库，能够以毫秒级速度识别数据包目的地：**中国大陆域名与 IP 走本地宽带直连（Direct），受限海外域名自动分流至最适宜的海外节点（Proxy）**。

### 3. 订阅链接（Subscription Link）与 Token 鉴权机制
用户在机场后台复制的“订阅链接”本质上是一个带有专属鉴权密钥（Token）的动态配置文件接口。客户端每隔一段时间（如每天）向该接口发起 HTTP GET 请求，拉取最新的节点 IP、端口、密码与加密协议信息。一旦你的订阅链接被泄露，任何人都能同步下载你的所有节点并共用你的流量额度，甚至造成节点封禁。

---

## 三、操作步骤与落地方案

针对 **${art.title}** 涉及的操作与知识点，推荐按照以下规范化的四步法执行：

### 步骤一：获取正规客户端与准备订阅
1. 访问各平台经过社区安全审计的开源发布源（如 GitHub Releases 或正规应用商店）。
2. 在机场后台用户中心，点击“一键复制订阅地址”或导出为 Clash / sing-box 格式。
3. **特别提醒**：切勿将包含私密 Token 的订阅链接发送至公共聊天群或公开论坛。

### 步骤二：正确导入并验证节点可用性
- 打开客户端（以 Clash Verge Rev 为例），进入 **订阅（Profiles）** 页面，粘贴链接并点击“保存并导入（Save & Import）”。
- 在 **代理（Proxies）** 界面点击右下角闪电图标进行批量真连接延迟测试（True Latency Test）。
- 挑选延迟数值绿色（< 80ms）的节点作为首选。

### 步骤三：开启智能规则分流与高级防泄漏
1. 出站模式务必保持为 **Rule（规则模式）**。
2. 开启 **TUN 模式** 或 **系统代理**。
3. 针对敏感需求，在设置中开启 **DNS 防泄漏（DNS Leak Protection）**，关闭 IPv6 避免原生 IPv6 旁路绕过代理泄露物理真实 IP。

<div style="margin: 1.5rem 0; padding: 1.2rem; background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-brand-1); border-radius: 8px;">
  <strong>💡 AirPick 读者专享福利提示：</strong><br>
  选购高口碑稳定专线，输入专属优惠码即享折减，新手尝鲜更省心：
  <div style="margin-top: 8px;">
    <CopyCoupon code="AIRPICK2026" discount="立减20%" tip="点击一键复制AirPick独家折扣码" />
  </div>
</div>

---

## 四、关键量化指标与验收标准

在完成相关配置与学习后，请依照以下三项指标进行操作验收：

1. **分流准确度核验**：
   - 访问国内网站（如 \`https://www.ip138.com\`），显示的应为本地运营商真实 IP；
   - 访问海外网站（如 \`https://ipinfo.io\`），显示的应为代理节点所属的海外机房 IP。
2. **连接稳定性与延迟抖动**：
   - 连续访问测试 50 次，HTTP 状态码成功率达到 **100%**；
   - 真连接测试延迟抖动幅度控制在 **10ms 以内**。
3. **本地系统性能占用**：
   - 客户端正常运行状态下，RAM 内存占用稳定在 **60MB~150MB**，CPU 使用率 **< 1%**。

---

## 五、注意事项与避坑警示

> [!WARNING] 新手必读避坑指南
> - **切勿贪小便宜买超低价“终身套餐”**：网络带宽是持续消耗的重资产，任何承诺“几十元终身不限流量”的商家 99.9% 是资金盘跑路前夕的卷款收割套路。
> - **切勿使用非官方修改版客户端**：各类未经审计的“汉化破解版”、“内置节点特别版”常被植入恶意挖矿木马或键盘记录器，导致密码和数字钱包被盗。
> - **避免在开启代理状态下登录国内敏感支付网银**：在登录境内手机银行或进行大额网银转账时，建议临时暂停代理或确认其处于严格规则模式。
> - **严守合规底线**：请始终在合法合规的前提下进行学术研究、跨境商务与个人技术交流。

---

## 六、延伸阅读与相关专题推荐

为进一步拓展您的知识面，推荐继续查阅以下技术专题与对比横评：

${internalLinksMarkdown}

---

> **本文收录于 [AirPick · 教程知识指南](https://airpick.co)**  
> 检索关键词覆盖：${longTailText} 等。欢迎收藏本站并分享给身边的技术同好。
`;
}

let generatedCount = 0;
tutorialData.subcategories.forEach(sub => {
  sub.clusters.forEach(cluster => {
    const clusterDir = path.join(docsRoot, tutorialData.id, sub.id, cluster.id);
    if (!fs.existsSync(clusterDir)) {
      fs.mkdirSync(clusterDir, { recursive: true });
    }

    cluster.articles.forEach(art => {
      const filePath = path.join(clusterDir, `${art.slug}.md`);
      const content = generateTutorialArticleContent(art, cluster, sub, tutorialData);
      fs.writeFileSync(filePath, content, 'utf-8');
      generatedCount++;
    });
  });
});

console.log(`Successfully generated ${generatedCount} comprehensive articles for Category 5 (/tutorial/)!`);
