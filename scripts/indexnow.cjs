/**
 * AirPick (airpick.co) - IndexNow 实时推送引擎
 * 官方支持: Microsoft Bing, Yandex, Seznam, Naver 等
 * 作用: 当新增、修改或删除 URL 时，即时通知搜索引擎，避免全站机械重复提交
 */

const https = require('https');
const fs = require('fs');

const INDEXNOW_HOST = 'airpick.co';
const INDEXNOW_KEY = 'airpick2026indexnowkey789abcde';
const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;

// 默认推送核心战略栏目与最新重点页面
const DEFAULT_URLS = [
  `https://${INDEXNOW_HOST}/`,
  `https://${INDEXNOW_HOST}/airport/`,
  `https://${INDEXNOW_HOST}/vpn/`,
  `https://${INDEXNOW_HOST}/jichang/`,
  `https://${INDEXNOW_HOST}/clash/`,
  `https://${INDEXNOW_HOST}/nodes/`,
  `https://${INDEXNOW_HOST}/tizi/`,
  `https://${INDEXNOW_HOST}/free/`,
  `https://${INDEXNOW_HOST}/brands/`,
  `https://${INDEXNOW_HOST}/tutorial/`,
  `https://${INDEXNOW_HOST}/reviews/`,
];

async function submitIndexNow(urls = DEFAULT_URLS) {
  if (!urls || urls.length === 0) {
    console.log('[IndexNow] 没有需要提交的 URL，跳过。');
    return;
  }

  // 保证 URL 唯一性且属于正式主域名
  const cleanUrls = Array.from(new Set(urls.filter(u => u.startsWith(`https://${INDEXNOW_HOST}`))));

  console.log(`[IndexNow] 准备向 IndexNow API 推送 ${cleanUrls.length} 个 URL...`);

  const payload = JSON.stringify({
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList: cleanUrls
  });

  const options = {
    hostname: 'api.indexnow.org',
    port: 443,
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  return new Promise((resolve) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 202) {
          console.log(`[IndexNow] ✅ 成功提交至 Bing/IndexNow API (状态码: ${res.statusCode} ${res.statusMessage})`);
          resolve(true);
        } else {
          console.warn(`[IndexNow] ⚠️ 提交响应: ${res.statusCode} ${res.statusMessage} ${body}`);
          resolve(false);
        }
      });
    });

    req.on('error', (err) => {
      console.warn(`[IndexNow] ⚠️ 网络连接提示: ${err.message} (不阻塞本地构建流程)`);
      resolve(false);
    });

    req.write(payload);
    req.end();
  });
}

// 允许命令行传入特定 URL
if (require.main === module) {
  const args = process.argv.slice(2);
  const targetUrls = args.length > 0 ? args : DEFAULT_URLS;
  submitIndexNow(targetUrls);
}

module.exports = { submitIndexNow, INDEXNOW_HOST, INDEXNOW_KEY };
