import fs from 'fs';
import path from 'path';
import https from 'https';

const API_KEY = process.env.DEEPSEEK_API_KEY || "";
const CHECKPOINT_FILE = 'scripts/data/r1-phase2-checkpoints.json';
const CONCURRENCY = 3; // 3 并发 Workers

if (!fs.existsSync('scripts/data')) {
  fs.mkdirSync('scripts/data', { recursive: true });
}

let checkpoints = {};
if (fs.existsSync(CHECKPOINT_FILE)) {
  try {
    checkpoints = JSON.parse(fs.readFileSync(CHECKPOINT_FILE, 'utf8'));
  } catch (e) {
    checkpoints = {};
  }
}

// 品牌库信息
const BRANDS = {
  guangsucloud: {
    name: '光速云',
    badge: '👑 2026 全网综合第一主推',
    desc: 'IEPL 企业级内网专线 + 全球IPLC，单节点最高 2.5Gbps，全节点 x1 无倍率，原生解锁 ChatGPT / Claude / Netflix 全区',
    code: 'AMM',
    discount: '8折立减',
    url: 'https://sahude.gsyvipaff.com/#/?code=keqgvT5Y',
    reviewLink: '/reviews/guangsucloud/'
  },
  feimaocloud: {
    name: '飞猫云',
    badge: '🥈 2026 年付平价首选',
    desc: 'BGP 中转 + IEPL 混合专线，年付折合约 7 元/月，低延迟稳定，适合预算敏感型出海与轻度影音用户',
    code: 'flycat888',
    discount: '8折立减',
    url: 'https://guangs.flycataff.com/#/?code=6uq0Xe9y',
    reviewLink: '/reviews/feimaocloud/'
  },
  breezenet: {
    name: '微风网络',
    badge: '🥉 2026 轻度高性价比',
    desc: 'IEPL 专线，年付折合 7 元/月，50GB/月起步，小流量用户首选，网页社交与学术搜索极速稳定',
    code: 'flat888',
    discount: '9折特惠',
    url: 'https://edp01.breezenetaff.com/#/?code=t3huofyI',
    reviewLink: '/reviews/breezenet/'
  },
  xingdaomeng: {
    name: '星岛梦',
    badge: '⭐ 2026 不限时按量首选',
    desc: '2020 年老牌稳定运营，提供丰富的不限时按量计费套餐，企业级专线保障，用多少扣多少，适合备用与长周期',
    code: 'nmw888',
    discount: '9折立减',
    url: 'https://guangs.xingdaomeng.com/#/?code=1TynBYnR',
    reviewLink: '/reviews/xingdaomeng/'
  },
  worryfree: {
    name: '无忧链接',
    badge: '⭐ 2026 超低门槛起步',
    desc: '月付低至 6 元起，全线 VLESS 协议 + IEPL 专线，多客户端原生支持，性价比与门槛平衡极佳',
    code: 'wuyou666',
    discount: '专属特惠',
    url: 'https://wep01.worryfreeaff.com/#/?code=4ZoSbLdL',
    reviewLink: '/reviews/worryfree/'
  },
  invisible: {
    name: '隐形人',
    badge: '⭐ 2026 企业级防挤兑专线',
    desc: '海外新加坡团队运营，企业级 IEPL 专线 + 60+ 原生机房独立 IP，晚高峰 500M 冗余带宽不挤兑，支持 24h 退款保障',
    code: 'yxr888',
    discount: '8折特惠',
    url: 'https://yinxingren1.invisibleaff.com/#/?code=kcyEeoJT',
    reviewLink: '/reviews/invisible/'
  },
  civetnet: {
    name: '灵猫网络',
    badge: '⭐ 2026 大流量性价比',
    desc: '月付 19 元享 150GB 大流量，企业级内网专线，适合大流量下载与 4K 影音串流',
    code: 'lmao888',
    discount: '9折立减',
    url: 'https://vip01.civetnet.com/#/?code=8MIAyxak',
    reviewLink: '/reviews/civetnet/'
  },
  jiliancloud: {
    name: '极连云',
    badge: '⭐ 2026 稳定专线高配',
    desc: '月付 18 元 100G 专线，自研+第三方客户端全面支持，低延迟打游戏与日常办公兼备',
    code: 'ji8888',
    discount: '特惠立减',
    url: 'https://guangs.jlyvipaff.com/#/?code=VM1rKGUu',
    reviewLink: '/reviews/jiliancloud/'
  },
  v2yun: {
    name: '唯兔云',
    badge: '⭐ 2026 全球多节点网络',
    desc: '60+ 全球多地区节点，三网动态智能负载均衡优化，全线 VLESS 协议',
    code: 'weitu666',
    discount: '9折特惠',
    url: 'https://guangs.v2yunvipaff.com/#/?code=xIutqOBA',
    reviewLink: '/reviews/v2yun/'
  },
  twilight: {
    name: '暮光加速',
    badge: '⭐ 2026 均衡专线首选',
    desc: '20 元 120GB 黄金流量档，全线 VLESS + IEPL 专线，长连接稳定不掉线',
    code: 'muguang5555',
    discount: '新人特惠',
    url: 'https://varnexa.twilightaff.com/#/?code=D1LHglg3',
    reviewLink: '/reviews/twilight/'
  }
};

