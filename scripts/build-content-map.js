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

let totalClusters = 0;
let totalArticles = 0;
let totalReviewArticles = 0;

// Validate all clusters and articles
categories.forEach(cat => {
  cat.subcategories.forEach(sub => {
    sub.clusters.forEach(cluster => {
      totalClusters++;
      if (!cluster.articles || cluster.articles.length < 8) {
        throw new Error(`Cluster ${cluster.clusterId} (${cluster.title}) has fewer than 8 articles! Current: ${cluster.articles ? cluster.articles.length : 0}`);
      }
      cluster.articles.forEach(art => {
        totalArticles++;
        if (!art.title || !art.slug || !art.primaryKeyword || !art.secondaryKeywords || !art.longTailKeywords || !art.searchIntent || !art.internalLinks || !art.priority) {
          throw new Error(`Article ${art.title} in cluster ${cluster.clusterId} is missing required fields!`);
        }
      });
    });
  });
});

reviewsData.brands.forEach(b => {
  b.articles.forEach(art => {
    totalReviewArticles++;
  });
});

console.log(`Validation passed: ${totalClusters} clusters, ${totalArticles} cluster articles, ${totalReviewArticles} review articles, total ${totalArticles + totalReviewArticles} articles.`);

let md = `# AirPick (airpick.co) 站点全景内容地图与 SEO 关键词配置指南 (Content Map)

> **版本**：2026 旗舰版  
> **官方域名**：\`https://airpick.co\`（强制 HTTPS）  
> **全站内容体量**：6 个一级导航大类 · 17 个二级核心专题 · 54 个三级内容集群 · 8 个一线品牌评测库  
> **SEO 文章规划总数**：**${totalArticles + totalReviewArticles} 篇**（54 个三级集群 × 8 篇 = 432 篇 + 8 个品牌专栏 × 5 篇 = 40 篇）  
> **核心规范**：一页一主词 · GEO 结构化直答 · 5-10 处精准锚文本内链 · P0-P3 严苛优先级

---

## 目录
1. [内容地图架构总览与统计表](#一内容地图架构总览与统计表)
2. [关键词分级与分配规范速查](#二关键词分级与分配规范速查)
3. [枢纽辐射内链拓扑网络 (Hub-and-Spoke)](#三枢纽辐射内链拓扑网络-hub-and-spoke)
4. [一级导航 1：机场推荐 (/airport/) 内容地图 (9个集群 / 72篇文章)](#四一级导航-1机场推荐-airport-内容地图)
5. [一级导航 2：客户端与设备 (/client/) 内容地图 (9个集群 / 72篇文章)](#五一级导航-2客户端与设备-client-内容地图)
6. [一级导航 3：场景应用 (/scenario/) 内容地图 (9个集群 / 72篇文章)](#六一级导航-3场景应用-scenario-内容地图)
7. [一级导航 4：技术线路 (/tech/) 内容地图 (10个集群 / 80篇文章)](#七一级导航-4技术线路-tech-内容地图)
8. [一级导航 5：教程知识 (/tutorial/) 内容地图 (9个集群 / 72篇文章)](#八一级导航-5教程知识-tutorial-内容地图)
9. [一级导航 6：避坑与故障 (/help/) 内容地图 (8个集群 / 64篇文章)](#九一级导航-6避坑与故障-help-内容地图)
10. [品牌深度评测专栏 (/reviews/) 内容地图 (8个品牌 / 40篇文章)](#十品牌深度评测专栏-reviews-内容地图)
11. [执行与落地阶段对应指引](#十一执行与落地阶段对应指引)

---

## 一、内容地图架构总览与统计表

| 一级导航 | 二级专题数 | 三级集群数 | 文章总数 | 核心聚焦意图 | 对应实施阶段 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. 机场推荐 (/airport/)** | 3 | 9 | 72 篇 | 决策、购买、转化 | 阶段 5 |
| **2. 客户端与设备 (/client/)** | 2 | 9 | 72 篇 | 教程、故障、决策 | 阶段 6 |
| **3. 场景应用 (/scenario/)** | 3 | 9 | 72 篇 | 购买、教程、决策 | 阶段 7 |
| **4. 技术线路 (/tech/)** | 3 | 10 | 80 篇 | 知识、购买、决策 | 阶段 8 |
| **5. 教程知识 (/tutorial/)** | 3 | 9 | 72 篇 | 知识、教程、决策 | 阶段 9 |
| **6. 避坑与故障 (/help/)** | 2 | 8 | 64 篇 | 故障、知识、转化 | 阶段 10 |
| **品牌评测 (/reviews/)** | 8 品牌 | 8 | 40 篇 | 转化、决策、故障 | 阶段 11 |
| **全站总计** | **17 专题 + 8 品牌** | **54 集群 + 8 品牌** | **${totalArticles + totalReviewArticles} 篇** | 全场景商业与长尾覆盖 | 全阶段 |

---

## 二、关键词分级与分配规范速查

### 2.1 “一页一主词”严格落位
每篇 Markdown 文档顶部必须严格设置对应元数据：
- **H1 / Title**: 必须完全包含【主词】（格式：\`{主词}：{文章标题} - AirPick\`）。
- **H2 / 首段导言**: 必须在前 100 字内自然融入 1-2 个【次要词】。
- **正文 / GEO 答案**: 穿插 10-15 个【长尾词】，绝不生硬堆砌，以解决真实用户搜索痛点为核心。
- **Meta Description**: 120-150 字，自然覆盖主词与次要词，突出年份（2026）与品牌域名（airpick.co）。

### 2.2 搜索意图分类定义
- **决策型**：用户在纠结“哪个好、怎么选、值得买吗、横测对比”。核心目标是提供中立量化数据帮助选择。
- **购买型**：用户有明确付费诉求，“便宜、性价比、百元年付、按量计费、大流量”。核心目标是展示套餐明细与购买转化。
- **转化型**：用户已准备结账，“优惠码、打折券、官网最新地址、注册通道”。核心目标是一键复制与官网直达。
- **教程型**：用户需要动手实操，“配置教程、安装指南、规则编写、订阅导入”。核心目标是有序步骤 1/2/3/4。
- **故障型**：用户遇到阻碍，“节点超时、订阅失败、无法连网、晚高峰卡顿”。核心目标是提供根因排查与立即自救手段。
- **知识型**：用户探索原理，“是什么、有什么区别、底层架构、法律常识”。核心目标是通俗易懂拆解复杂技术。

---

## 三、枢纽辐射内链拓扑网络 (Hub-and-Spoke)

网站采用高效集权的枢纽辐射拓扑结构：
1. **首页 \`/\`**：向 6 个一级 Hub 索引页与品牌库高权重导流。
2. **一级 Hub 页（如 \`/airport/\`）**：向下串联所有二级和三级集群页面。
3. **三级 Cluster 页面（如 \`/airport/ranking/top/\`）**：汇聚本集群下的 8~10 篇深度文章，并横向提供关联推荐。
4. **具体文章页**：
   - 向上回链：至少包含 1 个三级 Cluster 链接与 1 个一级 Hub 链接。
   - 横向互链：链接 2~3 篇跨领域关联文章（如：客户端文章链接到故障排查文章与专线节点文章）。
   - 转化落地：链接到品牌评测页与优惠码专区。
   - 锚文本一律采用有语义的目标页面主词或次要词，坚决杜绝“点击这里”、“查看全文”。

---
`;

