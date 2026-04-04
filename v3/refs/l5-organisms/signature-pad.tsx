// signature-pad — canvas-based signature capture
import { forwardRef, useCallback, useRef, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import {
  beginStroke,
  canvasToDataUrl,
  clearCanvas,
  continueStroke,
  getCanvasPosition,
} from './signature-drawing'

type SignaturePadProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  disabled?: boolean
  height?: number
  onSign: (dataUrl: string) => void
  strokeColor?: string
  strokeWidth?: number
  width?: number
}

export const SignaturePad = forwardRef<HTMLDivElement, SignaturePadProps>(
  function SignaturePad(
    {
      className,
      disabled,
      height = 200,
      onSign,
      strokeColor = 'var(--gds-fg)',
      strokeWidth = 2,
      width = 400,
      ...props
    },
    ref
  ) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const isDrawingRef = useRef(false)
    const [isEmpty, setIsEmpty] = useState(true)

    const startDraw = useCallback(
      (clientX: number, clientY: number) => {
        if (disabled === true) return
        const canvas = canvasRef.current
        if (canvas === null) return
        const ctx = canvas.getContext('2d')
        if (ctx === null) return
        isDrawingRef.current = true
        const pos = getCanvasPosition(canvas, clientX, clientY)
        beginStroke(ctx, pos, { strokeColor, strokeWidth })
      },
      [disabled, strokeColor, strokeWidth]
    )

    const draw = useCallback((clientX: number, clientY: number) => {
      if (!isDrawingRef.current) return
      const canvas = canvasRef.current
      if (canvas === null) return
      const ctx = canvas.getContext('2d')
      if (ctx === null) return
      const pos = getCanvasPosition(canvas, clientX, clientY)
      continueStroke(ctx, pos)
      setIsEmpty(false)
    }, [])

    const endDraw = useCallback(() => {
      if (!isDrawingRef.current) return
      isDrawingRef.current = false
      const canvas = canvasRef.current
      if (canvas !== null) {
        onSign(canvasToDataUrl(canvas))
      }
    }, [onSign])

    const handleMouseDown = useCallback(
      (e: React.MouseEvent<HTMLCanvasElement>) => {
        startDraw(e.clientX, e.clientY)
      },
      [startDraw]
    )

    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLCanvasElement>) => {
        draw(e.clientX, e.clientY)
      },
      [draw]
    )

    const handleTouchStart = useCallback(
      (e: React.TouchEvent<HTMLCanvasElement>) => {
        e.preventDefault()
        const touch = e.touches[0]
        if (touch === undefined) return
        startDraw(touch.clientX, touch.clientY)
      },
      [startDraw]
    )

    const handleTouchMove = useCallback(
      (e: React.TouchEvent<HTMLCanvasElement>) => {
        e.preventDefault()
        const touch = e.touches[0]
        if (touch === undefined) return
        draw(touch.clientX, touch.clientY)
      },
      [draw]
    )

    const handleTouchEnd = useCallback(
      (e: React.TouchEvent<HTMLCanvasElement>) => {
        e.preventDefault()
        endDraw()
      },
      [endDraw]
    )

    const handleClear = useCallback(() => {
      const canvas = canvasRef.current
      if (canvas === null) return
      clearCanvas(canvas)
      setIsEmpty(true)
    }, [])

    return (
      <div
        className={cx(
          'gds-ctx gds-radius-popover border-border bg-surface inline-flex flex-col gap-2 border p-3',
          disabled === true && 'pointer-events-none opacity-40',
          className
        )}
        data-component="signature-pad"
        ref={ref}
        {...props}
      >
        <div className="relative">
          <canvas
            className="border-border/50 bg-bg block cursor-crosshair rounded border"
            height={height}
            onMouseDown={handleMouseDown}
            onMouseLeave={endDraw}
            onMouseMove={handleMouseMove}
            onMouseUp={endDraw}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
            onTouchStart={handleTouchStart}
            ref={canvasRef}
            style={{ width, height }}
            width={width}
          />
          {isEmpty && (
            <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-4">
              <span className="text-fg-muted/50 text-xs select-none">
                Sign above
              </span>
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <button
            className={cx(
              'text-fg-muted hover:bg-fg-muted/10 hover:text-fg rounded px-2.5 py-1 text-xs transition-colors',
              focusCls
            )}
            onClick={handleClear}
            type="button"
          >
            Clear
          </button>
        </div>
      </div>
    )
  }
)

export type { SignaturePadProps }
