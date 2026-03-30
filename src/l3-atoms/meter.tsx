import { cva } from 'class-variance-authority'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import type { VariantProps } from '../utils/types'

const meterVariants = cva('overflow-hidden gds-radius-badge bg-bg-tertiary', {
  defaultVariants: { size: 'default' },
  variants: {
    size: {
      default: 'h-2.5',
      lg: 'h-4',
      sm: 'h-1.5',
    },
  },
})

const variantColors: Record<string, string> = {
  danger: 'bg-danger',
  default: 'bg-accent',
  success: 'bg-success',
  warning: 'bg-warning',
}

function getAutoColor(pct: number): string {
  if (pct >= 0.8) return 'bg-danger'
  if (pct >= 0.6) return 'bg-warning'
  if (pct >= 0.4) return 'bg-accent'
  return 'bg-success'
}

type MeterProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof meterVariants> & {
    label?: string
    max?: number
    min?: number
    showValue?: boolean
    value: number
    variant?: 'auto' | 'danger' | 'default' | 'success' | 'warning'
  }

export const Meter = forwardRef<HTMLDivElement, MeterProps>(function Meter(
  {
    className,
    label,
    max = 100,
    min = 0,
    showValue = true,
    size,
    value,
    variant = 'auto',
    ...props
  },
  ref
) {
  const range = max - min
  const pct = range > 0 ? Math.max(0, Math.min(1, (value - min) / range)) : 0
  const barColor =
    variant === 'auto'
      ? getAutoColor(pct)
      : (variantColors[variant] ?? 'bg-accent')

  return (
    <div
      className={cx('w-full', className)}
      data-component="meter"
      ref={ref}
      {...props}
    >
      {(label !== undefined || showValue) && (
        <div className="mb-1 flex items-center justify-between">
          {label !== undefined && (
            <span className="gds-text-body text-fg font-medium">{label}</span>
          )}
          {showValue && (
            <span className="gds-text-label text-fg-muted font-mono tabular-nums">
              {Math.round(pct * 100)}%
            </span>
          )}
        </div>
      )}
      <div
        aria-label={label}
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={value}
        className={meterVariants({ size })}
        role="meter"
      >
        <div
          className={cx(
            'gds-radius-badge h-full transition-all duration-500',
            barColor
          )}
          style={{ width: `${pct * 100}%` }}
        />
      </div>
    </div>
  )
})

export { meterVariants }
export type { MeterProps }
