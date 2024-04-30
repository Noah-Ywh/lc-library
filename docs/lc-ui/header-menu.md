<script setup lang="ts">
import { ref } from 'vue'
import { LHeaderMenu } from '@noahyu/lc-ui'

const navLockerRefs = ref<HTMLElement[] | null>(null)
const navs = [
  { value: '首页', linkTo: '/' },
  { value: '组件', linkTo: '/lc-ui/guide' },
  { value: '函数', linkTo: '' },
]
const lockers = ['首页', '组件']
</script>

# Header Menu

> 头部菜单

## 基础用法

```vue
<script setup lang="ts">
import { LHeaderMenu } from '@noahyu/lc-ui'

const navLockerRefs = ref<HTMLElement[] | null>(null)
const navs = [
  { value: '首页', linkTo: '/' },
  { value: '组件', linkTo: '/lc-ui/guide' },
  { value: '函数', linkTo: '' },
]
const lockers = ['首页', '组件']
</script>

<template>
  <LHeaderMenu :navs="navs" :menu-locker-refs="navLockerRefs">
    <template #header-left>
      <div>
        <img src="https://lc.ytarc.com/logo.jpg" />
      </div>
    </template>
    <template #header-menu-locker>
      <div v-for="item in lockers" :key="item" ref="navLockerRefs" class="lc-locker">
        <p>{{ item }}</p>
      </div>
    </template>
    <template #header-right>
      <div>
        <img src="https://lc.ytarc.com/logo.jpg" />
      </div>
    </template>
  </LHeaderMenu>
</template>
```

<Preview>
  <div :class="$style.headerMenu">
    <LHeaderMenu :navs="navs" :menu-locker-refs="navLockerRefs">
      <template #header-left>
        <div :class="$style.headerMenuLogo">
          <img src="https://lc.ytarc.com/logo.jpg">
        </div>
      </template>
      <template #header-menu-locker>
        <div v-for="item in lockers" :key="item" ref="navLockerRefs" class="lc-locker">
          <p>{{ item }}</p>
        </div>
      </template>
      <template #header-right>
        <div :class="$style.headerMenuLogo">
          <img src="https://lc.ytarc.com/logo.jpg">
        </div>
      </template>
    </LHeaderMenu>
  </div>
</Preview>

<style lang="scss" module>
  .headerMenu {
    height: 200px;
  }
  .headerMenuLogo{
    img {
      height: 58px;
    }
  }
</style>

## Header Menu API

### Props

| Prop           |                  Type                   | Default | Required | Description  |
| -------------- | :-------------------------------------: | :-----: | :------: | :----------: |
| navs           | `Array<{value: string;linkTo: string}>` |    -    |  `true`  |   菜单列表   |
| menuLockerRefs |          `Array<HTMLElement>`           |         | `false`  | 下拉元素集合 |

### Emits

| Emit | Type | Description |
| ---- | :--: | :---------: |
|      |      |             |

### Expose

| Expose | Type | Description |
| ------ | :--: | :---------: |
|        |      |             |
