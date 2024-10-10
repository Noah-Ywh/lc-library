import Aura from '@primevue/themes/aura'

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

  css: ['../../packages/lc-ui/styles/components.scss'],
  modules: ['@primevue/nuxt-module'],
  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
  },

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

  compatibilityDate: '2024-08-15',
})