// Helper to format articles in markdown
function renderCluster(cluster, sub, cat, catIndex) {
  let res = `\n### ${cluster.clusterId} ${cluster.title} (${cluster.path})\n\n`;
  res += `> **集群定位**：${cluster.description}  \n`;
  res += `> **专题归属**：[${cat.title}](${cat.path}) → [${sub.title}](${sub.path})  \n`;
  res += `> **收录文章数**：${cluster.articles.length} 篇\n\n`;

  cluster.articles.forEach((art, idx) => {
    const artNum = `${cluster.clusterId}.${idx + 1}`;
    res += `#### 文章 ${artNum}：${art.title}\n`;
    res += `- **完整 URL**: \`${cluster.path}${art.slug}\`\n`;
    res += `- **主词 (Primary)**: \`${art.primaryKeyword}\`\n`;
    res += `- **次要词 (Secondary)**: ${art.secondaryKeywords.map(k => `\`${k}\``).join(', ')}\n`;
    res += `- **长尾词 (Long-tail)**: ${art.longTailKeywords.join(', ')}\n`;
    res += `- **搜索意图**: \`${art.searchIntent}\`\n`;
    res += `- **优先级**: \`${art.priority}\`\n`;
    res += `- **规划内链锚文本**:\n`;
    art.internalLinks.forEach(link => {
      res += `  - 指向 [\`${link.target}\`](${link.target}): "${link.anchor}"\n`;
    });
    res += `\n`;
  });

  return res;
}

// 4. Category 1
md += `\n## 四、一级导航 1：机场推荐 (/airport/) 内容地图\n\n`;
airportData.subcategories.forEach(sub => {
  md += `\n### 专题：${sub.title} (${sub.path})\n`;
  sub.clusters.forEach(cluster => {
    md += renderCluster(cluster, sub, airportData, 1);
  });
});

