module.exports = {
  id: 'reviews',
  title: '机场品牌评测专栏',
  path: '/reviews/',
  description: '客观、透明、独立的一线主流机场深度横向与专项测评专栏，严格基于真机测速数据与风控实测。',
  brands: [
    {
      id: 'guangsucloud',
      name: '光速云',
      slug: 'guangsucloud',
      rank: 1,
      isPrimary: true,
      path: '/reviews/guangsucloud/',
      badge: '2020老牌·综合第一·全网主推',
      lineType: 'IEPL企业级内网专线 + 全球IPLC',
      protocol: 'VLESS',
      speed: '2500+ Mbps (单节点最高2.5Gbps)',
      startingPrice: '年付折合约 7.5 元/月 (59GB/月)；月付 23 元/月 (148GB/月)',
      priceMonthly: '23元/月 (148GB)',
      customTier: '680元/月 (500GB独立IP全球定制专线)',
      discount: '新用户 8 折',
      coupon: 'AMM',
      affLink: 'https://sahude.gsyvipaff.com/#/?code=keqgvT5Y',
      features: ['全节点x1无倍率套路', '自研+第三方客户端', 'Netflix/Disney+全解锁', 'ChatGPT/Claude原生支持', '7x24小时智能运维'],
      testImage: '/images/tests/光速云-节点测速实测.png',
      unlockImage: '/images/tests/photo_2026-08-19_12-13-01.jpg',
      articles: [
        {
          title: '光速云官网最新地址与2026官方正版注册购买通道（防失联直达）',
          slug: 'website',
          primaryKeyword: '光速云官网',
          secondaryKeywords: ['光速云最新地址', '光速云注册', '光速云防失联', '光速云打不开解决'],
          longTailKeywords: ['光速云2026年最新官方网址是什么', '光速云国内免翻墙直连地址', '如何注册光速云账号并导入订阅', '辨别光速云高仿钓鱼网站技巧'],
          searchIntent: '转化',
          internalLinks: [
            { target: '/reviews/guangsucloud/review', anchor: '光速云深度评测' },
            { target: '/reviews/guangsucloud/plans', anchor: '光速云套餐价格表' },
            { target: '/reviews/guangsucloud/speed', anchor: '光速云测速报告' }
          ],
          priority: 'P0'
        },
        {
          title: '光速云怎么样好用吗：2026真实测速、晚高峰丢包与稳定性全方位评测',
          slug: 'review',
          primaryKeyword: '光速云怎么样',
          secondaryKeywords: ['光速云好用吗', '光速云稳定吗', '光速云测速跑分', '光速云真实用户评价'],
          longTailKeywords: ['光速云晚高峰看油管4K卡不卡', '光速云延迟和丢包率真实监测报告', '光速云运营了几年靠谱不靠谱', '光速云值得买吗优缺点深度剖析'],
          searchIntent: '决策',
          internalLinks: [
            { target: '/reviews/guangsucloud/website', anchor: '光速云官网' },
            { target: '/reviews/guangsucloud/unlock', anchor: '光速云流媒体与AI解锁' },
            { target: '/airport/ranking/top/', anchor: '综合机场排行榜' }
          ],
          priority: 'P0'
        },
        {
          title: '光速云套餐价格表与2026独家8折优惠码AMM使用指南（立省20%）',
          slug: 'plans',
          primaryKeyword: '光速云价格套餐',
          secondaryKeywords: ['光速云优惠码', '光速云多少钱一个月', '光速云年付折扣', '光速云AMM折扣券'],
          longTailKeywords: ['光速云月付和年付套餐价格对照表', '光速云2026长期有效折扣券代码AMM', '光速云680元定制独立IP专线怎么样', '如何使用优惠码一键抵扣升级'],
          searchIntent: '购买',
          internalLinks: [
            { target: '/reviews/guangsucloud/website', anchor: '光速云注册通道' },
            { target: '/reviews/guangsucloud/review', anchor: '光速云横向实测' },
            { target: '/airport/price/cheap/', anchor: '平价性价比梯子' }
          ],
          priority: 'P0'
        },
        {
          title: '光速云晚高峰测速跑分报告：2.5Gbps单节点下行与全天0丢包实录',
          slug: 'speed',
          primaryKeyword: '光速云测速',
          secondaryKeywords: ['光速云晚高峰测速', '光速云跑分实测', '光速云单节点速度', '光速云丢包率'],
          longTailKeywords: ['光速云香港日本节点延迟测试', '晚高峰21点Speedtest单线程速率', '光速云4K视频缓冲健康度测试', '真机测速图解读'],
          searchIntent: '测试',
          internalLinks: [
            { target: '/reviews/guangsucloud/review', anchor: '光速云综合实力' },
            { target: '/reviews/guangsucloud/unlock', anchor: '解锁能力验证' },
            { target: '/tech/line/iepl/', anchor: 'IEPL专线原理' }
          ],
          priority: 'P0'
        },
        {
          title: '光速云流媒体与ChatGPT原生解锁实测：Netflix全区/Claude零风控直通',
          slug: 'unlock',
          primaryKeyword: '光速云解锁能力',
          secondaryKeywords: ['光速云ChatGPT支持', '光速云Netflix解锁', '光速云Claude访问', '光速云TikTok直播'],
          longTailKeywords: ['光速云能否看网飞非自制剧', '登录OpenAI是否会报1020错误', '光速云节点IP纯净度与欺诈分', '解锁图实测分析'],
          searchIntent: '测试',
          internalLinks: [
            { target: '/scenario/ai/chatgpt/', anchor: 'ChatGPT专用梯子推荐' },
            { target: '/scenario/media/netflix/', anchor: 'Netflix 4K梯子推荐' },
            { target: '/reviews/guangsucloud/website', anchor: '光速云官网直达' }
          ],
          priority: 'P0'
        }
      ]
    },
    {
      id: 'feimaocloud',
      name: '飞猫云',
      slug: 'feimaocloud',
      rank: 2,
      path: '/reviews/feimaocloud/',
      badge: '2023运营·综合第二·年付超低价',
      lineType: 'IEPL企业级专线',
      protocol: 'VLESS / Shadowsocks',
      speed: '800+ Mbps',
      startingPrice: '年付折合约 7 元/月 (50GB/月)',
      discount: '季付及以上 8 折',
      coupon: 'flycat888',
      affLink: 'https://guangs.flycataff.com/#/?code=6uq0Xe9y',
      features: ['低价小流量首选', '自研+第三方客户端', 'IEPL专线低延迟', '三网BGP接入'],
      testImage: '/images/tests/飞猫云-节点测速实测.png',
      articles: [
        {
          title: '飞猫云官网最新入口与2026官方注册购买通道（防失联通道）',
          slug: 'website',
          primaryKeyword: '飞猫云官网',
          secondaryKeywords: ['飞猫云最新地址', '飞猫云注册', '飞猫云防失联', '飞猫云官方入口'],
          longTailKeywords: ['飞猫云2026年最新网址', '飞猫云国内直接访问地址', '如何注册飞猫云账号', '飞猫云订阅链接提取教程'],
          searchIntent: '转化',
          internalLinks: [{ target: '/reviews/feimaocloud/review', anchor: '飞猫云深度评测' }, { target: '/reviews/feimaocloud/plans', anchor: '飞猫云套餐价格' }],
          priority: 'P0'
        },
        {
          title: '飞猫云怎么样好用吗：2026真实测速、IEPL专线与轻度出海评测',
          slug: 'review',
          primaryKeyword: '飞猫云怎么样',
          secondaryKeywords: ['飞猫云好用吗', '飞猫云稳定吗', '飞猫云性价比', '飞猫云真实评价'],
          longTailKeywords: ['飞猫云7元一个月靠谱吗', '飞猫云晚高峰网络延迟实测', '飞猫云适合什么人用', '飞猫云优缺点深度解析'],
          searchIntent: '决策',
          internalLinks: [{ target: '/reviews/feimaocloud/website', anchor: '飞猫云官网' }, { target: '/airport/ranking/top/', anchor: '综合机场排行榜' }],
          priority: 'P0'
        },
        {
          title: '飞猫云套餐价格表与2026独家8折优惠码flycat888领用指引',
          slug: 'plans',
          primaryKeyword: '飞猫云价格套餐',
          secondaryKeywords: ['飞猫云优惠码', '飞猫云多少钱一年', '飞猫云flycat888折扣', '飞猫云性价比'],
          longTailKeywords: ['飞猫云年付折算7元套餐详解', '飞猫云季付8折优惠券怎么用', '飞猫云适合学生党吗'],
          searchIntent: '购买',
          internalLinks: [{ target: '/reviews/feimaocloud/website', anchor: '飞猫云官网' }, { target: '/airport/price/cheap/', anchor: '平价性价比梯子' }],
          priority: 'P0'
        },
        {
          title: '飞猫云晚高峰测速跑分：800M专线下行与香港日本节点实测报告',
          slug: 'speed',
          primaryKeyword: '飞猫云测速',
          secondaryKeywords: ['飞猫云晚高峰测速', '飞猫云跑分实测', '飞猫云延迟测试', '飞猫云真机截图'],
          longTailKeywords: ['飞猫云节点测速实测图解读', '香港IEPL专线延迟测试', '晚高峰800Mbps带宽表现'],
          searchIntent: '测试',
          internalLinks: [{ target: '/reviews/feimaocloud/review', anchor: '飞猫云评测' }, { target: '/tech/line/iepl/', anchor: 'IEPL专线技术' }],
          priority: 'P0'
        },
        {
          title: '飞猫云流媒体与日常AI工具支持能力实测报告',
          slug: 'unlock',
          primaryKeyword: '飞猫云解锁能力',
          secondaryKeywords: ['飞猫云Netflix解锁', '飞猫云ChatGPT支持', '飞猫云油管4K', '飞猫云流媒体'],
          longTailKeywords: ['飞猫云看视频流畅吗', '飞猫云支持OpenAI官网登录吗', '飞猫云节点IP纯净度评估'],
          searchIntent: '测试',
          internalLinks: [{ target: '/scenario/media/youtube/', anchor: 'YouTube 4K梯子' }, { target: '/reviews/feimaocloud/website', anchor: '飞猫云官网' }],
          priority: 'P0'
        }
      ]
    },
    {
      id: 'breezenet',
      name: '微风网络',
      slug: 'breezenet',
      rank: 3,
      path: '/reviews/breezenet/',
      badge: '2023运营·综合第三·轻度高性价比',
      lineType: 'IEPL企业级专线',
      protocol: 'VLESS / Shadowsocks',
      speed: '750+ Mbps',
      startingPrice: '年付折合约 7 元/月 (50GB/月)',
      discount: '季付及以上 9 折',
      coupon: 'flat888',
      affLink: 'https://edp01.breezenetaff.com/#/?code=t3huofyI',
      features: ['小流量低价年付', '自研+第三方客户端', '网页社交AI轻度优选', '高可用专线'],
      testImage: '/images/tests/微风-节点测速实测.png',
      articles: [
        {
          title: '微风网络官网最新入口与2026注册购买指南（官方防迷路发布页）',
          slug: 'website',
          primaryKeyword: '微风网络官网',
          secondaryKeywords: ['微风网络最新地址', '微风网络注册', '微风网络防失联', '微风网络打不开'],
          longTailKeywords: ['微风网络2026年官网网址', '微风网络直达注册链接', '微风网络如何获取订阅'],
          searchIntent: '转化',
          internalLinks: [{ target: '/reviews/breezenet/review', anchor: '微风网络深度评测' }, { target: '/reviews/breezenet/plans', anchor: '微风网络价格表' }],
          priority: 'P0'
        },
        {
          title: '微风网络怎么样好用吗：2026真实测速、IEPL低价年付与轻度使用评测',
          slug: 'review',
          primaryKeyword: '微风网络怎么样',
          secondaryKeywords: ['微风网络好用吗', '微风网络稳定吗', '微风网络测速跑分', '微风网络用户评价'],
          longTailKeywords: ['微风网络7元一个月好不好用', '微风网络晚高峰卡不卡', '微风网络适合轻度用户吗'],
          searchIntent: '决策',
          internalLinks: [{ target: '/reviews/breezenet/website', anchor: '微风网络官网' }, { target: '/airport/ranking/top/', anchor: '综合机场排行榜' }],
          priority: 'P0'
        },
        {
          title: '微风网络套餐价格表与2026独家9折优惠码flat888领用指引',
          slug: 'plans',
          primaryKeyword: '微风网络价格套餐',
          secondaryKeywords: ['微风网络优惠码', '微风网络多少钱一个月', '微风网络flat888折扣', '微风网络年付'],
          longTailKeywords: ['微风网络年付50G套餐性价比', '微风网络优惠券兑换方法', '微风网络支付方式支付宝微信'],
          searchIntent: '购买',
          internalLinks: [{ target: '/reviews/breezenet/website', anchor: '微风网络官网' }, { target: '/airport/price/cheap/', anchor: '平价性价比梯子' }],
          priority: 'P0'
        },
        {
          title: '微风网络晚高峰真实节点测速跑分与延迟监控报告',
          slug: 'speed',
          primaryKeyword: '微风网络测速',
          secondaryKeywords: ['微风网络测速实测', '微风网络晚高峰跑分', '微风网络延迟表现', '微风网络测速图'],
          longTailKeywords: ['微风网络实测图片解析', '微风网络香港节点下行带宽', '微风网络丢包率测试报告'],
          searchIntent: '测试',
          internalLinks: [{ target: '/reviews/breezenet/review', anchor: '微风网络评测' }, { target: '/tech/line/iepl/', anchor: 'IEPL专线' }],
          priority: 'P0'
        },
        {
          title: '微风网络常见海外AI与流媒体平台访问能力实测',
          slug: 'unlock',
          primaryKeyword: '微风网络解锁能力',
          secondaryKeywords: ['微风网络ChatGPT支持', '微风网络流媒体', '微风网络油管视频', '微风网络解锁'],
          longTailKeywords: ['微风网络能否正常使用AI工具', '微风网络油管看1080P/4K表现', '微风网络节点纯净度'],
          searchIntent: '测试',
          internalLinks: [{ target: '/scenario/ai/chatgpt/', anchor: 'ChatGPT梯子' }, { target: '/reviews/breezenet/website', anchor: '微风网络官网' }],
          priority: 'P0'
        }
      ]
    },
    {
      id: 'xingdaomeng',
      name: '星岛梦',
      slug: 'xingdaomeng',
      rank: 4,
      path: '/reviews/xingdaomeng/',
      badge: '2020老牌·综合第四·不限时套餐丰富',
      lineType: '企业级内网专线',
      protocol: 'VLESS / Shadowsocks',
      speed: '850+ Mbps',
      startingPrice: '年付折合约 8 元/月 (60GB/月)；提供不限时套餐',
      discount: '新用户 9 折',
      coupon: 'nmw888',
      affLink: 'https://guangs.xingdaomeng.com/#/?code=1TynBYnR',
      features: ['2020年老牌稳定运营', '丰富不限时按量套餐', '企业级内网专线', '第三方客户端原生支持'],
      testImage: '/images/tests/星岛梦-节点测速实测.png',
      articles: [
        {
          title: '星岛梦官网最新地址与2026正版注册通道（防失联直达）',
          slug: 'website',
          primaryKeyword: '星岛梦官网',
          secondaryKeywords: ['星岛梦最新地址', '星岛梦注册', '星岛梦防失联', '星岛梦官网直达'],
          longTailKeywords: ['星岛梦2026年最新官方网址', '星岛梦账号注册与购买流程', '星岛梦订阅导入'],
          searchIntent: '转化',
          internalLinks: [{ target: '/reviews/xingdaomeng/review', anchor: '星岛梦评测' }, { target: '/reviews/xingdaomeng/plans', anchor: '星岛梦价格表' }],
          priority: 'P0'
        },
        {
          title: '星岛梦怎么样好用吗：2020老牌机场、不限时套餐与稳定性实测',
          slug: 'review',
          primaryKeyword: '星岛梦怎么样',
          secondaryKeywords: ['星岛梦好用吗', '星岛梦稳定吗', '星岛梦跑路风险', '星岛梦评测'],
          longTailKeywords: ['星岛梦运营4年表现如何', '星岛梦不限时套餐划算吗', '星岛梦晚高峰稳定性评测'],
          searchIntent: '决策',
          internalLinks: [{ target: '/reviews/xingdaomeng/website', anchor: '星岛梦官网' }, { target: '/airport/ranking/stable/', anchor: '超稳定梯子' }],
          priority: 'P0'
        },
        {
          title: '星岛梦套餐价格表与2026独家9折优惠码nmw888使用指南',
          slug: 'plans',
          primaryKeyword: '星岛梦价格套餐',
          secondaryKeywords: ['星岛梦优惠码', '星岛梦多少钱', '星岛梦nmw888折扣', '星岛梦不限时流量包'],
          longTailKeywords: ['星岛梦年付60G套餐详解', '星岛梦不限时纯流量包价格表', '星岛梦优惠码核销流程'],
          searchIntent: '购买',
          internalLinks: [{ target: '/reviews/xingdaomeng/website', anchor: '星岛梦官网' }, { target: '/airport/price/traffic/', anchor: '按量计费梯子' }],
          priority: 'P0'
        },
        {
          title: '星岛梦晚高峰测速报告：内网专线延迟与各节点带宽实测图解',
          slug: 'speed',
          primaryKeyword: '星岛梦测速',
          secondaryKeywords: ['星岛梦测速实测', '星岛梦跑分', '星岛梦测速截图', '星岛梦丢包率'],
          longTailKeywords: ['星岛梦节点测速截图分析', '星岛梦香港节点延迟与带宽', '星岛梦真机测速结果'],
          searchIntent: '测试',
          internalLinks: [{ target: '/reviews/xingdaomeng/review', anchor: '星岛梦深度评测' }, { target: '/tech/line/bgp/', anchor: '内网中转架构' }],
          priority: 'P0'
        },
        {
          title: '星岛梦海外网络访问与多端客户端使用体验评测',
          slug: 'unlock',
          primaryKeyword: '星岛梦解锁能力',
          secondaryKeywords: ['星岛梦ChatGPT', '星岛梦看油管', '星岛梦流媒体', '星岛梦Clash配置'],
          longTailKeywords: ['星岛梦支持小火箭Clash吗', '星岛梦访问外网网页速度', '星岛梦节点可用率'],
          searchIntent: '测试',
          internalLinks: [{ target: '/client/app/clash/', anchor: 'Clash配置教程' }, { target: '/reviews/xingdaomeng/website', anchor: '星岛梦官网' }],
          priority: 'P0'
        }
      ]
    },
    {
      id: 'worryfree',
      name: '无忧链接',
      slug: 'worryfree',
      rank: 5,
      path: '/reviews/worryfree/',
      badge: '2025新星·综合第五·低至6元起',
      lineType: 'IEPL企业级专线',
      protocol: 'VLESS',
      speed: '900+ Mbps',
      startingPrice: '19 元/月 (100GB/月)；轻量级低至 6 元/月',
      discount: '新人专属优惠',
      coupon: 'wuyou666',
      affLink: 'https://wep01.worryfreeaff.com/#/?code=4ZoSbLdL',
      features: ['低至6元轻量套餐', '免转换原生全客户端支持', 'VLESS协议IEPL专线', '中等流量均衡优选'],
      articles: [
        {
          title: '无忧链接官网最新直达地址与2026注册购买通道',
          slug: 'website',
          primaryKeyword: '无忧链接官网',
          secondaryKeywords: ['无忧链接最新地址', '无忧链接注册', '无忧链接防失联', '无忧链接直达'],
          longTailKeywords: ['无忧链接2026官方网址', '无忧链接免翻墙入口', '无忧链接账号注册流程'],
          searchIntent: '转化',
          internalLinks: [{ target: '/reviews/worryfree/review', anchor: '无忧链接深度评测' }, { target: '/reviews/worryfree/plans', anchor: '无忧链接套餐' }],
          priority: 'P0'
        },
        {
          title: '无忧链接怎么样好用吗：2026新星IEPL专线、6元轻量包与体验评测',
          slug: 'review',
          primaryKeyword: '无忧链接怎么样',
          secondaryKeywords: ['无忧链接好用吗', '无忧链接稳定吗', '无忧链接评测', '无忧链接性价比'],
          longTailKeywords: ['无忧链接6元套餐怎么样', '无忧链接19元100G套餐实测', '无忧链接值得入手吗'],
          searchIntent: '决策',
          internalLinks: [{ target: '/reviews/worryfree/website', anchor: '无忧链接官网' }, { target: '/airport/ranking/top/', anchor: '综合机场推荐' }],
          priority: 'P0'
        },
        {
          title: '无忧链接套餐价格表与2026专属优惠码wuyou666领用说明',
          slug: 'plans',
          primaryKeyword: '无忧链接价格套餐',
          secondaryKeywords: ['无忧链接优惠码', '无忧链接套餐价格', '无忧链接wuyou666', '无忧链接资费'],
          longTailKeywords: ['无忧链接各档位套餐性价比', '无忧链接优惠码怎么填写抵扣', '无忧链接轻量套餐适合谁'],
          searchIntent: '购买',
          internalLinks: [{ target: '/reviews/worryfree/website', anchor: '无忧链接官网' }, { target: '/airport/price/cheap/', anchor: '平价梯子' }],
          priority: 'P0'
        },
        {
          title: '无忧链接晚高峰测速跑分与IEPL专线低延迟实录',
          slug: 'speed',
          primaryKeyword: '无忧链接测速',
          secondaryKeywords: ['无忧链接晚高峰速度', '无忧链接跑分', '无忧链接延迟测试', '无忧链接丢包率'],
          longTailKeywords: ['无忧链接单线程带宽测试', '无忧链接真连接延迟表现', '无忧链接4K视频播放实测'],
          searchIntent: '测试',
          internalLinks: [{ target: '/reviews/worryfree/review', anchor: '无忧链接评测' }, { target: '/tech/line/iepl/', anchor: 'IEPL专线' }],
          priority: 'P0'
        },
        {
          title: '无忧链接免转换订阅导入与流媒体/AI支持能力评测',
          slug: 'unlock',
          primaryKeyword: '无忧链接解锁能力',
          secondaryKeywords: ['无忧链接订阅无需转换', '无忧链接ChatGPT', '无忧链接Netflix', '无忧链接客户端兼容'],
          longTailKeywords: ['无忧链接支持小火箭Clash免转换导入', '无忧链接AI访问稳定性', '无忧链接多平台兼容性'],
          searchIntent: '测试',
          internalLinks: [{ target: '/tutorial/usage/subscribe/', anchor: '订阅导入教程' }, { target: '/reviews/worryfree/website', anchor: '无忧链接官网' }],
          priority: 'P0'
        }
      ]
    },
    {
      id: 'twilight',
      name: '暮光加速',
      slug: 'twilight',
      rank: 6,
      path: '/reviews/twilight/',
      badge: '2023运营·综合第六·20元档120G',
      lineType: 'IEPL企业级专线',
      protocol: 'VLESS',
      speed: '850+ Mbps',
      startingPrice: '20 元/月 (120GB/月)',
      discount: '新人特惠',
      coupon: 'muguang5555',
      affLink: 'https://varnexa.twilightaff.com/#/?code=D1LHglg3',
      features: ['20元120G均衡套餐', '全线VLESS+IEPL', '第三方客户端原生兼容', '稳定不掉线'],
      testImage: '/images/tests/幕光加速-节点测速实测.png',
      articles: [
        {
          title: '暮光加速官网最新地址与2026官方注册购买通道（防失联入口）',
          slug: 'website',
          primaryKeyword: '暮光加速官网',
          secondaryKeywords: ['暮光加速最新地址', '暮光加速注册', '暮光加速防失联', '暮光加速直达通道'],
          longTailKeywords: ['暮光加速2026年官网网址', '暮光加速怎么注册账号', '暮光加速订阅获取'],
          searchIntent: '转化',
          internalLinks: [{ target: '/reviews/twilight/review', anchor: '暮光加速深度评测' }, { target: '/reviews/twilight/plans', anchor: '暮光加速价格表' }],
          priority: 'P0'
        },
        {
          title: '暮光加速怎么样好用吗：2026真实测速、20元120G月付专线全面评测',
          slug: 'review',
          primaryKeyword: '暮光加速怎么样',
          secondaryKeywords: ['暮光加速好用吗', '暮光加速稳定吗', '暮光加速跑分实测', '暮光加速评价'],
          longTailKeywords: ['暮光加速20元套餐实测', '暮光加速晚高峰丢包率', '暮光加速适合哪些人使用'],
          searchIntent: '决策',
          internalLinks: [{ target: '/reviews/twilight/website', anchor: '暮光加速官网' }, { target: '/airport/ranking/top/', anchor: '综合机场推荐' }],
          priority: 'P0'
        },
        {
          title: '暮光加速套餐价格表与2026独家优惠码muguang5555领用指引',
          slug: 'plans',
          primaryKeyword: '暮光加速价格套餐',
          secondaryKeywords: ['暮光加速优惠码', '暮光加速多少钱', '暮光加速muguang5555', '暮光加速年付'],
          longTailKeywords: ['暮光加速月付120G套餐性价比', '暮光加速优惠券使用方法', '暮光加速支付支持支付宝微信'],
          searchIntent: '购买',
          internalLinks: [{ target: '/reviews/twilight/website', anchor: '暮光加速官网' }, { target: '/airport/price/cheap/', anchor: '平价梯子推荐' }],
          priority: 'P0'
        },
        {
          title: '暮光加速晚高峰测速实录：IEPL专线节点跑分与真实截图报告',
          slug: 'speed',
          primaryKeyword: '暮光加速测速',
          secondaryKeywords: ['暮光加速测速实测', '暮光加速跑分', '暮光加速晚高峰速度', '暮光加速测速截图'],
          longTailKeywords: ['暮光加速真机测速图解读', '暮光加速香港节点下行表现', '暮光加速丢包率与抖动'],
          searchIntent: '测试',
          internalLinks: [{ target: '/reviews/twilight/review', anchor: '暮光加速评测' }, { target: '/tech/line/iepl/', anchor: 'IEPL专线' }],
          priority: 'P0'
        },
        {
          title: '暮光加速流媒体与AI工具兼容支持能力实测报告',
          slug: 'unlock',
          primaryKeyword: '暮光加速解锁能力',
          secondaryKeywords: ['暮光加速ChatGPT', '暮光加速Netflix', '暮光加速YouTube 4K', '暮光加速解锁'],
          longTailKeywords: ['暮光加速能否看网飞4K', '暮光加速使用OpenAI会封号吗', '暮光加速节点纯净度'],
          searchIntent: '测试',
          internalLinks: [{ target: '/scenario/media/netflix/', anchor: 'Netflix梯子' }, { target: '/reviews/twilight/website', anchor: '暮光加速官网' }],
          priority: 'P0'
        }
      ]
    },
    {
      id: 'ermaocloud',
      name: '二猫云',
      slug: 'ermaocloud',
      rank: 7,
      path: '/reviews/ermaocloud/',
      badge: '2023运营·综合第七·20元档130G',
      lineType: 'IEPL企业级专线',
      protocol: 'VLESS',
      speed: '800+ Mbps',
      startingPrice: '20 元/月 (130GB/月)',
      discount: '新人特惠',
      coupon: 'ermao5555',
      affLink: 'https://guangs.2maoyunaff.cc/#/?code=7mjvgGbW',
      features: ['20元130G高性价比', '全线VLESS+IEPL', '第三方客户端原生兼容', '稳定不掉线'],
      testImage: '/images/tests/二猫云-节点测速实测.png',
      articles: [
        {
          title: '二猫云官网最新地址与2026正版注册购买通道（官方防迷路发布页）',
          slug: 'website',
          primaryKeyword: '二猫云官网',
          secondaryKeywords: ['二猫云最新地址', '二猫云注册', '二猫云防失联', '二猫云官方入口'],
          longTailKeywords: ['二猫云2026年官网网址', '二猫云国内直连入口', '二猫云账号注册流程'],
          searchIntent: '转化',
          internalLinks: [{ target: '/reviews/ermaocloud/review', anchor: '二猫云深度评测' }, { target: '/reviews/ermaocloud/plans', anchor: '二猫云价格表' }],
          priority: 'P0'
        },
        {
          title: '二猫云怎么样好用吗：2026真实测速、20元130G月付专线全面评测',
          slug: 'review',
          primaryKeyword: '二猫云怎么样',
          secondaryKeywords: ['二猫云好用吗', '二猫云稳定吗', '二猫云测速跑分', '二猫云用户评价'],
          longTailKeywords: ['二猫云20元130G好不好用', '二猫云晚高峰网络表现', '二猫云与同档梯子对比'],
          searchIntent: '决策',
          internalLinks: [{ target: '/reviews/ermaocloud/website', anchor: '二猫云官网' }, { target: '/airport/ranking/top/', anchor: '综合机场推荐' }],
          priority: 'P0'
        },
        {
          title: '二猫云套餐价格表与2026独家优惠码ermao5555领用指引',
          slug: 'plans',
          primaryKeyword: '二猫云价格套餐',
          secondaryKeywords: ['二猫云优惠码', '二猫云多少钱', '二猫云ermao5555', '二猫云年付折扣'],
          longTailKeywords: ['二猫云月付130G套餐性价比', '二猫云优惠码填写与抵扣', '二猫云付款支持支付宝微信'],
          searchIntent: '购买',
          internalLinks: [{ target: '/reviews/ermaocloud/website', anchor: '二猫云官网' }, { target: '/airport/price/cheap/', anchor: '平价梯子推荐' }],
          priority: 'P0'
        },
        {
          title: '二猫云晚高峰测速实录：IEPL专线节点下行与真实截图解读',
          slug: 'speed',
          primaryKeyword: '二猫云测速',
          secondaryKeywords: ['二猫云测速实测', '二猫云晚高峰速度', '二猫云跑分', '二猫云测速截图'],
          longTailKeywords: ['二猫云节点测速实测图解读', '二猫云香港节点真连接延迟', '二猫云丢包率表现'],
          searchIntent: '测试',
          internalLinks: [{ target: '/reviews/ermaocloud/review', anchor: '二猫云评测' }, { target: '/tech/line/iepl/', anchor: 'IEPL专线' }],
          priority: 'P0'
        },
        {
          title: '二猫云流媒体与常用AI工具访问兼容实测报告',
          slug: 'unlock',
          primaryKeyword: '二猫云解锁能力',
          secondaryKeywords: ['二猫云ChatGPT', '二猫云Netflix', '二猫云油管4K', '二猫云流媒体解锁'],
          longTailKeywords: ['二猫云看外网视频卡不卡', '二猫云访问OpenAI稳定性', '二猫云节点纯净度评测'],
          searchIntent: '测试',
          internalLinks: [{ target: '/scenario/media/youtube/', anchor: 'YouTube 4K梯子' }, { target: '/reviews/ermaocloud/website', anchor: '二猫云官网' }],
          priority: 'P0'
        }
      ]
    },
    {
      id: 'civetnet',
      name: '灵猫网络',
      slug: 'civetnet',
      rank: 8,
      path: '/reviews/civetnet/',
      badge: '2024运营·综合第八·19元150G大流量',
      lineType: '企业级内网专线',
      protocol: 'VLESS / Shadowsocks',
      speed: '850+ Mbps',
      startingPrice: '19 元/月 (150GB/月大流量)',
      discount: '新用户 9 折',
      coupon: 'lmao888',
      affLink: 'https://vip01.civetnet.com/#/?code=8MIAyxak',
      features: ['19元150G大流量月付', '企业级内网专线', '丰富套餐+不限时可选', '支持第三方客户端导入'],
      testImage: '/images/tests/灵猫网络-节点测速实测.png',
      articles: [
        {
          title: '灵猫网络官网最新入口与2026官方注册购买通道（防失联通道）',
          slug: 'website',
          primaryKeyword: '灵猫网络官网',
          secondaryKeywords: ['灵猫网络最新地址', '灵猫网络注册', '灵猫网络防失联', '灵猫网络直达入口'],
          longTailKeywords: ['灵猫网络2026年官网网址', '灵猫网络账号注册指南', '灵猫网络订阅导入教程'],
          searchIntent: '转化',
          internalLinks: [{ target: '/reviews/civetnet/review', anchor: '灵猫网络评测' }, { target: '/reviews/civetnet/plans', anchor: '灵猫网络价格表' }],
          priority: 'P0'
        },
        {
          title: '灵猫网络怎么样好用吗：2026真实测速、19元150G大流量月付深度横评',
          slug: 'review',
          primaryKeyword: '灵猫网络怎么样',
          secondaryKeywords: ['灵猫网络好用吗', '灵猫网络稳定吗', '灵猫网络测速跑分', '灵猫网络评价'],
          longTailKeywords: ['灵猫网络19元150G划算吗', '灵猫网络晚高峰会不会卡', '灵猫网络适合大流量追剧吗'],
          searchIntent: '决策',
          internalLinks: [{ target: '/reviews/civetnet/website', anchor: '灵猫网络官网' }, { target: '/airport/ranking/top/', anchor: '综合机场推荐' }],
          priority: 'P0'
        },
        {
          title: '灵猫网络套餐价格表与2026独家9折优惠码lmao888领用指引',
          slug: 'plans',
          primaryKeyword: '灵猫网络价格套餐',
          secondaryKeywords: ['灵猫网络优惠码', '灵猫网络多少钱一个月', '灵猫网络lmao888折扣', '灵猫网络年付'],
          longTailKeywords: ['灵猫网络月付150G套餐详解', '灵猫网络优惠券使用方法', '灵猫网络不限时套餐价格'],
          searchIntent: '购买',
          internalLinks: [{ target: '/reviews/civetnet/website', anchor: '灵猫网络官网' }, { target: '/airport/price/cheap/', anchor: '平价大流量梯子' }],
          priority: 'P0'
        },
        {
          title: '灵猫网络晚高峰测速实录：内网专线节点下行与真实测速图解',
          slug: 'speed',
          primaryKeyword: '灵猫网络测速',
          secondaryKeywords: ['灵猫网络测速实测', '灵猫网络跑分', '灵猫网络晚高峰速度', '灵猫网络测速截图'],
          longTailKeywords: ['灵猫网络真机测速图分析', '灵猫网络香港节点延迟与带宽', '灵猫网络丢包表现'],
          searchIntent: '测试',
          internalLinks: [{ target: '/reviews/civetnet/review', anchor: '灵猫网络评测' }, { target: '/tech/line/bgp/', anchor: '内网中转架构' }],
          priority: 'P0'
        },
        {
          title: '灵猫网络大流量看视频与常规AI使用体验评测',
          slug: 'unlock',
          primaryKeyword: '灵猫网络解锁能力',
          secondaryKeywords: ['灵猫网络看视频流畅吗', '灵猫网络ChatGPT支持', '灵猫网络油管4K', '灵猫网络流媒体'],
          longTailKeywords: ['灵猫网络看YouTube 4K码率', '灵猫网络访问海外网页速度', '灵猫网络节点可用性'],
          searchIntent: '测试',
          internalLinks: [{ target: '/scenario/media/youtube/', anchor: 'YouTube 4K梯子' }, { target: '/reviews/civetnet/website', anchor: '灵猫网络官网' }],
          priority: 'P0'
        }
      ]
    },
    {
      id: 'jiliancloud',
      name: '极连云',
      slug: 'jiliancloud',
      rank: 9,
      path: '/reviews/jiliancloud/',
      badge: '2024运营·综合第九·18元100G高性价比',
      lineType: 'IEPL企业级专线',
      protocol: 'VLESS / Shadowsocks',
      speed: '800+ Mbps',
      startingPrice: '18 元/月 (100GB/月)',
      discount: '特惠立减',
      coupon: 'ji8888',
      affLink: 'https://guangs.jlyvipaff.com/#/?code=VM1rKGUu',
      features: ['18元月付门槛低', 'IEPL专线保障', '自研+第三方客户端', 'AI与流媒体兼顾'],
      testImage: '/images/tests/极连云-节点测速实测.png',
      articles: [
        {
          title: '极连云官网最新地址与2026官方注册购买通道（防失联直达）',
          slug: 'website',
          primaryKeyword: '极连云官网',
          secondaryKeywords: ['极连云最新地址', '极连云注册', '极连云防失联', '极连云官方入口'],
          longTailKeywords: ['极连云2026年官网网址', '极连云直达链接', '极连云账号注册与订阅导入'],
          searchIntent: '转化',
          internalLinks: [{ target: '/reviews/jiliancloud/review', anchor: '极连云评测' }, { target: '/reviews/jiliancloud/plans', anchor: '极连云价格表' }],
          priority: 'P0'
        },
        {
          title: '极连云怎么样好用吗：2026真实测速、18元100G月付IEPL专线评测',
          slug: 'review',
          primaryKeyword: '极连云怎么样',
          secondaryKeywords: ['极连云好用吗', '极连云稳定吗', '极连云跑分实测', '极连云评价'],
          longTailKeywords: ['极连云18元套餐值得买吗', '极连云晚高峰延迟实测', '极连云综合性价比怎么样'],
          searchIntent: '决策',
          internalLinks: [{ target: '/reviews/jiliancloud/website', anchor: '极连云官网' }, { target: '/airport/ranking/top/', anchor: '综合机场推荐' }],
          priority: 'P0'
        },
        {
          title: '极连云套餐价格表与2026独家优惠码ji8888领用指引',
          slug: 'plans',
          primaryKeyword: '极连云价格套餐',
          secondaryKeywords: ['极连云优惠码', '极连云多少钱', '极连云ji8888', '极连云月付年付'],
          longTailKeywords: ['极连云各周期套餐价格表', '极连云优惠码抵扣流程', '极连云支持支付宝微信支付'],
          searchIntent: '购买',
          internalLinks: [{ target: '/reviews/jiliancloud/website', anchor: '极连云官网' }, { target: '/airport/price/cheap/', anchor: '平价梯子推荐' }],
          priority: 'P0'
        },
        {
          title: '极连云晚高峰测速实录：IEPL专线节点测速跑分与真机截图',
          slug: 'speed',
          primaryKeyword: '极连云测速',
          secondaryKeywords: ['极连云测速实测', '极连云跑分', '极连云晚高峰速度', '极连云测速截图'],
          longTailKeywords: ['极连云真机测速图解读', '极连云香港节点延迟与带宽', '极连云丢包率表现'],
          searchIntent: '测试',
          internalLinks: [{ target: '/reviews/jiliancloud/review', anchor: '极连云评测' }, { target: '/tech/line/iepl/', anchor: 'IEPL专线' }],
          priority: 'P0'
        },
        {
          title: '极连云流媒体与常见AI工具综合使用实测报告',
          slug: 'unlock',
          primaryKeyword: '极连云解锁能力',
          secondaryKeywords: ['极连云ChatGPT支持', '极连云流媒体解锁', '极连云油管4K', '极连云节点测试'],
          longTailKeywords: ['极连云访问AI工具顺畅吗', '极连云看视频缓冲速度', '极连云节点可用性'],
          searchIntent: '测试',
          internalLinks: [{ target: '/scenario/ai/chatgpt/', anchor: 'ChatGPT梯子' }, { target: '/reviews/jiliancloud/website', anchor: '极连云官网' }],
          priority: 'P0'
        }
      ]
    },
    {
      id: 'yuzhoucloud',
      name: '宇宙云',
      slug: 'yuzhoucloud',
      rank: 10,
      path: '/reviews/yuzhoucloud/',
      badge: '2023运营·综合第十·14.9元档性价比',
      lineType: 'IEPL企业级专线',
      protocol: 'VLESS',
      speed: '800+ Mbps',
      startingPrice: '14.9 元/月 (100GB/月)',
      discount: '新人特惠',
      coupon: 'YUZHOU553',
      affLink: 'https://wzjc.yuzoucloud.cc/#/?code=yrThwMP1',
      features: ['14.9元超低门槛', '全线VLESS+IEPL', '自研+第三方客户端', '性价比突出品质有保'],
      testImage: '/images/tests/宇宙云-节点测速实测.png',
      articles: [
        {
          title: '宇宙云官网最新入口与2026官方注册购买通道（防失联直达）',
          slug: 'website',
          primaryKeyword: '宇宙云官网',
          secondaryKeywords: ['宇宙云最新地址', '宇宙云注册', '宇宙云防失联', '宇宙云官方入口'],
          longTailKeywords: ['宇宙云2026年官网网址', '宇宙云国内直连入口', '宇宙云账号注册与订阅导入'],
          searchIntent: '转化',
          internalLinks: [{ target: '/reviews/yuzhoucloud/review', anchor: '宇宙云评测' }, { target: '/reviews/yuzhoucloud/plans', anchor: '宇宙云价格表' }],
          priority: 'P0'
        },
        {
          title: '宇宙云怎么样好用吗：2026真实测速、14.9元月付IEPL专线全面评测',
          slug: 'review',
          primaryKeyword: '宇宙云怎么样',
          secondaryKeywords: ['宇宙云好用吗', '宇宙云稳定吗', '宇宙云跑分实测', '宇宙云评价'],
          longTailKeywords: ['宇宙云14.9元套餐值不值', '宇宙云晚高峰卡顿情况', '宇宙云VLESS专线实测'],
          searchIntent: '决策',
          internalLinks: [{ target: '/reviews/yuzhoucloud/website', anchor: '宇宙云官网' }, { target: '/airport/ranking/top/', anchor: '综合机场推荐' }],
          priority: 'P0'
        },
        {
          title: '宇宙云套餐价格表与2026独家优惠码YUZHOU553领用说明',
          slug: 'plans',
          primaryKeyword: '宇宙云价格套餐',
          secondaryKeywords: ['宇宙云优惠码', '宇宙云多少钱一个月', '宇宙云YUZHOU553', '宇宙云年付'],
          longTailKeywords: ['宇宙云14.9元100G套餐详情', '宇宙云优惠码使用教程', '宇宙云支付支持支付宝微信'],
          searchIntent: '购买',
          internalLinks: [{ target: '/reviews/yuzhoucloud/website', anchor: '宇宙云官网' }, { target: '/airport/price/cheap/', anchor: '平价梯子推荐' }],
          priority: 'P0'
        },
        {
          title: '宇宙云晚高峰测速跑分：IEPL专线节点下行与真实测速截图',
          slug: 'speed',
          primaryKeyword: '宇宙云测速',
          secondaryKeywords: ['宇宙云测速实测', '宇宙云晚高峰速度', '宇宙云跑分', '宇宙云测速截图'],
          longTailKeywords: ['宇宙云真机测速图解读', '宇宙云香港节点延迟与带宽', '宇宙云网络抖动表现'],
          searchIntent: '测试',
          internalLinks: [{ target: '/reviews/yuzhoucloud/review', anchor: '宇宙云评测' }, { target: '/tech/line/iepl/', anchor: 'IEPL专线' }],
          priority: 'P0'
        },
        {
          title: '宇宙云流媒体与常见日常出海网络使用评测',
          slug: 'unlock',
          primaryKeyword: '宇宙云解锁能力',
          secondaryKeywords: ['宇宙云看视频流畅吗', '宇宙云流媒体支持', '宇宙云油管4K', '宇宙云节点表现'],
          longTailKeywords: ['宇宙云看外网视频卡不卡', '宇宙云访问网页流畅度', '宇宙云节点纯净度'],
          searchIntent: '测试',
          internalLinks: [{ target: '/scenario/media/youtube/', anchor: 'YouTube 4K梯子' }, { target: '/reviews/yuzhoucloud/website', anchor: '宇宙云官网' }],
          priority: 'P0'
        }
      ]
    },
    {
      id: 'v2yun',
      name: '唯兔云',
      slug: 'v2yun',
      rank: 11,
      path: '/reviews/v2yun/',
      badge: '2023运营·综合第十一·60+节点三网优化',
      lineType: '三网优化专线',
      protocol: 'VLESS',
      speed: '750+ Mbps',
      startingPrice: '14.9 元/月 (100GB/月)',
      discount: '新用户 9 折',
      coupon: 'weitu666',
      affLink: 'https://guangs.v2yunvipaff.com/#/?code=xIutqOBA',
      features: ['60+全球节点多地区覆盖', '三网动态智能优化', '智能负载均衡调度', '全线VLESS协议'],
      testImage: '/images/tests/唯兔云-节点测速实测.png',
      articles: [
        {
          title: '唯兔云官网最新入口与2026官方注册购买通道（防失联直达）',
          slug: 'website',
          primaryKeyword: '唯兔云官网',
          secondaryKeywords: ['唯兔云最新地址', '唯兔云注册', '唯兔云防失联', '唯兔云官方入口'],
          longTailKeywords: ['唯兔云2026年官网网址', '唯兔云直接访问链接', '唯兔云账号注册与订阅教程'],
          searchIntent: '转化',
          internalLinks: [{ target: '/reviews/v2yun/review', anchor: '唯兔云评测' }, { target: '/reviews/v2yun/plans', anchor: '唯兔云价格表' }],
          priority: 'P0'
        },
        {
          title: '唯兔云怎么样好用吗：2026真实测速、60+节点与三网优化全面横评',
          slug: 'review',
          primaryKeyword: '唯兔云怎么样',
          secondaryKeywords: ['唯兔云好用吗', '唯兔云稳定吗', '唯兔云跑分实测', '唯兔云用户评价'],
          longTailKeywords: ['唯兔云14.9元好用吗', '唯兔云三网优化效果', '唯兔云多节点负载均衡实测'],
          searchIntent: '决策',
          internalLinks: [{ target: '/reviews/v2yun/website', anchor: '唯兔云官网' }, { target: '/airport/ranking/top/', anchor: '综合机场推荐' }],
          priority: 'P0'
        },
        {
          title: '唯兔云套餐价格表与2026独家9折优惠码weitu666领用指引',
          slug: 'plans',
          primaryKeyword: '唯兔云价格套餐',
          secondaryKeywords: ['唯兔云优惠码', '唯兔云多少钱一个月', '唯兔云weitu666折扣', '唯兔云年付'],
          longTailKeywords: ['唯兔云14.9元100G套餐性价比', '唯兔云优惠券使用方法', '唯兔云付款方式说明'],
          searchIntent: '购买',
          internalLinks: [{ target: '/reviews/v2yun/website', anchor: '唯兔云官网' }, { target: '/airport/price/cheap/', anchor: '平价梯子推荐' }],
          priority: 'P0'
        },
        {
          title: '唯兔云晚高峰测速跑分：60+节点连通率与真实测速截图报告',
          slug: 'speed',
          primaryKeyword: '唯兔云测速',
          secondaryKeywords: ['唯兔云测速实测', '唯兔云跑分', '唯兔云晚高峰速度', '唯兔云测速截图'],
          longTailKeywords: ['唯兔云节点测速实测图解读', '唯兔云三网优化节点延迟', '唯兔云丢包率'],
          searchIntent: '测试',
          internalLinks: [{ target: '/reviews/v2yun/review', anchor: '唯兔云评测' }, { target: '/tech/line/bgp/', anchor: 'BGP多线接入' }],
          priority: 'P0'
        },
        {
          title: '唯兔云多端客户端兼容与日常网络使用评测',
          slug: 'unlock',
          primaryKeyword: '唯兔云解锁能力',
          secondaryKeywords: ['唯兔云看视频流畅吗', '唯兔云多设备使用', '唯兔云节点可用性', '唯兔云流媒体'],
          longTailKeywords: ['唯兔云多客户端兼容性', '唯兔云看油管表现', '唯兔云节点线路稳定性'],
          searchIntent: '测试',
          internalLinks: [{ target: '/client/device/windows/', anchor: 'Windows客户端配置' }, { target: '/reviews/v2yun/website', anchor: '唯兔云官网' }],
          priority: 'P0'
        }
      ]
    },
    {
      id: 'invisible',
      name: '隐形人',
      slug: 'invisible',
      rank: 12,
      path: '/reviews/invisible/',
      badge: '2024新加坡海外团队·企业级IEPL·晚高峰不挤兑',
      lineType: '企业级 IEPL 专线 + 60+ 原生机房独立 IP',
      protocol: '全线最新 Vless 协议',
      speed: '2000+ Mbps (总带宽 2Gbps+，配备 500M 高峰冗余)',
      startingPrice: '周期性订阅 24 元/月',
      discount: '新人优惠 8 折',
      coupon: 'yxr888',
      affLink: 'https://yinxingren1.invisibleaff.com/#/?code=kcyEeoJT',
      features: ['60+原生独立IP', '全线Vless协议', '晚高峰500M冗余不挤兑', '24h在线客服与退款保障', '线路故障1小时修复'],
      articles: [
        {
          title: '隐形人机场官网最新入口与2026官方正版直达注册通道',
          slug: 'website',
          primaryKeyword: '隐形人官网',
          secondaryKeywords: ['隐形人最新地址', '隐形人注册', '隐形人防失联', '隐形人官方直达'],
          longTailKeywords: ['隐形人2026年官网网址', '隐形人海外直连入口', '隐形人账号注册与自研客户端下载'],
          searchIntent: '转化',
          internalLinks: [{ target: '/reviews/invisible/review', anchor: '隐形人深度评测' }, { target: '/reviews/invisible/plans', anchor: '隐形人价格表' }],
          priority: 'P0'
        },
        {
          title: '隐形人怎么样好用吗：2026真实测速、企业级IEPL与24h售后全面横评',
          slug: 'review',
          primaryKeyword: '隐形人怎么样',
          secondaryKeywords: ['隐形人好用吗', '隐形人稳定吗', '隐形人跑分实测', '隐形人用户评价'],
          longTailKeywords: ['隐形人晚高峰不挤兑实测', '隐形人24元一个月靠谱吗', '隐形人退款政策与售后保障怎么样'],
          searchIntent: '决策',
          internalLinks: [{ target: '/reviews/invisible/website', anchor: '隐形人官网' }, { target: '/airport/ranking/top/', anchor: '综合机场推荐' }],
          priority: 'P0'
        },
        {
          title: '隐形人套餐价格表与2026独家8折优惠码yxr888使用指南',
          slug: 'plans',
          primaryKeyword: '隐形人价格套餐',
          secondaryKeywords: ['隐形人优惠码', '隐形人多少钱一个月', '隐形人yxr888折扣', '隐形人资费标准'],
          longTailKeywords: ['隐形人24元月付套餐详情', '隐形人优惠码怎么填写抵扣', '隐形人支持支付宝与USDT支付'],
          searchIntent: '购买',
          internalLinks: [{ target: '/reviews/invisible/website', anchor: '隐形人官网' }, { target: '/airport/ranking/stable/', anchor: '稳定梯子推荐' }],
          priority: 'P0'
        },
        {
          title: '隐形人晚高峰测速跑分：2Gbps总带宽与60+原生IP节点极速实录',
          slug: 'speed',
          primaryKeyword: '隐形人测速',
          secondaryKeywords: ['隐形人测速实测', '隐形人晚高峰速度', '隐形人跑分', '隐形人带宽测试'],
          longTailKeywords: ['隐形人晚高峰4K秒开实测', '隐形人香港日本原生IP延迟', '隐形人零丢包率实测数据'],
          searchIntent: '测试',
          internalLinks: [{ target: '/reviews/invisible/review', anchor: '隐形人评测' }, { target: '/tech/line/iepl/', anchor: 'IEPL专线' }],
          priority: 'P0'
        },
        {
          title: '隐形人全生态流媒体与ChatGPT/Claude原生IP完美解锁实测',
          slug: 'unlock',
          primaryKeyword: '隐形人解锁能力',
          secondaryKeywords: ['隐形人ChatGPT解锁', '隐形人Netflix原生', '隐形人Disney+全区', '隐形人原生IP'],
          longTailKeywords: ['隐形人原生独立IP防封号实测', '隐形人看油管4K杜比视界体验', '隐形人TikTok直播推流表现'],
          searchIntent: '测试',
          internalLinks: [{ target: '/scenario/ai/chatgpt/', anchor: 'ChatGPT梯子' }, { target: '/scenario/media/netflix/', anchor: 'Netflix梯子' }],
          priority: 'P0'
        }
      ]
    }
  ],
  // Complete 26 brands database for full-directory table, comparison, and cross-linking
  allBrands: [
    { rank: 1, name: '光速云', slug: 'guangsucloud', isPrimary: true, year: '2020', price: '年付折合7.5元/月(59G) | 月付23元/月(148G)', coupon: 'AMM', discount: '8折', line: 'IEPL专线 + 全球IPLC', protocol: 'VLESS', speed: '2500+ Mbps', affLink: 'https://sahude.gsyvipaff.com/#/?code=keqgvT5Y', features: '全网主推·综合第一·680元独立IP定制', testImage: '/images/tests/光速云-节点测速实测.png' },
    { rank: 2, name: '飞猫云', slug: 'feimaocloud', year: '2023', price: '年付折合7元/月(50G)', coupon: 'flycat888', discount: '8折', line: 'IEPL企业级专线', protocol: 'VLESS / SS', speed: '800+ Mbps', affLink: 'https://guangs.flycataff.com/#/?code=6uq0Xe9y', features: '低价年付小流量·自研客户端', testImage: '/images/tests/飞猫云-节点测速实测.png' },
    { rank: 3, name: '微风网络', slug: 'breezenet', year: '2023', price: '年付折合7元/月(50G)', coupon: 'flat888', discount: '9折', line: 'IEPL企业级专线', protocol: 'VLESS / SS', speed: '750+ Mbps', affLink: 'https://edp01.breezenetaff.com/#/?code=t3huofyI', features: '轻度出海·日常网页社媒AI首选', testImage: '/images/tests/微风-节点测速实测.png' },
    { rank: 4, name: '星岛梦', slug: 'xingdaomeng', year: '2020', price: '年付折合8元/月(60G) | 提供不限时套餐', coupon: 'nmw888', discount: '9折', line: '企业级内网专线', protocol: 'VLESS / SS', speed: '850+ Mbps', affLink: 'https://guangs.xingdaomeng.com/#/?code=1TynBYnR', features: '2020老牌·不限时按量套餐丰富', testImage: '/images/tests/星岛梦-节点测速实测.png' },
    { rank: 5, name: '无忧链接', slug: 'worryfree', year: '2025', price: '月付19元/月(100G) | 轻量低至6元/月', coupon: 'wuyou666', discount: '特惠', line: 'IEPL企业级专线', protocol: 'VLESS', speed: '900+ Mbps', affLink: 'https://wep01.worryfreeaff.com/#/?code=4ZoSbLdL', features: '免转换订阅·6元轻量套餐', testImage: '' },
    { rank: 6, name: '暮光加速', slug: 'twilight', year: '2023', price: '月付20元/月(120G)', coupon: 'muguang5555', discount: '特惠', line: 'IEPL企业级专线', protocol: 'VLESS', speed: '850+ Mbps', affLink: 'https://varnexa.twilightaff.com/#/?code=D1LHglg3', features: '20元120G月付·IEPL专线中等流量', testImage: '/images/tests/幕光加速-节点测速实测.png' },
    { rank: 7, name: '二猫云', slug: 'ermaocloud', year: '2023', price: '月付20元/月(130G)', coupon: 'ermao5555', discount: '特惠', line: 'IEPL企业级专线', protocol: 'VLESS', speed: '800+ Mbps', affLink: 'https://guangs.2maoyunaff.cc/#/?code=7mjvgGbW', features: '20元130G均衡月付·专线不卡顿', testImage: '/images/tests/二猫云-节点测速实测.png' },
    { rank: 8, name: '灵猫网络', slug: 'civetnet', year: '2024', price: '月付19元/月(150G大流量)', coupon: 'lmao888', discount: '9折', line: '企业级内网专线', protocol: 'VLESS / SS', speed: '850+ Mbps', affLink: 'https://vip01.civetnet.com/#/?code=8MIAyxak', features: '19元150G大流量·提供不限时包', testImage: '/images/tests/灵猫网络-节点测速实测.png' },
    { rank: 9, name: '极连云', slug: 'jiliancloud', year: '2024', price: '月付18元/月(100G)', coupon: 'ji8888', discount: '立减', line: 'IEPL企业级专线', protocol: 'VLESS / SS', speed: '800+ Mbps', affLink: 'https://guangs.jlyvipaff.com/#/?code=VM1rKGUu', features: '18元100G高性价比·AI流媒体兼顾', testImage: '/images/tests/极连云-节点测速实测.png' },
    { rank: 10, name: '宇宙云', slug: 'yuzhoucloud', year: '2023', price: '月付14.9元/月(100G)', coupon: 'YUZHOU553', discount: '特惠', line: 'IEPL企业级专线', protocol: 'VLESS', speed: '800+ Mbps', affLink: 'https://wzjc.yuzoucloud.cc/#/?code=yrThwMP1', features: '15元档低价专线·VLESS协议', testImage: '/images/tests/宇宙云-节点测速实测.png' },
    { rank: 11, name: '唯兔云', slug: 'v2yun', year: '2023', price: '月付14.9元/月(100G)', coupon: 'weitu666', discount: '9折', line: '三网优化专线', protocol: 'VLESS', speed: '750+ Mbps', affLink: 'https://guangs.v2yunvipaff.com/#/?code=xIutqOBA', features: '60+节点三网智能调度·负载均衡', testImage: '/images/tests/唯兔云-节点测速实测.png' },
    { rank: 12, name: '隐形人', slug: 'invisible', year: '2024', price: '周期性订阅24元/月', coupon: 'yxr888', discount: '8折', line: '企业级IEPL专线 + 60+原生独立IP', protocol: 'VLESS', speed: '2000+ Mbps', affLink: 'https://yinxingren1.invisibleaff.com/#/?code=kcyEeoJT', features: '海外团队·晚高峰500M冗余不挤兑·24h售后退款', testImage: '' },
    { rank: 13, name: 'U1S1', slug: 'u1s1', year: '2023', price: '月付20元/月(120G)', coupon: 'akaka', discount: '特惠', line: 'IEPL企业级专线', protocol: 'VLESS', speed: '800+ Mbps', affLink: 'https://guangs.vipaff.cc/#/?code=xhX5X22f', features: '20元120G专线·自研客户端', testImage: '/images/tests/U1S1-节点测速实测.png' },
    { rank: 14, name: '光年梯', slug: 'guangnianti', year: '2025', price: '月付18元/月(110G)', coupon: 'gnt6666', discount: '特惠', line: 'IEPL企业级专线', protocol: 'VLESS', speed: '800+ Mbps', affLink: 'https://guangs.gntaff.com/#/?code=X1FoxjGE', features: '18元110G·AI与流媒体', testImage: '/images/tests/光年梯-节点测速实测.png' },
    { rank: 15, name: '一翻云', slug: 'yifanyun', year: '2024', price: '月付20元/月(150G大流量)', coupon: 'yfy6666', discount: '特惠', line: 'IEPL企业级专线', protocol: 'VLESS', speed: '850+ Mbps', affLink: 'https://guangs.1flyunaff.cc/#/register?code=Yr7FhB7r', features: '20元150G大流量突显', testImage: '/images/tests/一翻云-节点测速实测.png' },
    { rank: 16, name: 'SOGO云', slug: 'sogocloud', year: '2026', price: '月付25元/月(150G)', coupon: 'sss777', discount: '特惠', line: 'IEPL企业级专线', protocol: 'VLESS', speed: '900+ Mbps', affLink: 'https://guangs.sogoyunaff.cc/#/?code=327Vs0w7', features: '25元150G综合型·自研客户端', testImage: '/images/tests/SOGO云-节点测速实测.png' },
    { rank: 17, name: '可信云', slug: 'kexincloud', year: '2024', price: '月付25元/月(150G)', coupon: 'kkk333', discount: '特惠', line: 'IEPL企业级专线', protocol: 'VLESS', speed: '850+ Mbps', affLink: 'https://guangs.kosingaff.com/#/register?code=UYDtNlCY', features: '25元150G·多设备日常使用', testImage: '/images/tests/可信云-节点测速实测.png' },
    { rank: 18, name: '速界', slug: 'sujie', year: '2024', price: '月付25元/月(150G)', coupon: 'sss1111', discount: '特惠', line: 'IEPL企业级专线', protocol: 'VLESS', speed: '850+ Mbps', affLink: 'https://guangs.speedworldaff.cc/#/register?code=xgXzEfZB', features: 'AI工具场景专项优化·自研客户端', testImage: '/images/tests/速界-节点测速实测.png' },
    { rank: 19, name: '闪跃', slug: 'shanyue', year: '2024', price: '月付24元/月(150G)', coupon: 'shanyue', discount: '特惠', line: 'IEPL企业级专线', protocol: 'VLESS', speed: '800+ Mbps', affLink: 'https://vip02.flashleapaff.com/#/?code=3lgzm9mm', features: '24元150G·多端全平台适配', testImage: '' },
    { rank: 20, name: '全球云', slug: 'quanqiuyun', year: '2026', price: '月付20元/月(120G)', coupon: 'qqy7777', discount: '特惠', line: 'IEPL企业级专线', protocol: 'VLESS', speed: '800+ Mbps', affLink: 'https://guangs.gcvipaff.com/#/?code=Ov2nvU9C', features: '20元120G综合档·VLESS专线', testImage: '/images/tests/全球云-节点测速实测.png' },
    { rank: 21, name: '闪电鼠', slug: 'shandianshu', year: '2024', price: '年付折合约5.6元/月(60G)', coupon: 'sd88', discount: '7折', line: 'IEPL专线小流量', protocol: 'VLESS', speed: '700+ Mbps', affLink: 'https://qwerty.shandianshuaff.com/#/?code=rUE75iYh', features: '5.6元低价年付·轻度用户首选', testImage: '' },
    { rank: 22, name: '大佬云', slug: 'dalaoyun', year: '2024', price: '年付折合约5.6元/月(60G)', coupon: 'dly888', discount: '7折', line: 'IEPL专线小流量', protocol: 'VLESS', speed: '700+ Mbps', affLink: 'https://qwerty.dalaoyunaff.com/#/?code=jCPLmoWN', features: '5.6元低价年付·自研客户端', testImage: '' },
    { rank: 23, name: '云界线', slug: 'yunjiexian', year: '2024', price: '年付折合约5.6元/月(60G)', coupon: 'yjx888', discount: '7折', line: 'IEPL专线小流量', protocol: 'VLESS', speed: '700+ Mbps', affLink: 'https://qwerty.yunjiexianaff.com/?code=HBaZ91c6', features: '5.6元低价年付·IEPL专线', testImage: '' },
    { rank: 24, name: '榴莲云', slug: 'liulianyun', year: '2024', price: '年付折合约5.6元/月(60G)', coupon: 'll88', discount: '7折', line: 'IEPL专线小流量', protocol: 'VLESS', speed: '700+ Mbps', affLink: 'https://qwerty.liulianyunaff.com#/?code=hS5pvbfE', features: '5.6元低价年付·轻量出海', testImage: '' },
    { rank: 25, name: '神行加速', slug: 'shenxing', year: '2024', price: '年付折合约14元/月(120G)', coupon: 'xs0077', discount: '7折', line: 'IEPL企业级专线', protocol: 'VLESS', speed: '750+ Mbps', affLink: 'https://qwerty.shenxingaff.com/#/?code=gawDQqVE', features: '14元120G年付·IEPL专线', testImage: '' },
    { rank: 26, name: '环球梯', slug: 'huanqiuti', year: '2024', price: '年付折合约5.6元/月(60G)', coupon: 'HQ66', discount: '7折', line: 'IEPL专线小流量', protocol: 'VLESS', speed: '700+ Mbps', affLink: 'https://qwerty.huanqiutiaff.com/?code=9I4KRNPH', features: '5.6元超低价年付·自研客户端', testImage: '' }
  ]
};
