import Konva from 'konva'

export type InputConfig = Konva.TextConfig & {
  /** 输入框背景色 */
  backgroundColor?: string
  /** 输入框边框颜色 */
  borderColor?: string
  /** 失焦事件 */
  blur?: (text: string) => void
}

export class Input extends Konva.Text {
  #container: HTMLDivElement

  #backgroundColor: string
  #borderColor: string
  #blur: ((text: string) => void) | undefined

  constructor(config: InputConfig) {
    super(config)

    this.#container = document.createElement('div')

    this.#backgroundColor = config.backgroundColor || 'white'
    this.#borderColor = config.borderColor || 'black'
    this.#blur = config.blur

    this.on('click', this.#handleClick)

    this.destroy = this.destroy.bind(this)
  }

  #handleClick = () => {
    const stage = this.getStage()
    if (!stage) {
      return
    }

    const container = stage.container()
    const { x, y } = this.absolutePosition()

    this.#container.className = 'lc-helpers-konva-edit'
    this.#container.setAttribute('contenteditable', 'true')
    this.#container.innerText = this.text()

    Object.assign(this.#container.style, {
      fontFamily: this.fontFamily(),
      fontSize: `${this.fontSize()}px`,
      lineHeight: this.lineHeight(),
      color: this.fill(),
      minWidth: `${this.width() + 10}px`,
      padding: '5px',
      backgroundColor: this.#backgroundColor,
      border: `1px solid ${this.#borderColor}`,
      borderRadius: '2px',
      position: 'absolute',
      left: `${x - 6}px`,
      top: `${y - 6}px`,
      zIndex: '2',
    })

    this.#container.addEventListener('blur', this.#updateText)
    this.#container.addEventListener('keydown', this.#preventEnter)

    container.appendChild(this.#container)
    this.#container.focus()

    const range = document.createRange()
    const selection = window.getSelection()
    range.selectNodeContents(this.#container)
    range.collapse(false)
    selection?.removeAllRanges()
    selection?.addRange(range)
  }

  #updateText = () => {
    const text = this.#container.innerText
    this.text(text)
    this.#blur?.(text)

    this.#container?.remove()
  }

  #preventEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  public destroy() {
    this.off('click', this.#handleClick)

    super.destroy()

    return this
  }
}
