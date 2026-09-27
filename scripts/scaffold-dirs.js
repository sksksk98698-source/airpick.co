const fs = require('fs');
const path = require('path');

const airportData = require('./data/airport');
const clientData = require('./data/client');
const scenarioData = require('./data/scenario');
const techData = require('./data/tech');
const tutorialData = require('./data/tutorial');
const helpData = require('./data/help');
const reviewsData = require('./data/reviews');

const categories = [airportData, clientData, scenarioData, techData, tutorialData, helpData];
const docsRoot = path.resolve(__dirname, '../docs');

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// 1. Scaffold Home page docs/index.md
const homeContent = `---
layout: home

hero:
  name: AirPick
  text: 2026 机场推荐
  tagline: 稳定、便宜、好用的机场排行榜 · airpick.co
  actions:
    - theme: brand
      text: 浏览机场排行榜
      link: /airport/ranking/top/
    - theme: alt
      text: 新手入门教程
      link: /tutorial/basic/what-is/

features:
  - icon: 🏆
    title: 机场排行榜
    details: 2026 年稳定、便宜、专线机场综合排名与真实测速
    link: /airport/ranking/top/
  - icon: 💰
    title: 便宜机场推荐
    details: 月付 10-30 元高性价比机场精选与平价梯子清单
    link: /airport/price/cheap/
  - icon: 🚀
    title: 专线机场推荐
    details: IEPL / IPLC 物理跨境内网专线高端梯子深度横评
    link: /airport/type/premium/
  - icon: 🤖
    title: ChatGPT 机场推荐
    details: 原生解锁 ChatGPT、Claude 3.5 与 Gemini 的高可用节点
    link: /scenario/ai/chatgpt/
  - icon: 🎬
    title: Netflix 机场推荐
    details: 流媒体全区解锁、YouTube 4K 秒开与 TikTok 跨境网络
    link: /scenario/streaming/netflix/
  - icon: 🛠️
    title: 客户端教程
    details: Clash Verge、Shadowrocket、v2rayN 与 sing-box 保姆级配置
    link: /client/app/clash/
---

<div style="margin-top: 3rem; text-align: center; color: var(--vp-c-text-2); font-size: 0.95rem;">
  <strong>AirPick · 域名：airpick.co</strong> | 抢占机场核心评测，覆盖全场景网络应用
</div>
`;

fs.writeFileSync(path.join(docsRoot, 'index.md'), homeContent, 'utf-8');

// 2. Scaffold docs/about.md
const aboutContent = `---
title: 关于 AirPick · 评测标准与免责声明
description: AirPick (airpick.co) 专注为中文用户提供客观、透明、严谨的机场推荐、测速与使用指南。
---

# 关于 AirPick · 机场推荐指南

**AirPick**（官方域名：\`airpick.co\`）是一个面向中文互联网用户的客观网络代理评测、科学出海教程与避坑指南站点。

## 一、我们的使命与愿景
在纷繁复杂的网络服务市场中，虚假宣传、严重超售、跑路欺诈现象屡见不鲜。AirPick 秉承 **“数据说话、实测为王、透明客观”** 的原则，为广大出海人员提供真实可靠的参考决策。

## 二、评测核心维度
1. **网络稳定性与 SLA 可用性**：7×24 小时不间断节点拨测，记录延迟抖动与丢包率。
2. **晚高峰压力测试**：重点监测每晚 20:00 - 23:00 骨干网拥塞时的真实带宽表现。
3. **解锁能力权威检验**：严苛测试 Netflix 非自制剧、Disney+、ChatGPT 及 Claude 等平台的解锁纯净度。
4. **服务商运营健康度**：考察运营时长、退款支持度与客服响应时效。

## 三、免责声明与合规准则
- 站点收录数据仅供网络技术交流与科研学术参考，请以各机场官方实时公告为准。
- 请自觉遵守所在国家和地区的法律法规，严禁利用网络代理从事任何违法犯罪活动。

> **Pick 你的机场，稳定又便宜 · airpick.co**
`;

