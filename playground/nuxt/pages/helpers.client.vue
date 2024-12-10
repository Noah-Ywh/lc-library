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

    const groupBox = new Konva.Group({
      x: 400,
      y: 25,
      width: 400,
    })
    const rect = new Konva.Rect({
      x: 0,
      y: 0,
      width: 400,
      height: 60,
      stroke: 'red',
      strokeWidth: 1,
    })

    const label = new Konva.Text({
      x: 0,
      y: 0,
      text: 'Hello：',
      fontSize: 14,
      fontFamily: 'Calibri',
      fill: 'green',
      padding: 5,
    })

    const width = Math.ceil(label.measureSize('输入框').width) + 10
    const input = new Input({
      name: 'input',
      x: Math.ceil(label.width()),
      y: 0,
      width: width,
      text: '输入框',
      fill: 'red',
      fontSize: 14,
      // lineHeight: 1.4,
      align: 'left',
      verticalAlign: 'middle',
      fontFamily: 'Calibri',
      ellipsis: true,
      wrap: 'none',
      // styleType: 'outlined',
      backgroundColor: 'yellow',
      borderColor: 'black',
      padding: 5,
      focus() {
        group.to({
          x: 0,
          duration: 0.2,
        })
        Object.assign(input.editEl.style, {
          width: `${400 - Math.ceil(label.width())}px`,
          left: `${Math.ceil(input.absolutePosition().x - group.x())}px`,
          transition: 'width 0.2s, left 0.2s',
        })
      },
      input(text) {
        props.value.text = text
      },
      blur(text) {
        input.width(Math.ceil(Math.min(input.measureSize(text).width + 10, 400 - label.width())))
        group.to({
          x: Math.ceil(groupBox.width() / 2 - (label.width() + input.width()) / 2),
          duration: 0.2,
          onFinish: () => {
            console.log('Animation finished')
            // 在动画结束时执行的代码
          },
          onUpdate: () => {
            console.log('Animation updated')
            // 在动画更新时执行的代码
          },
        })
        props.value.text = text
      },
    })

    const group = new Konva.Group({
      x: Math.ceil(groupBox.width() / 2 - (label.width() + input.width()) / 2),
      y: 0,
    })

    group.add(label, input)
    groupBox.add(rect, group)

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

    layer.add(slot, groupBox)

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
