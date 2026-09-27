module.exports = {
  id: 'help',
  title: '避坑与故障',
  path: '/help/',
  description: '翻墙避坑指南与疑难杂症故障速查手册，包含跑路预警、购买防坑、安全隐私、山寨官网辨真及四大高频网络故障解决方案。',
  subcategories: [
    {
      id: 'guide',
      title: '避坑指南',
      path: '/help/guide/',
      clusters: [
        {
          id: 'scam',
          clusterId: '6.1.1',
          title: '机场跑路预警',
          path: '/help/guide/scam/',
          description: '独家跑路前兆研判模型，拆解降价套路、失联特征与资金受损维权应急指南。',
          articles: [
            {
              title: '机场跑路十大前兆深度盘点：嗅出服务商跑路气息的保本必读指南',
              slug: 'ten-warning-signs-before-airport-exit-scam',
              primaryKeyword: '机场跑路预警',
              secondaryKeywords: ['机场跑路前兆', '梯子跑路征兆识别', '防跑路保本指南', '机场失联应对'],
              longTailKeywords: [
                '怎么判断正在用的机场是不是准备跑路了', '突然大打骨折做年付大促是不是圈钱套路',
                '官方TG群开启全员禁言和工单长时间不回警惕', '2026年翻墙用户防跑路风险预警白皮书',
                '发现机场跑路苗头第一时间止损挽回损失技巧'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/guide/buying/', anchor: '新手选购防坑法则' },
                { target: '/airport/ranking/stable/', anchor: '零跑路老牌机场榜单' },
                { target: '/airport/price/monthly/', anchor: '坚持月付保平安' }
              ],
              priority: 'P0'
            },
            {
              title: '骨折级大促销背后的圈钱陷阱：“买一年送一年”为什么多是最后的狂欢',
              slug: 'deep-discount-scam-buy-one-year-get-one-free',
              primaryKeyword: '机场大降价圈钱套路',
              secondaryKeywords: ['买一年送一年跑路', '超低价终身套餐骗局', '大促集资跑路案例', '识破虚假促销套路'],
              longTailKeywords: [
                '平时价格坚挺的机场突然推出买一送一能冲吗', '终身会员一次性付费几百元永久免费的巨大骗局',
                '机场主卷走几百万年费销声匿迹的历史复盘', '理性消费别为了贪几十块便宜丢失全部本金'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/airport/type/coupon/', anchor: '正规优惠码辨别' },
                { target: '/help/guide/scam/', anchor: '跑路预警指南' },
                { target: '/airport/price/cheap/', anchor: '正规平价机场' }
              ],
              priority: 'P0'
            },
            {
              title: '机场跑路后的维权与应急挽损：支付宝/微信/银联支付异议申诉教程',
              slug: 'how-to-chargeback-and-dispute-after-airport-scam',
              primaryKeyword: '机场跑路退款维权',
              secondaryKeywords: ['被跑路机场骗钱怎么追回', '支付宝举报欺诈商户', '信用卡拒付Chargeback', '维权申诉成功案例'],
              longTailKeywords: [
                '刚买了年付第二天机场关站失联怎么退钱', '利用支付平台交易订单投诉商家未提供服务实操',
                '向银行申请国际信用卡争议拒付流程与所需凭证', '虽是灰色服务但合法挽回财产损失的实操指南'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/help/guide/security/', anchor: '支付安全常识' },
                { target: '/tutorial/usage/buy/', anchor: '支付凭证保留' },
                { target: '/help/guide/scam/', anchor: '跑路预警' }
              ],
              priority: 'P1'
            },
            {
              title: '被黑客拖库与删库内讧：那些不是跑路却胜似跑路的毁灭性灾难',
              slug: 'database-leak-and-internal-sabotage-disasters',
              primaryKeyword: '机场删库与黑客拖库风险',
              secondaryKeywords: ['机场数据库泄露', '合伙人内讧删库', '用户密码遭到篡改', '翻墙服务商运维事故'],
              longTailKeywords: [
                '为什么有些大机场突然宣布数据库全丢重新注册', '管理团队利益分配不均删库跑路的狗血剧情',
                '用户订阅链接与密码在暗网被批量廉价叫卖危机', '评估机场技术实力与数据备份机制的核查清单'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/guide/security/', anchor: '个人数据安全防护' },
                { target: '/tutorial/usage/subscribe/', anchor: '定期重置订阅Token' },
                { target: '/help/guide/scam/', anchor: '跑路与事故盘点' }
              ],
              priority: 'P1'
            },
            {
              title: '官方 Telegram 群禁言与失联：沟通渠道异常时如何快速研判风险',
              slug: 'telegram-group-mute-and-silent-mode-risk-audit',
              primaryKeyword: '机场群禁言跑路前兆',
              secondaryKeywords: ['TG水友群开启慢速模式', '管理人员长期失联', '工单排队几天不回复', '判断系统是否已半瘫痪'],
              longTailKeywords: [
                '群里一有负面反馈立刻禁言封号说明了什么', '官方频道两个月不发通知公告的危险信号',
                '如何通过客服响应时效和技术支持专业度判断存活状态', '建立多维度情报信息源提前避开爆雷风险'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/scenario/game/social/', anchor: 'Telegram沟通技巧' },
                { target: '/airport/ranking/stable/', anchor: '高信誉售后稳定品牌' },
                { target: '/help/guide/scam/', anchor: '跑路预警' }
              ],
              priority: 'P2'
            },
            {
              title: '老牌机场跑路大事件历史复盘：那些年震惊整个翻墙圈的惨痛教训',
              slug: 'historical-famous-airport-exit-scams-postmortem',
              primaryKeyword: '知名机场跑路历史复盘',
              secondaryKeywords: ['大机场爆雷案例', '布丁/速蛙等老牌跑路回顾', '千万级资金盘崩溃', '老牌机场不等于绝对安全'],
              longTailKeywords: [
                '当年拥有数万用户的一线大厂为什么也会轰然倒下', '跑路前三个月他们都做了哪些一模一样的异常举动',
                '从历史惨痛教训中提炼出的长治久安科学上网法则', '给每一位当代数字公民的醒世恒言'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/airport/ranking/top/', anchor: '客观综合排行榜' },
                { target: '/about', anchor: '关于 AirPick 独立评测' },
                { target: '/help/guide/scam/', anchor: '跑路预警全书' }
              ],
              priority: 'P2'
            },
            {
              title: '双机场容灾备份策略：为什么手头永远要有两套互不相关的订阅方案',
              slug: 'dual-airport-redundancy-disaster-preparedness',
              primaryKeyword: '双机场容灾备份策略',
              secondaryKeywords: ['不要把鸡蛋放在一个篮子里', '主力包月搭配备用按量', '防止突然断网抓瞎', '高可用翻墙架构'],
              longTailKeywords: [
                '遇到突发跑路或全节点维护时如何做到工作不断档', '花几块钱准备一个不限时按量计费保底订阅的妙处',
                '在Clash中一键自动无缝接管的极佳体验方案', '外贸与科研从业人员必备的抗风险标准配置'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/airport/price/pay-as-you-go/', anchor: '按量计费备用推荐' },
                { target: '/client/app/clash/', anchor: 'Clash策略组容灾' },
                { target: '/help/guide/scam/', anchor: '跑路预警' }
              ],
              priority: 'P2'
            },
            {
              title: '跑路风险评分天梯：AirPick 基于资金、运营时长与线路的风险等级模型',
              slug: 'airport-scam-risk-scoring-matrix-airpick',
              primaryKeyword: '机场跑路风险评估模型',
              secondaryKeywords: ['机场风险等级天梯', '运营时间与资金实力评分', '客观跑路风险指标', 'AirPick安全评测体系'],
              longTailKeywords: [
                'AirPick评测体系中如何量化评估一家机场的跑路概率', '线路类型、付款周期、域名注册年限等多维度加权算法',
                '为全网用户提供最客观透明的机场安全健康度参考', '守护每一位读者的财产安全与出海畅通'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/about', anchor: '关于 AirPick 评测标准' },
                { target: '/airport/ranking/top/', anchor: '精选机场排行榜' },
                { target: '/help/guide/scam/', anchor: '跑路预警指南' }
              ],
              priority: 'P3'
            }
          ]
        },
        {
          id: 'buying',
          clusterId: '6.1.2',
          title: '购买避坑指南',
          path: '/help/guide/buying/',
          description: '虚假宣传戳穿、参数水分挤干、隐形条款排查与新手理性消费指南。',
          articles: [
            {
              title: '2026新手购买机场十大避坑指南：保姆级实测教你避开99%的坑爹套路',
              slug: 'ten-essential-tips-to-avoid-airport-buying-traps',
              primaryKeyword: '购买避坑指南',
              secondaryKeywords: ['新手买机场避雷', '翻墙梯子防骗', '识别虚假带宽宣传', '理性消费买梯子建议'],
              longTailKeywords: [
                '刚接触科学上网买梯子最容易踩哪些雷区', '为什么不建议一上来就买一年或者买最便宜的',
                '如何看清机场套餐里的隐藏限制与严苛条款', '2026年新手买机场必备的保命避坑法则'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/guide/scam/', anchor: '跑路预警指南' },
                { target: '/airport/ranking/value/', anchor: '高性价比机场推荐' },
                { target: '/tutorial/usage/buy/', anchor: '购买与注册实操' }
              ],
              priority: 'P0'
            },
            {
              title: '虚标带宽与超售套路深度揭露：号称万兆专线实测为什么只有 10Mbps',
              slug: 'unmasking-fake-bandwidth-and-severe-overselling',
              primaryKeyword: '虚标带宽与严重超售揭露',
              secondaryKeywords: ['千兆专线虚假宣传', '为什么网速跑不满', '超售率几百倍的黑幕', '真实带宽测速手段'],
              longTailKeywords: [
                '商家标称的万兆集群到底是不是给所有用户独享的', '一条百兆专线卖给一千个人同时挤爆的行业潜规则',
                '如何用专业测速工具揭开虚标带宽商家的遮羞布', '挑选真实承诺可用带宽的良心服务商'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/tech/line/iepl/', anchor: 'IEPL专线真实成本' },
                { target: '/help/faq/slow/', anchor: '网速慢与卡顿排查' },
                { target: '/help/guide/buying/', anchor: '购买避坑' }
              ],
              priority: 'P0'
            },
            {
              title: '隐藏的连接数与设备限制：买之前务必看清这四项苛刻规定',
              slug: 'hidden-connection-and-device-limits-audit',
              primaryKeyword: '设备连接数限制避坑',
              secondaryKeywords: ['限制几台设备同时在线', '多IP登录被封号', '连接数并发超限报错', '家庭共享购买须知'],
              longTailKeywords: [
                '很多机场套餐暗地里限制只能2台设备同时在线', '手机电脑电视同时使用导致直接被系统断流惩罚',
                '如何查看TOS条款中关于IP地址漂移和并发连接数的约束', '多设备家庭用户选购套餐的必查要素'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/client/device/router/', anchor: '软路由合租全屋共享' },
                { target: '/tutorial/usage/buy/', anchor: '套餐参数解读' },
                { target: '/help/guide/buying/', anchor: '避坑指南' }
              ],
              priority: 'P1'
            },
            {
              title: '警惕霸王条款：用户协议（TOS）中暗藏的免责与随时销号陷阱',
              slug: 'beware-of-unfair-tos-terms-and-account-termination',
              primaryKeyword: '机场TOS霸王条款避坑',
              secondaryKeywords: ['不可抗力不退款免责', '随意封号不退余额', '禁止BT下载罚没账户', '维护自身合法权益'],
              longTailKeywords: [
                '购买前勾选的“我已同意用户协议”到底写了些什么强盗逻辑', '商家单方面享有随时修改套餐价格和清空流量的特权',
                '因为正常提问工单态度不好就被直接封禁账号的奇葩遭遇', '挑选尊重用户、沟通文明的服务商规范'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/guide/security/', anchor: '账号安全与合规' },
                { target: '/tutorial/usage/buy/', anchor: '购买流程' },
                { target: '/help/guide/buying/', anchor: '购买避坑指南' }
              ],
              priority: 'P1'
            },
            {
              title: '“终身会员”的甜蜜砒霜：为什么宣称永久免费用的机场死得最快',
              slug: 'lifetime-membership-scams-and-financial-collapse',
              primaryKeyword: '终身会员机场骗局',
              secondaryKeywords: ['永久有效梯子骗局', '买断制机场跑路', '不符合商业逻辑的套餐', '警惕一次性巨额买断'],
              longTailKeywords: [
                '只需付300元即可永久享受高速翻墙服务是真的吗', '服务器每月都要付真金白银机房租金的物理现实',
                '终身制由于后续没有现金流流入必将在半年内崩盘', '永远远离一切违背基本经济学常识的金融诈骗'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/guide/scam/', anchor: '机场跑路预警' },
                { target: '/airport/price/monthly/', anchor: '按月按年正规计费' },
                { target: '/help/guide/buying/', anchor: '避坑指南' }
              ],
              priority: 'P2'
            },
            {
              title: '辨识假客服与第三方中介加价：直接在官网购买的正确姿势',
              slug: 'avoid-fake-customer-service-and-unauthorized-resellers',
              primaryKeyword: '防假客服与二手黄牛倒卖',
              secondaryKeywords: ['Telegram假客服诈骗', '闲鱼淘宝二手倒卖加价', '山寨代购骗局', '唯一官方直连通道'],
              longTailKeywords: [
                'TG群里主动私信你提供优惠充值的全都是骗子', '二手平台加价翻倍倒卖免费订阅的无良黑心套路',
                '如何从官方正规评测渠道安全直达服务商控制面板', '筑牢财产安全防护线不给诈骗分子可乘之机'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/help/guide/fake-website/', anchor: '官网真假辨别指南' },
                { target: '/help/guide/security/', anchor: '安全防线全书' },
                { target: '/help/guide/buying/', anchor: '购买避坑' }
              ],
              priority: 'P2'
            },
            {
              title: '试用期的“特权糖衣”：为什么很多机场试用极快一付款就巨卡',
              slug: 'free-trial-honeytrap-vs-paid-tier-degradation',
              primaryKeyword: '试用极快付款巨卡套路',
              secondaryKeywords: ['试用专用诱饵节点', '付款后恶意降速', '区别对待新老用户', '如何科学严格压力测试'],
              longTailKeywords: [
                '试用期故意给你分配专属空载高速节点吸引买单', '一旦付完全款立刻被移入拥挤的大锅饭超售机房',
                '晚高峰期间严格多设备压测破除试用糖衣陷阱', '做一名精明的出海消费者不被套路玩弄'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/airport/type/free-trial/', anchor: '免费试用机场推荐与测试' },
                { target: '/help/faq/slow/', anchor: '晚高峰卡顿排查' },
                { target: '/help/guide/buying/', anchor: '购买避坑' }
              ],
              priority: 'P2'
            },
            {
              title: '买机场前的五问自省法：理智判断个人真实网络需求的决策模型',
              slug: 'five-questions-checklist-before-buying-airports',
              primaryKeyword: '买机场前五问自省法',
              secondaryKeywords: ['理智消费买梯子', '判断自己需要什么配置', '不盲目跟风买昂贵专线', '出海需求精准匹配'],
              longTailKeywords: [
                '我到底用不用外网打游戏？看视频需要4K还是1080P？', '我的手机和电脑支持什么客户端？预算上限是多少？',
                '问清五个核心问题拒绝跟风过度消费', '找到最契合个人使用习惯与预算的称心好机场'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/airport/ranking/top/', anchor: '综合机场排行榜' },
                { target: '/airport/price/cheap/', anchor: '便宜平价机场推荐' },
                { target: '/help/guide/buying/', anchor: '避坑指南' }
              ],
              priority: 'P3'
            }
          ]
        },
        {
          id: 'security',
          clusterId: '6.1.3',
          title: '安全与隐私',
          path: '/help/guide/security/',
          description: '保护隐私与数据安全，端到端加密、防 DNS 泄漏、公共节点蜜罐识别与防钓鱼。',
          articles: [
            {
              title: '翻墙安全与隐私保护终极全书：保护个人信息、防监控与防泄露实战',
              slug: 'complete-guide-to-proxy-security-and-privacy-protection',
              primaryKeyword: '翻墙安全与隐私保护',
              secondaryKeywords: ['科学上网安全常识', '防止个人信息泄露', '机场能看到我浏览什么吗', '端到端加密防侦听'],
              longTailKeywords: [
                '翻墙上网到底安不安全会不会被网络警察追踪', '在全站HTTPS加密下机场到底能截获什么数据',
                '保护真实IP地址与数字指纹环境安全的完整SOP', '2026年出海人员必备的网络安全保命必读全书'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/guide/security/', anchor: '安全专栏' },
                { target: '/tutorial/basic/vs-vpn/', anchor: 'VPN与机场安全对比' },
                { target: '/help/guide/scam/', anchor: '跑路与诈骗警示' }
              ],
              priority: 'P0'
            },
            {
              title: '机场能偷看我的密码和银行卡吗：HTTPS 端到端加密与中间人攻击真相',
              slug: 'can-airports-see-passwords-and-credit-cards',
              primaryKeyword: '机场能偷看密码吗',
              secondaryKeywords: ['HTTPS端到端加密', '中间人攻击MITM', '代理服务器能看到什么数据', '网上银行安全登录'],
              longTailKeywords: [
                '浏览器地址栏的小锁头（HTTPS）到底保护了什么', '机场只能看到你访问了哪个域名而看不到传输具体内容',
                '严禁在设备上随意安装和信任未知机构根证书', '破除“用梯子银行卡密码就会被偷”的技术谣言'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/guide/security/', anchor: '安全防护全书' },
                { target: '/tutorial/basic/what-is/', anchor: '什么是机场' },
                { target: '/help/guide/buying/', anchor: '避坑指南' }
              ],
              priority: 'P0'
            },
            {
              title: 'DNS 泄漏大排查：为什么关掉翻墙软件你的真实物理地址早已被出卖',
              slug: 'dns-leak-investigation-and-remediation',
              primaryKeyword: 'DNS泄漏排查与修复',
              secondaryKeywords: ['检测DNS泄漏网站', '本地运营商劫持解析', '配置DoH安全加密', 'Fake-IP彻底防泄漏'],
              longTailKeywords: [
                '访问dnsleaktest网站检测你的DNS解析归属于谁', '如果出现中国电信/联通/移动DNS说明什么安全隐患',
                '在客户端中强制启用远端安全加密解析彻底解决泄漏', '打造无懈可击的域名查询绝对隐私屏障'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/tutorial/usage/config/', anchor: 'DNS高级防污染配置' },
                { target: '/client/device/router/', anchor: '软路由MosDNS方案' },
                { target: '/help/guide/security/', anchor: '安全指南' }
              ],
              priority: 'P1'
            },
            {
              title: '公共免费节点与钓鱼蜜罐（Honeypot）：天下没有免费午餐背后的技术黑幕',
              slug: 'public-free-nodes-and-honeypot-surveillance-risks',
              primaryKeyword: '免费节点蜜罐黑幕',
              secondaryKeywords: ['免费翻墙软件窃取数据', '网络蜜罐监听流量', 'TG群免费订阅危险性', '暗中植入挖矿木马'],
              longTailKeywords: [
                '网上搜到的几万条免费Vmess节点到底是谁在赔钱搭建', '网络安全审查机构与黑产搭建蜜罐监控用户的技术手段',
                '使用免费节点导致个人社交账号与加密资产被盗案例', '永远不要为了贪图白嫖而将设备暴露在险境中'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/airport/type/free-trial/', anchor: '正规试用机制' },
                { target: '/airport/price/cheap/', anchor: '便宜平价替代' },
                { target: '/help/guide/security/', anchor: '安全专栏' }
              ],
              priority: 'P1'
            },
            {
              title: '根证书伪造与 SSL 解密劫持警示：千万不要随意信任外部 CA 证书',
              slug: 'fake-root-ca-certificates-and-ssl-interception',
              primaryKeyword: 'CA根证书伪造与解密风险',
              secondaryKeywords: ['手机安装CA证书危害', 'HTTPS解密窃取明文', '为什么不可随意信任证书', '排查恶意根证书'],
              longTailKeywords: [
                '某些破解版软件或野鸡服务商要求在手机设置中信任证书', '一旦安装根证书所有HTTPS加密流量将完全变成明文暴露',
                '如何检查Windows/Mac/iOS系统中是否存在可疑根证书并删除', '坚守网络资产安全绝对底线的重要法则'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/device/iphone/', anchor: 'iPhone证书安全' },
                { target: '/client/device/windows/', anchor: 'Windows安全审计' },
                { target: '/help/guide/security/', anchor: '安全与隐私' }
              ],
              priority: 'P2'
            },
            {
              title: 'WebRTC 真实 IP 泄漏危机与规避：浏览器无感出卖你位置的隐蔽后门',
              slug: 'webrtc-ip-leak-risks-and-browser-plugins-fix',
              primaryKeyword: 'WebRTC真实IP泄漏解决',
              secondaryKeywords: ['WebRTC禁用插件', '检查真实局域网公网IP', 'Chrome禁用WebRTC', '海外风控穿透检测'],
              longTailKeywords: [
                '为什么开了全局代理访问特定网站依然能测出你的国内真实IP', 'WebRTC实时音视频协议绕过代理直接向STUN服务器发包机理',
                '安装WebRTC Control扩展一键彻底堵死泄漏后门', '跨境从业人员打造100%伪装度必备技能'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/scenario/streaming/tiktok/', anchor: 'TikTok环境伪装' },
                { target: '/tech/ip/residential/', anchor: '住宅IP环境搭配' },
                { target: '/help/guide/security/', anchor: '安全指南' }
              ],
              priority: 'P2'
            },
            {
              title: '合规出海与网络言行红线：身处跨境行业必须时刻敬畏的六大禁令',
              slug: 'compliance-and-legal-redlines-for-cross-border-users',
              primaryKeyword: '合规出海与言论安全红线',
              secondaryKeywords: ['科学上网文明守则', '严禁散播政治违规内容', '保护个人现实安全', '跨境合规行为边界'],
              longTailKeywords: [
                '什么行为会直接触犯国家网络安全法与刑法相关条款', '坚决远离反动言论、境外邪教与涉恐黑产等极端雷区',
                '做一名清醒自律、专注科技与学术分享的合格数字公民', '让出海成为赋能生活而非毁灭生活的积极力量'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/about', anchor: '关于 AirPick 核心价值观' },
                { target: '/tutorial/basic/what-is/', anchor: '普法常识' },
                { target: '/help/guide/security/', anchor: '安全专栏' }
              ],
              priority: 'P2'
            },
            {
              title: '2FA 双重身份验证全配置指南：保护机场账号与订阅资产不被盗取',
              slug: 'two-factor-authentication-2fa-setup-guide',
              primaryKeyword: '开启机场2FA双重验证',
              secondaryKeywords: ['Google Authenticator配置', '防止机场账号被盗', '两步验证安全级别', '备用恢复密钥保管'],
              longTailKeywords: [
                '在机场后台绑定谷歌验证码或微软身份验证器实操', '即使密码泄露黑客也无法登录修改你的订阅链接',
                '多设备备份2FA密钥防止手机丢失导致无法登录的秘诀', '构筑数字账户资产坚不可摧的安全壁垒'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/tutorial/usage/buy/', anchor: '用户后台安全' },
                { target: '/client/device/iphone/', anchor: 'iOS验证器' },
                { target: '/help/guide/security/', anchor: '安全与隐私' }
              ],
              priority: 'P3'
            }
          ]
        },
        {
          id: 'fake-website',
          clusterId: '6.1.4',
          title: '官网真假辨别',
          path: '/help/guide/fake-website/',
          description: '山寨钓鱼站打假、百度/必应搜索前排广告鉴别、防木马被盗核心指南。',
          articles: [
            {
              title: '官网真假辨别终极指南：戳穿搜索前排冒牌李鬼与钓鱼诈骗机场',
              slug: 'how-to-spot-fake-cloned-airport-websites',
              primaryKeyword: '官网真假辨别',
              secondaryKeywords: ['假机场官网诈骗', '辨别真假机场地址', '山寨钓鱼网站特征', '搜索前排冒牌李鬼识别'],
              longTailKeywords: [
                '搜机场名字点进去充值结果是个山寨钓鱼站怎么办', '百度必应搜索前排推广广告假官网揭秘',
                '如何核对官方公告频道发布的正版域名与防丢地址', '2026年出海玩家必备的火眼金睛打假手册'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/guide/security/', anchor: '网络安全与防钓鱼' },
                { target: '/help/guide/scam/', anchor: '跑路诈骗预警' },
                { target: '/airport/ranking/top/', anchor: '精选核验品牌榜' }
              ],
              priority: 'P0'
            },
            {
              title: '搜索引擎竞价排名黑幕：为什么搜索知名机场出来的全是山寨诈骗站',
              slug: 'search-engine-sponsored-ads-scam-clones-exposed',
              primaryKeyword: '搜索引擎假官网竞价排名',
              secondaryKeywords: ['百度搜索梯子假广告', '必应冒牌钓鱼推广', '黑产买词截流套路', '为什么官方搜不到'],
              longTailKeywords: [
                '黑产团队花重金在搜索引擎买大品牌机场关键词做竞价', '一比一像素级克隆正规机场登录界面诱骗输入密码与充值',
                '正规机场由于灰色属性无法参与竞价排名的尴尬现实', '一眼识破搜索结果中“赞助商广告”字样的防骗要诀'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/guide/fake-website/', anchor: '真假辨别指南' },
                { target: '/help/guide/scam/', anchor: '防诈骗预警' },
                { target: '/about', anchor: '关于 AirPick 官方核验通道' }
              ],
              priority: 'P0'
            },
            {
              title: '克隆站源码与钓鱼截流产业揭秘：骗子是如何批量搭建假官网赚钱的',
              slug: 'cloned-airport-phishing-industry-unmasked',
              primaryKeyword: '克隆站钓鱼产业链揭秘',
              secondaryKeywords: ['批量生成山寨官网', '偷取用户账号密码', '假充值接口收款', '钓鱼黑产技术分析'],
              longTailKeywords: [
                '黑产使用自动化爬虫一键镜像正品机场前端界面的全流程', '后台替换成自己的免签支付收款码坐收渔利',
                '不仅骗走用户的充值款还把真实账号密码拿去二次转卖', '深度曝光暴利黑产的卑劣行径与防范之策'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/guide/security/', anchor: '账号安全' },
                { target: '/help/guide/fake-website/', anchor: '辨假指南' },
                { target: '/tutorial/usage/buy/', anchor: '购买流程' }
              ],
              priority: 'P1'
            },
            {
              title: '核验正版官网的四大黄金法则：官方频道、发布页、WHOIS 与 SSL 证书',
              slug: 'four-golden-rules-to-verify-authentic-airport-domain',
              primaryKeyword: '核验正版官网四大法则',
              secondaryKeywords: ['官方永久发布页', 'TG官方公告频道域名', 'SSL证书机构审查', 'WHOIS注册时间推算'],
              longTailKeywords: [
                '通过机场官方Telegram发布频道置顶消息核实最新地址', '查看域名注册时间如果才注册几天必是钓鱼网站的常识',
                '利用永久发布页（GitHub/GitLab Pages）获取最新镜像', '掌握权威验证渠道彻底杜绝上当受骗'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/help/guide/fake-website/', anchor: '官网真假辨别' },
                { target: '/help/guide/buying/', anchor: '购买避坑' },
                { target: '/airport/ranking/stable/', anchor: '稳定品牌' }
              ],
              priority: 'P1'
            },
            {
              title: '受骗后紧急止损 SOP：如果不小心在假官网充了钱该如何应对',
              slug: 'emergency-sop-after-falling-for-fake-airport-site',
              primaryKeyword: '在假官网受骗后紧急止损',
              secondaryKeywords: ['假网站充值止损步骤', '修改真实官网密码', '向支付渠道投诉假商户', '避免其他账号被连坐盗取'],
              longTailKeywords: [
                '如果在钓鱼站输入了平时常用的账号密码该怎么办', '第一时间前往真实官网修改密码并重置所有订阅密钥',
                '火速向支付宝或微信投诉该诈骗收款商户冻结资金', '防止个人数字资产遭受二次侵害的应急手册'
              ],
              searchIntent: '故障',
              internalLinks: [
                { target: '/help/guide/security/', anchor: '2FA双重验证开启' },
                { target: '/tutorial/usage/subscribe/', anchor: '重置订阅链接' },
                { target: '/help/guide/fake-website/', anchor: '打假专栏' }
              ],
              priority: 'P2'
            },
            {
              title: '假冒客户端下载钓鱼：搜“Clash官网”搜出内置木马盗号全家桶',
              slug: 'fake-clash-official-site-trojan-malware-warning',
              primaryKeyword: '假冒Clash官网木马警示',
              secondaryKeywords: ['山寨Clash下载站', '正版Clash没有官网', '内置远控木马后门', '只在GitHub官方下载'],
              longTailKeywords: [
                '搜“Clash官方网站”下载安装后电脑疯狂弹广告与被远控', '澄清所有开源翻墙核心从未设立过任何商业付费官网的事实',
                '黑客利用假官网打包恶意病毒窃取电脑浏览器Cookies惨案', '认准官方开源Release仓库的铁律'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/client/app/clash/', anchor: '正规Clash下载渠道' },
                { target: '/help/guide/security/', anchor: '防木马与恶意软件' },
                { target: '/help/guide/fake-website/', anchor: '假官网辨别' }
              ],
              priority: 'P2'
            },
            {
              title: '官方防失联地址（发布页）收藏技巧：机场频繁换域名如何永远不迷路',
              slug: 'anti-censorship-landing-pages-bookmarking-tips',
              primaryKeyword: '机场防失联发布页收藏',
              secondaryKeywords: ['永久防迷路地址', '关注官方推特通知', '邮件获取最新网址', '换域名无缝访问指南'],
              longTailKeywords: [
                '由于主域名被封锁很多正规机场每隔几周就要换新域名', '如何利用发空邮件到官方机器人自动获取最新可用网址',
                '将官方免翻发布页添加到浏览器书签随时保持联络', '告别因为换域名导致与服务商彻底失联的焦虑'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/tutorial/usage/buy/', anchor: '后台账号管理' },
                { target: '/help/guide/fake-website/', anchor: '真假辨别' },
                { target: '/airport/ranking/top/', anchor: '精选合集' }
              ],
              priority: 'P2'
            },
            {
              title: 'AirPick 官方安全白名单库：经过我们逐一核验的真实品牌官网入口',
              slug: 'airpick-verified-airport-official-directory',
              primaryKeyword: '官方安全白名单库',
              secondaryKeywords: ['官方核验真实地址', '拒绝山寨冒牌直达通道', 'AirPick安全推荐', '官方合作直通车'],
              longTailKeywords: [
                'AirPick团队建立的一对一官方域名与密钥指纹核验库', '确保每一位读者点击跳转的都是绝无假冒的正版服务商',
                '实时剔除异常与被钓鱼劫持的失效域名', '打造全网最可信赖的科学上网安全导航灯塔'
              ],
              searchIntent: '转化',
              internalLinks: [
                { target: '/about', anchor: '关于 AirPick 品牌承诺' },
                { target: '/airport/ranking/top/', anchor: '综合机场排行榜' },
                { target: '/reviews/', anchor: '品牌深度评测专区' }
              ],
              priority: 'P3'
            }
          ]
        }
      ]
    },
    {
      id: 'faq',
      title: '故障排查',
      path: '/help/faq/',
      clusters: [
        {
          id: 'timeout',
          clusterId: '6.2.1',
          title: '节点全部超时',
          path: '/help/faq/timeout/',
          description: '节点全红、全部 Timeout、无法连接服务器，从本地到骨干网 10 步精准排查。',
          articles: [
            {
              title: '节点全部超时（Timeout）终极自查指南：节点全红打不开网页十步排查法',
              slug: 'fix-all-nodes-timeout-complete-troubleshooting-guide',
              primaryKeyword: '节点全部超时',
              secondaryKeywords: ['节点全红怎么办', '全部Timeout排查', '节点无法连接解决', '梯子节点全部不可用恢复'],
              longTailKeywords: [
                '打开Clash或者小火箭所有节点都显示Timeout感叹号怎么解决', '测速全部显示红色的十大常见原因',
                '从系统时间、订阅失效、核心崩溃到运营商封锁全面排错', '2026年出海玩家必备的最全节点超时急救方案'
              ],
              searchIntent: '故障',
              internalLinks: [
                { target: '/help/faq/subscribe-fail/', anchor: '订阅更新失败排查' },
                { target: '/help/faq/connect-fail/', anchor: '连接失败排查' },
                { target: '/help/faq/slow/', anchor: '网速慢深度排查' }
              ],
              priority: 'P0'
            },
            {
              title: '罪魁祸首第一名：系统时间未同步导致 TLS 证书握手失败的秒级修复',
              slug: 'system-time-out-of-sync-tls-handshake-failed',
              primaryKeyword: '系统时间不同步导致超时',
              secondaryKeywords: ['电脑时间差几分钟连不上', 'TLS证书握手超时', 'Windows自动同步时间', '时间偏差导致全红'],
              longTailKeywords: [
                '为什么系统时间只要相差几分钟所有加密代理就会全部瘫痪', '加密协议底层依赖严格时间戳机制进行防重放攻击验证原理',
                'Windows/Mac/手机端一键开启自动网络时间同步保姆级图解', '三秒钟解决80%新手节点全红的隐藏真凶'
              ],
              searchIntent: '故障',
              internalLinks: [
                { target: '/client/device/windows/', anchor: 'Windows系统设置' },
                { target: '/client/device/mac/', anchor: 'Mac系统维护' },
                { target: '/help/faq/timeout/', anchor: '节点超时排查' }
              ],
              priority: 'P0'
            },
            {
              title: '流量用光还是套餐到期：一秒登录后台查看账户状态与余额重置',
              slug: 'check-data-quota-and-plan-expiration-status',
              primaryKeyword: '检查流量配额与套餐过期',
              secondaryKeywords: ['流量用完了显示超时', '套餐到期没有续费', '登录后台检查状态', '重置账单日查询'],
              longTailKeywords: [
                '很多时候节点全红只是因为你不知不觉把本月流量看完了', '套餐写着还有几天到期但流量已被提前耗尽的尴尬情况',
                '在官网面板确认账户正常后再排查本地网络问题的高效逻辑', '告别无头苍蝇式乱改配置的理智第一步'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/tutorial/usage/buy/', anchor: '用户后台查看状态' },
                { target: '/airport/price/cheap/', anchor: '便宜续费购买' },
                { target: '/help/faq/timeout/', anchor: '超时故障解决' }
              ],
              priority: 'P1'
            },
            {
              title: '杀毒软件与防火墙阻断：360/火绒/Windows Defender 拦截核心排查',
              slug: 'antivirus-and-firewall-blocking-proxy-core',
              primaryKeyword: '杀毒软件拦截代理排查',
              secondaryKeywords: ['火绒阻断核心网络', 'Defender误杀Mihomo', '添加防火墙入站白名单', '杀软误报修复教程'],
              longTailKeywords: [
                '杀毒软件更新后偷偷将翻墙软件核心加入黑名单导致断网', '在火绒网络防护日志中查看拦截记录与一键放行配置',
                'Windows Defender将开源内核识别为风险工具的排除项设置', '确保代理核心畅行无阻的系统权限配置'
              ],
              searchIntent: '故障',
              internalLinks: [
                { target: '/client/device/windows/', anchor: 'Windows安全设置' },
                { target: '/help/guide/security/', anchor: '开源安全与防木马' },
                { target: '/help/faq/timeout/', anchor: '超时排障' }
              ],
              priority: 'P1'
            },
            {
              title: '敏感时期大封锁与 GFW 防火墙升级应对：专线与直连的生存实录',
              slug: 'anti-censorship-during-sensitive-periods-gfw-upgrade',
              primaryKeyword: '敏感时期节点全部超时应对',
              secondaryKeywords: ['重大会议期间断网', '防火墙升级大封锁', '切换备用专线', '临时应急上网方案'],
              longTailKeywords: [
                '每年特定敏感时期公网中转节点大面积挂掉底层原因', '为什么拥有IEPL物理内网专线的机场依然能够坚挺稳定',
                '面对大规模封锁时用户的标准自救与等待官方恢复指南', '如何利用多协议和冷门备用节点度过阵痛期'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/tech/line/iepl/', anchor: 'IEPL不过墙专线推荐' },
                { target: '/airport/ranking/stable/', anchor: '超稳定机场排行榜' },
                { target: '/help/faq/timeout/', anchor: '节点超时排障' }
              ],
              priority: 'P2'
            },
            {
              title: '端口冲突与本地监听失败：1080/7890 端口被占用的排查与修改',
              slug: 'fix-port-conflict-and-local-listen-failure',
              primaryKeyword: '代理端口冲突排查',
              secondaryKeywords: ['7890端口被占用', '修改客户端混合端口', '查看netstat端口占用', '彻底解决端口被抢'],
              longTailKeywords: [
                '软件开启时提示bind: address already in use然后节点超时', '利用CMD命令netstat -ano查找占用代理端口的罪魁祸首程序',
                '在客户端设置中将7890/1080修改为其他随机端口秒恢复', '轻松搞定多代理软件并存时的端口争抢冲突'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/app/clash/', anchor: 'Clash参数配置' },
                { target: '/client/app/v2rayn/', anchor: 'v2rayN端口修改' },
                { target: '/help/faq/timeout/', anchor: '节点超时排障' }
              ],
              priority: 'P2'
            },
            {
              title: '重新拉取订阅覆盖旧节点：机场更新了服务器 IP 本地却没同步的解法',
              slug: 'resubscribe-and-refresh-stale-nodes',
              primaryKeyword: '重新更新订阅解决超时',
              secondaryKeywords: ['机场更换中转入口', '旧节点IP全部失效', '强制更新订阅链接', '清空本地无效节点缓存'],
              longTailKeywords: [
                '机场发布维护公告换了一批全新节点但你还在用旧配置', '在客户端中执行更新订阅操作拉取最新IP地址列表图解',
                '删除旧配置文件重新导入全新订阅彻底消除缓存残留', '跟上机场动态维护步伐的日常好习惯'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/tutorial/usage/subscribe/', anchor: '订阅更新教程' },
                { target: '/help/faq/subscribe-fail/', anchor: '订阅更新失败排查' },
                { target: '/help/faq/timeout/', anchor: '超时排障' }
              ],
              priority: 'P2'
            },
            {
              title: '本地宽带网络故障自测：关掉代理软件测测看国内网站通不通',
              slug: 'diagnose-local-isp-network-outage-first',
              primaryKeyword: '本地断网排查自测',
              secondaryKeywords: ['家里断网以为是梯子坏了', '光猫路由器死机排查', '手机4G热点交叉测试', '排除本地物理网络故障'],
              longTailKeywords: [
                '电脑黄色叹号其实是光猫欠费或WiFi掉线却怪机场不行', '用手机断开WiFi切移动4G网络测试节点是否可用的交叉验证法',
                '学会科学区分“是我的网络坏了”还是“机场坏了”', '提升自检效率避免盲目折腾的黄金排障法则'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/client/device/windows/', anchor: 'Windows网络重置' },
                { target: '/help/faq/connect-fail/', anchor: '连接失败排查' },
                { target: '/help/faq/timeout/', anchor: '节点超时速查' }
              ],
              priority: 'P3'
            }
          ]
        },
        {
          id: 'subscribe-fail',
          clusterId: '6.2.2',
          title: '订阅更新失败',
          path: '/help/faq/subscribe-fail/',
          description: '订阅链接失效、拉取为空、提示 0KB 与证书无效，全方位修复订阅拉取问题。',
          articles: [
            {
              title: '订阅更新失败终极解决方案：订阅失效、拉取 0KB 与网络超时一网打尽',
              slug: 'fix-subscription-update-failed-master-guide',
              primaryKeyword: '订阅更新失败',
              secondaryKeywords: ['订阅拉取失败排查', '订阅链接失效怎么办', '更新订阅显示0KB解决', '导入后没有节点解决'],
              longTailKeywords: [
                '为什么在软件里点击更新订阅老是提示失败', '原订阅域名被拦截如何开启代理更新订阅',
                '手把手教你解决订阅下载失败的所有疑难杂症', '2026年出海玩家必备订阅拉取救急锦囊'
              ],
              searchIntent: '故障',
              internalLinks: [
                { target: '/tutorial/usage/subscribe/', anchor: '订阅导入与管理指南' },
                { target: '/help/faq/timeout/', anchor: '节点超时排查' },
                { target: '/help/faq/connect-fail/', anchor: '连接故障解决' }
              ],
              priority: 'P0'
            },
            {
              title: '订阅域名被墙导致的先有鸡还是先有蛋困境：开启代理更新订阅实操',
              slug: 'chicken-and-egg-problem-update-subscription-via-proxy',
              primaryKeyword: '开启代理更新订阅',
              secondaryKeywords: ['订阅域名被GFW污染', '没有节点怎么拉取新节点', '开代理才能更新订阅', '临时节点脱困指南'],
              longTailKeywords: [
                '机场订阅服务器被屏蔽导致必须翻墙才能更新订阅的悖论', '在Clash中设置更新订阅走特定可用代理节点的配置实战',
                '利用手机移动热点或临时备用节点拉取全新配置', '彻底破解“断网无法更新、不更新就断网”的死循环'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/app/clash/', anchor: 'Clash代理更新设置' },
                { target: '/airport/price/pay-as-you-go/', anchor: '备用节点脱困' },
                { target: '/help/faq/subscribe-fail/', anchor: '订阅更新失败排查' }
              ],
              priority: 'P0'
            },
            {
              title: '重置订阅链接（Token）：怀疑被拉黑或密钥失效时的后台重置步骤',
              slug: 'reset-subscription-token-when-compromised',
              primaryKeyword: '后台重置订阅链接教程',
              secondaryKeywords: ['订阅密钥失效', '后台重置Token', '更新最新安全订阅', '解决拉取返回403报错'],
              longTailKeywords: [
                '提示401 Unauthorized或403 Forbidden代表什么含义', '在机场后台用户中心一键重置订阅密钥Token完整流程',
                '复制最新生成的长链接重新粘贴导入客户端实操', '两分钟快速恢复账号订阅读取权限'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/tutorial/usage/buy/', anchor: '用户后台功能' },
                { target: '/help/guide/security/', anchor: '订阅安全防盗' },
                { target: '/help/faq/subscribe-fail/', anchor: '订阅失败排查' }
              ],
              priority: 'P1'
            },
            {
              title: 'SSL 证书无效与时间错误：关闭严苛证书校验救急排查指南',
              slug: 'fix-ssl-certificate-validation-error-on-subscription',
              primaryKeyword: '订阅SSL证书验证失败解决',
              secondaryKeywords: ['证书无效无法更新', '关闭严苛证书检查', '勾选Skip Cert Verify', '自签名证书兼容设置'],
              longTailKeywords: [
                '更新订阅时提示Certificate has expired或者x509报错', '在客户端高级设置中开启“忽略证书验证”临时救急操作',
                '机场免费证书到期未及时续签导致的用户端排障方案', '安全与可用性权衡下的应急处置技巧'
              ],
              searchIntent: '故障',
              internalLinks: [
                { target: '/client/app/clash/', anchor: 'Clash证书设置' },
                { target: '/client/app/shadowrocket/', anchor: '小火箭证书排查' },
                { target: '/help/faq/subscribe-fail/', anchor: '订阅失败速查' }
              ],
              priority: 'P1'
            },
            {
              title: '第三方订阅转换后端宕机崩溃：转用自建或机场原生订阅实操',
              slug: 'subconverter-backend-down-switch-to-native',
              primaryKeyword: '订阅转换后端崩溃排查',
              secondaryKeywords: ['在线转换器打不开', 'Subconverter报500错误', '使用机场原生Clash订阅', '免转换直接导入技巧'],
              longTailKeywords: [
                '为什么你买的机场明明正常但更新订阅却一直转圈失败', '公共在线订阅转换服务器被挤爆或被通报拔线的底层机理',
                '在机场后台直接寻找原生Clash/sing-box专用链接的秘诀', '摆脱对第三方转换器脆弱依赖的长效方案'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/client/app/clash/', anchor: '订阅转换安全指南' },
                { target: '/tutorial/usage/subscribe/', anchor: '原生格式导入' },
                { target: '/help/faq/subscribe-fail/', anchor: '订阅失败排障' }
              ],
              priority: 'P2'
            },
            {
              title: '客户端版本过旧不兼容新语法：升级内核与现代客户端拯救拉取失败',
              slug: 'outdated-client-version-parser-error-fix',
              primaryKeyword: '客户端版本过旧导致订阅失败',
              secondaryKeywords: ['解析YAML配置报错', '不兼容新内核语法', '升级Clash Verge版本', '更新Mihomo核心'],
              longTailKeywords: [
                '还在用三年前的旧版CFW导致无法解析新的Proxy-Providers规则', '现代机场全面上云采用新协议新格式引发的解析器崩溃',
                '一键下载最新版现代化代理客户端无缝迁移教程', '技术迭代大潮下保持软件处于最新健康状态的必要性'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/app/clash/', anchor: '现代化客户端横评' },
                { target: '/client/app/sing-box/', anchor: 'sing-box新生态' },
                { target: '/help/faq/subscribe-fail/', anchor: '订阅排障' }
              ],
              priority: 'P2'
            },
            {
              title: '节点全部被重命名为广告与通知：看清公告内容配合官方指示迁移',
              slug: 'nodes-replaced-by-announcements-migration-notice',
              primaryKeyword: '节点全变成通知和公告怎么处理',
              secondaryKeywords: ['节点列表显示请到官网更新', '机场整体域名迁移', '节点变成广告文本', '按照提示换新订阅'],
              longTailKeywords: [
                '更新订阅后发现没有正常国家节点全是文字提示是怎么回事', '机场进行重大网络重构或规避封锁的紧急通知传达手段',
                '按照文字提示登录新官网获取全新专属订阅的操作步骤', '读懂机场主的特殊摩斯密码不慌张不迷茫'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/help/guide/fake-website/', anchor: '辨别官方新网址' },
                { target: '/tutorial/usage/subscribe/', anchor: '订阅重新导入' },
                { target: '/help/faq/subscribe-fail/', anchor: '订阅故障速查' }
              ],
              priority: 'P2'
            },
            {
              title: '多机场订阅聚合工具崩溃排查：Sub-Store 语法错误与网络超时急救',
              slug: 'fix-sub-store-syntax-errors-and-sync-timeout',
              primaryKeyword: 'Sub-Store聚合报错排查',
              secondaryKeywords: ['Sub-Store同步超时', 'Docker容器挂了', '脚本运行语法报错', '恢复独立单机场订阅'],
              longTailKeywords: [
                '极客玩家自建的Sub-Store为什么突然拉取不到节点了', '其中一家机场接口挂掉导致整个聚合池卡死超时原因',
                '排除单点故障与配置异步拉取保障高可用的实战技巧', '让超级节点管理中枢永不趴窝的运维心法'
              ],
              searchIntent: '故障',
              internalLinks: [
                { target: '/tutorial/usage/subscribe/', anchor: 'Sub-Store多订阅合并教程' },
                { target: '/client/app/clash/', anchor: 'Clash高级调优' },
                { target: '/help/faq/subscribe-fail/', anchor: '订阅失败排障' }
              ],
              priority: 'P3'
            }
          ]
        },
        {
          id: 'connect-fail',
          clusterId: '6.2.3',
          title: '连接失败排查',
          path: '/help/faq/connect-fail/',
          description: '软件显示已连接但网页打不开、DNS 污染、系统代理失灵与浏览器报错。',
          articles: [
            {
              title: '连接失败排查全攻略：软件显示已连接却打不开任何国外网站的病因汇总',
              slug: 'fix-connected-but-cannot-browse-websites',
              primaryKeyword: '连接失败排查',
              secondaryKeywords: ['连上了但打不开网页', '代理软件显示已连接', '能连节点但上不了网', '浏览器报错无法访问'],
              longTailKeywords: [
                '节点延迟显示几十毫秒正常但浏览器就是白屏打不开网页', '微信QQ能聊天但打不开Google和油管怎么排查',
                '彻底排查系统代理、分流规则、DNS与TUN网卡的八大核心步骤', '2026最权威的科学上网无法连网救急指南'
              ],
              searchIntent: '故障',
              internalLinks: [
                { target: '/help/faq/timeout/', anchor: '节点全部超时排障' },
                { target: '/help/faq/slow/', anchor: '网速慢与卡顿排查' },
                { target: '/tutorial/usage/config/', anchor: '客户端配置调优' }
              ],
              priority: 'P0'
            },
            {
              title: 'Windows 系统代理设置未生效或被篡改：注册表与系统开关强制修复',
              slug: 'fix-windows-system-proxy-not-taking-effect',
              primaryKeyword: 'Windows系统代理失效修复',
              secondaryKeywords: ['系统代理打不开解决', '设置里的代理自动关闭', '注册表修复ProxyServer', '强制生效系统代理'],
              longTailKeywords: [
                '为什么在软件里点了系统代理但Windows设置里根本没有打勾', '第三方优化软件（火绒/电脑管家）暗中拦截修改系统代理',
                '批处理脚本一键写入127.0.0.1:7890强制生效系统代理', '彻底根治Windows系统代理失灵的终极绝招'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/device/windows/', anchor: 'Windows代理配置全指南' },
                { target: '/client/app/clash/', anchor: '正确退出客户端' },
                { target: '/help/faq/connect-fail/', anchor: '连接失败排查' }
              ],
              priority: 'P0'
            },
            {
              title: '浏览器代理插件冲突：SwitchyOmega 与客户端系统代理打架导致断网',
              slug: 'fix-switchyomega-conflict-with-system-proxy',
              primaryKeyword: 'SwitchyOmega与代理软件冲突',
              secondaryKeywords: ['浏览器插件导致打不开网页', '提示ERR_PROXY_CONNECTION_FAILED', '切换系统代理模式', '清除浏览器代理扩展'],
              longTailKeywords: [
                '很多人浏览器装了SwitchyOmega却忘了配置或者配置了错误端口', '插件接管了浏览器导致外部软件的系统代理完全失效',
                '将插件设置为“使用系统代理”或直接停用插件的排错验证', '扫清浏览器端代理冲突重现丝滑上网'
              ],
              searchIntent: '故障',
              internalLinks: [
                { target: '/client/device/windows/', anchor: '浏览器调优' },
                { target: '/client/device/mac/', anchor: 'Mac生产力' },
                { target: '/help/faq/connect-fail/', anchor: '连接失败速查' }
              ],
              priority: 'P1'
            },
            {
              title: '分流规则选错导致全走直连：为什么你开着代理却依然上不去 Google',
              slug: 'fix-routing-mode-direct-global-rule-mistake',
              primaryKeyword: '分流规则错误导致全直连',
              secondaryKeywords: ['模式选成了DIRECT', '全局与规则模式区别', 'Google被规则判定走直连', '切换为Rule或Global'],
              longTailKeywords: [
                '不小心把客户端顶部的出站模式切换成了DIRECT（直接连接）', '规则模式下分流列表没有包含目标网站导致的直连被墙',
                '切换为GLOBAL（全局代理）快速验证是否是分流规则的问题', '搞懂分流模式的真正切换逻辑告别迷茫'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/client/app/clash/', anchor: 'Clash策略组与规则' },
                { target: '/client/app/v2rayn/', anchor: 'v2rayN路由模式' },
                { target: '/help/faq/connect-fail/', anchor: '连接排障' }
              ],
              priority: 'P1'
            },
            {
              title: '浏览器安全软件与广告拦截扩展误杀：拦截 WebSocket 与代理连接排错',
              slug: 'fix-adblocker-and-antivirus-blocking-websocket',
              primaryKeyword: '广告拦截扩展导致代理失败',
              secondaryKeywords: ['uBlock拦截代理请求', 'Chrome安全防护拦截', 'ERR_CONNECTION_CLOSED排查', '关闭扩展白名单排错'],
              longTailKeywords: [
                '安装了某些过于激进的去广告插件导致海外网站脚本直接被毙', '使用无痕隐私窗口（Incognito）测试排查扩展干扰实操',
                '配置广告拦截白名单放行必要出海网络连接的秘诀', '找出静默拦截你网络的幕后小偷'
              ],
              searchIntent: '故障',
              internalLinks: [
                { target: '/help/guide/security/', anchor: '软件安全' },
                { target: '/tutorial/usage/config/', anchor: '客户端配置' },
                { target: '/help/faq/connect-fail/', anchor: '连接失败排查' }
              ],
              priority: 'P2'
            },
            {
              title: '手机端 VPN 配置文件损坏或冲突：iOS 与安卓重置网络设置急救法',
              slug: 'fix-mobile-vpn-profile-corruption-and-conflicts',
              primaryKeyword: '手机VPN配置损坏重置',
              secondaryKeywords: ['iPhone删除VPN描述文件', '安卓清除VpnService状态', '手机连不上外网重置', '彻底拯救手机断网'],
              longTailKeywords: [
                '手机系统更新后小火箭开关打开立刻自动弹回断开怎么办', '在iPhone设置中彻底删除旧的Shadowrocket VPN配置并重新生成',
                '安卓手机重置WLAN、移动数据和蓝牙网络设置完整图解', '三分钟拯救手机端网络假死瘫痪'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/device/iphone/', anchor: 'iPhone全套配置' },
                { target: '/client/device/android/', anchor: '安卓系统调优' },
                { target: '/help/faq/connect-fail/', anchor: '连接失败排查' }
              ],
              priority: 'P2'
            },
            {
              title: '企业与校园内网深层数据包检测（DPI）：网管封杀代理端口的突围方案',
              slug: 'bypass-campus-and-corporate-dpi-deep-packet-inspection',
              primaryKeyword: '校园网公司内网DPI拦截解决',
              secondaryKeywords: ['学校网络封杀翻墙软件', '公司深信服行为管理', 'DPI深度包检测突破', '切换443标准HTTPS端口'],
              longTailKeywords: [
                '学校校园网和单位内网设备是如何通过特征识别封锁代理协议的', '为什么所有高位非常规端口（如10000+）在内网一律被阻断',
                '挑选支持标准443端口与Vless Reality极致伪装的节点突围', '在严苛受限内网环境中实现自由顺畅出海'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/tutorial/compare/protocol/', anchor: 'Vless Reality深度伪装' },
                { target: '/tech/line/iepl/', anchor: 'IEPL不过墙' },
                { target: '/help/faq/connect-fail/', anchor: '连接故障速查' }
              ],
              priority: 'P2'
            },
            {
              title: 'DNS 缓存污染清理：Windows ipconfig /flushdns 与 Chrome 清理全实操',
              slug: 'flush-dns-cache-windows-mac-chrome-guide',
              primaryKeyword: '刷新清理DNS缓存实操',
              secondaryKeywords: ['ipconfig flushdns命令', '清除Chrome内部DNS缓存', '解决域名解析死锁', '瞬间恢复网页正常访问'],
              longTailKeywords: [
                '即使换了好节点为什么浏览器依然顽固地连接之前的错误IP', 'Windows CMD运行ipconfig /flushdns清除系统DNS缓存',
                '在Chrome中输入chrome://net-internals/#dns清除套接字缓存', '打通出海网络拥塞的最后一公里'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/client/device/windows/', anchor: 'Windows终端操作' },
                { target: '/client/device/mac/', anchor: 'Mac终端清理' },
                { target: '/help/faq/connect-fail/', anchor: '连接排障' }
              ],
              priority: 'P3'
            }
          ]
        },
        {
          id: 'slow',
          clusterId: '6.2.4',
          title: '速度慢与晚高峰',
          path: '/help/faq/slow/',
          description: '晚上 8~11 点卡顿、油管自动降画质、运营商 QoS 限速与网络优化技巧。',
          articles: [
            {
              title: '网速慢与晚高峰卡顿终极排查指南：告别每晚8点到11点转圈掉速噩梦',
              slug: 'fix-slow-speed-and-peak-hours-lag-master-guide',
              primaryKeyword: '速度慢与晚高峰',
              secondaryKeywords: ['晚高峰卡顿排查', '翻墙网速慢怎么办', '看油管4K老转圈', '晚上网络掉速解决'],
              longTailKeywords: [
                '为什么一到晚上八九点所有节点速度就暴跌几十倍', '运营商国际出口骨干网QoS压制机制深度揭秘',
                '如何挑出晚高峰完全不卡顿的冷门线路与专线梯子', '2026年出海玩家必学的网络提速与优化秘笈'
              ],
              searchIntent: '故障',
              internalLinks: [
                { target: '/help/faq/timeout/', anchor: '节点超时排障' },
                { target: '/tech/line/iepl/', anchor: 'IEPL独立专线' },
                { target: '/scenario/streaming/youtube/', anchor: 'YouTube 4K播放推荐' }
              ],
              priority: 'P0'
            },
            {
              title: '晚高峰 QoS 限速与国际出口拥堵原理：为什么白天秒开晚上变标清',
              slug: 'peak-hours-qos-and-international-bandwidth-congestion',
              primaryKeyword: '晚高峰QoS限速原理',
              secondaryKeywords: ['国际公网出口大塞车', '运营商QoS策略机制', '丢包率从0%飙升至30%', '白天与晚上测速对比'],
              longTailKeywords: [
                '全国数亿网民晚上下班回家同时刷视频造成的骨干网雪崩', '电信163骨干网与联通169骨干网晚高峰拥堵曲线实测',
                '普通中转和直连在公网大拥堵下的无可奈何', '深入理解物理公网带宽瓶颈的技术逻辑'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/tutorial/compare/line/', anchor: '线路深度横向对比' },
                { target: '/tech/line/bgp/', anchor: 'BGP中转部署' },
                { target: '/help/faq/slow/', anchor: '卡顿深度排查' }
              ],
              priority: 'P0'
            },
            {
              title: '破局晚高峰神器：为什么换用 IEPL 内网专线能彻底告别降速魔咒',
              slug: 'iepl-dedicated-lines-cure-peak-hours-lag',
              primaryKeyword: '专线解决晚高峰卡顿',
              secondaryKeywords: ['IEPL专线晚高峰表现', '物理光缆不过公网骨干', '高峰期依然满速下载', '告别画质降级神器'],
              longTailKeywords: [
                '内网专线由于完全避开公网国际出口拥堵的降维打击', '晚高峰9点实测YouTube跑分稳定在20万Kbps以上的秘密',
                '多花几块钱换来全天候完全无感的使用幸福感', '重度追剧和游戏党不可妥协的升级之选'
              ],
              searchIntent: '购买',
              internalLinks: [
                { target: '/tech/line/iepl/', anchor: 'IEPL专线推荐' },
                { target: '/airport/ranking/stable/', anchor: '超稳定机场排行榜' },
                { target: '/help/faq/slow/', anchor: '速度慢排查' }
              ],
              priority: 'P1'
            },
            {
              title: '避开热门拥挤节点：从香港挤破头切换到日本/新加坡冷门高速线实操',
              slug: 'switch-to-less-congested-japan-singapore-nodes',
              primaryKeyword: '切换冷门高速节点避拥堵',
              secondaryKeywords: ['不要盲目连香港节点', '日本冷门专线提速', '新加坡大带宽分流', 'Clash策略组调优'],
              longTailKeywords: [
                '机场几万人都在疯狂挤香港01节点导致的严重内耗拥堵', '一键切换到日本大阪或新加坡备用节点瞬间飞起实录',
                '在客户端中设置自动按连接负载分流的高级玩法', '告别从众心理享受私人订制般的高速通道'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/tech/region/japan/', anchor: '日本节点专栏' },
                { target: '/tech/region/singapore/', anchor: '新加坡节点专栏' },
                { target: '/client/app/clash/', anchor: 'Clash策略组' }
              ],
              priority: 'P1'
            },
            {
              title: '本地 WiFi 与路由器瓶颈排查：别让家里的老旧路由器拖垮百兆梯子',
              slug: 'home-wifi-and-router-bottleneck-troubleshooting',
              primaryKeyword: '本地WiFi拖慢翻墙速度排查',
              secondaryKeywords: ['2.4G WiFi严重卡顿', '切换5G/WiFi6频段', '老旧路由器CPU跑满', '软路由性能升级'],
              longTailKeywords: [
                '连着2.4G WiFi测速只有20Mbps换上网线立刻跑满500Mbps', '加密代理运算导致千兆老路由器CPU瞬间飙到100%卡死',
                '排查本地无线干扰与升级WiFi 6路由器的显著收益', '先排查自己家里设备再怪机场不给力的客观思路'
              ],
              searchIntent: '故障',
              internalLinks: [
                { target: '/client/device/router/', anchor: '软路由与电视机场' },
                { target: '/client/device/windows/', anchor: 'Windows测速' },
                { target: '/help/faq/slow/', anchor: '速度排查' }
              ],
              priority: 'P2'
            },
            {
              title: '调优系统 TCP 窗口与拥塞控制算法：开启 BBR 让单线程下载速度翻倍',
              slug: 'optimize-tcp-window-and-bbr-congestion-control',
              primaryKeyword: '开启BBR加速与TCP窗口调优',
              secondaryKeywords: ['单线程下载速度慢解决', 'Linux开启BBR算法', 'Windows网络栈调优', '突破TCP传输限制'],
              longTailKeywords: [
                '长肥管道（Long Fat Network）高延迟网络下的TCP吞吐量瓶颈', 'Google BBR算法如何在有丢包的情况下榨干全部带宽潜能',
                '调整本地客户端TCP并发连接数与套接字参数实操', '硬核技术玩家压榨每一兆网速的极致手段'
              ],
              searchIntent: '教程',
              internalLinks: [
                { target: '/tutorial/usage/config/', anchor: '客户端配置调优' },
                { target: '/tech/line/iepl/', anchor: '专线高吞吐' },
                { target: '/help/faq/slow/', anchor: '卡顿解决' }
              ],
              priority: 'P2'
            },
            {
              title: '运营商本地宽带偷工减料排查：如何测出本地运营商是否存在国际出口限速',
              slug: 'detect-local-isp-throttling-international-bandwidth',
              primaryKeyword: '运营商国际出口限速排查',
              secondaryKeywords: ['长城宽带/移动宽带限速', '单线程限速5Mbps', '工信部投诉运营商限速', '更换优质联通电信宽带'],
              longTailKeywords: [
                '某些二级小宽带把所有海外流量统一降级成铁通出口的恶劣行径', '使用单线程与多线程测速对比精准判断是否存在恶意限速',
                '打电话给运营商客服要求关闭限速策略甚至工信部申诉实战', '从源头宽带基础设施彻底拔除网速卡慢病根'
              ],
              searchIntent: '知识',
              internalLinks: [
                { target: '/tech/line/bgp/', anchor: '运营商与BGP适配' },
                { target: '/help/guide/security/', anchor: '合规与维权' },
                { target: '/help/faq/slow/', anchor: '慢速排障' }
              ],
              priority: 'P2'
            },
            {
              title: '2026年终极抗晚高峰机场挑选清单：只选大厂、只选专线、只选冗余',
              slug: 'best-airports-to-conquer-peak-hours-2026',
              primaryKeyword: '抗晚高峰机场推荐榜',
              secondaryKeywords: ['晚上不卡顿梯子推荐', '晚高峰实测高速机场', '抗QoS限速机场', '通宵追剧狂飙机场'],
              longTailKeywords: [
                'AirPick编辑部在每晚9点准时严苛压力测试选出的五大标杆', '拥有多套备用冗余线路大厂的技术底蕴剖析',
                '为重度依赖夜间出海工作与娱乐的专业人士提供的终极答案'
              ],
              searchIntent: '决策',
              internalLinks: [
                { target: '/airport/ranking/top/', anchor: '晚高峰测速排行榜' },
                { target: '/airport/type/premium/', anchor: '高端专线机场推荐' },
                { target: '/airport/ranking/stable/', anchor: '超稳定机场排行榜' }
              ],
              priority: 'P3'
            }
          ]
        }
      ]
    }
  ]
};
