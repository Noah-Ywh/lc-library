import { createApp } from 'vue'

import Konva from 'konva'

import type { App, Component } from 'vue'

export class Slot extends Konva.Group {
  #stage: Konva.Stage

  #container: HTMLElement | null
  #containerId: string

  #slot: HTMLElement | null = null
  #provideKey: string
  #animationFrameId: number | null = null

  #app: App<Element> | undefined

  constructor(config: Konva.GroupConfig, stage: Konva.Stage) {
    super(config)

    this.#stage = stage
    this.#provideKey = 'KonvaSlotProps'

    this.#containerId = 'lc-helpers-konva-slot'
    this.#container = document.getElementById(this.#containerId)

    if (!this.#container) {
      this.#container = document.createElement('div')
      this.#container.id = this.#containerId
      this.#container.style.position = 'absolute'
      this.#container.style.left = '0'
      this.#container.style.top = '0'

      stage.container().appendChild(this.#container)
    }

    stage.on('dragmove', this.#dragmoveStage)
    stage.on('wheel', this.#dragmoveStage)
    this.on('dragmove', this.#dragmoveSlot)

    this.mount = this.mount.bind(this)
    this.destroy = this.destroy.bind(this)
  }

  #dragmoveStage = (e: Konva.KonvaEventObject<DragEvent> | Konva.KonvaEventObject<WheelEvent>) => {
    if (e.target === e.target.getStage()) {
      if (this.#animationFrameId !== null) {
        cancelAnimationFrame(this.#animationFrameId)
      }

      this.#animationFrameId = requestAnimationFrame(() => {
        if (this.#slot) {
          const { x, y } = this.absolutePosition()
          this.#slot.style.left = `${x}px`
          this.#slot.style.top = `${y}px`
        }
        this.#animationFrameId = null
      })
    }
  }
  #dragmoveSlot = () => {
    if (this.#animationFrameId !== null) {
      cancelAnimationFrame(this.#animationFrameId)
    }

    this.#animationFrameId = requestAnimationFrame(() => {
      if (this.#slot) {
        const { x, y } = this.absolutePosition()
        this.#slot.style.left = `${x}px`
        this.#slot.style.top = `${y}px`
      }
      this.#animationFrameId = null
    })
  }

  /** 挂载组件 */
  public mount<P>(componentVue: Component, props?: P) {
    const { x, y } = this.absolutePosition()

    if (!this.#slot) {
      this.#slot = document.createElement('div')
      this.#slot.style.overflow = 'hidden'
      this.#slot.style.position = 'absolute'
      this.#slot.style.left = `${x}px`
      this.#slot.style.top = `${y}px`
      this.#slot.style.zIndex = `${this.getZIndex()}`

      this.#container?.appendChild(this.#slot)

      this.#app = createApp(componentVue)

      this.#app.provide(`${this.#provideKey}`, props)

      this.#app.mount(this.#slot)
    }
  }

  /** 移除组件 */
  public unmount() {
    this.#app?.unmount()
    if (this.#slot) {
      this.#container?.removeChild(this.#slot)
      this.#slot = null
    }
  }

  /** 移除图形和所有事件 */
  public destroy() {
    this.#stage.off('dragmove', this.#dragmoveStage)
    this.#stage.off('wheel', this.#dragmoveStage)
    this.off('dragmove', this.#dragmoveSlot)

    this.#app?.unmount()

    if (this.#slot) {
      this.#container?.removeChild(this.#slot)
      this.#slot = null
    }

    super.destroy()

    return this
  }
}
