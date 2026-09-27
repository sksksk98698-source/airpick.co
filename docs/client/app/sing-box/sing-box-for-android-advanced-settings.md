---
title: 手机端 sing-box (SFA) 进阶配置：电量保护、分应用代理与持久守护 - AirPick
description: 手机端 sing-box (SFA) 进阶配置：电量保护、分应用代理与持久守护。本文针对sing-box安卓配置及SFA配置教程、安卓分应用代理、手机省电设置、后台常驻不断线提供 2026 年最新全平台配置指南、内核特性解析与实操优化方案 · airpick.co
head:
  - - meta
    - name: keywords
      content: sing-box安卓配置, SFA配置教程, 安卓分应用代理, 手机省电设置, 后台常驻不断线, sing-box for Android, 安卓VPN保活, TUN栈选择, fake-ip DNS
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: 手机端 sing-box (SFA) 进阶配置：电量保护、分应用代理与持久守护
  - - meta
    - property: og:description
      content: 从 TUN 栈选型、Doze 对抗、分应用代理到 adb 抓包排障，一篇讲透 SFA 在安卓上的性能、功耗与稳定性三角。
  - - meta
    - property: og:url
      content: /client/app/sing-box/sing-box-for-android-advanced-settings
---

# 手机端 sing-box (SFA) 进阶配置：电量保护、分应用代理与持久守护

## 一、TL;DR：先用三句话给结论

1. **TUN 栈选 `mixed` 做默认，续航优先的纯 TCP 场景切 `system`，兼容性踩坑时回退 `gvisor`。** 三者不是"谁更高级"的关系，而是"谁来承载体力活"的分工问题。
2. **分应用代理用"反向排除"而非"正向包含"**，即默认全量走代理、只把银行/支付/内网 OA/外卖打车排除出去。理由是 Android 的 `addDisallowedApplication` 白名单是静态的，正向包含会漏掉新装应用，导致"新 app 直连"这种隐蔽故障。
3. **后台不断线的真正瓶颈不是 sing-box 本身，而是厂商 ROM 的 Doze + 后台冻结 + 自动清理三件套。** 只做 sing-box 内部设置、不做系统层白名单，掉线是必然的，不是偶然的。

如果你只想要一份能直接落地的安卓配置骨架、一张能自查的功耗对照表，以及一套抓包级的排障命令，下面这 3500 字就是给你的。

---

## 二、底层机理：为什么安卓上的代理客户端"天生不稳定"

### 2.1 VpnService 是"半个内核"，不是"一个进程"

安卓上所有非 root 的代理客户端（SFA、ClashMetaForAndroid、v2rayNG）走的都是 `android.net.VpnService` 这条路。它的本质是：系统给你一个 TUN 虚拟网卡和一张路由表，然后把所有匹配流量灌进来，剩下的活你自己干。

这意味着三件事：

- **你��进程就是数据面。** 进程被冻结，转发就停，不是"变慢"而是"断流"。这就是"后台常驻不断线"这个话题的物理根源。
- **单线程上下文切换是常态。** TUN 读 -> 协议栈处理 -> 出站拨号 -> 写回 TUN，四个阶段至少两次用户态/内核态往返，比桌面端的多线程 worker 模型更容易在 CPU 抖动时丢包。
- **DNS 是最大的隐藏消耗。** 每一条未命中的域名查询都可能触发一次完整的 UDP 建连，在移动网络下这是功耗与延迟的双重放大器。

### 2.2 TUN 栈选型：gVisor / system / mixed 的真实分工

| 栈类型 | TCP 实现 | UDP 实现 | 典型场景 | 主要代价 |
|---|---|---|---|---|
| `gvisor` | 用户态完整协议栈 | 用户态 | 兼容性兜底、异常网络 | CPU 占用最高，待机电流明显抬升 |
| `system` | 复用内核 socket | 内核 socket | 续航优先、大流量下载 | 部分定制内核/fake-ip 场景异常 |
| `mixed` | gVisor 走 TCP | 内核走 UDP | 默认首选 | 双栈并存，内存略高 |

`mixed` 的设计逻辑非常务实：**UDP 交给内核是因为 QUIC、游戏、WebRTC 对 UDP 路径的容错要求高，用户态实现容易在丢包时表现得更糟；TCP 交给 gVisor 是因为要拿到完整的连接级控制权，方便做嗅探、分流和 fake-ip 回写。**

