---
title: 分流黑白名单与自定义规则实操：精准添加需要翻墙或直连的私有域名 - AirPick
description: 分流黑白名单与自定义规则实操：精准添加需要翻墙或直连的私有域名。本文系统化讲解自定义分流规则教程及添加域名直连规则、强制走代理规则配置、DOMAIN-SUFFIX与IP-CIDR、分流优先级逻辑，为新手到进阶技术用户提供 2026 年最新实操指引、底层认知与对比评测 · airpick.co
head:
  - - meta
    - name: keywords
      content: 自定义分流规则教程, 添加域名直连规则, 强制走代理规则配置, DOMAIN-SUFFIX与IP-CIDR, 分流优先级逻辑
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: 分流黑白名单与自定义规则实操：精准添加需要翻墙或直连的私有域名 - AirPick
  - - meta
    - property: og:description
      content: 从 DNS 解析时机到 first-match 匹配引擎，系统讲透 DOMAIN-SUFFIX / IP-CIDR / GEOSITE 的优先级逻辑、分客户端配置写法、抓包排障命令与常见避坑矩阵。
  - - meta
    - name: twitter:card
      content: summary_large_image
---

# 分流黑白名单与自定��规则实操：精准添加需要翻墙或直连的私有域名

## 一、TL;DR：先建立正确的心智模型，再动手写规则

绝大多数人的分流翻车，不是规则写错了，而是**心智模型错了**。先把下面六条背下来，后面所有配置都是它们的排列组合：

1. **规则是自上而下的"首次命中即停止"（first-match wins）**。命中了第一条，后面的规则再精确也不会被执行。所以"优先级"不是玄学，就是数组下标。
2. **黑白名单不是两种机制，而是同一种机制的两个方向**。白名单 = 兜底走代理 + 少量直连例外；黑名单 = 兜底直连 + 少量代理例外。二者在配置文件里长得几乎一样，只差最后一行 `MATCH` 指向谁。
3. **私有域名、内网域名、公司 OA 域名，优先用 `DOMAIN-SUFFIX` 直连，并且尽量配 `no-resolve`**。任何一条会触发 DNS 解析的规则，都可能让你的内网域名被公共 DNS 解析成一个不存在的公网 IP。
4. **`DOMAIN-SUFFIX` 永远优先于 `GEOIP`**。把 `GEOIP,CN,DIRECT` 放在顶部是新手最经典的错误——它会把大量走国内 CDN 的境外服务一起直连掉，表现为"某些网站时快时慢、时通时断"。
5. **域名规则和 IP 规则不能混着乱排**。在 `fake-ip` 模式下，域名规则是生效的；但如果你在规则链靠前的位置写了 `IP-CIDR` 且没加 `no-resolve`，就会强制触发一次真实解析，破坏 fake-ip 的语义。
6. **改完规则一定要重启内核，而不是只点"重载配置"**。多数客户端的连接复用（keep-alive）会让已经建立的 TCP 会话继续走旧策略组，看起来像"规则没生效"。

一句话结论：**能写域名规则就别写 IP 规则，能用 `DOMAIN-SUFFIX` 就别用 `DOMAIN-KEYWORD`，能限定到策略组就别直接写 `DIRECT`/`PROXY`。**

---

## 二、底层机理：一条连接到底是怎么被"分流"的

### 2.1 完整链路：从应用到出站

以 mihomo（Clash.Meta）内核 + TUN 模式为例，一次访问大致经历五个阶段：

```
应用发起请求
  → 内核截获（TUN / 系统代理 / redirect）
  → 判定目标形态（域名 or 裸 IP）
  → [若为域名且 fake-ip 开启] 分配 198.18.x.x 假 IP 并建立域名映射
  → 规则引擎自顶向下匹配，命中即返回策略组
  → 按策略组选定出口节点，建立出站连接
```

关键点在第 3、4 步：**fake-ip 让"域名"这个信息在连接建立阶段被保留下来**，所以域名规则能命中。一旦你把 `fake-ip-filter` 里的域名排除出去，或者客户端跑的是 `redir-host` 模式，域名匹配的成功率就会显著下降——这是很多人"规则明明写了却不生效"的根因。

