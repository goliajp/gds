import type { ReactNode } from 'react'
import { forwardRef, useCallback, useRef, useState } from 'react'

import { ResizeHandle } from '../l3-atoms/resize-handle'
import { cx } from '../utils/cx'

type SplitViewProps = React.HTMLAttributes<HTMLDivElement> & {
  defaultSplit?: number
  left: ReactNode
  minLeft?: number
  minRight?: number
  right: ReactNode
}

export const SplitView = forwardRef<HTMLDivElement, SplitViewProps>(
  function SplitView({ className, defaultSplit = 50, left, minLeft = 20, minRight = 20, right, ...props }, ref) {
    const [split, setSplit] = useState(defaultSplit)
    const containerRef = useRef<HTMLDivElement>(null)

    const handleResize = useCallback(
      (delta: number) => {
        const container = containerRef.current
        if (container === null) return
        const width = container.offsetWidth
        if (width === 0) return
        const pctDelta = (delta / width) * 100
        setSplit((prev) => {
          const next = prev + pctDelta
          if (next < minLeft) return minLeft
          if (next > 100 - minRight) return 100 - minRight
          return next
        })
      },
      [minLeft, minRight],
    )

    return (
      <div
        className={cx('flex h-full w-full', className)}
        data-component="split-view"
        ref={(el) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el
          if (typeof ref === 'function') ref(el)
          else if (ref !== null && ref !== undefined) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el
        }}
        {...props}
      >
        <div className="overflow-auto" style={{ width: `${split}%` }}>{left}</div>
        <ResizeHandle orientation="vertical" onResize={handleResize} />
        <div className="overflow-auto" style={{ width: `${100 - split}%` }}>{right}</div>
      </div>
    )
  },
)

export type { SplitViewProps }
