// signature-drawing — pure canvas drawing utilities (no React dependency)

type Point = { x: number; y: number }

type DrawConfig = {
  strokeColor: string
  strokeWidth: number
}

function getCanvasPosition(
  canvas: HTMLCanvasElement,
  clientX: number,
  clientY: number,
): Point {
  const rect = canvas.getBoundingClientRect()
  return {
    x: (clientX - rect.left) * (canvas.width / rect.width),
    y: (clientY - rect.top) * (canvas.height / rect.height),
  }
}

function beginStroke(
  ctx: CanvasRenderingContext2D,
  point: Point,
  config: DrawConfig,
): void {
  ctx.strokeStyle = config.strokeColor
  ctx.lineWidth = config.strokeWidth
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.beginPath()
  ctx.moveTo(point.x, point.y)
}

function continueStroke(
  ctx: CanvasRenderingContext2D,
  point: Point,
): void {
  ctx.lineTo(point.x, point.y)
  ctx.stroke()
}

function clearCanvas(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext('2d')
  if (ctx === null) return
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function canvasToDataUrl(canvas: HTMLCanvasElement): string {
  return canvas.toDataURL('image/png')
}

export { beginStroke, canvasToDataUrl, clearCanvas, continueStroke, getCanvasPosition }
export type { DrawConfig, Point }
