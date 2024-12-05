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

const props = ref({
  text: '插槽内容',
})

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

    const input = new Input({
      x: 0,
      y: 25,
      width: 200,
      text: '输入框',
      fill: 'red',
      fontSize: 14,
      lineHeight: 1.4,
      align: 'left',
      verticalAlign: 'middle',
      fontFamily: 'Calibri',
      ellipsis: true,
      wrap: 'none',
      backgroundColor: 'yellow',
      borderColor: 'black',
      blur(text) {
        const { width } = input.measureSize(text)
        input.width(width)

        props.value.text = text
      },
    })

    const slot = new Slot(
      {
        x: 0,
        y: 100,
        width: 200,
        height: 24,
        draggable: true,
        fill: 'blue',
      },
      stage.value,
    )

    slot.mount(TextEditVue, props.value)

    layer.value.add(slot, input)
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