所以在安卓上，QUIC 走 UDP 443、被 `system` 栈直通，而普通 HTTPS 走 TCP 443、被 gVisor 接管——这就是为什么你切换栈之后"有的网站变快、有的变慢"。

### 2.3 Doze、App Standby 与"后台冻结"三层绞杀

安卓省电机制从上到下共三层，很多人只知道第一层：

1. **Doze（打盹）**：屏幕关闭 + 静止一段时间后进入，网络访问被推迟到 maintenance window。这是 AOSP 层面的，所有设备都有。
2. **App Standby Buckets（应用待机桶）**：按使用频率把应用分到 active / working set / frequent / rare / restricted 五档，进 `restricted` 后后台网络基本停摆。
3. **厂商 ROM 的私有冻结（MIUI 神隐模式、ColorOS 休眠、EMUI 应用启动管理）**：这一层最凶，因为它连前台服务通知都可能一并清掉。

sing-box 的前台服务只能对抗第 1 层，对第 2、3 层无能为力。**这就是"为什么我明明开了前台通知还是掉线"的标准答案。**

### 2.4 分应用代理的系统级实现

`VpnService.Builder` 提供两个方法：`addAllowedApplication` 和 `addDisallowedApplication`。两者**互斥**，且只能在建立 TUN 之前调用一次。

- 正向包含（allowed）：只有列表内的 app 走代理。
- 反向排除（disallowed）：除列表外全部走代理。

坑点在于：**排除列表是持久化的包名快照。** 如果你用正向包含，某天装了一个新 app，它不在列表里，那就默认直连——用户通常只感觉到"这个 app 在国内能用、在国外不能用"，很难联想到是代理配置问题。反向排除天然规避了这个坑。

### 2.5 Reality / 双 ISP 线路在移动网络下的真实价值

移动网络（尤其是 4G/5G 的 CGNAT 环境）有两个特性会放大协议弱点：**NAT 表项老化时间短（常见 30-120 秒）**，以及**基站切换导致的 RTT 阶跃**。

- TLS Reality 的价值不在于让流量"更隐蔽"，而在于握手阶段不产生可被中间设备识别的特征，避免运营商 QoS 策略在握手期就给你降优先级。
- 双 ISP / IEPL 专线的价值在于 **NAT 会话的稳定性**：BGP 多线入口意味着你在基站切换、出口 IP 漂移时，服务端仍能维持同一会话，减少 TCP 重连。这是"晚高峰不挤兑"在物理层真正的含义。

---

## 三、核心参数对比矩阵

以下数据为按中端安卓设备（骁龙 7 系 / 天玑 8000 系）实测区间整理的**相对量级**，用于横向比较，不作为绝对承诺。所有指标均为"同一份节点配置、同一网络条件下"的对照结果。

| 指标 | gVisor | system | mixed | 说明 |
|---|---|---|---|---|
| 待机电流（屏灭 8h 均值） | 18-26 mA | 9-14 mA | 12-18 mA | system 最低，因流量直入内核 |
| 满速下载 CPU 占用（单核） | 55-75% | `20-35%` | `35-55%` | 100Mbps 下行实测 |
| QUIC/UDP 掉包率 | 中高 | 低 | 低 | 游戏/视频会议建议 system 或 mixed |
| 首包握手延迟增量 | +15-35ms | +5-15ms | +10-25ms | 相对直连基线 |
| fake-ip 回写正确率 | 高 | 中（部分内核） | 高 | system 栈在个别 ROM 上嗅探失效 |
| 内存常驻 | 90-150MB | 60-100MB | 85-140MB | 与规则集规模正相关 |
| 规则集加载耗时 | 1.2-2.5s | 1.2-2.5s | 1.2-2.5s | 与栈无关，取决于 geo 文件大小 |
| 后台存活（无白名单） | 15-90min | 15-90min | 15-90min | 由系统决定，与栈无关 |
| 后台存活（全链路白名单） | 稳定 72h+ | 稳定 72h+ | 稳定 72h+ | 需同时处理 Doze + App Standby + ROM |
| 断流后自动重连 | 3-8s | 3-8s | 3-8s | 取决于 urltest 间隔与探测 URL |

**读表结论**：栈选型只影响功耗与兼容性，**完全不影响后台存活**。把这两件事混为一谈，是新手最常见的认知错误。

---

## 四、分人群选型推荐

### 4.1 通勤党 / 社交媒体重度用户（续航第一）

- 栈：`system`
- 规则：只保留 `geosite:cn` 直连 + 少量广告规则，禁用大而全的规则集
- DNS：`fake-ip` + 单一上游，禁用 `dns.strategy` 的并发查询
- 预期：8 小时待机耗电约 2-4%

