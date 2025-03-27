/**
 * @Describe 获取当前页面的 FPS
 * @param { function } callback 回调函数
 */
export function useFPS(callback: (fps: number) => void) {
  let lastFrameTime = performance.now()
  let frameCount = 0
  let fps = 0

  function updateFPS() {
    const now = performance.now()
    frameCount++
    const delta = now - lastFrameTime

    if (delta >= 1000) {
      fps = Math.round((frameCount * 1000) / delta)
      frameCount = 0
      lastFrameTime = now
      callback(fps)
    }

    requestAnimationFrame(updateFPS)
  }

  requestAnimationFrame(updateFPS)
}
