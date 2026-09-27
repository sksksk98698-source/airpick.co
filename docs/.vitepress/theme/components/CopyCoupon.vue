<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  code: string
  discount?: string
  tip?: string
  url?: string
  brandName?: string
}>()

const copied = ref(false)

const handleCopy = async () => {
  if (!props.code) return
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(props.code)
    } else {
      const textarea = document.createElement('textarea')
      textarea.value = props.code
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}
</script>

<template>
  <div class="coupon-wrapper">
    <div class="coupon-container" @click="handleCopy" :title="tip || '点击一键复制优惠码'">
      <div class="coupon-inner">
        <span v-if="discount" class="coupon-badge">{{ discount }}</span>
        <span class="coupon-code">{{ code }}</span>
        <span class="coupon-status" :class="{ 'copied': copied }">
          {{ copied ? '已复制 ✓' : '复制 📋' }}
        </span>
      </div>
    </div>
    <a v-if="url" :href="url" target="_blank" rel="noopener noreferrer nofollow" class="coupon-cta-btn">
      {{ brandName ? `直达${brandName}官网` : '直达官网' }} ↗
    </a>
  </div>
</template>

<style scoped>
.coupon-wrapper {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin: 6px 0;
  vertical-align: middle;
}

.coupon-container {
  display: inline-block;
  cursor: pointer;
}

.coupon-inner {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--vp-c-bg-alt);
  border: 1.5px dashed var(--vp-c-brand-1);
  border-radius: 8px;
  padding: 5px 12px;
  transition: all 0.2s ease;
  user-select: none;
}

.coupon-inner:hover {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-2);
  transform: translateY(-1px);
}

.coupon-badge {
  background: var(--vp-c-brand-1);
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 4px;
}

.coupon-code {
  font-family: var(--vp-font-family-mono);
  font-weight: 700;
  color: var(--vp-c-brand-2);
  letter-spacing: 0.05em;
  font-size: 0.95rem;
}

.coupon-status {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  padding: 2px 6px;
  border-radius: 4px;
  transition: all 0.2s;
}

.coupon-status.copied {
  background: #10b981;
  color: #ffffff;
  font-weight: 600;
}

.coupon-cta-btn {
  display: inline-flex;
  align-items: center;
  background: var(--vp-c-brand-1);
  color: #ffffff !important;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 5px 14px;
  border-radius: 8px;
  text-decoration: none !important;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(20, 184, 166, 0.25);
}

.coupon-cta-btn:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(20, 184, 166, 0.35);
}
</style>
