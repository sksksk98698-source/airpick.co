import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const docsRoot = path.resolve(__dirname, '../docs');

const brandPromotions = {
  default: {
    name: '光速云',
    badge: '👑 2026 全网综合第一主推',
    coupon: 'AMM',
    discount: '8折立减',
    desc: 'IEPL 企业级专线 + IPLC，单节点最高 2.5Gbps，全节点 x1 无倍率，原生解锁 ChatGPT / Claude / Netflix 全区：',
    affLink: 'https://sahude.gsyvipaff.com/#/?code=keqgvT5Y',
    reviewLink: '/reviews/guangsucloud/'
  },
  cheap: {
    name: '飞猫云',
    badge: '🥈 2026 平价高性价比首选',
    coupon: 'flycat888',
    discount: '8折优惠',
    desc: 'IEPL 企业级专线，年付折合约 7 元/月 (50GB)，轻度出海、查资料与日常追剧首选：',
    affLink: 'https://guangs.flycataff.com/#/?code=6uq0Xe9y',
    reviewLink: '/reviews/feimaocloud/'
  },
  breeze: {
    name: '微风网络',
    badge: '🥉 2026 轻度出海首选',
    coupon: 'flat888',
    discount: '9折优惠',
    desc: 'IEPL 企业级专线，年付折合 7 元/月，日常网页、社交媒体与 AI 工具轻度优选：',
    affLink: 'https://edp01.breezenetaff.com/#/?code=t3huofyI',
    reviewLink: '/reviews/breezenet/'
  },
  traffic: {
    name: '星岛梦',
    badge: '⭐ 2020 老牌不限时按量',
    coupon: 'nmw888',
    discount: '9折优惠',
    desc: '2020 老牌运营，企业级内网专线，年付折合 8 元/月，更提供永不过期不限时按量纯流量包：',
    affLink: 'https://guangs.xingdaomeng.com/#/?code=1TynBYnR',
    reviewLink: '/reviews/xingdaomeng/'
  },
  game: {
    name: '隐形人',
    badge: '⭐ 2024 企业级不挤兑专线',
    coupon: 'yxr888',
    discount: '8折优惠',
    desc: '企业级 IEPL 专线，60+ 原生机房独立 IP，总带宽 2Gbps+，配备 500Mbps 晚高峰冗余不挤兑：',
    affLink: 'https://yinxingren1.invisibleaff.com/#/?code=kcyEeoJT',
    reviewLink: '/reviews/invisible/'
  },
  worryfree: {
    name: '无忧链接',
    badge: '⭐ 2025 新星轻量低至6元起',
    coupon: 'wuyou666',
    discount: '新人特惠',
    desc: 'IEPL 专线 + VLESS 协议，订阅无需转换全平台直连，轻量套餐低至 6 元/月：',
    affLink: 'https://wep01.worryfreeaff.com/#/?code=4ZoSbLdL',
    reviewLink: '/reviews/worryfree/'
  }
};

function getPromotionForFile(relPath) {
  const norm = relPath.replace(/\\/g, '/');
  if (norm.includes('/airport/price/cheap/') || norm.includes('/airport/price/free/')) {
    return brandPromotions.cheap;
  }
  if (norm.includes('/airport/price/traffic/')) {
    return brandPromotions.traffic;
  }
  if (norm.includes('/scenario/life/game/') || norm.includes('/tech/line/iepl/')) {
    return brandPromotions.default; // 光速云 is primary for iepl
  }
  if (norm.includes('/client/advanced/router/')) {
    return brandPromotions.game; // 隐形人 for game/router
  }
  return brandPromotions.default;
}

function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  let count = 0;

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'reviews' && entry.name !== '.vitepress' && entry.name !== 'public') {
        count += processDirectory(fullPath);
      }
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      // Don't update root index.md or about.md (handled separately)
      if (entry.name === 'index.md' && dirPath === docsRoot) continue;
      if (entry.name === 'about.md') continue;

      let content = fs.readFileSync(fullPath, 'utf-8');
      if (content.includes('CopyCoupon code="AIRPICK2026"')) {
        const promo = getPromotionForFile(path.relative(docsRoot, fullPath));
        
        // Regex to replace the callout box
        const oldBoxRegex = /<div style="margin: 1\.5rem 0; padding: 1\.2rem; background: var\(--vp-c-bg-alt\); border: 1px dashed var\(--vp-c-brand-1\); border-radius: 8px;">[\s\S]*?<CopyCoupon code="AIRPICK2026" discount="立减20%" tip="点击一键复制AirPick独家折扣码" \/>[\s\S]*?<\/div>/;
        
        const newBox = `<div style="margin: 1.5rem 0; padding: 1.2rem; background: var(--vp-c-bg-alt); border: 1.5px dashed var(--vp-c-brand-1); border-radius: 10px;">
  <strong>💡 ${promo.badge} · 【${promo.name}】读者专享特惠通道：</strong><br>
  <span style="font-size: 0.92rem; color: var(--vp-c-text-2); display: inline-block; margin: 6px 0;">${promo.desc}</span>
  <div style="margin: 8px 0;">
    <CopyCoupon code="${promo.coupon}" discount="${promo.discount}" url="${promo.affLink}" brandName="${promo.name}" tip="点击复制专属优惠码并直达官网" />
  </div>
  <div style="font-size: 0.85rem; margin-top: 6px;">
    👉 <a href="${promo.reviewLink}">查看【${promo.name}】实验室 2026 最新测速报告与深度评测 →</a>
  </div>
</div>`;

        if (oldBoxRegex.test(content)) {
          content = content.replace(oldBoxRegex, newBox);
          fs.writeFileSync(fullPath, content, 'utf-8');
          count++;
        }
      }
    }
  }
  return count;
}

const updatedTotal = processDirectory(docsRoot);
console.log(`Successfully updated ${updatedTotal} articles with real promoted brands, coupons, and internal links!`);
