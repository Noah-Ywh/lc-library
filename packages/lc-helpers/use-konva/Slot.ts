import { createApp } from 'vue'

import Konva from 'konva'

import type { App, Component } from 'vue'

export class Slot extends Konva.Group {
  #stage: Konva.Stage

  #container: HTMLElement | null
  #containerId: string

  #slot: HTMLElement
  #provideKey: string

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

    const { x, y } = this.absolutePosition()
    this.#slot = document.createElement('div')
    this.#slot.style.overflow = 'hidden'
    this.#slot.style.position = 'absolute'
    this.#slot.style.left = `${x}px`
    this.#slot.style.top = `${y}px`
    this.#slot.style.zIndex = `${this.getZIndex()}`

    this.#container?.appendChild(this.#slot)

    stage.on('dragmove', this.#dragmoveStage)
    this.on('dragmove', this.#dragmoveSlot)

    this.mount = this.mount.bind(this)
    this.destroy = this.destroy.bind(this)
  }

  #dragmoveStage = (e: Konva.KonvaEventObject<DragEvent>) => {
    if (e.target === e.target.getStage()) {
      const { x, y } = this.absolutePosition()
      this.#slot.style.left = `${x}px`
      this.#slot.style.top = `${y}px`
    }
  }
  #dragmoveSlot = () => {
    const { x, y } = this.absolutePosition()
    this.#slot.style.left = `${x}px`
    this.#slot.style.top = `${y}px`
  }

  public mount<P>(componentVue: Component, props?: P) {
    this.#app = createApp(componentVue)

    this.#app.provide(`${this.#provideKey}`, props)

    if (this.#slot) {
      this.#app.mount(this.#slot)
    }
  }

  public destroy() {
    this.#stage.off('dragmove', this.#dragmoveStage)
    this.off('dragmove', this.#dragmoveSlot)

    this.#app?.unmount()
    this.#container?.removeChild(this.#slot)

    super.destroy()

    return this
  }
}
