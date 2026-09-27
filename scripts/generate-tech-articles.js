import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

const techData = require('./data/tech');

const docsRoot = path.resolve(__dirname, '../docs');

function generateTechArticleContent(art, cluster, sub, cat) {
  const dateStr = '2026-09-26';
  const secKeywordsText = art.secondaryKeywords.join('、');
  
  let intentBadge = '';
  switch (art.searchIntent) {
    case '决策': intentBadge = '技术架构与选型决策'; break;
    case '知识': intentBadge = '硬核网络底层原理全解'; break;
    case '教程': intentBadge = '网络诊断与链路实战'; break;
    case '故障': intentBadge = '路由追踪与网络排障'; break;
    case '购买': intentBadge = '专线与优质资源选购'; break;
    default: intentBadge = '专业深度评测';
  }

  const internalLinksMarkdown = art.internalLinks.map(link => {
    return `- [**${link.anchor}**](${link.target})：查看配套的底层物理线路剖析、节点推荐或调优手册。`;
  }).join('\n');

  const longTailText = art.longTailKeywords.slice(0, 8).join('、');

  return `---
title: ${art.title} - AirPick
description: ${art.title}。本文硬核深度解析${art.primaryKeyword}及${secKeywordsText}，从物理链路、BGP选路、IP纯净度到全球机房延迟提供 2026 年最新架构剖析与选型指引 · airpick.co
keywords: ${art.primaryKeyword}, ${art.secondaryKeywords.join(', ')}
lastUpdated: ${dateStr}
---

# ${art.title}

> **文章定位**：AirPick · ${intentBadge} | **核心主词**：\`${art.primaryKeyword}\` | **更新日期**：${dateStr} | **官方评测站**：[airpick.co](https://airpick.co)

---

## 一、直接答案 (TL;DR)

关于 **${art.primaryKeyword}**，核心结论如下：在现代跨境网络通信与基础设施选型中，决定网络最终延迟、抖动与可用性的决定性要素是 **“物理传输链路路径、跨境出海边界网关等级以及落地 IP 的自治系统号（ASN）信誉”**。

在预算充足的前提下，**端到端物理以太网专线（IEPL）** 是企业出海、外贸金融与关键 AI 业务的最优解；对于大众高性价比用户，采用 **BGP 多线智能接入 + 跨境大带宽隧道** 能够兼顾成本与晚高峰稳定性；而针对特定电信运营商，优选 **电信 CN2 GIA、联通 9929、移动 CMIN2** 精品网。选型时务必坚持以 MTR 连续路由追踪与实际丢包率为衡量基准，严拒机房公网直连伪装成专线的营销套路。

---

## 二、详细原因与底层技术背景

为什么探讨 **${art.primaryKeyword}**（涵盖 ${secKeywordsText} 等核心维度）需要深入到物理网路层？其背后由以下三项不可逾越的通信工程原理决定：

### 1. 物理层传输介质与光纤延迟物理极限
网络数据包的传输速度受限于光在玻璃光纤中的折射率（约每 1000 公里单向光速耗时 5 毫秒，折返 RTT 约 10ms）。
- **国内至香港**：广东深圳至香港物理专线单向距离 < 50 公里，物理端到端延迟仅 2~5ms；
- **国内至日本东京**：上海经由中日海底光缆直连东京，物理理论往返延迟在 25~35ms 之间；
- **国内至美西洛杉矶**：跨太平洋海底光缆（如 NCP、FASTER、PLCN）直达物理极限在 115~130ms。  
任何号称“美西 30ms 延迟”的宣传均为虚假的本地 Ping 欺骗劫持。

### 2. 骨干网拥塞、QoS 等级与精品网优先队列
中国公网骨干网（如电信 163 骨干网，AS4134）晚高峰承载着过饱和的民用带宽。运营商在国际互联交换中心（IXP）部署了严格的 QoS 限速策略。普通流量被标记为 Best-Effort（尽力而为），丢包率飙升；而 **电信 CN2 GIA（AS4809，路由节点为 59.43.x.x）**、**联通 A 网（AS9929，路由节点为 218.105.x.x）** 则享有独立的高优先级专用带宽通道，即使在晚高峰依然保持零排队零丢包。

### 3. IP 属性分类与风控数据库识别原理
IP 地址在互联网治理架构中分配给不同的自治系统（ASN）。IP 数据库（MaxMind、IPinfo、Spur）将 IP 分类为 **Hosting（机房托管数据中心）** 与 **ISP / Residential（家庭住宅宽带）**。
- **广播 IP**：通过 BGP Anycast 将海外廉价 IP 宣告至香港/日本机房，成本低廉但已被 OpenAI、各大流媒体深度标记，极易拦截；
- **原生本土 IP**：注册地与机房物理机架地理位置一致，机房白名单信誉良好；
- **静态住宅 IP**：直接由当地运营商（如 AT&T、Verizon、Comcast、HKT）向终端家庭分配的 IP，享有最高安全白名单待遇。

---

## 三、操作步骤与落地方案

针对 **${art.title}** 涉及的技术验证与链路调优，请参考以下实操步骤开展工程化排查：

### 步骤一：使用 MTR / NextTrace 进行精准路由追踪
1. 下载开源网络诊断工具 **NextTrace** 或 **BestTrace / WinMTR**。
2. 针对节点境内接入点与境外落地节点分别执行双向路由测试：
   \`\`\`bash
   nexttrace --fast 目标节点IP
   \`\`\`
3. **识别真假专线核心特征**：
   - 若测试境内接入端到落地端之间只有 1~2 跳，且跳数 IP 为内网私有地址（如 \`10.x.x.x\` 或 \`172.16.x.x\`），中间完全不出现三大运营商国际出口路由（如 \`202.97.x.x\`），说明为**真正的内网物理专线**；
   - 若路由轨迹中出现了多跳公网节点且在边界处遭遇连续 30% 以上丢包，说明为**公网中转伪装专线**。

### 步骤二：IP 纯净度与解锁能力自动化脚本检测
在连接节点后，可通过终端一键脚本进行综合解锁能力与 IP 风险评级测试：
\`\`\`bash
bash <(curl -L -s check.unlock.media)
\`\`\`
重点核查项目：
- **Netflix 解锁**：是否支持 Native（原生全解锁）还是仅支持 Originals（仅自制剧）；
- **OpenAI / Claude 支持**：是否支持 ChatGPT 登录与 API 访问；
- **Scamalytics 风险分**：输入当前出口 IP，确认 Fraud Score **< 20**。

### 步骤三：客户端网络分流与容灾冗余配置
在 Clash Verge Rev 或 sing-box 配置文件中，针对重要业务构建双活容灾：
- **主线路**：绑定低延迟 IEPL 专线，优先处理 AI 与外贸长连接；
- **备用线路**：设置 fallback 或 failover 策略组，一旦主线路遭遇不可抗力故障，在 3 秒内平滑切换至精品 BGP 备用通道。

<div style="margin: 1.5rem 0; padding: 1.2rem; background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-brand-1); border-radius: 8px;">
  <strong>💡 AirPick 读者专享福利提示：</strong><br>
  选购全线搭载真 IEPL 物理专线与原生住宅 IP 的企业级服务，结账时输入专属优惠码即享折减：
  <div style="margin-top: 8px;">
    <CopyCoupon code="AIRPICK2026" discount="立减20%" tip="点击一键复制AirPick独家折扣码" />
  </div>
</div>

---

## 四、关键量化指标与验收标准

在评测与验收相关网络线路时，建议采用以下量化测试指标进行严格把关：

1. **多时段连续 200 次 Ping 丢包率与网络抖动（Jitter）**：
   - **IEPL 专线**：晚高峰 20:00-23:00 丢包率必须 **= 0%**，Jitter 抖动 **< 3ms**；
   - **优质 BGP 隧道**：丢包率应 **< 1%**，Jitter 抖动 **< 8ms**；
   - **普通直连线路**：若丢包率超过 10%，则不达标。
2. **单线程下行带宽吞吐压测**：
   - 采用 Speedtest 独立单线程（Single Connection）测试：
     - 千兆专线节点单线程速率不应低于 **100 Mbps**；
     - 4K 流媒体播放即时码率稳在 **60,000 Kbps** 以上。
3. **真实 IP 属性验证矩阵**：
   - IP 数据库查询结果中，\`Usage Type\` 显示为 \`ISP\` 或 \`Business\`，而非高危的 \`Data Center/Hosting\`。

---

## 五、注意事项与避坑警示

> [!WARNING] 线路与技术核心避坑警示
> - **警惕“假专线”李鬼商家的智商税**：市场上大量月付几元的小机场将普通公网直连节点重命名为“IEPL 顶级专线”，一旦遇到敏感时期瞬间大面积飘红瘫痪。务必通过路由追踪核实。
> - **切勿轻信所谓的“单节点全能神话”**：没有任何单一节点能同时做到超低延迟（游戏需求）、超纯净住宅 IP（外贸风控需求）与无限大带宽超低价（大文件下载需求）。合理组合多类型线路才是正解。
> - **关注物理入口跨省调度**：如果用户身在北方（如北京、沈阳），却强制连接位于广东深圳的专线入口，光是国内跨省往返延迟就高达 35ms。优质机场应在华北、华东、华南均设有 BGP 智能多入口。
> - **合规与数字安全边界**：请坚持正当科研、学习与跨境经贸使用，远离非法网络活动。

---

## 六、延伸阅读与相关专题推荐

为进一步了解客户端配置与场景化应用方案，推荐阅读以下技术指南：

${internalLinksMarkdown}

---

> **本文收录于 [AirPick · 技术线路指南](https://airpick.co)**  
> 检索关键词覆盖：${longTailText} 等。欢迎收藏本站并分享给身边的技术同好。
`;
}

let generatedCount = 0;
techData.subcategories.forEach(sub => {
  sub.clusters.forEach(cluster => {
    const clusterDir = path.join(docsRoot, techData.id, sub.id, cluster.id);
    if (!fs.existsSync(clusterDir)) {
      fs.mkdirSync(clusterDir, { recursive: true });
    }

    cluster.articles.forEach(art => {
      const filePath = path.join(clusterDir, `${art.slug}.md`);
      const content = generateTechArticleContent(art, cluster, sub, techData);
      fs.writeFileSync(filePath, content, 'utf-8');
      generatedCount++;
    });
  });
});

console.log(`Successfully generated ${generatedCount} comprehensive articles for Category 4 (/tech/)!`);
