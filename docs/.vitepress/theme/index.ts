import DefaultTheme from 'vitepress/theme'

import Preview from '../components/Preview.vue'

import type { Theme } from 'vitepress'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册自定义全局组件
    app.component('Preview', Preview)
  },
} satisfies Theme