fs.writeFileSync(path.join(docsRoot, 'about.md'), aboutContent, 'utf-8');

// 3. Scaffold Categories, Subcategories, Clusters
categories.forEach(cat => {
  const catDir = path.join(docsRoot, cat.id);
  ensureDir(catDir);

  // Category index
  const catIndex = `---
title: ${cat.title} · AirPick 枢纽指南
description: ${cat.description}
---

# ${cat.title}

${cat.description}

## 核心专题导航
${cat.subcategories.map(sub => `- **[${sub.title}](${sub.path})**：涵盖 ${sub.clusters.map(c => `[${c.title}](${c.path})`).join('、')}`).join('\n')}
`;
  fs.writeFileSync(path.join(catDir, 'index.md'), catIndex, 'utf-8');

  cat.subcategories.forEach(sub => {
    const subDir = path.join(docsRoot, cat.id, sub.id);
    ensureDir(subDir);

    // Subcategory index
    const subIndex = `---
title: ${sub.title} · ${cat.title}专题
description: ${cat.title} - ${sub.title} 核心内容集群导航与综合评估。
---

# ${sub.title}

本专题隶属于 [${cat.title}](${cat.path})，包含以下核心三级内容集群：

${sub.clusters.map(c => `### [${c.title}](${c.path})\n> ${c.description}\n\n`).join('')}
`;
    fs.writeFileSync(path.join(subDir, 'index.md'), subIndex, 'utf-8');

    sub.clusters.forEach(cluster => {
      const clusterDir = path.join(docsRoot, cat.id, sub.id, cluster.id);
      ensureDir(clusterDir);

      // Cluster index
      const clusterIndex = `---
title: ${cluster.title} · 2026精选指南
description: ${cluster.description}
---

# ${cluster.title}

> **集群定位**：${cluster.description}  
> **上级分类**：[${cat.title}](${cat.path}) → [${sub.title}](${sub.path})

## 深度文章精选
${cluster.articles.map((art, idx) => `### ${idx + 1}. [${art.title}](${art.slug})\n- **核心主词**：\`${art.primaryKeyword}\` | **意图**：\`${art.searchIntent}\` | **优先级**：\`${art.priority}\`\n`).join('\n')}
`;
      fs.writeFileSync(path.join(clusterDir, 'index.md'), clusterIndex, 'utf-8');
    });
  });
});

// 4. Scaffold Reviews
const reviewsDir = path.join(docsRoot, 'reviews');
ensureDir(reviewsDir);

const reviewsIndex = `---
title: 品牌评测专栏 · AirPick 独立客观库
description: 2026年一线主流机场独立横测，真实测速数据、套餐价格与跑路风险审计。
---

# 品牌深度评测专栏

客观、透明、独立的主流一线机场深度横向与专项测评专栏，严格基于真机测速数据与风控实测。

## 评测品牌列表
${reviewsData.brands.map(b => `- **[${b.name}](${b.path})**：\`${b.badge}\` · 线路：\`${b.lineType}\` · 起步价：\`${b.startingPrice}\``).join('\n')}
`;
fs.writeFileSync(path.join(reviewsDir, 'index.md'), reviewsIndex, 'utf-8');

reviewsData.brands.forEach(b => {
  const bDir = path.join(reviewsDir, b.id);
  ensureDir(bDir);

  const bIndex = `---
title: ${b.name}怎么样 · 2026深度评测与官网地址
description: ${b.name}真实测速、晚高峰表现、套餐价格与官网直达通道。
---

# ${b.name} 综合评测专栏

- **品牌标识**: \`${b.badge}\`
- **线路架构**: \`${b.lineType}\`
- **起步价格**: \`${b.startingPrice}\`
- **实测峰值**: \`${b.speed}\`
- **核心特性**: ${b.features.join(' / ')}

## 核心评测文章
${b.articles.map(art => `- [${art.title}](${art.slug})`).join('\n')}
`;
  fs.writeFileSync(path.join(bDir, 'index.md'), bIndex, 'utf-8');
});

console.log('Successfully scaffolded all directories and index files!');
