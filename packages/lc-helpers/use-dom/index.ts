const units = ['px', '%', 'em', 'rem', 'vw', 'vh', 'vmin', 'vmax']

/**
 * @Describe 如果css值带有长度单位，则直接返回，如果没有则添加单位后返回
 * @param { String } val 值
 * @param { String } unit 单位，如果不提供单位则默认为 'px'
 */
export function useDomLengthUnit(val: string | number, unit: string = 'px') {
  if (typeof val === 'string') {
    for (let i = 0; i < units.length; i++) {
      if (val.endsWith(units[i])) {
        const size = val.slice(0, val.length - units[i].length)
        const sizeNum = Number(size)
        if (!isNaN(sizeNum)) {
          return val
        }
      }
    }
    if (Number(val)) {
      return val + 'px'
    }
    console.error('[lc-helpers] 无法处理的值')
    return val
  } else if (typeof val === 'number') {
    return val + unit
  }
  return val
}

export interface ContentRect {
  x: number
  y: number
  width: number
  height: number
  top: number
  right: number
  bottom: number
  left: number
}

function isHTMLElement(value: unknown) {
  return value instanceof HTMLElement
}

/**
 * @Describe 监听元素布局属性变化
 * @param { HTMLElement } element 要监听的元素
 * @param { Funtion } func 回调函数
 */
export function useDomSizeChange(element: HTMLElement, func: (contentRect: ContentRect) => void) {
  if (!isHTMLElement(element)) {
    console.error('[lc-helpers] 不是 HTML 元素')
    return
  }

  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      func({
        x: entry.contentRect.x,
        y: entry.contentRect.y,
        width: entry.contentRect.width,
        height: entry.contentRect.height,
        top: entry.contentRect.top,
        right: entry.contentRect.right,
        bottom: entry.contentRect.bottom,
        left: entry.contentRect.left,
      })
    }
  })
  resizeObserver.observe(element)
}