### 2.2 匹配引擎的三层结构

- **基础规则层**：`DOMAIN` / `DOMAIN-SUFFIX` / `DOMAIN-KEYWORD` / `IP-CIDR` / `GEOIP` / `PROCESS-NAME` / `SRC-PORT` 等。
- **规则集层**：`RULE-SET`（订阅式远程规则集）与 `GEOSITE`（内置域名集合）。规则集本质是把成百上千条基础规则打包，内核会用前缀树 / 哈希优化匹配，性能通常比手写大量 `DOMAIN-SUFFIX` 更好。
- **逻辑层**：`AND` / `OR` / `NOT` 组合条件，例如"目标域名是某 SDK 且进程名是某 App 才走代理"。这一层消耗 CPU 更高，建议只用于极少数高价值场景。

### 2.3 为什么"分流不生效"总是查不出原因

四个真实高频原因，按出现频率排序：

1. **浏览器自带的 DoH/DoT**。Chrome、Firefox 开启"安全 DNS"后，域名解析绕过内核，规则里没法做 `nameserver-policy` 干预。
2. **应用内硬编码 DNS 或使用自建长连接**。部分 IM、游戏客户端会把 TCP 长连接保持几小时，规则改了也不重连。
3. **CDN 与 Anycast 漂移**。`IP-CIDR` 规则今天命中、明天不命中，因为同一域名解析到了不同的边缘节点。
4. **规则集订阅过期**。远程 `RULE-SET` 拉取失败时，多数内核会静默跳过该条规则，而不是报错——于是"莫名其妙全走直连了"。

---

## 三、核心参数对比矩阵：10 类规则该怎么选

| 规则类型 | 匹配对象 | 是否触发 DNS | 单条匹配开销 | 建议排序区间 | 典型场景 | 误伤风险 | 维护成本 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `DOMAIN` | 精确域名 | 否 | 极低（哈希） | 10–20 | 登录、支付、API 网关 | 极低 | 高 |
| `DOMAIN-SUFFIX` | 域名后缀 | 否 | 低（前缀树） | 20–40 | 私有域名、内网 OA | 低（注意泛后缀） | 中 |
| `DOMAIN-KEYWORD` | 子串包含 | 否 | 中（线性扫描） | 40–60 | 广告、统计、埋点 | 中高 | 低 |
| `IP-CIDR` | 目标 IP 段 | 默认会 | 低 | 60–80 | 内网、公司 VPN 段 | 中（CDN 漂移） | 中 |
| `IP-CIDR,no-resolve` | 目标 IP 段 | 否 | 低 | 60–80 | 内网直连、局域网 | 低 | 中 |
| `GEOIP` | IP 归属地 | 是 | 中 | 85–95 | 国内直连兜底 | 高 | 低 |
| `GEOSITE` | 内置域名集 | 否 | 低 | 25–45 | 大厂域名分组 | 中 | 极低 |
| `PROCESS-NAME` | 进程名 | 否 | 中 | 5–15 | 分应用代理 | 低 | 中 |
| `RULE-SET` | 远程规则集 | 否 | 中 | 30–70 | 订阅式统一维护 | 中 | 极低 |
| `MATCH` / `FINAL` | 全部剩余 | 否 | — | 9999（恒定末位） | 兜底策略 | — | — |

**读表要点**：

- "建议排序区间"是经验值，不是硬性规定。核心原则是**越精确、越不易误伤的规则越靠前**。
- `MATCH` 必须且在最后，它是兜底。写成"黑名单"就指向 `DIRECT`，写成"白名单"就指向你的主力策略组。
- `PROCESS-NAME` 排在极前的原因很直接：这是**用户意图最明确**的判据，优先级天然高于按域名猜。

---

## 四、细分人群与场景选型

### 4.1 纯小白：只刷网页、看视频

别碰 `GEOIP`，别自己造规则。直接使用订阅商提供的规则集，最多补两条：

- 公司/学校内网域名 → `DOMAIN-SUFFIX,内网域名,DIRECT`
- 某个总走直连的境外站 → `DOMAIN-SUFFIX,xxx.com,PROXY`

### 4.2 办公党：公司内网 + 远程桌面

