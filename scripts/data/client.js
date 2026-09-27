module.exports = {
  id: 'client',
  title: '客户端与设备',
  path: '/client/',
  description: '全平台代理客户端软件与设备端专属配置指南，覆盖 Clash、Shadowrocket、v2rayN、sing-box 及 Win/Mac/iOS/安卓/软路由。',
  subcategories: [
    {
      id: 'app',
      title: '客户端',
      path: '/client/app/',
      clusters: [
        {
          id: 'clash',
          clusterId: '2.1.1',
          title: 'Clash 机场推荐',
          path: '/client/app/clash/',
          description: '支持 Clash Verge Rev、Clash Nyanpasu 及 Meta (Mihomo) 内核的优质机场与规则集配置。',
          articles: [
            {
              title: '2026好用的Clash机场推荐：支持Clash Verge/Meta内核的优质梯子精选',
              slug: 'best-clash-airports-2026',
              primaryKeyword: 'Clash机场推荐',
              secondaryKeywords: ['Clash节点推荐', 'Clash订阅推荐', 'Clash Verge梯子', 'Mihomo内核机场'],
              longTailKeywords: [
                '适合Clash使用的稳定机场推荐', 'Clash一键导入订阅的优质梯子', 'Clash Verge最新好用的翻墙节点',
                '2026年高口碑Clash机场合集', '延迟最低的Clash专线节点', 'Clash分流规则完整的机场',
                '支持Clash Meta新特性的梯子', '电脑Clash科学上网梯子排行', 'Clash不卡顿稳定节点推荐'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/tutorial/usage/subscribe/', anchor: 'Clash订阅导入教程' },
                { target: '/client/device/windows/', anchor: 'Windows端Clash配置' },
                { target: '/airport/ranking/top/', anchor: '机场排行榜' },
                { target: '/help/faq/timeout/', anchor: 'Clash节点全红超时排查' }
              ],
              priority: 'P0'
            },
            {
              title: 'Clash Verge Rev 完整配置教程：从内核选择到智能分流策略组实战',
              slug: 'clash-verge-rev-configuration-guide',
              primaryKeyword: 'Clash Verge配置教程',
              secondaryKeywords: ['Clash Verge新手使用', 'Clash分流策略设置', 'TUN模式开启教程', 'Mihomo内核配置'],
              longTailKeywords: [
                'Clash Verge Rev怎么导入机场订阅', 'Clash系统代理与TUN模式区别', '如何设置国外流量走代理国内直连',
                'Clash策略组自动测速选优节点设置', 'Clash DNS防泄漏防污染配置', '新手配置Clash常见报错解决',
                '2026最新Clash Verge零基础教程'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/app/clash/', anchor: 'Clash机场推荐' },
                { target: '/tutorial/usage/config/', anchor: '客户端高级配置' },
                { target: '/help/faq/subscribe-fail/', anchor: '订阅更新失败排查' }
              ],
              priority: 'P0'
            },
            {
              title: 'Clash 订阅转换安全防坑指南：自建转换器与公共API隐私风险',
              slug: 'clash-subconverter-security-guide',
              primaryKeyword: 'Clash订阅转换安全',
              secondaryKeywords: ['在线订阅转换风险', '自建Subconverter', '订阅链接防泄露', '后端API隐私审计'],
              longTailKeywords: [
                '使用第三方订阅转换会被偷节点吗', '公共订阅转换收集用户节点做池子', '如何搭建属于自己的本地订阅转换器',
                '节点信息在订阅转换过程中的暴露途径', '机场自带订阅格式是否还需要转换', '保护翻墙订阅链接不被封禁的常识',
                '2026年安全转换订阅完全指南'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/guide/security/', anchor: '翻墙安全与隐私' },
                { target: '/tutorial/usage/subscribe/', anchor: '原生订阅导入' },
                { target: '/client/app/clash/', anchor: 'Clash机场推荐' }
              ],
              priority: 'P1'
            },
            {
              title: 'Clash TUN模式深度解析：接管全局虚拟网卡搞定终端与外服游戏',
              slug: 'clash-tun-mode-deep-dive',
              primaryKeyword: 'Clash TUN模式配置',
              secondaryKeywords: ['TUN虚拟网卡代理', '终端命令行走Clash', '局域网代理接管', '游戏接管TUN模式'],
              longTailKeywords: [
                '为什么开启系统代理Git终端不走代理', 'Clash Verge开启TUN模式报错Wintun怎么解决', 'TUN模式与TAP模式性能差异',
                '利用TUN模式让外服游戏客户端自动代理', 'TUN模式下DNS挟持与解析流程', '彻底解决应用不支持HTTP代理的问题',
                'Windows与Mac开启TUN模式保姆级教程'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/scenario/game/accel/', anchor: '游戏加速机场推荐' },
                { target: '/client/device/windows/', anchor: 'Windows网络配置' },
                { target: '/client/app/clash/', anchor: 'Clash使用技巧' }
              ],
              priority: 'P1'
            },
            {
              title: 'Clash 规则集进阶：ACL4SSR 与 Loyalsoldier 智能分流规则调优',
              slug: 'clash-rulesets-acl4ssr-optimization',
              primaryKeyword: 'Clash规则集优化',
              secondaryKeywords: ['ACL4SSR规则配置', 'Loyalsoldier规则集', '国内直连国外代理规则', '流媒体自动分流'],
              longTailKeywords: [
                'Clash怎么添加自定义分流规则', '解决微信淘宝误走代理卡顿问题', 'ChatGPT与OpenAI专属分流规则配置',
                'Bilibili港澳台限定解锁规则分流', '远程订阅外部Rule-Providers方法', '规则匹配优先级与GEOIP设置技巧',
                '打造极致丝滑的Clash智能分流系统'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/scenario/ai/chatgpt/', anchor: 'ChatGPT专用节点与分流' },
                { target: '/scenario/streaming/all/', anchor: '流媒体分流技巧' },
                { target: '/client/app/clash/', anchor: 'Clash客户端推荐' }
              ],
              priority: 'P2'
            },
            {
              title: '原版 Clash for Windows 停更之后：三大现代化替代客户端全景横评',
              slug: 'clash-alternatives-after-cfw-sunset',
              primaryKeyword: 'Clash替代客户端',
              secondaryKeywords: ['CFW替代软件', 'Clash新客户端推荐', 'Clash Nyanpasu评测', 'Flclash体验'],
              longTailKeywords: [
                'CFW作者停更后现在用什么客户端', 'Clash Verge Rev好用还是Nyanpasu好用', '支持跨平台的开源现代Clash衍生版',
                'CFW老版本是否还能继续安全使用', '新版客户端对Mihomo核心的适配优势', '内存占用与UI界面美观度横测',
                '2026年主流Clash图形客户端选型'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/client/device/windows/', anchor: 'Windows端梯子方案' },
                { target: '/client/device/mac/', anchor: 'Mac平台客户端' },
                { target: '/client/app/clash/', anchor: 'Clash生态全景' }
              ],
              priority: 'P2'
            },
            {
              title: 'Clash 局域网共享代理：手机/电视/Switch 轻松接入电脑代理网络',
              slug: 'clash-lan-allow-sharing-guide',
              primaryKeyword: 'Clash局域网共享',
              secondaryKeywords: ['允许局域网连接', '电脑给Switch开代理', '手机连接电脑Clash代理', '多设备热点共享'],
              longTailKeywords: [
                'Clash勾选Allow LAN之后怎么配置手机', '获取电脑局域网IP地址与7890端口设置', 'Switch连接电脑代理下载联机游戏教程',
                '局域网设备无法连接排查Windows防火墙拦截', '免装客户端给电视盒子提供网络代理', '一机翻墙全屋设备临时借道实操',
                '局域网代理共享常见问题及应对'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/device/router/', anchor: '电视与软路由终极方案' },
                { target: '/client/device/iphone/', anchor: 'iPhone免装客户端方案' },
                { target: '/client/app/clash/', anchor: 'Clash客户端核心玩法' }
              ],
              priority: 'P2'
            },
            {
              title: 'Clash 节点测速虚高真相：延迟与实际下载带宽不匹配的底层机理',
              slug: 'clash-speedtest-latency-vs-bandwidth',
              primaryKeyword: 'Clash节点测速不准',
              secondaryKeywords: ['延迟低但速度慢原因', 'Clash测速机制揭秘', 'TCP握手延迟与RTT', '机场虚标测速应对'],
              longTailKeywords: [
                '为什么Clash测速几十毫秒看视频却转圈', '机场节点测速只是测到国内中转机的延迟', '如何真实测试出节点的实际落地下载速率',
                '利用Speedtest和Fast.com进行真实带宽压测', '伪造TCP响应诱导测速软件作弊手法', '看懂测速参数告别盲目信仰低延迟',
                '2026科学判断节点质量核心方法'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/faq/slow/', anchor: '网速慢与晚高峰排查' },
                { target: '/tech/line/bgp/', anchor: '中转服务器架构原理' },
                { target: '/client/app/clash/', anchor: 'Clash机场推荐' }
              ],
              priority: 'P3'
            }
          ]
        },
        {
          id: 'shadowrocket',
          clusterId: '2.1.2',
          title: 'Shadowrocket 机场推荐',
          path: '/client/app/shadowrocket/',
          description: 'iOS 平台装机必备“小火箭”专属机场推荐、海外 Apple ID 下载与全局分流进阶。',
          articles: [
            {
              title: '2026小火箭Shadowrocket机场推荐：iOS苹果用户必备的稳定高速梯子',
              slug: 'best-shadowrocket-airports-2026',
              primaryKeyword: 'Shadowrocket机场推荐',
              secondaryKeywords: ['小火箭节点推荐', 'iOS翻墙梯子', 'iPhone小火箭机场', '苹果小火箭订阅'],
              longTailKeywords: [
                '苹果手机用小火箭配什么机场最好', '支持一键导入小火箭订阅的梯子', 'iOS小火箭稳定低延迟节点推荐',
                '2026适合Shadowrocket的便宜好用机场', '小火箭扫码一秒导入节点的机场', '苹果专线不过墙小火箭梯子',
                '小火箭看TikTok与Netflix专属机场', '苹果手机翻墙必备高分机场榜'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/client/device/iphone/', anchor: 'iPhone全套翻墙配置' },
                { target: '/tutorial/usage/subscribe/', anchor: '小火箭订阅导入教程' },
                { target: '/airport/ranking/top/', anchor: '机场排行榜' }
              ],
              priority: 'P0'
            },
            {
              title: '美区 Apple ID 注册与 Shadowrocket 正版购买保姆级教程',
              slug: 'us-apple-id-and-shadowrocket-purchase-guide',
              primaryKeyword: 'Shadowrocket购买教程',
              secondaryKeywords: ['注册美区Apple ID', '小火箭正版下载', '美区App Store礼品卡充值', '苹果下载小火箭'],
              longTailKeywords: [
                '国内怎么下载正版Shadowrocket小火箭', '免信用卡注册美国苹果账号完整图解', '购买2.99美元小火箭礼品卡防封号技巧',
                '租用共享小火箭账号锁机风险警示', '正版小火箭一次购买全家共享方法', '苹果更新小火箭提示账号停用怎么破',
                '2026最新iOS小火箭正规入手流程'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/help/guide/security/', anchor: 'Apple ID账号安全防锁机' },
                { target: '/client/device/iphone/', anchor: 'iPhone科学上网配置' },
                { target: '/client/app/shadowrocket/', anchor: '小火箭机场推荐' }
              ],
              priority: 'P0'
            },
            {
              title: '小火箭节点配置与一键导入：扫码、链接、一键唤起全掌握',
              slug: 'shadowrocket-node-import-tutorial',
              primaryKeyword: '小火箭导入订阅教程',
              secondaryKeywords: ['Shadowrocket添加节点', '小火箭扫码导入', '小火箭订阅更新设置', 'iOS导入翻墙配置'],
              longTailKeywords: [
                '怎么把机场订阅导入小火箭', '小火箭打开后找不到节点怎么刷新', '添加单节点与批量导入订阅区别',
                '设置小火箭后台自动更新订阅频率', '小火箭连上后微信收不到消息怎么分流', '导入时提示格式错误常见排查',
                '苹果手机新手5分钟学会用小火箭'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/tutorial/usage/subscribe/', anchor: '订阅链接通用指南' },
                { target: '/help/faq/subscribe-fail/', anchor: '订阅拉取失败自查' },
                { target: '/client/app/shadowrocket/', anchor: '小火箭机场推荐' }
              ],
              priority: 'P1'
            },
            {
              title: '小火箭配置规则集精修：去除广告、解锁TikTok与国内外智能分流',
              slug: 'shadowrocket-rules-and-adblock-config',
              primaryKeyword: '小火箭规则配置',
              secondaryKeywords: ['小火箭分流规则', 'Shadowrocket去广告配置', '小火箭免拔卡刷TikTok', '分流配置模块导入'],
              longTailKeywords: [
                '小火箭怎么添加去广告规则文件', '用小火箭免拔卡看海外TikTok配置教程', '解决打开小火箭国内淘宝美团加载缓慢',
                '配置智能分流让百度知乎直连海外走代理', '神机规则与分流规则懒人包安装', 'HTTPS解密证书安装与信任设置',
                '打造最强iOS网络控制中心'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/scenario/streaming/tiktok/', anchor: 'TikTok免拔卡出海指南' },
                { target: '/scenario/ai/chatgpt/', anchor: 'ChatGPT智能分流规则' },
                { target: '/client/app/shadowrocket/', anchor: '小火箭机场推荐' }
              ],
              priority: 'P1'
            },
            {
              title: 'Shadowrocket 耗电与后台断连优化：iPhone 全天保活设置绝招',
              slug: 'shadowrocket-battery-drain-and-background-keepalive',
              primaryKeyword: '小火箭耗电优化',
              secondaryKeywords: ['小火箭后台经常断开', 'iOS小火箭省电设置', '解决待机掉线问题', '后台保活配置'],
              longTailKeywords: [
                '开着小火箭手机发烫电池掉电极快怎么回事', '锁屏后小火箭自动断开需要重新连接', '关闭按需连接与低电量模式防断连',
                '优化节点心跳保持参数降低系统资源占用', 'iPhone续航崩盘与网络代理关系的真相', '全天开启小火箭不发热省电秘笈',
                'iOS系统后台代理稳定保持全攻略'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/client/device/iphone/', anchor: 'iPhone省电与优化' },
                { target: '/help/faq/connect-fail/', anchor: '连接断开故障排除' },
                { target: '/client/app/shadowrocket/', anchor: '小火箭机场推荐' }
              ],
              priority: 'P2'
            },
            {
              title: '共享小火箭 Apple ID 惊魂：被锁机敲诈与隐私泄露典型案例',
              slug: 'shared-apple-id-icloud-lock-scam',
              primaryKeyword: '共享Apple ID锁机陷阱',
              secondaryKeywords: ['小火箭共享账号风险', '登录iCloud被锁机敲诈', '淘宝租用苹果ID诈骗', '解开被锁iPhone'],
              longTailKeywords: [
                '千万不要在设置里的iCloud登录别人账号', '只在App Store登录下载小火箭安全守则', '不小心登录iCloud被远程锁定要赎金怎么办',
                '免费分享的小火箭账号被封禁停用处理', '淘宝2块钱租账号下载暗藏的陷阱', '保护苹果手机资产安全的绝对红线',
                '2026苹果用户防骗安全必读'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/guide/security/', anchor: '翻墙安全与隐私全书' },
                { target: '/client/app/shadowrocket/', anchor: '正版购买指南' },
                { target: '/help/guide/scam/', anchor: '诈骗预警与维权' }
              ],
              priority: 'P2'
            },
            {
              title: '小火箭按需连接（On Demand）配置：无感自动启停的高级极客玩法',
              slug: 'shadowrocket-on-demand-vpn-configuration',
              primaryKeyword: '小火箭按需连接',
              secondaryKeywords: ['On Demand自动开关', '连WiFi自动关代理', '切到4G自动开代理', '极客无感代理配置'],
              longTailKeywords: [
                '如何让小火箭在连接特定WiFi时自动断开', '打开特定App自动开启小火箭代理设置', 'iOS按需连接机制底层原理详解',
                '告别手动去软件里点开启关闭的痛点', '利用iOS快捷指令自动化控制小火箭', '深度调优Shadowrocket高级网络策略',
                '苹果生态自动化翻墙极致体验'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/device/iphone/', anchor: 'iOS自动化玩法' },
                { target: '/tutorial/usage/config/', anchor: '客户端高级策略' },
                { target: '/client/app/shadowrocket/', anchor: '小火箭推荐' }
              ],
              priority: 'P2'
            },
            {
              title: 'Shadowrocket 常见报错与排查：握手超时、无法解析与配置丢失',
              slug: 'shadowrocket-common-errors-troubleshooting',
              primaryKeyword: '小火箭报错排查',
              secondaryKeywords: ['小火箭节点超时', '小火箭无法连接服务器', '小火箭导入失败', '证书无效排查'],
              longTailKeywords: [
                '小火箭开启后打不开任何网页怎么破', '提示Handshake Timeout握手失败解决', '节点全部显示Timeout感叹号怎么恢复',
                '更新订阅后规则消失全部变成直连', '信任证书错误导致无法访问HTTPS网站', '重置网络设置拯救小火箭崩溃问题',
                'Shadowrocket官方故障快速自救指南'
              ],
              searchIntent: '故障',
              internalLinks: [
                { target: '/help/faq/timeout/', anchor: '节点超时终极解决方案' },
                { target: '/help/faq/connect-fail/', anchor: '连接失败自查' },
                { target: '/client/app/shadowrocket/', anchor: '小火箭机场推荐' }
              ],
              priority: 'P3'
            }
          ]
        },
        {
          id: 'v2rayn',
          clusterId: '2.1.3',
          title: 'v2rayN 机场推荐',
          path: '/client/app/v2rayn/',
          description: 'Windows 平台老牌经典客户端 v2rayN 专属机场推荐与核心生态调优。',
          articles: [
            {
              title: '2026年v2rayN好用的机场推荐：Windows平台老牌稳定翻墙工具首选',
              slug: 'best-v2rayn-airports-2026',
              primaryKeyword: 'v2rayN机场推荐',
              secondaryKeywords: ['v2rayN节点推荐', 'Windows翻墙客户端', 'v2rayN订阅机场', 'PC端稳定梯子'],
              longTailKeywords: [
                'Windows电脑用v2rayN配什么机场好', 'v2rayN一键导入订阅的稳定机场', '支持Xray与Sing-box双核心的梯子',
                '2026年v2rayN低延迟专线节点推荐', '适合程序员使用的v2rayN老牌机场', 'v2rayN支持Hysteria2协议的梯子',
                '稳定不卡顿的PC电脑科学上网机场', 'v2rayN高口碑订阅服务商推荐'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/client/device/windows/', anchor: 'Windows系统梯子配置' },
                { target: '/tutorial/usage/subscribe/', anchor: 'v2rayN订阅导入' },
                { target: '/airport/ranking/top/', anchor: '综合机场排行榜' }
              ],
              priority: 'P0'
            },
            {
              title: 'v2rayN 从零到精通使用教程：内核切换、路由规则与一键测速实战',
              slug: 'v2rayn-complete-beginner-guide',
              primaryKeyword: 'v2rayN使用教程',
              secondaryKeywords: ['v2rayN新手配置', 'v2rayN添加订阅', 'v2rayN路由设置', 'Xray内核更新'],
              longTailKeywords: [
                '怎么在Github下载正版v2rayN及核心包', 'v2rayN如何添加机场订阅链接', '系统代理与清除系统代理的区别',
                'v2rayN一键对所有节点测真连接延迟', '设置绕过大陆局域网实现国内外智能分流', 'v2rayN开机自启与最小化托盘设置',
                '2026新手看这一篇搞定v2rayN'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/app/v2rayn/', anchor: 'v2rayN机场推荐' },
                { target: '/tutorial/usage/config/', anchor: '配置调优指南' },
                { target: '/help/faq/timeout/', anchor: '节点真连接延迟超时' }
              ],
              priority: 'P0'
            },
            {
              title: 'v2rayN 内核进阶：Xray 与 sing-box 核心切换及协议优势对比',
              slug: 'v2rayn-xray-vs-sing-box-core',
              primaryKeyword: 'v2rayN内核切换',
              secondaryKeywords: ['Xray内核升级', 'v2rayN支持sing-box', 'Hysteria2协议内核', 'Vless Reality内核适配'],
              longTailKeywords: [
                'v2rayN怎么升级最新的Xray-core', '如何切换到sing-box核心以支持最新协议', '为什么默认核心不支持Hysteria2节点',
                '不同内核在Windows下的CPU与内存占用实测', '手动下载内核解压替换常见报错解决', '保持核心更新对抗封锁审查实战',
                'Windows高级网络代理内核深度解析'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/tutorial/compare/protocol/', anchor: '代理协议演进' },
                { target: '/client/app/sing-box/', anchor: 'sing-box生态探索' },
                { target: '/client/app/v2rayn/', anchor: 'v2rayN使用指南' }
              ],
              priority: 'P1'
            },
            {
              title: 'v2rayN 路由自定义规则：阻止国内软件访问外网与流媒体分流',
              slug: 'v2rayn-custom-routing-rules',
              primaryKeyword: 'v2rayN路由规则',
              secondaryKeywords: ['v2rayN绕过大陆', '自定义路由分流', '屏蔽广告规则导入', 'GeoSite域名分流'],
              longTailKeywords: [
                '怎么在v2rayN里设置特定网站走直连', '阻止腾讯微信QQ流量经过代理服务器', '让Netflix和YouTube固定走特定节点',
                '导入Loyalsoldier路由文件增强分流精度', 'v2rayN路由规则匹配逻辑与先后顺序', '告别国内网络缓慢的终极分流法则',
                '打造专属高度定制化PC分流网关'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/scenario/streaming/all/', anchor: '流媒体精准分流' },
                { target: '/client/app/clash/', anchor: '对比Clash规则体系' },
                { target: '/client/app/v2rayn/', anchor: 'v2rayN客户端推荐' }
              ],
              priority: 'P1'
            },
            {
              title: 'v2rayN 无法上网排查大全：红感叹号、Socks端口占用与系统代理失效',
              slug: 'v2rayn-common-network-issues-fix',
              primaryKeyword: 'v2rayN无法上网排查',
              secondaryKeywords: ['v2rayN系统代理无效', '10808端口被占用', '启动服务失败排查', '真连接延迟-1排查'],
              longTailKeywords: [
                'v2rayN连上后网页打不开是什么原因', '系统代理选项变成红色的解决方法', '提示10808端口已被其他程序占用怎么改端口',
                '重装系统后v2rayN缺少.NET框架报错', '关闭v2rayN后电脑无法正常上网救急教程', '浏览器无网络连接代理服务器未响应',
                'v2rayN故障诊断十步排查法'
              ],
              searchIntent: '故障',
              internalLinks: [
                { target: '/help/faq/connect-fail/', anchor: '连接失败排查' },
                { target: '/help/faq/timeout/', anchor: '节点超时解决' },
                { target: '/client/app/v2rayn/', anchor: 'v2rayN使用指南' }
              ],
              priority: 'P2'
            },
            {
              title: 'v2rayN 与 Clash 综合对比：Windows 办公开发到底选哪一个',
              slug: 'v2rayn-vs-clash-for-windows-comparison',
              primaryKeyword: 'v2rayN对比Clash',
              secondaryKeywords: ['Windows选Clash还是v2rayN', '程序员梯子客户端对比', '内存占用与功能对比', '客户端选型指南'],
              longTailKeywords: [
                'v2rayN和Clash哪个速度更快更省电', '程序员开发环境配合v2rayN优势何在', 'Clash分流策略组是否完全碾压v2rayN',
                '协议兼容性上v2rayN与Clash的真实差距', '界面美观度与上手难易度详细对比', '两款老牌顶流工具的长期使用建议',
                '2026年Windows代理客户端终极选型'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/client/app/clash/', anchor: 'Clash 客户端指南' },
                { target: '/client/device/windows/', anchor: 'Windows 最佳实践' },
                { target: '/client/app/v2rayn/', anchor: 'v2rayN 机场推荐' }
              ],
              priority: 'P2'
            },
            {
              title: 'v2rayN 局域网分享给全屋：搭建家庭简易 Socks5 代理服务器',
              slug: 'v2rayn-share-lan-socks5-server',
              primaryKeyword: 'v2rayN局域网分享',
              secondaryKeywords: ['电脑开代理给手机', 'v2rayN搭建Socks5代理', '局域网设备代理设置', '家庭多设备共享上网'],
              longTailKeywords: [
                '怎么在v2rayN勾选允许局域网连接', '获取本机局域网IP并在电视上输入代理', 'Windows防火墙开放10808与10809端口教程',
                '手机不装软件直接蹭电脑v2rayN代理', '配合局域网PAC脚本实现智能分流', '极简低成本多设备科学上网共享方案',
                '实操记录：一台旧电脑变身代理主机'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/device/router/', anchor: '软路由替代方案' },
                { target: '/tutorial/usage/config/', anchor: '通用代理参数配置' },
                { target: '/client/app/v2rayn/', anchor: 'v2rayN推荐' }
              ],
              priority: 'P2'
            },
            {
              title: '真连接延迟 vs 测速：看懂 v2rayN 测速面板的每一个技术参数',
              slug: 'understanding-v2rayn-speedtest-metrics',
              primaryKeyword: 'v2rayN测速参数解读',
              secondaryKeywords: ['真连接延迟含义', '测速速度与下载速率', 'Ping与真连接区别', '如何挑选最优节点'],
              longTailKeywords: [
                '真连接延迟测试到底发了什么HTTP请求', '为什么有的节点Ping通但真连接显示-1', '测试下载速度会不会把机场流量跑光',
                '如何批量删除真连接超时不可用的死节点', '利用快捷键按延迟升序排序快速切换', '精准评估v2rayN节点综合健康度',
                '2026节点跑分与性能评估标准'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/tutorial/basic/terms/', anchor: '网络术语全解' },
                { target: '/help/faq/slow/', anchor: '网速慢与丢包排查' },
                { target: '/client/app/v2rayn/', anchor: 'v2rayN使用指南' }
              ],
              priority: 'P3'
            }
          ]
        },
        {
          id: 'sing-box',
          clusterId: '2.1.4',
          title: 'sing-box 机场推荐',
          path: '/client/app/sing-box/',
          description: '下一代全能通用代理核心，原生支持全协议、高性能、极低资源占用。',
          articles: [
            {
              title: '2026好用的sing-box机场推荐：完美适配下一代通用代理核心的梯子',
              slug: 'best-sing-box-airports-2026',
              primaryKeyword: 'sing-box机场推荐',
              secondaryKeywords: ['sing-box订阅推荐', '下一代通用核心机场', 'sing-box原生支持节点', '高吞吐稳定梯子'],
              longTailKeywords: [
                '支持sing-box一键导入的优质机场有哪些', '原生输出sing-box JSON订阅的良心梯子', '适配Hysteria2与Vless Reality的sing-box机场',
                '2026最受推崇的sing-box服务商合集', '低内存占用极致性能翻墙机场推荐', '全平台客户端兼容度最高的梯子',
                '程序员极客首选sing-box订阅推荐'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/client/app/clash/', anchor: '对比Clash生态' },
                { target: '/tutorial/compare/protocol/', anchor: '现代代理协议全景' },
                { target: '/airport/ranking/top/', anchor: '机场排行榜' }
              ],
              priority: 'P0'
            },
            {
              title: 'sing-box 极简快速入门指南：跨平台图形客户端安装与订阅导入',
              slug: 'sing-box-beginner-quickstart-guide',
              primaryKeyword: 'sing-box入门教程',
              secondaryKeywords: ['sing-box使用教程', 'sing-box导入机场订阅', '跨平台sing-box客户端', '新手上手指南'],
              longTailKeywords: [
                'Windows/Mac/Android怎么安装sing-box', '机场提供的sing-box链接如何一键导入', '开启默认分流与启动系统代理',
                '手机端安装SFA (sing-box for Android) 实操', '图形界面版本与命令行版本区别', '新手避开JSON手动编辑直接起飞',
                '2026年最新sing-box保姆级入门'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/device/android/', anchor: '安卓端SFA安装' },
                { target: '/tutorial/usage/subscribe/', anchor: '订阅管理指南' },
                { target: '/client/app/sing-box/', anchor: 'sing-box推荐' }
              ],
              priority: 'P0'
            },
            {
              title: '手把手教你编写 sing-box JSON 配置文件：Inbounds、Outbounds 与 Route 详解',
              slug: 'sing-box-json-configuration-deep-dive',
              primaryKeyword: 'sing-box配置教程',
              secondaryKeywords: ['sing-box JSON配置', 'Outbounds出站规则', 'Route规则路由', 'Inbounds入站设置'],
              longTailKeywords: [
                '从零手写一份最简sing-box配置文件', '如何配置DNS服务器分流与Fake-IP', '添加Vless节点与Shadowsocks节点模板',
                'Route规则中GeoIP与GeoSite字段配置', 'TUN入站模式在sing-box中的高效配置法', 'JSON语法校验与常见拼写报错解决',
                '极客玩家必备的配置文件完全解构'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/tutorial/usage/config/', anchor: '网络协议高级调校' },
                { target: '/client/app/clash/', anchor: '与YAML配置语法对比' },
                { target: '/client/app/sing-box/', anchor: 'sing-box机场推荐' }
              ],
              priority: 'P1'
            },
            {
              title: '为什么说 sing-box 是未来：架构演进、性能暴打 Clash 与资源占用实测',
              slug: 'why-sing-box-is-the-future-architecture',
              primaryKeyword: 'sing-box架构优势',
              secondaryKeywords: ['sing-box对比Clash性能', '内存占用实测对比', '通用代理核心演进', '为什么选择sing-box'],
              longTailKeywords: [
                'sing-box内存占用比Clash低多少', '单线程高并发网络吞吐量基准测试', '纯Go语言现代化架构带来的优势',
                '为什么越来越多的机场开始支持sing-box', '未来代理协议事实标准的诞生历程', '低配软路由与老旧手机性能救星',
                '深度评测：下一代网络核心的全面压制'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/tutorial/compare/tool/', anchor: '代理客户端深度横评' },
                { target: '/client/device/router/', anchor: '软路由轻量运行' },
                { target: '/client/app/sing-box/', anchor: 'sing-box推荐' }
              ],
              priority: 'P1'
            },
            {
              title: 'sing-box 规则集编译与优化：Rule-Set 二进制与 Headless 分流实践',
              slug: 'sing-box-ruleset-binary-optimization',
              primaryKeyword: 'sing-box规则集编译',
              secondaryKeywords: ['Rule-Set二进制规则', 'Headless无头运行', '分流加速优化', 'srs格式规则文件'],
              longTailKeywords: [
                'sing-box专用的.srs二进制规则集怎么生成', '为什么二进制规则匹配速度比纯文本快十倍', '如何自动拉取更新主流分流Rule-Set',
                '低功耗设备上的极速规则匹配技巧', '自定义域名黑白名单并编译为二进制', '利用sing-box打造工业级稳定分流网关',
                '2026年高性能分流规则调校指南'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/client/app/sing-box/', anchor: 'sing-box配置教程' },
                { target: '/tutorial/usage/config/', anchor: '路由规则调优' },
                { target: '/client/device/router/', anchor: '软路由规则优化' }
              ],
              priority: 'P2'
            },
            {
              title: '手机端 sing-box (SFA) 进阶配置：电量保护、分应用代理与持久守护',
              slug: 'sing-box-for-android-advanced-settings',
              primaryKeyword: 'sing-box安卓配置',
              secondaryKeywords: ['SFA配置教程', '安卓分应用代理', '手机省电设置', '后台常驻不断线'],
              longTailKeywords: [
                'sing-box for Android怎么排除国内应用走代理', '锁屏休眠网络断开保活设置', 'Android系统VpnService性能压榨',
                'SFA与v2rayNG日常使用对比体验', '手机发热降低50%的代理配置秘籍', '支持深色模式与现代Material Design',
                '打造极致丝滑的安卓翻墙体验'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/device/android/', anchor: '安卓系统翻墙大全' },
                { target: '/help/faq/slow/', anchor: '异常耗电卡顿排查' },
                { target: '/client/app/sing-box/', anchor: 'sing-box机场推荐' }
              ],
              priority: 'P2'
            },
            {
              title: '利用 sing-box 打造透明网关：旁路由与主路由全局代理极速搭建',
              slug: 'sing-box-transparent-proxy-gateway',
              primaryKeyword: 'sing-box透明网关',
              secondaryKeywords: ['旁路由翻墙搭建', 'TProxy透明代理配置', 'Linux服务器全局代理', '局域网全设备接管'],
              longTailKeywords: [
                '在Debian/OpenWrt上安装sing-box核心', '配置iptables与nftables实现TProxy分流', '局域网所有设备零配置自动走代理',
                '智能识别国内流量与国外流量直通方案', '彻底解决电视和游戏主机无法翻墙痛点', '旁路由网络回环与DNS泄漏完美解决',
                '打造家庭万兆透明代理全纪录'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/device/router/', anchor: '路由器与电视机场配置' },
                { target: '/tech/line/iepl/', anchor: '高端专线适配' },
                { target: '/client/app/sing-box/', anchor: 'sing-box推荐' }
              ],
              priority: 'P2'
            },
            {
              title: 'sing-box 常见报错与调试诊断：日志分析、端口冲突与解析排错',
              slug: 'sing-box-troubleshooting-and-logs',
              primaryKeyword: 'sing-box排错诊断',
              secondaryKeywords: ['sing-box日志查看', 'JSON报错诊断', '配置语法错误排查', 'DNS查询失败排查'],
              longTailKeywords: [
                'sing-box启动失败查看终端日志方法', '提示bind: address already in use端口占用', 'JSON格式错误定位行号技巧',
                'DNS配置错误导致所有国外域名无法解析', '如何开启Trace级别详细日志排查丢包', '常见错误代码汇总与标准救急方案',
                'sing-box开发者级排障排错宝典'
              ],
              searchIntent: '故障',
              internalLinks: [
                { target: '/help/faq/connect-fail/', anchor: '连接失败排查' },
                { target: '/help/faq/timeout/', anchor: '全节点超时应急' },
                { target: '/client/app/sing-box/', anchor: 'sing-box使用指南' }
              ],
              priority: 'P3'
            }
          ]
        }
      ]
    },
    {
      id: 'device',
      title: '设备端',
      path: '/client/device/',
      clusters: [
        {
          id: 'windows',
          clusterId: '2.2.1',
          title: 'Windows 机场推荐',
          path: '/client/device/windows/',
          description: 'Windows 10/11 系统专属机场推荐、系统代理管理与生产力工具翻墙配置。',
          articles: [
            {
              title: '2026好用的Windows电脑机场推荐：Win10/Win11必备高速翻墙梯子合集',
              slug: 'best-windows-airports-2026',
              primaryKeyword: 'Windows机场推荐',
              secondaryKeywords: ['电脑翻墙梯子', 'Win11好用机场', 'Windows稳定科学上网', 'PC端翻墙推荐'],
              longTailKeywords: [
                'Windows电脑用什么机场最稳定', 'Win11系统好用不卡顿的PC梯子', '支持一键导入电脑客户端的机场推荐',
                '开机自启动稳定的Windows科学上网', '外贸开会与办公PC电脑专用节点', '2026年Windows高赞机场榜单',
                '便宜好用的电脑翻墙软件推荐'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/client/app/clash/', anchor: 'Windows端Clash配置' },
                { target: '/client/app/v2rayn/', anchor: 'Windows端v2rayN指南' },
                { target: '/airport/ranking/top/', anchor: '综合机场排行榜' }
              ],
              priority: 'P0'
            },
            {
              title: 'Windows 11 网络代理配置与系统代理设置完全指南',
              slug: 'windows-11-proxy-settings-complete-guide',
              primaryKeyword: 'Win11代理设置教程',
              secondaryKeywords: ['Windows手动配置代理', '系统代理开关失灵', 'PAC自动代理脚本配置', 'Win11网络设置'],
              longTailKeywords: [
                'Win11怎么手动设置HTTP代理IP和端口', '关闭代理软件后网页打不开提示无法连接代理服务器',
                '如何在Windows设置中清除残留代理设置', '解决Win11系统代理自动打开关闭不了', '注册表彻底重置Windows代理参数',
                'Windows系统网络代理底层工作原理解析'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/help/faq/connect-fail/', anchor: '网页打不开故障修复' },
                { target: '/client/device/windows/', anchor: 'Windows机场推荐' },
                { target: '/client/app/clash/', anchor: '客户端代理控制' }
              ],
              priority: 'P0'
            },
            {
              title: 'Windows 终端命令行科学上网：PowerShell、CMD 与 Git 走代理全攻略',
              slug: 'windows-terminal-powershell-git-proxy',
              primaryKeyword: 'Windows终端走代理',
              secondaryKeywords: ['PowerShell设置代理', 'Git克隆加速', 'CMD命令行代理', '终端加速环境变量'],
              longTailKeywords: [
                '为什么开了代理CMD下载还是慢', 'PowerShell配置$env:http_proxy环境变量', 'Git clone报错Connection reset怎么走代理',
                'npm与pip一键配置本地代理端口命令', '永久写入系统环境变量实现终端全加速', 'Windows开发者命令行翻墙完全手册'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/app/clash/', anchor: 'TUN模式免配置环境变量' },
                { target: '/client/device/windows/', anchor: 'Windows使用指南' },
                { target: '/help/faq/slow/', anchor: '网络连接超时排查' }
              ],
              priority: 'P1'
            },
            {
              title: '解决 Windows 关掉代理后无法上网：网络黄叹号一键修复秘笈',
              slug: 'fix-windows-no-internet-after-closing-proxy',
              primaryKeyword: '关掉代理后无法上网',
              secondaryKeywords: ['代理软件闪退断网修复', '无法访问互联网黄感叹号', '重置网络代理设置', '注册表修复代理设置'],
              longTailKeywords: [
                '电脑突然断电关机后打不开任何网页', '提示没有Internet连接但微信QQ能登录', '为什么浏览器显示代理服务器未响应',
                '批处理脚本一键清空系统代理配置', 'Netsh winsock reset命令拯救断网电脑', '十分钟内搞定Windows断网疑难杂症'
              ],
              searchIntent: '故障',
              internalLinks: [
                { target: '/help/faq/connect-fail/', anchor: '网络连接故障排查' },
                { target: '/client/device/windows/', anchor: 'Windows系统调优' },
                { target: '/client/app/clash/', anchor: '正确退出客户端流程' }
              ],
              priority: 'P1'
            },
            {
              title: 'Windows 微软商店与 UWP 应用走代理配置：突破沙盒网络隔离',
              slug: 'windows-store-uwp-apps-loopback-proxy',
              primaryKeyword: 'UWP应用走代理',
              secondaryKeywords: ['微软商店打不开解决', 'UWP回环代理豁免', 'AppContainer回环网络', 'EnableLoopback工具'],
              longTailKeywords: [
                '为什么开启代理后微软商店依然报错', '如何使用EnableLoopback工具解除UWP隔离', 'Windows子系统WSL2走宿主机代理实战',
                '内置Edge与原生应用网络代理修复', '完美解决Windows官方商店连不上网问题'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/app/clash/', anchor: 'Clash内置UWP豁免功能' },
                { target: '/client/device/windows/', anchor: 'Windows使用指南' },
                { target: '/help/faq/connect-fail/', anchor: '连接失败排查' }
              ],
              priority: 'P2'
            },
            {
              title: 'Windows 游戏玩家翻墙配置：Steam跨区、Apex加速与外服联机优化',
              slug: 'windows-gaming-proxy-optimization',
              primaryKeyword: 'Windows游戏翻墙加速',
              secondaryKeywords: ['Steam跨区买游戏梯子', '外服游戏联机低延迟', 'Apex丢包解决', '游戏代理与加速器区别'],
              longTailKeywords: [
                '用机场打外服游戏会不会被封号', '低延迟IEPL专线节点玩欧服美服LoL', 'Steam转区与充值防红信安全指南',
                '游戏走代理TUN模式与Socks5设置', '2026年适合PC端游戏玩家的高速梯子'
              ],
              searchIntent: '购买',
              internalLinks: [
                { target: '/scenario/game/accel/', anchor: '外服游戏专用加速机场' },
                { target: '/tech/line/iepl/', anchor: '低延迟专线' },
                { target: '/client/device/windows/', anchor: 'Windows平台推荐' }
              ],
              priority: 'P2'
            },
            {
              title: 'Windows 防火墙与第三方杀毒软件拦截排查：360/火绒与代理冲突解决',
              slug: 'windows-antivirus-firewall-proxy-conflict',
              primaryKeyword: '杀毒软件拦截代理解决',
              secondaryKeywords: ['火绒拦截代理端口', '360报毒翻墙软件', 'WindowsDefender拦截', '添加杀软白名单'],
              longTailKeywords: [
                '下载Clash被Windows Defender报木马误杀', '火绒阻止了本地回环连接怎么放行', '开启代理软件被360拦截网络修复',
                '将代理核心加入杀毒软件信任区教程', '安全下载翻墙软件防捆绑木马准则'
              ],
              searchIntent: '故障',
              internalLinks: [
                { target: '/help/guide/security/', anchor: '软件安全与防木马' },
                { target: '/client/device/windows/', anchor: 'Windows使用指南' },
                { target: '/help/guide/fake-website/', anchor: '假官网木马辨识' }
              ],
              priority: 'P2'
            },
            {
              title: '双网卡分流与企业内网环境翻墙配置：内网外网互不干扰共存方案',
              slug: 'dual-nic-corporate-intranet-proxy-coexistence',
              primaryKeyword: '内网与代理共存设置',
              secondaryKeywords: ['双网卡路由分流', '公司内网不能访问解决', 'OA系统与外网共存', '静态路由表配置'],
              longTailKeywords: [
                '开启代理软件后公司内网OA和打印机连不上', '通过route add命令配置永久静态路由', '局域网走物理网卡海外走代理虚拟网卡',
                '外贸与IT公司上班安全翻墙双通秘笈', '告别频繁手动开关代理的丝滑共存教程'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/app/clash/', anchor: 'Clash分流配置' },
                { target: '/client/device/windows/', anchor: 'Windows平台推荐' },
                { target: '/help/faq/connect-fail/', anchor: '网络冲突诊断' }
              ],
              priority: 'P3'
            }
          ]
        },
        {
          id: 'mac',
          clusterId: '2.2.2',
          title: 'Mac 机场推荐',
          path: '/client/device/mac/',
          description: 'macOS 苹果电脑专属机场推荐、Surge/Clash Verge 生产力配置与终端代理。',
          articles: [
            {
              title: '2026年Mac苹果电脑机场推荐：macOS生产力出海必备的高速稳定梯子',
              slug: 'best-mac-airports-2026',
              primaryKeyword: 'Mac机场推荐',
              secondaryKeywords: ['macOS好用梯子', '苹果电脑翻墙推荐', 'Mac专用高速机场', 'M系列芯片适配梯子'],
              longTailKeywords: [
                'Mac苹果电脑用什么机场最省心', '完美适配Apple Silicon M1/M2/M3/M4的梯子', 'Mac设计师与程序员常用机场排行',
                '2026年高口碑Mac科学上网梯子精选', 'Mac上好用且不耗电的翻墙机场', '一键配置macOS订阅的靠谱品牌'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/client/app/clash/', anchor: 'Mac版Clash Verge安装' },
                { target: '/airport/ranking/top/', anchor: '综合机场排行榜' },
                { target: '/client/device/mac/', anchor: 'Mac平台调优' }
              ],
              priority: 'P0'
            },
            {
              title: 'Mac 平台主流代理工具横评：Surge、Clash Verge Rev 与 Loon 到底选哪个',
              slug: 'mac-proxy-tools-surge-vs-clash-vs-loon',
              primaryKeyword: 'Mac代理客户端对比',
              secondaryKeywords: ['Mac端Surge体验', 'Mac用Clash好还是Surge好', 'Loon for Mac评测', '苹果电脑客户端选型'],
              longTailKeywords: [
                '几百块的Surge Mac版到底值不值得买', '免费开源的Clash Verge在Mac上表现如何', 'Loon跨平台多设备授权性价比分析',
                '性能占用、电池消耗与分流能力全方位PK', '2026年macOS最强代理客户端选型方案'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/client/app/clash/', anchor: 'Clash使用详解' },
                { target: '/tutorial/compare/tool/', anchor: '全平台工具对比' },
                { target: '/client/device/mac/', anchor: 'Mac机场推荐' }
              ],
              priority: 'P0'
            },
            {
              title: 'macOS 终端 Terminal / iTerm2 优雅走代理全流程指引',
              slug: 'macos-terminal-iterm2-zsh-proxy-guide',
              primaryKeyword: 'Mac终端走代理',
              secondaryKeywords: ['zsh配置代理别名', 'Mac命令行加速', 'Homebrew走代理', 'iTerm2代理配置'],
              longTailKeywords: [
                'Mac终端输入什么命令让命令行走代理', '在.zshrc中配置快捷函数一键开关终端代理', '解决Homebrew安装软件慢如蜗牛问题',
                '验证终端是否成功走代理的curl命令', 'Mac开发者效率翻倍终端代理实用技巧'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/device/mac/', anchor: 'Mac生态指南' },
                { target: '/client/app/clash/', anchor: 'TUN模式免终端命令' },
                { target: '/help/faq/slow/', anchor: '下载速率排查' }
              ],
              priority: 'P1'
            },
            {
              title: 'Mac 安装第三方代理软件提示“已损坏”或无法打开终极解决法',
              slug: 'fix-macos-app-damaged-cannot-open',
              primaryKeyword: 'Mac软件已损坏无法打开',
              secondaryKeywords: ['macOS绕过Gatekeeper', '未知开发者安全拦截', 'xattr清除隔离属性', '终端允许任何来源'],
              longTailKeywords: [
                '安装Clash提示文件已损坏移到废纸篓怎么解决', 'sudo spctl --master-disable命令开启任何来源',
                '用xattr -cr移除应用程序的隔离签名', '苹果系统对翻墙开源软件的安全拦截破解', '三分钟恢复Mac第三方代理软件正常运行'
              ],
              searchIntent: '故障',
              internalLinks: [
                { target: '/help/guide/security/', anchor: '开源安全与签名验证' },
                { target: '/client/device/mac/', anchor: 'Mac系统维护' },
                { target: '/client/app/clash/', anchor: '正版安装包获取' }
              ],
              priority: 'P1'
            },
            {
              title: 'Mac 开启增强模式（Enhanced Mode）与虚拟网卡权限配置实战',
              slug: 'mac-enhanced-mode-and-virtual-nic-setup',
              primaryKeyword: 'Mac增强模式配置',
              secondaryKeywords: ['macOS虚拟网卡安装', '增强模式系统权限', '接管全系统应用网络', 'Mac全局代理配置'],
              longTailKeywords: [
                'Clash在Mac上开启增强模式需要输入密码安装辅助程序', '增强模式接管所有非HTTP代理应用技巧', '解决Mac合盖休眠唤醒后增强模式断网',
                '安全卸载与重置macOS网络扩展助手', '极致网络控制：Mac增强模式高级实战'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/app/clash/', anchor: 'Clash高阶玩法' },
                { target: '/client/device/mac/', anchor: 'Mac机场推荐' },
                { target: '/help/faq/connect-fail/', anchor: '连接失败排查' }
              ],
              priority: 'P2'
            },
            {
              title: 'macOS 睡眠唤醒后网络代理卡死问题深度复盘与自动化脚本修复',
              slug: 'mac-sleep-wake-proxy-freeze-fix',
              primaryKeyword: 'Mac唤醒代理卡死',
              secondaryKeywords: ['苹果休眠断网修复', '睡眠唤醒后节点超时', '自动重启代理服务脚本', 'macOS网络恢复技巧'],
              longTailKeywords: [
                'Mac笔记本开盖后所有网页无法加载需要重开软件', '分析休眠时系统网络扩展被挂起的底层Bug', '编写LaunchAgent后台保活与重载脚本',
                '彻底根治Mac休眠网络假死的极客方案'
              ],
              searchIntent: '故障',
              internalLinks: [
                { target: '/help/faq/timeout/', anchor: '节点超时排障' },
                { target: '/client/device/mac/', anchor: 'Mac维护技巧' },
                { target: '/client/app/clash/', anchor: '客户端保持运行' }
              ],
              priority: 'P2'
            },
            {
              title: 'Mac 隔空投送（AirDrop）与局域网文件共享受代理影响排查',
              slug: 'mac-airdrop-and-smb-proxy-conflict-fix',
              primaryKeyword: 'AirDrop与代理冲突解决',
              secondaryKeywords: ['隔空投送搜不到设备', '局域网SMB共享被拦截', 'Bonjour协议代理放行', '本地局域网旁路规则'],
              longTailKeywords: [
                '开启代理后iPhone和Mac之间搜不到AirDrop', '如何配置分流规则排除Apple局域网发现协议', '修复Mac与NAS之间的SMB本地传输速度骤降',
                '苹果全家桶互联互通免受代理干扰完美方案'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/device/iphone/', anchor: 'iPhone全家桶配置' },
                { target: '/client/device/mac/', anchor: 'Mac使用指南' },
                { target: '/client/app/clash/', anchor: 'Clash局域网规则' }
              ],
              priority: 'P2'
            },
            {
              title: 'Mac 专业设计与音视频工作流出海：Figma、Notion 与 Midjourney 极速同步',
              slug: 'mac-designer-creative-workflow-proxy-setup',
              primaryKeyword: 'Mac设计与创作出海加速',
              secondaryKeywords: ['Figma加载卡顿解决', 'Notion同步秒开节点', 'Midjourney作图加速', '设计创意工作流梯子'],
              longTailKeywords: [
                'Mac上Figma设计稿加载不出来用什么节点', 'Notion多端同步秒开的低延迟专线配置', 'AI生图设计师出海专用高速机场推荐',
                '2026年Mac创意设计人群科学上网配置标杆'
              ],
              searchIntent: '购买',
              internalLinks: [
                { target: '/scenario/ai/chatgpt/', anchor: 'AI工具机场推荐' },
                { target: '/airport/type/premium/', anchor: '高端专线保障' },
                { target: '/client/device/mac/', anchor: 'Mac平台推荐' }
              ],
              priority: 'P3'
            }
          ]
        },
        {
          id: 'iphone',
          clusterId: '2.2.3',
          title: 'iPhone 机场推荐',
          path: '/client/device/iphone/',
          description: 'iOS 苹果手机专属机场推荐、海外社媒刷流、TikTok 与电池续航保活优化。',
          articles: [
            {
              title: '2026好用的iPhone苹果手机机场推荐：iOS必备丝滑不发热的高速梯子',
              slug: 'best-iphone-airports-2026',
              primaryKeyword: 'iPhone机场推荐',
              secondaryKeywords: ['苹果手机好用梯子', 'iOS稳定科学上网', 'iPhone高速翻墙机场', '苹果手机专用梯子'],
              longTailKeywords: [
                'iPhone手机翻墙用什么机场最好', '苹果手机最稳定的翻墙软件与节点', '2026年iPhone高赞低延迟梯子推荐',
                '不发烫省电的iOS翻墙机场合集', 'iPhone上容易导入节点的靠谱服务商', '苹果手机玩外网必备的五家机场'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/client/app/shadowrocket/', anchor: '小火箭Shadowrocket配置' },
                { target: '/airport/ranking/top/', anchor: '综合机场排行榜' },
                { target: '/client/device/iphone/', anchor: 'iPhone深度优化' }
              ],
              priority: 'P0'
            },
            {
              title: 'iPhone 免拔卡刷海外版 TikTok 完整实操步骤（2026最新有效）',
              slug: 'iphone-tiktok-no-sim-removal-guide-2026',
              primaryKeyword: 'iPhone免拔卡看TikTok',
              secondaryKeywords: ['苹果手机免拔卡TikTok', '小火箭配置伪装环境', 'TikTok换区教程', 'iOS免越狱刷TikTok'],
              longTailKeywords: [
                '国内iPhone怎么不拔SIM卡看TikTok视频', 'Shadowrocket安装TikTok重写规则与HTTPS证书', '配置原生节点IP完美通过TikTok风控检测',
                '解决TikTok黑屏加载不出来和无法点赞问题', '2026年最稳定可靠的苹果免拔卡出海指南'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/scenario/streaming/tiktok/', anchor: 'TikTok专用机场推荐' },
                { target: '/tech/ip/native/', anchor: '原生IP节点保障' },
                { target: '/client/app/shadowrocket/', anchor: '小火箭规则配置' }
              ],
              priority: 'P0'
            },
            {
              title: 'iPhone 科学上网耗电发烫元凶大起底：四招教你找回正常续航',
              slug: 'fix-iphone-battery-drain-overheating-vpn',
              primaryKeyword: 'iPhone翻墙耗电发烫解决',
              secondaryKeywords: ['苹果手机开代理掉电快', 'iOS翻墙省电优化', '关闭高频后台检测', '手机发烫发热降温'],
              longTailKeywords: [
                '为什么开着小火箭iPhone电量尿崩', '降低节点延迟测试频率减少网络芯片唤醒', '分应用精准分流避免国内应用滥用代理连接',
                'iPhone电池健康度保护与日常出海使用策略', '实测优化后整机续航延长三小时方案'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/client/app/shadowrocket/', anchor: '小火箭耗电优化' },
                { target: '/client/device/iphone/', anchor: 'iPhone机场推荐' },
                { target: '/help/faq/slow/', anchor: '高负荷连接诊断' }
              ],
              priority: 'P1'
            },
            {
              title: 'iOS 快捷指令联动：打开外网 App 自动开启代理、关闭自动断开',
              slug: 'ios-shortcuts-automation-proxy-toggle',
              primaryKeyword: 'iOS快捷指令自动开关代理',
              secondaryKeywords: ['iPhone自动化翻墙', '打开软件自动开梯子', '快捷指令代理自动化', '无感自动启停'],
              longTailKeywords: [
                '如何用iOS捷径实现打开Twitter自动连接代理', '退出油管和ChatGPT后自动断开代理省电', '一步一步配置苹果自动化个人任务图解',
                '让iPhone实现如同呼吸般自然的智能出海体验'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/device/iphone/', anchor: 'iPhone高阶玩法' },
                { target: '/client/app/shadowrocket/', anchor: 'Shadowrocket支持指令' },
                { target: '/scenario/ai/chatgpt/', anchor: 'ChatGPT智能启动' }
              ],
              priority: 'P1'
            },
            {
              title: 'iPhone 推送延迟解决：微信、钉钉与推特消息及时送达配置',
              slug: 'fix-iphone-apns-push-notifications-delay',
              primaryKeyword: 'iPhone推送通知延迟解决',
              secondaryKeywords: ['微信消息收不到排查', '苹果APNs推送走直连', '后台代理消息延迟', '通知推送优化设置'],
              longTailKeywords: [
                '为什么开启代理后微信来消息必须打开App才能收到', '配置分流规则强制苹果APNs服务器走国内直连', '解决锁屏状态下无法及时收到重要工作通知痛点',
                '打造零延迟全天候可靠的iOS消息推送通道'
              ],
              searchIntent: '故障',
              internalLinks: [
                { target: '/help/faq/connect-fail/', anchor: '连接中断排查' },
                { target: '/client/app/shadowrocket/', anchor: '规则直连设置' },
                { target: '/client/device/iphone/', anchor: 'iPhone维护技巧' }
              ],
              priority: 'P2'
            },
            {
              title: 'iOS 平台四大客户端横测：Shadowrocket、Quantumult X、Loon 与 Stash',
              slug: 'ios-four-major-proxy-clients-comparison',
              primaryKeyword: 'iOS四大代理软件对比',
              secondaryKeywords: ['圈X与小火箭对比', 'Loon和Stash选哪个', '苹果翻墙工具选型', 'iOS最强网络工具'],
              longTailKeywords: [
                '新手买小火箭还是买Quantumult X', 'Stash支持Clash规则是否适合直接迁移', '从上手难度、去广告能力、脚本扩展全方位测评',
                '2026年iPhone用户终极网络工具购买决策'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/client/app/shadowrocket/', anchor: 'Shadowrocket推荐' },
                { target: '/tutorial/compare/tool/', anchor: '全能客户端对比' },
                { target: '/client/device/iphone/', anchor: 'iPhone机场推荐' }
              ],
              priority: 'P2'
            },
            {
              title: 'iOS 系统热点共享给电脑翻墙：iPhone 做无线代理网关实战',
              slug: 'share-iphone-cellular-proxy-to-pc',
              primaryKeyword: 'iPhone热点共享代理',
              secondaryKeywords: ['手机开热点给电脑翻墙', 'iPhone当代理网关', '蜂窝网络代理共享', '出差应急电脑翻墙'],
              longTailKeywords: [
                '出差酒店电脑没网如何用手机热点翻墙', '小火箭开启代理共享并在笔记本上填入手机内网IP', '免去笔记本重复配置客户端的极简急救方案',
                '移动办公轻便出差网络搭建实战'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/device/windows/', anchor: 'Windows电脑连接' },
                { target: '/client/app/shadowrocket/', anchor: '小火箭共享设置' },
                { target: '/client/device/iphone/', anchor: 'iPhone使用技巧' }
              ],
              priority: 'P2'
            },
            {
              title: '国内行货 iPhone（国行机器）限制与翻墙注意事项全解',
              slug: 'chinese-version-iphone-restrictions-and-proxy',
              primaryKeyword: '国行iPhone翻墙限制',
              secondaryKeywords: ['国行苹果限制', '无线局域网权限拦截', '国行缺少FaceTime音频', '美版与国行翻墙对比'],
              longTailKeywords: [
                '国行苹果手机下载翻墙软件为什么老提示允许联网', '国内行货手机翻墙网络安全合规注意事项', '国行设备上访问某些海外服务限制排查',
                '安全文明使用iPhone科学上网规范'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/guide/security/', anchor: '翻墙安全红线' },
                { target: '/client/device/iphone/', anchor: 'iPhone机场推荐' },
                { target: '/tutorial/basic/what-is/', anchor: '合规与基础常识' }
              ],
              priority: 'P3'
            }
          ]
        },
        {
          id: 'android',
          clusterId: '2.2.4',
          title: 'Android 机场推荐',
          path: '/client/device/android/',
          description: '安卓手机专属机场推荐、v2rayNG/Clash Meta/SFA 配置与谷歌全家桶畅连。',
          articles: [
            {
              title: '2026年安卓手机好用的机场推荐：Android必备稳定高速翻墙梯子排行',
              slug: 'best-android-airports-2026',
              primaryKeyword: 'Android机场推荐',
              secondaryKeywords: ['安卓手机好用梯子', 'Android翻墙推荐', '安卓高速稳定机场', '华为小米安卓科学上网'],
              longTailKeywords: [
                '安卓手机用什么机场最稳定速度快', '支持v2rayNG一键导入的靠谱安卓梯子', '小米手机安装科学上网软件推荐',
                '2026年高口碑Android翻墙节点合集', '便宜省电的安卓手机梯子推荐', '不限速流畅刷油管的安卓机场推荐'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/client/app/sing-box/', anchor: '安卓端SFA安装' },
                { target: '/airport/ranking/top/', anchor: '综合机场排行榜' },
                { target: '/client/device/android/', anchor: '安卓系统调优' }
              ],
              priority: 'P0'
            },
            {
              title: '安卓主流客户端四选一：v2rayNG、Clash Meta for Android、SFA 与 Surfboard',
              slug: 'android-proxy-clients-comparison-v2rayng-clash',
              primaryKeyword: '安卓翻墙客户端对比',
              secondaryKeywords: ['v2rayNG好用吗', 'CMFA客户端评测', '安卓Surfboard体验', 'Android代理软件选型'],
              longTailKeywords: [
                '安卓手机翻墙到底装哪个客户端最省心', 'v2rayNG简单好用还是Clash规则强大', 'Surfboard拟态小火箭在安卓上的还原度',
                '内存消耗与后台保活能力真实实测', '2026安卓手机代理工具全面推荐'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/client/app/v2rayn/', anchor: 'v2ray生态解析' },
                { target: '/client/app/sing-box/', anchor: 'sing-box生态' },
                { target: '/client/device/android/', anchor: '安卓机场推荐' }
              ],
              priority: 'P0'
            },
            {
              title: '安卓手机后台保活与电量无损：解决锁屏自动杀后台断连难题',
              slug: 'android-background-keepalive-battery-optimization',
              primaryKeyword: '安卓代理软件后台保活',
              secondaryKeywords: ['安卓经常断线解决', '防止系统清理代理后台', '电池无限制设置', '自启动权限放行'],
              longTailKeywords: [
                '小米澎湃OS如何锁定代理软件不被杀后台', '华为鸿蒙系统应用自启动与忽略电池优化设置', 'OPPO/vivo保活白名单一网打尽',
                '彻底根治锁屏后几分钟自动断开翻墙的通病'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/device/android/', anchor: '安卓系统维护' },
                { target: '/help/faq/connect-fail/', anchor: '频繁断线排查' },
                { target: '/client/app/sing-box/', anchor: 'SFA省电优化' }
              ],
              priority: 'P1'
            },
            {
              title: '华为鸿蒙（HarmonyOS）手机翻墙配置与谷歌全家桶服务安装',
              slug: 'huawei-harmonyos-proxy-and-gms-installation',
              primaryKeyword: '华为鸿蒙手机翻墙',
              secondaryKeywords: ['HarmonyOS安装梯子', '华为手机安装GMS', '出海谷歌服务框架', '鸿蒙纯血系统代理方案'],
              longTailKeywords: [
                '华为Mate与Pura手机怎么配置科学上网', '免Root安装Google Play商店与登录账号', '利用出海空间或GBox运行海外应用实测',
                '华为用户出海全套解决方案2026'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/scenario/ai/chatgpt/', anchor: 'ChatGPT安卓客户端安装' },
                { target: '/client/device/android/', anchor: '安卓平台推荐' },
                { target: '/help/guide/security/', anchor: '安卓软件安全' }
              ],
              priority: 'P1'
            },
            {
              title: '安卓分应用代理（Per-App Proxy）：让银行炒股软件走直连防风控',
              slug: 'android-per-app-proxy-routing-settings',
              primaryKeyword: '安卓分应用代理设置',
              secondaryKeywords: ['排除特定应用走代理', '银行软件防封号分流', '国内微信直连设置', '应用白名单黑名单模式'],
              longTailKeywords: [
                '怎么在安卓客户端里勾选只让Chrome走代理', '招商银行支付宝提示境外IP登录风险解决', '开启分应用代理后国内打车点外卖不再定位飘移',
                '安卓系统最纯粹的分流操作指南'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/help/guide/security/', anchor: '账号安全与防风控' },
                { target: '/client/device/android/', anchor: '安卓机场推荐' },
                { target: '/client/app/v2rayn/', anchor: 'v2rayNG分应用操作' }
              ],
              priority: 'P2'
            },
            {
              title: 'Google Play 商店提示“从服务器检索信息时出错”彻底根治教程',
              slug: 'fix-google-play-store-server-error-df-dferh',
              primaryKeyword: 'Google Play商店报错解决',
              secondaryKeywords: ['谷歌商店打不开解决', 'Play商店清除数据缓存', '谷歌账号无法同步', 'Google服务框架报错'],
              longTailKeywords: [
                '打开Google Play白屏转圈无网络连接排查', '切换原生美区节点清除Google Play服务缓存', '解决DF-DFERH-01报错代码实战',
                '安卓用户畅玩海外官方应用市场全流程'
              ],
              searchIntent: '故障',
              internalLinks: [
                { target: '/tech/ip/native/', anchor: '原生IP机场推荐' },
                { target: '/help/faq/timeout/', anchor: '节点超时修复' },
                { target: '/client/device/android/', anchor: '安卓系统调优' }
              ],
              priority: 'P2'
            },
            {
              title: '安卓热点共享 VPN：开启手机热点让任天堂 Switch / 智能手表顺畅翻墙',
              slug: 'android-hotspot-vpn-tethering-guide',
              primaryKeyword: '安卓热点共享VPN',
              secondaryKeywords: ['手机热点开代理给Switch', 'VPN Hotspot免Root工具', '安卓开启全网热点代理', 'Switch联机加速'],
              longTailKeywords: [
                '普通安卓热点为什么无法把翻墙流量共享出去', '利用VPN Hotspot开源软件绕过系统限制', '任天堂Switch连接手机热点更新系统与联机',
                '户外随时随地打造专属海外移动热点'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/scenario/game/accel/', anchor: '游戏加速机场推荐' },
                { target: '/client/device/android/', anchor: '安卓平台玩法' },
                { target: '/client/device/router/', anchor: '软路由全屋共享' }
              ],
              priority: 'P2'
            },
            {
              title: '安卓安全防诈提醒：警惕第三方论坛“破解版梯子”内置木马挖矿',
              slug: 'android-cracked-vpn-trojan-malware-warning',
              primaryKeyword: '安卓破解版梯子木马警示',
              secondaryKeywords: ['破解版翻墙软件危害', '安卓木马病毒排查', '窃取短信验证码木马', '官方开源渠道下载'],
              longTailKeywords: [
                '网盘里的各种破解版不限速加速器能不能用', '内置挖矿脚本与后台暗中窃取相册隐私曝光', '如何在GitHub官方Release下载纯净开源APK',
                '保护安卓手机资产与资金安全的铁律'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/guide/security/', anchor: '翻墙安全与防木马' },
                { target: '/help/guide/fake-website/', anchor: '防诈骗指南' },
                { target: '/client/device/android/', anchor: '正规安全机场' }
              ],
              priority: 'P3'
            }
          ]
        },
        {
          id: 'router',
          clusterId: '2.2.5',
          title: '路由器与电视机场',
          path: '/client/device/router/',
          description: '软路由（OpenWrt/iStoreOS）全屋智能翻墙、Apple TV 与安卓电视盒子 4K 解锁。',
          articles: [
            {
              title: '2026软路由与电视盒子机场推荐：全屋智能翻墙与Apple TV 4K流媒体首选',
              slug: 'best-router-and-tv-box-airports-2026',
              primaryKeyword: '路由器电视机场推荐',
              secondaryKeywords: ['软路由机场推荐', 'Apple TV翻墙梯子', '电视盒子看Netflix机场', '全屋翻墙不限设备数'],
              longTailKeywords: [
                '家里装了软路由配什么机场最好', '电视看油管4K高码率超清不卡顿机场', 'Apple TV安装小火箭专属专线梯子',
                '不限连接设备数量的高带宽家庭机场', '2026年适合全家共享的优质大流量梯子', '软路由长期挂机超高稳定性机场'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/scenario/streaming/all/', anchor: '流媒体解锁机场推荐' },
                { target: '/tech/line/iepl/', anchor: '大带宽专线保障' },
                { target: '/airport/ranking/top/', anchor: '综合机场排行榜' }
              ],
              priority: 'P0'
            },
            {
              title: 'OpenWrt / iStoreOS 软路由一键安装 OpenClash 全套保姆级指南',
              slug: 'openwrt-openclash-complete-installation-guide',
              primaryKeyword: 'OpenClash配置教程',
              secondaryKeywords: ['软路由安装OpenClash', 'iStoreOS科学上网', 'OpenClash内核更新', '软路由全屋分流'],
              longTailKeywords: [
                '软路由怎么导入机场订阅生成配置', 'OpenClash选择Fake-IP还是Redir-Host模式', '一键解决DNS污染与国内网络回环问题',
                '全家连上WiFi自动翻墙且国内秒开实测', '2026年软路由新手零门槛玩转OpenClash'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/device/router/', anchor: '路由器机场推荐' },
                { target: '/client/app/clash/', anchor: 'Clash核心规则' },
                { target: '/help/faq/slow/', anchor: '路由器性能调优' }
              ],
              priority: 'P0'
            },
            {
              title: 'Apple TV tvOS 17/18 翻墙终极方案：小火箭与 Surge 原生客户端安装',
              slug: 'apple-tv-tvos-native-proxy-installation',
              primaryKeyword: 'Apple TV翻墙教程',
              secondaryKeywords: ['tvOS小火箭安装', 'Apple TV配置代理', 'Apple TV看Netflix', '大屏电视看油管'],
              longTailKeywords: [
                'Apple TV在App Store登录美区账号下载小火箭', '手机端小火箭一键隔空投送配置到Apple TV', '电视上开启全局代理与智能分流实操',
                '告别软路由直接在Apple TV盒子上畅享4K HDR', '打造地表最强客厅家庭影院网络方案'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/app/shadowrocket/', anchor: 'Shadowrocket使用技巧' },
                { target: '/scenario/streaming/netflix/', anchor: 'Netflix 4K原生解锁' },
                { target: '/client/device/router/', anchor: '电视翻墙指南' }
              ],
              priority: 'P1'
            },
            {
              title: '安卓智能电视与外贸电视盒子（Chromecast / 索尼电视）翻墙教程',
              slug: 'android-tv-chromecast-proxy-setup-guide',
              primaryKeyword: '安卓电视安装梯子教程',
              secondaryKeywords: ['索尼电视翻墙', 'Chromecast with Google TV配置', '电视安装v2rayNG', '电视沙发管家安装Clash'],
              longTailKeywords: [
                '智能电视怎么用U盘安装代理软件APK', '没有触屏电视遥控器如何操作代理界面', '利用ADB命令行给电视盒子推送订阅链接',
                '解决电视开机无法启动代理问题', '2026大屏安卓电视看外网完整攻略'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/device/android/', anchor: '安卓客户端基础' },
                { target: '/scenario/streaming/youtube/', anchor: 'YouTube大屏高码率' },
                { target: '/client/device/router/', anchor: '路由器与电视机场' }
              ],
              priority: 'P1'
            },
            {
              title: '主路由与旁路由架构抉择：家庭全屋翻墙到底哪种拓扑最稳定',
              slug: 'main-router-vs-bypass-router-topology',
              primaryKeyword: '主路由还是旁路由好',
              secondaryKeywords: ['旁路由网络拓扑', '旁路由网关设置', '家庭网络架构设计', '旁路由断网不影响主网'],
              longTailKeywords: [
                '什么是旁路由（单臂路由）工作原理', '旁路由挂了全家断网怎么办的防翻车方案', '设置指定设备网关指向旁路由实现精准翻墙',
                '主路由硬路由跑满千兆WiFi与旁路由分流协同', '家庭千兆光纤网络架构最优布线指南'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/tutorial/compare/tool/', anchor: '网络架构对比' },
                { target: '/client/device/router/', anchor: '软路由机场选型' },
                { target: '/tech/line/bgp/', anchor: '大带宽承载' }
              ],
              priority: 'P2'
            },
            {
              title: '软路由 DNS 泄漏与防污染实战：MosDNS 搭配 OpenClash 完美分流',
              slug: 'openclash-mosdns-dns-leak-protection',
              primaryKeyword: '软路由MosDNS防污染',
              secondaryKeywords: ['MosDNS分流配置', '解决DNS泄漏问题', '国内CDN精准解析', 'Fake-IP防污染优化'],
              longTailKeywords: [
                '为什么全屋翻墙后国内网页打不开或者定位到国外', '利用MosDNS实现国内走阿里腾讯DNS国外走DoH', '彻底消除DNS污染导致的网页白屏',
                '专业级家庭DNS解析缓存加速实测'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/help/guide/security/', anchor: 'DNS隐私与安全' },
                { target: '/client/device/router/', anchor: '软路由进阶' },
                { target: '/help/faq/slow/', anchor: '网络延迟排查' }
              ],
              priority: 'P2'
            },
            {
              title: '家庭智能家居（米家/HomeKit）与路由器代理冲突排查与隔离',
              slug: 'smart-home-iot-proxy-isolation-fix',
              primaryKeyword: '智能家居代理冲突解决',
              secondaryKeywords: ['米家设备连不上网排查', 'HomeKit远程控制失效', 'IoT智能家居白名单', '局域网MAC地址绕过代理'],
              longTailKeywords: [
                '开启全屋代理后扫地机器人和智能摄像头频繁离线', '在OpenClash中按MAC地址放行所有智能家居直连', '解决苹果HomePod中枢远程连接缓慢问题',
                '智能家居与科学上网互不干扰和谐共存'
              ],
              searchIntent: '故障',
              internalLinks: [
                { target: '/help/faq/connect-fail/', anchor: '设备连接异常' },
                { target: '/client/device/router/', anchor: '软路由配置' },
                { target: '/tutorial/usage/config/', anchor: '局域网规则' }
              ],
              priority: 'P2'
            },
            {
              title: '老旧无线路由器刷机翻墙：Padavan老毛子固件低成本拯救吃灰路由',
              slug: 'padavan-old-router-flashing-guide',
              primaryKeyword: '老路由器刷机翻墙',
              secondaryKeywords: ['Padavan老毛子固件', '低成本翻墙路由', '斐讯K2P刷机', '小内存路由翻墙技巧'],
              longTailKeywords: [
                '几十块钱的旧路由器能不能刷机翻墙', 'Padavan固件内置Shadowsocks/Clash配置步骤', '小内存路由器防崩溃降载优化',
                '宿舍与租房党百元内搞定全屋翻墙指南'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/airport/price/cheap/', anchor: '便宜低配机场' },
                { target: '/client/device/router/', anchor: '路由器全家桶' },
                { target: '/tutorial/usage/buy/', anchor: '入门选购' }
              ],
              priority: 'P3'
            }
          ]
        }
      ]
    }
  ]
};
