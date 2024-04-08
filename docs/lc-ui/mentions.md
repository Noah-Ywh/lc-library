# Mentions

> 一个可以 @刘某 的文本输入组件

## 基础用法

```vue
<script setup lang="ts">
import { LMentions } from '@noahyu/lc-ui'
import type { LMentionsOptions } from '@noahyu/lc-ui'

const options = ref<LMentionsOptions>({
  values: [
    {
      label: 'noah',
      value: '1',
      link: 'https://github.com/Noah-Ywh/lc-library',
      avatar: 'https://lc.ytarc.com/docs/logo.png',
    },
    { label: '刘某', value: '2' },
  ],
})
</script>

<template>
  <LMentions :options="options" />
</template>
```

## 编程方式触发

```vue
<script setup lang="ts">
import { LMentions } from '@noahyu/lc-ui'
import type { LMentionsOptions } from '@noahyu/lc-ui'

const options = ref<LMentionsOptions>({
  values: [
    {
      label: 'noah',
      value: '1',
      link: 'https://github.com/Noah-Ywh/lc-library',
      avatar: 'https://lc.ytarc.com/docs/logo.png',
    },
    { label: '刘某', value: '2' },
  ],
})

const mentionsRef = ref<InstanceType<typeof LMentions>>()

function showMentions() {
  mentions.value?.showMentions()
}
</script>

<template>
  <LMentions ref="mentionsRef" :options="options" />
  <button @mousedown.prevent="showMentions">点击我</button>
</template>
```

> [!IMPORTANT]
> 必须使用 `mousedown` 事件并阻止事件默认行为

## Mentions API

### Props

| Prop     |        Type        | Default | Required |         Description          |
| -------- | :----------------: | :-----: | :------: | :--------------------------: |
| options  | `LMentionsOptions` |         |  `true`  |           提及列表           |
| height   |      `string`      |         | `false`  |          输入框高度          |
| debounce |      `number`      |         |   `0`    | 防抖时间，如果不提供则不防抖 |

### Emits

| Emit      |             Type              |      Description       |
| --------- | :---------------------------: | :--------------------: |
| innerHtml | `(innerHtml: string) => void` | 该事件的参数为文本内容 |

### Expose

| Expose        |             Type             |       Description        |
| ------------- | :--------------------------: | :----------------------: |
| focusMentions |         `() => void`         |     使输入框获得焦点     |
| showMentions  |         `() => void`         |     编程方式打开菜单     |
| getInnerHTML  |         `() => void`         |      获取 innerHtml      |
| setInnerHTML  | `(innerHTML:string) => void` | 在末端插入内容 innerHtml |
