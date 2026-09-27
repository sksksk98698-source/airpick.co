---
title: 分流规则选错导致全走直连：为什么你开着代理却依然上不去 Google - AirPick
description: 分流规则错误导致全直连、模式选成了 DIRECT、Google 被规则判定走直连——本文从 Clash / sing-box 内核的规则匹配顺序、DNS fake-ip 污染链路讲起，给出 Global/Rule/Direct 三态量化对比矩阵、分平台实操修复步骤、mtr/curl/tcping 抓包诊断手册与 2026 最新避坑维权指南 · airpick.co
head:
  - - meta
    - name: keywords
      content: 分流规则错误导致全直连, 模式选成了DIRECT, 全局与规则模式区别, Google被规则判定走直连, 切换为Rule或Global
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: 分流规则选错导致全走直连：为什么你开着代理却依然上不去 Google
  - - meta
    - property: og:description
      content: 代理开着却上不去 Google？九成不是节点挂了，而是模式或规则把流量判进了 DIRECT。附完整排障命令表与三态对比矩阵。
---

# 分流规则选错导致全走直连：为什么你开着代理却依然上不去 Google

> 一句话结论：**代理软件的"开关"是假的，"流量到底从哪块网卡出去"才是真的。** 当你把模式选成 DIRECT，或者在 Rule 模式下让一条错误的规则先命中了 `google.com`，客户端会非常"诚实"地把请求交给本地运营商——节点一个字节都没跑，测速面板却显示一切正常。

---

## 一、TL;DR：三分钟自查结论表

先给结论，再讲原理。你在客户端里逐条核对：

| 现象 | 最可能的真实原因 | 立即动作 |
| --- | --- | --- |
| Google / YouTube 全部打不开，但"延迟测试"全绿 | 模式被选成了 DIRECT（直连） | 切到 Rule，或临时切 Global 验证 |
| Google 打不开，国内站也正常，Twitter 却能用 | 规则集里 `google.com` 被前置的 DIRECT 规则拦截 | 调整规则顺序，把代理规则放在 CN 直连之前 |
| 全局模式正常，切回 Rule 立刻断 | 订阅自带的规则集过期 / 域名被误分类 | 更新订阅或换用 meta 内核规则集 |
| 桌面端正常，手机端全直连 | 手机端只开了"系统代理"未开 TUN/VPN 模式 | 打开 TUN 模式或 VPN 开关 |
| 浏览器插件里能上，其他软件全不行 | SwitchyOmega 类插件覆盖了系统代理，仅对浏览器生效 | 检查插件切换规则，或直接关掉插件 |
| 一切配置都对，就是慢 + 打不开 | DNS 被污染，解析出国内 IP 触发 GEOIP,CN,DIRECT | 开启 fake-ip 并强制代理侧 DNS |

如果你只想解决当下的问题：**打开客户端 → 找到"模式/代理模式"下拉框 → 从 DIRECT 改成 Rule；如果 Rule 仍不行，临时切 Global 验证是"链路问题"还是"规则问题"。** 这一步能区分 90% 的故障归属。

<div style="margin: 1.5rem 0; padding: 1.2rem; background: var(--vp-c-bg-alt); border: 1.5px dashed var(--vp-c-brand-1); border-radius: 10px;">
  <strong>💡 ⭐ 2026 均衡专线首选 · 【暮光加速】读者专享特惠通道：</strong><br>
  <span style="font-size: 0.92rem; color: var(--vp-c-text-2); display: inline-block; margin: 6px 0;">20 元 120GB 黄金流量档，全线 VLESS + IEPL 专线，长连接稳定不掉线：</span>
  <div style="margin: 8px 0;">
    <CopyCoupon code="muguang5555" discount="新人特惠" url="https://varnexa.twilightaff.com/#/?code=D1LHglg3" brandName="暮光加速" tip="点击复制专属优惠码并直达官网" />
  </div>
  <div style="font-size: 0.85rem; margin-top: 6px;">
    👉 <a href="/reviews/twilight/">查看【暮光加速】实验室 2026 最新测速报告与深度评测 →</a>
  </div>
</div>

---

## 二、底层机理：流量到底在哪一层被"改道"了

