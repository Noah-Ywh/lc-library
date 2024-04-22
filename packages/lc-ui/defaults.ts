import type { App, Plugin } from 'vue'

import { HeaderMenuPlugin } from './components/header-menu'
import { MentionsPlugin } from './components/mentions'

const components = [HeaderMenuPlugin, MentionsPlugin]

const lcUi: Plugin = {
  install(app: App) {
    components.forEach((c) => app.use(c))
  },
}

export default lcUi
