// percentage-circle — circular percentage display with color coding
import { forwardRef, useMemo } from 'react'

import { cx } from '../utils/cx'

type PercentageCircleProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: 'default' | 'lg' | 'sm'
  value: number
}

const sizeClasses = {
  default: 'h-16 w-16 text-lg',
  lg: 'h-20 w-20 text-xl',
  sm: 'h-12 w-12 text-sm',
} as const

const strokeWidths = {
  default: 3,
  lg: 3.5,
  sm: 2.5,
} as const

export const PercentageCircle = forwardRef<
  HTMLDivElement,
  PercentageCircleProps
>(function PercentageCircle(
  { className, size = 'default', value, ...props },
  ref
) {
  const clamped = Math.max(0, Math.min(100, value))

  const colorClass = useMemo(() => {
    if (clamped >= 80) return 'text-success'
    if (clamped >= 50) return 'text-warning'
    return 'text-danger'
  }, [clamped])

  const radius = 18
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (clamped / 100) * circumference

  return (
    <div
      className={cx(
        'relative inline-flex items-center justify-center select-none',
        sizeClasses[size],
        className
      )}
      data-component="percentage-circle"
      ref={ref}
      {...props}
    >
      <svg
        className="absolute inset-0 h-full w-full -rotate-90"
        viewBox="0 0 40 40"
      >
        <circle
          className="text-fg-muted/10"
          cx="20"
          cy="20"
          fill="none"
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidths[size]}
        />
        <circle
          className={cx('transition-all duration-500', colorClass)}
          cx="20"
          cy="20"
          fill="none"
          r={radius}
          stroke="currentColor"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          strokeWidth={strokeWidths[size]}
        />
      </svg>
      <span className={cx('font-mono font-bold', colorClass)}>{clamped}%</span>
    </div>
  )
})

export type { PercentageCircleProps }