function getBrandForFile(filePath) {
  const norm = filePath.replace(/\\/g, '/');
  // AI 场景
  if (norm.includes('/scenario/ai/')) return BRANDS.guangsucloud;
  // 流媒体场景
  if (norm.includes('/scenario/streaming/netflix/')) return BRANDS.guangsucloud;
  if (norm.includes('/scenario/streaming/youtube/')) return BRANDS.civetnet;
  if (norm.includes('/scenario/streaming/tiktok/')) return BRANDS.invisible;
  if (norm.includes('/scenario/streaming/')) return BRANDS.guangsucloud;
  // 游戏与社交
  if (norm.includes('/scenario/game/accel/')) return BRANDS.jiliancloud;
  if (norm.includes('/scenario/game/social/')) return BRANDS.breezenet;
  // 技术线路
  if (norm.includes('/tech/line/iepl/')) return BRANDS.guangsucloud;
  if (norm.includes('/tech/line/iplc/')) return BRANDS.guangsucloud;
  if (norm.includes('/tech/line/bgp/')) return BRANDS.feimaocloud;
  if (norm.includes('/tech/line/cn2-gia/')) return BRANDS.invisible;
  if (norm.includes('/tech/ip/native/')) return BRANDS.invisible;
  if (norm.includes('/tech/ip/residential/')) return BRANDS.invisible;
  if (norm.includes('/tech/region/')) return BRANDS.v2yun;
  // 教程知识
  if (norm.includes('/tutorial/basic/')) return BRANDS.breezenet;
  if (norm.includes('/tutorial/usage/buy/')) return BRANDS.guangsucloud;
  if (norm.includes('/tutorial/usage/subscribe/')) return BRANDS.worryfree;
  if (norm.includes('/tutorial/usage/config/')) return BRANDS.guangsucloud;
  if (norm.includes('/tutorial/compare/protocol/')) return BRANDS.xingdaomeng;
  if (norm.includes('/tutorial/compare/line/')) return BRANDS.guangsucloud;
  if (norm.includes('/tutorial/compare/tool/')) return BRANDS.jiliancloud;
  // 避坑与故障
  if (norm.includes('/help/guide/scam/')) return BRANDS.guangsucloud;
  if (norm.includes('/help/guide/buying/')) return BRANDS.feimaocloud;
  if (norm.includes('/help/guide/security/')) return BRANDS.invisible;
  if (norm.includes('/help/guide/fake-website/')) return BRANDS.guangsucloud;
  if (norm.includes('/help/faq/timeout/')) return BRANDS.twilight;
  if (norm.includes('/help/faq/subscribe-fail/')) return BRANDS.guangsucloud;
  if (norm.includes('/help/faq/connect-fail/')) return BRANDS.twilight;
  if (norm.includes('/help/faq/slow/')) return BRANDS.guangsucloud;
  
  return BRANDS.guangsucloud;
}

function getMdFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getMdFiles(fullPath));
    } else if (file.endsWith('.md') && file !== 'index.md') {
      results.push(fullPath.replace(/\\/g, '/'));
    }
  });
  return results;
}

const allFiles = getMdFiles('docs/scenario')
  .concat(getMdFiles('docs/tech'))
  .concat(getMdFiles('docs/tutorial'))
  .concat(getMdFiles('docs/help'));

console.log(`Phase 2 total targets: ${allFiles.length}`);

const pendingFiles = allFiles.filter(f => !checkpoints[f] || checkpoints[f].status !== 'done');
console.log(`Pending to process: ${pendingFiles.length}`);

