const units = ['px', '%', 'em', 'rem', 'vw', 'vh', 'vmin', 'vmax']

/**
 * @Describe 如果值带有像素单位，则直接返回，如果没有则添加单位后返回
 * @param { String } val 值
 * @param { String } unit 单位，如果不提供单位则默认为 'px'
 */
export function useDomSizeUnit(val: string | number, unit: string = 'px'): string {
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
    console.error(`[lc-helpers] 添加单位失败，该值似乎不正确 ${val}`)
    return val
  } else if (typeof val === 'number') {
    return val + unit
  }
  console.error(`[lc-helpers] 添加单位失败，该值似乎不正确 ${val}`)
  return val
}
