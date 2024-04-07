export interface CreatePolygo {
  /** 边数量 */
  n: number
  /** 多边形中心x坐标 */
  dx: number
  /** 多边形中心y坐标 */
  dy: number
  /** 多边形大小 */
  size: number
  /** 笔画颜色 */
  strokeStyle: string
}
/** 创建多边形
 * @param ctx 上下文环境对象context
 * @param data 形状参数
 * -------------------------- */
export function canvasCreatePolygon(ctx: CanvasRenderingContext2D, data: CreatePolygo) {
  ctx.beginPath()
  const degree = (2 * Math.PI) / data.n
  for (let i = 0; i < data.n; i++) {
    const x = Math.cos(i * degree)
    const y = Math.sin(i * degree)
    ctx.lineTo(x * data.size + data.dx, y * data.size + data.dy)
  }
  ctx.closePath()
  ctx.strokeStyle = data.strokeStyle
  ctx.stroke()
}
