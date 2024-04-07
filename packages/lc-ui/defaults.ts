import type { App, Plugin } from 'vue'

import { MentionsPlugin } from './components/mentions'

const components = [MentionsPlugin]

const lcUi: Plugin = {
  install(app: App) {
    components.forEach((c) => app.use(c))
  },
}

export default lcUi