这是最容易翻车的场景。核心诉求是**内网域名绝对不能走代理**，否则会出现"打开 OA 白屏、远程桌面连不上"：

```yaml
rules:
  - DOMAIN-SUFFIX,corp.example.com,DIRECT
  - DOMAIN-SUFFIX,internal,DIRECT
  - IP-CIDR,10.0.0.0/8,DIRECT,no-resolve
  - IP-CIDR,172.16.0.0/12,DIRECT,no-resolve
  - IP-CIDR,192.168.0.0/16,DIRECT,no-resolve
```

### 4.3 跨境从业者：多账号、多地区

诉求是"同一浏览器不同 Profile 走不同地区出口"。建议用**策略组 + 域名规则**绑定，而不是靠 IP 规则：

- `DOMAIN-SUFFIX,后台域名,US-Group`
- 配合 `PROCESS-NAME` 锁定到具体浏览器进程

### 4.4 开发者：GitHub / npm / Docker / PyPI

最省心的做法不是逐条加规则，而是**代理兜底 + 国内镜像双保险**：

```yaml
rules:
  - DOMAIN-SUFFIX,github.com,PROXY
  - DOMAIN-SUFFIX,githubusercontent.com,PROXY
  - DOMAIN-SUFFIX,npmjs.org,PROXY
  - DOMAIN-SUFFIX,pypi.org,PROXY
  - DOMAIN-SUFFIX,docker.io,PROXY
  - DOMAIN-SUFFIX,docker.com,PROXY
```

注意：`docker.io` 的镜像拉取走的是 `registry-1.docker.io` 与大量 CDN 域名，仅加一条往往不够，建议直接搜社区维护的 `dev` 规则集。

### 4.5 流媒体党

- 境外流媒体：走代理，且尽量用**标注了流媒体解锁能力的节点**。
- 国内视频（B 站、爱奇艺）：走直连，否则会触发"仅限中国大陆"限制。

<div style="margin: 1.5rem 0; padding: 1.2rem; background: var(--vp-c-bg-alt); border: 1.5px dashed var(--vp-c-brand-1); border-radius: 10px;">
  <strong>💡 👑 2026 全网综合第一主推 · 【光速云】读者专享特惠通道：</strong><br>
  <span style="font-size: 0.92rem; color: var(--vp-c-text-2); display: inline-block; margin: 6px 0;">IEPL 企业级内网专线 + 全球IPLC，单节点最高 2.5Gbps，全节点 x1 无倍率，原生解锁 ChatGPT / Claude / Netflix 全区：</span>
  <div style="margin: 8px 0;">
    <CopyCoupon code="AMM" discount="8折立减" url="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y" brandName="光速云" tip="点击复制专属优惠码并直达官网" />
  </div>
  <div style="font-size: 0.85rem; margin-top: 6px;">
    👉 <a href="/reviews/guangsucloud/">查看【光速云】实验室 2026 最新测速报告与深度评测 →</a>
  </div>
</div>

> **为什么在分流文章里提节点？** 因为分流做得再精细，出口节点如果超售严重，分流也只是把拥堵从 A 路换到 B 路。选型与调优是两件事，不能互相替代。

---

## 五、分客户端实操：写法差异与高频踩坑

### 5.1 mihomo / Clash Verge Rev

```yaml
rules:
  - PROCESS-NAME,Telegram.exe,PROXY
  - DOMAIN-SUFFIX,mycompany.cn,DIRECT
  - DOMAIN-SUFFIX,example-private.com,DIRECT
  - DOMAIN-SUFFIX,openai.com,AI-Group
  - GEOSITE,category-ads-all,REJECT
  - GEOIP,CN,DIRECT
  - MATCH,PROXY
```

**坑位**：`GEOIP,CN,DIRECT` 必须在所有域名规则之后。另外 `GEOIP` 会触发 DNS 解析，在纯 IP 流量多的情况下会拖慢首包。

### 5.2 sing-box

sing-box 用的是 `route.rules` 数组 + `rule_set`，语义接近但字段名不同：

```json
{
  "route": {
    "rules": [
      { "domain_suffix": ["internal", "corp.example.com"], "outbound": "direct" },
      { "ip_cidr": ["10.0.0.0/8"], "outbound": "direct" },
      { "rule_set": "geosite-cn", "outbound": "direct" }
    ],
    "final": "proxy"
  }
}
```

