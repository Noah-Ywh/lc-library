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

LC UI 其实带有少量的 Normalize 样式，但是考虑到合适的才是最好的，为了减少冲突，还是通过主动添加 class 来使用

如果没有使用自己的 Normalize 样式，而是统一采用 LC UI 的样式，请在 `html` 和 `body` 标签分别添加 `lc-html` `lc-body` 类

```scss
.lc-html {
  font: normal normal var(--lc-font-weight) var(--lc-font-size) / var(--lc-line-height) var(--lc-font-sans-serif);
}

.lc-body {
  color: var(--lc-text);
  margin: 0;
  padding: 0;
  position: relative;
}

.lc-ol,
.lc-ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.lc-button,
.lc-input[type='submit'],
.lc-input[type='button'] {
  cursor: pointer;
}

.lc-input::-moz-focus-inner {
  padding: 0;
  border: 0;
}

.lc-input[type='number']::-webkit-inner-spin-button,
.lc-input[type='number']::-webkit-outer-spin-button {
  margin: 0;
}

.lc-input::-webkit-input-placeholder,
.lc-textarea::-webkit-input-placeholder {
  color: var(--lc-text-200);
}
.lc-input:-moz-placeholder,
.lc-textarea:-moz-placeholder {
  color: var(--lc-text-200);
}
.lc-input::-moz-placeholder,
.lc-textarea::-moz-placeholder {
  color: var(--lc-text-200);
}
.lc-input:-ms-input-placeholder,
.lc-textarea:-ms-input-placeholder {
  color: var(--lc-text-200);
}

.lc-h1 {
  font-size: 38px;
  line-height: 44px;
  color: var(--lc-text);
  margin: 0;
}
.lc-h2 {
  font-size: 30px;
  line-height: 42px;
  color: var(--lc-text);
  margin: 0;
}
.lc-h3 {
  font-size: 24px;
  line-height: 28px;
  color: var(--lc-text);
  margin: 0;
}
.lc-h4 {
  font-size: 20px;
  line-height: 28px;
  color: var(--lc-text);
  margin: 0;
}
.lc-h5 {
  font-size: 18px;
  line-height: 24px;
  color: var(--lc-text);
  margin: 0;
}
.lc-h6 {
  font-size: 14px;
  line-height: 22px;
  color: var(--lc-text);
  margin: 0;
}
.lc-p {
  font-size: 14px;
  line-height: 20px;
  color: var(--lc-text-100);
  margin: 0;
}
.lc-a {
  text-decoration: none;
}
```

## Volar 支持

在 tsconfig.json 中通过 `compilerOptions.type` 指定全局组件类型即可得到 Volar 支持。

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["@noahyu/lc-ui/global"]
  }
}
```
