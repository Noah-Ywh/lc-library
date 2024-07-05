// eslint.config.js
import noahyuConfig from '@noahyu/eslint-config-vue'

export default [
  /** 全局忽略 */
  {
    ignores: ['**/*/.nuxt/', '**/*/dist', '**/.*/'],
  },

  ...noahyuConfig,

  {
    files: ['**/*.spec.tsx', '**/*.spec.jsx'],
    rules: {
      'vue/one-component-per-file': 'off',
    },
  },

  {
    rules: {
      quotes: ['error', 'single', { avoidEscape: true }],
    },
  },
]
