<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="__layout">
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
#__layout {
  box-sizing: border-box;
  min-width: 100vw;
  min-height: 100vh;
  padding: 20px;
}
</style>
