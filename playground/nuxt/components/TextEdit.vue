<script setup lang="ts">
const props = defineProps<{
  text: Ref<string>
}>()
</script>

<template>
  <Button>{{ props.text }}</Button>
</template>

<style lang="scss" scoped></style>
