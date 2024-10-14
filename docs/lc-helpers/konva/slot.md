# Slot 插槽

```ts
import { Slot } from '@noahyu/lc-helpers/konva'
```

::: warning 环境
不支持 SSR，如果你使用 Nuxt，请使用 `<ClientOnly></ClientOnly>` 包括组件或使用 `*.client.vue` 文件
:::

::: tip 注意
`Stage` 容器节点需要设置 CSS 属性： `position`，否则插槽定位将出现异常
:::

## 创建插槽对象

通过插槽对象的 `mount` 方法挂载一个 Vue 组件

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

移除 Vue 组件

```ts
slot.unmount()
```

::: warning 注意
如果是 `Slot` 容器内嵌套 `Slot`，子 `Slot` 必须添加到父 `Slot` 后再挂载组件
:::

## 响应式对象

`mount` 第二个参数可传递一个响应式对象，并为源对象上可以枚举的属性创建 ref

```ts{3-5,34}
import MyComponent from '@components/my-component.vue'

const props = ref({
  text: '插槽内容',
})

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
slot.mount(TextEditVue, props.value)
```

子组件

```vue{2-4}
<script setup lang="ts">
const props = defineProps<{
  text: Ref<string>
}>()
</script>

<template>
  <p>{{ props.text }}</p>
</template>

<style lang="scss" scoped></style>
```

## Vue 全局上下文

某些情况下，你可能需要手动传递 Vue 全局上下文（如子组件无法正常使用provide/inject、全局组件等）

你可以从 Vue 应用中获取 `appContext` 并传递给 `mount` 的第三个参数

::: tip 注意
当你需要传递全局上下文时，如果没有需要传递的响应式对象，请提供 `null` 作为 `mount` 的第二个参数
:::

```ts{1,5,38}
import { getCurrentInstance } from 'vue'
import MyComponent from '@components/my-component.vue'

// 获取 Vue 实例的 appContext
const appContext = getCurrentInstance().appContext

const props = ref({
  text: '插槽内容',
})

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
slot.mount(TextEditVue, props.value, appContext)
```

## 更新组件

某些情况下你可能需要手动更新，比如你手动修改图形坐标，组件位置并不会随之改变，是因为手动修改坐标不会触发 `dragmove` 事件，这时候你就可以调用 `update` 方法更新组件坐标

```ts
slot.update()
```

## 类型声明

```ts
export declare class Slot extends Konva.Group {
  constructor(config: Konva.GroupConfig, stage: Konva.Stage)
}
```
