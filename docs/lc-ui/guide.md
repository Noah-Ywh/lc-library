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
