<script setup lang="ts">
import { ref } from 'vue'

import { LHeaderMenu } from '../../../../packages/lc-ui'

const navLockerRefs = ref<HTMLElement[] | null>(null)
const navs = [
  { value: '首页', linkTo: '/' },
  { value: '组件', linkTo: '/headerMenu' },
  { value: '函数', linkTo: '' },
]
const lockers = ['首页', '组件']
</script>

<template>
  <LHeaderMenu :navs="navs" :menu-locker-refs="navLockerRefs">
    <template #header-left>
      <div>left</div>
    </template>
    <template #header-menu-locker>
      <div v-for="item in lockers" :key="item" ref="navLockerRefs" class="lc-locker">
        <p>{{ item }}</p>
      </div>
    </template>
    <template #header-right>
      <div>right</div>
    </template>
  </LHeaderMenu>
</template>

<style lang="scss" scoped>
//
</style>
