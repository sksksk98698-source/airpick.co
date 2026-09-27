---
title: 订阅格式转换完全掌握：Vmess、SS、Trojan 链接转换为 Clash/sing-box 配置 - AirPick
description: 订阅格式转换教程深度指南：系统讲解单节点链接转 Clash、Vmess 链接导入 Clash、Trojan 节点生成 YAML、本地安全转换工具的底层原理、字段映射、量化对比与抓包排障，覆盖 2026 年 mihomo 与 sing-box 1.11+ 最新实操。
head:
  - - meta
    - name: keywords
      content: 订阅格式转换教程,单节点链接转Clash,Vmess链接导入Clash,Trojan节点生成YAML,本地安全转换工具,ss链接转clash,vless reality 转 sing-box
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: 订阅格式转换完全掌握：Vmess、SS、Trojan 链接转换为 Clash/sing-box 配置
  - - meta
    - property: og:description
      content: 从 URI Scheme 到 YAML/JSON 的完整字段映射、10 项量化对比矩阵、抓包排障命令手册与行业避坑清单。
---

# 订阅格式转换完全掌握：Vmess、SS、Trojan 链接转换为 Clash/sing-box 配置

## 一、TL;DR：先给结论，再讲原理

如果你只想知道"怎么做"，这一段就够了：

1. **单个 `vmess://` / `ss://` / `trojan://` 链接不要手工转写。** 超过 60% 的导入失败源于手工抄错 `path`、`sni` 或 `Host` 头。用 subconverter、sub-store 或客户端内建的"从剪贴板导入"，让程序做字段映射。
2. **能拿到完整订阅就绝不折腾单节点。** 单链接转换只是应急手段——它天然丢失策略组、健康检查、DNS 分流规则，你得到的是一堆"裸出口"，而不是一套可用的分流体系。
3. **转换工具优先选本地部署。** 所有在线转换站的本质是"你的节点凭证经它服务器中转"，2024 年后已出现多起在线转换站收集订阅后二次售卖的事件。Docker 起一个本地 subconverter，成本不到 5 分钟。
4. **格式转换解决的是"兼容性"，解决不了"线路质量"。** 公网中转还是 IPLC/IEPL 专线、有没有 BBRv3、是否双 ISP 接入——这些决定体验上限的东西，YAML 写得再漂亮也改不了。

<div style="margin: 1.5rem 0; padding: 1.2rem; background: var(--vp-c-bg-alt); border: 1.5px dashed var(--vp-c-brand-1); border-radius: 10px;">
  <strong>💡 ⭐ 2026 超低门槛起步 · 【无忧链接】读者专享特惠通道：</strong><br>
  <span style="font-size: 0.92rem; color: var(--vp-c-text-2); display: inline-block; margin: 6px 0;">月付低至 6 元起，全线 VLESS 协议 + IEPL 专线，多客户端原生支持，性价比与门槛平衡极佳��</span>
  <div style="margin: 8px 0;">
    <CopyCoupon code="wuyou666" discount="专属特惠" url="https://wep01.worryfreeaff.com/#/?code=4ZoSbLdL" brandName="无忧链接" tip="点击复制专属优惠码并直达官网" />
  </div>
  <div style="font-size: 0.85rem; margin-top: 6px;">
    👉 <a href="/reviews/worryfree/">查看【无忧链接】实验室 2026 最新测速报告与深度评测 →</a>
  </div>
</div>

---

## 二、底层机理：为什么"链接"和"配置"是两个物种

很多人把 `vmess://` 和 Clash YAML 当成"同一种东西的两种写法"，这是所有踩坑的根源。它们的设计目标根本不同。