function makeSystemPrompt(brand) {
  return `你是一位拥有10年分布式网络架构与跨境链路优化经验的资深工程师，同时也是专注于出海技术与SEO的顶级专家。
你正在为权威独立评测站「AirPick · 机场推荐」(airpick.co) 撰写深度行业指南。

【撰写要求】：
1. 语言风格：专业硬核、客观中立、活人感强，有理有据，绝不用假大空套话。
2. 篇幅与结构：全文 3000-3500 字，按 8-10 个层次分明的大纲章节展开：
   - 导言/直接结论 (TL;DR)
   - 底层技术背景与网络物理机理 (BGP/IEPL/IPLC/QoS/BBRv3/TLS Reality/双ISP等)
   - 核心参数对比矩阵表 (9-10 项量化指标)
   - 细分人群与使用场景选型推荐
   - 分客户端/分平台实操配置与深度避坑
   - 抓包排障诊断手册 (含终端命令如 mtr/curl/tcping 与判定表)
   - 行业常见避坑矩阵 (识别虚假宣传、超售、伪解锁)
   - 常见问题排障 FAQ (5-7 个真实痛点)
   - 延伸阅读内链矩阵 (指向站点内部相对路径)
3. 转化卡片格式（必须完整包含，保持 Vue 语法兼容）：
<div style="margin: 1.5rem 0; padding: 1.2rem; background: var(--vp-c-bg-alt); border: 1.5px dashed var(--vp-c-brand-1); border-radius: 10px;">
  <strong>💡 ${brand.badge} · 【${brand.name}】读者专享特惠通道：</strong><br>
  <span style="font-size: 0.92rem; color: var(--vp-c-text-2); display: inline-block; margin: 6px 0;">${brand.desc}：</span>
  <div style="margin: 8px 0;">
    <CopyCoupon code="${brand.code}" discount="${brand.discount}" url="${brand.url}" brandName="${brand.name}" tip="点击复制专属优惠码并直达官网" />
  </div>
  <div style="font-size: 0.85rem; margin-top: 6px;">
    👉 <a href="${brand.reviewLink}">查看【${brand.name}】实验室 2026 最新测速报告与深度评测 →</a>
  </div>
</div>
4. 格式规范与安全（极重要）：
   - 必须保留规范的 YAML Frontmatter（包含 title, description, head 关键词与 og:type）。
   - 严禁在正文中出现未经反引号或转义的尖括号（如 "< 1%" 必须写作 "\`< 1%\`"，不得破坏 Vue 编译）。
   - 所有内部链接必须为站点内部相对路径（如 /scenario/、/tech/、/tutorial/、/help/、/reviews/ 等），严禁指向外部 airpick.co 域名。
   - 务必完整输出，必须包含完整的文末标签与结束语，严禁在中间截断！
请直接输出完整 Markdown 文件全文，不要包裹最外层的 markdown 代码块。`;
}

