module.exports = {
  id: 'airport',
  title: '机场推荐',
  path: '/airport/',
  description: 'AirPick 核心选购与排行榜枢纽，涵盖综合实力榜单、价格梯队及专线类型划分。',
  subcategories: [
    {
      id: 'ranking',
      title: '排行榜与推荐',
      path: '/airport/ranking/',
      clusters: [
        {
          id: 'top',
          clusterId: '1.1.1',
          title: '机场排行榜',
          path: '/airport/ranking/top/',
          description: '基于稳定性、带宽冗余、峰值速率及解锁能力的 2026 年度综合排行榜。',
          articles: [
            {
              title: '2026最佳机场推荐排行榜：Top 10 稳定高速梯子全面横评',
              slug: 'best-airports-2026',
              primaryKeyword: '机场排行榜',
              secondaryKeywords: ['2026机场推荐', '最佳梯子排行', '稳定高速机场', '好用梯子排名'],
              longTailKeywords: [
                '2026年最好用的机场有哪些', '稳定不掉线的科学上网梯子', '十大靠谱机场排行榜',
                '专线中转机场横评2026', '晚高峰不卡顿机场推荐', '便宜稳定的科学上网机场',
                '机场测评报告最新', '翻墙梯子排行榜2026', 'Clash可用优质机场排行',
                '高评分机场推荐2026', '综合素质最高的梯子', '靠谱老牌机场推荐榜'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/airport/ranking/stable/', anchor: '稳定机场推荐' },
                { target: '/airport/price/cheap/', anchor: '便宜机场推荐' },
                { target: '/tech/line/iepl/', anchor: 'IEPL专线机场' },
                { target: '/scenario/ai/chatgpt/', anchor: 'ChatGPT专用节点' },
                { target: '/help/guide/scam/', anchor: '防跑路避坑指南' }
              ],
              priority: 'P0'
            },
            {
              title: '老牌大机场综合实力榜：运营3年以上零跑路风险梯子盘点',
              slug: 'established-airports-ranking',
              primaryKeyword: '老牌机场推荐',
              secondaryKeywords: ['防跑路机场排行', '老牌梯子排名', '稳定运营老牌机场', '靠谱长寿机场'],
              longTailKeywords: [
                '运营超过3年的老牌机场有哪些', '绝不跑路的科学上网梯子', '历史悠久的大机场排行',
                '大厂背景专线机场推荐', '口碑最好老牌翻墙服务商', '用户基数大的稳妥机场',
                '抗封锁能力强的老牌节点', '老牌机场性价比分析', '长期自用翻墙机场推荐',
                '2026年老牌稳定节点评测', '老牌机场优惠与套餐'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/help/guide/scam/', anchor: '机场跑路预警' },
                { target: '/airport/ranking/top/', anchor: '机场排行榜' },
                { target: '/reviews/geekcloud/', anchor: '极客云深度测评' },
                { target: '/tutorial/basic/vs-vpn/', anchor: '机场与传统VPN区别' }
              ],
              priority: 'P0'
            },
            {
              title: '2026晚高峰测速排行榜：抗QoS压制与8K流畅播放梯子评测',
              slug: 'peak-hours-speed-ranking',
              primaryKeyword: '晚高峰测速排行榜',
              secondaryKeywords: ['机场晚高峰测速', '抗QoS机场排行', '8K流畅机场', '晚高峰不卡机场'],
              longTailKeywords: [
                '晚上8点到11点不卡顿的机场', '晚高峰看YouTube 4K的梯子', '抗晚高峰限速机场推荐',
                '大带宽专线机场测速榜', '百兆宽带跑满的机场排行', '晚高峰丢包率最低的节点',
                '千兆光纤满速翻墙机场', 'YouTube 8K秒开机场测速', '晚高峰Netflix 4K机场榜',
                '晚高峰测速数据真实横评', '高防限速抗封锁梯子'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/scenario/streaming/youtube/', anchor: 'YouTube 4K/8K 机场推荐' },
                { target: '/tech/line/bgp/', anchor: 'BGP中转机场' },
                { target: '/help/faq/slow/', anchor: '晚高峰速度慢排查' },
                { target: '/airport/ranking/stable/', anchor: '稳定机场推荐' }
              ],
              priority: 'P1'
            },
            {
              title: '全协议支持机场排行榜：SS/SSR/Vmess/Vless/Hysteria2 兼容度对比',
              slug: 'protocol-compatibility-ranking',
              primaryKeyword: '全协议机场排行',
              secondaryKeywords: ['Hysteria2机场推荐', 'Vless机场排行', '全协议翻墙梯子', '多协议兼容机场'],
              longTailKeywords: [
                '支持Hysteria2高吞吐的机场', 'Vless Reality机场排行榜', 'Shadowsocks原版节点推荐',
                '兼容Clash Verge全协议的梯子', 'sing-box专属高性能机场', '抗封锁强的新协议机场',
                '支持Trojan与Vmess双栈机场', '协议丰富度最高的机场推荐', '全平台客户端兼容梯子',
                '2026年最新抗审查协议机场'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/tutorial/compare/protocol/', anchor: '主流代理协议深度对比' },
                { target: '/client/app/sing-box/', anchor: 'sing-box 机场推荐' },
                { target: '/client/app/clash/', anchor: 'Clash 客户端使用技巧' }
              ],
              priority: 'P1'
            },
            {
              title: '小众精品小资机场榜：低复用率、小范围邀请制优质梯子盘点',
              slug: 'boutique-private-airports',
              primaryKeyword: '小众精品机场',
              secondaryKeywords: ['小资机场推荐', '邀请制机场排行', '低倍率专线机场', '私密高端梯子'],
              longTailKeywords: [
                '人数少不拥挤的小众机场', '邀请码才能注册的精品机场', '节点负载极低的高端梯子',
                '极客圈流行的小众专线', '不超售的良心机场推荐', '低复用率稳定翻墙服务',
                '小众私人定制机场测评', '高私密性翻墙梯子排行', '小资级出海加速机场',
                '小众优质节点体验报告'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/airport/type/premium/', anchor: '高端专线机场' },
                { target: '/tech/ip/native/', anchor: '原生IP机场' },
                { target: '/help/guide/buying/', anchor: '新手选购避坑原则' }
              ],
              priority: 'P2'
            },
            {
              title: '千兆高速节点排行榜：支持大文件下载与云端备份的狂暴梯子',
              slug: 'gigabit-high-speed-ranking',
              primaryKeyword: '千兆高速机场',
              secondaryKeywords: ['大带宽翻墙机场', '极速下载梯子', '千兆专线机场', '云备份加速梯子'],
              longTailKeywords: [
                '能够跑满千兆带宽的机场推荐', '适合下载GitHub大仓库的梯子', 'Steam跨区高速下载机场',
                '大文件高速传输海外节点', '千兆上行下行对等翻墙梯子', '高速大带宽节点横向评测',
                '跑满NAS云备份的海外线路', '千兆光纤必备梯子排行榜', '无带宽限制的高速节点'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/tech/line/iplc/', anchor: 'IPLC内网专线' },
                { target: '/scenario/game/accel/', anchor: '游戏加速机场推荐' },
                { target: '/client/device/windows/', anchor: 'Windows客户端加速设置' }
              ],
              priority: 'P2'
            },
            {
              title: '国内多入口负载均衡机场榜：南北互联多ISP接入综合排名',
              slug: 'multi-ingress-load-balance-ranking',
              primaryKeyword: '多入口负载均衡机场',
              secondaryKeywords: ['多入口BGP机场', '电信联通移动专属入口', '智能分流梯子', '抗单点故障机场'],
              longTailKeywords: [
                '电信移动联通三网自适应机场', '拥有全国多地接入点的优质梯子', '北方联通与南方电信通吃机场',
                '移动CMI优质直连梯子推荐', '单点入口被墙自动故障转移机场', '智能Anycast调度机场排行',
                '全网低延迟接入点梯子评测', '跨省接入损耗最低的机场'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/tech/line/bgp/', anchor: 'BGP多线接入解析' },
                { target: '/help/faq/timeout/', anchor: '节点单点超时排查' },
                { target: '/airport/ranking/stable/', anchor: '稳定机场推荐' }
              ],
              priority: 'P2'
            },
            {
              title: '2026学生党高赞机场排行榜：月费20元内高品质梯子综合推荐',
              slug: 'student-friendly-airports',
              primaryKeyword: '学生党机场推荐',
              secondaryKeywords: ['适合学生的便宜梯子', '百元以内年付机场', '低门槛高性价比机场', '学生科学上网梯子'],
              longTailKeywords: [
                '学生党查学术论文用什么机场', '便宜好用的学生翻墙梯子推荐', '支持月付10元以下的学生机场',
                'Google Scholar秒开的平价节点', 'GitHub加速学生实用梯子', '性价比超高的寝室梯子排行',
                '学生无信用卡可支付宝付款梯子', '不跑路的学生平价翻墙推荐', '低预算留学生回国/出海节点'
              ],
              searchIntent: '购买',
              internalLinks: [
                { target: '/airport/price/cheap/', anchor: '便宜机场推荐' },
                { target: '/airport/price/monthly/', anchor: '月付与年付机场选购' },
                { target: '/tutorial/usage/buy/', anchor: '新手购买与注册指南' }
              ],
              priority: 'P1'
            }
          ]
        },
        {
          id: 'stable',
          clusterId: '1.1.2',
          title: '稳定机场推荐',
          path: '/airport/ranking/stable/',
          description: '以 SLA 可用性 > 99.9%、抗封锁与零丢包为核心指标的硬核稳定梯子。',
          articles: [
            {
              title: '2026年超稳定机场精选：SLA 可用性 99.9% 以上零断连梯子',
              slug: 'ultra-stable-airports-2026',
              primaryKeyword: '稳定机场推荐',
              secondaryKeywords: ['高可用翻墙梯子', '稳定不掉线机场', '2026稳定梯子', 'SLA保障机场'],
              longTailKeywords: [
                '哪个机场最稳定不常换节点', '办公开会用什么稳定翻墙梯子', '全年不掉线的企业级机场推荐',
                'Zoom海外会议专用稳定节点', '敏感时期不失联的硬核机场', '稳定度最高的科学上网梯子',
                '断流少延迟稳的专线推荐', '高稳定节点如何测试与挑选', '适合长时间挂后台的稳定梯子',
                '2026靠谱不抽风的翻墙节点'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/airport/ranking/top/', anchor: '综合机场排行榜' },
                { target: '/tech/line/iepl/', anchor: 'IEPL专线节点' },
                { target: '/help/guide/security/', anchor: '翻墙安全与隐私' }
              ],
              priority: 'P0'
            },
            {
              title: '特殊敏感时期不失联机场：抗封锁与动态端口跳变梯子盘点',
              slug: 'anti-censorship-resilient-airports',
              primaryKeyword: '抗封锁机场推荐',
              secondaryKeywords: ['敏感时期可用梯子', '不失联机场', '动态IP抗封锁梯子', '防屏蔽科学上网'],
              longTailKeywords: [
                '大促和重大会议期间哪个机场能用', '防火墙升级不影响的抗封锁节点', '支持动态伪装域名的翻墙梯子',
                '被墙秒换IP的稳定机场', '自动漂移抗封锁技术解析', '敏感时期依然坚挺的专线',
                '双十一及敏感期翻墙备用方案', '海外抗审查节点高可用实测'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/tech/line/iplc/', anchor: 'IPLC不过墙专线' },
                { target: '/help/faq/timeout/', anchor: '全节点超时应急措施' },
                { target: '/tutorial/compare/protocol/', anchor: '抗封锁协议深度对比' }
              ],
              priority: 'P0'
            },
            {
              title: '办公与远程协作专用稳定梯子：Slack/Teams/Notion 流畅连接方案',
              slug: 'remote-work-office-stable-airports',
              primaryKeyword: '办公稳定机场',
              secondaryKeywords: ['远程办公专用梯子', 'Slack加速稳定机场', 'Notion同步梯子', '外贸开会稳定节点'],
              longTailKeywords: [
                '适合外贸公司办公的稳定机场', '远程开发访问GitHub稳定的梯子', 'Teams海外视频会议不卡节点',
                'Google Workspace协同办公专用梯子', 'Notion图片与数据库秒开的机场', '企业远程协作翻墙推荐',
                '合规与稳定兼顾的外贸梯子', '办公室多台电脑共享翻墙方案'
              ],
              searchIntent: '购买',
              internalLinks: [
                { target: '/client/device/windows/', anchor: 'Windows电脑端配置' },
                { target: '/client/device/mac/', anchor: 'Mac生产力配置' },
                { target: '/airport/type/premium/', anchor: '高端专线保障' }
              ],
              priority: 'P1'
            },
            {
              title: '拒绝频繁断流：低丢包率专线稳定节点横测与评选',
              slug: 'low-packet-loss-airports',
              primaryKeyword: '低丢包率机场',
              secondaryKeywords: ['零丢包翻墙梯子', '断流少稳定机场', 'Ping低丢包节点', '网络平稳梯子'],
              longTailKeywords: [
                '玩外服游戏丢包率低于1%的机场', '解决Clash节点频繁断流抽风', '持续长连接不掉线的机场',
                '专线丢包率真实监测数据', '如何测试机场节点的丢包率与抖动', '丢包率高是什么原因造成的',
                '高吞吐低抖动的优质线路推荐', '2026年平稳专线节点评选'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/faq/slow/', anchor: '网络卡顿丢包排查' },
                { target: '/tech/line/iepl/', anchor: 'IEPL低延迟专线' },
                { target: '/client/app/clash/', anchor: 'Clash延迟与丢包测试' }
              ],
              priority: 'P1'
            },
            {
              title: '双活冗余架构机场：主备容灾专线如何做到全年零宕机',
              slug: 'disaster-recovery-redundancy-airports',
              primaryKeyword: '双活容灾机场',
              secondaryKeywords: ['主备冗余专线梯子', '多机房高可用机场', '容灾翻墙服务商', '永不断线梯子'],
              longTailKeywords: [
                '什么是机场的双活与冷热备用线路', '单条专线被挖断不影响的机场', '拥有广港京德多套专线的梯子',
                '云端高可用架构机场推荐', '企业级容灾科学上网方案', '故障秒级无感切换的梯子',
                '如何判断机场是否具备容灾冗余', '2026年大厂架构抗风险机场'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/tech/line/iepl/', anchor: '专线底层架构' },
                { target: '/help/guide/scam/', anchor: '虚假宣传与真容灾辨别' },
                { target: '/airport/ranking/stable/', anchor: '稳定机场推荐' }
              ],
              priority: 'P2'
            },
            {
              title: '长连接持久保持测评：SSH/WebSocket/远程桌面不掉线梯子推荐',
              slug: 'persistent-connection-airports',
              primaryKeyword: '长连接稳定机场',
              secondaryKeywords: ['SSH不掉线梯子', '远程桌面加速节点', '长TCP连接稳定机场', '开发运维必备梯子'],
              longTailKeywords: [
                '连接海外VPS频繁断开用什么梯子', 'SSH连接挂后台一整天不中断的机场', 'RDP海外远程桌面低延迟节点',
                '长连接心跳保活优秀的代理服务', '运维工程师常用的稳定机场', 'VSCode Remote SSH加速梯子',
                '稳定传输无重连烦恼的翻墙节点', 'TCP长连接优化机场评测'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/client/app/v2rayn/', anchor: 'v2rayN 路由分流与保活' },
                { target: '/tech/line/cn2-gia/', anchor: 'CN2 GIA双程直连' },
                { target: '/tutorial/usage/config/', anchor: '高级路由规则调优' }
              ],
              priority: 'P2'
            },
            {
              title: '稳定型中转与直连线路对比：哪种技术方案长期使用更稳妥',
              slug: 'transit-vs-direct-stability-comparison',
              primaryKeyword: '中转与直连稳定性对比',
              secondaryKeywords: ['BGP中转还是直连稳定', '翻墙线路稳定性分析', '专线中转优劣', '直连节点抗封锁性'],
              longTailKeywords: [
                '中转机场为什么比直连节点稳定', '直连线路被墙概率有多高', 'BGP国内中转服务器被封怎么办',
                '中转和专线到底哪个更稳定', '不同运营商下直连中转表现区别', '为什么说直连节点晚高峰必崩',
                '挑选稳定线路的核心参数指标', '翻墙线路演进与稳定性演变'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/tutorial/compare/line/', anchor: '直连与中转专线深度对比' },
                { target: '/tech/line/bgp/', anchor: 'BGP中转机场' },
                { target: '/airport/ranking/stable/', anchor: '稳定机场推荐' }
              ],
              priority: 'P2'
            },
            {
              title: '全天候测速稳定性监测报告：7×24小时延迟抖动数据真实大公开',
              slug: '24-7-stability-benchmark-report',
              primaryKeyword: '机场稳定性评测报告',
              secondaryKeywords: ['7x24小时机场测速', '延迟抖动真实数据', '全天候稳定机场榜', '节点掉线监控统计'],
              longTailKeywords: [
                '一周连续ping监控哪个机场最稳', '全天24小时速率变化曲线图', '晚高峰与凌晨测速对比分析',
                '丢包率最平稳的五大机场实测', '真实用户长效挂机稳定性统计', '机场日常维护频次与公告透明度',
                '如何搭建自动化节点监控脚本', '2026专业评测站稳定性数据'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/about', anchor: '关于 AirPick 测速体系' },
                { target: '/airport/ranking/top/', anchor: '综合机场排行榜' },
                { target: '/help/faq/slow/', anchor: '突发卡顿排查' }
              ],
              priority: 'P3'
            }
          ]
        },
        {
          id: 'value',
          clusterId: '1.1.3',
          title: '高性价比机场',
          path: '/airport/ranking/value/',
          description: '价格亲民、流量充沛、线路高质，综合得分拔尖的质价比之选。',
          articles: [
            {
              title: '2026高性价比机场推荐：兼顾价格与速度的质价比首选清单',
              slug: 'best-value-airports-2026',
              primaryKeyword: '高性价比机场',
              secondaryKeywords: ['性价比高的梯子', '平价优质机场', '质价比翻墙推荐', '物美价廉机场'],
              longTailKeywords: [
                '哪家机场性价比最高', '20元左右最好的机场是哪个', '速度快又便宜的科学上网梯子',
                '高性价比专线机场推荐2026', '兼顾ChatGPT和4K视频的平价梯子', '性价比排行榜第一名机场',
                '流量多价格低的良心机场', '不缩水的高性价比翻墙节点', '日常刷网页看视频高性价比梯子'
              ],
              searchIntent: '购买',
              internalLinks: [
                { target: '/airport/price/cheap/', anchor: '便宜机场推荐' },
                { target: '/airport/ranking/top/', anchor: '机场综合排行榜' },
                { target: '/reviews/suyo666/', anchor: '速鹰666高性价比评测' }
              ],
              priority: 'P0'
            },
            {
              title: '百元以内年付良心机场盘点：平摊每月不到8元的超值梯子',
              slug: 'annual-under-100-yuan-airports',
              primaryKeyword: '百元年付机场',
              secondaryKeywords: ['年付100元以内梯子', '平摊几块钱的机场', '超低价年付翻墙', '低成本科学上网'],
              longTailKeywords: [
                '一年几十块钱的靠谱机场', '百元年付会不会容易跑路', '年付划算的平价机场推荐',
                '每月8元流量够用的学生梯子', '低频轻度翻墙年付方案', '高性价比年付套餐横评',
                '支持退款的百元内年付梯子', '2026年超低年付优质节点'
              ],
              searchIntent: '购买',
              internalLinks: [
                { target: '/airport/price/monthly/', anchor: '月付还是年付划算' },
                { target: '/help/guide/scam/', anchor: '年付防跑路避坑常识' },
                { target: '/airport/ranking/value/', anchor: '高性价比机场推荐' }
              ],
              priority: 'P1'
            },
            {
              title: '大流量高带宽性价比之王：每月500G以上狂暴刷流推荐',
              slug: 'huge-traffic-value-airports',
              primaryKeyword: '大流量高性价比机场',
              secondaryKeywords: ['500G流量便宜梯子', '大流量刷流机场', '便宜大带宽翻墙', '不限速大流量梯子'],
              longTailKeywords: [
                '每月流量用不完的便宜机场', '500G才十几块钱的良心梯子', '追美剧下载专用大流量机场',
                '支持BT下载的大流量节点推荐', '多设备共享大流量平价套餐', '合租性价比极高的大流量梯子',
                '2026大流量科学上网推荐', '不限速的大带宽流量包对比'
              ],
              searchIntent: '购买',
              internalLinks: [
                { target: '/scenario/streaming/all/', anchor: '流媒体解锁机场' },
                { target: '/airport/price/cheap/', anchor: '便宜机场推荐' },
                { target: '/client/device/router/', anchor: '软路由全屋共享翻墙' }
              ],
              priority: 'P1'
            },
            {
              title: '性价比机场避坑警示：低价陷阱与带宽水分如何识破',
              slug: 'value-airports-traps-and-drawbacks',
              primaryKeyword: '性价比机场避坑',
              secondaryKeywords: ['低价机场骗局', '便宜梯子套路', '辨别虚标带宽', '假专线陷阱'],
              longTailKeywords: [
                '5元机场为什么总是超时跑路', '宣传千兆实测只有10兆的套路', '超售严重的廉价梯子表现',
                '为什么不建议盲目买最便宜的机场', '低价高倍率套路如何识破', '假IEPL中转节点如何测出来',
                '性价比与廉价垃圾的区别', '科学上网理性消费指南'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/guide/buying/', anchor: '新手购买避坑指南' },
                { target: '/tech/line/iepl/', anchor: '真假专线辨识' },
                { target: '/airport/ranking/value/', anchor: '高性价比机场推荐' }
              ],
              priority: 'P1'
            },
            {
              title: '性价比机场多设备共享指南：一人购买全家通用的合租方案',
              slug: 'multi-device-sharing-value-plan',
              primaryKeyword: '多设备共享机场',
              secondaryKeywords: ['合租翻墙梯子', '多设备同时在线机场', '不限连接数机场', '家庭共享梯子'],
              longTailKeywords: [
                '允许5台设备同时在线的平价机场', '寝室室友合租梯子哪家合适', '全家手机电脑共用一个订阅',
                '限制设备数的机场如何破解', '软路由分流降低设备数限制', '高性价比多用户支持套餐',
                '2026年适合合租的高质梯子'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/device/router/', anchor: '路由器翻墙教程' },
                { target: '/tutorial/usage/subscribe/', anchor: '订阅导入多设备方法' },
                { target: '/airport/price/cheap/', anchor: '便宜机场推荐' }
              ],
              priority: 'P2'
            },
            {
              title: '平价专线与优质中转：中档价位梯子选哪个质价比最高',
              slug: 'budget-premium-vs-transit-airports',
              primaryKeyword: '平价专线机场对比',
              secondaryKeywords: ['30元内专线梯子', '优质BGP与廉价IEPL对比', '中端机场选购', '质价比路线推荐'],
              longTailKeywords: [
                '月付25元能买到真专线吗', '优质BGP中转是否比烂专线更香', '中端预算翻墙梯子怎么选',
                '性价比专线机场实测分析', '30元档位梯子综合体验', '高质中转与入门专线实测差距',
                '2026中档梯子性价比天花板'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/tech/line/iepl/', anchor: 'IEPL专线推荐' },
                { target: '/tech/line/bgp/', anchor: 'BGP中转解析' },
                { target: '/airport/ranking/top/', anchor: '综合机场排行榜' }
              ],
              priority: 'P2'
            },
            {
              title: '高性价比备用梯子推荐：主备双修的花小钱保不失联策略',
              slug: 'budget-backup-airports',
              primaryKeyword: '备用梯子推荐',
              secondaryKeywords: ['便宜备用机场', '轻度备用翻墙', '保底不失联梯子', '按需备用科学上网'],
              longTailKeywords: [
                '主力机场挂了用什么应急备用', '每月3块钱的防失联备用梯子', '双机场配置最佳组合方案',
                '轻量备用按量计费节点推荐', '低成本搞定高可用双订阅', '如何设置Clash自动切换备用机场',
                '出差出海双保险备用方案'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/airport/price/pay-as-you-go/', anchor: '按量计费不限时机场' },
                { target: '/client/app/clash/', anchor: 'Clash分流与故障自动切换' },
                { target: '/help/faq/timeout/', anchor: '全节点超时应急' }
              ],
              priority: 'P2'
            },
            {
              title: '性价比机场测速跑分天梯图：每一分钱能买多少Mbps带宽',
              slug: 'value-per-yuan-benchmark-chart',
              primaryKeyword: '性价比测速天梯图',
              secondaryKeywords: ['每元带宽性价比', '机场性能价格比', '梯子性价比量化评分', '跑分排行榜'],
              longTailKeywords: [
                '单位价格最高速度机场评测', '花最少钱跑出最高网速梯子', '性价比指标如何科学量化计算',
                '2026年机场性价比测速天梯图', '低价高跑分节点真实数据', '高评分良心机场综合排位',
                '实测带宽与标称带宽比值表'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/airport/ranking/top/', anchor: '综合机场排行榜' },
                { target: '/airport/price/cheap/', anchor: '便宜机场推荐' },
                { target: '/about', anchor: 'AirPick评测维度' }
              ],
              priority: 'P3'
            }
          ]
        }
      ]
    },
    {
      id: 'price',
      title: '按价格分类',
      path: '/airport/price/',
      clusters: [
        {
          id: 'cheap',
          clusterId: '1.2.1',
          title: '便宜机场推荐',
          path: '/airport/price/cheap/',
          description: '月付 10-30 元平价梯子精选，适合学生党、轻度查资料与低预算出海用户。',
          articles: [
            {
              title: '2026便宜机场推荐：月付10元以下平价高速梯子精选合集',
              slug: 'best-cheap-airports-under-10-yuan',
              primaryKeyword: '便宜机场推荐',
              secondaryKeywords: ['月付10元以下机场', '平价翻墙梯子', '十元梯子推荐', '低价科学上网'],
              longTailKeywords: [
                '10元以内好用的机场推荐', '几块钱一个月的稳定梯子', '便宜又好用的翻墙节点2026',
                '月付便宜机场推荐合集', '学生党低价科学上网推荐', '不限速的10元便宜梯子',
                '便宜能看YouTube 4K的梯子', '最便宜而且能用的老牌机场', '平价翻墙服务商真实测评'
              ],
              searchIntent: '购买',
              internalLinks: [
                { target: '/airport/price/monthly/', anchor: '月付与年付机场选购' },
                { target: '/airport/ranking/value/', anchor: '高性价比机场' },
                { target: '/reviews/feiniaocloud/', anchor: '飞鸟云便宜平价评测' }
              ],
              priority: 'P0'
            },
            {
              title: '5元以内极低价机场横评：真香福利还是跑路高危地带',
              slug: 'ultra-cheap-5-yuan-airports-review',
              primaryKeyword: '5元低价机场',
              secondaryKeywords: ['五元以下机场评测', '超低价梯子测评', '白菜价翻墙体验', '5元机场跑路风险'],
              longTailKeywords: [
                '每月5元钱的机场靠谱吗', '极低价机场为什么能卖这么便宜', '5元机场晚高峰速度实测',
                '白菜价机场是否是公益性质', '买5元机场必须注意的防骗事项', '低价机场常见封号与不退款陷阱',
                '5元月付机场真实可用度'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/help/guide/scam/', anchor: '机场跑路防坑指南' },
                { target: '/airport/price/cheap/', anchor: '便宜机场推荐' },
                { target: '/help/guide/buying/', anchor: '新手防骗技巧' }
              ],
              priority: 'P1'
            },
            {
              title: '便宜机场能看4K视频吗：低价梯子流媒体实测与画质解析',
              slug: 'cheap-airports-4k-streaming-test',
              primaryKeyword: '便宜机场看4K',
              secondaryKeywords: ['便宜梯子流畅4K', '低价机场YouTube实测', '便宜梯子看Netflix', '平价流媒体节点'],
              longTailKeywords: [
                '十几块钱的机场看视频卡不卡', '便宜机场能不能跑满4K缓冲', 'YouTube 4K对机场带宽最低要求',
                '低价机场节点是否解锁Netflix', '看视频性价比最高的便宜机场', '低价中转节点看剧体验报告',
                '2026年实测能看4K的便宜梯子'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/scenario/streaming/youtube/', anchor: 'YouTube 流畅播放推荐' },
                { target: '/scenario/streaming/netflix/', anchor: 'Netflix 解锁专线' },
                { target: '/airport/price/cheap/', anchor: '便宜机场推荐' }
              ],
              priority: 'P1'
            },
            {
              title: '轻度查资料专用平价梯子：Google学术/维基/GitHub低成本畅连',
              slug: 'lightweight-academic-cheap-airports',
              primaryKeyword: '查资料便宜梯子',
              secondaryKeywords: ['学术研究平价机场', 'Google查资料梯子', '科研论文翻墙推荐', '低流量便宜梯子'],
              longTailKeywords: [
                '只是查Google需要买什么机场', '研究生查文献最省钱的梯子', 'GitHub加速轻量级便宜节点',
                '一个月只用10G流量的便宜套餐', '低频上网最划算的翻墙方案', '文字浏览专用低成本梯子',
                '维基百科Google Scholar专用节点'
              ],
              searchIntent: '购买',
              internalLinks: [
                { target: '/airport/price/pay-as-you-go/', anchor: '按量计费不限时套餐' },
                { target: '/tutorial/usage/buy/', anchor: '新手快速购买指南' },
                { target: '/airport/price/cheap/', anchor: '便宜机场推荐' }
              ],
              priority: 'P1'
            },
            {
              title: '便宜机场协议选择：Vmess、Trojan 还是 Shadowsocks 更省钱稳定',
              slug: 'cheap-airports-protocol-choice',
              primaryKeyword: '便宜机场协议对比',
              secondaryKeywords: ['平价梯子用什么协议', '低价机场SS与Vmess', '便宜Trojan机场', '经济型翻墙协议'],
              longTailKeywords: [
                '便宜机场多数用什么协议', '为什么低价机场偏爱Shadowsocks', 'Vmess在便宜中转下的表现',
                '抗封锁好又便宜的协议是哪个', '低成本协议消耗与服务器开销', '便宜机场协议配置优化技巧',
                '2026低价节点主流协议分析'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/tutorial/compare/protocol/', anchor: '主流代理协议深度对比' },
                { target: '/client/app/clash/', anchor: 'Clash协议适配教程' },
                { target: '/airport/price/cheap/', anchor: '便宜机场推荐' }
              ],
              priority: 'P2'
            },
            {
              title: '低价机场合租防封指南：如何与室友朋友安全拼车平摊费用',
              slug: 'cheap-airport-carpooling-guide',
              primaryKeyword: '便宜机场拼车合租',
              secondaryKeywords: ['梯子合租攻略', '机场拼车防封号', '平摊翻墙费用', '多IP同时在线防封'],
              longTailKeywords: [
                '几个人合买一个便宜机场怎么搞', '合租机场被封号是因为什么', '不同IP同时登录会被禁言吗',
                '便宜大流量套餐拼车技巧', '合租梯子子规则分流设置', '防止室友用你订阅下载违规内容',
                '安全合租科学上网注意事项'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/help/guide/security/', anchor: '翻墙安全与隐私' },
                { target: '/tutorial/usage/subscribe/', anchor: '订阅分发与导入' },
                { target: '/airport/price/cheap/', anchor: '便宜机场推荐' }
              ],
              priority: 'P2'
            },
            {
              title: '平价机场晚高峰生存法则：如何避开拥挤节点找到冷门高速线',
              slug: 'cheap-airports-peak-hours-survival',
              primaryKeyword: '平价机场避开晚高峰',
              secondaryKeywords: ['便宜梯子防卡顿技巧', '寻找冷门高速节点', '低价机场提速秘籍', '晚高峰换节点教程'],
              longTailKeywords: [
                '便宜机场晚上卡顿怎么自救', '香港节点爆满换哪个地区更快', '利用新加坡日本冷门节点提速',
                '修改本地DNS提升便宜机场速度', 'Clash自动优选延迟最低节点', '低价梯子晚高峰调优方法',
                '便宜机场流畅使用高级技巧'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/help/faq/slow/', anchor: '晚高峰速度慢深度排查' },
                { target: '/tech/region/singapore/', anchor: '新加坡冷门高速节点' },
                { target: '/client/app/clash/', anchor: 'Clash策略组配置' }
              ],
              priority: 'P2'
            },
            {
              title: '便宜机场与免费梯子全方位对比：为什么再穷也别碰纯免费翻墙',
              slug: 'cheap-vs-free-airports-security',
              primaryKeyword: '便宜机场对比免费梯子',
              secondaryKeywords: ['免费梯子危险性', '为什么不要用免费VPN', '便宜梯子与免费区别', '免费翻墙隐私风险'],
              longTailKeywords: [
                '免费梯子到底靠什么赚钱', '免费翻墙软件窃取个人隐私真相', '花几块钱买便宜机场真的必要吗',
                '免费节点挖矿与广告弹窗陷阱', '暗网泄露密码与免费代理关联', '便宜机场相比免费梯子的巨大优势',
                '保护个人数据安全翻墙建议'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/guide/security/', anchor: '翻墙安全与隐私' },
                { target: '/airport/type/free-trial/', anchor: '正规免费试用机场' },
                { target: '/airport/price/cheap/', anchor: '便宜机场推荐' }
              ],
              priority: 'P2'
            }
          ]
        },
        {
          id: 'monthly',
          clusterId: '1.2.2',
          title: '月付与年付机场',
          path: '/airport/price/monthly/',
          description: '月付保安全、年付享折扣，两种订阅付费方式的优劣利弊与避险指南。',
          articles: [
            {
              title: '月付 vs 年付机场深度对比：新手第一单到底选哪个最划算防坑',
              slug: 'monthly-vs-annual-billing-comparison',
              primaryKeyword: '月付与年付机场',
              secondaryKeywords: ['机场月付好还是年付好', '翻墙梯子付费方式对比', '防跑路月付选择', '年付折扣陷阱'],
              longTailKeywords: [
                '买机场先买一个月还是一年', '为什么所有老手都劝你月付', '年付骨折打折的机场能买吗',
                '月付机场被封怎么止损', '年付梯子跑路能退款吗', '新手买梯子最安全的付款周期',
                '月付机场和年付机场价格差异计算', '2026年翻墙付费策略分析'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/help/guide/scam/', anchor: '机场跑路预警' },
                { target: '/airport/price/cheap/', anchor: '便宜机场推荐' },
                { target: '/airport/ranking/stable/', anchor: '稳定机场推荐' }
              ],
              priority: 'P0'
            },
            {
              title: '2026优质支持月付机场推荐：按月充值无负担的靠谱梯子合集',
              slug: 'best-monthly-billing-airports',
              primaryKeyword: '支持月付机场推荐',
              secondaryKeywords: ['靠谱月付梯子', '按月付款翻墙', '随用随充机场', '月付无忧科学上网'],
              longTailKeywords: [
                '有哪些良心老牌机场支持月付', '月付十几块钱的好用机场推荐', '按月自动续费能随时取消的梯子',
                '支持支付宝月付的靠谱机场', '适合短期出差旅游的月付翻墙', '月付梯子速度和稳定性测评',
                '2026年高口碑月付机场精选'
              ],
              searchIntent: '购买',
              internalLinks: [
                { target: '/airport/ranking/top/', anchor: '综合机场排行榜' },
                { target: '/tutorial/usage/buy/', anchor: '购买与付款流程' },
                { target: '/airport/price/monthly/', anchor: '月付选购指南' }
              ],
              priority: 'P0'
            },
            {
              title: '年付性价比之选：哪些老牌大机场值得放心年付享受半价折扣',
              slug: 'reliable-annual-subscription-airports',
              primaryKeyword: '放心年付机场推荐',
              secondaryKeywords: ['值得年付的大机场', '年付折扣良心梯子', '零跑路风险年付推荐', '高信誉年付翻墙'],
              longTailKeywords: [
                '哪家机场运营好几年值得年付', '年付打5折的大型专线机场', '信誉度最高绝不跑路的年付梯子',
                '年付一次性买断一整年省心梯子', '大厂专线年付省钱攻略', '年付套餐包含额外福利的机场',
                '2026值得放心年付的五大品牌'
              ],
              searchIntent: '购买',
              internalLinks: [
                { target: '/reviews/geekcloud/', anchor: '极客云长期运营评测' },
                { target: '/airport/type/premium/', anchor: '高端专线机场' },
                { target: '/help/guide/scam/', anchor: '识别跑路征兆' }
              ],
              priority: 'P1'
            },
            {
              title: '机场自动续费陷阱与解绑教程：支付宝/微信/信用卡扣款管理',
              slug: 'airport-auto-renewal-cancellation',
              primaryKeyword: '机场自动续费取消',
              secondaryKeywords: ['关闭机场自动扣费', '支付宝免密支付解除', '梯子扣款取消教程', '信用卡自动订阅解绑'],
              longTailKeywords: [
                '买了月付机场下个月被自动扣钱怎么办', '如何在支付宝中解约机场免密扣款', '微信自动续费签约如何取消',
                'PayPal取消机场循环账单教程', '信用卡被境外梯子扣费怎么拒付', '防止机场跑路后继续扣款的方法',
                '第三方支付平台安全防护'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/help/guide/security/', anchor: '支付与账号安全' },
                { target: '/tutorial/usage/buy/', anchor: '付款方式选择' },
                { target: '/airport/price/monthly/', anchor: '月付周期管理' }
              ],
              priority: 'P1'
            },
            {
              title: '季度付与半年付折中方案：灵活控制预算的最佳平衡点',
              slug: 'quarterly-and-semi-annual-plans',
              primaryKeyword: '季度付机场推荐',
              secondaryKeywords: ['半年付梯子推荐', '折中付款周期', '季度付款翻墙优势', '灵活计费机场套餐'],
              longTailKeywords: [
                '不想买一年又嫌月付麻烦买什么', '季付打8折的靠谱机场推荐', '半年付梯子性价比测算',
                '适合学期制的留学生季度套餐', '公司短期项目翻墙周期选择', '中等周期付款防跑路兼顾优惠',
                '2026年灵活付款方案横评'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/airport/ranking/value/', anchor: '高性价比机场' },
                { target: '/airport/price/monthly/', anchor: '月付与年付对比' },
                { target: '/airport/price/cheap/', anchor: '便宜机场推荐' }
              ],
              priority: 'P2'
            },
            {
              title: '年付赠送时长与升级套路解析：买一年送半年的背后逻辑',
              slug: 'annual-bonus-months-marketing-tactics',
              primaryKeyword: '买一年送半年套路',
              secondaryKeywords: ['买一送一机场猫腻', '赠送时长营销套路', '年付促销套路揭秘', '虚高标价打折套路'],
              longTailKeywords: [
                '买一年送半年是不是准备跑路了', '为什么机场总在重大节日前搞大促', '清空库存跑路前的促销特征',
                '看似便宜实则带宽缩水的年付活动', '如何辨别真福利促销与跑路前圈钱', '理性看待机场大打折活动',
                '翻墙服务商财务模型大起底'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/guide/scam/', anchor: '跑路前征兆警示' },
                { target: '/help/guide/buying/', anchor: '购买避坑原则' },
                { target: '/airport/type/coupon/', anchor: '真实可用优惠码' }
              ],
              priority: 'P2'
            },
            {
              title: '月付梯子如何迁移更换：无缝切换新机场的订阅管理技巧',
              slug: 'switching-monthly-airports-smoothly',
              primaryKeyword: '更换迁移机场教程',
              secondaryKeywords: ['无缝换梯子技巧', '月付到期换机场', 'Clash管理多个机场订阅', '切换新机场指南'],
              longTailKeywords: [
                '上家机场月付到期怎么换新家', 'Clash如何同时保留两个机场订阅备用', '换新机场后原节点缓存怎么清空',
                '无缝迁移规则和自定分流策略', '月付换机场有哪些注意事项', '换新梯子后连不上网页怎么排查',
                '多订阅平滑过渡操作流程'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/app/clash/', anchor: 'Clash订阅配置' },
                { target: '/tutorial/usage/subscribe/', anchor: '订阅导入与更新' },
                { target: '/airport/price/monthly/', anchor: '月付周期管理' }
              ],
              priority: 'P2'
            },
            {
              title: '不同付款周期退款政策实测：哪家机场支持按天折算退款',
              slug: 'airport-refund-policies-investigation',
              primaryKeyword: '机场退款政策',
              secondaryKeywords: ['翻墙梯子退款教程', '按天折算退款机场', '支持无理由退款梯子', '退款维权真实案例'],
              longTailKeywords: [
                '买了机场不好用能不能申请退款', '支持24小时内全额退款的良心机场', '工单申请退款标准话术',
                '虚拟币支付支持退款吗', '支付宝购买机场怎么申请售后维权', '各大主流机场退款条款细则对比',
                '无法退款时如何转让剩余套餐'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/guide/buying/', anchor: '售后条款避坑' },
                { target: '/tutorial/usage/buy/', anchor: '注册与支付流程' },
                { target: '/airport/price/monthly/', anchor: '月付安全选购' }
              ],
              priority: 'P3'
            }
          ]
        },
        {
          id: 'pay-as-you-go',
          clusterId: '1.2.3',
          title: '按量计费机场',
          path: '/airport/price/pay-as-you-go/',
          description: '不限时间、流量用完为止，最适合低频轻度翻墙与应急保底的备用神选。',
          articles: [
            {
              title: '2026按量计费不限时机场推荐：流量永久有效永不过期的神仙梯子',
              slug: 'best-pay-as-you-go-airports-2026',
              primaryKeyword: '按量计费机场',
              secondaryKeywords: ['不限时翻墙梯子', '流量永不过期机场', '按量付费节点推荐', '备用不限时梯子'],
              longTailKeywords: [
                '买100G流量可以用一两年的机场', '不按月清空流量的良心机场推荐', '适合平时不翻墙只是偶尔用的人',
                '按量计费1元多少G流量', '不限时流量包哪家最稳定', '轻度翻墙用户终极省钱方案',
                '支持IEPL专线的按量计费机场', '2026年靠谱不限时翻墙合集'
              ],
              searchIntent: '购买',
              internalLinks: [
                { target: '/airport/price/cheap/', anchor: '便宜机场推荐' },
                { target: '/airport/ranking/stable/', anchor: '稳定机场推荐' },
                { target: '/tech/line/iepl/', anchor: '按量专线节点' }
              ],
              priority: 'P0'
            },
            {
              title: '按量计费与包月套餐经济账对比：你到底属于哪类翻墙用户',
              slug: 'pay-as-you-go-vs-monthly-cost-analysis',
              primaryKeyword: '按量计费与包月对比',
              secondaryKeywords: ['按量还是包月划算', '按量计费适合人群', '翻墙流量消耗测算', '省钱计费模式选择'],
              longTailKeywords: [
                '一个月用不到5G流量买什么套餐', '天天看视频买按量计费会不会亏死', '按量计费节点每G单价对比',
                '普通人一个月正常翻墙消耗多少流量', '网页查资料与视频刷流流量差异', '精准计算哪种付款模式最省钱',
                '2026翻墙资费选择数学模型'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/airport/price/monthly/', anchor: '月付与年付对比' },
                { target: '/airport/price/pay-as-you-go/', anchor: '按量计费推荐' },
                { target: '/tutorial/usage/buy/', anchor: '新手选套餐' }
              ],
              priority: 'P1'
            },
            {
              title: '按量计费防偷跑流量终极攻略：如何关闭后台应用无感吸血',
              slug: 'prevent-data-leakage-pay-as-you-go',
              primaryKeyword: '防止按量偷跑流量',
              secondaryKeywords: ['按量梯子流量偷跑解决', 'Clash禁止Windows更新走代理', '后台吸血流量排查', '流量消耗监控设置'],
              longTailKeywords: [
                '买了50G按量第二天就没了怎么回事', 'Windows后台悄悄下载补丁耗光梯子流量', 'OneDrive和网盘云同步偷跑流量排查',
                'Clash规则分流阻止直连应用走代理', '如何在客户端查看单应用流量消耗', '手机后台耗电耗流量防范技巧',
                '守护按量计费流量实用教程'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/app/clash/', anchor: 'Clash分流黑名单规则' },
                { target: '/client/device/windows/', anchor: 'Windows应用联网限制' },
                { target: '/help/faq/slow/', anchor: '异常流量排查' }
              ],
              priority: 'P1'
            },
            {
              title: '按量计费机场节点倍率陷阱揭秘：1倍率与10倍率的真实账单差距',
              slug: 'node-multiplier-traps-pay-as-you-go',
              primaryKeyword: '节点倍率陷阱',
              secondaryKeywords: ['按量计费倍率猫腻', '高倍率节点扣费', '0.1倍率省流量技巧', '真假倍率识别'],
              longTailKeywords: [
                '什么是机场的节点倍率概念', '用10倍率节点看视频为什么扣10倍流量', '0.2倍率低倍率节点好用吗',
                '有些专线标5倍率合理吗', '如何一眼识破暗中调整倍率的坑爹机场', '按量计费怎么挑选性价比最高的倍率',
                '防范高倍率扣费设置教程'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/tutorial/basic/terms/', anchor: '节点倍率与基础术语' },
                { target: '/tech/line/iepl/', anchor: '高倍率专线解析' },
                { target: '/airport/price/pay-as-you-go/', anchor: '按量计费推荐' }
              ],
              priority: 'P1'
            },
            {
              title: '最佳应急备用方案：按量计费搭配主力包月的高可用组合拳',
              slug: 'hybrid-backup-plan-pay-as-you-go',
              primaryKeyword: '按量计费备用方案',
              secondaryKeywords: ['主力加备用双机场搭配', '包月主力按量保底', '永不失联网络架构', '双订阅无感容灾'],
              longTailKeywords: [
                '主力机场突然崩了怎么用按量无缝接管', '花30块钱买个按量计费当几年备用', 'Clash如何配置故障自动降级到备用按量',
                '高可用跨境办公双订阅推荐组合', '经常出差外贸人必备的保底节点', '双订阅自动合并与智能路由实战',
                '打造家庭网络永不断线方案'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/app/clash/', anchor: 'Clash故障转移策略组' },
                { target: '/airport/ranking/stable/', anchor: '主力稳定机场' },
                { target: '/help/faq/timeout/', anchor: '超时故障处理' }
              ],
              priority: 'P2'
            },
            {
              title: '低频科研与考公出国轻度用户：按量计费真实开销全记录',
              slug: 'light-user-pay-as-you-go-cost-report',
              primaryKeyword: '轻度用户按量开销',
              secondaryKeywords: ['查资料按量消费', '考研出国轻度翻墙账单', '一年用不完的流量', '省钱实测记录'],
              longTailKeywords: [
                '只刷文献一年花15元科学上网案例', '文科科研查海外资料怎么最省钱', '申请国外大学用什么梯子合适',
                '考公考雅思查资料推荐买什么套餐', '真实用户365天按量消耗统计图', '低频用户告别包月浪费血汗钱',
                '小众按量轻度梯子推荐'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/airport/price/cheap/', anchor: '便宜机场推荐' },
                { target: '/tutorial/usage/buy/', anchor: '套餐购买指引' },
                { target: '/airport/price/pay-as-you-go/', anchor: '按量计费推荐' }
              ],
              priority: 'P2'
            },
            {
              title: '支持按量计费的专线高端机场盘点：谁说按量只有廉价直连',
              slug: 'premium-iepl-pay-as-you-go-airports',
              primaryKeyword: '专线按量计费机场',
              secondaryKeywords: ['高端按量梯子', 'IEPL不限时专线', '高品质按量付费', '贵族专线按需购买'],
              longTailKeywords: [
                '有没有按量计费的高端IEPL专线机场', '平时不用一用就必须秒开的高端按量梯子', '土豪专属不限时超高带宽节点',
                '单价虽贵但绝不缩水的专线按量', '支持流媒体解锁和原生IP的按量节点', '高品质按量机场真实测速',
                '2026顶级专线按量服务商'
              ],
              searchIntent: '购买',
              internalLinks: [
                { target: '/tech/line/iepl/', anchor: 'IEPL专线推荐' },
                { target: '/tech/ip/native/', anchor: '原生IP解锁' },
                { target: '/airport/type/premium/', anchor: '高端专线机场' }
              ],
              priority: 'P2'
            },
            {
              title: '按量计费账号过期与余额清零风险：如何辨识条款细则',
              slug: 'pay-as-you-go-expiration-terms-audit',
              primaryKeyword: '按量计费账号过期风险',
              secondaryKeywords: ['按量余额清空套路', '不限时条款陷阱', '机场用户服务协议', '长期不登录销号规则'],
              longTailKeywords: [
                '宣传永久有效但一年不登录被注销账号', '购买前如何审查机场TOS服务条款', '隐藏的半年必须充值一次规定',
                '遭遇强盗条款清零余额如何维权', '真正永不过期机场的判定标准', '保护账户余额长期有效注意事项',
                '2026按量服务商信誉白皮书'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/guide/buying/', anchor: '购买避坑指南' },
                { target: '/help/guide/scam/', anchor: '防诈骗与防跑路' },
                { target: '/airport/price/pay-as-you-go/', anchor: '按量计费推荐' }
              ],
              priority: 'P3'
            }
          ]
        }
      ]
    },
    {
      id: 'type',
      title: '按类型分类',
      path: '/airport/type/',
      clusters: [
        {
          id: 'premium',
          clusterId: '1.3.1',
          title: '专线机场推荐',
          path: '/airport/type/premium/',
          description: 'IEPL/IPLC 跨境内网专线，不过 GFW、超低延迟、晚高峰零丢包的旗舰梯子。',
          articles: [
            {
              title: '2026顶级专线机场推荐：IEPL/IPLC 独立不过墙高端梯子排行榜',
              slug: 'best-premium-dedicated-line-airports',
              primaryKeyword: '专线机场推荐',
              secondaryKeywords: ['IEPL专线梯子', 'IPLC专线机场', '不过墙高端机场', '顶级专线翻墙推荐'],
              longTailKeywords: [
                '哪家专线机场速度最快最稳定', '真正的IEPL内网专线机场有哪些', '晚高峰完全不卡顿的专线梯子',
                '不过GFW防火墙的专线原理解析', '企业级跨境专线机场横向测评', '高预算首选顶级科学上网专线',
                '支持全平台超低延迟游戏专线', '2026高端专线机场十佳排位'
              ],
              searchIntent: '购买',
              internalLinks: [
                { target: '/tech/line/iepl/', anchor: 'IEPL专线原理与深度横评' },
                { target: '/tech/line/iplc/', anchor: 'IPLC内网专线解析' },
                { target: '/airport/ranking/stable/', anchor: '超稳定机场排行榜' }
              ],
              priority: 'P0'
            },
            {
              title: '专线机场与普通中转直连实测差距：千元级体验到底贵在哪里',
              slug: 'dedicated-line-vs-transit-direct-difference',
              primaryKeyword: '专线与中转直连差距',
              secondaryKeywords: ['为什么专线机场这么贵', '专线体验提升有多大', '专线对比普通中转', '专线机场价值分析'],
              longTailKeywords: [
                '多花几十块钱买专线到底值不值', '直连中转专线三者丢包率真实对比', '看视频和开会专线提升明显吗',
                '为什么专线不受敏感时期封锁影响', '物理内网光缆与公网传输的区别', '专线机场的底层成本核算揭秘',
                '真实用户升级专线后的体验反馈'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/tutorial/compare/line/', anchor: '线路深度技术对比' },
                { target: '/tech/line/bgp/', anchor: 'BGP中转机场' },
                { target: '/airport/type/premium/', anchor: '专线机场推荐' }
              ],
              priority: 'P1'
            },
            {
              title: '如何辨识假专线：普通公网中转伪装IEPL的五大鉴定法门',
              slug: 'how-to-identify-fake-iepl-airports',
              primaryKeyword: '假专线机场辨别',
              secondaryKeywords: ['伪造IEPL专线套路', '测试是否为真实专线', 'Traceroute路由追踪鉴别', '辨别真假IPLC'],
              longTailKeywords: [
                '怎么测出机场是不是真的内网专线', '利用mtr和traceroute查看内网跳数', '过不过墙看敏感时期掉不掉线',
                '为什么有些便宜机场也敢叫IEPL', '用公网隧道冒充专线的黑心套路', '手把手教你鉴别假专线欺诈',
                '专业网络测试工具实操指南'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/help/guide/fake-website/', anchor: '防范虚假宣传指南' },
                { target: '/tech/line/iepl/', anchor: '真实IEPL特征' },
                { target: '/tutorial/basic/terms/', anchor: '网络术语通俗解释' }
              ],
              priority: 'P1'
            },
            {
              title: '超低延迟专线机场：港日新韩50ms以内电竞与高频交易梯子',
              slug: 'ultra-low-latency-dedicated-airports',
              primaryKeyword: '超低延迟专线机场',
              secondaryKeywords: ['50ms低延迟梯子', '炒币高频交易专线', '电竞对战低延迟节点', '广港专线极限延迟'],
              longTailKeywords: [
                '深圳到香港专线最低多少延迟', '币安OKX炒币毫秒级低延迟专线推荐', '玩韩服日服LoL不掉包专线',
                '全国不同省份接入专线延迟一览表', '极限压榨网络延迟的专线配置技巧', '金融从业人员专用高可靠专线',
                '2026极速低延迟专线排行榜'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/scenario/game/accel/', anchor: '外服游戏加速节点' },
                { target: '/tech/region/hongkong/', anchor: '香港超低延迟节点' },
                { target: '/airport/type/premium/', anchor: '专线机场推荐' }
              ],
              priority: 'P1'
            },
            {
              title: '全专线大厂品牌深度评测：主打高品质专线梯子的口碑代表作',
              slug: 'top-dedicated-line-brands-review',
              primaryKeyword: '大厂专线梯子评测',
              secondaryKeywords: ['高端专线品牌榜', '高口碑专线服务商', '专线机场老字号', '大厂专线深度剖析'],
              longTailKeywords: [
                '泡泡狗闪电猫专线体验怎么样', '国内最知名的三家专线大厂横评', '高客单价专线机场服务保障体系',
                '专线大厂客服响应速度与工单实测', '企业定制级专线翻墙产品评测', '不差钱用户的终极归宿梯子',
                '2026顶级专线标杆企业拆解'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/reviews/speedcat/', anchor: '闪电猫专线深度评测' },
                { target: '/reviews/paopaodog/', anchor: '泡泡狗高端专线实测' },
                { target: '/airport/ranking/top/', anchor: '综合机场排行榜' }
              ],
              priority: 'P2'
            },
            {
              title: '专线机场客户端调优指南：如何发挥IEPL万兆专线的狂暴性能',
              slug: 'dedicated-line-client-optimization-guide',
              primaryKeyword: '专线客户端优化设置',
              secondaryKeywords: ['发挥专线极致性能', 'Clash专线优化配置', '提升专线单线程吞吐', 'TUN模式专线加速'],
              longTailKeywords: [
                '买了专线为什么网速还是上不去', '开启TUN模式与优化系统TCP窗口大小', '专线环境下Clash内核参数调优',
                '如何避免本地WiFi成为专线瓶颈', '千兆内网专线满血调校攻略', '低延迟节点的正确选路策略',
                '打造家庭万兆翻墙体验教程'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/app/clash/', anchor: 'Clash高阶调优教程' },
                { target: '/client/device/windows/', anchor: 'Windows网络栈优化' },
                { target: '/tech/line/iepl/', anchor: 'IEPL性能解析' }
              ],
              priority: 'P2'
            },
            {
              title: '专线机场故障与熔断机制：专线出故障时如何自动平滑降级',
              slug: 'dedicated-line-failover-and-circuit-breaker',
              primaryKeyword: '专线故障熔断降级',
              secondaryKeywords: ['专线光缆挖断应对', '专线故障容灾机制', '专线备用中转切换', '高可用双专线调度'],
              longTailKeywords: [
                '专线会不会因为海底地震或施工被挖断', '专线宕机后机场如何自动走公网备用', '如何配置客户端自动避开故障专线',
                '多地域入口专线冗余容灾实测', '企业翻墙服务保障协议SLA深度解读', '面对突发断缆的应急保活方案',
                '2026专线抗灾韧性评估报告'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/airport/ranking/stable/', anchor: '双活冗余稳定机场' },
                { target: '/help/faq/timeout/', anchor: '单点故障排除' },
                { target: '/airport/type/premium/', anchor: '专线机场推荐' }
              ],
              priority: 'P2'
            },
            {
              title: '专线机场套餐选购攻略：如何根据预算精准挑选中高档专线',
              slug: 'how-to-choose-dedicated-line-plans',
              primaryKeyword: '专线套餐选购攻略',
              secondaryKeywords: ['专线预算规划', '挑选适合自己的专线', '专线流量配额选择', '高性价比专线梯子挑选'],
              longTailKeywords: [
                '月预算50元能买到什么样的专线套餐', '轻度使用如何购买专线才不浪费钱', '一人用与全家用专线流量如何预估',
                '专线套餐中的限速与连接数陷阱', '性价比专线与旗舰专线差异点剖析', '拒绝过度消费专线选型指南',
                '2026专线消费决策完全手册'
              ],
              searchIntent: '购买',
              internalLinks: [
                { target: '/airport/price/monthly/', anchor: '月付与年付对比' },
                { target: '/help/guide/buying/', anchor: '购买避坑法则' },
                { target: '/airport/type/premium/', anchor: '专线机场推荐' }
              ],
              priority: 'P3'
            }
          ]
        },
        {
          id: 'free-trial',
          clusterId: '1.3.2',
          title: '免费试用机场',
          path: '/airport/type/free-trial/',
          description: '支持注册免费试用、赠送初始体验流量与 0 元白嫖的正规机场精选。',
          articles: [
            {
              title: '2026免费试用机场合集：注册即送体验流量的正规梯子盘点',
              slug: 'best-free-trial-airports-2026',
              primaryKeyword: '免费试用机场',
              secondaryKeywords: ['注册送流量梯子', '0元试用翻墙', '免费体验机场推荐', '不花钱先测试梯子'],
              longTailKeywords: [
                '有哪些靠谱机场可以先试用后买', '注册白送5G到10G体验流量的机场', '不用绑定信用卡直接试用的梯子',
                '正规可测试速度的试用翻墙推荐', '免费试用节点可以看YouTube吗', '先尝后买零风险机场精选',
                '支持Clash订阅的免费试用机场', '2026正规白嫖体验梯子合集'
              ],
              searchIntent: '购买',
              internalLinks: [
                { target: '/airport/price/cheap/', anchor: '试用满意转便宜套餐' },
                { target: '/tutorial/usage/buy/', anchor: '注册与订阅导入' },
                { target: '/help/guide/security/', anchor: '试用安全防坑' }
              ],
              priority: 'P0'
            },
            {
              title: '免费试用机场的正确姿势：如何在试用期内测出真实水平',
              slug: 'how-to-test-airports-during-free-trial',
              primaryKeyword: '试用期测速技巧',
              secondaryKeywords: ['如何测试试用节点', '辨别试用专用诱饵节点', '试用期测速步骤', '避免试用快付款慢陷阱'],
              longTailKeywords: [
                '试用期节点是不是故意给最好的带宽', '测试免费试用机场必须要跑的几项测试', '晚高峰8点到10点严格压力测试法',
                '如何测试试用节点是否解锁流媒体与ChatGPT', '试用期流量有限如何高效测速', '识破试用高配付款降配的虚假机场',
                '专业科学上网试用验收清单'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/help/faq/slow/', anchor: '网络测速与晚高峰排查' },
                { target: '/scenario/streaming/all/', anchor: '流媒体解锁检验' },
                { target: '/airport/type/free-trial/', anchor: '免费试用机场推荐' }
              ],
              priority: 'P1'
            },
            {
              title: '警惕免费试用陷阱：注册需要提供个人敏感信息的机场千万别碰',
              slug: 'free-trial-airports-privacy-risks',
              primaryKeyword: '免费试用安全陷阱',
              secondaryKeywords: ['试用隐私泄露风险', '免费梯子套取手机号', '信用卡试用扣费陷阱', '假试用真诈骗揭秘'],
              longTailKeywords: [
                '注册免费试用要求填真实手机号靠谱吗', '需要绑定双币信用卡才能试用的机场扣费陷阱', '免费试用如何防止个人邮箱被滥发垃圾邮件',
                '套取个人浏览记录的免费代理软件危害', '安全体验试用机场的匿名注册技巧', '临时邮箱与虚拟小号使用建议',
                '翻墙新手个人信息安全防护'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/guide/security/', anchor: '翻墙安全与隐私全攻略' },
                { target: '/help/guide/scam/', anchor: '诈骗与跑路预警' },
                { target: '/airport/type/free-trial/', anchor: '免费试用推荐' }
              ],
              priority: 'P1'
            },
            {
              title: '永久免费白嫖梯子真的存在吗：公益节点与群友分享内幕',
              slug: 'truth-about-permanent-free-airports',
              primaryKeyword: '永久免费机场真相',
              secondaryKeywords: ['白嫖公益节点靠谱吗', 'TG群免费节点内幕', '永久免费梯子骗局', '抓取免费节点风险'],
              longTailKeywords: [
                '网上分享的几万条免费Vmess节点谁建的', '公益机场到底能维持运营多久', '免费节点的蜜罐监听与安全审查风险',
                '频繁失效每过半小时换一次节点的折磨', '为什么正规梯子不可能做到永久免费', '揭秘免费订阅分享背后的流量黑产',
                '理性看待免费科学上网资源'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/guide/security/', anchor: '公共节点蜜罐风险' },
                { target: '/airport/price/cheap/', anchor: '平价便宜替代方案' },
                { target: '/tutorial/basic/what-is/', anchor: '机场服务器成本构成' }
              ],
              priority: 'P1'
            },
            {
              title: '每日签到领流量白嫖机场：薅羊毛党长期自用靠谱清单',
              slug: 'daily-check-in-free-traffic-airports',
              primaryKeyword: '签到领流量机场',
              secondaryKeywords: ['每日签到翻墙梯子', '白嫖签到送流量', '学生党签到机场', '长期薅羊毛梯子'],
              longTailKeywords: [
                '每天点一下签到领1G流量的良心机场', '签到领流量的机场速度和稳定性如何', '适合偶尔查词典轻度翻墙的签到神器',
                '自动签到脚本配置可行性与封号风险', '有哪些老牌机场保留了每日签到福利', '签到薅羊毛科学上网全攻略',
                '2026靠谱签到送流量机场排查'
              ],
              searchIntent: '购买',
              internalLinks: [
                { target: '/airport/price/pay-as-you-go/', anchor: '轻度按量计费套餐' },
                { target: '/airport/type/free-trial/', anchor: '免费试用机场' },
                { target: '/tutorial/usage/subscribe/', anchor: '订阅导入与配置' }
              ],
              priority: 'P2'
            },
            {
              title: '1元体验试水套餐：比纯免费更靠谱的极低门槛测速方式',
              slug: 'one-yuan-trial-package-airports',
              primaryKeyword: '1元体验机场',
              secondaryKeywords: ['一元试用翻墙', '极低成本测速套餐', '1元尝鲜机场推荐', '几毛钱试用梯子'],
              longTailKeywords: [
                '花1块钱买个3天体验包测速靠谱吗', '为什么很多优质机场取消免费改为1元试水', '1元试水套餐包含完整专线节点吗',
                '如何用1元钱检验机场客服响应与技术实力', '防滥用1元验证机制的好处解析', '超低成本实测多款主流机场攻略',
                '2026年1元体验机场良心合集'
              ],
              searchIntent: '购买',
              internalLinks: [
                { target: '/airport/price/cheap/', anchor: '便宜月付推荐' },
                { target: '/airport/ranking/top/', anchor: '综合机场排行榜' },
                { target: '/airport/type/free-trial/', anchor: '免费试用机场' }
              ],
              priority: 'P2'
            },
            {
              title: '试用满意转正指南：如何升级正式套餐并抵扣初始测试花费',
              slug: 'upgrading-from-trial-to-paid-plan',
              primaryKeyword: '试用升级正式套餐',
              secondaryKeywords: ['体验版转正式订阅', '抵扣试用费升级', '新用户升级优惠', '转换正式套餐注意事项'],
              longTailKeywords: [
                '试用期满意后怎么直接升级到月付/年付', '部分机场升级套餐自动补差价规则', '升级正式版后是否需要重新导入订阅链接',
                '正式版节点是否比试用节点更多更全', '升级套餐时如何输入最新优惠码省钱', '试用期剩余流量是否能结转到正式套餐',
                '新手平滑升级正式订阅实操指南'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/airport/type/coupon/', anchor: '最新机场优惠码领取' },
                { target: '/tutorial/usage/subscribe/', anchor: '更新订阅链接方法' },
                { target: '/airport/type/free-trial/', anchor: '免费试用机场' }
              ],
              priority: 'P2'
            },
            {
              title: '免费试用防封号准则：避免被系统风控识别为羊毛党的行为',
              slug: 'avoid-getting-banned-on-free-trial',
              primaryKeyword: '试用防封号准则',
              secondaryKeywords: ['避免机场账号被封', '多账号滥用试用风控', '合规使用试用流量', '防滥用系统规则解读'],
              longTailKeywords: [
                '注册多个小号试用被连坐封IP怎么办', '使用接码平台注册被自动拦截原因', '禁止使用试用节点进行BT下载与挖矿',
                '机场防火墙对试用账号的严格限制说明', '做一名体面的翻墙测试用户守则', '试用期账号突然被封禁申诉教程',
                '机场反作弊风控系统运行逻辑'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/guide/buying/', anchor: '新手防坑守则' },
                { target: '/help/guide/security/', anchor: '账号安全规范' },
                { target: '/airport/type/free-trial/', anchor: '免费试用推荐' }
              ],
              priority: 'P3'
            }
          ]
        },
        {
          id: 'coupon',
          clusterId: '1.3.3',
          title: '机场优惠码',
          path: '/airport/type/coupon/',
          description: '独家打折码、节日满减券与新老用户专属优惠福利持续更新与一键复制。',
          articles: [
            {
              title: '2026各大主流机场最新优惠码大全：独家大额折扣码一键复制领取',
              slug: 'latest-airport-coupon-codes-2026',
              primaryKeyword: '机场优惠码',
              secondaryKeywords: ['2026梯子打折码', '大牌机场折扣券', '翻墙优惠码一键复制', '最新机场促销活动'],
              longTailKeywords: [
                '最新的机场折扣码去哪里找', '立减20%的大额机场优惠码有哪些', '买机场怎么输入优惠码打折',
                '2026长期有效老牌机场优惠码', '各大主流机场新年开工大促打折码', '年付额外叠加折扣神券领取',
                '一键复制粘贴机场优惠码指南', '最新有效科学上网促销码合集'
              ],
              searchIntent: '转化',
              internalLinks: [
                { target: '/airport/ranking/top/', anchor: '机场排行榜' },
                { target: '/airport/price/cheap/', anchor: '便宜平价机场' },
                { target: '/reviews/geekcloud/', anchor: '极客云独家优惠' },
                { target: '/reviews/speedcat/', anchor: '闪电猫优惠码' }
              ],
              priority: 'P0'
            },
            {
              title: '机场优惠码使用教程：结账界面如何正确应用折扣与排查失效',
              slug: 'how-to-use-and-apply-coupon-codes',
              primaryKeyword: '机场优惠码使用教程',
              secondaryKeywords: ['折扣码输入步骤', '优惠券失效原因排查', '结账折扣未生效解决', '大促优惠码生效指南'],
              longTailKeywords: [
                '机场网站在哪里输入优惠码', '为什么输入优惠券提示不存在或过期', '区分大小写与空格导致优惠码报错',
                '月付套餐能不能使用年付专属折扣码', '优惠码应用成功后总价未变化怎么解决', '手把手教你完成打折结账全流程',
                '掌握机场结账省钱实操技巧'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/tutorial/usage/buy/', anchor: '购买与支付完整流程' },
                { target: '/airport/type/coupon/', anchor: '最新优惠码大全' },
                { target: '/help/guide/buying/', anchor: '购买避坑常识' }
              ],
              priority: 'P1'
            },
            {
              title: '双十一/黑五/开学季促销预测：各大机场重大节日打折时间表',
              slug: 'holiday-sales-and-black-friday-calendar',
              primaryKeyword: '机场黑五双十一促销',
              secondaryKeywords: ['机场打折时间表', '黑五梯子骨折大促', '双十一翻墙促销', '节假日机场优惠预测'],
              longTailKeywords: [
                '每年什么时候买机场最便宜', '黑五期间机场折扣一般能打几折', '双十一机场促销优惠力度盘点',
                '国庆中秋春节各平台促销时间节点', '提前准备续费抢大额限量神券秘诀', '一年一度史低价格入手指南',
                '2026年机场促销日历完全手册'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/airport/price/monthly/', anchor: '年付大促选购指南' },
                { target: '/airport/ranking/stable/', anchor: '稳定品牌大促' },
                { target: '/airport/type/coupon/', anchor: '实时优惠码汇总' }
              ],
              priority: 'P1'
            },
            {
              title: '新用户首单优惠 vs 老用户续费折扣：不同身份如何最大化省钱',
              slug: 'new-user-vs-renewal-discounts',
              primaryKeyword: '新用户首单优惠',
              secondaryKeywords: ['老用户续费打折码', '老客户省钱秘籍', '换新账号首单优惠可行性', '长期续费省钱策略'],
              longTailKeywords: [
                '老用户续费为什么比新买贵那么多', '续费有没有专属的老客户回馈优惠码', '注销账号重新注册拿首单优惠违规吗',
                '老牌机场长期续费奖励与积分抵扣', '如何找客服申请老用户专属续费打折', '新老用户价格歧视应对全攻略',
                '聪明用户的长期科学上网理财法'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/help/guide/buying/', anchor: '防价格陷阱' },
                { target: '/airport/type/coupon/', anchor: '通用优惠码领取' },
                { target: '/airport/price/monthly/', anchor: '续费周期选择' }
              ],
              priority: 'P1'
            },
            {
              title: '邀请返利与Affiliate推荐计划：自己翻墙顺便赚取免费时长的秘籍',
              slug: 'airport-affiliate-and-referral-program',
              primaryKeyword: '机场邀请返利计划',
              secondaryKeywords: ['Affiliate推荐佣金', '邀请好友免费翻墙', '推广机场赚佣金提现', '梯子推荐返利规则'],
              longTailKeywords: [
                '怎么生成自己的机场专属邀请链接', '推荐朋友购买能拿到多少百分比佣金', '返利佣金直接抵扣订阅月费教程',
                '高额返利能提现到支付宝微信吗', '各大主流机场Aff推广政策对比', '合法合规分享推荐避险原则',
                '零成本长期免费科学上网秘籍'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/tutorial/usage/buy/', anchor: '账号后台管理' },
                { target: '/help/guide/security/', anchor: '推广合规与隐私安全' },
                { target: '/airport/type/coupon/', anchor: '优惠码领取' }
              ],
              priority: 'P2'
            },
            {
              title: '假优惠码钓鱼网站大起底：搜优惠码搜出木马木马盗刷银行卡',
              slug: 'fake-coupon-code-phishing-sites',
              primaryKeyword: '假优惠码钓鱼网站',
              secondaryKeywords: ['优惠码钓鱼诈骗', '山寨机场打折网站', '假优惠码窃取密码', '辨别真假折扣入口'],
              longTailKeywords: [
                '搜索机场优惠码跳转到假官网被骗钱', '盗版优惠券网站挂马与恶意跳转揭秘', '虚假90%大额折扣诱导输入信用卡',
                '如何判断优惠码发布来源是否官方可信', '官方合作渠道与野鸡钓鱼站甄别法', '受骗后银行卡紧急挂失止损步骤',
                '2026安全领取优惠码避雷防线'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/guide/fake-website/', anchor: '官网真假辨别指南' },
                { target: '/help/guide/security/', anchor: '网络安全与防钓鱼' },
                { target: '/airport/type/coupon/', anchor: '官方核验真实优惠码' }
              ],
              priority: 'P2'
            },
            {
              title: '大促期间优惠与跑路风险成正比吗：超低折扣背后资金链风险研判',
              slug: 'deep-discounts-and-exit-scam-correlation',
              primaryKeyword: '大促与跑路风险关联',
              secondaryKeywords: ['骨折促销卷款跑路', '超低折扣风险分析', '突发大打折警惕跑路', '机场财务状况预判'],
              longTailKeywords: [
                '平时不打折的机场突然搞3折是不是要跑', '大促狂收一波年费跑路经典案例复盘', '如何分辨正常节日促销与恶意集资卷款',
                '查看机场成立年份与历史促销周期', '理性消费别为贪便宜买三年五年套餐', '保卫本金安全的重要防线',
                '2026机场跑路风险科学预警'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/guide/scam/', anchor: '机场跑路十大前兆' },
                { target: '/airport/ranking/stable/', anchor: '高信誉老牌品牌' },
                { target: '/airport/type/coupon/', anchor: '真实可用优惠券' }
              ],
              priority: 'P2'
            },
            {
              title: '独家渠道合作专享码揭秘：行业评测站专属福利与官方直通车',
              slug: 'exclusive-partner-coupon-codes-explained',
              primaryKeyword: '独家渠道专享码',
              secondaryKeywords: ['评测站专享折扣', '内部直通优惠码', '商务合作专属优惠', '长效专属打折码'],
              longTailKeywords: [
                'AirPick独家专享优惠码怎么获取', '评测站点与机场官方合作折扣真实度', '专属优惠码是否能享受更多技术保障',
                '渠道专属打折码长期有效维护机制', '为什么专属码往往比公开码折扣更大', '尊享折上折福利领取全流程',
                'AirPick读者专属特惠汇总页'
              ],
              searchIntent: '转化',
              internalLinks: [
                { target: '/about', anchor: '关于 AirPick 合作透明度' },
                { target: '/airport/ranking/top/', anchor: '排行榜精选' },
                { target: '/airport/type/coupon/', anchor: '专属优惠码合集' }
              ],
              priority: 'P3'
            }
          ]
        }
      ]
    }
  ]
};
