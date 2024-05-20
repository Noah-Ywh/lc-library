import type { DefaultTheme } from 'vitepress'

export const navbar: DefaultTheme.NavItem[] = [
  { text: '首页', link: '/' },
  { text: '组件', link: '/lc-ui/guide', activeMatch: '/lc-ui/' },
  { text: '函数', link: '/lc-helpers/guide', activeMatch: '/lc-helpers/' },
]
export const sidebar: DefaultTheme.Sidebar = {
  '/lc-ui/': [
    {
      base: '/lc-ui/',
      text: '使用指南',
      link: 'guide',
    },
    {
      base: '/lc-ui/',
      text: '组件列表',
      items: [
        { text: 'Mentions', link: 'mentions' },
        { text: 'Header Menu', link: 'header-menu' },
      ],
    },
  ],
  '/lc-helpers/': [
    {
      base: '/lc-helpers/',
      text: '函数',
      link: 'guide',
    },
    {
      base: '/lc-helpers/',
      text: '函数列表',
      items: [
        { text: '日期相关', link: 'use-date' },
        { text: 'DOM 相关', link: 'use-dom' },
        { text: 'tryCatch', link: 'use-try-catch' },
        { text: '字符校验', link: 'use-validate' },
      ],
    },
  ],
}