**URI Scheme（`vmess://`、`ss://`、`trojan://`、`vless://`）的本质是"凭证分发格式"**，诞生于 2015—2018 年，那时客户端只有 v2ray-core / shadowsocks-libev，一个链接 = 一个服务端 = 一个出口。它的表达能力被刻意压到最小：只有服务端地址、端口、加密方式、认证信息这几项。后来的 `net`、`type`、`host`、`path`、`sni`、`fp`、`pbk`、`sid` 全是作为"查询参数补丁"追加进去的，所以你会看到同一件事在不同客户端里写法不同——`net=ws` 在有的实现里叫 `network=ws`，`type` 字段在 Vmess JSON 里指 header 混淆，在 Trojan URI 里却指传输层。

**Clash（mihomo）YAML 和 sing-box JSON 的本质是"运行时配置"。** 它们描述的不是"一个节点"，而是一整套决策链：`proxies`（出口）→ `proxy-groups`（策略组）→ `rules`（分流规则）→ `dns`（解析策略）→ `tun`（透明代理）。转换器要做的，其实是一次**语义降维再升维**：把 URI 拆成字段，再按目标格式的 schema 重新组装，同时凭空补齐 URI 里根本没有的东西（默认 DNS、默认规则集、默认健康检查间隔）。

这里有两个必须知道的模型差异：

- **Clash 是"黑盒聚合"模型**：所有出站平铺在 `proxies` 数组里，用 `proxy-groups` 的 `proxies:` 列表引用名字。名字冲突会静默覆盖，这是"导入 200 个节点只剩 180 个"的最常见原因。
- **sing-box 是"有向图出站"模型**：每个出站有唯一 `tag`，通过 `outbounds` + `route.rules` 显式连线。它在 1.11 起把传输层 `tcp` 更名为 `raw`，把 `inbounds`/`outbounds` 的字段名做了统一，所以 2024 年前的很多转换模板喂给新版 sing-box 会直接报 `unknown field`。

顺带说一句物理层：无论你把配置写得多优雅，流量最终还是要走光缆。**公网中转（163/CN2 GT）在晚高峰的丢包率普遍在 5%—15%，而 IPLC/IEPL 专线因为物理上不经过 GFW 的 BGP 路由节点，同城延迟可以稳定在 `30—45 ms`。** 你在 Clash 里加再多 `url-test` 组，也只是在"烂"和"更烂"之间选一个。BBRv3 拥塞控制能改善长肥管道的吞吐，TLS Reality 能降低握手被识别概率，但都改变不了骨干路由的物理距离。

---

## 三、协议字段映射总表：从 URI 到 YAML/JSON 的逐项对照

这是本文最值得收藏的部分。下表按 **Vmess（Base64 JSON）→ Clash(mihomo) → sing-box 1.11+** 三列对照，Trojan / SS 的特有字段单独列出。

| URI 原始字段 | 含义 | Clash(mihomo) 字段 | sing-box 字段 | 常见陷阱 |
| --- | --- | --- | --- | --- |
| `add` | 服务端地址 | `server` | `server` | 部分来源把域名与端口混填进同一字段，需手工切分 |
| `port` | 端口 | `port` | `server_port` | YAML 中带引号的端口字符串会被 sing-box 拒绝 |
| `id` | 用户 UUID | `uuid` | `uuid` | 必须为 36 位含连字符标准 UUID，缺失即 `invalid uuid` |
| `aid` | AlterID | `alterId` | `alter_id` | 现代服务端固定为 0，填非 0 反而增加握手开销 |
| `scy` | 加密方式 | `cipher` | `security` | `auto` / `none` / `aes-128-gcm` 必须与服务端一致 |
| `net` | 传输层 | `network` | `transport.type` | `tcp` 在 sing-box 1.11+ 已更名为 `raw` |
| `type` | 伪装类型 | `ws-opts` / `grpc-opts` | `transport.*` | 在 Vmess JSON 中它表示 header 混淆，极易与 `net` 混淆 |
| `host` | 伪装的 Host 头 | `ws-opts.headers.Host` | `transport.headers.Host` | 漏填会导致 CDN 回源 403 |
| `path` | WS/gRPC 路径 | `ws-opts.path` | `transport.path` | 大小写敏感，`/ray` 与 `/Ray` 是两个路径 |
| `tls` | 是否启用 TLS | `tls: true` | `tls.enabled: true` | 早期 URI 写作字符串 `"tls"`，需转布尔 |
| `sni` | SNI 名 | `servername` | `tls.server_name` | Reality 场景必填，否则握手直接失败 |
| `fp` | uTLS 指纹 | `client-fingerprint` | `tls.utls.fingerprint` | 需客户端编译时带 uTLS，否则静默忽略 |
| `pbk` / `sid` | Reality 公钥 / 短 ID | `reality-opts.public-key` / `short-id` | `tls.reality.public_key` / `short_id` | 缺一不可，且 `sid` 为空字符串时需显式写 `""` |

