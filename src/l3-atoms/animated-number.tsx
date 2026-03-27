// animated-number — number display that animates when value changes
import { forwardRef, useEffect, useRef, useState } from 'react'

import { cx } from '../utils/cx'

export type AnimatedNumberProps = {
  value: number
  duration?: number
  format?: (n: number) => string
  className?: string
}

function defaultFormat(n: number): string {
  return n.toLocaleString()
}

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export const AnimatedNumber = forwardRef<HTMLSpanElement, AnimatedNumberProps>(
  function AnimatedNumber(
    { value, duration = 500, format = defaultFormat, className },
    ref,
  ) {
    const [display, setDisplay] = useState(value)
    const prevRef = useRef(value)

    useEffect(() => {
      const from = prevRef.current
      prevRef.current = value

      if (duration <= 0) {
        setDisplay(value)
        return
      }

      const start = performance.now()
      let raf: number

      function tick(now: number) {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        setDisplay(from + (value - from) * easeOut(progress))
        if (progress < 1) {
          raf = requestAnimationFrame(tick)
        }
      }

      raf = requestAnimationFrame(tick)
      return () => cancelAnimationFrame(raf)
    }, [value, duration])

    return (
      <span ref={ref} className={cx('tabular-nums', className)} data-component="animated-number">
        {format(display)}
      </span>
    )
  },
)
