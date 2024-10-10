import { h, render, toRefs } from 'vue'

import Konva from 'konva'

import type { Component } from 'vue'

export class Slot extends Konva.Group {
  #stage: Konva.Stage

  #container: HTMLElement | null
  #containerId: string

  #slot: HTMLElement | null = null

  #animationFrameId: number | null = null

  constructor(config: Konva.GroupConfig, stage: Konva.Stage) {
    super(config)

    this.#stage = stage

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
  public mount(componentVue: Component, props?: object) {
    const { x, y } = this.absolutePosition()

    if (!this.#slot) {
      this.#slot = document.createElement('div')
      this.#slot.style.position = 'absolute'
      this.#slot.style.left = `${x}px`
      this.#slot.style.top = `${y}px`
      this.#slot.style.zIndex = `${this.getZIndex()}`

      this.#container?.appendChild(this.#slot)

      const vNode = h(componentVue, props ? toRefs(props) : null)

      render(vNode, this.#slot)
    }
  }

  /** 移除组件 */
  public unmount() {
    if (this.#slot) {
      render(null, this.#slot)
    }
  }

  /** 移除图形和所有事件 */
  public destroy() {
    this.#stage.off('dragmove', this.#dragmove)
    this.#stage.off('wheel', this.#dragmove)
    this.off('dragmove', this.#dragmove)

    if (this.#slot) {
      render(null, this.#slot)
    }

    super.destroy()

    return this
  }
}