// 站内链接智能映射字典
const LINK_MAP = {
  '/about': '/about',
  '/faq': '/help/faq/',
  '/guide': '/help/guide/',
  '/tools': '/help/faq/',
  '/troubleshooting': '/help/faq/',
  '/glossary': '/tutorial/basic/terms/',
  '/knowledge': '/tutorial/basic/',
  '/rank': '/airport/ranking/',
  '/unlock': '/scenario/streaming/',
  '/client/clash-verge': '/client/app/clash/',
  '/client/clash-verge-rev': '/client/app/clash/',
  '/client/clash': '/client/app/clash/',
  '/client/clash-meta': '/client/app/clash/',
  '/client/shadowrocket': '/client/app/shadowrocket/',
  '/client/sing-box': '/client/app/sing-box/',
  '/client/v2rayn': '/client/app/v2rayn/',
  '/client/windows': '/client/device/windows/',
  '/client/macos': '/client/device/mac/',
  '/client/device/macos': '/client/device/mac/',
  '/client/ios': '/client/device/iphone/',
  '/client/device/ios': '/client/device/iphone/',
  '/client/mobile': '/client/device/iphone/',
  '/client/android': '/client/device/android/',
  '/client/router': '/client/device/router/',
  '/client/openwrt': '/client/device/router/',
  '/airport/type/iepl': '/tech/line/iepl/',
  '/airport/iepl': '/tech/line/iepl/',
  '/airport/type/iplc': '/tech/line/iplc/',
  '/airport/protocol': '/tutorial/compare/protocol/',
  '/tech/protocol': '/tutorial/compare/protocol/',
  '/airport/line': '/tech/line/',
  '/airport/traffic': '/airport/price/pay-as-you-go/',
  '/airport/billing': '/airport/price/monthly/',
  '/airport/pricing': '/airport/price/',
  '/airport/price/yearly': '/airport/price/monthly/',
  '/airport/devices': '/client/device/',
  '/airport/trial': '/airport/type/free-trial/',
  '/airport/refund': '/help/guide/buying/',
  '/airport/risk': '/help/guide/scam/',
  '/airport/pitfalls': '/help/guide/scam/',
  '/airport/streaming': '/scenario/streaming/',
  '/airport/streaming-unlock': '/scenario/streaming/',
  '/tutorial/streaming-unlock': '/scenario/streaming/',
  '/airport/terms': '/tutorial/basic/terms/',
  '/airport/troubleshooting': '/help/faq/',
  '/tutorial/troubleshooting': '/help/faq/',
  '/tools/latency-test': '/help/faq/slow/',
  '/tools/ping-test': '/help/faq/slow/',
  '/tools/network-diagnostics': '/help/faq/slow/',
  '/tools/network-diagnosis': '/help/faq/slow/',
  '/tools/mtr': '/help/faq/slow/',
  '/tools/network-test': '/help/faq/slow/',
  '/tools/speedtest-methodology': '/help/faq/slow/',
  '/knowledge/iepl-line': '/tech/line/iepl/',
  '/knowledge/protocols': '/tutorial/compare/protocol/',
  '/guide/subscription-security': '/help/guide/security/',
  '/guide/network-troubleshooting': '/help/faq/',
  '/guide/iplc-vs-iepl': '/tech/line/iepl/',
  '/guide/native-ip-guide': '/tech/ip/native/',
  '/guide/dns-leak': '/help/faq/connect-fail/',
  '/methodology': '/about',
  '/streaming': '/scenario/streaming/',
  '/ranking': '/airport/ranking/',
  '/guide/beginner': '/tutorial/basic/what-is/',
  '/start-here': '/tutorial/basic/what-is/',
  '/guide/bgp-iepl-iplc': '/tech/line/iepl/',
  '/guide/reality-vision': '/tutorial/compare/protocol/',
  '/guide/buying-guide': '/help/guide/buying/',
  '/guide/avoid-pitfalls': '/help/guide/buying/',
  '/guide/network-diagnostics': '/help/faq/slow/',
  '/guide/protocol': '/tutorial/compare/protocol/',
  '/guide/rules': '/client/app/clash/',
  '/guide/troubleshooting': '/help/faq/',
  '/guides/troubleshooting': '/help/faq/',
  '/guides/dns': '/help/faq/connect-fail/',
  '/guide/streaming-unlock': '/scenario/streaming/',
  '/guide/bgp-iepl-iplc-difference': '/tech/line/iepl/',
  '/tutorial/protocols': '/tutorial/compare/protocol/',
  '/tech/network': '/tech/line/',
  '/tech/network-diagnosis': '/help/faq/slow/',
  '/troubleshooting/network-tools': '/help/faq/slow/',
  '/privacy/log-policy': '/help/guide/security/',
  '/airport/type/reality': '/tutorial/compare/protocol/',
  '/airport/type/cheap': '/airport/price/cheap/',
  '/airport/type/streaming': '/scenario/streaming/',
  '/airport/type/risk': '/help/guide/scam/',
  '/tutorials/router': '/client/device/router/'
};

