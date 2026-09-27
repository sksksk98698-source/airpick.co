import { defineConfig, type HeadConfig } from 'vitepress'
import { pagefindPlugin, chineseSearchOptimize } from 'vitepress-plugin-pagefind'

export default defineConfig({
  lang: 'zh-cn',
  title: 'AirPick · 机场推荐',
  description: '2026 机场推荐：稳定、便宜、好用的机场排行榜 · airpick.co',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,
  sitemap: {
    hostname: 'https://airpick.co',
    lastmodDateOnly: true,
    transformItems(items) {
      const today = new Date().toISOString().split('T')[0]
      const coreHubs = new Set([
        'airport/', 'vpn/', 'jichang/', 'clash/', 'nodes/',
        'tizi/', 'free/', 'brands/', 'tutorial/', 'reviews/'
      ])

      return items
        .filter(item => {
          // 严格排除 404、草稿与测试页面，确保进入 Sitemap 的全部为正式可索引页面
          if (item.url.includes('404') || item.url.includes('draft') || item.url.includes('test')) {
            return false
          }
          return true
        })
        .map(item => {
          // 规范化相对路径
          const clean = item.url.replace(/^https?:\/\/[^\/]+/, '').replace(/^\//, '')
          const cleanWithSlash = clean.endsWith('/') ? clean : clean + '/'

          let priority = 0.7
          let changefreq = 'weekly'

          if (clean === '' || clean === '/') {
            // 网站首页最高权重
            priority = 1.0
            changefreq = 'daily'
          } else if (coreHubs.has(cleanWithSlash)) {
            // 10 大核心战略枢纽专区
            priority = 0.9
            changefreq = 'daily'
          } else if (clean.endsWith('/') || clean.endsWith('/index')) {
            // 二级/三级分类专题聚合页
            priority = 0.8
            changefreq = 'daily'
          } else if (clean.startsWith('reviews/')) {
            // 核心品牌专栏与评测
            priority = 0.8
            changefreq = 'weekly'
          } else if (clean.includes('about')) {
            // 辅助信息页
            priority = 0.5
            changefreq = 'monthly'
          }

          // 保证每个页面均具备标准的 YYYY-MM-DD 格式 lastmod
          const lastmod = item.lastmod
            ? new Date(item.lastmod).toISOString().split('T')[0]
            : today

          return {
            ...item,
            lastmod,
            changefreq,
            priority
          }
        })
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#14b8a6' }],
    ['meta', { name: 'keywords', content: '机场推荐, 机场排行榜, 2026机场推荐, 稳定机场推荐, 便宜机场推荐, 专线机场, Clash机场, 梯子推荐, VPN推荐, AirPick' }],
    ['meta', { property: 'og:site_name', content: 'AirPick' }],
    ['meta', { property: 'og:title', content: 'AirPick · 2026 机场推荐与深度评测指南' }],
    ['meta', { property: 'og:description', content: 'Pick 你的机场，稳定又便宜。面向中文用户的机场推荐、评测、教程与避坑指南 · airpick.co' }],
    ['meta', { property: 'og:url', content: 'https://airpick.co/' }],
  ],
  transformHead(context) {
    const { pageData, siteData } = context
    const relativePath = pageData.relativePath
    const title = pageData.title || siteData.title
    const description = pageData.description || siteData.description

    // 1. 计算严格自引用的正式主域名 Canonical URL
    let cleanPath = relativePath.replace(/\.md$/, '')
    let canonicalUrl = 'https://airpick.co/'
    if (relativePath === 'index.md') {
      canonicalUrl = 'https://airpick.co/'
    } else if (cleanPath.endsWith('/index')) {
      canonicalUrl = `https://airpick.co/${cleanPath.replace(/\/index$/, '')}/`
    } else {
      canonicalUrl = `https://airpick.co/${cleanPath}`
    }

    const heads: HeadConfig[] = []

    // 2. 注入唯一 Canonical 标签
    heads.push(['link', { rel: 'canonical', href: canonicalUrl }])

    // 3. 注入标准搜索引擎索引与摘要抓取规则
    heads.push(['meta', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' }])

    // 4. 注入 Open Graph 与 Twitter Card 社交元数据
    const isArticle = !relativePath.endsWith('index.md') && relativePath !== 'about.md'
    heads.push(['meta', { property: 'og:url', content: canonicalUrl }])
    heads.push(['meta', { property: 'og:type', content: isArticle ? 'article' : 'website' }])
    heads.push(['meta', { property: 'og:title', content: title }])
    heads.push(['meta', { property: 'og:description', content: description }])
    heads.push(['meta', { property: 'og:site_name', content: 'AirPick' }])
    heads.push(['meta', { property: 'og:locale', content: 'zh_CN' }])
    heads.push(['meta', { property: 'og:image', content: 'https://airpick.co/logo.svg' }])

    heads.push(['meta', { name: 'twitter:card', content: 'summary_large_image' }])
    heads.push(['meta', { name: 'twitter:title', content: title }])
    heads.push(['meta', { name: 'twitter:description', content: description }])
    heads.push(['meta', { name: 'twitter:image', content: 'https://airpick.co/logo.svg' }])

    // 5. 文章专属元数据 (发布时间、更新时间、作者、分类)
    if (isArticle) {
      const now = new Date().toISOString()
      heads.push(['meta', { property: 'article:published_time', content: '2026-01-01T08:00:00+08:00' }])
      heads.push(['meta', { property: 'article:modified_time', content: now }])
      heads.push(['meta', { property: 'article:author', content: 'AirPick 深度网络实验室' }])
      const category = relativePath.split('/')[0]
      heads.push(['meta', { property: 'article:section', content: category }])
    }

    // 6. 预留各大搜索引擎站长平台所有权验证 Meta 标签插槽（直接渲染至 HTML 源码，零客户端 JS 依赖）
    const googleVerification = process.env.GOOGLE_SITE_VERIFICATION || ''
    const bingVerification = process.env.BING_SITE_VERIFICATION || ''
    const baiduVerification = process.env.BAIDU_SITE_VERIFICATION || ''
    const shenmaVerification = process.env.SHENMA_SITE_VERIFICATION || ''

    if (googleVerification) {
      heads.push(['meta', { name: 'google-site-verification', content: googleVerification }])
    }
    if (bingVerification) {
      heads.push(['meta', { name: 'msvalidate.01', content: bingVerification }])
    }
    if (baiduVerification) {
      heads.push(['meta', { name: 'baidu-site-verification', content: baiduVerification }])
    }
    if (shenmaVerification) {
      heads.push(['meta', { name: 'shenma-site-verification', content: shenmaVerification }])
    }

    // 7. 结构化数据 Schema.org (JSON-LD) 智能装配
    // 面包屑 BreadcrumbList
    const crumbs = [{ '@type': 'ListItem', position: 1, name: '首页', item: 'https://airpick.co/' }]
    const pathParts = cleanPath.split('/').filter(Boolean)
    if (relativePath !== 'index.md') {
      let accumulated = 'https://airpick.co'
      pathParts.forEach((part, index) => {
        if (part === 'index') return
        accumulated += `/${part}`
        const nameMap: Record<string, string> = {
          'airport': '机场推荐',
          'ranking': '排行榜',
          'price': '按价格分类',
          'type': '按类型分类',
          'client': '客户端与设备',
          'app': '客户端软件',
          'device': '设备平台',
          'scenario': '场景应用',
          'ai': 'AI 场景',
          'streaming': '4K 流媒体',
          'game': '外服游戏加速',
          'tech': '技术线路',
          'line': '物理链路',
          'ip': 'IP 类型',
          'region': '全球地域',
          'tutorial': '教程知识',
          'basic': '基础概念',
          'usage': '使用教程',
          'compare': '横向对比',
          'help': '避坑与故障',
          'guide': '避坑指南',
          'faq': '高频故障自查',
          'reviews': '品牌库与评测',
          'vpn': 'VPN 专区',
          'jichang': '机场推荐专区',
          'clash': 'Clash 专区',
          'nodes': '全球节点专区',
          'tizi': '梯子专区',
          'free': '免费资源专区',
          'brands': '品牌库专区',
          'about': '关于我们',
        }
        const isLast = index === pathParts.length - 1
        const crumbName = isLast ? title.replace(/ - AirPick.*$/, '').replace(/ · AirPick.*$/, '') : (nameMap[part] || part)
        crumbs.push({
          '@type': 'ListItem',
          position: crumbs.length + 1,
          name: crumbName,
          item: accumulated.endsWith('/') ? accumulated : (isLast && !cleanPath.endsWith('/index') ? accumulated : `${accumulated}/`)
        })
      })
    }

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs
    }

    let pageSpecificSchema: Record<string, any> | null = null

    if (relativePath === 'index.md') {
      // 首页：WebSite + Organization
      pageSpecificSchema = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': 'https://airpick.co/#website',
            name: 'AirPick',
            url: 'https://airpick.co/',
            description: '2026 机场推荐：稳定、便宜、好用的机场排行榜 · airpick.co',
            inLanguage: 'zh-CN',
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://airpick.co/?q={search_term_string}'
              },
              'query-input': 'required name=search_term_string'
            }
          },
          {
            '@type': 'Organization',
            '@id': 'https://airpick.co/#organization',
            name: 'AirPick 深度网络实验室',
            url: 'https://airpick.co/',
            logo: {
              '@type': 'ImageObject',
              url: 'https://airpick.co/logo.svg'
            },
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'technical support',
              url: 'https://t.me/XXFF555333'
            }
          }
        ]
      }
    } else if (relativePath.endsWith('index.md')) {
      // 栏目/聚合页：CollectionPage
      pageSpecificSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: title,
        description: description,
        url: canonicalUrl,
        inLanguage: 'zh-CN',
        isPartOf: {
          '@type': 'WebSite',
          name: 'AirPick',
          url: 'https://airpick.co/'
        }
      }
    } else {
      // 文章页：Article
      pageSpecificSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: description,
        url: canonicalUrl,
        inLanguage: 'zh-CN',
        datePublished: '2026-01-01T08:00:00+08:00',
        dateModified: new Date().toISOString(),
        author: {
          '@type': 'Organization',
          name: 'AirPick 深度网络实验室',
          url: 'https://airpick.co/'
        },
        publisher: {
          '@type': 'Organization',
          name: 'AirPick',
          url: 'https://airpick.co/',
          logo: {
            '@type': 'ImageObject',
            url: 'https://airpick.co/logo.svg'
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl
        }
      }
    }

    if (pageSpecificSchema) {
      heads.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify(pageSpecificSchema)
      ])
    }

    if (crumbs.length > 1) {
      heads.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify(breadcrumbSchema)
      ])
    }

    return heads
  },
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: false,
    nav: [
      { text: '机场推荐', link: '/airport/' },
      { text: 'VPN 选型', link: '/vpn/' },
      { text: 'Clash 专区', link: '/clash/' },
      { text: '节点测速', link: '/nodes/' },
      { text: '梯子推荐', link: '/tizi/' },
      { text: '免费资源', link: '/free/' },
      { text: '使用教程', link: '/tutorial/' },
      { text: '品牌库', link: '/brands/' },
      { text: '故障自查', link: '/help/' },
      { text: '关于', link: '/about' },
    ],
    sidebar: {
      '/airport/': [
        {
          text: '排行榜与推荐',
          collapsed: false,
          items: [
            { text: '专题总览', link: '/airport/ranking/' },
            { text: '1.1.1 机场排行榜', link: '/airport/ranking/top/' },
            { text: '1.1.2 稳定机场推荐', link: '/airport/ranking/stable/' },
            { text: '1.1.3 高性价比机场', link: '/airport/ranking/value/' },
          ]
        },
        {
          text: '按价格分类',
          collapsed: false,
          items: [
            { text: '专题总览', link: '/airport/price/' },
            { text: '1.2.1 便宜机场推荐', link: '/airport/price/cheap/' },
            { text: '1.2.2 月付与年付机场', link: '/airport/price/monthly/' },
            { text: '1.2.3 按量计费机场', link: '/airport/price/pay-as-you-go/' },
          ]
        },
        {
          text: '按类型分类',
          collapsed: false,
          items: [
            { text: '专题总览', link: '/airport/type/' },
            { text: '1.3.1 专线机场推荐', link: '/airport/type/premium/' },
            { text: '1.3.2 免费试用机场', link: '/airport/type/free-trial/' },
            { text: '1.3.3 机场优惠码', link: '/airport/type/coupon/' },
          ]
        }
      ],
      '/jichang/': [
        {
          text: '机场推荐专区',
          collapsed: false,
          items: [
            { text: '机场专区首页', link: '/jichang/' },
            { text: '综合实力排行榜', link: '/airport/ranking/top/' },
            { text: '稳定高可用专线', link: '/airport/ranking/stable/' },
            { text: '便宜平价梯子精选', link: '/airport/price/cheap/' },
            { text: 'IEPL 专线深度横评', link: '/airport/type/premium/' },
            { text: '独家优惠码一键复制', link: '/airport/type/coupon/' },
          ]
        }
      ],
      '/vpn/': [
        {
          text: 'VPN 与出海选型',
          collapsed: false,
          items: [
            { text: 'VPN 专题首页', link: '/vpn/' },
            { text: '机场与 VPN 本质区别', link: '/tutorial/basic/vs-vpn/' },
            { text: '现代代理协议全景横评', link: '/tutorial/compare/protocol/' },
            { text: 'Fake-IP 模式解析', link: '/tutorial/basic/terms/fake-ip-vs-redir-host-dns-explained' },
            { text: '稳定专线梯子推荐', link: '/airport/ranking/stable/' },
          ]
        }
      ],
      '/clash/': [
        {
          text: 'Clash 核心专区',
          collapsed: false,
          items: [
            { text: 'Clash 专区首页', link: '/clash/' },
            { text: 'Clash 机场推荐', link: '/client/app/clash/best-clash-airports-2026' },
            { text: 'CFW 替代方案', link: '/client/app/clash/clash-alternatives-after-cfw-sunset' },
            { text: 'ACL4SSR 分流规则调优', link: '/client/app/clash/clash-rulesets-acl4ssr-optimization' },
            { text: '局域网共享代理实战', link: '/client/app/clash/clash-lan-allow-sharing-guide' },
            { text: '在线订阅转换安全指南', link: '/client/app/clash/clash-subconverter-security-guide' },
          ]
        }
      ],
      '/nodes/': [
        {
          text: '全球节点与测速',
          collapsed: false,
          items: [
            { text: '全球节点首页', link: '/nodes/' },
            { text: '香港节点机场深度实测', link: '/tech/region/hongkong/best-hongkong-airports-2026' },
            { text: '日本节点机场延迟剖析', link: '/tech/region/japan/best-japan-airports-2026' },
            { text: '新加坡节点大带宽横测', link: '/tech/region/singapore/best-singapore-airports-2026' },
            { text: '美国美西美东节点对比', link: '/tech/region/usa/us-west-vs-us-east-nodes-latency-benchmark' },
            { text: '双 ISP 原生住宅 IP 解锁', link: '/tech/ip/native/dual-isp-native-ip-super-unlocking' },
          ]
        }
      ],
      '/tizi/': [
        {
          text: '科学上网梯子精选',
          collapsed: false,
          items: [
            { text: '梯子专区首页', link: '/tizi/' },
            { text: '2026 年度梯子综合榜', link: '/airport/ranking/top/' },
            { text: '学生党平价梯子精选', link: '/airport/price/cheap/' },
            { text: '企业级超稳定梯子', link: '/airport/ranking/stable/' },
            { text: '梯子跑路预警与防骗', link: '/help/guide/scam/' },
            { text: '节点全部超时自查', link: '/help/faq/timeout/' },
          ]
        }
      ],
      '/free/': [
        {
          text: '免费资源与试用',
          collapsed: false,
          items: [
            { text: '免费资源首页', link: '/free/' },
            { text: '正规免费试用机场汇总', link: '/airport/type/free-trial/best-free-trial-airports-2026' },
            { text: '一元体验套餐梯子横评', link: '/airport/type/free-trial/one-yuan-trial-package-airports' },
            { text: '每日签到领免费流量', link: '/airport/type/free-trial/daily-check-in-free-traffic-airports' },
            { text: '不限时按量计费备用推荐', link: '/airport/price/pay-as-you-go/' },
            { text: '永久免费陷阱与隐私风险', link: '/airport/type/free-trial/free-trial-airports-privacy-risks' },
          ]
        }
      ],
      '/client/': [
        {
          text: '客户端',
          collapsed: false,
          items: [
            { text: '客户端总览', link: '/client/app/' },
            { text: '2.1.1 Clash 机场推荐', link: '/client/app/clash/' },
            { text: '2.1.2 Shadowrocket 机场推荐', link: '/client/app/shadowrocket/' },
            { text: '2.1.3 v2rayN 机场推荐', link: '/client/app/v2rayn/' },
            { text: '2.1.4 sing-box 机场推荐', link: '/client/app/sing-box/' },
          ]
        },
        {
          text: '设备端',
          collapsed: false,
          items: [
            { text: '设备端总览', link: '/client/device/' },
            { text: '2.2.1 Windows 机场推荐', link: '/client/device/windows/' },
            { text: '2.2.2 Mac 机场推荐', link: '/client/device/mac/' },
            { text: '2.2.3 iPhone 机场推荐', link: '/client/device/iphone/' },
            { text: '2.2.4 Android 机场推荐', link: '/client/device/android/' },
            { text: '2.2.5 路由器与电视机场', link: '/client/device/router/' },
          ]
        }
      ],
      '/scenario/': [
        {
          text: 'AI 工具',
          collapsed: false,
          items: [
            { text: 'AI 工具总览', link: '/scenario/ai/' },
            { text: '3.1.1 ChatGPT 机场推荐', link: '/scenario/ai/chatgpt/' },
            { text: '3.1.2 Claude 机场推荐', link: '/scenario/ai/claude/' },
            { text: '3.1.3 Gemini 机场推荐', link: '/scenario/ai/gemini/' },
          ]
        },
        {
          text: '流媒体',
          collapsed: false,
          items: [
            { text: '流媒体总览', link: '/scenario/streaming/' },
            { text: '3.2.1 Netflix 机场推荐', link: '/scenario/streaming/netflix/' },
            { text: '3.2.2 YouTube 机场推荐', link: '/scenario/streaming/youtube/' },
            { text: '3.2.3 TikTok 机场推荐', link: '/scenario/streaming/tiktok/' },
            { text: '3.2.4 流媒体解锁机场', link: '/scenario/streaming/all/' },
          ]
        },
        {
          text: '游戏与社交',
          collapsed: false,
          items: [
            { text: '游戏与社交总览', link: '/scenario/game/' },
            { text: '3.3.1 游戏加速机场', link: '/scenario/game/accel/' },
            { text: '3.3.2 社交平台机场', link: '/scenario/game/social/' },
          ]
        }
      ],
      '/tech/': [
        {
          text: '线路技术',
          collapsed: false,
          items: [
            { text: '线路技术总览', link: '/tech/line/' },
            { text: '4.1.1 IEPL 机场推荐', link: '/tech/line/iepl/' },
            { text: '4.1.2 IPLC 机场推荐', link: '/tech/line/iplc/' },
            { text: '4.1.3 BGP 中转机场', link: '/tech/line/bgp/' },
            { text: '4.1.4 CN2 GIA 机场', link: '/tech/line/cn2-gia/' },
          ]
        },
        {
          text: 'IP 类型',
          collapsed: false,
          items: [
            { text: 'IP 类型总览', link: '/tech/ip/' },
            { text: '4.2.1 原生 IP 机场推荐', link: '/tech/ip/native/' },
            { text: '4.2.2 住宅 IP 与静态 IP', link: '/tech/ip/residential/' },
          ]
        },
        {
          text: '地区节点',
          collapsed: false,
          items: [
            { text: '地区节点总览', link: '/tech/region/' },
            { text: '4.3.1 香港节点机场', link: '/tech/region/hongkong/' },
            { text: '4.3.2 日本节点机场', link: '/tech/region/japan/' },
            { text: '4.3.3 新加坡节点机场', link: '/tech/region/singapore/' },
            { text: '4.3.4 美国节点机场', link: '/tech/region/usa/' },
          ]
        }
      ],
      '/tutorial/': [
        {
          text: '基础概念',
          collapsed: false,
          items: [
            { text: '基础概念总览', link: '/tutorial/basic/' },
            { text: '5.1.1 什么是机场', link: '/tutorial/basic/what-is/' },
            { text: '5.1.2 机场与 VPN 区别', link: '/tutorial/basic/vs-vpn/' },
            { text: '5.1.3 节点术语解释', link: '/tutorial/basic/terms/' },
          ]
        },
        {
          text: '使用教程',
          collapsed: false,
          items: [
            { text: '使用教程总览', link: '/tutorial/usage/' },
            { text: '5.2.1 购买与注册教程', link: '/tutorial/usage/buy/' },
            { text: '5.2.2 订阅导入教程', link: '/tutorial/usage/subscribe/' },
            { text: '5.2.3 客户端配置教程', link: '/tutorial/usage/config/' },
          ]
        },
        {
          text: '对比知识',
          collapsed: false,
          items: [
            { text: '对比知识总览', link: '/tutorial/compare/' },
            { text: '5.3.1 协议对比', link: '/tutorial/compare/protocol/' },
            { text: '5.3.2 线路对比', link: '/tutorial/compare/line/' },
            { text: '5.3.3 工具对比', link: '/tutorial/compare/tool/' },
          ]
        }
      ],
      '/help/': [
        {
          text: '避坑指南',
          collapsed: false,
          items: [
            { text: '避坑指南总览', link: '/help/guide/' },
            { text: '6.1.1 机场跑路预警', link: '/help/guide/scam/' },
            { text: '6.1.2 购买避坑指南', link: '/help/guide/buying/' },
            { text: '6.1.3 安全与隐私', link: '/help/guide/security/' },
            { text: '6.1.4 官网真假辨别', link: '/help/guide/fake-website/' },
          ]
        },
        {
          text: '故障排查',
          collapsed: false,
          items: [
            { text: '故障排查总览', link: '/help/faq/' },
            { text: '6.2.1 节点全部超时', link: '/help/faq/timeout/' },
            { text: '6.2.2 订阅更新失败', link: '/help/faq/subscribe-fail/' },
            { text: '6.2.3 连接失败排查', link: '/help/faq/connect-fail/' },
            { text: '6.2.4 速度慢与晚高峰', link: '/help/faq/slow/' },
          ]
        }
      ],
      '/brands/': [
        {
          text: '核心主推品牌专栏',
          collapsed: false,
          items: [
            { text: '⭐ 机场品牌库总览', link: '/brands/' },
            { text: '👑 光速云评测 (全网主推)', link: '/reviews/guangsucloud/' },
            { text: '🥈 飞猫云评测 (年付低价)', link: '/reviews/feimaocloud/' },
            { text: '🥉 微风网络评测 (轻度首选)', link: '/reviews/breezenet/' },
            { text: '⭐ 星岛梦评测 (不限时按量)', link: '/reviews/xingdaomeng/' },
            { text: '⭐ 无忧链接评测 (低至6元起)', link: '/reviews/worryfree/' },
            { text: '⭐ 暮光加速评测 (20元120G)', link: '/reviews/twilight/' },
            { text: '⭐ 二猫云评测 (20元130G)', link: '/reviews/ermaocloud/' },
            { text: '⭐ 灵猫网络评测 (19元150G大流量)', link: '/reviews/civetnet/' },
            { text: '⭐ 极连云评测 (18元100G专线)', link: '/reviews/jiliancloud/' },
            { text: '⭐ 宇宙云评测 (14.9元超低门槛)', link: '/reviews/yuzhoucloud/' },
            { text: '⭐ 唯兔云评测 (60+节点三网优化)', link: '/reviews/v2yun/' },
            { text: '⭐ 隐形人评测 (企业级不挤兑)', link: '/reviews/invisible/' },
          ]
        }
      ],
      '/reviews/': [
        {
          text: '核心主推品牌专栏',
          collapsed: false,
          items: [
            { text: '⭐ 机场品牌库总览', link: '/reviews/' },
            { text: '👑 光速云评测 (全网主推)', link: '/reviews/guangsucloud/' },
            { text: '🥈 飞猫云评测 (年付低价)', link: '/reviews/feimaocloud/' },
            { text: '🥉 微风网络评测 (轻度首选)', link: '/reviews/breezenet/' },
            { text: '⭐ 星岛梦评测 (不限时按量)', link: '/reviews/xingdaomeng/' },
            { text: '⭐ 无忧链接评测 (低至6元起)', link: '/reviews/worryfree/' },
            { text: '⭐ 暮光加速评测 (20元120G)', link: '/reviews/twilight/' },
            { text: '⭐ 二猫云评测 (20元130G)', link: '/reviews/ermaocloud/' },
            { text: '⭐ 灵猫网络评测 (19元150G大流量)', link: '/reviews/civetnet/' },
            { text: '⭐ 极连云评测 (18元100G专线)', link: '/reviews/jiliancloud/' },
            { text: '⭐ 宇宙云评测 (14.9元超低门槛)', link: '/reviews/yuzhoucloud/' },
            { text: '⭐ 唯兔云评测 (60+节点三网优化)', link: '/reviews/v2yun/' },
            { text: '⭐ 隐形人评测 (企业级不挤兑)', link: '/reviews/invisible/' },
          ]
        }
      ]
    },
    footer: {
      message: '数据仅供参考，请以机场官网实时信息为准。遵守法律法规，文明合规出海。',
      copyright: '© 2026 AirPick · airpick.co',
    },
  },
  vite: {
    plugins: [
      pagefindPlugin({
        customSearchQuery: chineseSearchOptimize,
        btnPlaceholder: '搜索',
        placeholder: '搜索机场推荐、客户端教程、故障排查...',
        emptyText: '未找到相关内容',
        heading: '共 {{searchResult}} 条结果',
        forceLanguage: 'zh-cn',
        excludeSelector: ['img', 'a.header-anchor'],
      }),
    ],
  },
})