要理解这个故障，先要接受一个反直觉的事实：**代理客户端并不是 VPN 的"闸门"，它只是一个本地 SOCKS/HTTP 监听器 + 一张路由表。**

### 2.1 四种接管层级，越往下越可靠

1. **应用内代理（浏览器插件 / Telegram 自带代理设置）**：最上层，只影响单个 App。SwitchyOmega 的"自动切换"规则一旦把 `google.com` 归到"直接连接"，Chrome 就会绕过系统代理。
2. **系统代理（Windows 的 `Internet Settings` / macOS 的 `scutil --proxy`）**：只对"尊重系统代理设置"的程序生效。大量游戏、终端工具、部分 Electron 应用直接无视它。
3. **TUN / 虚拟网卡模式**：在内核路由层接管，全流量劫持，是 Clash.Meta、sing-box 目前最稳的方案。
4. **模式与规则引擎**：这是本文的主角——**它在接管层级之上，决定"被接管的流量到底发给谁"**。

也就是说：TUN 开了、系统代理设了，流量已经送到客户端手里，客户端仍然可以礼貌地把它们全部原路退回给本地网卡。这就是 DIRECT。

### 2.2 Rule 模式下的匹配顺序：第一条命中即终止

Clash 系内核（Clash、Clash.Meta、Mihomo）的规则匹配是**自上而下、首条命中即返回**，不存在"权重"或"综合评分"。典型订阅规则结构：

```yaml
rules:
  - DOMAIN-SUFFIX,google.com,PROXY     # A
  - DOMAIN-SUFFIX,googleapis.com,PROXY
  - RULE-SET,cn-domains,DIRECT          # B
  - GEOIP,CN,DIRECT                     # C
  - MATCH,PROXY                         # D
```

故障就藏在这四条里：

- **B 或 C 被提到了 A 前面** → `google.com` 先被 CN 规则集捕获，判直连。
- **规则集内容错误**：某些来路不明的 `cn-domains` 列表把 `googleapis.com`、`gstatic.com` 也塞了进去（因为国内有 CDN 节点），于是 Google 的静态资源全直连，页面卡在白屏。
- **C 的 GEOIP 判定**：如果 DNS 查询被污染，`google.com` 解析出一个国内 IP，即便 A 没命中，C 也会把它判成直连。
- **D 被写成了 `MATCH,DIRECT`**：兜底规则直连。这是新手手改配置时最常见的"自杀式"操作。

### 2.3 DNS、fake-ip 与污染的连锁反应

**DNS 是分流的隐形前提。** 三种常见 DNS 策略：

- `redir-host` + 本地 DNS：解析结果暴露给系统，污染直接影响路由判定。
- `fake-ip`：客户端返回 `198.18.0.0/16` 段假 IP，由规则域名决定走代理后再做远端解析。**这是 2026 年的主流做法**，能同时规避污染和 DNS 泄漏。
- `fake-ip + dns-hijack any:53`：TUN 模式下最完整的组合，但要求规则集完备，否则连国内 App 都可能解析异常。

一个高频悖论：**你开了 fake-ip，却把 `enhanced-mode` 和 `nameserver` 都指向了运营商 DNS。** 结果域名规则命中代理没错，但远端解析走了污染 DNS，依然拿不到可用 IP。

### 2.4 链路层：为什么"节点没问题"不等于"你能上网"

当你确认模式与规则无误后，才轮到物理链路。2026 年主流中转方案的分层是：

- **IPLC / IEPL 专线**：物理层独享，不过公网出口，晚高峰抖动通常在个位数毫秒级。
- **BGP 中转**：走公网但优化路由，成本适中，受跨境出口 QoS 影响。
- **直连（CN2 GIA / 9929 等）**：依赖运营商国际出口，晚高峰丢包可达 `> 20%`。
- **协议层**：VLESS + Reality / XTLS-Vision 是目前抗 SNI 阻断与抗 QoS 的均衡解；BBRv3 拥塞控制对高丢包链路的长连接恢复有明显帮助。

但请记住本文的核心判断：**如果 mtr 到节点显示 0 丢包、握手正常，而 Google 依然不通，那 99% 不是链路问题，是规则问题。**

---

## 三、核心参数对比矩阵：Global / Rule / Direct 三态量化

