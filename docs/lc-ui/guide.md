# 使用指南

## 环境支持

| ![Edge](https://cdn.jsdelivr.net/npm/@browser-logos/edge@2.0.5/edge_32x32.png) | ![Firefox](https://cdn.jsdelivr.net/npm/@browser-logos/firefox@3.0.9/firefox_32x32.png) | ![Chrome](https://cdn.jsdelivr.net/npm/@browser-logos/chrome@2.0.0/chrome_32x32.png) | ![Safari](https://cdn.jsdelivr.net/npm/@browser-logos/safari@2.1.0/safari_32x32.png) |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| Edge ≥ 79                                                                      | Firefox ≥ 78                                                                            | Chrome ≥ 64                                                                          | Safari ≥ 12                                                                          |

## 安装

::: code-group

```bash [pnpm]
pnpm add @noahyu/lc-ui@next -P
```

```bash [npm]
npm install @noahyu/lc-ui@next --save
```

:::

## 手动导入 <Badge type="tip" text="推荐" vertical="middle" />

组件引用更清晰

```vue
<script setup lang="ts">
import { LMentions } from '@noahyu/lc-ui'
</script>

<template>
  <LMentions />
</template>
```

## 完整导入

厉害了，一次性导入所有组件

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'

import lcui from '@noahyu/lc-ui'

const app = createApp(App)

app.use(lcui)
app.mount('#app')
```

```vue
<script setup lang="ts"></script>

<template>
  <LMentions />
</template>
```

## 样式处理

LC UI 其实带有少量的 Normalize 样式，但是考虑到合适的才是最好的，为了减少冲突，不会默认导入内置的 Normalize 样式

如果要使用 LC UI 自带的 Normalize 样式，可以导入 `@noahyu/lc-ui/dist/styles/lc-normalize.css`

```css
html {
  font: normal normal var(--lc-font-weight) var(--lc-font-size) / var(--lc-line-height) var(--lc-font-sans-serif);
}
body {
  color: var(--lc-text);
  margin: 0;
  padding: 0;
  position: relative;
}
ol,
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
button,
input[type='button'],
input[type='submit'] {
  cursor: pointer;
}
input::-moz-focus-inner {
  padding: 0;
  border: 0;
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  margin: 0;
}
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: var(--lc-text-200);
}
input:-moz-placeholder,
textarea:-moz-placeholder {
  color: var(--lc-text-200);
}
input::-moz-placeholder,
textarea::-moz-placeholder {
  color: var(--lc-text-200);
}
input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  color: var(--lc-text-200);
}
h1 {
  font-size: 38px;
  line-height: 44px;
  color: var(--lc-text);
  margin: 0;
}
h2 {
  font-size: 30px;
  line-height: 42px;
  color: var(--lc-text);
  margin: 0;
}
h3 {
  font-size: 24px;
  line-height: 28px;
  color: var(--lc-text);
  margin: 0;
}
h4 {
  font-size: 20px;
  line-height: 28px;
  color: var(--lc-text);
  margin: 0;
}
h5 {
  font-size: 18px;
  line-height: 24px;
  color: var(--lc-text);
  margin: 0;
}
h6 {
  font-size: 14px;
  line-height: 22px;
  color: var(--lc-text);
  margin: 0;
}
p {
  font-size: 14px;
  line-height: 20px;
  color: var(--lc-text-100);
  margin: 0;
}
a {
  text-decoration: none;
}
```
