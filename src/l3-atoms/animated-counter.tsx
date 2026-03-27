// animated-counter — number display with animated transitions
import { forwardRef, useEffect, useRef, useState } from 'react'

import { cx } from '../utils/cx'

type AnimatedCounterProps = React.HTMLAttributes<HTMLSpanElement> & {
  duration?: number
  format?: (n: number) => string
  prefix?: string
  suffix?: string
  value: number
}

const defaultFormat = (n: number): string => {
  if (Number.isInteger(n)) return n.toLocaleString()
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 })
}

export const AnimatedCounter = forwardRef<HTMLSpanElement, AnimatedCounterProps>(
  function AnimatedCounter(
    { className, duration = 500, format = defaultFormat, prefix, suffix, value, ...props },
    ref,
  ) {
    const [display, setDisplay] = useState(value)
    const prevRef = useRef(value)
    const rafRef = useRef<number>(0)

    useEffect(() => {
      const from = prevRef.current
      const to = value
      prevRef.current = to

      if (from === to) return

      const startTime = performance.now()
      const diff = to - from

      const animate = (now: number) => {
        const elapsed = now - startTime
        const progress = Math.min(1, elapsed / duration)
        // ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        setDisplay(from + diff * eased)

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate)
        } else {
          setDisplay(to)
        }
      }

      rafRef.current = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(rafRef.current)
    }, [value, duration])

    return (
      <span
        className={cx('tabular-nums select-none', className)}
        data-component="animated-counter"
        ref={ref}
        {...props}
      >
        {prefix !== undefined && <span>{prefix}</span>}
        {format(display)}
        {suffix !== undefined && <span>{suffix}</span>}
      </span>
    )
  },
)

export type { AnimatedCounterProps }