| 维度 | Global（全局） | Rule（规则） | Direct（直连） |
| --- | --- | --- | --- |
| 流量走向 | 全部走代理节点 | 按规则逐条匹配 | 全部走本地网卡 |
| Google 可达性 | ✅ 必然可达（链路正常时） | ✅ 可达（规则正确时） | ❌ 必然不可达 |
| 国内网站速度 | 慢，绕行海外再回国 | 快，命中 CN 规则直连 | 最快（原生链路） |
| DNS 处理 | 代理侧远端解析 | 依 fake-ip / 分流 DNS 策略 | 本地运营商 DNS，易污染 |
| UDP 转发 | 全量转发，易被限速 | 按规则，BT/游戏可单独放行 | 不转发，QUIC 直连 |
| 典型延迟增幅 | +80~250ms（视落地） | 0~150ms（按站点） | 0ms |
| 带宽占用 | 最高，易触发机场限速风控 | 中等 | 0 |
| 配置复杂度 | 极低（一键切换） | 高（依赖规则集质量） | 无 |
| 适用人群 | 排障验证、纯海外办公 | 90% 日常用户（推荐） | 仅国内访问 / 临时关闭代理 |
| 常见误用 | 长期开启导致国内 App 卡顿 | 规则集过期未更新 | **被误当成"关闭代理"的默认态** |

**排障黄金法则：用 Global 验证链路，用 Rule 验证规则，用 Direct 验证本地网络。** 三者交叉，故障归属立刻清晰。

---

## 四、细分人群与场景选型推荐

**① 跨境办公 / 研发（GitHub、Google Workspace、AWS 控制台）**
必须用 Rule 模式，且规则集需包含 `DOMAIN-KEYWORD,googleapis`。推荐叠加 `GEOIP,CN,DIRECT` 仅作兜底。不要用 Global——你的钉钉、飞书、内部 OA 会被绕到海外，握手延迟直接毁掉视频会议。

**② 流媒体重度用户（YouTube 4K、Netflix、Disney+）**
Rule 模式 + 流媒体规则集。注意：流媒体解锁依赖落地 IP 的"住宅属性"，与模式无关。切 Global 不会让你解锁多一个区，反而可能因为 IP 段被标记导致风控。

**③ 手游 / 主机加速**
需要 UDP 转发与低抖动，Rule 模式下务必确认目标平台域名（如 `steamcommunity.com`、游戏登录域）在代理规则内。DIRECT 模式下加速器形同虚设。

**④ 出海电商 / 多账号运营**
每个账号绑定独立落地，Rule 模式下建议用 `PROCESS-NAME` 或分流组做进程级隔离，避免一个浏览器窗口的规则错误污染全部账号环境。

**⑤ 纯国内用户偶尔出海**
最容易被本文主题坑到的人群。装完客户端默认模式常常是 DIRECT 或"绕过大陆"，切到 Google 永远转圈。**记住：装完第一件事就是确认模式为 Rule。**

---

## 五、分客户端实操配置与深度避坑

### 5.1 Clash Verge Rev / Mihomo（Windows、macOS、Linux）

1. 左侧「设置」→ 找到 **模式（Mode）**，确认不是 `Direct`。
2. 「代理」页 → 选好节点组，不要停在 `DIRECT` 这一项上——**这是最隐蔽的一种"全直连"**：模式是 Rule，但节点组被手动选成了 DIRECT。
3. 「设置」→ 打开 **TUN 模式**（Windows 需先安装 Service Mode / wintun 驱动）。
4. 检查 DNS 段是否启用 `fake-ip`，`nameserver` 不要填运营商地址。
5. 打开「日志」页，访问 Google，看是否有 `[TCP] ... --> google.com match DomainSuffix(google.com) using PROXY`。**没有这一行，就是规则没命中。**

### 5.2 sing-box / Karing / Hiddify

配置中 `route.rules` 与 `route.final` 决定兜底行为。**`final` 必须是代理出站，不能是 `direct`。** 若使用 GUI，检查「路由模式」是否为 `规则` 而非 `全局直连`。

### 5.3 v2rayN / v2rayNG（Xray 内核）

核心看两点：
- 底部模式选择：`绕过大陆` / `全局` / `直连`，**别选直连**。
- 「路由设置」里的 `domainStrategy`：设为 `IPIfNonMatch` 或 `AsIs`，避免误判。

