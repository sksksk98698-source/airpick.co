module.exports = {
  id: 'tutorial',
  title: '教程知识',
  path: '/tutorial/',
  description: '零基础新手入门宝典、购买注册实操、订阅分发导入、高级配置调优与深度技术横向对比。',
  subcategories: [
    {
      id: 'basic',
      title: '基础概念',
      path: '/tutorial/basic/',
      clusters: [
        {
          id: 'what-is',
          clusterId: '5.1.1',
          title: '什么是机场',
          path: '/tutorial/basic/what-is/',
          description: '通俗易懂拆解翻墙“机场”的由来、核心运作原理、成本构成与黑话起源。',
          articles: [
            {
              title: '什么是机场：翻墙黑话由来、网络代理原理与新手入门全解',
              slug: 'what-is-an-airport-proxy-complete-guide',
              primaryKeyword: '什么是机场',
              secondaryKeywords: ['机场翻墙是什么意思', '科学上网机场原理', '为什么叫机场', '新手看懂梯子黑话'],
              longTailKeywords: [
                '网络上常说的机场到底是个什么东西', '为什么科学上网软件节点服务商叫机场', 'Shadowsocks小飞机图标与机场的命名渊源',
                '2026年写给零基础新手的机场科普第一课', '机场是怎么帮你打开外网网页的底层原理'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/tutorial/basic/vs-vpn/', anchor: '机场与传统VPN区别' },
                { target: '/tutorial/basic/terms/', anchor: '核心网络术语全解' },
                { target: '/airport/ranking/top/', anchor: '综合机场排行榜' }
              ],
              priority: 'P0'
            },
            {
              title: '机场底层运作机制拆解：从本地客户端到境外落地服务器的完整旅程',
              slug: 'how-airports-work-under-the-hood',
              primaryKeyword: '机场底层工作原理',
              secondaryKeywords: ['代理数据包传输过程', '入口机房与落地机房', '加密隧道如何过墙', '翻墙网络拓扑图解'],
              longTailKeywords: [
                '浏览器发起请求后数据包都经过了哪些节点', '国内中转服务器如何扮演快递中转站角色',
                '境外落地服务器如何代你向Google请求网页并回传', '通俗易懂的十张图解网络代理全流程'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/tech/line/bgp/', anchor: 'BGP中转架构' },
                { target: '/tech/line/iepl/', anchor: 'IEPL专线架构' },
                { target: '/tutorial/basic/what-is/', anchor: '什么是机场' }
              ],
              priority: 'P0'
            },
            {
              title: '机场开销与商业模式大起底：为什么几块钱的机场多半容易跑路',
              slug: 'airport-business-model-and-costs-breakdown',
              primaryKeyword: '机场商业模式与成本',
              secondaryKeywords: ['机场服务器租用成本', '为什么机场会跑路', '薄利多销还是资金盘', '机场财务运营内幕'],
              longTailKeywords: [
                '搭建一个正规机场一个月究竟需要烧多少钱', '正规专线机房、落地机房、面板授权与运维开销',
                '超低价机场如何通过滚雪球资金盘运作最终卷款', '看清商业本质才能在买梯子时不被坑'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/guide/scam/', anchor: '跑路预警十大前兆' },
                { target: '/help/guide/buying/', anchor: '新手防坑选购法则' },
                { target: '/airport/price/cheap/', anchor: '平价便宜机场' }
              ],
              priority: 'P1'
            },
            {
              title: '机场面板系统演进史：SSPanel、V2Board 与自研系统的技术迭代',
              slug: 'airport-panel-systems-evolution-sspanel-v2board',
              primaryKeyword: '机场面板系统解析',
              secondaryKeywords: ['SSPanel面板特点', 'V2Board系统优势', '自研面板安全性', '机场前端与后端通信'],
              longTailKeywords: [
                '为什么大部分机场的用户中心后台界面都长得差不多', '开源面板SSPanel与V2Board的功能优缺点对比',
                '自研闭源面板大厂的技术实力与安全性评估', '窥探翻墙服务商背后的软件生态架构'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/tutorial/usage/buy/', anchor: '用户后台注册实操' },
                { target: '/help/guide/security/', anchor: '账号数据安全' },
                { target: '/tutorial/basic/what-is/', anchor: '机场基础科普' }
              ],
              priority: 'P1'
            },
            {
              title: '翻墙合法合规常识普法：普通网民查资料、科研出海的法律风险边界',
              slug: 'cross-border-network-legal-boundaries-guide',
              primaryKeyword: '科学上网法律风险常识',
              secondaryKeywords: ['翻墙违法吗普法', '行政处罚常见原因', '科研查资料安全边界', '文明合规上网守则'],
              longTailKeywords: [
                '我国法律对国际出入口信道接入的明确规定', '什么情况下使用代理软件会被网安部门关注并警告',
                '严禁在海外平台发表与传播违法违规言论的绝对红线', '作为科研与外贸从业者如何合法规范开展工作'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/guide/security/', anchor: '安全防线与隐私保护' },
                { target: '/about', anchor: '关于 AirPick 客观准则' },
                { target: '/tutorial/basic/what-is/', anchor: '什么是机场' }
              ],
              priority: 'P2'
            },
            {
              title: '机场与自建梯子终极算账：技术小白千万不要盲目跟风买 VPS 自建',
              slug: 'airport-vs-self-hosted-vps-cost-benefit',
              primaryKeyword: '机场与自建梯子对比',
              secondaryKeywords: ['为什么不建议自建翻墙', '自己买VPS搭梯子坑多', 'IP被封换一次上百元', '省时省心选购机场'],
              longTailKeywords: [
                '网上铺天盖地的自建翻墙教程到底坑了多少小白', '一台VPS只有一个IP被墙之后立刻全家断网的尴尬',
                '维护Linux服务器安全、防黑客爆破的巨大精力消耗', '为什么专业的事情交给专业机场才是成熟之选'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/airport/ranking/top/', anchor: '精选机场排行榜' },
                { target: '/help/guide/buying/', anchor: '选购防坑指南' },
                { target: '/tutorial/basic/what-is/', anchor: '机场原理' }
              ],
              priority: 'P2'
            },
            {
              title: '机场主跑路背后的四大原因剖析：被抓、亏损、内讧与恶意卷款',
              slug: 'four-reasons-behind-airport-exit-scams',
              primaryKeyword: '机场主跑路原因剖析',
              secondaryKeywords: ['为什么很多机场开不久', '机场被打击抓捕案例', '资金链断裂亏损', '黑心老板恶意卷款'],
              longTailKeywords: [
                '翻墙行业高危灰色属性导致的人员安全风险', '盲目打价格战导致连服务器续费租金都付不起的窘境',
                '合伙人分赃不均删除数据库引发的悲剧', '如何挑选抗风险能力最强的老牌长青服务商'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/guide/scam/', anchor: '跑路预警与防坑' },
                { target: '/airport/ranking/stable/', anchor: '运营多年老牌机场' },
                { target: '/tutorial/basic/what-is/', anchor: '机场科普' }
              ],
              priority: 'P2'
            },
            {
              title: '机场生态全景行话大辞典：一条龙搞懂测速图、审计规则与水友群日常',
              slug: 'airport-slang-and-culture-dictionary',
              primaryKeyword: '机场行话黑话大辞典',
              secondaryKeywords: ['看懂毒药测速图', '审计规则是什么', 'TOS服务条款', '水友群常见梗全解'],
              longTailKeywords: [
                '测速图里的黄绿红柱子到底代表什么意思', '为什么很多机场明确写着禁止政治与BT审计规则',
                '什么是工单对线、拔线、炸服、补差价等行业术语', '让你瞬间从小白变成资深老司机的行话全书'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/tutorial/basic/terms/', anchor: '核心网络术语' },
                { target: '/help/guide/buying/', anchor: '选购常识' },
                { target: '/tutorial/basic/what-is/', anchor: '机场基础' }
              ],
              priority: 'P3'
            }
          ]
        },
        {
          id: 'vs-vpn',
          clusterId: '5.1.2',
          title: '机场与 VPN 区别',
          path: '/tutorial/basic/vs-vpn/',
          description: '传统加密 VPN 与现代分流代理机场全维度对比、选型建议与误区澄清。',
          articles: [
            {
              title: '机场与传统VPN区别全景对比：ExpressVPN/NordVPN在大陆为什么不好用',
              slug: 'airports-vs-traditional-vpn-complete-comparison',
              primaryKeyword: '机场与VPN区别',
              secondaryKeywords: ['翻墙用机场还是VPN', 'ExpressVPN连不上排查', '分流代理与全局加密区别', '大陆科学上网选型'],
              longTailKeywords: [
                '为什么海外名气巨大的NordVPN在境内经常连不上', '传统VPN协议特征明显被GFW精准狙杀的原因',
                '机场代理如何通过伪装混淆在封锁下如履平地', '2026年出海工具选型的终极结论与建议'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/tutorial/basic/what-is/', anchor: '什么是机场' },
                { target: '/tutorial/compare/protocol/', anchor: '代理协议演进' },
                { target: '/airport/ranking/top/', anchor: '综合机场排行榜' }
              ],
              priority: 'P0'
            },
            {
              title: '技术原理大起底：传统 VPN 隧道加密 vs 现代代理分流协议深度拆解',
              slug: 'vpn-tunnel-encryption-vs-proxy-routing-mechanisms',
              primaryKeyword: 'VPN与代理技术原理对比',
              secondaryKeywords: ['IPsec与OpenVPN原理', 'Shadowsocks分流机制', '七层应用代理与三层网络隧道', '为什么代理网速更快'],
              longTailKeywords: [
                '传统VPN将所有网络流量打包封包的巨大开销', '现代机场代理如何做到只把被墙网站定向转发',
                '为什么分流代理看国内网站秒开而VPN国内全卡死', '网络工程师视角深度对比两代技术的优劣'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/tutorial/basic/terms/', anchor: '网络术语全解' },
                { target: '/client/app/clash/', anchor: '智能分流配置' },
                { target: '/tutorial/basic/vs-vpn/', anchor: '机场与VPN对比' }
              ],
              priority: 'P0'
            },
            {
              title: '安全隐私对比：无日志 VPN 真比机场更安全吗？洋葱路由与数字追踪真相',
              slug: 'privacy-security-vpn-vs-airports-truth',
              primaryKeyword: 'VPN与机场安全性对比',
              secondaryKeywords: ['机场能看到我的密码吗', 'VPN无日志承诺真实性', 'HTTPS端到端加密保护', '匿名翻墙安全等级'],
              longTailKeywords: [
                '使用机场上网机场主能不能截获你的账号密码', '在全站HTTPS普及的今天代理服务器能看到什么数据',
                '欧美老牌VPN号称绝对零日志是否真的无懈可击', '根据个人安全敏感级别挑选合适工具的指南'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/guide/security/', anchor: '翻墙安全与隐私全书' },
                { target: '/tutorial/basic/what-is/', anchor: '机场运作机制' },
                { target: '/tutorial/basic/vs-vpn/', anchor: '对比专栏' }
              ],
              priority: 'P1'
            },
            {
              title: '网速与延迟天壤之别：为什么说传统 VPN 永远打不过专线机场',
              slug: 'why-vpns-can-never-beat-dedicated-airports-in-speed',
              primaryKeyword: 'VPN与专线机场速度对比',
              secondaryKeywords: ['为什么VPN延迟超高', '专线机场百兆跑满', '晚高峰丢包实测', '看4K视频工具选型'],
              longTailKeywords: [
                '传统VPN经过重重强加密算法计算导致的巨大延迟损耗', '专线机场物理直达与轻量级混淆协议的高吞吐碾压',
                '玩游戏看8K超清视频为什么绝对不能选传统VPN', '实测测速曲线与缓冲延迟直观对比'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/tech/line/iepl/', anchor: 'IEPL专线推荐' },
                { target: '/scenario/streaming/youtube/', anchor: 'YouTube 4K秒开' },
                { target: '/tutorial/basic/vs-vpn/', anchor: '机场与VPN区别' }
              ],
              priority: 'P1'
            },
            {
              title: '智能分流的降维打击：为什么用传统 VPN 时微信淘宝连不上',
              slug: 'smart-routing-superiority-over-global-vpn',
              primaryKeyword: '智能分流相比VPN优势',
              secondaryKeywords: ['VPN导致微信收发图片慢', '百度定位到国外解决', '国内直连海外走代理', '分流规则降维打击'],
              longTailKeywords: [
                '全局VPN导致国内所有App加载慢如牛步的痛苦体验', '机场规则分流如何做到国内百度知乎秒开国外油管秒开',
                '免去频繁手动断开与重连网络的人性化极致体验', '现代代理技术在日常使用中的绝对统治力'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/client/app/clash/', anchor: 'Clash分流策略' },
                { target: '/client/device/windows/', anchor: 'Windows最佳配置' },
                { target: '/tutorial/basic/vs-vpn/', anchor: '机场与VPN对比' }
              ],
              priority: 'P2'
            },
            {
              title: '什么场景依然必须使用传统 VPN：跨国公司远程内网接入与金融级合规',
              slug: 'when-to-still-use-traditional-enterprise-vpn',
              primaryKeyword: '什么情况仍需使用传统VPN',
              secondaryKeywords: ['企业内网VPN打卡', 'Cisco AnyConnect配置', '公司私有网络访问', '企业合规专线VPN'],
              longTailKeywords: [
                '为什么公司上班远程连接内网OA系统必须用VPN', '企业级安全网关认证与数据物理加密防商业泄密',
                '将机场代理与公司企业VPN共存搭配的配置技巧', '理性看待两种工具在不同工作场景下的分工'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/client/device/windows/', anchor: '双网卡内网外网共存' },
                { target: '/help/guide/security/', anchor: '企业网络安全' },
                { target: '/tutorial/basic/vs-vpn/', anchor: '机场与VPN对比' }
              ],
              priority: 'P2'
            },
            {
              title: '价格与收费陷阱：一年上千元的欧美大牌 VPN 究竟是不是智商税',
              slug: 'expensive-western-vpns-pricing-traps-in-china',
              primaryKeyword: '欧美大牌VPN价格智商税',
              secondaryKeywords: ['ExpressVPN一年一百多美金', '为什么在大陆无法使用还死贵', '退款维权困难案例', '国人专属机场高性价比'],
              longTailKeywords: [
                'Google搜索前排铺天盖地的欧美VPN评测广告真实内幕', '利用巨额Affiliate佣金诱导国内用户购买却无法连接',
                '相同价格买专线机场能享受十倍以上体验的真实对比', '破除“洋品牌VPN一定比本土机场好”的盲信'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/guide/buying/', anchor: '新手防坑买梯子' },
                { target: '/airport/ranking/top/', anchor: '综合机场排行榜' },
                { target: '/tutorial/basic/vs-vpn/', anchor: '机场与VPN区别' }
              ],
              priority: 'P2'
            },
            {
              title: '未来翻墙形态展望：基于 WireGuard、MASQUE 与 QUIC 的下一代网络代理',
              slug: 'future-of-censorship-circumvention-wireguard-quic',
              primaryKeyword: '未来翻墙技术发展趋势',
              secondaryKeywords: ['WireGuard协议演进', 'HTTP3与QUIC协议翻墙', 'MASQUE代理新架构', '抗审查技术未来展望'],
              longTailKeywords: [
                '底层网络协议在抗审查与高性能方面的最新研究前沿', '传统VPN与现代分流代理在未来是否会走向全面融合',
                '作为普通网民如何以最小成本享受技术进步带来的红利', '写给网络爱好者与极客的前瞻深度解析'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/tutorial/compare/protocol/', anchor: '现代协议深度解析' },
                { target: '/client/app/sing-box/', anchor: 'sing-box引领未来' },
                { target: '/tutorial/basic/vs-vpn/', anchor: '对比专栏' }
              ],
              priority: 'P3'
            }
          ]
        },
        {
          id: 'terms',
          clusterId: '5.1.3',
          title: '节点术语解释',
          path: '/tutorial/basic/terms/',
          description: '扫清一切技术障碍，权威释义倍率、丢包、RTT、BGP、直连与 Fake-IP。',
          articles: [
            {
              title: '科学上网核心术语权威大字典：零基础看懂节点参数与选线指标',
              slug: 'complete-glossary-of-proxy-networking-terms',
              primaryKeyword: '节点术语解释',
              secondaryKeywords: ['翻墙参数通俗全解', '什么是节点倍率', 'Ping与丢包率含义', '新手读懂机场节点列表'],
              longTailKeywords: [
                '看懂机场节点名字后面的各种数字和英文后缀', '2026年最新科学上网专业术语速查手册',
                '搞懂每一个核心参数不再被商家虚标忽悠', '从新手入门到老鸟进阶必备工具书'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/tutorial/basic/what-is/', anchor: '什么是机场' },
                { target: '/tutorial/compare/line/', anchor: '线路深度横向对比' },
                { target: '/airport/ranking/top/', anchor: '综合机场排行榜' }
              ],
              priority: 'P0'
            },
            {
              title: '节点倍率（Multiplier）彻底搞懂：1倍、0.1倍与5倍率的扣费账单计算',
              slug: 'node-multiplier-explained-in-depth',
              primaryKeyword: '节点倍率什么意思',
              secondaryKeywords: ['0.1倍率节点省流量', '高倍率专线扣费', '节点倍率计算公式', '防流量偷跑技巧'],
              longTailKeywords: [
                '为什么我明明只看了1G视频机场后台扣了3G流量', '低倍率节点为什么适合大文件下载和挂机',
                '高倍率专线节点的带宽品质与资费平衡法则', '手把手教你根据倍率精准分配日常流量消耗'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/airport/price/pay-as-you-go/', anchor: '按量计费倍率陷阱' },
                { target: '/tech/line/iepl/', anchor: '高端专线倍率' },
                { target: '/tutorial/basic/terms/', anchor: '节点术语速查' }
              ],
              priority: 'P0'
            },
            {
              title: 'Ping、RTT 与真连接延迟（True Latency）：测速面板上的数字到底是啥',
              slug: 'ping-rtt-vs-true-connect-latency-explained',
              primaryKeyword: '真连接延迟与Ping区别',
              secondaryKeywords: ['节点延迟怎么看', '为什么Ping低但连不上', 'HTTP握手测试原理', '挑选最低延迟节点'],
              longTailKeywords: [
                '客户端点测试延迟发出的ICMP数据包和HTTP请求差异', '很多中转节点测试延迟只有10ms为什么实际速度很慢',
                '如何准确测试从本地到境外落地网站的完整往返时间（RTT）', '掌握科学测速避免被假低延迟欺骗'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/client/app/clash/', anchor: 'Clash测速机制' },
                { target: '/client/app/v2rayn/', anchor: 'v2rayN真连接测试' },
                { target: '/tutorial/basic/terms/', anchor: '节点术语速查' }
              ],
              priority: 'P1'
            },
            {
              title: '丢包率（Packet Loss）与网络抖动（Jitter）：为什么丢包比延迟高更致命',
              slug: 'packet-loss-and-jitter-explained',
              primaryKeyword: '丢包率与网络抖动解析',
              secondaryKeywords: ['玩游戏老卡顿丢包原因', '开视频会议断音抖动', '丢包率低于1%的意义', 'TCP重传导致网页假死'],
              longTailKeywords: [
                '延迟100ms但零丢包 vs 延迟30ms但丢包5%哪个更好', '为什么丢包会导致视频频繁降画质和游戏瞬间瞬移',
                '利用PingPlotter诊断丢包发生在哪个骨干网节点', '挑选平稳不抖动优质线路的核心指标'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/faq/slow/', anchor: '丢包卡顿深度排查' },
                { target: '/tech/line/iepl/', anchor: '专线零丢包保障' },
                { target: '/tutorial/basic/terms/', anchor: '节点术语速查' }
              ],
              priority: 'P1'
            },
            {
              title: 'Fake-IP 与 Redir-Host 模式通俗讲解：Clash 核心的两种 DNS 解析哲学',
              slug: 'fake-ip-vs-redir-host-dns-explained',
              primaryKeyword: 'Fake-IP与Redir-Host区别',
              secondaryKeywords: ['Clash DNS模式选择', 'Fake-IP秒开网页原理', '避免DNS污染机制', '198.18虚拟IP网段'],
              longTailKeywords: [
                '为什么开启Clash后查询域名IP会显示198.18.x.x', 'Fake-IP如何大幅减少本地DNS查询耗时实现网页秒开',
                '哪种特殊网络软件和游戏联机环境更适合Redir-Host', '一篇文章彻底解开许多人对Fake-IP的恐惧和误解'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/client/app/clash/', anchor: 'Clash DNS高级配置' },
                { target: '/client/device/router/', anchor: '软路由OpenClash设置' },
                { target: '/tutorial/basic/terms/', anchor: '核心网络术语' }
              ],
              priority: 'P2'
            },
            {
              title: 'TUN、TAP 与 系统代理（System Proxy）：代理接管系统的三种底层形态',
              slug: 'tun-tap-vs-system-proxy-modes',
              primaryKeyword: 'TUN模式与系统代理区别',
              secondaryKeywords: ['虚拟网卡接管全部网络', '系统代理只管浏览器', '命令行软件走代理', '游戏TUN模式配置'],
              longTailKeywords: [
                '系统代理只是修改注册表HTTP代理的局限性剖析', 'TUN模式虚拟网卡如何直接在驱动层劫持所有网络流量',
                '为什么玩游戏、跑Git终端、用特定桌面软件必须开TUN', '掌握现代客户端最强大的全局接管武器'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/client/app/clash/', anchor: 'Clash TUN模式开启' },
                { target: '/client/device/windows/', anchor: 'Windows终端代理' },
                { target: '/tutorial/basic/terms/', anchor: '节点术语速查' }
              ],
              priority: 'P2'
            },
            {
              title: '落地节点与入口节点概念辨析：为什么说“入口决定延迟，落地决定解锁”',
              slug: 'ingress-vs-egress-nodes-concept',
              primaryKeyword: '入口节点与落地节点区别',
              secondaryKeywords: ['入口决定延迟落地决定解锁', '中转机与出口机关系', '跨省接入损耗', '多入口智能调度'],
              longTailKeywords: [
                '你连接的第一个IP地址到底是不是国外的服务器', '国内入口机房到境外落地机房之间是怎么通信的',
                '为什么看流媒体只取决于落地节点而打游戏重点看入口', '网络老鸟选线口诀深度拆解'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/tech/line/bgp/', anchor: 'BGP中转架构' },
                { target: '/tech/ip/native/', anchor: '原生落地IP' },
                { target: '/tutorial/basic/terms/', anchor: '术语速查' }
              ],
              priority: 'P2'
            },
            {
              title: 'ASN、IDC 机房与家庭宽带（ISP）：查询节点背后的网络身份标识',
              slug: 'asn-idc-and-isp-network-identification',
              primaryKeyword: 'ASN自治系统与ISP识别',
              secondaryKeywords: ['查询节点ASN号码', '数据中心IP标识', '家用宽带ISP判定', '风控系统识别IP机制'],
              longTailKeywords: [
                '互联网自治系统（Autonomous System Number）通俗科普', '为什么大公司和网站一眼就能看穿你的节点属于哪家机房',
                '如何利用ASN识别出高质量骨干网与垃圾机房', '进阶技术玩家必备的网络身份侦探技能'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/tech/ip/residential/', anchor: '住宅IP工作原理' },
                { target: '/scenario/ai/chatgpt/', anchor: 'AI工具风控机制' },
                { target: '/tutorial/basic/terms/', anchor: '核心网络术语' }
              ],
              priority: 'P3'
            }
          ]
        }
      ]
    },
    {
      id: 'usage',
      title: '使用教程',
      path: '/tutorial/usage/',
      clusters: [
        {
          id: 'buy',
          clusterId: '5.2.1',
          title: '购买与注册教程',
          path: '/tutorial/usage/buy/',
          description: '从邮箱准备、匿名注册、套餐挑选到安全付款结账的完整实操闭环。',
          articles: [
            {
              title: '机场购买与注册零基础保姆级教程：从挑选套餐到安全支付完整闭环',
              slug: 'airport-purchase-and-registration-complete-guide',
              primaryKeyword: '机场购买与注册教程',
              secondaryKeywords: ['新手买梯子步骤', '翻墙套餐如何付款', '支付宝买机场教程', '注册账号防坑流程'],
              longTailKeywords: [
                '怎么在机场网站注册账号并购买订阅套餐', '新手第一单选什么套餐最不容易踩雷',
                '支付宝微信扫码支付常见注意事项', '从付完款到获取订阅链接的五步保姆级图解'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/tutorial/usage/subscribe/', anchor: '订阅导入客户端教程' },
                { target: '/airport/price/monthly/', anchor: '月付与年付对比' },
                { target: '/airport/ranking/top/', anchor: '综合机场排行榜' }
              ],
              priority: 'P0'
            },
            {
              title: '注册邮箱安全策略：为什么绝对不要用 QQ/163 邮箱注册翻墙机场',
              slug: 'safe-email-strategy-for-airport-registration',
              primaryKeyword: '机场注册邮箱安全',
              secondaryKeywords: ['不要用QQ邮箱买梯子', '推荐使用ProtonMail', '临时邮箱注册风险', '保护个人真实身份'],
              longTailKeywords: [
                '用绑定实名制手机号的国内邮箱注册机场被查风险', '机场数据库一旦被黑客拖库导致个人信息泄露',
                '免费申请海外加密邮箱ProtonMail与Outlook实操', '建立与真实个人生活彻底隔离的安全匿名邮箱'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/guide/security/', anchor: '翻墙安全与隐私全书' },
                { target: '/tutorial/usage/buy/', anchor: '购买与注册教程' },
                { target: '/help/guide/buying/', anchor: '新手防坑守则' }
              ],
              priority: 'P0'
            },
            {
              title: '套餐参数全解读：周期流量、重置日期、同时在线设备数与限速规则',
              slug: 'understanding-plan-parameters-bandwidth-devices-limits',
              primaryKeyword: '机场套餐参数解读',
              secondaryKeywords: ['流量每月几号重置', '设备连接数限制', '高峰期限制带宽', '选择适合自己的套餐大小'],
              longTailKeywords: [
                '账单日重置还是自然月1号重置流量的区别', '套餐写的“不限制设备数量”是真的吗',
                '为什么有些套餐写着限速200Mbps但价格更便宜', '精准评估个人月消耗量花最少钱办最大事'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/airport/price/cheap/', anchor: '便宜平价套餐' },
                { target: '/airport/price/pay-as-you-go/', anchor: '按量计费套餐' },
                { target: '/tutorial/usage/buy/', anchor: '购买指引' }
              ],
              priority: 'P1'
            },
            {
              title: '支付方式横向评测：支付宝、微信支付、USDT 虚拟币与信用卡安全对比',
              slug: 'payment-methods-alipay-wechat-usdt-credit-card-compared',
              primaryKeyword: '机场支付方式对比',
              secondaryKeywords: ['支付宝买机场安全吗', 'USDT买梯子教程', '虚拟货币匿名支付', '第三方发卡网支付风险'],
              longTailKeywords: [
                '支付宝微信付给机场第三方个人收款码有没有风险', '使用数字货币USDT支付实现完全匿名的实操流程',
                '海外信用卡付款防被乱扣费拒付管理技巧', '权衡支付便捷度与个人隐私安全的最佳方案'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/guide/security/', anchor: '支付安全防线' },
                { target: '/tutorial/usage/buy/', anchor: '购买教程' },
                { target: '/airport/price/monthly/', anchor: '自动续费解绑' }
              ],
              priority: 'P1'
            },
            {
              title: '付款后不到账排查：账单一直显示 Pending / 未支付该如何快速解决',
              slug: 'fix-payment-pending-order-not-credited',
              primaryKeyword: '机场付款后不到账解决',
              secondaryKeywords: ['支付成功但没有套餐', '订单显示Pending排查', '第三方支付回调超时', '提交工单标准话术'],
              longTailKeywords: [
                '钱扣了但网站后台依然显示等待付款怎么办', '第三方支付网关网络抖动导致回调失败的原因剖析',
                '如何截图付款商户单号并在后台提交工单快速补单', '避免重复付款导致资金损失的自救指南'
              ],
              searchIntent: '故障',
              internalLinks: [
                { target: '/help/faq/subscribe-fail/', anchor: '订阅更新故障' },
                { target: '/tutorial/usage/buy/', anchor: '购买流程' },
                { target: '/help/guide/scam/', anchor: '谨防跑路假机场' }
              ],
              priority: 'P2'
            },
            {
              title: '机场优惠券代码激活实操：结账最后一秒立减 20% 的正确姿势',
              slug: 'how-to-activate-coupon-code-at-checkout',
              primaryKeyword: '结账使用优惠码教程',
              secondaryKeywords: ['优惠码立减折扣', '在哪里输入打折码', '年付折扣叠加', '最新优惠码获取渠道'],
              longTailKeywords: [
                '很多新手忽略结账界面的优惠券输入框白花冤枉钱', 'AirPick独家专享优惠码一键复制粘贴指南',
                '确认总金额成功折减后再进行扫码支付的规范操作', '轻轻松松省下一顿下午茶钱的省钱技巧'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/airport/type/coupon/', anchor: '独家优惠码大全' },
                { target: '/airport/price/cheap/', anchor: '便宜梯子选购' },
                { target: '/tutorial/usage/buy/', anchor: '购买教程' }
              ],
              priority: 'P2'
            },
            {
              title: '用户后台核心功能摸透：节点状态面板、工单系统与重置订阅链接',
              slug: 'airport-dashboard-core-features-walkthrough',
              primaryKeyword: '机场用户后台使用指南',
              secondaryKeywords: ['查看节点在线状态', '重置订阅链接防盗用', '提交售后工单', '修改登录密码与2FA'],
              longTailKeywords: [
                '在后台查看实时在线节点列表与维护公告方法', '怀疑订阅链接泄露时如何一秒重置生成全新密钥',
                '开启二次身份验证（2FA）彻底防范账号被盗取', '做一名熟练掌控个人资产的高阶翻墙用户'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/tutorial/usage/subscribe/', anchor: '订阅管理指南' },
                { target: '/help/guide/security/', anchor: '账号安全' },
                { target: '/tutorial/usage/buy/', anchor: '购买全景' }
              ],
              priority: 'P2'
            },
            {
              title: '机场退款政策与售后撕逼实战：支持退款吗？怎么退？退到哪？',
              slug: 'airport-refund-policy-and-dispute-resolution',
              primaryKeyword: '机场退款与售后维权',
              secondaryKeywords: ['买错套餐怎么申请退款', '不满意能退款吗', '按天折算退款规则', '拒绝退款如何投诉'],
              longTailKeywords: [
                '各大主流机场用户协议中普遍存在的“一经售出概不退换”条款', '开通24小时内节点全挂如何依法据理力争全额退款',
                '支付宝投诉举报商户与维权标准话术与证据留存', '守住消费者合法权益的最后一道防线'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/guide/buying/', anchor: '购买避坑' },
                { target: '/help/guide/scam/', anchor: '防诈骗指南' },
                { target: '/tutorial/usage/buy/', anchor: '购买指南' }
              ],
              priority: 'P3'
            }
          ]
        },
        {
          id: 'subscribe',
          clusterId: '5.2.2',
          title: '订阅导入教程',
          path: '/tutorial/usage/subscribe/',
          description: '全平台一键导入、订阅转换、多订阅聚合与自动定时更新策略配置。',
          articles: [
            {
              title: '机场订阅导入完整教程：Clash、小火箭、v2rayN 一键同步秒连节点',
              slug: 'airport-subscription-import-complete-tutorial',
              primaryKeyword: '订阅导入教程',
              secondaryKeywords: ['如何导入机场订阅', 'Clash添加订阅链接', '小火箭一键导入', '订阅拉取节点教程'],
              longTailKeywords: [
                '买完机场后怎么把节点弄到软件里面去', '复制订阅链接与一键唤起客户端有什么区别',
                '导入后显示节点列表但连不上怎么刷新', '2026年全平台主流软件订阅导入零门槛全搞定'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/app/clash/', anchor: 'Clash客户端详解' },
                { target: '/client/app/shadowrocket/', anchor: '小火箭使用指南' },
                { target: '/client/app/v2rayn/', anchor: 'v2rayN配置教程' }
              ],
              priority: 'P0'
            },
            {
              title: '一键导入 vs 复制通用订阅链接：两种获取方式的区别与适用场景',
              slug: 'one-click-import-vs-universal-subscription-url',
              primaryKeyword: '一键导入与复制链接区别',
              secondaryKeywords: ['网页一键唤醒客户端', '复制订阅链接手动粘贴', '扫二维码导入节点', '浏览器拦截弹窗排查'],
              longTailKeywords: [
                '为什么点击一键导入没反应电脑不弹出客户端', '手动复制包含Token密钥的长链接在软件中添加实操',
                '手机摄像头扫描网站屏幕二维码极速导入技巧', '遇到不同操作系统环境最稳妥的节点录入方式'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/client/device/windows/', anchor: 'Windows导入排查' },
                { target: '/client/device/iphone/', anchor: 'iPhone扫码技巧' },
                { target: '/tutorial/usage/subscribe/', anchor: '订阅导入教程' }
              ],
              priority: 'P0'
            },
            {
              title: '订阅链接防泄露与重置秘籍：节点被盗用与流量飞速消耗的解救之法',
              slug: 'subscription-url-security-and-token-reset',
              primaryKeyword: '订阅链接防泄露与重置',
              secondaryKeywords: ['订阅链接被盗排查', '流量莫名其妙跑完', '重置订阅密钥Token', '保护个人节点安全'],
              longTailKeywords: [
                '不小心把订阅链接发到公开群或论坛该怎么办', '别人拿到你的订阅链接能直接免费偷你的流量翻墙吗',
                '在机场后台一键Reset Token使旧链接全部失效实操', '在所有客户端中同步更新为全新安全订阅'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/help/guide/security/', anchor: '翻墙安全与防盗用' },
                { target: '/airport/price/pay-as-you-go/', anchor: '防偷跑流量' },
                { target: '/tutorial/usage/subscribe/', anchor: '订阅指南' }
              ],
              priority: 'P1'
            },
            {
              title: '订阅更新失败报错终极自查：0KB、网络超时与 SSL 证书错误排查',
              slug: 'fix-subscription-update-failed-0kb-timeout',
              primaryKeyword: '订阅更新失败排查',
              secondaryKeywords: ['拉取订阅显示0KB', '订阅更新网络超时', '证书无效无法下载', '更新订阅无需开代理'],
              longTailKeywords: [
                '更新订阅老是提示Network Timeout或者下载空文件', '机场原订阅域名被污染打不开如何开启临时代理更新',
                '在客户端中勾选忽略证书验证选项救急实操', '五分钟内排除订阅拉取失败的七大典型病因'
              ],
              searchIntent: '故障',
              internalLinks: [
                { target: '/help/faq/subscribe-fail/', anchor: '订阅更新失败深度解决' },
                { target: '/help/faq/timeout/', anchor: '节点超时排障' },
                { target: '/tutorial/usage/subscribe/', anchor: '订阅教程' }
              ],
              priority: 'P1'
            },
            {
              title: '多机场订阅合并聚合技巧：利用 Sub-Store 将多个机场节点整合为一个超级订阅',
              slug: 'sub-store-multiple-subscriptions-aggregation-guide',
              primaryKeyword: 'Sub-Store多订阅合并教程',
              secondaryKeywords: ['多个机场合并为一个', '节点重命名与去重', 'Sub-Store自动化过滤', '打造超级订阅池'],
              longTailKeywords: [
                '买了三家机场难道要在软件里来回切换吗', '利用开源工具Sub-Store实现多机场订阅一键自动合并',
                '去除失效节点、自动按倍率和国家分类节点标签', '资深极客玩家必备的终极节点管理中枢'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/app/clash/', anchor: 'Clash高阶配置' },
                { target: '/client/app/sing-box/', anchor: 'sing-box规则聚合' },
                { target: '/tutorial/usage/subscribe/', anchor: '订阅导入教程' }
              ],
              priority: 'P2'
            },
            {
              title: '设置客户端定时自动更新订阅：永远用上最新节点与 IP 变动的无感秘笈',
              slug: 'auto-update-subscription-interval-settings',
              primaryKeyword: '设置订阅自动更新频率',
              secondaryKeywords: ['定时更新节点列表', 'Clash设置每24小时更新', '小火箭后台自动拉取', '跟上机场节点变更'],
              longTailKeywords: [
                '为什么长时间不更新订阅会导致很多节点突然失联', '在Clash中设置Interval参数让其每天自动后台刷新',
                '避免设置过于频繁（如几分钟更新一次）被机场拉黑IP', '省心舒坦的科学上网长效自维护设置'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/app/clash/', anchor: 'Clash参数配置' },
                { target: '/client/app/shadowrocket/', anchor: '小火箭更新设置' },
                { target: '/tutorial/usage/subscribe/', anchor: '订阅指南' }
              ],
              priority: 'P2'
            },
            {
              title: '订阅格式转换完全掌握：Vmess、SS、Trojan 链接转换为 Clash/sing-box 配置',
              slug: 'convert-raw-links-to-clash-and-sing-box-config',
              primaryKeyword: '订阅格式转换教程',
              secondaryKeywords: ['单节点链接转Clash', 'Vmess链接导入Clash', 'Trojan节点生成YAML', '本地安全转换工具'],
              longTailKeywords: [
                '朋友分享的一串vmess://链接怎么放到Clash里面用', '本地运行命令行工具免走外部API安全转换格式',
                '将旧协议节点无缝转换适配现代规则客户端实操', '解决非标准订阅格式无法被软件识别的尴尬'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/app/clash/', anchor: 'Clash订阅转换安全' },
                { target: '/tutorial/compare/protocol/', anchor: '协议全景对比' },
                { target: '/tutorial/usage/subscribe/', anchor: '订阅导入' }
              ],
              priority: 'P2'
            },
            {
              title: '节点重命名与自定义标签：为几百个节点整理出井井有条的清爽界面',
              slug: 'node-renaming-and-custom-flag-tags',
              primaryKeyword: '节点重命名与国旗标签整理',
              secondaryKeywords: ['节点名称太乱怎么改', '给节点添加国旗Emoji', '按延迟智能排序分组', '美化客户端节点列表'],
              longTailKeywords: [
                '很多机场节点名字包含大堆广告和特殊字符看着头大', '利用正则表达式或分流工具批量重命名节点标签',
                '自动识别国家代码添加纯正小国旗Emoji表情', '强迫症用户的极简清爽客户端视觉改造实录'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/app/clash/', anchor: 'Clash配置调优' },
                { target: '/client/app/sing-box/', anchor: 'sing-box美化' },
                { target: '/tutorial/usage/subscribe/', anchor: '订阅导入' }
              ],
              priority: 'P3'
            }
          ]
        },
        {
          id: 'config',
          clusterId: '5.2.3',
          title: '客户端配置教程',
          path: '/tutorial/usage/config/',
          description: 'DNS 防污染、规则策略组精修、系统代理托管与网络协议高级调校。',
          articles: [
            {
              title: '客户端高级配置完全指南：策略组、DNS防污染与规则分流精细化调优',
              slug: 'client-advanced-configuration-complete-guide',
              primaryKeyword: '客户端配置教程',
              secondaryKeywords: ['Clash高级策略组', 'DNS防污染设置', '国内外分流调优', '提升网络打开速度'],
              longTailKeywords: [
                '怎么调优翻墙客户端让网速达到最高极限', '彻底搞懂PROXIES、PROXY、FALLBACK策略组区别',
                '杜绝DNS劫持污染导致的国内外网页白屏故障', '2026年出海玩家必学的高阶网络调教完全手册'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/app/clash/', anchor: 'Clash使用详解' },
                { target: '/tutorial/usage/subscribe/', anchor: '订阅导入基础' },
                { target: '/help/faq/slow/', anchor: '网速慢与卡顿排查' }
              ],
              priority: 'P0'
            },
            {
              title: 'DNS 解析防污染与防泄漏实战：DoH / DoT 与 Fake-IP 的最优参数组合',
              slug: 'dns-leak-protection-doh-dot-fake-ip-setup',
              primaryKeyword: 'DNS防污染与防泄漏配置',
              secondaryKeywords: ['DoH安全加密DNS', '解决DNS泄漏问题', '阿里腾讯国内DNS分流', 'Cloudflare海外DoH直达'],
              longTailKeywords: [
                '为什么开启代理后DNS泄漏测试依然显示真实ISP地址', '配置nameserver-policy让国内域名走本地海外走加密DoH',
                '利用Fake-IP机制彻底杜绝本地DNS解析被运营商劫持', '打造牢不可破的端到端域名解析隐私通道'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/help/guide/security/', anchor: '隐私保护全攻略' },
                { target: '/client/device/router/', anchor: '软路由MosDNS方案' },
                { target: '/tutorial/usage/config/', anchor: '客户端配置' }
              ],
              priority: 'P0'
            },
            {
              title: '手把手教你配置 Fallback 与 URL-Test 自动优选策略组：节点宕机秒级无感切换',
              slug: 'clash-fallback-url-test-auto-switch-setup',
              primaryKeyword: 'Fallback与URL-Test自动切换配置',
              secondaryKeywords: ['节点断线自动换下一个', '自动测优延迟最低节点', '容灾策略组编写', '永不掉线策略组配置'],
              longTailKeywords: [
                '看视频看到一半节点崩了客户端怎么自动切备用节点', 'url-test自动测速与选择最佳节点的间隔与容差设置',
                'Fallback故障转移策略组按顺序降级的稳妥配置实操', '让网络体验如同企业专线般永续无阻'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/airport/ranking/stable/', anchor: '高可用稳定机场' },
                { target: '/client/app/clash/', anchor: 'Clash策略组指南' },
                { target: '/tutorial/usage/config/', anchor: '配置教程' }
              ],
              priority: 'P1'
            },
            {
              title: '局域网 Allow LAN 允许共享与网关配置：让没有客户端的设备蹭网翻墙',
              slug: 'allow-lan-proxy-sharing-configuration',
              primaryKeyword: 'Allow LAN局域网代理配置',
              secondaryKeywords: ['电脑代理共享给手机', '7890混合端口转发', '防火墙放行局域网入站', '单机开启全屋受惠'],
              longTailKeywords: [
                '开启Allow LAN之后其他设备在网络设置中怎么填IP', '解决Windows防火墙默认阻断局域网7890端口连接的通病',
                '为PS5、电视盒子、老旧备用机提供临时高品质网络出海', '极简低成本的多设备网络赋能实操'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/app/clash/', anchor: 'Clash局域网共享' },
                { target: '/client/device/windows/', anchor: 'Windows网络配置' },
                { target: '/tutorial/usage/config/', anchor: '高级配置指南' }
              ],
              priority: 'P1'
            },
            {
              title: 'TUN 模式 Wintun 驱动故障修复与多网卡冲突排除完全指引',
              slug: 'fix-wintun-driver-issues-and-nic-conflicts',
              primaryKeyword: 'Wintun驱动故障排查',
              secondaryKeywords: ['TUN模式启动失败', 'Wintun.dll丢失解决', '虚拟网卡设备冲突', '重装TUN核心驱动'],
              longTailKeywords: [
                '开启TUN模式提示failed to start TUN device解决', '与虚拟机VMware/VirtualBox虚拟网卡冲突排查',
                '彻底清理系统残留老旧TAP网卡驱动救急实战', '释放全系统全局底层代理的强悍能力'
              ],
              searchIntent: '故障',
              internalLinks: [
                { target: '/client/app/clash/', anchor: 'Clash TUN模式详解' },
                { target: '/client/device/windows/', anchor: 'Windows排错' },
                { target: '/tutorial/usage/config/', anchor: '配置教程' }
              ],
              priority: 'P2'
            },
            {
              title: '分流黑白名单与自定义规则实操：精准添加需要翻墙或直连的私有域名',
              slug: 'custom-routing-rules-whitelist-blacklist-guide',
              primaryKeyword: '自定义分流规则教程',
              secondaryKeywords: ['添加域名直连规则', '强制走代理规则配置', 'DOMAIN-SUFFIX与IP-CIDR', '分流优先级逻辑'],
              longTailKeywords: [
                '某个小众国外冷门网站打不开怎么手动把它加进代理列表', '公司私有系统被误判走代理怎么设置强制DIRECT直连',
                '掌握DOMAIN-KEYWORD与GEOIP规则的书写语法', '五分钟打磨出最懂你的个性化网络路由表'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/app/clash/', anchor: 'Clash规则集进阶' },
                { target: '/client/app/v2rayn/', anchor: 'v2rayN路由规则' },
                { target: '/tutorial/usage/config/', anchor: '配置指南' }
              ],
              priority: 'P2'
            },
            {
              title: '客户端日志诊断与排错指南：看懂每一行日志找出断网幕后真凶',
              slug: 'client-logs-diagnostics-and-troubleshooting',
              primaryKeyword: '看懂客户端日志排错',
              secondaryKeywords: ['Clash日志分析', '查看Connection Reset原因', '排查TLS握手失败', '定位网络卡死问题'],
              longTailKeywords: [
                '软件界面不报错但打不开网页如何打开日志面板排查', '提示i/o timeout或connection refused具体代表什么故障',
                '根据日志精准区分是本地配置错还是机场节点挂了', '从普通用户蜕变为自给自足排障高手的必经之路'
              ],
              searchIntent: '故障',
              internalLinks: [
                { target: '/help/faq/connect-fail/', anchor: '连接失败排查' },
                { target: '/help/faq/timeout/', anchor: '节点超时排障' },
                { target: '/tutorial/usage/config/', anchor: '配置教程' }
              ],
              priority: 'P2'
            },
            {
              title: '云端同步与配置备份策略：重装系统或换新电脑一秒满血复原',
              slug: 'cloud-backup-and-sync-proxy-configurations',
              primaryKeyword: '代理配置备份与云同步',
              secondaryKeywords: ['导出Clash配置文件', '多电脑同步分流规则', 'Git管理个人代理配置', '换新机一键还原'],
              longTailKeywords: [
                '调校好几天的规则文件怎么安全备份到云端防止丢失', '利用私有GitHub仓库或网盘实现多设备配置自动同步',
                '新装系统只需三秒导入备份满血复活的优雅体验', '高效数字游民的设备迁移与资产保全工作流'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/device/windows/', anchor: 'Windows生产力' },
                { target: '/client/device/mac/', anchor: 'Mac工作流' },
                { target: '/tutorial/usage/config/', anchor: '配置全景' }
              ],
              priority: 'P3'
            }
          ]
        }
      ]
    },
    {
      id: 'compare',
      title: '对比知识',
      path: '/tutorial/compare/',
      clusters: [
        {
          id: 'protocol',
          clusterId: '5.3.1',
          title: '协议对比',
          path: '/tutorial/compare/protocol/',
          description: '从 Shadowsocks、Vmess、Vless 到 Trojan 与 Hysteria2，现代抗封锁代理协议全景横评。',
          articles: [
            {
              title: '主流科学上网代理协议全景横评：SS/Vmess/Vless/Trojan/Hysteria2 选哪个最好',
              slug: 'best-proxy-protocols-complete-comparison-2026',
              primaryKeyword: '代理协议对比',
              secondaryKeywords: ['Vless对比Trojan', 'Hysteria2协议优势', 'Shadowsocks过时了吗', '抗封锁最强协议'],
              longTailKeywords: [
                '2026年翻墙到底用什么协议最快最不容易被墙', 'Vless Reality相比传统Vmess有哪些革命性突破',
                '基于UDP狂暴提速的Hysteria2协议真实体验', '全协议底层机制、吞吐量与抗审查能力终极排位'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/tutorial/compare/line/', anchor: '线路深度横向对比' },
                { target: '/client/app/sing-box/', anchor: '全协议支持客户端' },
                { target: '/airport/ranking/top/', anchor: '综合机场排行榜' }
              ],
              priority: 'P0'
            },
            {
              title: 'Shadowsocks（SS/SSR）现状剖析：老牌协议在专线网络中的第二春',
              slug: 'shadowsocks-ssr-status-and-modern-usage',
              primaryKeyword: 'Shadowsocks协议现状',
              secondaryKeywords: ['SS协议容易被识别吗', '为什么专线机场爱用SS', 'SSR与SS区别', '轻量级低资源消耗'],
              longTailKeywords: [
                '在公网上被GFW精准识别的SS为什么在IEPL专线里神勇依旧', '纯对称加密极低的CPU占用对软路由和移动端的友好度',
                '为什么90%的高端专线大厂依然把Shadowsocks作为主力协议', '老骥伏枥的经典翻墙协议现代定位'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/tech/line/iepl/', anchor: 'IEPL专线原理' },
                { target: '/client/device/router/', anchor: '软路由低资源运行' },
                { target: '/tutorial/compare/protocol/', anchor: '协议对比专栏' }
              ],
              priority: 'P0'
            },
            {
              title: 'Vmess 协议走向没落？AEAD 强制加密后的性能损耗与历史包袱解密',
              slug: 'vmess-protocol-performance-overhead-and-legacy',
              primaryKeyword: 'Vmess协议性能损耗剖析',
              secondaryKeywords: ['Vmess时间戳对齐', '为什么Vmess速度慢', 'Vless取代Vmess原因', 'Xray架构演进'],
              longTailKeywords: [
                '早年V2Ray红极一时的Vmess协议为什么逐渐被新技术取代', '双重加密与时间戳严格校验带来的系统开销与延迟',
                'V2Ray核心停更与新一代轻量协议崛起的必然历史', '深入理解网络协议演进中的优胜劣汰'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/client/app/v2rayn/', anchor: 'v2rayN生态' },
                { target: '/tutorial/compare/protocol/', anchor: '协议深度对比' },
                { target: '/tutorial/basic/terms/', anchor: '网络术语全解' }
              ],
              priority: 'P1'
            },
            {
              title: 'Vless Reality 终极伪装技术：借用真实大厂证书让流量隐形于公网',
              slug: 'vless-reality-ultimate-camouflage-technology',
              primaryKeyword: 'Vless Reality伪装原理',
              secondaryKeywords: ['借鸡生蛋偷证书', '免自购域名防封锁', '完全模拟真实TLS握手', '当前抗审查天花板'],
              longTailKeywords: [
                '什么是Reality技术：如何无需购买域名实现完美伪装', '客户端握手直接借用微软/苹果/雅虎合法公网证书原理',
                'GFW主动探测算法在面对Reality伪装时的完全失效', '个人自建与抗封锁技术体系最新力作'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/guide/security/', anchor: '翻墙安全与防探测' },
                { target: '/client/app/sing-box/', anchor: 'sing-box原生支持' },
                { target: '/tutorial/compare/protocol/', anchor: '协议全景' }
              ],
              priority: 'P1'
            },
            {
              title: 'Trojan 协议纯净优雅之美：将代理完全伪装成标杆 HTTPS 网站的技术哲学',
              slug: 'trojan-protocol-https-camouflage-philosophy',
              primaryKeyword: 'Trojan协议工作原理',
              secondaryKeywords: ['假装正常HTTPS网站', '标准TLS加密传输', 'Trojan-Go多路复用', '直连抗封锁利器'],
              longTailKeywords: [
                'Trojan为什么被誉为最优雅的防封锁设计典范', '如果未通过验证直接重定向到正常网站欺骗审查探针',
                '在拥有公网域名和标准SSL证书下的超高稳定性表现', '各大中端机场广泛部署Trojan线路的商业考量'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/tech/line/bgp/', anchor: 'BGP中转部署' },
                { target: '/tutorial/usage/config/', anchor: '客户端配置调优' },
                { target: '/tutorial/compare/protocol/', anchor: '协议对比' }
              ],
              priority: 'P2'
            },
            {
              title: 'Hysteria 2（歇斯底里）狂暴提速：基于 QUIC/UDP 协议恶劣网络下的性能怪兽',
              slug: 'hysteria-2-quic-udp-performance-beast',
              primaryKeyword: 'Hysteria2协议优势评测',
              secondaryKeywords: ['基于QUIC狂暴加速', 'UDP抗弱网丢包', '千兆狂飙翻墙协议', '运营商UDP QoS限速破解'],
              longTailKeywords: [
                '在丢包率高达20%的恶劣公网下Hysteria2如何跑满百兆', '自研BBR拥塞控制算法对传统TCP传输协议的降维打击',
                '部分地区运营商对UDP数据包无差别限速阻断的应对之道', '2026年弱网环境与偏远地区用户的救星协议'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/faq/slow/', anchor: '网速慢与丢包排查' },
                { target: '/client/app/sing-box/', anchor: 'sing-box适配Hysteria2' },
                { target: '/tutorial/compare/protocol/', anchor: '协议对比' }
              ],
              priority: 'P2'
            },
            {
              title: '协议对设备电量与 CPU 占用的残酷实测：手机发烫原来是协议选错了',
              slug: 'protocol-power-consumption-and-cpu-benchmark',
              primaryKeyword: '不同代理协议耗电量对比',
              secondaryKeywords: ['手机发热协议排查', 'AES硬件加速与ChaCha20', '移动端最省电协议', '轻量运行不掉电'],
              longTailKeywords: [
                '实测手机运行Shadowsocks、Vmess与Hysteria2的耗电曲线', 'ARM架构芯片对不同加密算法的硬件指令集加速支持',
                '出门在外手机全天开代理不发烫的协议选型黄金法则', '保护电池健康与移动出海体验的关键一环'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/client/device/iphone/', anchor: 'iPhone省电优化' },
                { target: '/client/device/android/', anchor: '安卓保活省电' },
                { target: '/tutorial/compare/protocol/', anchor: '协议对比' }
              ],
              priority: 'P2'
            },
            {
              title: '2026年协议选型终极心法表：不同线路、不同设备与不同场景的一对一对照',
              slug: 'protocol-selection-matrix-and-cheat-sheet',
              primaryKeyword: '代理协议选型指南',
              secondaryKeywords: ['专线配什么协议', '直连选什么协议', '手机电脑协议推荐', '协议配置速查表'],
              longTailKeywords: [
                'IEPL专线为什么无脑首选Shadowsocks', '普通中转和公网直连为什么推荐Vless或Trojan',
                '恶劣弱网与移动蜂窝网络为什么必选Hysteria2', '一张高清矩阵大图帮你解决所有协议选择困难症'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/airport/ranking/top/', anchor: '综合机场排行榜' },
                { target: '/tutorial/compare/line/', anchor: '线路深度横向对比' },
                { target: '/tutorial/compare/protocol/', anchor: '协议全景' }
              ],
              priority: 'P3'
            }
          ]
        },
        {
          id: 'line',
          clusterId: '5.3.2',
          title: '线路对比',
          path: '/tutorial/compare/line/',
          description: '直连、公网中转、BGP 多线、CN2 GIA 与物理专线全方位参数、成本与体验大比武。',
          articles: [
            {
              title: '翻墙线路技术终极天梯图：直连、中转、BGP、CN2与专线全方位横评',
              slug: 'ladder-ranking-of-proxy-network-lines-2026',
              primaryKeyword: '翻墙线路对比',
              secondaryKeywords: ['直连中转专线区别', '哪种翻墙线路最好', '翻墙线路等级天梯图', '不同线路延迟丢包评测'],
              longTailKeywords: [
                '为什么市面上的机场价格从几块到上百块差距这么大', '底层物理网络链路决定一切翻墙体验的真相',
                '2026年主流网络线路综合素质天梯榜', '买梯子前必读的底层线路鉴赏课'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/tech/line/iepl/', anchor: 'IEPL专线推荐' },
                { target: '/tech/line/bgp/', anchor: 'BGP中转解析' },
                { target: '/airport/ranking/top/', anchor: '综合机场排行榜' }
              ],
              priority: 'P0'
            },
            {
              title: '直连公网线路（Direct）：为什么说它是 2026 年最不推荐的落后方案',
              slug: 'why-direct-public-lines-are-worst-in-2026',
              primaryKeyword: '直连公网线路优缺点',
              secondaryKeywords: ['普通直连翻墙容易被封', '晚高峰直接瘫痪', '直连为什么便宜', '淘汰直连线路的原因'],
              longTailKeywords: [
                '不经过任何国内中转服务器直接连境外VPS的致命缺陷', '国际出口公网在晚高峰高达50%的恐怖丢包率实测',
                'GFW对境外直连IP高频主动探测与封锁的高危风险', '告别原始直连拥抱现代化中转网络的必然趋势'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/faq/slow/', anchor: '晚高峰速度慢深度排查' },
                { target: '/tech/line/bgp/', anchor: 'BGP中转' },
                { target: '/tutorial/compare/line/', anchor: '线路对比专栏' }
              ],
              priority: 'P0'
            },
            {
              title: '普通中转 vs BGP 多线智能中转：全国不同省份运营商接入的差距',
              slug: 'standard-transit-vs-bgp-multi-carrier-transit',
              primaryKeyword: '普通中转与BGP中转区别',
              secondaryKeywords: ['单线机房中转缺点', '三网BGP无缝接入', '北方联通与南方电信通吃', '跨网传输延迟测试'],
              longTailKeywords: [
                '只有单条电信线路的廉价中转对移动联通用户的折磨', 'BGP多线机房如何做到全国任何地方Ping值都在30ms以内',
                '智能DNS根据用户ISP精准分配最近接入点的底层实操', '挑选高品质中转机场的核心鉴别法门'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/tech/line/bgp/', anchor: 'BGP中转详解' },
                { target: '/airport/ranking/value/', anchor: '高性价比机场推荐' },
                { target: '/tutorial/compare/line/', anchor: '线路对比' }
              ],
              priority: 'P1'
            },
            {
              title: 'BGP 中转与 IEPL 物理专线全方位 PK：多掏两倍价格到底买到了什么',
              slug: 'bgp-transit-vs-iepl-dedicated-line-head-to-head',
              primaryKeyword: 'BGP中转对比IEPL专线',
              secondaryKeywords: ['专线比中转贵在哪里', '过墙与不过墙的本质区别', '敏感时期真实可用度', '预算充足选哪个'],
              longTailKeywords: [
                '公网隧道加密与物理内网光纤二层通信的本质区别', '重大会议和敏感封锁时期两者的生存表现真实记录',
                '普通看网页和重度开会/联机对战的感知差异量化评估', '帮助出海用户精准权衡预算与体验边界'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/tech/line/iepl/', anchor: 'IEPL专线推荐' },
                { target: '/tech/line/bgp/', anchor: 'BGP中转推荐' },
                { target: '/tutorial/compare/line/', anchor: '线路对比' }
              ],
              priority: 'P1'
            },
            {
              title: 'IPLC 与 IEPL 专线手足相残：新老两代国际专线的技术演进与实测异同',
              slug: 'iplc-vs-iepl-technical-evolution-and-tests',
              primaryKeyword: 'IPLC与IEPL技术演进对比',
              secondaryKeywords: ['二层以太网与三层IP', '专线开通与交付周期', '抖动与时延极细微差异', '专线老炮选型建议'],
              longTailKeywords: [
                '老牌IPLC私有租线是如何被现代化IEPL以太网专线逐步替代的', '二层物理直连在防止数据包污染与简化路由上的巨大优势',
                '两者在当前翻墙机场生态中的实际占有率与价格趋势', '网络发烧友不可错过的专线进化史'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/tech/line/iplc/', anchor: 'IPLC专线' },
                { target: '/tech/line/iepl/', anchor: 'IEPL专线' },
                { target: '/tutorial/compare/line/', anchor: '线路对比' }
              ],
              priority: 'P2'
            },
            {
              title: '电信 CN2 GIA 与联通 9929 顶级优化直连：媲美专线的高端公网通道',
              slug: 'premium-direct-lines-cn2-gia-and-cug-9929',
              primaryKeyword: 'CN2 GIA与9929优化直连评测',
              secondaryKeywords: ['高端公网直连', '骨干网VIP车道', '美西洛杉矶低延迟', '直连线路中的天花板'],
              longTailKeywords: [
                '为什么电信AS4809和联通AS9929被称为公网上的头等舱', '在晚高峰全国大堵车时VIP专享带宽的畅行无阻表现',
                '相比内网专线更具性价比的美区大带宽解决方案', '适合科研学者与技术开发者的极品直连清单'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/tech/line/cn2-gia/', anchor: 'CN2 GIA机场推荐' },
                { target: '/tech/region/usa/', anchor: '美西直连节点' },
                { target: '/tutorial/compare/line/', anchor: '线路对比' }
              ],
              priority: 'P2'
            },
            {
              title: '线路稳定性与丢包监控实录：30天连续自动化拨测真实数据大公开',
              slug: '30-day-line-stability-and-packet-loss-benchmark',
              primaryKeyword: '30天线路稳定性监控数据',
              secondaryKeywords: ['真实拨测丢包率', '晚高峰稳定性曲线', '专线与中转故障率统计', 'AirPick客观评测数据'],
              longTailKeywords: [
                '全网三大梯队线路连续720小时不间断网络拨测全纪录', '遭遇突发国际光缆施工时不同线路的容灾表现复盘',
                '用真实量化数据撕下商家虚假宣传的遮羞布', '业内最权威客观的线路健康度全景图'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/about', anchor: '关于 AirPick 测速体系' },
                { target: '/airport/ranking/stable/', anchor: '超稳定机场排行榜' },
                { target: '/tutorial/compare/line/', anchor: '线路对比' }
              ],
              priority: 'P2'
            },
            {
              title: '如何根据预算和业务挑选最佳线路：2026年出海人群线路匹配决策树',
              slug: 'line-selection-decision-tree-by-budget-and-needs',
              primaryKeyword: '不同预算翻墙线路选型指南',
              secondaryKeywords: ['月预算15元买什么', '月预算50元买专线', '看视频选BGP打游戏选IEPL', '出海选线决策模型'],
              longTailKeywords: [
                '学生党查资料轻度翻墙的最低成本线路组合', '外贸与跨境电商从业人员绝不妥协的专线选型规范',
                '家庭影院大屏追剧与多设备共享的最优带宽方案', '三分钟跟着决策树选出最适合自己的黄金线路'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/airport/ranking/top/', anchor: '综合机场排行榜' },
                { target: '/airport/price/cheap/', anchor: '便宜平价机场' },
                { target: '/airport/type/premium/', anchor: '高端专线' }
              ],
              priority: 'P3'
            }
          ]
        },
        {
          id: 'tool',
          clusterId: '5.3.3',
          title: '工具对比',
          path: '/tutorial/compare/tool/',
          description: 'Clash、Shadowrocket、Surge、v2rayN、sing-box 与 Quantumult X 全平台客户端横测。',
          articles: [
            {
              title: '2026全平台科学上网客户端横评：Clash/小火箭/v2rayN/sing-box到底选哪个',
              slug: 'best-proxy-clients-complete-comparison-2026',
              primaryKeyword: '翻墙客户端对比',
              secondaryKeywords: ['Clash好还是小火箭好', '全平台代理软件推荐', '新手好用的翻墙软件', '客户端性能与上手难度排名'],
              longTailKeywords: [
                'Windows/Mac/iOS/Android各自最好用的客户端是哪个', '不同代理软件在分流能力、内存占用与美观度全方位PK',
                '2026年全网最完整客观的翻墙工具终极选型指南', '一步到位找到最适合你设备的神仙客户端'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/client/app/clash/', anchor: 'Clash生态详解' },
                { target: '/client/app/shadowrocket/', anchor: '小火箭使用指南' },
                { target: '/client/app/sing-box/', anchor: 'sing-box生态探索' }
              ],
              priority: 'P0'
            },
            {
              title: 'iOS 双雄对决：Shadowrocket（小火箭）与 Quantumult X（圈X）深度较量',
              slug: 'shadowrocket-vs-quantumult-x-head-to-head',
              primaryKeyword: '小火箭与圈X对比',
              secondaryKeywords: ['iOS选小火箭还是圈X', '圈X脚本去广告实力', '小火箭简单易用优势', '苹果代理软件选购'],
              longTailKeywords: [
                '新手花2.99美元买小火箭还是花7.99美元买Quantumult X', '圈X在JavaScript脚本重写、自动签到与深度去广告上的强大',
                '小火箭在协议全面性、简单扫码即用上的无门槛优势', 'iOS出海玩家最关心的两大神作全面横测'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/client/app/shadowrocket/', anchor: 'Shadowrocket推荐' },
                { target: '/client/device/iphone/', anchor: 'iPhone全套方案' },
                { target: '/tutorial/compare/tool/', anchor: '工具对比' }
              ],
              priority: 'P0'
            },
            {
              title: 'Surge 到底贵在哪里：售价数百元的“网络调试神器”究竟是不是智商税',
              slug: 'why-surge-is-so-expensive-worth-it-or-not',
              primaryKeyword: 'Surge为什么这么贵',
              secondaryKeywords: ['Surge值得买吗', 'Mac与iOS顶级网络神器', '抓包与MITM解密实力', '高预算极客生产力工具'],
              longTailKeywords: [
                '苹果生态最昂贵网络工具Surge的核心技术壁垒剖析', '强大的网络抓包、实时连接监控与卓越的断线重连表现',
                '普通看视频查资料用户与专业开发者对Surge的真实评价', '理性看待天价工具拒绝盲目虚荣消费'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/client/device/mac/', anchor: 'Mac生产力配置' },
                { target: '/client/device/iphone/', anchor: 'iPhone客户端选型' },
                { target: '/tutorial/compare/tool/', anchor: '工具对比' }
              ],
              priority: 'P1'
            },
            {
              title: 'Windows 桌面端双强争霸：Clash Verge Rev 与 v2rayN 综合体验实测',
              slug: 'clash-verge-rev-vs-v2rayn-windows-battle',
              primaryKeyword: 'Clash Verge与v2rayN对比',
              secondaryKeywords: ['Win系统用Clash还是v2rayN', '现代化UI对比老牌经典', 'Mihomo核心与Xray核心PK', 'PC端翻墙工具选型'],
              longTailKeywords: [
                '基于Tauri打造的现代化美观界面与原生经典界面的视觉对碰', '智能策略组自动故障切换对比手动一键真连接延迟测速',
                '程序员开发调试与普通家庭追剧的不同选型建议', '2026年Windows电脑装机必备网络工具终极对决'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/client/app/clash/', anchor: 'Clash Verge Rev配置' },
                { target: '/client/app/v2rayn/', anchor: 'v2rayN使用指南' },
                { target: '/client/device/windows/', anchor: 'Windows推荐' }
              ],
              priority: 'P1'
            },
            {
              title: '新一代全能通用核心 sing-box 崛起：它会彻底终结其他所有客户端吗',
              slug: 'sing-box-rise-will-it-replace-all-clients',
              primaryKeyword: 'sing-box会取代其他工具吗',
              secondaryKeywords: ['下一代通用代理框架', 'Go语言极致性能压榨', '跨平台原生统一体验', '代理工具演进未来'],
              longTailKeywords: [
                '从核心库到底层架构sing-box如何实现对老旧工具的技术碾压', '各大主流第三方GUI客户端全面拥抱sing-box核心的浪潮',
                '配置门槛对普通小白用户的阻碍与现代化图形界面发展', '未来三年内科学上网工具生态演变深度预测'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/client/app/sing-box/', anchor: 'sing-box生态探索' },
                { target: '/tutorial/compare/protocol/', anchor: '全协议深度解析' },
                { target: '/tutorial/compare/tool/', anchor: '工具对比' }
              ],
              priority: 'P2'
            },
            {
              title: '各客户端内存占用与资源开销实测：低配电脑与老旧手机救星排位',
              slug: 'client-memory-and-cpu-overhead-benchmark',
              primaryKeyword: '各翻墙软件内存占用实测',
              secondaryKeywords: ['轻量省内存翻墙软件', '低配电脑防卡死软件', '老旧安卓手机翻墙', '后台资源开销排行榜'],
              longTailKeywords: [
                '实测各大客户端在后台待机与千兆下载满载时的RAM与CPU消耗', '为什么有些基于Electron打包的客户端动辄吃掉数百MB内存',
                '百元垃圾佬电脑与小内存老设备的终极轻量化翻墙方案', '让每一兆系统资源都发挥在刀刃上的极致优化'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/client/app/sing-box/', anchor: '低资源sing-box推荐' },
                { target: '/client/device/android/', anchor: '安卓省电保活' },
                { target: '/tutorial/compare/tool/', anchor: '工具对比' }
              ],
              priority: 'P2'
            },
            {
              title: '开源客户端供应链安全风险：如何确保你下载的安装包没有被植入后门',
              slug: 'open-source-proxy-client-supply-chain-security',
              primaryKeyword: '翻墙软件防木马后门指南',
              secondaryKeywords: ['正版安装包下载渠道', '验证SHA256哈希值', '第三方论坛木马警惕', '开源软件供应链投毒'],
              longTailKeywords: [
                '震惊全网的开源代理软件被黑客投毒篡改历史案例复盘', '必须坚持在官方GitHub Release仓库下载编译成品的铁律',
                '手把手教你利用终端一行命令校验文件的SHA256哈希值', '筑牢科学上网设备端的第一道也是最重要的一道安全防火墙'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/guide/security/', anchor: '网络安全与防钓鱼' },
                { target: '/help/guide/fake-website/', anchor: '山寨钓鱼站鉴别' },
                { target: '/tutorial/compare/tool/', anchor: '工具对比' }
              ],
              priority: 'P2'
            },
            {
              title: '2026各设备平台最佳客户端搭配矩阵表：照着装准没错的懒人清单',
              slug: 'best-proxy-client-matrix-for-all-platforms',
              primaryKeyword: '全设备平台客户端推荐清单',
              secondaryKeywords: ['全平台装机必备翻墙软件', 'Windows最佳选择', 'Mac生产力首选', 'iPhone与安卓标配矩阵'],
              longTailKeywords: [
                '无论你是苹果全家桶还是Windows/安卓双修用户的最优解', '一份直接抄作业、不用纠结技术细节的终极推荐速查表',
                '开启丝滑无感、高效稳定科学上网全新生活方式'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/client/device/windows/', anchor: 'Windows专栏' },
                { target: '/client/device/mac/', anchor: 'Mac专栏' },
                { target: '/client/device/iphone/', anchor: 'iPhone专栏' },
                { target: '/client/device/android/', anchor: 'Android专栏' }
              ],
              priority: 'P3'
            }
          ]
        }
      ]
    }
  ]
};
