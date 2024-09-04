import Konva from 'konva'
import { watch } from 'vue'

import type { Ref } from 'vue'

type InputConfigGroup = Pick<
  Konva.GroupConfig,
  | 'x'
  | 'y'
  | 'width'
  | 'height'
  | 'visible'
  | 'id'
  | 'name'
  | 'opacity'
  | 'draggable'
  | 'dragDistance'
  | 'dragBoundFunc'
>

type InputConfigRect = Pick<
  Konva.RectConfig,
  | 'cornerRadius'
  | 'fill'
  | 'stroke'
  | 'strokeWidth'
  | 'shadowColor'
  | 'shadowBlur'
  | 'shadowOffset'
  | 'shadowOffsetX'
  | 'shadowOffsetY'
  | 'shadowOpacity'
  | 'shadowEnabled'
>

type InputConfigText = Pick<
  Konva.TextConfig,
  'fontFamily' | 'fontSize' | 'fontStyle' | 'text' | 'align' | 'verticalAlign' | 'ellipsis' | 'wrap'
> & {
  color?: string
}

export type InputConfig = InputConfigGroup & InputConfigRect & InputConfigText

export class Input extends Konva.Group {
  #container: HTMLDivElement
  #input: HTMLInputElement
  #rect: Konva.Rect
  #text: Konva.Text

  valueRef: Ref<string> | undefined

  constructor(config: InputConfig, value?: Ref<string>) {
    super(config)

    this.valueRef = value

    this.#container = document.createElement('div')
    this.#input = document.createElement('input')

    this.#rect = new Konva.Rect({
      ...config,
      x: 0,
      y: 0,
      width: this.width(),
      height: this.height(),
      draggable: false,
    })
    this.#text = new Konva.Text({
      ...config,
      text: value?.value || config.text || '',
      x: 0,
      y: 0,
      width: this.width(),
      height: this.height(),
      fill: config.color || 'black',
      draggable: false,
    })

    this.add(this.#rect)
    this.add(this.#text)

    this.on('click', this.#handleClick)

    if (value) {
      watch(value, (newValue) => {
        this.#text.text(newValue)
      })
    }

    this.destroy = this.destroy.bind(this)
  }

  #handleClick = () => {
    const stage = this.getStage()
    if (!stage) {
      return
    }

    const container = stage.container()
    const { x, y } = this.absolutePosition()

    this.#container.style.overflow = 'hidden'
    this.#container.style.position = 'absolute'
    this.#container.style.left = `${x}px`
    this.#container.style.top = `${y}px`
    this.#container.style.width = `${this.#rect.width()}px`
    this.#container.style.height = `${this.#rect.height()}px`
    this.#container.style.zIndex = `${this.getZIndex()}`

    this.#input.type = 'text'
    this.#input.value = this.#text.text()
    this.#input.style.boxSizing = 'border-box'
    this.#input.style.width = `${this.#rect.width()}px`
    this.#input.style.height = `${this.#rect.height()}px`
    this.#input.style.fontFamily = this.#text.fontFamily()
    this.#input.style.fontSize = `${this.#text.fontSize()}px`
    this.#input.style.fontSize = `${this.#text.fontSize()}px`

    this.#input.addEventListener('blur', () => this.#updateText(this.#input))

    this.#container.appendChild(this.#input)
    container.appendChild(this.#container)
    this.#input.focus()
  }

  #updateText = (input: HTMLInputElement) => {
    if (this.valueRef) {
      this.valueRef.value = input.value
    }
    this.#text.text(input.value)
    this.#container?.remove()
  }

  public destroy() {
    this.off('click', this.#handleClick)

    super.destroy()

    return this
  }
}