function normalizeInternalLinks(content) {
  return content.replace(/\[([^\]]+)\]\((\/[^\)#\s]*)(#[^\)]*)?\)/g, (match, text, target, hash) => {
    let t = target.replace(/\/+$/, '') || '/';
    if (t === '/') return match;
    
    // Exact mapping
    if (LINK_MAP[t]) {
      return '[' + text + '](' + LINK_MAP[t] + (hash || '') + ')';
    }

    // Prefix patterns
    if (t.startsWith('/client/app/clash')) return '[' + text + '](/client/app/clash/' + (hash || '') + ')';
    if (t.startsWith('/client/app/shadowrocket')) return '[' + text + '](/client/app/shadowrocket/' + (hash || '') + ')';
    if (t.startsWith('/client/app/sing-box')) return '[' + text + '](/client/app/sing-box/' + (hash || '') + ')';
    if (t.startsWith('/client/app/v2rayn')) return '[' + text + '](/client/app/v2rayn/' + (hash || '') + ')';
    if (t.startsWith('/client/device/windows')) return '[' + text + '](/client/device/windows/' + (hash || '') + ')';
    if (t.startsWith('/client/device/mac')) return '[' + text + '](/client/device/mac/' + (hash || '') + ')';
    if (t.startsWith('/client/device/iphone')) return '[' + text + '](/client/device/iphone/' + (hash || '') + ')';
    if (t.startsWith('/client/device/android')) return '[' + text + '](/client/device/android/' + (hash || '') + ')';
    if (t.startsWith('/client/device/router')) return '[' + text + '](/client/device/router/' + (hash || '') + ')';

    if (t.startsWith('/airport/ranking')) return '[' + text + '](/airport/ranking/' + (hash || '') + ')';
    if (t.startsWith('/airport/price')) return '[' + text + '](/airport/price/' + (hash || '') + ')';
    if (t.startsWith('/airport/type')) return '[' + text + '](/airport/type/' + (hash || '') + ')';
    if (t.startsWith('/airport/')) return '[' + text + '](/airport/' + (hash || '') + ')';

    if (t.startsWith('/tech/line')) return '[' + text + '](/tech/line/' + (hash || '') + ')';
    if (t.startsWith('/tech/ip')) return '[' + text + '](/tech/ip/' + (hash || '') + ')';
    if (t.startsWith('/tech/region')) return '[' + text + '](/tech/region/' + (hash || '') + ')';
    if (t.startsWith('/tech/')) return '[' + text + '](/tech/' + (hash || '') + ')';

    if (t.startsWith('/tutorial/basic')) return '[' + text + '](/tutorial/basic/' + (hash || '') + ')';
    if (t.startsWith('/tutorial/usage')) return '[' + text + '](/tutorial/usage/' + (hash || '') + ')';
    if (t.startsWith('/tutorial/compare')) return '[' + text + '](/tutorial/compare/' + (hash || '') + ')';
    if (t.startsWith('/tutorial/')) return '[' + text + '](/tutorial/' + (hash || '') + ')';

    if (t.startsWith('/scenario/ai')) return '[' + text + '](/scenario/ai/' + (hash || '') + ')';
    if (t.startsWith('/scenario/streaming')) return '[' + text + '](/scenario/streaming/' + (hash || '') + ')';
    if (t.startsWith('/scenario/game')) return '[' + text + '](/scenario/game/' + (hash || '') + ')';
    if (t.startsWith('/scenario/')) return '[' + text + '](/scenario/' + (hash || '') + ')';

    if (t.startsWith('/help/guide')) return '[' + text + '](/help/guide/' + (hash || '') + ')';
    if (t.startsWith('/help/faq')) return '[' + text + '](/help/faq/' + (hash || '') + ')';
    if (t.startsWith('/help/')) return '[' + text + '](/help/' + (hash || '') + ')';

    return match;
  });
}

async function callDeepSeekWithRetry(systemPrompt, userPrompt, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await new Promise((resolve, reject) => {
        const postData = JSON.stringify({
          model: 'deepseek-reasoner',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          max_tokens: 8000
        });

        const req = https.request('https://api.deepseek.com/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
          },
          timeout: 240000
        }, res => {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => {
            if (res.statusCode !== 200) {
              return reject(new Error(`API Status ${res.statusCode}: ${data}`));
            }
            try {
              const parsed = JSON.parse(data);
              if (parsed.choices && parsed.choices[0]) {
                resolve(parsed.choices[0].message.content);
              } else {
                reject(new Error('Invalid response choices: ' + data));
              }
            } catch (e) {
              reject(e);
            }
          });
        });

        req.on('error', reject);
        req.on('timeout', () => {
          req.destroy(new Error('Request timed out'));
        });
        req.write(postData);
        req.end();
      });
      return result;
    } catch (err) {
      console.warn(`[Retry ${i + 1}/${retries}] Error: ${err.message}`);
      if (i === retries - 1) throw err;
      await new Promise(r => setTimeout(r, 5000 * (i + 1)));
    }
  }
}

