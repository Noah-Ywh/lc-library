import { defineConfig } from 'vitepress'

import { navbar, sidebar } from './bars'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Low Code Library',
  description: 'lc 组件库',
  cleanUrls: true,
  themeConfig: {
    nav: navbar,
    sidebar: sidebar,
    socialLinks: [{ icon: 'github', link: 'https://github.com/Noah-Ywh/lc-library' }],
    footer: {
      message: '基于 MIT 许可发布',
      copyright: `版权所有 © 2024-${new Date().getFullYear()} Noah Yu`,
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    outline: {
      label: '页面导航',
    },
  },
})
