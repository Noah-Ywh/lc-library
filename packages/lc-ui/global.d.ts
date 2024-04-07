declare module 'vue' {
  export interface GlobalComponents {
    LMentions: (typeof import('@noahyu/lc-ui'))['LMentions']
  }
}

export {}