async function processFile(filePath, index, total) {
  const norm = filePath.replace(/\\/g, '/');
  const existing = fs.readFileSync(norm, 'utf8');
  
  const titleMatch = existing.match(/^title:\s*(.+)$/m);
  const descMatch = existing.match(/^description:\s*(.+)$/m);
  const kwMatch = existing.match(/^keywords:\s*(.+)$/m);
  
  const title = titleMatch ? titleMatch[1].trim() : path.basename(norm, '.md');
  const desc = descMatch ? descMatch[1].trim() : '';
  const keywords = kwMatch ? kwMatch[1].trim() : '';
  const brand = getBrandForFile(norm);

  const userPrompt = `请为以下文章生成深度打磨升级版的全面 SEO 技术长文：
- 文章路径：${norm}
- 文章标题：${title}
- 核心关键词：${keywords}
- 原文参考描述：${desc}
- 主推推荐品牌：${brand.name}（${brand.badge}）
- 目标：全面升级至 3000-3500 字的行业顶级指南，深度覆盖 8-10 个大纲章节、真实量化指标对照表、抓包排障诊断命令与避坑防骗矩阵。`;

  console.log(`[${index + 1}/${total}] ⏳ Starting: ${norm} (${title})`);
  const startTime = Date.now();
  
  const rawContent = await callDeepSeekWithRetry(makeSystemPrompt(brand), userPrompt);
  
  let cleaned = rawContent.trim();
  if (cleaned.startsWith('```markdown')) {
    cleaned = cleaned.replace(/^```markdown\n/, '').replace(/\n```$/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```[a-z]*\n/, '').replace(/\n```$/, '');
  }

  // 1. 安全转义避免破坏 Vue 渲染
  cleaned = cleaned.replace(/(?<=\s)<(?=\s|\d)/g, '&lt;');
  // 2. 确保没有外部 airpick.co 死链
  cleaned = cleaned.replace(/\(https?:\/\/airpick\.dev\/?/g, '(/');
  
  // 3. 安全清理 YAML Frontmatter 异常嵌套与缩进
  if (cleaned.startsWith('---')) {
    const parts = cleaned.split('---');
    if (parts.length >= 3) {
      let fm = parts[1];
      if (fm.includes('twitter:card') && fm.includes('      - content:')) {
        fm = fm.replace(/-\s*-\s*meta\s*\n\s*-\s*name:\s*twitter:card\s*\n\s*-\s*content:\s*summary_large_image/g, '- - meta\n    - name: twitter:card\n      content: summary_large_image');
      }
      fm = fm.replace(/-\s*-\s*-\s*meta/g, '- - meta');
      parts[1] = fm;
      cleaned = parts.join('---');
    }
  }

  // 4. 确保 HTML 标签闭合
  const openDivs = (cleaned.match(/<div[\s>]/g) || []).length;
  const closeDivs = (cleaned.match(/<\/div>/g) || []).length;
  if (openDivs > closeDivs) {
    const diff = openDivs - closeDivs;
    cleaned += '\n' + '</div>\n'.repeat(diff);
  }

  // 5. 自动标准化内链
  cleaned = normalizeInternalLinks(cleaned);

  fs.writeFileSync(norm, cleaned, 'utf8');
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  
  checkpoints[norm] = {
    status: 'done',
    timestamp: new Date().toISOString(),
    chars: cleaned.length,
    elapsedSec: elapsed
  };
  fs.writeFileSync(CHECKPOINT_FILE, JSON.stringify(checkpoints, null, 2), 'utf8');

  console.log(`[${index + 1}/${total}] ✅ Finished: ${norm} (${cleaned.length} chars in ${elapsed}s)`);
}

async function main() {
  console.log(`========================================`);
  console.log(`DeepSeek-R1 Batch Upgrade Engine - Phase 2`);
  console.log(`Total: ${allFiles.length}, Already Done: ${allFiles.length - pendingFiles.length}, Pending: ${pendingFiles.length}`);
  console.log(`Concurrency: ${CONCURRENCY}`);
  console.log(`========================================\n`);

  let currentIndex = 0;
  const total = allFiles.length;

  async function worker(workerId) {
    while (currentIndex < pendingFiles.length) {
      const idx = currentIndex++;
      const file = pendingFiles[idx];
      try {
        await processFile(file, idx + (total - pendingFiles.length), total);
      } catch (err) {
        console.error(`[Worker ${workerId}] ❌ Failed processing ${file}:`, err.message);
      }
    }
  }

  const workers = [];
  for (let i = 0; i < CONCURRENCY; i++) {
    workers.push(worker(i + 1));
  }

  await Promise.all(workers);
  console.log('\n🎉 Phase 2 all pending files completed!');
}

main().catch(console.error);
