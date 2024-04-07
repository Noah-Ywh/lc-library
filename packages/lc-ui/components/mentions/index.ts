import type { App, Plugin } from 'vue'
import Mentions from './src/mentions.vue'

import './style/css'

export type { LMentionsOptions } from './src/mentions'

export const MentionsPlugin: Plugin = {
  install(app: App) {
    app.component('LMentions', Mentions)
  },
}

export const LMentions = Mentions