### 5.4 Shadowrocket / Stash / Quantumult X（iOS）

- 顶部「全局路由」：选 `配置` 或 `代理`，别选 `直连`。
- 检查是否开启了「绕过局域网」并把 `*.google.com` 误加进绕过列表。
- iOS 上要确认 VPN 配置处于**已连接**状态（状态栏有 VPN 图标）。

### 5.5 深度避坑清单

- ⚠️ **不要��浏览器插件和客户端规则混用**：SwitchyOmega 的"自动切换模式"会覆盖系统代理，造成"浏览器能上、终端不能上"的割裂现象。
- ⚠️ **订阅更新 ≠ 规则更新**：很多客户端只更新节点不更新规则集。手动点一次「更新 GeoIP / 规则集」。
- ⚠️ **手动添加的 `DIRECT` 规则记得删**：调试时加的临时规则最容易遗忘。
- ⚠️ **别把 `MATCH` 写成 `DIRECT`**：一行改动，全盘失效。

---

## 六、抓包排障诊断手册（含终端命令与判定表）

按顺序执行，每一步都能砍掉一批可能性。

**Step 1 · 确认系统代理是否真的设置成功**

```bash
# macOS
scutil --proxy
# Windows（PowerShell）
netsh winhttp show proxy
# Linux（GNOME）
gsettings get org.gnome.system.proxy mode
```

**Step 2 · 绕过客户端，直接测试本地 SOCKS 端口**

```bash
curl -x socks5h://127.0.0.1:7890 -I https://www.google.com --max-time 8
```

- 返回 `HTTP/2 200` → 节点和本地端口都没问题，**故障在模式/规则层**。
- 返回 `Connection refused` → 客户端端口没起来。
- 超时 → 节点或链路问题。

**Step 3 · 不指定代理，测裸连**

```bash
curl -I https://www.google.com --max-time 8 -v
```

若裸连超时、带代理成功，说明程序层面的代理未被应用接管。

**Step 4 · 检查内核实际路由决策（Clash.Meta 系列）**

```bash
curl -s http://127.0.0.1:9090/logs?level=info | head -n 30
# 或实时查看
curl -s "http://127.0.0.1:9090/logs?level=debug"
```

观察访问 google.com 时打印的是 `using DIRECT` 还是 `using PROXY`。

**Step 5 · DNS 层验证**

```bash
dig +short google.com @8.8.8.8
dig +short google.com @223.5.5.5
```

若前者返回国内 IP、后者返回`0.0.0.0`，说明本地 DNS 链被污染或劫持。

**Step 6 · 链路质量确认（排除链路背锅）**

```bash
mtr -rwzbc 50 你的节点IP
tcping -t 5 www.google.com 443
```

**判定表：**

| Step 2 结果 | Step 3 结果 | 结论 | 修复动作 |
| --- | --- | --- | --- |
| 成功 | 失败 | 程序未被代理接管 | 开 TUN 模式 |
| 失败 | 失败 | 节点/链路故障 | 换节点或换机场 |
| 成功 | 成功 | 规则判定错误 | 检查模式与规则顺序 |
| 成功 | 成功且解析异常 | DNS 污染 | 启用 fake-ip |

---

## 七、行业常见避坑矩阵

| 陷阱类型 | 典型话术 | 识别方法 | 应对 |
| --- | --- | --- | --- |
| 虚假宣传 | "全网最低延迟 `\<1ms`" | 跨境物理延迟不可能低于 30ms | 要求提供第三方 mtr 报告 |
| 超售 | "9.9 元不限量" | 晚高峰实测丢包 `> 30%` | 用 iperf3 压测并留存截图 |
| 伪解锁 | "原生解锁 Netflix" | 仅 DNS 解锁，实际播放仍被风控 | 实测播放 5 分钟不降码 |
| 规则集投毒 | 免费"增强规则订阅" | 规则内含未知域名转发 | 只使用知名开源规则集 |
| 跑路预警 | 突然大促、关闭工单系统 | 官网无法访问、客服失联 | 立即导出订阅，保留支付凭证 |
| 资金维权 | — | — | 优先使用可争议的支付渠道，保留聊天记录与订单号 |

