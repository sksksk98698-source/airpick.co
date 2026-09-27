---
title: sing-box 常见报错与调试诊断：日志分析、端口冲突与解析排错 - AirPick
description: sing-box 常见报错与调试诊断：日志分析、端口冲突与解析排错。本文针对sing-box排错诊断及sing-box日志查看、JSON报错诊断、配置语法错误排查、DNS查询失败排查提供 2026 年最新全平台配置指南、内核特性解析与实操优化方案 · airpick.co
head:
  - - meta
    - name: keywords
      content: sing-box排错诊断, sing-box日志查看, JSON报错诊断, 配置语法错误排查, DNS查询失败排查
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: sing-box 常见报错与调试诊断：日志分析、端口冲突与解析排错 - AirPick
  - - meta
    - property: og:description
      content: 从启动时序、日志级别代价、DNS 解析链、端口抢占到 mtr/tcpdump 抓包判定表，一份可落地的 sing-box 全平台排障手册。
  - - meta
    - property: og:url
      content: /client/app/sing-box/sing-box-troubleshooting-and-logs
---

# sing-box 常见报错与调试诊断：日志分析、端口冲突与解析排错

> 本文是 AirPick 客户端工程系列的 sing-box 专项排障篇。配套阅读：[sing-box 安装与配置入门](/client/app/sing-box/)、[TUN 模式原理与实战](/client/app/sing-box/)。

## 一、TL;DR：三条铁律与 30 秒定位树

**三条铁律：**

1. **先 `sing-box check -c config.json`，再谈其他。** sing-box 是强 schema 校验的内核，配置层的问题占真实故障的六成以上，而 check 会在启动前就把它毙掉。
2. **日志级别调到 `debug` 为止，`trace` 只在定位 DNS 与嗅探问题时短时启用。** `trace` 级别的磁盘写入和 CPU 抖动会反过来干扰你判断链路质量。
3. **先用 `mtr` + `tcping` 证明链路通不通，再怀疑内核。** 大量「sing-box 有问题」的工单，最后落在上游节点被 QoS 限速或 TCP 建连被 RST。

**30 秒定位树：**

- 进程起不来，日志停在 `FATAL` → JSON 语法 / schema 层
- 进程起来了但全网断 → TUN 路由 / 权限 / 系统 DNS 被劫持
- 只有部分网站不通 → 规则集 / 分流 DNS / 域名嗅探
- 时通时不通、晚高峰必炸 → MTU / 上游超售 / 端口级 QoS
- 日志刷屏 `context deadline exceeded` → 上游 DNS 不可达或存在解析死循环

把上面这棵树背下来，你已经能砍掉八成无效排查。

## 二、底层机理：sing-box 启动时序与四层故障面

理解故障，先理解 sing-box 是怎么「活过来」的。

**启动时序（简化）：**

1. 读取配置：`-c` 指定单文件，`-D` 指定目录并合并其中的 `*.json`
2. `option` 结构体 → `service` 中间表示（这一步做 schema 校验）
3. 构造组件：log → DNS → inbound → outbound → rule-set → route
4. 按依赖顺序 `Start()`：log 先起，DNS 次之，inbound 最后；任何一环失败都会触发 `FATAL` 并退出
5. 运行期：连接建立 → 嗅探 → 路由匹配 → outbound 拨号 → 数据转发

**四层故障面：**

- **L0 配置层**：JSON 语法错误、字段名拼错、枚举值非法。特征是日志里出现 `decode config`
- **L1 资源层**：端口被占、权限不足、TUN 设备创建失败、文件描述符耗尽。特征是 `bind:` 或 `operation not permitted`
- **L2 解析层**：上游 DNS 超时、rule-set 下载失败、域名嗅探与目标 IP 不匹配。特征是 `exchange failed` 或 `rule-set`
- **L3 链路层**：TLS 握手被阻断、MTU 黑洞、上游丢包。特征是 `i/o timeout`、`EOF`、`connection reset`

**一个必须知道的细节：TUN stack 的选择会影响你的排障结论。**

`"stack": "gvisor"` 兼容性好但吞吐低、CPU 高；`"stack": "system"` 吞吐接近内核转发，但在部分老版本应用上会出现连接卡死。很多「换了 stack 就好了」的玄学问题，本质是 gVisor 用户态网络栈对某些 TCP 选项的处理与对端不兼容，而 `system` 栈走了内核路径。

## 三、核心参数与部署形态量化对照矩阵

同一份 sing-box，部署形态不同，排障难度和性能开销差异巨大。下表数据基于 x86 小主机与 M 系列 Mac 的实测区间，用于建立量级直觉。

| 量化指标 | TUN 模式 | 系统代理（mixed 入站） | 纯 SOCKS5 入站 | 透明代理（TPROXY/redirect） |
| --- | --- | --- | --- | --- |
| 额外往返延迟 | +0.3~0.8 ms | +0.8~2 ms | +0.8~2 ms | +0.4