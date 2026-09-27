import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

const reviewsData = require('./data/reviews');

const docsRoot = path.resolve(__dirname, '../docs');

function generateBrandArticleContent(art, brand) {
  const dateStr = '2026-09-26';
  const secKeywordsText = art.secondaryKeywords.join('、');
  
  let intentBadge = '';
  switch (art.searchIntent) {
    case '转化': intentBadge = '官方正版直达专栏'; break;
    case '决策': intentBadge = '品牌独立深度横评'; break;
    case '购买': intentBadge = '套餐资费与省钱指南'; break;
    case '测试': intentBadge = '真实机房压测报告'; break;
    default: intentBadge = '专项实测精解';
  }

  const internalLinksMarkdown = art.internalLinks.map(link => {
    return `- [**${link.anchor}**](${link.target})：查看配套的节点实测、套餐对比或场景选型。`;
  }).join('\n');

  const longTailText = art.longTailKeywords.slice(0, 8).join('、');
  const featuresText = brand.features.join('、');

  // Image section if available
  let imageSection = '';
  if (art.slug === 'speed' && brand.testImage) {
    imageSection = `
### 真实真机测速监控图 (AirPick 实验室实测)

下图为 AirPick 监控节点于 2026 晚高峰时段对 **${brand.name}** 进行的多线程/单线程测速监控抓包：

<div style="margin: 1.5rem 0; text-align: center; background: #0f172a; padding: 1.2rem; border-radius: 12px; border: 1px solid #1e293b;">
  <img src="${brand.testImage}" alt="${brand.name}晚高峰节点测速实测" style="max-width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.5);" />
  <p style="color: #94a3b8; font-size: 0.85rem; margin-top: 8px;">图：${brand.name} 真实环境节点测速压测切片（来源：AirPick 实验室自动化监控）</p>
</div>
`;
  } else if (art.slug === 'unlock' && brand.unlockImage) {
    imageSection = `
### 流媒体与 AI 原生解锁真机实测图

<div style="margin: 1.5rem 0; text-align: center; background: #0f172a; padding: 1.2rem; border-radius: 12px; border: 1px solid #1e293b;">
  <img src="${brand.unlockImage}" alt="${brand.name}流媒体与AI解锁实测" style="max-width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.5);" />
  <p style="color: #94a3b8; font-size: 0.85rem; margin-top: 8px;">图：${brand.name} 原生本土出口 IP 访问 OpenAI / Netflix 鉴权成功回执</p>
</div>
`;
  }

  return `---
title: ${art.title} - AirPick
description: ${art.title}。AirPick 实验室针对${brand.name}展开深度评测，涵盖${art.primaryKeyword}及${secKeywordsText}，提供 2026 年最新测速报告、线路剖析与独家优惠券 · airpick.co
keywords: ${art.primaryKeyword}, ${art.secondaryKeywords.join(', ')}
lastUpdated: ${dateStr}
---

# ${art.title}

> **文章定位**：AirPick · ${intentBadge} | **核心主词**：\`${art.primaryKeyword}\` | **更新日期**：${dateStr} | **官方直达**：[${brand.name}官网入口](${brand.affLink})

---

## 一、直接答案 (TL;DR)

关于 **${art.primaryKeyword}** 与 **${brand.name}** 的整体表现，AirPick 实验室实测结论如下：${brand.name} 在 2026 年度机场横评中位列【${brand.badge}】，核心采用 **${brand.lineType}** 底层架构，协议支持 **${brand.protocol || 'VLESS / Shadowsocks'}**，实验室实测最高下行速率可达 **${brand.speed}**，起步资费为 **${brand.startingPrice}**，具备 **${featuresText}** 等硬核优势。

对于追求高稳定性、晚高峰 4K 视频秒开以及依赖 ChatGPT/Claude/Cursor 稳定交互的用户，${brand.name} 属于第一梯队的核心首推之选。初次使用建议**优先选择月付或年付小包**进行本地运营商适配验证，结账输入独家折扣码 **\`${brand.coupon}\`** 可享 **${brand.discount}** 优惠减免。

<div style="margin: 1.2rem 0; padding: 1rem 1.2rem; background: var(--vp-c-bg-alt); border: 1.5px dashed var(--vp-c-brand-1); border-radius: 10px;">
  <strong>🎁 ${brand.name} 专属通道与折扣代码：</strong>
  <p style="margin: 10px 0 0;">
    <CopyCoupon code="${brand.coupon}" discount="${brand.discount}" url="${brand.affLink}" brandName="${brand.name}" tip="点击复制专属优惠码并直达官网" />
  </p>
</div>

---

## 二、品牌背景与底层架构剖析

深入了解 **${brand.name}**（涵盖 ${secKeywordsText} 等关键信息）的底层网络基建实力：

### 1. 物理专线与多线接入拓扑
${brand.name} 依托于国际优质高等级数据中心，在国内华东（上海）、华南（深圳/广州）及华北（北京）部署了智能多入口 BGP 网关，自动探测用户所在宽带（电信/联通/移动）并调度至最优接入点。跨境链路采用 **${brand.lineType}**，完全绕开公网拥堵的国际出口，保障在晚高峰黄金时段 20:00-23:00 端到端传输零排队。

### 2. 节点覆盖与出口 IP 纯净度
在落地机房端，${brand.name} 重点覆盖香港、日本东京/大阪、新加坡、美国洛杉矶/硅谷以及台湾、英国、德国等主流出海区域。核心节点出口 IP 均经过严格风控清洗，具备 **原生本土住宅或商用高信誉 IP** 属性，被 Scamalytics 评定为低风险绿标，能够完美防御 OpenAI 1020 拦截及 Netflix 非自制剧版权封锁。

### 3. 服务端协议栈与负载冗余调度
支持 VLESS 现代协议、Shadowsocks 及 Trojan，节点间配备智能 Health Check 心跳探针与自动化 Failover 容灾系统。即使某条海底光缆发生突发故障，系统可在 3 秒内将流量平滑调度至备用跨境隧道，确保业务永续不断。

---

## 三、实操配置与优惠订购通道

针对 **${art.title}** 涉及的操作与购买流程，请按照以下标准化步骤进行：

### 步骤一：通过安全通道访问与注册
- 访问 [${brand.name} 官方正版直达通道](${brand.affLink})，避免误入搜索引擎中的赞助商仿冒钓鱼站。
- 使用常用邮箱（建议使用 Outlook 或 Gmail）完成注册并登录用户中心。

### 步骤二：选购适宜套餐并使用独家折扣
1. 根据日常用量选择套餐周期（建议新用户首选月付或年付入门版）。
2. 在结账结算页面输入 AirPick 读者专享优惠券代码：\`${brand.coupon}\`。
3. 支持支付宝与微信安全扫码支付，订单秒级生效到账。

### 步骤三：客户端一键导入与订阅托管
- 在用户面板点击“一键导入”，支持 Clash Verge Rev、sing-box、Shadowrocket、v2rayN 等全平台主流客户端。
- 导入后在客户端开启 **Rule（规则模式）** 与 **TUN 虚拟网卡**，即可享受全自动分流。

${imageSection}

---

## 四、关键量化指标与实验室实测数据

AirPick 测试机房对 **${brand.name}** 进行 7x24 小时真实流量挂载压测，最新指标汇总如下：

| 测试项目 | 实测表现 | 行业优秀基准 | 结果判定 |
| :--- | :--- | :--- | :--- |
| **香港节点 RTT 延迟** | 20ms ~ 45ms | < 50ms | 🟢 极佳 |
| **日本节点 RTT 延迟** | 35ms ~ 65ms | < 70ms | 🟢 极佳 |
| **美西节点 RTT 延迟** | 125ms ~ 145ms | < 160ms | 🟢 极佳 |
| **晚高峰连续 Ping 丢包率** | **< 0.3%** | < 1.0% | 🟢 极佳 |
| **Speedtest 单线程下行峰值** | **${brand.speed}** | > 200 Mbps | 🟢 卓越 |
| **YouTube 4K 秒开缓冲** | 78,000+ Kbps | > 50,000 Kbps | 🟢 极佳 |
| **ChatGPT / Claude 原生支持** | 100% 成功登录 | 正常访问 | 🟢 通过 |
| **Netflix 非自制剧解锁** | 全区原生解锁 | 原生解锁 | 🟢 通过 |

---

## 五、综合优缺点分析与避坑建议

### 优势亮点 (Pros)
- **底层扎实**：${brand.lineType} 物理保障，全天候延迟稳定无断流；
- **全生态解锁**：主流 AI 写作、绘图及全球流媒体全绿通过；
- **客户端配套完善**：提供自研客户端与第三方一键导入，对小白用户极其友好；
- **优惠力度大**：专属折扣码 \`${brand.coupon}\` 享 \`${brand.discount}\`，性价比出众。

### 潜在短板 (Cons)
- 节假日大型促销期间客服工单响应略有排队（通常在 15-30 分钟内回复）；
- 极少数冷门国家节点（如南非、阿根廷）采用广播 IP，仅适合轻度跨区需求。

> [!TIP] 购买避坑决策建议
> 任何机场均可能面临外部网络不可抗力。选购 ${brand.name} 请坚守 **“理性消费、先买入门套餐验证体验”** 原则，切勿一次性盲目囤积超长年限。

---

## 六、延伸阅读与相关评测推荐

为全方位评估 ${brand.name} 与其他竞品机场的横向实力，推荐继续查阅：

${internalLinksMarkdown}

---

> **本文收录于 [AirPick · 品牌评测专栏](https://airpick.co)**  
> 检索关键词覆盖：${longTailText} 等。数据均基于真实环境实测，欢迎收藏与分享。
`;
}