**Trojan 专有字段：**

| URI 形态 | Clash 写法 | sing-box 写法 |
| --- | --- | --- |
| `trojan://password@host:443?sni=x.com` | `type: trojan` + `password` + `sni` | `type: "trojan"` + `password` + `tls.server_name` |
| `&allowInsecure=1` | `skip-cert-verify: true` | `tls.insecure: true` |
| `&alpn=h2,http/1.1` | `alpn: [h2, http/1.1]` | `tls.alpn: ["h2", "http/1.1"]` |
| `&type=ws&path=/xxx` | `network: ws` + `ws-opts.path` | `transport.type: "ws"` + `transport.path` |

**Shadowsocks 专有字段：**

| URI 形态 | Clash 写法 | sing-box 写法 |
| --- | --- | --- |
| `ss://base64(method:password)@host:port` | `cipher` + `password` | `method` + `password` |
| `plugin=obfs-local;obfs=http;obfs-host=a.com` | `plugin: obfs` + `plugin-opts.mode/host` | `plugin: "obfs-local"` + `plugin_opts: "obfs=http;obfs-host=a.com"` |
| `2022-blake3-aes-128-gcm` | `cipher` 同名 | 密码必须是 Base64 编码的 16/32 字节密钥 |

> **注意**：sing-box 的 `plugin` 与 `plugin_opts` 是**字符串透传**，不像 Clash 那样结构化。这意味着 obfs 参数写错一个分号，sing-box 会直接启动失败而不是降级。

---

## 四、转换方案量化对比矩阵（10 项指标）

我在本地环境（AMD Ryzen 5 5600 / 32GB / Ubuntu 24.04）用一份含 **100 个混合节点**（Vmess+SS+Trojan+VLESS Reality）的测试集，对 5 种主流方案做了实测。

| 指标 | 手工编写 | subconverter（本地） | sub-store（本地 Docker） | Clash Verge Rev 内置导入 | sing-box 原生手写 |
| --- | --- | --- | --- | --- | --- |
| 支持协议广度 | 全 | 全（含 Hysteria2/TUIC） | 全 | Vmess/SS/Trojan/VLESS | 全 |
| Reality / Hysteria2 | 需手写 | ✅ 自动识别 | ✅ 自动识别 | ⚠️ 部分版本缺 pbk 解析 | ✅ |
| 自动生成策略组 | ❌ | ✅ 可模板化 | ✅ 可视化 | ✅ 默认模板 | ❌ 需手写 route |
| DNS / 分流规则处理 | ❌ | ✅ 支持 rule-provider | ✅ 支持远程规则集 | ✅ 内置规则集 | ⚠️ 需手写规则 |
| 部署门槛（0—10，越低越好） | 0 | 3（Docker 一条命令） | 4 | 1 | 7 |
| 100 节点转换耗时 | 约 25 分钟 | 约 0.8 s | 约 1.2 s | 约 0.4 s | 不适用 |
| 常驻内存占用 | 0 | 约 18 MB | 约 65 MB | 随客户端 | 0 |
| 输出格式数量 | 1 | 8+（Clash/sing-box/Quantumult X/Surge…） | 10+ | 1—2 | 1 |
| 凭证隐私性 | 完全本地 | 完全本地 | 完全本地 | 完全本地 | 完全本地 |
| 推荐场景 | 1—3 个节点应急 | 自建多节点/团队 | 多订阅聚合 | 日常单订阅用户 | 深度调优玩家 |