// 5. Category 2
md += `\n## 五、一级导航 2：客户端与设备 (/client/) 内容地图\n\n`;
clientData.subcategories.forEach(sub => {
  md += `\n### 专题：${sub.title} (${sub.path})\n`;
  sub.clusters.forEach(cluster => {
    md += renderCluster(cluster, sub, clientData, 2);
  });
});

// 6. Category 3
md += `\n## 六、一级导航 3：场景应用 (/scenario/) 内容地图\n\n`;
scenarioData.subcategories.forEach(sub => {
  md += `\n### 专题：${sub.title} (${sub.path})\n`;
  sub.clusters.forEach(cluster => {
    md += renderCluster(cluster, sub, scenarioData, 3);
  });
});

// 7. Category 4
md += `\n## 七、一级导航 4：技术线路 (/tech/) 内容地图\n\n`;
techData.subcategories.forEach(sub => {
  md += `\n### 专题：${sub.title} (${sub.path})\n`;
  sub.clusters.forEach(cluster => {
    md += renderCluster(cluster, sub, techData, 4);
  });
});

// 8. Category 5
md += `\n## 八、一级导航 5：教程知识 (/tutorial/) 内容地图\n\n`;
tutorialData.subcategories.forEach(sub => {
  md += `\n### 专题：${sub.title} (${sub.path})\n`;
  sub.clusters.forEach(cluster => {
    md += renderCluster(cluster, sub, tutorialData, 5);
  });
});

// 9. Category 6
md += `\n## 九、一级导航 6：避坑与故障 (/help/) 内容地图\n\n`;
helpData.subcategories.forEach(sub => {
  md += `\n### 专题：${sub.title} (${sub.path})\n`;
  sub.clusters.forEach(cluster => {
    md += renderCluster(cluster, sub, helpData, 6);
  });
});

// 10. Brand Reviews
md += `\n## 十、品牌深度评测专栏 (/reviews/) 内容地图\n\n`;
md += `> 汇聚 8 个主流一线服务商的深度量化实测数据，每品牌按标准化 5 维模板规划（官网入口、参数实测、价格优惠、跑路与状态诊断、竞品横向对比）。\n\n`;

reviewsData.brands.forEach((brand, bIdx) => {
  md += `### 品牌 11.${bIdx + 1}：${brand.name} (${brand.path})\n\n`;
  md += `- **品牌标识**: \`${brand.badge}\` | **线路架构**: \`${brand.lineType}\` | **起步价格**: \`${brand.startingPrice}\` | **实测峰值**: \`${brand.speed}\`\n`;
  md += `- **核心特性**: ${brand.features.join(', ')}\n\n`;

  brand.articles.forEach((art, aIdx) => {
    md += `#### 文章 11.${bIdx + 1}.${aIdx + 1}：${art.title}\n`;
    md += `- **完整 URL**: \`${brand.path}${art.slug}\`\n`;
    md += `- **主词 (Primary)**: \`${art.primaryKeyword}\`\n`;
    md += `- **次要词 (Secondary)**: ${art.secondaryKeywords.map(k => `\`${k}\``).join(', ')}\n`;
    md += `- **长尾词 (Long-tail)**: ${art.longTailKeywords.join(', ')}\n`;
    md += `- **搜索意图**: \`${art.searchIntent}\`\n`;
    md += `- **优先级**: \`${art.priority}\`\n`;
    md += `- **规划内链锚文本**:\n`;
    art.internalLinks.forEach(link => {
      resAnchor = `  - 指向 [\`${link.target}\`](${link.target}): "${link.anchor}"\n`;
      md += resAnchor;
    });
    md += `\n`;
  });
});

// 11. Implementation Mapping
md += `\n## 十一、执行与落地阶段对应指引

1. **阶段 1（当前）**：架构规划与内容地图审批确认。
2. **阶段 2-4**：完成站点骨架、品牌简白主题、组件库、首页及各级 Hub 索引页。
3. **阶段 5-10**：按内容集群批量实施上述 54 个三级集群的文章落地，每篇文章不少于 800 字，严格遵循 GEO 六步结构。
4. **阶段 11**：落地 8 大品牌评测专栏。
5. **阶段 12**：Sitemap 爬网验证与 Apache 部署上线。

> **AirPick · Pick 你的机场，稳定又便宜 · airpick.co**
`;

const outputPath = path.resolve(__dirname, '../content-map.md');
fs.writeFileSync(outputPath, md, 'utf-8');
console.log(`Successfully generated content-map.md at ${outputPath}, file size: ${(fs.statSync(outputPath).size / 1024).toFixed(2)} KB`);
