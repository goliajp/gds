// progress-ring — circular progress indicator with percentage label
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type ProgressRingProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: number
  strokeWidth?: number
  value: number
}

export const ProgressRing = forwardRef<HTMLDivElement, ProgressRingProps>(
  function ProgressRing({ className, size = 48, strokeWidth = 4, value, ...props }, ref) {
    const clamped = Math.max(0, Math.min(100, value))
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const offset = circumference * (1 - clamped / 100)
    const center = size / 2

    return (
      <div
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={clamped}
        className={cx(
          'inline-flex items-center justify-center select-none',
          className,
        )}
        data-component="progress-ring"
        ref={ref}
        role="progressbar"
        {...props}
      >
        <svg
          className="rotate-[-90deg]"
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          width={size}
        >
          <circle
            className="stroke-bg-tertiary"
            cx={center}
            cy={center}
            fill="none"
            r={radius}
            strokeWidth={strokeWidth}
          />
          <circle
            className="stroke-accent transition-all duration-500"
            cx={center}
            cy={center}
            fill="none"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
          />
        </svg>
        <span
          className="absolute font-mono text-xs font-bold text-fg"
          style={{ fontSize: size * 0.22 }}
        >
          {clamped}%
        </span>
      </div>
    )
  },
)

export type { ProgressRingProps }
