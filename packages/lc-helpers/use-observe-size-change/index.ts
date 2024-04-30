interface ContentRect {
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

/** 监听元素布局属性变化
 * @param { HTMLElement } element 要监听的元素
 * @param { Funtion } func 回调函数
 * @type
 * ```
 * interface ContentRect {
 *   x: number
 *   y: number
 *   width: number
 *   height: number
 *   top: number
 *   right: number
 *   bottom: number
 *   left: number
 *}
 * ```
 * @
 * -------------------------- */
export function useObserveSizeChange(
  element: HTMLElement,
  func: (contentRect: ContentRect) => void,
) {
  if (!isHTMLElement(element)) {
    throw new Error('[lc-helpers] 不是 HTML 元素')
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
