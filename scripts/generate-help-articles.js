import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

const helpData = require('./data/help');

const docsRoot = path.resolve(__dirname, '../docs');

function generateHelpArticleContent(art, cluster, sub, cat) {
  const dateStr = '2026-09-26';
  const secKeywordsText = art.secondaryKeywords.join('、');
  
  let intentBadge = '';
  switch (art.searchIntent) {
    case '故障': intentBadge = '网络排障与疑难诊断手册'; break;
    case '知识': intentBadge = '风控预警与原理全解'; break;
    case '教程': intentBadge = '应急自愈与配置调优教程'; break;
    case '决策': intentBadge = '避坑选型与决策指南'; break;
    case '购买': intentBadge = '资金安全与防骗指引'; break;
    default: intentBadge = '专业深度评测';
  }

  const internalLinksMarkdown = art.internalLinks.map(link => {
    return `- [**${link.anchor}**](${link.target})：查看配套的节点诊断、客户端重置或替代高可用方案。`;
  }).join('\n');

  const longTailText = art.longTailKeywords.slice(0, 8).join('、');

  return `---
title: ${art.title} - AirPick
description: ${art.title}。本文深度解析${art.primaryKeyword}及${secKeywordsText}，为出海用户提供 2026 年最新故障排查速查、防跑路预警与资金维权应急实战手册 · airpick.co
keywords: ${art.primaryKeyword}, ${art.secondaryKeywords.join(', ')}
lastUpdated: ${dateStr}
---

# ${art.title}

> **文章定位**：AirPick · ${intentBadge} | **核心主词**：\`${art.primaryKeyword}\` | **更新日期**：${dateStr} | **官方评测站**：[airpick.co](https://airpick.co)

---

## 一、直接答案 (TL;DR)

关于 **${art.primaryKeyword}**，核心排查法则与自愈结论如下：遇到网络突发故障或服务异常，请牢记 **“系统时钟同步第一、订阅链接连通第二、本地端口与 TUN 网卡第三、先月付防跑路第四”**。

在 90% 的“节点全红超时”故障中，根本原因并非节点阵亡，而是 **操作系统本地时间与网络时间偏差超过 30 秒** 导致 TLS 加密证书校验直接失效，或是本地 7890 端口被残留进程锁死；在选购与资金安全方面，坚决规避“大打折买一年送一年”或开启 TG 群全员禁言的商家，初次使用必须坚持月付。如遇不可用，优先在客户端一键重新拉取订阅或尝试切换为纯规则模式。

---

## 二、详细原因与底层技术背景

为什么在探讨 **${art.primaryKeyword}**（涵盖 ${secKeywordsText} 等高频痛点）时，很多用户会陷入“反复换节点却依然无法上网”的死循环？其背后存在以下三项技术与商业机理：

### 1. TLS 握手时间戳强校验与证书链阻断机制
现代代理协议（如 VMess、VLESS Reality、Trojan、Shadowsocks-2022）在建立加密传输隧道时，高度依赖 TLS 1.3 握手时钟。如果用户电脑或手机的本地系统时间因主板电池没电、跨时区未同步等原因，与国际 NTP 原子钟误差超过 30~90 秒，加密证书将被判定为“尚未生效”或“已过期”，客户端内核会直接切断握手连接，表现为所有节点瞬间全部超时飘红。

### 2. 本地端口占用与虚拟网卡（TUN/Wintun）驱动僵死
当非正常退出代理软件（如直接任务管理器强杀进程、电脑突然蓝屏或合盖休眠唤醒），操作系统底层注册的本地监听端口（默认 7890/7891）可能仍被僵尸线程占用。此时再次打开客户端，无法绑定端口便会静默报错；同时，Wintun 虚拟网卡驱动未正常注销可能导致系统路由表依然指向已失效的网关，造成“国内海外全断网”。

### 3. 机场资金链断裂与跑路前兆生命周期
部分小作坊机场缺乏长线运维规划，在运营数月后因高昂的专线机房租金与带宽超支入不敷出。为了完成最后的资金盘收割，通常会推出“骨折级双十一/周年庆买一送一”活动，并在官方群聊中关闭群员发言、工单长时间不予受理。看清服务商商业运行规律，是保护个人财产的关键屏障。

---

## 三、操作步骤与落地方案

针对 **${art.title}** 涉及的具体故障或避坑需求，请按照以下标准化排查清单依次操作：

### 步骤一：30 秒快速自检（排查系统环境）
1. **校准系统时间**：
   - **Windows 用户**：进入【设置】→【时间和语言】→【日期和时间】，点击“立即同步”按钮；
   - **macOS / iOS 用户**：进入【系统设置】→【通用】→【日期与时间】，确认开启“自动设置时间与日期”。
2. **释放占用端口与重启内核**：
   - 在客户端设置中彻底退出程序，以管理员身份运行 PowerShell，检查 7890 端口占用情况：
     \`\`\`powershell
     netstat -ano | findstr :7890
     \`\`\`
   - 若有残留 PID，直接通过 \`taskkill /F /PID <进程号>\` 强制终止。

### 步骤二：修复订阅链接与解析异常
- 打开浏览器无痕模式，直接访问订阅链接地址。若浏览器能正常下载一段包含加密字符串的文本文件，说明机场后端服务器正常；若提示 404 或连接被重置，说明机场订阅域名遭到了运营商阻断，需登录机场后台获取最新防封备用订阅域名。
- 在客户端中右键订阅，选择 **“更新订阅（Update Proxy Provider）”**。

### 步骤三：网络分流与系统代理急救复原
1. 将客户端出站模式切换为 **Rule（规则模式）**。
2. 若国内网页（百度、微信）打不开，检查规则集中是否存在“FINAL 走代理”且目标代理节点已失效的情况；临时关闭客户端设置中的“TUN 模式”，并在 Windows 网络设置中确认“手动设置代理”已被关闭，即可秒级恢复本地网络。

<div style="margin: 1.5rem 0; padding: 1.2rem; background: var(--vp-c-bg-alt); border: 1px dashed var(--vp-c-brand-1); border-radius: 8px;">
  <strong>💡 AirPick 读者专享福利提示：</strong><br>
  如当前机场频发断联、跑路预警，推荐更换为高 SLA 保障的企业级专线备用梯子，结账输入独家折扣码立减：
  <div style="margin-top: 8px;">
    <CopyCoupon code="AIRPICK2026" discount="立减20%" tip="点击一键复制AirPick独家折扣码" />
  </div>
</div>

---

## 四、关键量化指标与验收标准

完成排障与修复操作后，请根据以下三项指标进行健康度验证：

1. **节点连通率与 True Latency 延迟达标率**：
   - 客户端批量测速显示可用节点比例达到 **90% 以上**；
   - 香港/新加坡核心节点真连接 RTT 保持在 **30ms~70ms**，无连续红字丢包。
2. **双向流量分流隔离验证**：
   - 打开终端执行 \`curl -I https://www.baidu.com\`，延迟 **< 15ms** 且展示本地运营商 IP；
   - 执行 \`curl -I https://www.google.com\`，秒级响应 \`HTTP/2 200\` 状态码。
3. **系统待机稳定性复测**：
   - 电脑锁屏休眠 30 分钟后唤醒，网络应能在 **3 秒内** 自动重连畅通，无需手动重启代理软件。

---

## 五、注意事项与避坑警示

> [!WARNING] 常见维权与防坑警示
> - **切勿轻信所谓的“代充年费”黑灰产**：非官方途径低价代购套餐常被充值盗刷黑卡，一旦被原卡主申诉（Chargeback），你的机场账号将被永久封禁且退款无门。
> - **遭遇恶意跑路第一时间留存支付凭据**：若遭遇商家失联且通过支付宝/微信商户号付款，请立即在微信支付/支付宝账单中发起“投诉商家未提供服务”维权异议。
> - **防范高仿钓鱼网站**：在 Google 搜索机场名称时，前几个带有“赞助商（Sponsored）”标识的链接大多是克隆高仿钓鱼站，谨防输入密码及泄露订阅密钥。
> - **守法合规边界**：科学上网仅限正当学习科研与跨境商务，切勿触碰法律红线。

---

## 六、延伸阅读与相关专题推荐

为进一步提升您的网络诊断技能与应急处置能力，推荐阅读以下技术排障手册：

${internalLinksMarkdown}

---

> **本文收录于 [AirPick · 避坑与故障指南](https://airpick.co)**  
> 检索关键词覆盖：${longTailText} 等。欢迎收藏本站并分享给身边的技术同好。
`;
}

let generatedCount = 0;
helpData.subcategories.forEach(sub => {
  sub.clusters.forEach(cluster => {
    const clusterDir = path.join(docsRoot, helpData.id, sub.id, cluster.id);
    if (!fs.existsSync(clusterDir)) {
      fs.mkdirSync(clusterDir, { recursive: true });
    }

    cluster.articles.forEach(art => {
      const filePath = path.join(clusterDir, `${art.slug}.md`);
      const content = generateHelpArticleContent(art, cluster, sub, helpData);
      fs.writeFileSync(filePath, content, 'utf-8');
      generatedCount++;
    });
  });
});

console.log(`Successfully generated ${generatedCount} comprehensive articles for Category 6 (/help/)!`);
