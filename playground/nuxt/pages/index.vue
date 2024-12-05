<script setup lang="ts">
const components = [
  {
    name: '头部菜单',
    link: 'headerMenu',
  },
  {
    name: '提及列表',
    link: 'mentions',
  },
  {
    name: 'Konva',
    link: 'helpers',
  },
]
</script>

<template>
  <div class="lc-home">
    <ul class="lc-ul lc-components">
      <li v-for="item in components" :key="item.name" class="lc-li lc-component-item">
        <NuxtLink :to="item.link" class="lc-a">{{ item.name }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
a {
  color: var(--lc-text);
}
</style>
