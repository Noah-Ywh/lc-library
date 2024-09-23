<script setup lang="ts">
import { LMentions } from '../../../packages/lc-ui/client'

import type { LMentionsValues } from '../../../packages/lc-ui/client'

const values = ref<LMentionsValues[]>([
  {
    label: 'noah',
    value: '1',
    link: 'https://github.com/Noah-Ywh/lc-library',
    avatar: 'https://lc.ytarc.com/logo.jpg',
  },
  { label: '刘某', value: '2' },
])

const mentionsRef = ref<InstanceType<typeof LMentions>>()
function showMentions() {
  mentionsRef.value?.showMentions()
}
</script>

<template>
  <div class="lc-ui__preview">
    <LMentions ref="mentionsRef" :values="values" lookup="label" :paste-img="false" />
    <button @mousedown.prevent="showMentions">点击我</button>
  </div>
</template>

<style lang="scss" scoped>
.lc-ui__preview {
  padding: 80px 0;
}
</style>
