# Slot 插槽

```ts
import { Slot } from '@noahyu/lc-helpers'
```

::: warning 环境
不支持 SSR，如果你使用 Nuxt，请使用 `<ClientOnly></ClientOnly>` 包括组件或使用 `*.client.vue` 文件
:::

::: tip 注意
`Stage` 容器节点需要设置 CSS 属性： `position`，否则插槽定位将出现异常
:::

## 创建插槽对象

通过插槽对象的 `mount` 方法提供一个组件

```ts{30}
import MyComponent from '@components/my-component.vue'

const stage = new Konva.Stage({
  container: '#container',
})

const rect = new Konva.Rect({
  x: 20,
  y: 20,
  width: 100,
  height: 50,
  fill: 'green',
  stroke: 'black',
  strokeWidth: 4,
})

const slot = new Slot(
  {
    x: 50,
    y: 100,
    width: 200,
    height: 24,
    draggable: true,
    fill: 'blue',
  },
  stage,
)

slot.add(rect)
slot.mount(MyComponent)
```

## 依赖注入

提供一个 ref 对象，通过插槽对象的 `mount` 方法提供一个组件以及数据，组件中通过 `inject('KonvaSlotProps')` 获取对象

```ts{3,32}
import MyComponent from '@components/my-component.vue'

const props = ref('向组件提供数据')

const stage = new Konva.Stage({
  container: '#container',
})

const rect = new Konva.Rect({
  x: 20,
  y: 20,
  width: 100,
  height: 50,
  fill: 'green',
  stroke: 'black',
  strokeWidth: 4,
})

const slot = new Slot(
  {
    x: 50,
    y: 100,
    width: 200,
    height: 24,
    draggable: true,
    fill: 'blue',
  },
  stage,
)

slot.add(rect)
slot.mount(MyComponent, props)
```

子组件

```vue{2}
<script setup lang="ts">
const text = inject('KonvaSlotProps')
</script>

<template>
  <div>{{ text }}</div>
</template>

<style lang="scss" scoped></style>
```

## 类型声明

```ts
export declare class Slot extends Konva.Group {
  constructor(config: Konva.GroupConfig, stage: Konva.Stage)
}
```
