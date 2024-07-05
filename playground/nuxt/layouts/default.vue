<script setup lang="ts"></script>

<template>
  <div id="__layout">
    <slot></slot>
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