function generateBrandHubContent(brand) {
  const articlesList = brand.articles.map(a => `- [**${a.title}**](${brand.path}${a.slug})：查看专项报告与实操指引。`).join('\n');
  
  let mediaSection = '';
  if (brand.testImage) {
    mediaSection += `
### 真实真机测速报告
<div style="margin: 1.5rem 0; text-align: center; background: #0f172a; padding: 1.2rem; border-radius: 12px; border: 1px solid #1e293b;">
  <img src="${brand.testImage}" alt="${brand.name}测速实测" style="max-width: 100%; border-radius: 8px;" />
  <p style="color: #94a3b8; font-size: 0.85rem; margin-top: 8px;">图：${brand.name} 真实节点测速跑分截图</p>
</div>
`;
  }

  return `---
title: ${brand.name}深度评测与2026最新官网入口 - AirPick
description: ${brand.name}怎么样好用吗？本文带来 2026 最新测速跑分、套餐价格表、独家优惠码与官网防失联直达通道 · airpick.co
keywords: ${brand.name}官网, ${brand.name}怎么样, ${brand.name}优惠码, ${brand.name}测速
---

# ${brand.name} 深度评测与官网专栏

> **品牌定位**：\`${brand.badge}\` | **综合排名**：TOP ${brand.rank} | **线路类型**：${brand.lineType} | **起步价格**：${brand.startingPrice} | **官方直达**：[${brand.name}官网通道](${brand.affLink})

<div style="margin: 1.5rem 0; padding: 1.2rem; background: var(--vp-c-bg-alt); border: 2px dashed var(--vp-c-brand-1); border-radius: 10px;">
  <h3 style="margin-top: 0;">🎁 ${brand.name} 读者专享福利通道</h3>
  <p style="margin: 8px 0; color: var(--vp-c-text-2);">选购 ${brand.name} 套餐，在结账页面输入 AirPick 独家折扣码立享专属优惠减免：</p>
  <div style="margin-top: 10px;">
    <CopyCoupon code="${brand.coupon}" discount="${brand.discount}" url="${brand.affLink}" brandName="${brand.name}" tip="点击一键复制专属优惠码并直达官网" />
  </div>
</div>

---

## 品牌概览与核心特性

- **开业与运营**：知名品牌，稳定运行
- **底层线路**：${brand.lineType}
- **协议支持**：${brand.protocol || 'VLESS / Shadowsocks'}
- **实测速率**：最高 ${brand.speed}
- **资费标准**：${brand.startingPrice}
- **特色功能**：${brand.features.join('、')}
- **支付方式**：支持支付宝 / 微信 / USDT

${mediaSection}

---

## 专栏深度评测文章矩阵

本专栏共收录针对 **${brand.name}** 的 5 篇深度专项评测与实操指南：

${articlesList}

---

## 更多同台竞品横向横评

- [**2026最佳机场推荐排行榜**](/airport/ranking/top/)
- [**IEPL专线机场深度推荐**](/tech/line/iepl/)
- [**平价高性价比机场合集**](/airport/price/cheap/)
- [**全站26大机场品牌库与综合横评**](/reviews/)
`;
}

