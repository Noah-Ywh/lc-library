<script setup lang="ts">
import Konva from 'konva'
import { useDomSizeChange } from '@noahyu/lc-helpers'
import { Input, Slot } from '@noahyu/lc-helpers/konva'
import TextEditVue from '../components/TextEdit.vue'

const stageRef = ref<HTMLDivElement | null>(null)
/** 舞台 */
const stage = ref<Konva.Stage>()
/** 图层 */
const layer = ref<Konva.Layer>()

const test = ref('测试插槽')
const inputText = ref('测试输入')

onMounted(() => {
  if (stageRef.value) {
    stage.value = new Konva.Stage({
      container: stageRef.value,
      draggable: true,
    })
    useDomSizeChange(stageRef.value, ({ width, height }) => {
      if (stage.value) {
        stage.value.width(width)
        stage.value.height(height)
      }
    })

    layer.value = new Konva.Layer()

    stage.value?.add(layer.value)

    const input = new Input(
      {
        x: 0,
        y: 0,
        width: 200,
        height: 24,
        fill: 'red',
        fontSize: 18,
        align: 'center',
        verticalAlign: 'middle',
        fontFamily: 'Calibri',
        color: 'white',
        ellipsis: true,
        wrap: 'none',
      },
      inputText,
    )

    const slot = new Slot(
      {
        x: 50,
        y: 100,
        width: 200,
        height: 24,
        draggable: true,
        fill: 'blue',
      },
      stage.value,
    )

    slot.add(input)
    slot.mount(TextEditVue, test)

    layer.value.add(slot)
    layer.value?.draw()
  }
})
</script>

<template>
  <div class="lc-helpers">
    <div ref="stageRef" class="canvas-container"></div>
  </div>
</template>

<style lang="scss" scoped>
.lc-helpers {
  width: 100%;
  height: 300px;
  .canvas-container {
    width: 100%;
    height: 100%;
    position: relative;
  }
}
</style>
