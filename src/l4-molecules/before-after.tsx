// before-after — interactive slider to compare two overlaid views
import type { ReactNode } from 'react'
import { forwardRef, useCallback, useRef, useState } from 'react'

import { cx } from '../utils/cx'

export type BeforeAfterProps = {
  before: ReactNode
  after: ReactNode
  initialPosition?: number
  className?: string
}

export const BeforeAfter = forwardRef<HTMLDivElement, BeforeAfterProps>(
  function BeforeAfter({ before, after, initialPosition = 50, className }, ref) {
    const [position, setPosition] = useState(initialPosition)
    const containerRef = useRef<HTMLDivElement>(null)
    const dragging = useRef(false)

    const updatePosition = useCallback((clientX: number) => {
      const el = containerRef.current
      if (el === null) return
      const rect = el.getBoundingClientRect()
      const x = clientX - rect.left
      const pct = Math.max(0, Math.min(100, (x / rect.width) * 100))
      setPosition(pct)
    }, [])

    const onPointerDown = useCallback(
      (e: React.PointerEvent) => {
        dragging.current = true
        ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
        updatePosition(e.clientX)
      },
      [updatePosition],
    )

    const onPointerMove = useCallback(
      (e: React.PointerEvent) => {
        if (!dragging.current) return
        updatePosition(e.clientX)
      },
      [updatePosition],
    )

    const onPointerUp = useCallback(() => {
      dragging.current = false
    }, [])

    return (
      <div
        ref={(node) => {
          ;(containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node
          if (typeof ref === 'function') ref(node)
          else if (ref !== null && ref !== undefined) {
            ;(ref as React.MutableRefObject<HTMLDivElement | null>).current = node
          }
        }}
        className={cx('relative overflow-hidden gds-radius select-none', className)}
        data-component="before-after"
        style={{ cursor: 'ew-resize' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {/* after layer (full width, behind) */}
        <div className="relative">{after}</div>

        {/* before layer (clipped) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          {before}
        </div>

        {/* divider handle */}
        <div
          className="absolute inset-y-0 z-10 w-0.5 bg-fg/80"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-bg p-1 shadow">
            <svg
              className="h-3 w-3 text-fg-muted"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M8 6l-4 6 4 6M16 6l4 6-4 6" />
            </svg>
          </div>
        </div>
      </div>
    )
  },
)