**坑位**：sing-box 1.11 之后 `geoip` / `geosite` 字段被精简，需要改用 `rule_set` 远程引用，老教程直接抄会报错。

### 5.3 Surge

Surge 用 `RULE-SET` 加模块化配置，支持 `AND` / `OR` / `NOT` 组合：

```
RULE-SET,SYSTEM,DIRECT
DOMAIN-SUFFIX,internal,DIRECT
FINAL,Proxy
```

**坑位**：Surge 的 `SYSTEM` 规则集会兜住大量本地服务，务必放在域名规则之前。

### 5.4 Quantumult X

分区文件 `filter_local` / `filter_remote`，语法是 `host-suffix` / `ip-cidr`：

```
host-suffix, internal, direct
host-suffix, corp.example.com, direct
ip-cidr, 10.0.0.0/8, direct
```

**坑位**：QX 的 `ip-cidr` 默认不带 `no-resolve` 语义，内网场景建议写 `ip-cidr, 10.0.0.0/8, direct, no-resolve`。

### 5.5 Shadowrocket

配置段写在 `[Rule]` 下，语法与 Clash 接近但大小写和别名不完全一致，`DOMAIN-SUFFIX` 需写成 `DOMAIN-SUFFIX`，而 `IP-CIDR` 的 `no-resolve` 支持良好。**坑位**：Shadowrocket 的规则条数超过约 3000 条后加载速度明显下降，建议改用 `RULE-SET` 远程引用。

---

## 六、抓包排障诊断手册

规则写完没生效，别猜，按下面的顺序打命令。

### 6.1 第一步：确认域名解析路径

```bash
# 看内核是否按你的 nameserver-policy 解析
dig +short api.example.com

# 对比公共 DNS 解析结果，判断是否存在污染/CDN 差异
dig +short api.example.com @1.1.1.1
nslookup api.example.com 223.5.5.5
```

### 6.2 第二步：确认流量走向

```bash
# 对比直连与经代理的延迟、丢包、路由跳数
mtr -rwzc 50 api.example.com

# 强制指定 IP 验证是否被分流正确
curl -v --resolve api.example.com:443:203.0.113.10 https://api.example.com/

# 只看握手耗时与首字节，定位是 DNS 慢还是链路慢
curl -s -o /dev/null -w "dns:%{time_namelookup} conn:%{time_connect} tls:%{time_appconnect} ttfb:%{time_starttransfer}\n" https://api.example.com/
```

```bash
# 端口连通性（Windows 可用 tcping.exe）
tcping -t 5 api.example.com 443
```

### 6.3 第三步：查看内核实时连接表

mihomo 的外部控制器打开后：

```bash
curl -s http://127.0.0.1:9090/connections | head -c 2000
```

看到每条连接的 `rule` 与 `rulePayload` 字段，就能直接确认**命中了��条规则**——这是排查分流问题最有效的单一手段。

### 6.4 第四步：确认本机监听与端口占用

```bash
# macOS / Linux
lsof -i :7890
ss -tunp | grep 443

# Windows
netstat -ano | findstr :7890
```

### 6.5 判定表

| 现象 | 高概率原因 | 验证方式 | 处置 |
| --- | --- | --- | --- |
| 目标站走直连 | `GEOIP,CN` 位置过前 | 查 `/connections` 的 `rule` 字段 | 把 `GEOIP` 下移 |
| 内网域名打不开 | 被公共 DNS 解析 | `dig` + 对比内网 DNS | 加 `DOMAIN-SUFFIX,...,DIRECT` |
| 改了规则不生效 | 连接复用未断开 | 关闭应用重连 | 重启内核 + 断开会话 |
| 延迟忽高忽低 | CDN/Anycast 漂移 | 多次 `mtr` 对比 | 改域名规则，弃用 IP 规则 |
| 部分应用完全没走代理 | 应用硬编码 DoH | 抓包看解析目标 | 关闭应用内"安全 DNS" |
| 首包特别慢 | `GEOIP` 触发同步解析 | `curl` 看 `time_namelookup` | 加 `no-resolve` 或前置域名规则 |
| 规则集失效 | 远程订阅拉取失败 | 日志搜 `rule-set` | 换可达的规则集地址 |

