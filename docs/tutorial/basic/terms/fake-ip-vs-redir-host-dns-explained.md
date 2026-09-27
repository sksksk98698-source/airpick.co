---
title: Fake-IP 与 Redir-Host 模式通俗讲解：Clash 核心的两种 DNS 解析哲学 - AirPick
description: 本文系统化讲解 Fake-IP 与 Redir-Host 区别及 Clash DNS 模式选择、Fake-IP 秒开网页原理、避免 DNS 污染机制、198.18 虚拟 IP 网段，为新手到进阶技术用户提供 2026 年最新实操指引、底层认知与对比评测 · airpick.co
head:
  - - meta
    - name: keywords
      content: Fake-IP与Redir-Host区别, Clash DNS模式选择, Fake-IP秒开网页原理, 避免DNS污染机制, 198.18虚拟IP网段
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Fake-IP 与 Redir-Host 模式通俗讲解：Clash 核心的两种 DNS 解析哲学
  - - meta
    - property: og:description
      content: 从 198.18.0.0/16 虚拟网段到 enhanced-mode 配置细节，彻底讲清 Clash 两种 DNS 模式的底层机理、性能差异、实测数据与选型策略。
  - - meta
    - name: twitter:card
      content: summary_large_image
---

# Fake-IP 与 Redir-Host 模式通俗讲解：Clash 核心的两种 DNS 解析哲学

> **一句话结论**：如果你用的是 2026 年仍在维护的 Clash.Meta / mihomo / sing-box 内核，**默认就该开 Fake-IP**；Redir-Host 只在少数「必须拿到真实 IP 才能工作」的历史场景里还有存在价值。两者不是「哪个更好」的问题，而是「DNS 解析发生在链路哪一环」的哲学分歧。

这篇文章会从 RFC 网段定义讲到 `enhanced-mode` 的每一行配置，中间夹一张 10 项量化对比矩阵、一套可复制的抓包排障命令，以及一张识别虚假宣传的避坑表。看完你至少能自己判断：我的配置到底有没有生效，以及为什么某些网站会打不开。

---

## 一、TL;DR：三分钟建立正确认知

先给不想读长文的读者一个可直接落地的判断框架：

| 你的情况 | 建议模式 | 理由 |
| --- | --- | --- |
| 日常网页、社交、流媒体、AI 站点 | **Fake-IP** | 免疫 DNS 污染，首屏少一次 DNS RTT |
| 需要访问 NAS、打印机、路由器后台 | Fake-IP + `fake-ip-filter` 白名单 | 内网域名必须真实解析 |
| 跑 PT / BT 做种，需要真实 peer IP | Redir-Host 或 Fake-IP + 进程分流 | 部分客户端对虚拟 IP 处理异常 |
| 玩需要反作弊的游戏 | Redir-Host 通常更稳 | 反作弊会校验连接目标的一致性 |
| 用 TUN 模式接管全局流量 | Fake-IP（几乎唯一合理选择） | TUN 场景下 Redir-Host 的 IP 反查极易失效 |
| 老旧客户端只暴露 SOCKS5 且不支持域名直传 | Redir-Host | 客户端会自己解析，Fake-IP 反而错乱 |

记住一句话：**Fake-IP 把「解析」推迟到最后一刻，Redir-Host 把「解析」提前到最开始**。所有性能差异、兼容性差异、排障差异，都从这句话推导出来。

---

## 二、先搞清楚：DNS 解析到底发生在链路的哪一环

大多数人理解不了这两个模式，是因为跳过了一个前置问题：**在代理链路里，"域名" 和 "IP" 是谁在什么时候被使用的？**

一条典型的 HTTPS 请求，逻辑上分两段：

1. **解析段**：把 `www.example.com` 翻译成 `93.184.216.34`（或任意 CDN 边缘 IP）
2. **连接段**：向这个 IP 的 443 端口发起 TCP 握手，随后 TLS 握手里携带 SNI 域名

问题在于：**现代代理协议（Trojan、VLESS、Hysteria2、Shadowsocks）在传给远端节点时，既可以传域名，也可以传 IP。** 传什么，取决于本地内核在拦截连接的那一刻，手里握有什么信息。

- 如果内核手里只有域名 → 它可以传域名，让**落地节点自己去做 DNS 解析**。这是最优解：解析发生在离目标最近的地方，CDN 会返回最贴近节点的边缘 IP，流媒体解锁判定也会更准。
- 如果内核手里只有 IP → 它只能传 IP，落地节点无从判断这是哪个域名，规则匹配退化成 IP 规则，CDN 就近调度完全失效。

**Fake-IP 和 Redir-Host 的全部分歧，就是「内核在拦截连接时，手里握着域名还是 IP」。**

---

