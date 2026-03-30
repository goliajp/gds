// count-up — animated number counter from 0 to target
import { forwardRef, useEffect, useState } from 'react'

import { cx } from '../utils/cx'

export type CountUpProps = {
  value: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  separator?: string
  className?: string
}

function formatNumber(n: number, decimals: number, separator: string): string {
  const fixed = n.toFixed(decimals)
  if (separator === '') return fixed

  const [intPart, decPart] = fixed.split('.')
  const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
  if (decPart !== undefined) return `${formatted}.${decPart}`
  return formatted
}

// ease-out cubic
function easeOut(t: number): number {
  const t1 = t - 1
  return t1 * t1 * t1 + 1
}

export const CountUp = forwardRef<HTMLSpanElement, CountUpProps>(
  function CountUp(
    {
      value,
      duration = 1500,
      decimals = 0,
      prefix,
      suffix,
      separator = ',',
      className,
    },
    ref
  ) {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
      if (duration <= 0) {
        setCurrent(value)
        return
      }
      const start = performance.now()
      let raf: number

      function tick(now: number) {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        setCurrent(easeOut(progress) * value)
        if (progress < 1) {
          raf = requestAnimationFrame(tick)
        }
      }

      raf = requestAnimationFrame(tick)
      return () => cancelAnimationFrame(raf)
    }, [value, duration])

    return (
      <span
        ref={ref}
        className={cx('tabular-nums', className)}
        data-component="count-up"
      >
        {prefix ?? ''}
        {formatNumber(current, decimals, separator)}
        {suffix ?? ''}
      </span>
    )
  }
)
