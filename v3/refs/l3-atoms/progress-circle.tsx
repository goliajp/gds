// progress-circle — circular progress indicator using SVG
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

const variantColors: Record<string, string> = {
  accent: 'stroke-accent',
  danger: 'stroke-danger',
  success: 'stroke-success',
  warning: 'stroke-warning',
}

type ProgressCircleProps = {
  value: number
  size?: number
  strokeWidth?: number
  showValue?: boolean
  variant?: 'accent' | 'danger' | 'success' | 'warning'
  className?: string
}

const ProgressCircle = forwardRef<SVGSVGElement, ProgressCircleProps>(
  function ProgressCircle(
    {
      value,
      size = 64,
      strokeWidth = 4,
      showValue = true,
      variant = 'accent',
      className,
    },
    ref
  ) {
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const clamped = Math.max(0, Math.min(100, value))
    const offset = circumference * (1 - clamped / 100)
    const center = size / 2
    const colorCls = variantColors[variant] ?? 'stroke-accent'

    return (
      <svg
        ref={ref}
        className={cx('shrink-0', className)}
        data-component="progress-circle"
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        width={size}
      >
        <circle
          className="stroke-border/30"
          cx={center}
          cy={center}
          fill="none"
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className={cx('transition-all duration-500', colorCls)}
          cx={center}
          cy={center}
          fill="none"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
        />
        {showValue && (
          <text
            className="fill-fg font-medium"
            dominantBaseline="central"
            fontSize={size * 0.22}
            textAnchor="middle"
            x={center}
            y={center}
          >
            {Math.round(clamped)}%
          </text>
        )}
      </svg>
    )
  }
)

export { ProgressCircle }
export type { ProgressCircleProps }
