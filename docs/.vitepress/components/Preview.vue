<script setup lang="ts"></script>

<template>
  <div :class="$style['lc-docs__preview']">
    <slot></slot>
  </div>
</template>

<style lang="scss" module>
.lc-docs__preview {
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  background-color: var(--lc-gray-500);
  border-radius: 4px;
  font: normal normal var(--lc-font-weight) var(--lc-font-size) / var(--lc-line-height)
    var(--lc-font-sans-serif);
  ul {
    list-style: none !important;
  }
  li {
    margin: 0 !important;
  }
}
</style>