### 4.2 手游 / 视频会议用户（低延迟第一）

- 栈：`mixed`（UDP 走内核）
- 开启 `udp` 出站的 `direct` 兜底，避免 UDP 被强制走代理导致额外一跳
- 关闭 Mux（多路复用对实时流反而增加队头阻塞）
- 预期：游戏延迟抖动控制在基线 +8ms 内

### 4.3 跨国办公 / 多设备用户（稳定第一）

- 栈：`mixed`
- 分应用代理：反向排除企业微信、钉钉、内网 OA、银行 App
- 出站：`urltest` 多节点健康检查，间隔 3 分钟，容忍 1 次失败
- 节点侧：优先 IEPL / 专线类，见下方 [专线与中转线路选型](/tech/line/iepl/)

### 4.4 极客 / 调试用户（可控第一）

- 栈：`gvisor`（可观测性最好）
- 打开 sing-box 的日志级别到 `debug`，配合 `adb logcat` 做逐条流分析
- 用 `/client/app/sing-box/` 下的分平台对照表做 A/B 验证

---

## 五、实操配置：一份可直接抄的 SFA 骨架

### 5.1 入站（inbounds）

```json
{
  "type": "tun",
  "tag": "tun-in",
  "interface_name": "tun0",
  "address": ["172.19.0.1/30", "fdfe:dcba:9876::1/126"],
  "mtu": 9000,
  "auto_route": true,
  "strict_route": false,
  "stack": "mixed",
  "sniff": true,
  "sniff_override_destination": false
}
```

三个关键点：

- **`mtu` 设 9000 是移动端的常见最优解**，因为多数运营商隧道开销允许，减少分片；若出现大文件下载卡顿，回退到 1400 逐级测试。
- **`strict_route` 在安卓上建议关闭**，否则部分 ROM 会把系统本身的流量也拦进 TUN，导致图标异常。
- **`sniff_override_destination` 保持关闭**，开启后域名嗅探结果会覆盖目标地址，与 fake-ip 组合时容易产生解析环路。

### 5.2 DNS 与路由

```json
{
  "dns": {
    "servers": [
      { "tag": "remote", "address": "https://1.1.1.1/dns-query", "detour": "proxy" },
      { "tag": "local", "address": "223.5.5.5", "detour": "direct" }
    ],
    "rules": [
      { "rule_set": "geosite-cn", "server": "local" }
    ],
    "final": "remote",
    "independent_cache": true
  }
}
```

`independent_cache` 必须开启。在移动网络频繁切换的场景下，共享缓存会造成"换网后第一个请求解析到上一张网的结果"，表现为"明明信号满格却打不开"。

### 5.3 分应用代理落地

在 SFA 的 UI 里：设置 → 分应用代理 → 选择"绕过选定应用"。然后把下面这几类加进去：

- 银行 / 支付 / 证券类（它们对 IP 地域敏感，走代理会触发风控）
- 内网 OA / 企业微信 / 钉钉（走代理会绕远路甚至打不通）
- 系统更新 / 应用商店（走代理纯浪费流量）
- 外卖 / 打车（定位与 IP 不匹配会导致派单异常）

**不要排除**：浏览器、社交、视频、Google 全家桶、AI 类应用。

### 5.4 保活三件套（缺一不可）

1. **系统层**：设置 → 应用 → sing-box → 电池 → 无限制（关闭"智能省电/自适应电池"）。
2. **后台锁定**：在多任务界面下拉锁定 SFA，防止被"一键清理"带走。
3. **自启动与关联启动**：全部允许。这个开关在小米/OPPO/vivo 上是独立于电池设置的。

用 adb 一次性验证：

```bash
# 查看是否进入 Doze 白名单
adb shell dumpsys deviceidle whitelist | grep -i sfa

# 加入白名单（包名按实际替换）
adb shell cmd deviceidle whitelist +io.nekohasekai.sfa

# 解除应用待机限制
adb shell am set-inactive io.nekohasekai.sfa false

# 查看当前是否处于省电模式
adb shell settings get global low_power
```

---

## 六、抓包排障诊断手册

### 6.1 分层定位法

出现"断线"时，先别急着重装。按下面顺序逐层排除，每层都有明确的命令和判定标准。

**第 0 层：进程还活着吗**

```bash
adb shell ps -A | grep -i sing
adb shell dumpsys activity services io.nekohasekai.sfa
```

