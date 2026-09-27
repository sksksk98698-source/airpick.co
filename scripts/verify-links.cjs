const fs = require('fs');
const path = require('path');

function getAllMdFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.vitepress' && file !== 'dist') {
        results = results.concat(getAllMdFiles(filePath));
      }
    } else if (file.endsWith('.md')) {
      results.push(filePath);
    }
  }
  return results;
}

const files = getAllMdFiles('docs');
const validRoutes = new Set();
for (const file of files) {
  let rel = path.relative('docs', file).replace(/\\/g, '/');
  if (rel.endsWith('index.md')) {
    validRoutes.add('/' + rel.replace(/index\.md$/, ''));
  }
  validRoutes.add('/' + rel.replace(/\.md$/, ''));
  validRoutes.add('/' + rel.replace(/\.md$/, '.html'));
}
validRoutes.add('/');

let deadLinks = [];
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g);
  for (const match of matches) {
    let url = match[1].trim();
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('tg:') || url.startsWith('#')) {
      continue;
    }
    let cleanUrl = url.split('#')[0].split('?')[0];
    if (!cleanUrl) continue;
    if (!cleanUrl.startsWith('/')) {
      const dir = path.dirname(path.relative('docs', file)).replace(/\\/g, '/');
      cleanUrl = '/' + path.posix.join(dir, cleanUrl);
    }
    let alt1 = cleanUrl.endsWith('/') ? cleanUrl : cleanUrl + '/';
    let alt2 = cleanUrl.replace(/\/$/, '');
    let alt3 = cleanUrl.replace(/\.html$/, '');
    let alt4 = cleanUrl.replace(/\/$/, '') + '.html';
    
    if (!validRoutes.has(cleanUrl) && !validRoutes.has(alt1) && !validRoutes.has(alt2) && !validRoutes.has(alt3) && !validRoutes.has(alt4)) {
      deadLinks.push({ file, link: url, resolved: cleanUrl });
    }
  }
}

console.log('Total markdown files scanned:', files.length);
console.log('Dead internal links count:', deadLinks.length);
if (deadLinks.length > 0) {
  console.log('First 10 dead links:', deadLinks.slice(0, 10));
}
