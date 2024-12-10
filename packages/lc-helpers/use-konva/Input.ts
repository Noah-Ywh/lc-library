import Konva from 'konva'

export type InputConfig = Konva.TextConfig & {
  styleType?: 'outlined'
  /** 输入框背景色 */
  backgroundColor?: string
  /** 输入框边框颜色 */
  borderColor?: string
  /** 占位符 */
  placeholder?: string
  /** 焦点事件 */
  focus?: (text: string) => void
  /** 输入事件 */
  input?: (text: string) => void
  /** 失焦事件 */
  blur?: (text: string) => void
}

export class Input extends Konva.Text {
  editEl: HTMLDivElement

  #config: InputConfig
  #editPadding = 0
  #backgroundColor: string
  #borderColor: string
  #focus: ((text: string) => void) | undefined
  #input: ((text: string) => void) | undefined
  #blur: ((text: string) => void) | undefined

  constructor(config: InputConfig) {
    super(config)

    this.editEl = document.createElement('div')

    this.#config = config

    this.#editPadding = config.padding || 0
    this.#backgroundColor = config.backgroundColor || 'white'
    this.#borderColor = config.borderColor || 'black'
    this.#focus = config.focus
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
    const left = Math.ceil(x - (scale?.x || 1))
    const top = Math.ceil(y - (scale?.y || 1))

    this.editEl.className = 'lc-helpers-konva-edit'
    this.editEl.setAttribute('contenteditable', 'true')
    this.editEl.innerText = this.text()

    Object.assign(this.editEl.style, {
      boxSizing: 'border-box',
      overfiow: 'hidden',
      fontFamily: this.fontFamily(),
      fontSize: `${this.fontSize()}px`,
      lineHeight: this.lineHeight(),
      color: this.fill(),
      width: `${Math.ceil(this.width() + this.#editPadding)}px`,
      padding: `${this.#editPadding}px`,
      backgroundColor: this.#backgroundColor,
      outline: 'none',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor:
        this.#config.styleType === 'outlined'
          ? this.#borderColor
          : `transparent transparent ${this.#borderColor} transparent`,
      borderRadius: this.#config.styleType === 'outlined' ? '2px' : 0,
      position: 'absolute',
      left: `${left}px`,
      top: `${top}px`,
      zIndex: '2',
      transform: `scale(${scale?.x || 1}, ${scale?.y || 1})`,
      transformOrigin: 'top left',
    })

    this.editEl.addEventListener('input', this.#eventInput)
    this.editEl.addEventListener('blur', this.#updateText)
    this.editEl.addEventListener('keydown', this.#eventKeydown)

    container.appendChild(this.editEl)

    this.editEl.focus()

    this.#focus?.(this.text())

    const range = document.createRange()
    const selection = window.getSelection()
    range.selectNodeContents(this.editEl)
    range.collapse(false)
    selection?.removeAllRanges()
    selection?.addRange(range)
  }

  #eventInput = () => {
    // 当内容为空时，清除浏览器默认添加的 <br> 标签
    if (this.editEl.innerHTML === '<br>') {
      this.editEl.innerHTML = ''
    }
    const text = this.editEl.innerText.trim()
    this.#input?.(text)
  }

  #updateText = () => {
    const text = this.editEl.innerText.trim()
    this.text(text)
    this.#blur?.(text)

    // 移除事件监听器
    this.editEl.removeEventListener('input', this.#updateText)
    this.editEl.removeEventListener('blur', this.#updateText)
    this.editEl.removeEventListener('keydown', this.#eventKeydown)
    this.editEl.remove()
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

    const left = Math.ceil(x - (scale?.x || 1))
    const top = Math.ceil(y - (scale?.y || 1))

    Object.assign(this.editEl.style, {
      left: `${left}px`,
      top: `${top}px`,
      transform: `scale(${scale?.x || 1}, ${scale?.y || 1})`,
    })
  }

  public destroy() {
    this.off('click', this.#handleClick)
    this.off('changeScale', this.#changeScale)
    this.editEl?.removeEventListener('input', this.#updateText)
    this.editEl?.removeEventListener('blur', this.#updateText)
    this.editEl?.removeEventListener('keydown', this.#eventKeydown)
    this.editEl?.remove()

    super.destroy()

    return this
  }
}