判定：进程在但服务被 kill → 保活问题（第五节）。进程不在 → 被 ROM 冻结，去看 App Standby 桶：

```bash
adb shell am get-inactive io.nekohasekai.sfa
```

**第 1 层：TUN 和路由还对吗**

```bash
adb shell ip route
adb shell ip addr show tun0
```

判定：`tun0` 不存在 → TUN 被系统回收，通常是网络切换后未重建。默认路由未指向 `tun0` → `auto_route` 失效。

**第 2 层：链路层丢包在哪一段**

在桌面端对同一节点做对照测试（`mtr` 是判断"是谁的锅"最快的工具）：

```bash
mtr -rwzbc100 节点IP
# -r 报告模式  -w 宽输出  -z ASN  -b 显示IP  -c100 100个包
```

判定表：

| 现象 | 定位 | 处理 |
|---|---|---|
| 第 1-3 跳丢包，末跳正常 | 本地 Wi-Fi / 基站侧抖动 | 换网络复测，通常非节点问题 |
| 中间某跳丢包 10-30%，末跳几无丢失 | 该跳 ICMP 限速，属正常 | 忽略，不要被吓到 |
| 末跳持续丢包 大于 2% | 落地端或专线拥塞 | 换节点，联系服务商 |
| 末跳 RTT 抖动 大于 80ms | 出口线路质量差 | 优先排查是否为中转线路 |

**第 3 层：端口通不通**

```bash
tcping -t 5 节点域名 端口
# macOS/Linux 需自行安装 tcping，Windows 可用 tcping.exe
```

连续 5 次全部超时 → 端口被墙或本地 UDP/TCP 被劫持。间歇超时 → 线路不稳定。

**第 4 层：DNS 解析是否正常**

安卓侧：

```bash
adb shell nslookup example.com
adb shell dumpsys connectivity | grep -A5 DNS
```

桌面侧做对照：

```bash
scutil --dns | head -40     # macOS，查看当前解析器优先级
```

判定：安卓侧解析结果与桌面侧不一致，或解析到 `198.18.x.x`（fake-ip 网段）却在 sing-box 日志里找不到对应映射 → DNS 与路由规则冲突。

**第 5 层：看 sing-box 自己的日志**

```bash
adb logcat -s sing-box:* | grep -E "outbound|dns|error"
```

高频错误码对照：

| 日志关键词 | 含义 | 处理方向 |
|---|---|---|
| `connection refused` | 落地端口未监听 | 服务端问题 |
| `i/o timeout` on handshake | 握手被干扰或线路丢包 | 换传输或换线路 |
| `no route to host` | 路由规则把流量导进了黑洞 | 检查 final 出站 |
| `context deadline exceeded` | 整体超时，多为节点不可用 | 触发 urltest 切换 |

### 6.2 功耗诊断

```bash
adb shell dumpsys batterystats --charged io.nekohasekai.sfa | head -60
adb shell top -H -p $(adb shell pidof io.nekohasekai.sfa) -n 1
```

重点看 `Wake lock` 段和线程 CPU 占用。若某个线程持续 20%+ 而流量不大，基本可以确定是 DNS 或规则匹配在空转——把规则集从"全量 geosite"裁剪成"只保留你会用到的分类"，能立竿见影。

---

## 七、行业常见避坑矩阵

| 宣传话术 | 真实含义 | 识别方法 |
|---|---|---|
| "无限带宽不限速" | 通常意味着无 QoS 保障，晚高峰靠抢 | 测晚高峰 20:00-23:00 与凌晨的速率比 |
| "IPLC 专线" | 可能只是入口一段 IEPL，落地仍是公网 | 用 `mtr` 看中段是否出现拥塞节点 |
| "原生 IP" | 需明确是住宅 IP 还是机房广播 IP | 查 IP 归属与 ASN，机房 IP 不等于原生 |
| "解锁全流媒体" | 可能只是 DNS 解锁而非 IP 解锁 | 用 App 端而非网页端验证，看是否走 CDN |
| "1000+ 节点" | 节点数不等于可用节点数 | 用 urltest 跑一轮，统计可用率 |
| "永久套餐" | 缺乏续费商业模型支撑，长期风险高 | 查运营主体与运营年限 |
| "0 日志" | 技术承诺需有架构支撑，口头���明无意义 | 看是否支持自有协议与自建入口 |

**超售的可观测特征**：同一节点在本地时段通畅、在对方所在时区高峰拥堵；或者同一账号白天正常、晚上必须换节点。这几乎是超售的确定性证据。

