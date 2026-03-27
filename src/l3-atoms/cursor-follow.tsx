import { forwardRef, useCallback, useRef, useState } from 'react'

import { cx } from '../utils/cx'
import { mergeRefs } from '../utils/dom'

type CursorFollowProps = React.HTMLAttributes<HTMLDivElement> & {
  offset?: { x?: number; y?: number }
  smooth?: boolean
}

export const CursorFollow = forwardRef<HTMLDivElement, CursorFollowProps>(
  function CursorFollow({ children, className, offset, smooth = true, ...props }, ref) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [pos, setPos] = useState({ x: 0, y: 0 })

    const ox = offset?.x ?? 0
    const oy = offset?.y ?? 0

    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = containerRef.current?.getBoundingClientRect()
        if (rect === undefined) return
        setPos({ x: e.clientX - rect.left + ox, y: e.clientY - rect.top + oy })
      },
      [ox, oy],
    )

    return (
      <div
        className={cx('relative', className)}
        data-component="cursor-follow"
        onMouseMove={handleMouseMove}
        ref={mergeRefs(containerRef, ref)}
        {...props}
      >
        <div
          className="pointer-events-none absolute"
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px)`,
            transition: smooth ? 'transform 80ms ease-out' : undefined,
          }}
        >
          {children}
        </div>
      </div>
    )
  },
)

export type { CursorFollowProps }
