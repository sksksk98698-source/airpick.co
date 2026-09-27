import DefaultTheme from 'vitepress/theme'
import './styles/brand.css'
import CopyCoupon from './components/CopyCoupon.vue'
import NavCardGrid from './components/NavCardGrid.vue'
import type { App } from 'vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component('CopyCoupon', CopyCoupon)
    app.component('NavCardGrid', NavCardGrid)
  }
}