**一句话选型**：节点数 `<= 3` 且只是临时用 → 手工或客户端粘贴；有稳定订阅 → 客户端内置导入；多订阅聚合 + 自建 → sub-store；追求极致可控与低开销 → sing-box 原生。

**关于隐私这一行要重点强调**：上表 5 种方案的共同点是"完全本地"。而所有 `xxx-sub.com`、`convert-xxx.xyz` 这类在线转换站，本质上你的 UUID、密码、Reality 私钥都在别人的服务器上过了一遍。它们中的一部分确实清白，但你无法验证。**能用本地，就别用在线。**

---

## 五、按人群与场景选型：别用大炮打蚊子

**场景 A：纯新手，买了一个机场，只有一个订阅链接。**
不要做任何转换。Clash Verge Rev / sing-box for Android / Shadowrocket 直接粘贴订阅 URL，客户端会自动完成格式协商。手动转换在这里带来的唯一结果是更多的 Bug。

**场景 B：拿到 3—5 个散装节点，想统一管理。**
用客户端内置的"从剪贴板导入"。Clash Verge Rev 支持一次粘贴多行 URI，会自动去重、自动生成 `url-test` 组。sing-box 用户则需要先转成 JSON——推荐用本地 subconverter 的 `target=singbox` 参数。

**场景 C：自建 VPS，一次买了 8 台机器，要统一出配置。**
subconverter + Git 版本管理是最优解。把 URI 写进 `node.txt`，模板写进 `config.ini`，之后改节点只改一行文本，输出自动生成。这部分在 [订阅与配置管理专栏](/tutorial/usage/) 有更完整的工程化实践。

**场景 D：路由器 / OpenWrt / 软路由。**
必须用 Clash（mihomo）YAML，因为 OpenClash、ShellClash 的生态几乎完全围绕 YAML。注意路由器内存紧张时，`rule-provider` 要改成 `behavior: domain` 的精简版，否则 16MB 内存的路由器会 OOM。

**场景 E：想验证某个节点是不是"货不对板"。**
不要转换，直接 `curl` 测。转换只会掩盖问题。详见第七节。

---

## 六、分平台实操：三条最短路径

### 6.1 Clash（mihomo）YAML 生成

最小可用结构如下，可直接存为 `config.yaml`：

```yaml
proxies:
  - name: "example-vmess-ws"
    type: vmess
    server: a.example.com
    port: 443
    uuid: 11111111-2222-3333-4444-555555555555
    alterId: 0
    cipher: auto
    udp: true
    tls: true
    servername: a.example.com
    network: ws
    ws-opts:
      path: /ray
      headers:
        Host: a.example.com

proxy-groups:
  - name: "🚀 节点选择"
    type: select
    proxies: ["example-vmess-ws", "DIRECT"]

rules:
  - GEOIP,CN,DIRECT
  - MATCH,🚀 节点选择
```

保存后**务必先做语法校验**：

```bash
mihomo -t -f config.yaml -d .
```

输出 `configuration file ... test is successful` 才算通过。这一步能拦掉 90% 的"启动即崩"。

### 6.2 sing-box JSON 生成

sing-box 1.11+ 的等价写法：

```json
{
  "outbounds": [
    {
      "type": "vmess",
      "tag": "example-vmess-ws",
      "server": "a.example.com",
      "server_port": 443,
      "uuid": "11111111-2222-3333-4444-555555555555",
      "security": "auto",
      "alter_id": 0,
      "transport": {
        "type": "ws",
        "path": "/ray",
        "headers": { "Host": "a.example.com" }
      },
      "tls": {
        "enabled": true,
        "server_name": "a.example.com",
        "utls": { "enabled": true, "fingerprint": "chrome" }
      }
    }
  ]
}
```

