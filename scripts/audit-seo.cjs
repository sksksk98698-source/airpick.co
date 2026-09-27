const fs = require('fs');

console.log('=== 1. CHECK HOMEPAGE (index.html) ===');
const indexHtml = fs.readFileSync('docs/.vitepress/dist/index.html', 'utf8');
const canonicalMatch = indexHtml.match(/<link rel="canonical"[^>]*>/);
console.log('Canonical:', canonicalMatch ? canonicalMatch[0] : 'MISSING');
const robotsMatch = indexHtml.match(/<meta name="robots"[^>]*>/);
console.log('Robots:', robotsMatch ? robotsMatch[0] : 'MISSING');
const ogUrlMatch = indexHtml.match(/<meta property="og:url"[^>]*>/);
console.log('OG URL:', ogUrlMatch ? ogUrlMatch[0] : 'MISSING');
const h1Matches = indexHtml.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || [];
console.log('H1 count:', h1Matches.length);
if (h1Matches.length) console.log('H1 content:', h1Matches[0].replace(/<[^>]+>/g, '').trim());

// Check Schema
const schemaMatches = indexHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
console.log('Schema tags count:', schemaMatches.length);
schemaMatches.forEach((s, idx) => {
  const jsonStr = s.replace(/<script type="application\/ld\+json">/, '').replace(/<\/script>/, '');
  try {
    const parsed = JSON.parse(jsonStr);
    console.log('Schema #' + (idx + 1) + ' type:', parsed['@type'] || (parsed['@graph'] ? 'Graph (' + parsed['@graph'].map(g => g['@type']).join(', ') + ')' : 'unknown'));
  } catch (e) {
    console.error('Schema #' + (idx + 1) + ' parse error:', e.message);
  }
});

console.log('\n=== 2. CHECK PILLAR PAGES ===');
const pillars = ['vpn', 'jichang', 'clash', 'nodes', 'tizi', 'free', 'brands', 'tutorial', 'airport', 'reviews'];
pillars.forEach(p => {
  const pPath = 'docs/.vitepress/dist/' + p + '/index.html';
  if (fs.existsSync(pPath)) {
    const html = fs.readFileSync(pPath, 'utf8');
    const c = (html.match(/<link rel="canonical"[^>]*>/) || ['MISSING'])[0];
    const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || ['', 'MISSING'])[1].replace(/<[^>]+>/g, '').trim();
    console.log(p + ': OK | ' + c + ' | H1: ' + h1.slice(0, 40));
  } else {
    console.error(p + ': FILE NOT FOUND at ' + pPath);
  }
});

console.log('\n=== 3. CHECK LEAF ARTICLE ===');
const artPath = 'docs/.vitepress/dist/scenario/ai/chatgpt/best-chatgpt-airports-2026.html';
if (fs.existsSync(artPath)) {
  const html = fs.readFileSync(artPath, 'utf8');
  console.log('Article canonical:', (html.match(/<link rel="canonical"[^>]*>/) || ['MISSING'])[0]);
  console.log('Article author meta:', (html.match(/<meta property="article:author"[^>]*>/) || ['MISSING'])[0]);
  const artSchemas = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
  console.log('Article schemas count:', artSchemas.length);
  artSchemas.forEach((s, idx) => {
    const jsonStr = s.replace(/<script type="application\/ld\+json">/, '').replace(/<\/script>/, '');
    try {
      const parsed = JSON.parse(jsonStr);
      console.log('  Schema #' + (idx + 1) + ' type:', parsed['@type']);
    } catch (e) {}
  });
}

console.log('\n=== 4. CHECK SITEMAP.XML ===');
const sitemap = fs.readFileSync('docs/.vitepress/dist/sitemap.xml', 'utf8');
const locs = sitemap.match(/<loc>(.*?)<\/loc>/g) || [];
console.log('Total URLs in sitemap:', locs.length);
let badLocs = locs.filter(l => !l.startsWith('<loc>https://airpick.co'));
console.log('Non-official domain URLs in sitemap:', badLocs.length);
let has404 = locs.filter(l => l.includes('404'));
console.log('404 URLs in sitemap:', has404.length);

console.log('\n=== 5. CHECK ROBOTS.TXT ===');
const robots = fs.readFileSync('docs/.vitepress/dist/robots.txt', 'utf8');
console.log(robots);
