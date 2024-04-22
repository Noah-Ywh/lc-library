import type { App, Plugin } from 'vue'
import HeaderMenu from './src/header-menu.vue'

import './style/css'

export const HeaderMenuPlugin: Plugin = {
  install(app: App) {
    app.component('LHeaderMenu', HeaderMenu)
  },
}

export const LHeaderMenu = HeaderMenu
