import Konva from 'konva'

export type InputConfig = Konva.TextConfig & {
  /** 输入框背景色 */
  backgroundColor?: string
  /** 输入框边框颜色 */
  borderColor?: string
  /** 输入事件 */
  input?: (text: string) => void
  /** 失焦事件 */
  blur?: (text: string) => void
}

export class Input extends Konva.Text {
  #edit: HTMLDivElement

  #editPadding = 5

  #backgroundColor: string
  #borderColor: string
  #input: ((text: string) => void) | undefined
  #blur: ((text: string) => void) | undefined

  constructor(config: InputConfig) {
    super(config)

    this.#edit = document.createElement('div')

    this.#backgroundColor = config.backgroundColor || 'white'
    this.#borderColor = config.borderColor || 'black'
    this.#input = config.input
    this.#blur = config.blur

    this.on('click', this.#handleClick)
    this.on('changeScale', this.#changeScale)

    this.destroy = this.destroy.bind(this)
  }

  #handleClick = () => {
    const stage = this.getStage()
    if (!stage) {
      return
    }
    const container = stage.container()
    const scale = stage.scale()
    const { x, y } = this.absolutePosition()
    const left = x - this.#editPadding * (scale?.x || 1)
    const top = y - this.#editPadding * (scale?.y || 1)

    this.#edit.className = 'lc-helpers-konva-edit'
    this.#edit.setAttribute('contenteditable', 'true')
    this.#edit.innerText = this.text()

    Object.assign(this.#edit.style, {
      fontFamily: this.fontFamily(),
      fontSize: `${this.fontSize()}px`,
      lineHeight: this.lineHeight(),
      color: this.fill(),
      minWidth: `${this.width()}px`,
      padding: `${this.#editPadding}px`,
      backgroundColor: this.#backgroundColor,
      outline: `1px solid ${this.#borderColor}`,
      borderRadius: '2px',
      position: 'absolute',
      left: `${left}px`,
      top: `${top}px`,
      zIndex: '2',
      transform: `scale(${scale?.x || 1}, ${scale?.y || 1})`,
      transformOrigin: 'top left',
    })

    this.#edit.addEventListener('input', this.#eventInput)
    this.#edit.addEventListener('blur', this.#updateText)
    this.#edit.addEventListener('keydown', this.#eventKeydown)

    container.appendChild(this.#edit)
    this.#edit.focus()

    const range = document.createRange()
    const selection = window.getSelection()
    range.selectNodeContents(this.#edit)
    range.collapse(false)
    selection?.removeAllRanges()
    selection?.addRange(range)
  }

  #eventInput = () => {
    const text = this.#edit.innerText.trim()
    this.#input?.(text)
  }

  #updateText = () => {
    const text = this.#edit.innerText.trim()
    this.text(text)
    this.#blur?.(text)

    // 移除事件监听器
    this.#edit.removeEventListener('input', this.#updateText)
    this.#edit.removeEventListener('blur', this.#updateText)
    this.#edit.removeEventListener('keydown', this.#eventKeydown)
    this.#edit.remove()
  }

  #eventKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
    if (event.key === 'Backspace' || event.key === 'Delete') {
      event.stopPropagation()
    }
  }

  #changeScale = () => {
    const stage = this.getStage()
    if (!stage) {
      return
    }
    const { x, y } = this.absolutePosition()
    const scale = stage.scale()

    const left = x - this.#editPadding * (scale?.x || 1)
    const top = y - this.#editPadding * (scale?.y || 1)

    Object.assign(this.#edit.style, {
      left: `${left}px`,
      top: `${top}px`,
      transform: `scale(${scale?.x || 1}, ${scale?.y || 1})`,
    })
  }

  public destroy() {
    this.off('click', this.#handleClick)
    this.off('changeScale', this.#changeScale)
    this.#edit?.removeEventListener('input', this.#updateText)
    this.#edit?.removeEventListener('blur', this.#updateText)
    this.#edit?.removeEventListener('keydown', this.#eventKeydown)
    this.#edit?.remove()

    super.destroy()

    return this
  }
}
