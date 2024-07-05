<script setup lang="ts">
import { ref } from 'vue'

import { LMentions } from '../../../../packages/lc-ui'

import type { LMentionsOptions } from '../../../../packages/lc-ui'

const options = ref<LMentionsOptions>({
  values: [
    {
      label: 'noah',
      value: '1',
      link: 'https://github.com/Noah-Ywh/lc-library',
      avatar: 'https://lc.ytarc.com/logo.jpg',
    },
    { label: '刘某', value: '2' },
  ],
})

const mentionsRef = ref<InstanceType<typeof LMentions>>()
function showMentions() {
  mentionsRef.value?.showMentions()
}
</script>

<template>
  <div class="lc-ui__preview">
    <LMentions ref="mentionsRef" :options="options" />
    <button @mousedown.prevent="showMentions">点击我</button>
  </div>
</template>

<style lang="scss" scoped>
.lc-ui__preview {
  padding: 80px 0;
}
</style>
