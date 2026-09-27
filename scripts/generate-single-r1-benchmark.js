import fs from 'fs';
import path from 'path';
import https from 'https';

const API_KEY = process.env.DEEPSEEK_API_KEY || "";
const TARGET_FILE = 'docs/airport/ranking/top/best-airports-2026.md';

const systemPrompt = `你是一位拥有10年分布式网络架构与跨境链路优化经验的资深工程师，同时也是专注于出海技术与SEO的顶级专家。
你正在为权威独立评测站「AirPick · 机场推荐」(airpick.co) 撰写深度行业指南。

【撰写要求】：
1. 语言风格：专业、硬核、客观中立、活人感，避免空洞的套话或AI味。
2. 篇幅与深度：全文3000-4000字，包含8-10个层次分明的大纲章节。
3. 技术深度：深入到底层网络原理（BGP Anycast、IEPL内网专线物理穿透、TCP拥塞控制算法BBRv3、TLS 1.3 / Reality混淆、双ISP机房住宅IP抗风控、晚高峰QoS丢包机制与mtr抓包诊断）。
4. 格式规范：严格遵循 VitePress Markdown 规范：
   - 严禁在正文中出现未经反引号或转义的尖括号（如 "< 1%" 必须写作 "\`< 1%\`"，不得破坏Vue渲染）。
   - 保留规范的 YAML Frontmatter。
   - 包含详尽的技术参数对比表格。
   - 包含多平台（Windows / macOS / iOS / Android）针对性实操配置与分流避坑指南。
   - 包含常见的常见问题排障 FAQ 模块。
   - 包含文末的延伸阅读内链矩阵。
5. 转化卡片与推荐：
   - 本篇为综合排行榜，推荐主力为【光速云】（全网主推，IEPL+IPLC，2500Mbps），辅助推荐【隐形人】（企业级高端防挤兑）与【飞猫云】（年付平价）。
   - 必须在操作方案章节中合理嵌入如下形式的转化卡片（保持 Vue 组件格式）：
<div style="margin: 1.5rem 0; padding: 1.2rem; background: var(--vp-c-bg-alt); border: 1.5px dashed var(--vp-c-brand-1); border-radius: 10px;">
  <strong>💡 👑 2026 全网综合第一主推 · 【光速云】读者专享特惠通道：</strong><br>
  <span style="font-size: 0.92rem; color: var(--vp-c-text-2); display: inline-block; margin: 6px 0;">IEPL 企业级专线 + 全球IPLC，单节点最高 2.5Gbps，全节点 x1 无倍率，原生解锁 ChatGPT / Claude / Netflix 全区：</span>
  <div style="margin: 8px 0;">
    <CopyCoupon code="AMM" discount="8折立减" url="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y" brandName="光速云" tip="点击复制专属优惠码并直达官网" />
  </div>
  <div style="font-size: 0.85rem; margin-top: 6px;">
    👉 <a href="/reviews/guangsucloud/">查看【光速云】实验室 2026 最新测速报告与深度评测 →</a>
  </div>
</div>

6. 内链规则：所有内部链接必须为站点内部相对路径（如 /airport/、/airport/ranking/stable/、/reviews/guangsucloud/、/tech/line/iepl/ 等），严禁指向未解析的外部域名。

请直接输出完整的 Markdown 文件全文，不要包裹在最外层的 markdown 代码块中。`;

const userPrompt = `请为以下文章生成深度打磨升级版的全面指南：
- 文章标题：2026最佳机场推荐排行榜：Top 10 稳定高速梯子全面横评
- 核心关键词：机场排行榜, 2026机场推荐, 最佳梯子排行, 稳定高速机场, 好用梯子排名
- 定位：AirPick · 决策评测型指南
- 目标：将文章扩展至 3000-4000 字的顶级 SEO 深度干货长文，包含完整的 8-10 个模块大纲、实测机房数据、避坑矩阵与排障手册。`;

async function callDeepSeek() {
  console.log('Sending request to DeepSeek-R1 (deepseek-reasoner)...');
  const postData = JSON.stringify({
    model: 'deepseek-reasoner',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    max_tokens: 8000
  });

  return new Promise((resolve, reject) => {
    const req = https.request('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 180000
    }, res => {
      let data = '';
      res.on('data', chunk => {
        data += chunk;
        process.stdout.write('.');
      });
      res.on('end', () => {
        console.log('\nResponse received with status:', res.statusCode);
        try {
          const parsed = JSON.parse(data);
          if (parsed.choices && parsed.choices[0]) {
            resolve(parsed.choices[0].message.content);
          } else {
            reject(new Error('Invalid response structure: ' + data));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

(async () => {
  try {
    const content = await callDeepSeek();
    let cleaned = content.trim();
    if (cleaned.startsWith('```markdown')) {
      cleaned = cleaned.replace(/^```markdown\n/, '').replace(/\n```$/, '');
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```[a-z]*\n/, '').replace(/\n```$/, '');
    }

    // Safety replace unescaped < to &lt; if not part of a tag
    cleaned = cleaned.replace(/(?<=\s)<(?=\s|\d)/g, '&lt;');

    fs.writeFileSync(TARGET_FILE, cleaned, 'utf8');
    console.log(`Successfully generated benchmark article: ${TARGET_FILE}`);
    console.log(`Word count / character length: ${cleaned.length}`);
  } catch (err) {
    console.error('Generation failed:', err);
  }
})();
