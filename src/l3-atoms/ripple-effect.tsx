// ripple-effect — material design ripple on click
import { forwardRef, useCallback, useState } from 'react'

import { cx } from '../utils/cx'
import { mergeRefs } from '../utils/dom'

type Ripple = { id: number; x: number; y: number; size: number }

export type RippleEffectProps = {
  children: React.ReactNode
  color?: string
  disabled?: boolean
  className?: string
}

let nextId = 0

export const RippleEffect = forwardRef<HTMLDivElement, RippleEffectProps>(
  function RippleEffect({ children, color = 'currentColor', disabled = false, className }, ref) {
    const [ripples, setRipples] = useState<Ripple[]>([])

    const handlePointerDown = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (disabled) return
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const size = Math.max(rect.width, rect.height) * 2
        setRipples((prev) => [...prev, { id: nextId++, x, y, size }])
      },
      [disabled],
    )

    const removeRipple = useCallback((id: number) => {
      setRipples((prev) => prev.filter((r) => r.id !== id))
    }, [])

    return (
      <div
        ref={ref}
        data-component="ripple-effect"
        className={cx('relative overflow-hidden', className)}
        onPointerDown={handlePointerDown}
      >
        {children}
        {ripples.map((r) => (
          <span
            key={r.id}
            className="pointer-events-none absolute animate-ripple rounded-full"
            style={{
              left: r.x - r.size / 2,
              top: r.y - r.size / 2,
              width: r.size,
              height: r.size,
              backgroundColor: color,
            }}
            onAnimationEnd={() => removeRipple(r.id)}
          />
        ))}
      </div>
    )
  },
)
