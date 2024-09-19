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
    this.#provideKey = 'KonvaSlotProvide'

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

    stage.on('dragmove', this.#dragmove)
    stage.on('wheel', this.#dragmove)
    this.on('dragmove', this.#dragmove)

    this.mount = this.mount.bind(this)
    this.destroy = this.destroy.bind(this)
  }

  #dragmove = () => {
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
  public mount<P>(componentVue: Component, args?: P) {
    const { x, y } = this.absolutePosition()

    const props = {
      top: y,
      left: x,
    }

    if (!this.#slot) {
      this.#slot = document.createElement('div')
      this.#slot.style.position = 'absolute'
      this.#slot.style.left = `${x}px`
      this.#slot.style.top = `${y}px`
      this.#slot.style.zIndex = `${this.getZIndex()}`

      this.#container?.appendChild(this.#slot)

      this.#app = createApp(componentVue, props)

      this.#app.provide(`${this.#provideKey}`, args)

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
    this.#stage.off('dragmove', this.#dragmove)
    this.#stage.off('wheel', this.#dragmove)
    this.off('dragmove', this.#dragmove)

    this.#app?.unmount()

    if (this.#slot) {
      this.#container?.removeChild(this.#slot)
      this.#slot = null
    }

    super.destroy()

    return this
  }
}