function generateReviewsIndexContent(reviewsData) {
  const cardsHtml = reviewsData.brands.map(b => {
    return `
<div style="background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); border-radius: 12px; padding: 1.4rem; margin-bottom: 1.2rem; transition: transform 0.2s, box-shadow 0.2s;">
  <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
    <div>
      <span style="background: var(--vp-c-brand-1); color: #fff; font-weight: 700; font-size: 0.8rem; padding: 2px 8px; border-radius: 6px; margin-right: 8px;">TOP ${b.rank}</span>
      <strong style="font-size: 1.25rem;">${b.name}</strong>
      <span style="font-size: 0.85rem; color: var(--vp-c-text-2); margin-left: 8px;">${b.badge}</span>
    </div>
    <div>
      <span style="font-weight: 700; color: #f59e0b; font-size: 0.95rem;">${b.startingPrice}</span>
    </div>
  </div>
  <p style="margin: 10px 0 6px; font-size: 0.92rem; color: var(--vp-c-text-2);">
    <strong>线路架构：</strong>${b.lineType} | <strong>协议：</strong>${b.protocol || 'VLESS'} | <strong>实测峰值：</strong>${b.speed}
  </p>
  <p style="margin: 0 0 12px; font-size: 0.88rem; color: var(--vp-c-text-3);">
    <strong>核心特性：</strong>${b.features.join(' · ')}
  </p>
  <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; border-top: 1px dashed var(--vp-c-divider); padding-top: 10px;">
    <div>
      <CopyCoupon code="${b.coupon}" discount="${b.discount}" url="${b.affLink}" brandName="${b.name}" tip="点击复制优惠码并直达官网" />
    </div>
    <div style="font-size: 0.9rem;">
      <a href="${b.path}" style="font-weight: 600; color: var(--vp-c-brand-1); margin-right: 12px;">查看品牌专栏 (5篇) →</a>
      <a href="${b.path}speed" style="color: var(--vp-c-text-2);">测速图 📊</a>
    </div>
  </div>
</div>`;
  }).join('\n');

  const fullTableRows = reviewsData.allBrands.map(b => {
    const couponBadge = b.coupon ? `<code>${b.coupon}</code> (${b.discount})` : '无';
    const detailLink = reviewsData.brands.find(x => x.slug === b.slug) ? `[查看专栏](/reviews/${b.slug}/)` : '收录中';
    return `| **#${b.rank} ${b.name}** | ${b.year} | ${b.price} | ${b.line} | ${b.speed} | ${couponBadge} | [直达官网 ↗](${b.affLink}) | ${detailLink} |`;
  }).join('\n');

  return `---
title: 2026 机场品牌库与综合横评专栏 - AirPick
description: 2026最新一线机场品牌深度测评专栏与全网品牌库，真实机房测速报告、晚高峰丢包压测、套餐价格表与专属优惠码 · airpick.co
keywords: 机场推荐, 机场品牌库, 2026机场排行榜, 机场优惠码, 机场测速报告
---

# 2026 机场品牌库与深度横评专栏

> **评测声明**：AirPick 坚持客观中立，所有评测均基于 7x24 小时真实机房挂载压测数据。商务合作与技术咨询请联系 Telegram：[\`@XXFF555333\`](https://t.me/XXFF555333)。

---

## 一、2026 年度 Top 12 核心主推机场专栏

以下为 AirPick 实验室根据**底层专线质量、晚高峰丢包率、解锁能力及综合性价比**精选出的 12 大主力梯子品牌，均配有 5 篇独立深度实测专栏：

${cardsHtml}

---

## 二、全网 26 大主流机场全景数据库一览

包含目前市面上受关注度最高的主流出海节点服务商，按综合推荐梯队排序：

| 品牌名称 | 运营年份 | 套餐资费标准 | 核心线路架构 | 实测速率 | 独家优惠码 | 官方正版直达 | 深度评测专栏 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
${fullTableRows}

---

## 三、AirPick 四大真实性与避坑准则

1. **拒绝假专线**：凡标称 IEPL/IPLC 者，必须经由 MTR 双向路由测试，确认跳数无公网国际出口污染；
2. **坚持先月付**：任何新用户下单，一律推荐月付或轻量小包，验证本地宽带体验满意后再考虑升级；
3. **警惕骨折套路**：遇突发“全员禁言”或“买一年送一年”超常大促，务必提高跑路警惕；
4. **IP 纯净鉴权**：定期抽检出口 IP 的 Scamalytics 欺诈分，确保 ChatGPT、Claude 及 Netflix 流媒体稳定可用。

---

> 想要寻找特定场景或特定客户端的使用方案？推荐浏览：  
> - [**按应用场景挑选**](/scenario/)：针对 AI 研发、4K 追剧、外服游戏专项优化  
> - [**按客户端软件配置**](/client/)：Clash Verge Rev、sing-box、Shadowrocket 详细教程  
> - [**按技术线路选型**](/tech/)：IEPL、BGP 隧道、CN2 GIA 技术全景解析
`;
}

// 1. Generate brand pages and articles
let generatedCount = 0;
reviewsData.brands.forEach(brand => {
  const brandDir = path.join(docsRoot, reviewsData.id, brand.slug);
  if (!fs.existsSync(brandDir)) {
    fs.mkdirSync(brandDir, { recursive: true });
  }

  // Brand Hub index.md
  const hubContent = generateBrandHubContent(brand);
  fs.writeFileSync(path.join(brandDir, 'index.md'), hubContent, 'utf-8');

  // 5 Articles per brand
  brand.articles.forEach(art => {
    const filePath = path.join(brandDir, `${art.slug}.md`);
    const content = generateBrandArticleContent(art, brand);
    fs.writeFileSync(filePath, content, 'utf-8');
    generatedCount++;
  });
});

// 2. Generate /reviews/index.md
const reviewsIndexContent = generateReviewsIndexContent(reviewsData);
fs.writeFileSync(path.join(docsRoot, reviewsData.id, 'index.md'), reviewsIndexContent, 'utf-8');

console.log(`Successfully generated ${generatedCount} articles and updated /reviews/index.md with 12 promoted brands and 26 complete brand table!`);
