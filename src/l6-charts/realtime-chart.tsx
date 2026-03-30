// realtime-chart — canvas-based streaming chart for high-frequency data
import { forwardRef, useCallback, useEffect, useRef } from 'react'

import { cx } from '../utils/cx'

type RealtimeChartProps = {
  className?: string
  color?: string
  data: number[]
  height?: number
  label?: string
  lineWidth?: number
  maxPoints?: number
  showGrid?: boolean
}

export const RealtimeChart = forwardRef<HTMLCanvasElement, RealtimeChartProps>(
  function RealtimeChart(
    {
      className,
      color,
      data,
      height = 200,
      label,
      lineWidth = 2,
      maxPoints = 200,
      showGrid = true,
    },
    ref
  ) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const rafRef = useRef<number>(0)
    const prevDataLenRef = useRef(0)

    const setRef = useCallback(
      (el: HTMLCanvasElement | null) => {
        ;(canvasRef as { current: HTMLCanvasElement | null }).current = el
        if (typeof ref === 'function') {
          ref(el)
        } else if (ref !== null && ref !== undefined) {
          ;(ref as { current: HTMLCanvasElement | null }).current = el
        }
      },
      [ref]
    )

    useEffect(() => {
      const canvas = canvasRef.current
      if (canvas === null) return

      const ctx = canvas.getContext('2d')
      if (ctx === null) return

      const draw = () => {
        const dpr = window.devicePixelRatio ?? 1
        const rect = canvas.getBoundingClientRect()
        const w = rect.width
        const h = rect.height

        if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
          canvas.width = w * dpr
          canvas.height = h * dpr
        }

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        ctx.clearRect(0, 0, w, h)

        const style = getComputedStyle(canvas)
        const lineColor =
          color ?? (style.getPropertyValue('--gds-accent').trim() || '#2563eb')
        const gridColor =
          style.getPropertyValue('--gds-border').trim() || '#e5e7eb'
        const fgColor = style.getPropertyValue('--gds-fg').trim() || '#1f2937'
        const fgMutedColor =
          style.getPropertyValue('--gds-fg-muted').trim() || '#6b7280'

        const points = data.slice(-maxPoints)
        if (points.length === 0) return

        const minVal = Math.min(...points)
        const maxVal = Math.max(...points)
        const range = maxVal - minVal || 1
        const pad = 8

        if (showGrid) {
          ctx.strokeStyle = gridColor
          ctx.lineWidth = 0.5
          for (let i = 0; i <= 4; i++) {
            const y = pad + ((h - pad * 2) * i) / 4
            ctx.beginPath()
            ctx.moveTo(0, y)
            ctx.lineTo(w, y)
            ctx.stroke()
          }
        }

        ctx.strokeStyle = lineColor
        ctx.lineWidth = lineWidth
        ctx.lineJoin = 'round'
        ctx.lineCap = 'round'
        ctx.beginPath()
        for (let i = 0; i < points.length; i++) {
          const x = (i / (maxPoints - 1)) * w
          const y = pad + (1 - (points[i] - minVal) / range) * (h - pad * 2)
          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()

        const gradient = ctx.createLinearGradient(0, 0, 0, h)
        gradient.addColorStop(0, lineColor + '40')
        gradient.addColorStop(1, lineColor + '00')
        ctx.fillStyle = gradient
        ctx.beginPath()
        for (let i = 0; i < points.length; i++) {
          const x = (i / (maxPoints - 1)) * w
          const y = pad + (1 - (points[i] - minVal) / range) * (h - pad * 2)
          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        if (points.length > 0) {
          const lastX = ((points.length - 1) / (maxPoints - 1)) * w
          ctx.lineTo(lastX, h)
          ctx.lineTo(0, h)
        }
        ctx.closePath()
        ctx.fill()

        const current = points[points.length - 1]
        ctx.font = 'bold 12px ui-monospace, monospace'
        ctx.fillStyle = fgColor
        ctx.textAlign = 'right'
        ctx.fillText(current.toFixed(1), w - 8, 16)

        if (label !== undefined) {
          ctx.font = '10px system-ui, sans-serif'
          ctx.fillStyle = fgMutedColor
          ctx.textAlign = 'left'
          ctx.fillText(label, 8, 14)
        }

        ctx.font = '9px ui-monospace, monospace'
        ctx.fillStyle = fgMutedColor
        ctx.textAlign = 'right'
        ctx.fillText(maxVal.toFixed(0), w - 8, pad + 10)
        ctx.fillText(minVal.toFixed(0), w - 8, h - pad)
      }

      if (data.length !== prevDataLenRef.current || data.length > 0) {
        prevDataLenRef.current = data.length
        rafRef.current = requestAnimationFrame(draw)
      }

      return () => {
        if (rafRef.current !== 0) {
          cancelAnimationFrame(rafRef.current)
        }
      }
    }, [data, maxPoints, color, lineWidth, showGrid, label, height])

    return (
      <canvas
        className={cx(
          'border-border bg-surface block w-full rounded-lg border',
          className
        )}
        data-component="realtime-chart"
        ref={setRef}
        style={{ height }}
      />
    )
  }
)

export type { RealtimeChartProps }