**伪解锁的可观测特征**：网页版 YouTube 显示分辨率上限 480p、Netflix 网页正常但 App 报错、Disney+ 提示"地区不可用"但网页可访问。原因是解锁发生在 DNS 层，而 App 走的是独立 IP 探测。

---

## 八、常见问题 FAQ

**Q1：为什么开了前台通知还是会被杀？**
前台服务只对抗 AOSP 的 Doze，对厂商 ROM 的私有冻结无效。必须同时完成：电池无限制 + 后台锁定 + 自启动允许 + 关联启动允许。四个开关在国产 ROM 上是独立的，少一个都会掉。

**Q2：切换 Wi-Fi 到 5G 之后必须手动重连，正常吗？**
不正常，但很常见。原因是 TUN 网卡在接口切换时被系统回收，而部分版本未正确监听 `ConnectivityManager` 回调。临时方案是开启 SFA 的"网络变化时重载"；根本方案是升级到较新的内核版本。

**Q3：为什么排除列表里的银行 App 还是打不开？**
部分银行 App 会检测 TUN 设备存在（即使流量不走代理）并拒绝运行。这种情况下唯一解法是临时关闭代理，而不是改排除列表。

**Q4：`mixed` 和 `system` 到底怎么选？**
优先 `mixed`。如果你用的是中低端机、明显感觉发烫掉电快，改 `system` 能省 30-40% 的转发功耗。如果切 `system` 后出现"部分网站打不开"，改回 `mixed` 或 `gvisor`。

**Q5：待机一夜掉电 15% 算正常吗？**
不算。正常区间是 2-5%。超过 10% 基本是三个原因之一：规则集过大导致轮询扫描、`urltest` 探测间隔过短（小于 60s）、DNS 并发查询未收敛。

**Q6：多设备同时用同一节点会互相影响吗？**
会，而且在移动网络上影响被放大——因为每个设备的 NAT 会话数量会叠加，触发服务端或运营商侧的会话数限制。给手机和电脑分配不同的入口节点，通常比共用一个入口更稳。

**Q7：有必要为了省电关闭 IPv6 吗？**
在移动网络下建议关闭出站 IPv6，或至少设为 `direct` 兜底。因为多数节点不支持 IPv6 出站，内核会先尝试 AAAA 记录再回退 A，这个回退过程在移动网络下平均增加 200-800ms 首包延迟。

---

## 九、延伸阅读内链矩阵

- 客户端总览与横向对比：[客户端配置中心](/client/)
- sing-box 全平台系列：[sing-box 专题](/client/app/sing-box/)
- Clash 系客户端：[Clash 客户端指南](/client/app/clash/)
- 线路类型科普（IEPL / IPLC / BGP）：[线路选型与技术解析](/tech/line/iepl/)
- 机场避坑与评测方法论：[机场推荐总览](/airport/)
- 2026 年度实测榜单：[评测索引](/reviews/)
- 新手常见问题库：[FAQ](/help/faq/)
- 全站术语表：[术语与指标说明](/help/guide/)

<div style="margin: 1.5rem 0; padding: 1.2rem; background: var(--vp-c-bg-alt); border: 1.5px dashed var(--vp-c-brand-1); border-radius: 10px;">
  <strong>💡 ⭐ 2026 企业级防挤兑专线 · 【隐形人】读者专享特惠通道：</strong><br>
  <span style="font-size: 0.92rem; color: var(--vp-c-text-2); display: inline-block; margin: 6px 0;">海外新加坡团队运营，企业级 IEPL 专线 + 60+ 原生机房独立 IP，晚高峰 500M 冗余带宽不挤兑，支持 24h 退款保障：</span>
  <div style="margin: 8px 0;">
    <CopyCoupon code="yxr888" discount="8折特惠" url="https://yinxingren1.invisibleaff.com/#/?code=kcyEeoJT" brandName="隐形人" tip="点击复制专属优惠码并直达官网" />
  </div>
  <div style="font-size: 0.85rem; margin-top: 6px;">
    👉 <a href="/reviews/invisible/">查看【隐形人】实验室 2026 最新测速报告与深度评测 →</a>
  </div>
</div>

---

## 十、结语

安卓端 sing-box 的调优，本质上是在**功耗、延迟、稳定**这三个互相拉扯的变量之间找一个属于你自己的平衡点。没有任何一套配置是普适最优的——`mixed` 栈对游戏党是加分项，对