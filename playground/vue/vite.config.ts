import { defineConfig, PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    vueJsx({
      transformOn: true,
      optimize: true,
      mergeProps: true,
      enableObjectSlots: true,
    }),
    visualizer() as PluginOption,
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@assets': '/src/assets',
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3001,
  },
})
