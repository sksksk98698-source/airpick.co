<script setup lang="ts">
interface NavCategory {
  icon: string
  title: string
  link: string
  desc: string
  tags: string[]
}

const navCategories: NavCategory[] = [
  {
    icon: '✈️',
    title: '机场推荐',
    link: '/airport/',
    desc: '2026 年度综合排行榜、超稳定专线梯子、高性价比与低至 10 元平价套餐精选。',
    tags: ['综合排行', '稳定专线', '便宜月付', '按量计费']
  },
  {
    icon: '📱',
    title: '客户端与设备',
    link: '/client/',
    desc: '全平台代理工具装机指引，涵盖 Clash、小火箭、v2rayN、sing-box 与软路由/TV。',
    tags: ['Clash Verge', '小火箭 iOS', 'Windows', '软路由/TV']
  },
  {
    icon: '🤖',
    title: '场景应用',
    link: '/scenario/',
    desc: 'ChatGPT / Claude 原生解锁、Netflix 4K 追剧、TikTok 跨境电商与外服电竞联机。',
    tags: ['ChatGPT/AI', 'Netflix 4K', 'TikTok 出海', '游戏加速']
  },
  {
    icon: '⚡',
    title: '技术线路',
    link: '/tech/',
    desc: 'IEPL / IPLC 物理内网专线、BGP 跨境多线中转、电信 CN2 GIA 与真实原生住宅 IP。',
    tags: ['IEPL 专线', 'BGP 中转', '原生 IP', '港/日/新/美']
  },
  {
    icon: '📖',
    title: '教程知识',
    link: '/tutorial/',
    desc: '零基础入门概念科普、购买注册安全守则、订阅分发导入与抗封锁协议深度对比。',
    tags: ['什么是机场', '机场 vs VPN', '协议对比', 'DNS 防污染']
  },
  {
    icon: '🛡️',
    title: '避坑与故障',
    link: '/help/',
    desc: '机场跑路前兆预警、山寨假官网打假鉴别、节点全部超时与晚高峰卡顿十步排查。',
    tags: ['跑路预警', '官网辨真', '节点全红', '晚高峰排查']
  }
]
</script>

<template>
  <div class="nav-grid-wrapper">
    <div class="section-header">
      <h2 class="section-title">六大核心导航枢纽</h2>
      <p class="section-subtitle">一站式覆盖从节点挑选、客户端配置、高难度解锁到疑难排障的完整闭环</p>
    </div>

    <div class="nav-grid">
      <a 
        v-for="item in navCategories" 
        :key="item.title" 
        :href="item.link" 
        class="nav-card"
      >
        <div class="nav-card-header">
          <span class="nav-card-icon">{{ item.icon }}</span>
          <h3 class="nav-card-title">{{ item.title }}</h3>
        </div>
        <p class="nav-card-desc">{{ item.desc }}</p>
        <div class="nav-card-tags">
          <span v-for="tag in item.tags" :key="tag" class="nav-tag">{{ tag }}</span>
        </div>
        <div class="nav-card-footer">
          <span class="view-link">进入专题 →</span>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.nav-grid-wrapper {
  margin: 3.5rem 0 2rem;
  padding: 0 1rem;
}

.section-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.section-subtitle {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
}

.nav-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: 1152px;
  margin: 0 auto;
}

.nav-card {
  display: flex;
  flex-direction: column;
  background-color: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.nav-card:hover {
  transform: translateY(-3px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 8px 24px rgba(20, 184, 166, 0.14);
}

.nav-card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.nav-card-icon {
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--vp-c-bg);
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
}

.nav-card-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0;
}

.nav-card-desc {
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin: 0 0 1rem 0;
  flex-grow: 1;
}

.nav-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 1rem;
}

.nav-tag {
  font-size: 0.75rem;
  padding: 2px 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  color: var(--vp-c-text-2);
}

.nav-card-footer {
  display: flex;
  justify-content: flex-end;
  border-top: 1px dashed var(--vp-c-divider);
  padding-top: 0.75rem;
}

.view-link {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  transition: color 0.2s;
}

.nav-card:hover .view-link {
  color: var(--vp-c-brand-2);
}
</style>
