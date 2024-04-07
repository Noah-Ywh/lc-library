/* global defineNuxtConfig */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'LC Library playground',
      htmlAttrs: {
        lang: 'zh-cn',
      },
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
        },
      ],
    },
  },
  // css: ['@noahyu/lc-ui/styles/index.scss'],
  modules: [],
  vite: {
    vueJsx: {
      transformOn: true,
      optimize: true,
      mergeProps: true,
      enableObjectSlots: true,
    },
  },
  experimental: {
    asyncContext: true,
  },
  devServer: {
    port: 3001,
  },
})