## 三、Redir-Host 模式：先解析，后转发

Redir-Host 是 Clash 早期的默认形态，名字来自 iptables 的 `REDIRECT` + `--to-ports` 透明代理。它的时序是这样：

```
浏览器 DNS 查询 example.com
    ↓
Clash 向 upstream DNS 发起真实查询（走 nameserver / fallback）
    ↓
拿到真实 IP 93.184.216.34，写入 host-IP 映射表
    ↓
把 93.184.216.34 返回给浏览器
    ↓
浏览器连接 93.184.216.34:443
    ↓
Clash 拦截连接，用 IP 反查映射表 → 得到 example.com
    ↓
匹配规则 → 走代理，把域名（或 IP）交给节点
```

看起来也没问题，对吧？问题出在三个地方：

**第一，DNS 查询本身可能被污染。** 如果你用的是明文 UDP 53，查询 `example.com` 的过程中，中间链路设备可以直接回一个伪造响应。Clash 会把伪造 IP 写进映射表，然后浏览器连上这个假 IP，Clash 反查出来的"域名"其实是错的——因为 IP 本身就是错的。**污染发生在解析阶段，后面所有环节全都跟着错。**

**第二，IP 反查存在多对一歧义。** 一个 CDN 边缘 IP 上可能挂着上万个域名。映射表里 `93.184.216.34` 同时对应 `a.example.com` 和 `b.example.com`，谁后写入谁覆盖。当浏览器连过来时，内核只能"猜"是哪一个。这就是为什么 Redir-Host 时代经常出现「规则明明写对了，却分流错了」。

**第三，多一次同步阻塞。** 每次冷解析都要等上游 DNS 返回（公网递归通常 20–120ms，跨境明文更慢），这段时间浏览器是干等的。虽然有 DNS 缓存，但首次访问和缓存过期后的访问都会吃这个延迟。

Redir-Host 唯一的优势是**可观测性好**：日志里看到的 IP 就是真实 IP，`mtr` 可以直接对目标做路径分析，抓包也直观。这也是它至今在部分排障场景下仍被推荐的原因。

---

## 四、Fake-IP 模式：先劫持，后解析

Fake-IP 的思路完全是反过来的：**我不去问真实 IP 了，我直接编一个给你。**

```
浏览器 DNS 查询 example.com
    ↓
Clash 直接从 IP 池分配一个虚拟地址，例如 198.18.0.7
（映射：198.18.0.7 → example.com）
    ↓
立即返回 198.18.0.7 —— 没有网络请求，耗时接近 0
    ↓
浏览器连接 198.18.0.7:443
    ↓
Clash 拦截，反查映射表 → 得到域名 example.com
    ↓
规则匹配（基于域名，精确）
    ↓
命中代理 → 传域名给节点，由节点侧解析
命中直连 → 此刻才发起真实 DNS 查询，拿到真实 IP 后连接
```

### 为什么是 198.18.0.0/16？

这个网段来自 **RFC 2544（网络互连设备基准测试方法）**，被 IANA 划定为保留的 benchmark 测试地址段（实际保留范围是 198.18.0.0/15）。它的关键特性是：**永远不会出现在公网路由表里**。所以你不可能访问到一个"真实存在的 198.18.x.x 服务器"，用它做虚拟 IP 池，冲突概率为零。

Clash 家族默认 `fake-ip-range: 198.18.0.1/16`，可容纳约 6.5 万个虚拟地址，对个人用户绰绰有余。IPv6 场景下 Clash.Meta 默认使用 `fc00::/18`，同样是 ULA（唯一本地地址）保留段。

### 收益一：DNS 零延迟

对**走代理的域名**，Fake-IP 从头到尾**没有发起过一次真实 DNS 查询**。省下的不只是一次 RTT，而是整条「查询 → 等待 → 缓存」链路。在冷启动、无缓存、跨境 DNS 的场景下，这个差距能到 **50–300ms**——这就是常说"Fake-IP 秒开"的物理来源。它不是网络变快了，而是**少做了一件本来就不需要做的事**。

### 收益二：彻底免疫 DNS 污染

污染攻击的前提是"存在一个可被劫持的 DNS 响应"。Fake-IP 模式下，被代理域名压根不发真实查询，攻击面直接归零。你不需要配置什么 DoH、DoT、fallback-filter，因为**根本没有明文查询发出去**。

### 收益三：规则匹配基于域名，精确且稳定

域名规则（`DOMAIN-SUFFIX`、`DOMAIN-KEYWORD`、`GEOSITE`）的匹配精度远高于 IP 规则（`GEOIP`、`IP-CIDR`）。Fake-IP 让内核在规则匹配时始终持有域名，`GEOSITE` 分流方案才能发挥全部威力。

### 收益四：CDN 就近调度交给落地节点

