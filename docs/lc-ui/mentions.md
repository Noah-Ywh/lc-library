<script setup>
import { ref } from 'vue'
import { LMentions } from '@noahyu/lc-ui/client'

const values = [
  {
    label: 'noah',
    value: '1',
    link: 'https://github.com/Noah-Ywh/lc-library',
    avatar: 'https://lc.ytarc.com/logo.jpg',
  },
  { label: '刘某', value: '2' },
]
const mentionsRef = ref(null)

function showMentions() {
  mentionsRef.value?.showMentions()
}
</script>

# Mentions

> 一个可以 @刘某 的编辑器

## 基础用法

```vue
<script setup lang="ts">
import { LMentions } from '@noahyu/lc-ui/client'
import type { LMentionsValues } from '@noahyu/lc-ui/client'

const values: LMentionsOptions[] = [
  {
    label: 'noah',
    value: '1',
    link: 'https://github.com/Noah-Ywh/lc-library',
    avatar: 'https://lc.ytarc.com/logo.jpg',
  },
  { label: '刘某', value: '2' },
]
</script>

<template>
  <LMentions :values="values" />
</template>
```

<Preview>
 <LMentions :values="values" />
</Preview>

## 编程方式触发

```vue
<script setup lang="ts">
import { LMentions } from '@noahyu/lc-ui'
import type { LMentionsValues } from '@noahyu/lc-ui'

const values: LMentionsValues[] = [
  {
    label: 'noah',
    value: '1',
    link: 'https://github.com/Noah-Ywh/lc-library',
    avatar: 'https://lc.ytarc.com/logo.jpg',
  },
  { label: '刘某', value: '2' },
]

const mentionsRef = ref<InstanceType<typeof LMentions>>()

function showMentions() {
  mentionsRef.value?.showMentions()
}
</script>

<template>
  <LMentions ref="mentionsRef" :values="values" />
  <button @mousedown.prevent="showMentions">点击我</button>
</template>
```

> [!IMPORTANT]
> 必须使用 `mousedown` 事件并阻止事件默认行为

<Preview>
  <LMentions ref="mentionsRef" :values="values" />
  <button @mousedown.prevent="showMentions">点击我</button>
</Preview>

## Mentions API

### Props

| Prop     |        Type         | Default | Required |         Description          |
| -------- | :-----------------: | :-----: | :------: | :--------------------------: |
| values   | `LMentionsValues[]` |         |  `true`  |           提及列表           |
| lookup   | `'value'\|'label'`  | `value` | `false`  |      在对象中搜索的 key      |
| fillAttr | `'value'\|'label'`  | `label` | `false`  |       插入到内容的 key       |
| height   |      `string`       |         | `false`  |          编辑器高度          |
| debounce |      `number`       |   `0`   | `false`  | 防抖时间，如果不提供则不防抖 |
| pasteImg |      `boolean`      | `true`  | `false`  |  允许粘贴为base64格式的图片  |

### Emits

| Emit      |             Type              |      Description       |
| --------- | :---------------------------: | :--------------------: |
| innerHtml | `(innerHtml: string) => void` | 该事件的参数为文本内容 |

### Expose

| Expose         |             Type             |       Description        |
| -------------- | :--------------------------: | :----------------------: |
| focusMentions  |         `() => void`         |     使编辑器获得焦点     |
| showMentions   |         `() => void`         |     编程方式打开菜单     |
| getInnerHTML   |         `() => void`         |      获取 innerHtml      |
| setInnerHTML   | `(innerHTML:string) => void` | 在末端插入内容 innerHtml |
| clearInnerHTML |         `() => void`         |        清空编辑器        |