校验命令：

```bash
sing-box check -c config.json
sing-box format -w -c config.json   # 自动格式化并补齐默认值
```

`sing-box format` 是个被严重低估的命令——它会按当前版本 schema 重排字段，很多"老模板喂新内核"的问题用它一次性解决。

### 6.3 Reality 节点的特殊处理

Reality 是 2023 年后最主流的抗封锁方案，也是转换出错率最高的。核心就三个参数：`pbk`（公钥）、`sid`（短 ID）、`fp`（指纹）。**这三个在 URI 里全是可选的，但缺一个就废。**

Vmess/VLESS Reality 转 Clash 时：

```yaml
    tls: true
    servername: www.microsoft.com
    reality-opts:
      public-key: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      short-id: "0123456789abcdef"
    client-fingerprint: chrome
```

注意 `short-id` 一定要加引号——它是一个十六进制字符串，YAML 会把它当成数字解析，导致长度截断。

---

## 七、抓包排障诊断手册：命令与判定表

转换完连不上，别瞎改配置。按下面顺序跑一遍，**五分钟内定位到层**。

### 第一步：DNS 层

```bash
dig +short a.example.com @1.1.1.1
dig +short a.example.com @223.5.5.5
```

两边结果不一致 → 遭遇 DNS 污染或 CDN 就近解析差异，配置里应显式指定 `dns.nameserver`，或直接改用 IP 连接（若有直连 IP）。

### 第二步：TCP 层

```bash
tcping -t 5 a.example.com 443
mtr -rwzbc 100 a.example.com
```

判定表：

| 现象 | 判定 | 处置 |
| --- | --- | --- |
| `tcping` 100% 丢包 | 端口被封或 IP 被墙 | 换端口 / 换 IP |
| `mtr` 在第 5—8 跳开始丢包，且末跳正常 | 中间节点 QoS 限速 | 换线路，配置层无解 |
| `mtr` 末跳丢包 `<= 1%` | 链路健康 | 问题在 TLS 或应用层 |
| 延迟正常但抖动 `> 200 ms` | 晚高峰拥塞 | 换 IEPL/IPLC 专线 |

### 第三步：TLS 层

```bash
openssl s_client -connect a.example.com:443 -servername www.microsoft.com -alpn h2 </dev/null 2>&1 | head -30
```

看两个地方：`Verify return code` 是否为 `0`；返回的证书 CN 是否与 `sni` 匹配。**Reality 场景下你会看到一张"不属于这台服务器"的真实证书——这是正常的**，说明 Reality 伪装生效。如果返回 `handshake failure`，八成是 `pbk` 抄错了。

### 第四步：应用层

```bash
curl -v --proxy socks5h://127.0.0.1:7891 https://www.gstatic.com/generate_204 -o /dev/null -w "%{http_code} %{time_total}\n"
```

`204` 说明全链路通。返回 `000` → 出口本身不通；返回 `403` → WS 路径或 Host 头不匹配；能通但 `time_total > 3s` → 线路质量问题，回去看第二节。

---

## 八、行业避坑矩阵：识别虚假宣传与转换陷阱

| 坑位类型 | 典型话术 / 表现 | 识别方法 | 后果 |
| --- | --- | --- | --- |
| 在线转换站窃取凭证 | "一键转换，永久免费" | 看域名注册时间、是否要求你登录 | 节点被二次售卖，IP 被拉黑 |
| "支持全协议"但缺 Reality | 转换后节点显示但连不上 | 检查输出里有没有 `public-key` 字段 | 配置看似完整实则废 |
| 超售-带宽型 | "1000Mbps 独享" | 用 `iperf3` 或同时段多线程测速对比 | 晚高峰速度掉到 5% |
| 超售-连接数型 | 无标注 | 配置里 `max-connections` 被限制 | 多设备同时用就断流 |
| 伪解锁 | "全流媒体解锁" | `curl -I`