这是最容易被忽略、但对流媒体体验影响最大的一点。Fake-IP 把域名原样交给落地节点，**解析由节点所在网络完成**——CDN 会返回离节点最近的边缘服务器。而 Redir-Host 是本地解析出来的 IP 再传给节点，可能出现"人在东京，但拿到了洛杉矶边缘节点"的窘境，实测首字节延迟能差 100ms 以上。

### 代价：这些域名必须加白名单

Fake-IP 不是没有代价的。以下类型必须放进 `fake-ip-filter`，否则会出问题：

- 内网域名：`*.lan`、`*.local`、`*.home.arpa`、你 NAS 的自定义域名
- 使用自建 DNS 的国产 App：微信、QQ、部分银行 App 会绕过系统 DNS 做 DoH
- 时间同步：`time.*.com`、`ntp.*`
- 游戏 / 语音的 STUN 服务：`+.stun.*.*`���`+.stun.*.*.*`
- 局域网设备发现：mDNS、SSDP、DLNA 相关域名

---

## 五、核心参数对比矩阵（10 项量化指标）

| 对比维度 | Fake-IP | Redir-Host | 备注 |
| --- | --- | --- | --- |
| DNS 解析时机 | 连接建立时（懒解析） | 查询发起时（预解析） | 决定其他所有差异 |
| 首次冷启动 DNS 延迟 | `0–2ms`（本地分配） | `20–120ms`（公网递归） | 跨境明文可达 300ms+ |
| DNS 污染抵抗能力 | 完全免疫（被代理域名无查询） | 依赖 DoH/DoT/fallback 配置 | 明文 53 必被污染 |
| 规则匹配维度 | 域名优先（精确） | IP 为主，域名靠反查（有歧义） | GEOSITE 分流强依赖此项 |
| CDN 就近调度准确度 | 高（节点侧解析） | 中（本地解析后传 IP） | 流媒体体验差异明显 |
| 内网 / 局域网兼容性 | 差（需 filter 白名单） | 好（天然真实解析） | 家庭用户注意 |
| 内存占用 | 约 `80–120 字节`/映射，万条域名约 `1MB` | 约 `60–100 字节`/映射 | 差异可忽略 |
| 排障可观测性 | 中（日志需开 `log-level: debug`） | 高（IP 直读、mtr 直接可用） | 排障场景 Redir-Host 更友好 |
| PT / BT 兼容性 | 中（需进程分流或过滤） | 好 | 部分客户端不识别虚拟 IP |
| 支持内核 | Clash、Clash.Meta、mihomo、sing-box | Clash 系（Meta 仍保留） | sing-box 中对应 `fakeip` / `dns` |

---

## 六、按人群与场景选型

**轻度用户（网页 + 社交 + AI 工具 + 学术搜索）**：无脑选 Fake-IP。你的流量 90% 以上是同几个域名，Fake-IP 的缓存命中率和首屏收益最大，且完全不用操心污染问题。

**流媒体重度用户**：必须 Fake-IP。CDN 就近调度和 IP 归属判定都依赖节点侧解析，这是能不能稳定解锁的底层前提之一。

**开发者 / 运维**：Fake-IP + 严格的 `fake-ip-filter`。把你所有的 `*.dev.internal`、`*.test`、Docker 网段、K8s Service 域名全部加进去。

**PT / BT 做种用户**：建议 Redir-Host，或者 Fake-IP + `PROCESS-NAME` 把下载器单独分流到 DIRECT/独立策略组。虚拟 IP 会让 peer 连接信息完全不可读。

**游戏玩家**：优先 Redir-Host。反作弊系统会校验连接的物理一致性，虚拟 IP 有可能被识别为异常。

选型定下来之后，剩下的变量就是节点质量了。Fake-IP 能帮你省掉 DNS 的麻烦，但它救不了一条本身就不稳的线路——线路质量决定延迟下限，DNS 模式只是在那个下限之上做优化。

<div style="margin: 1.5rem 0; padding: 1.2rem; background: var(--vp-c-bg-alt); border: 1.5px dashed var(--vp-c-brand-1); border-radius: 10px;">
  <strong>💡 🥉 2026 轻度高性价比 · 【微风网络】读者专享特惠通道：</strong><br>
  <span style="font-size: 0.92rem; color: var(--vp-c-text-2); display: inline-block; margin: 6px 0;">IEPL 专线，年付折合 7 元/月，50GB/月起步，小流量用户首选，网页社交与学术搜索极速流畅：</span>
  <div style="margin: 8px 0;">
    <CopyCoupon code="wf888" discount="特惠专享" url="https://weifeng.link/#/register?code=wY5j3B71" brandName="微风网络" tip="点击复制优惠码" />
  </div>
</div>
