module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2024: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  extends: [
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    camelcase: 'error',
    'no-template-curly-in-string': 'warn',
    'accessor-pairs': 'warn',
    'consistent-return': 'warn',
    curly: 'error',
    'default-case': 'error',
    'dot-location': ['error', 'property'],
    eqeqeq: 'error',
    'no-alert': 'warn',
    'no-else-return': 'warn',
    'no-empty-function': 'warn',
    'no-empty-pattern': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
  overrides: [
    {
      files: ['packages/*/components/**/*.vue', 'packages/*/components/**/*.tsx', 'docs/**/*.vue'],
      extends: ['@noahyu/vue'],
    },
    {
      files: ['docs/**/*.vue'],
      rules: {
        'no-alert': 0,
      },
    },
    {
      files: ['playground/**/*.vue', 'playground/**/*.ts'],
      extends: ['@noahyu/vue'],
    },
  ],
}
