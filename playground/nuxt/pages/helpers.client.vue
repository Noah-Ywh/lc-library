<script setup lang="ts">
import Konva from 'konva'
import { useDomSizeChange } from '@noahyu/lc-helpers'
import { Input, Slot } from '@noahyu/lc-helpers/konva'
import TextEditVue from '../components/TextEdit.vue'

const stageRef = ref<HTMLDivElement | null>(null)
/** 舞台 */
const stage = new Konva.Stage({ container: document.createElement('div'), draggable: true })
/** 图层 */
const layer = new Konva.Layer()

const props = ref({
  text: '插槽内容',
})

const stageScale = ref(1)

/** 键盘按下处理函数 */
function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Backspace' || event.key === 'Delete') {
    console.log('删除')
  }
}

onMounted(() => {
  if (stageRef.value) {
    stageRef.value?.addEventListener('keydown', handleKeydown)
    stageRef.value.innerHTML = ''
    stage.container(stageRef.value)
    useDomSizeChange(stageRef.value, ({ width, height }) => {
      stage.width(width)
      stage.height(height)
    })

    stage.add(layer)

    const input = new Input({
      name: 'input',
      x: 0,
      y: 25,
      width: 200,
      text: '输入框',
      fill: 'red',
      fontSize: 14,
      // lineHeight: 1.4,
      align: 'left',
      verticalAlign: 'middle',
      fontFamily: 'Calibri',
      ellipsis: true,
      wrap: 'none',
      backgroundColor: 'yellow',
      borderColor: 'black',
      input(text) {
        // const { width } = input.measureSize(text)
        // input.width(width)

        props.value.text = text
      },
      blur(text) {
        // const { width } = input.measureSize(text)
        // input.width(width)

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
      stage,
    )

    slot.mount(TextEditVue, props.value)

    layer.add(slot, input)

    layer.draw()

    // 鼠标滚动事件
    stage.on('wheel', ({ evt }) => {
      if (evt.ctrlKey || evt.metaKey) {
        /** 画布缩放 */
        evt.preventDefault()
        const scaleBy = 1.1
        const oldScale = stage.scaleX()
        const pointer = stage.getPointerPosition()

        if (pointer) {
          const mousePointTo = {
            x: (pointer.x - stage.x()) / oldScale,
            y: (pointer.y - stage.y()) / oldScale,
          }

          stageScale.value = evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy
          stageScale.value = Math.max(0.4, Math.min(stageScale.value, 4))

          stage.scale({ x: stageScale.value, y: stageScale.value })

          const newPos = {
            x: pointer.x - mousePointTo.x * stageScale.value,
            y: pointer.y - mousePointTo.y * stageScale.value,
          }

          stage.position(newPos)
          stage.fire('dragmove')

          // const input = layer.findOne('.input')
          input?.fire('changeScale')

          stage.batchDraw()
        }
      } else {
        // 画布滚动

        /** 滚动系数 */
        const scrollFactor = 1.1
        /** 滚动前舞台坐标 */
        const oldPos = stage.position()
        /** 滚动后舞台坐标 */
        const newPos = oldPos

        if (evt.altKey) {
          newPos.x = oldPos.x - evt.deltaY * scrollFactor
        } else {
          newPos.x = oldPos.x - evt.deltaX * scrollFactor
          newPos.y = oldPos.y - evt.deltaY * scrollFactor
        }

        stage.position(newPos)

        stage.batchDraw()
      }
    })
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
  height: 500px;
  border: 1px solid #000;
  .canvas-container {
    width: 100%;
    height: 100%;
    position: relative;
  }
}
</style>
