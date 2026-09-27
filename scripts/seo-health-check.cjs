/**
 * AirPick (airpick.co) - SEO 发布安全硬性门禁检查系统 (SEO Health Check)
 * 依据《SEO 防掉索引与发布安全总指令》制定
 */

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.resolve('docs/.vitepress/dist');
const DOMAIN = 'https://airpick.co';
const HISTORY_FILE = path.resolve('scripts/data/sitemap-history.json');

// 递归遍历所有生成的 HTML 文件
function getAllHtmlFiles(dir, baseDir = dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(filePath, baseDir));
    } else if (file.endsWith('.html')) {
      const relPath = path.relative(baseDir, filePath).replace(/\\/g, '/');
      results.push({ fullPath: filePath, relPath });
    }
  }
  return results;
}

// 收集全站所有构建产物静态文件集合 (用于静态资产匹配)
function getAllDistFiles(dir, baseDir = dir) {
  let set = new Set();
  if (!fs.existsSync(dir)) return set;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      const sub = getAllDistFiles(filePath, baseDir);
      for (const item of sub) set.add(item);
    } else {
      const rel = '/' + path.relative(baseDir, filePath).replace(/\\/g, '/');
      set.add(rel);
    }
  }
  return set;
}

async function runSeoHealthCheck() {
  console.log('================================================================');
  console.log('🔍 开始执行 AirPick 生产环境 SEO 发布安全硬性门禁检查...');
  console.log('================================================================\n');

  const checkResults = {
    Build: 'PENDING',
    Robots: 'PENDING',
    Noindex: 'PENDING',
    Canonical: 'PENDING',
    Sitemap: 'PENDING',
    InternalLinks: 'PENDING',
    CoreUrls: 'PENDING',
    Schema: 'PENDING',
    DuplicateTitles: 'PENDING',
    PageCount: 'PENDING',
  };

  const criticalErrors = [];
  const warnings = [];

  // ---------------------------------------------------------------------------
  // 1. Build 产物完整性检查
  // ---------------------------------------------------------------------------
  if (!fs.existsSync(DIST_DIR)) {
    criticalErrors.push(`[Build] 构建产物目录不存在: ${DIST_DIR}，请先执行 npm run docs:build`);
    checkResults.Build = 'FAIL';
  } else {
    const hasIndex = fs.existsSync(path.join(DIST_DIR, 'index.html'));
    const hasSitemap = fs.existsSync(path.join(DIST_DIR, 'sitemap.xml'));
    const hasRobots = fs.existsSync(path.join(DIST_DIR, 'robots.txt'));
    if (!hasIndex || !hasSitemap || !hasRobots) {
      criticalErrors.push(`[Build] 关键产物缺失: index.html(${hasIndex}), sitemap.xml(${hasSitemap}), robots.txt(${hasRobots})`);
      checkResults.Build = 'FAIL';
    } else {
      checkResults.Build = 'PASS';
    }
  }

  const htmlFiles = getAllHtmlFiles(DIST_DIR);
  const allDistFiles = getAllDistFiles(DIST_DIR);
  console.log(`[扫描] 发现构建生成 HTML 页面总数: ${htmlFiles.length} 篇 | 静态资产总数: ${allDistFiles.size} 项`);

  // ---------------------------------------------------------------------------
  // 2. robots.txt 检查
  // ---------------------------------------------------------------------------
  try {
    const robotsPath = path.join(DIST_DIR, 'robots.txt');
    const robotsContent = fs.readFileSync(robotsPath, 'utf8');

    // 严禁出现 User-agent: * Disallow: /
    if (/User-agent:\s*\*\s*[\r\n]+Disallow:\s*\/\s*($|[\r\n])/i.test(robotsContent)) {
      criticalErrors.push('[Robots] 致命错误: 发现全局禁止抓取规则 (User-agent: * Disallow: /)');
      checkResults.Robots = 'FAIL';
    } else if (!robotsContent.includes(`Sitemap: ${DOMAIN}/sitemap.xml`)) {
      criticalErrors.push(`[Robots] 缺失正确的 Sitemap 声明: Sitemap: ${DOMAIN}/sitemap.xml`);
      checkResults.Robots = 'FAIL';
    } else if (!robotsContent.includes('Googlebot') || !robotsContent.includes('bingbot')) {
      warnings.push('[Robots] 建议显式放行 Googlebot 与 bingbot');
      checkResults.Robots = 'PASS';
    } else {
      checkResults.Robots = 'PASS';
    }
  } catch (err) {
    criticalErrors.push(`[Robots] 读取 robots.txt 失败: ${err.message}`);
    checkResults.Robots = 'FAIL';
  }

  // ---------------------------------------------------------------------------
  // 3. Noindex 检查
  // ---------------------------------------------------------------------------
  let noindexCount = 0;
  const noindexPages = [];

  for (const { fullPath, relPath } of htmlFiles) {
    if (relPath === '404.html') continue;

    const content = fs.readFileSync(fullPath, 'utf8');
    if (/<meta\s+name=["']robots["']\s+content=["'][^"']*noindex/i.test(content) ||
        /<meta\s+name=["']googlebot["']\s+content=["'][^"']*noindex/i.test(content) ||
        /<meta\s+name=["']bingbot["']\s+content=["'][^"']*noindex/i.test(content)) {
      noindexCount++;
      noindexPages.push(relPath);
    }
  }

  if (noindexCount > 0) {
    criticalErrors.push(`[Noindex] 发现 ${noindexCount} 个正式页面意外包含 noindex: ${noindexPages.slice(0, 5).join(', ')}`);
    checkResults.Noindex = 'FAIL';
  } else {
    checkResults.Noindex = 'PASS';
  }

  // ---------------------------------------------------------------------------
  // 4. Canonical 检查
  // ---------------------------------------------------------------------------
  let canonicalErrors = [];
  const homepageCanonical = `${DOMAIN}/`;

  for (const { fullPath, relPath } of htmlFiles) {
    if (relPath === '404.html') continue;
    const content = fs.readFileSync(fullPath, 'utf8');

    // 检查所有 canonical link 标签
    const canonicalMatches = Array.from(content.matchAll(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/gi));
    if (canonicalMatches.length === 0) {
      canonicalErrors.push({ file: relPath, issue: '缺失 canonical 标签' });
      continue;
    } else if (canonicalMatches.length > 1) {
      canonicalErrors.push({ file: relPath, count: canonicalMatches.length, issue: '存在重复的 canonical 标签' });
      continue;
    }

    const href = canonicalMatches[0][1];
    if (!href.startsWith(DOMAIN)) {
      canonicalErrors.push({ file: relPath, href, issue: 'canonical 未使用正式主域名' });
    } else if (href.includes('?') || href.includes('#')) {
      canonicalErrors.push({ file: relPath, href, issue: 'canonical 包含查询参数或锚点' });
    } else if (relPath !== 'index.html' && href === homepageCanonical) {
      canonicalErrors.push({ file: relPath, href, issue: '非首页页面 canonical 错误指向首页' });
    }
  }

  if (canonicalErrors.length > 0) {
    criticalErrors.push(`[Canonical] 发现 ${canonicalErrors.length} 处规范链接异常，例: ${JSON.stringify(canonicalErrors.slice(0, 3))}`);
    checkResults.Canonical = 'FAIL';
  } else {
    checkResults.Canonical = 'PASS';
  }

  // ---------------------------------------------------------------------------
  // 5. Sitemap 检查
  // ---------------------------------------------------------------------------
  let sitemapUrlCount = 0;
  try {
    const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    const locMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g) || [];
    sitemapUrlCount = locMatches.length;

    let invalidUrls = [];
    const seenUrls = new Set();
    let duplicateUrls = 0;

    locMatches.forEach(locTag => {
      const url = locTag.replace(/<\/?loc>/g, '').trim();
      if (!url.startsWith(DOMAIN)) {
        invalidUrls.push({ url, issue: '未以正式主域名开头' });
      }
      if (url.includes('localhost') || url.includes('127.0.0.1') || url.includes('pages.dev') || url.includes('vercel.app')) {
        invalidUrls.push({ url, issue: '包含测试或临时域名' });
      }
      if (url.includes('404') || url.includes('draft') || url.includes('test')) {
        invalidUrls.push({ url, issue: '包含了非生产页面' });
      }
      if (seenUrls.has(url)) {
        duplicateUrls++;
      }
      seenUrls.add(url);
    });

    if (invalidUrls.length > 0) {
      criticalErrors.push(`[Sitemap] 发现 ${invalidUrls.length} 个不合规的 Sitemap URL: ${JSON.stringify(invalidUrls.slice(0, 3))}`);
      checkResults.Sitemap = 'FAIL';
    } else if (duplicateUrls > 0) {
      criticalErrors.push(`[Sitemap] 发现 ${duplicateUrls} 个重复的 Sitemap URL`);
      checkResults.Sitemap = 'FAIL';
    } else if (sitemapUrlCount < 10) {
      criticalErrors.push(`[Sitemap] Sitemap URL 数量严重异常 (${sitemapUrlCount})`);
      checkResults.Sitemap = 'FAIL';
    } else {
      checkResults.Sitemap = 'PASS';
    }

    // 历史波动监控与对比
    let prevCount = null;
    if (fs.existsSync(HISTORY_FILE)) {
      try {
        const historyData = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'));
        prevCount = historyData.lastSitemapCount;
      } catch (e) {}
    }

    if (prevCount !== null) {
      const diff = sitemapUrlCount - prevCount;
      console.log(`[Sitemap 监控] 上次记录数量: ${prevCount} | 本次数量: ${sitemapUrlCount} | 差值: ${diff > 0 ? '+' : ''}${diff}`);
      if (prevCount > 50 && sitemapUrlCount < prevCount * 0.7) {
        criticalErrors.push(`[Sitemap] 页面数量异常腰斩！从 ${prevCount} 骤降至 ${sitemapUrlCount}，触发安全熔断！`);
        checkResults.PageCount = 'FAIL';
      } else if (prevCount > 50 && sitemapUrlCount > prevCount * 3) {
        criticalErrors.push(`[Sitemap] 页面数量异常暴增！从 ${prevCount} 暴增至 ${sitemapUrlCount}，请排查是否错误泛解析生成垃圾页面！`);
        checkResults.PageCount = 'FAIL';
      } else {
        checkResults.PageCount = 'PASS';
      }
    } else {
      checkResults.PageCount = 'PASS';
    }

    // 记录本次历史
    fs.mkdirSync(path.dirname(HISTORY_FILE), { recursive: true });
    fs.writeFileSync(HISTORY_FILE, JSON.stringify({
      lastSitemapCount: sitemapUrlCount,
      updatedAt: new Date().toISOString()
    }, null, 2), 'utf8');

  } catch (err) {
    criticalErrors.push(`[Sitemap] 无法解析 sitemap.xml: ${err.message}`);
    checkResults.Sitemap = 'FAIL';
  }

  // ---------------------------------------------------------------------------
  // 6. 核心战略 URL 与物理文件核验
  // ---------------------------------------------------------------------------
  const coreHubs = [
    { name: '首页', path: 'index.html' },
    { name: 'VPN 选型专区', path: 'vpn/index.html' },
    { name: '机场推荐专区', path: 'jichang/index.html' },
    { name: 'Clash 专区', path: 'clash/index.html' },
    { name: '节点测速专区', path: 'nodes/index.html' },
    { name: '梯子专区', path: 'tizi/index.html' },
    { name: '免费资源专区', path: 'free/index.html' },
    { name: '使用教程专区', path: 'tutorial/index.html' },
    { name: '品牌库专区', path: 'brands/index.html' },
    { name: '机场核心枢纽', path: 'airport/index.html' },
    { name: '品牌横评专栏', path: 'reviews/index.html' },
  ];

  let missingCore = [];
  for (const hub of coreHubs) {
    const full = path.join(DIST_DIR, hub.path);
    if (!fs.existsSync(full)) {
      missingCore.push(`${hub.name} (${hub.path})`);
    }
  }

  if (missingCore.length > 0) {
    criticalErrors.push(`[Core URLs] 核心枢纽页面物理文件缺失: ${missingCore.join(', ')}`);
    checkResults.CoreUrls = 'FAIL';
  } else {
    checkResults.CoreUrls = 'PASS';
  }

  // ---------------------------------------------------------------------------
  // 7. 内部链接与死链检查 (精准过滤 <a> 标签与静态资产)
  // ---------------------------------------------------------------------------
  const validPageRoutes = new Set();
  htmlFiles.forEach(f => {
    validPageRoutes.add('/' + f.relPath);
    validPageRoutes.add('/' + f.relPath.replace(/\.html$/, ''));
    if (f.relPath.endsWith('index.html')) {
      validPageRoutes.add('/' + f.relPath.replace(/index\.html$/, ''));
    }
  });
  validPageRoutes.add('/');

  let emptyHrefs = 0;
  let deadInternalLinks = [];

  for (const { fullPath, relPath } of htmlFiles) {
    const content = fs.readFileSync(fullPath, 'utf8');

    // 精确匹配 <a ... href="..."> 锚点标签
    const aTagMatches = content.matchAll(/<a\s+[^>]*href=["']([^"']+)["']/gi);
    for (const match of aTagMatches) {
      let href = match[1].trim();
      if (href === '') {
        emptyHrefs++;
        continue;
      }
      if (href === '#' || href.startsWith('#')) {
        // 允许页面内锚点跳转
        continue;
      }
      if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('javascript:') || href.startsWith('tg:')) {
        continue;
      }

      // 清除 hash 与参数
      let cleanHref = href.split('#')[0].split('?')[0];
      if (!cleanHref) continue;

      if (!cleanHref.startsWith('/')) {
        const fileDir = path.dirname(relPath);
        cleanHref = '/' + path.posix.join(fileDir, cleanHref);
      }

      let alt1 = cleanHref.endsWith('/') ? cleanHref : cleanHref + '/';
      let alt2 = cleanHref.replace(/\/$/, '');
      let alt3 = cleanHref.replace(/\.html$/, '');
      let alt4 = cleanHref.replace(/\/$/, '') + '.html';

      const isValidPage = validPageRoutes.has(cleanHref) || validPageRoutes.has(alt1) || validPageRoutes.has(alt2) || validPageRoutes.has(alt3) || validPageRoutes.has(alt4);
      const isStaticAsset = allDistFiles.has(cleanHref);

      if (!isValidPage && !isStaticAsset) {
        deadInternalLinks.push({ file: relPath, link: href, resolved: cleanHref });
      }
    }
  }

  if (emptyHrefs > 0) {
    warnings.push(`[Internal Links] 发现 ${emptyHrefs} 处空 href="" 属性`);
  }

  if (deadInternalLinks.length > 0) {
    criticalErrors.push(`[Internal Links] 发现 ${deadInternalLinks.length} 处内部死链！例: ${JSON.stringify(deadInternalLinks.slice(0, 3))}`);
    checkResults.InternalLinks = 'FAIL';
  } else {
    checkResults.InternalLinks = 'PASS';
  }

  // ---------------------------------------------------------------------------
  // 8. 标题/描述/H1 唯一性检查与垃圾页面排查
  // ---------------------------------------------------------------------------
  const titleMap = new Map();
  let duplicateTitleCount = 0;
  let missingH1Count = 0;
  let multipleH1Count = 0;
  let rogueSpamPages = [];

  const spamKeywords = ['casino', 'bet', 'xxx', 'poker', 'lottery', 'gambling'];

  for (const { fullPath, relPath } of htmlFiles) {
    if (relPath === '404.html') continue;

    // 检查黑客恶意投毒页面
    for (const kw of spamKeywords) {
      if (relPath.toLowerCase().includes(kw)) {
        rogueSpamPages.push({ file: relPath, keyword: kw });
      }
    }

    const content = fs.readFileSync(fullPath, 'utf8');

    // 检查 title
    const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
    if (titleMatch) {
      const title = titleMatch[1].trim();
      if (titleMap.has(title)) {
        duplicateTitleCount++;
      } else {
        titleMap.set(title, relPath);
      }
    }

    // 检查 H1
    const h1Count = (content.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || []).length;
    if (h1Count === 0) {
      missingH1Count++;
    } else if (h1Count > 1) {
      multipleH1Count++;
    }
  }

  if (rogueSpamPages.length > 0) {
    criticalErrors.push(`[Spam Guard] 🚨 致命警告: 发现疑似恶意垃圾/博彩注入页面: ${JSON.stringify(rogueSpamPages)}`);
  }

  if (duplicateTitleCount > 5) {
    warnings.push(`[Duplicate Titles] 发现 ${duplicateTitleCount} 个页面 Title 重复`);
    checkResults.DuplicateTitles = 'WARN';
  } else {
    checkResults.DuplicateTitles = 'PASS';
  }

  // ---------------------------------------------------------------------------
  // 9. Schema.org 结构化数据校验
  // ---------------------------------------------------------------------------
  let invalidSchemas = 0;
  let totalSchemas = 0;

  for (const { fullPath, relPath } of htmlFiles) {
    const content = fs.readFileSync(fullPath, 'utf8');
    const schemaMatches = content.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi);
    for (const match of schemaMatches) {
      totalSchemas++;
      try {
        JSON.parse(match[1]);
      } catch (e) {
        invalidSchemas++;
        criticalErrors.push(`[Schema] JSON-LD 语法解析错误于 ${relPath}: ${e.message}`);
      }
    }
  }

  if (invalidSchemas > 0) {
    checkResults.Schema = 'FAIL';
  } else {
    checkResults.Schema = 'PASS';
  }

  // ---------------------------------------------------------------------------
  // 综合判定与最终标准输出
  // ---------------------------------------------------------------------------
  const isAllPassed = Object.values(checkResults).every(status => status === 'PASS' || status === 'WARN') && criticalErrors.length === 0;
  const decision = isAllPassed ? 'READY' : 'BLOCKED';

  console.log('----------------------------------------------------------------');
  console.log('📊 SEO HEALTH CHECK 最终门禁审计矩阵');
  console.log('----------------------------------------------------------------');
  console.log(`Build:            ${checkResults.Build}`);
  console.log(`Robots:           ${checkResults.Robots}`);
  console.log(`Noindex:          ${checkResults.Noindex}`);
  console.log(`Canonical:        ${checkResults.Canonical}`);
  console.log(`Sitemap:          ${checkResults.Sitemap}`);
  console.log(`Internal Links:   ${checkResults.InternalLinks}`);
  console.log(`Core URLs:        ${checkResults.CoreUrls}`);
  console.log(`Schema:           ${checkResults.Schema}`);
  console.log(`Duplicate Titles: ${checkResults.DuplicateTitles}`);
  console.log(`Page Count:       ${checkResults.PageCount}`);
  console.log('----------------------------------------------------------------');
  console.log(`RELEASE_DECISION: ${decision}`);
  console.log('----------------------------------------------------------------\n');

  if (criticalErrors.length > 0) {
    console.error('🚨 【发布熔断告警 (BLOCKED)】发现以下必须在上线前修复的问题:');
    criticalErrors.forEach((err, i) => console.error(`  ${i + 1}. ${err}`));
    console.error('\n⚠️ 依据《SEO 防掉索引安全总指令》，已立即中止发布流程，严禁直接部署到生产环境！\n');
    process.exit(1);
  } else {
    console.log('✅ 【门禁全部通过 (READY)】当前构建完全符合 Google / Bing 长期安全索引规范，准予部署！\n');
    if (warnings.length > 0) {
      console.log('💡 优化建议 (非阻塞):');
      warnings.forEach((w, i) => console.log(`  ${i + 1}. ${w}`));
      console.log('');
    }
    process.exit(0);
  }
}

runSeoHealthCheck();