---

## 七、行业常见避坑矩阵

| 宣传话术 | 真实含义 | 如何验证 | 风险等级 |
| --- | --- | --- | --- |
| "AI 智能分流，无需配置" | 大概率是 `GEOIP,CN` 一刀切 | 访问境内 CDN 的境外站测速 | 中 |
| "原生 IP 全解锁" | 可能只是 DNS 解锁或共享 IP | 多设备并发登录同一流媒体 | 高 |
| "不限速不限量" | 通常有隐性 QoS 或并发连接数限制 | 高峰时段多线程测速 | 高 |
| "专线直连" | 可能只是普通 BGP 中转 | `mtr` 看跳数与 AS 路径 | 中 |
| "规则自动更新" | 可能更新频率极低或缺维护 | 查规则集 GitHub 提交记录 | 中 |
| "一条规则解决所有问题" | 不存在，分流是持续维护过程 | 自查 `/connections` | 低 |

**通用原则**：任何"零维护"的分流方案都要打问号。分流本质是一个**持续迭代的黑名单/白名单维护工程**，不是一次配置就永久生效的开关。

---

## 八、常见问题排障 FAQ

**Q1：我加了 `DOMAIN-SUFFIX,example.com,DIRECT`，但访问 `www.example.com` 还是走代理？**
先确认规则写在内核真正加载的那份配置里（很多客户端有"配置覆盖"机制，UI 里改的被订阅覆盖了）。其次检查 `example.com` 是否同时匹配了更靠前的 `GEOSITE` 或 `RULE-SET`——first-match 会优先命中前面的规则。

**Q2：`IP-CIDR` 规则加了 `no-resolve` 之后失效了，为什么？**
`no-resolve` 的语义是"如果目标在连接建立阶段已经是 IP 而不需要解析，就直接匹配；如果需要解析，则跳过这条规则"。也就是说，**它不会主动解析域名去匹配**。如果你的目标本身是域名，就只能靠域名规则。

**Q3：黑白名单到底该怎么选？**
看你日常访问的构成。境外为主 → 白名单（兜底走代理）；国内为主 → 黑名单（兜底直连）。混合型用户建议用成熟规则集，而不是自己拍脑袋定。

**Q4：为什么 `DOMAIN-KEYWORD` 这么危险？**
因为它做的是子串匹配。`DOMAIN-KEYWORD,ai` 会把 `taian.com`、`waicai.cn` 这类完全无关的域名一起命中。除非是广告拦截这种"宁可错杀"的场景，否则别用。

**Q5：改了规则，测速变快了但实际网页打开更慢，怎么回事？**
很可能你把某些走国内 CDN 的境外服务误判成直连了。直连快的是 `ping`，但真实的 TLS 握手和回源路径可能很差。用 `curl` 看 `time_appconnect` 而不是看 `ping`。

**Q6：规则条数太多会不会影响性能？**
会。经验上，`DOMAIN` / `DOMAIN-SUFFIX` 在几千条量级下几乎无感知（前缀树 + 哈希），但 `DOMAIN-KEYWORD` 超过几百条就会出现明显线性扫描开销。超过 5000 条建议全部改为 `RULE-SET`。

**Q7：需要给私有域名做 DNS 分离吗？**
需要。内网域名建议在 `nameserver-policy` 里单独指定内网 DNS，否则会出现"域名规则写对了，但解析到了公网地址"的诡异现象。

---

## 九、延伸阅读内链矩阵

| 主题 | 推荐阅读 |
| --- | --- |
| 分流与规则整体入门 | [/tutorial/](/tutorial/) |
| 配置目录与文件结构 | [/tutorial/usage/config/](/tutorial/usage/) |
| 客户端安装与初始化 | [/tutorial/usage/](/tutorial/usage/) |
| 底层协议与链路原理 | [/tech/](/tech/) |
| 按场景选型的完整方案 | [/scenario/](/scenario/) |
| 测速与延迟判读方法 | [/help/](/help/) |
| 排障与常见故障处理 | [/help/](/help/) |
|