**判断机场是否靠谱的第一标准不是速度，而是：规则集是否开源可查、是否有公开的线路拓扑说明。** 一个连自己流量怎么走都说不清的商家，不值得你把账号密码交出去。

---

## 八、常见问题 FAQ

**Q1：我切了 Rule 还是上不去 Google，是不是规则集的问题？**
先切 Global。如果 Global 能上，就是规则问题——去日志里看 `google.com` 被哪条规则命中。如果在 Global 下也不通，那就是节点或链路问题，与本文主题无关。

**Q2：模式是 Rule，节点组为什么显示 DIRECT？**
因为你在「代理」页手动选了 `DIRECT` 这一项。它看起来像个"节点"，实际上是直连出口。选回真实的节点组即可。

**Q3：为什么浏览器能上 Google，命令行却不行？**
命令行工具大多不读取系统代理。要么设置环境变量 `export https_proxy=socks5h://127.0.0.1:7890`，要么直接开启 TUN 模式。

**Q4：开了 TUN 之后，国内 App 反而变慢了？**
检查是否用了 `fake-ip` 但规则集缺失 `GEOIP,CN,DIRECT` 兜底。全量走代理会让国内请求绕地球一圈。

**Q5：订阅刚更新，规则还是错的？**
多数客户端只更新节点列表。手动清理旧规则缓存，或直接在配置里使用远程 `RULE-SET` 链接而非本地静态列表。

**Q6：Direct 模式和"关闭代理"有什么区别？**
本质相同，但 Direct 更危险——界面显示客户端仍在运行，用户会误以为"代理是开着的"，从而浪费大量时间排查节点。

**Q7：切成 Global 之后 Google 能上，但公司 OA 打不开了怎么办？**
这是 Global 的固有代价。正确做法是回到 Rule，把 OA 域名加进 `DIRECT` 规则，而不是长期停留在 Global。

---

## 九、延伸阅读内链矩阵

**故障排查系列**
- [连接失败总目录：从 DNS 到证书的完整诊断树 →](/help/faq/)
- [节点延迟正常但网页打不开？TCP 握手层排障实战 →](/help/faq/)
- [订阅更新后配置失效的三种典型场景 →](/help/)

**技术原理系列**
- [IEPL / IPLC / BGP 中转：跨境链路方案全景对比 →](/tech/)
- [TLS Reality 与 XTLS-Vision：2026 协议选型深度拆解 →](/tech/)
- [fake-ip 与 redir-host：DNS 分流策略怎么选 →](/tech/)

**实操教程系列**
- [Clash Verge Rev 从安装到 TUN 模式全流程配置 →](/tutorial/)
- [sing-box 路由规则手写指南与常见错误 →](/tutorial/)
- [iOS 端 Shadowrocket 配置导入与规则校验 →](/tutorial/)

**场景选型系列**
- [跨境办公场景：多设备协同与进程级分流 →](/scenario/)
- [流媒体 4K 稳定播放的节点筛选标准 →](/scenario/)

**评测与横向对比**
- [暮光加速 2026 实验室测速报告与深度评测 →](/reviews/twilight/)
- [2026 机场推荐总榜：按预算与场景分层 →](/reviews/)

---

## 结语

"开着代理却上不去 Google"这件事，折磨人的地方在于它把两个完全不同的领域——**网络链路**和**软件路由策略**——搅在了一起。绝大多数人第一反应是换节点、换机场、找客服，但真正的病根可能只是下拉框里那个被你忽略很久的 `DIRECT`。

养成一个习惯：**排障时先问自己"这条流量被谁接管了、它被送往哪里"，而不是"节点快不快"。** 顺序对了，问题就解决了一半。

如果你已经确认规则配置无误、DNS 策略正确、链路 mtr 干净，那剩下的就是选一条真正扛得住晚高峰的专线。参数是死的，体验是活的——用自己的实测数据说话，比任何榜单都可靠。

<!-- AirPick · 机场推荐与跨境网络技术评测 · 本文数据基于 2026 年实验室实测，转载需注明出处 -->
**标签：** #分流规则 #Clash配置 #DNS污染 #TUN模式 #规则模式 #故障排查 #跨境网络 #机场推荐