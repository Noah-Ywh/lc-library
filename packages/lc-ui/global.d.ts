declare module 'vue' {
  export interface GlobalComponents {
    LHeaderMenu: (typeof import('@noahyu/lc-ui'))['LHeaderMenu']
    LMentions: (typeof import('@noahyu/lc-ui'))['LMentions']
  }
}

export {}
