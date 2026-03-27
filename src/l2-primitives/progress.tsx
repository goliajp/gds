import { cva } from 'class-variance-authority'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import type { VariantProps } from '../utils/types'

const progressVariants = cva(
  'flex-1 overflow-hidden gds-radius-badge bg-bg-tertiary',
  {
    defaultVariants: { size: 'default' },
    variants: {
      size: {
        default: 'h-2',
        lg: 'h-3',
        sm: 'h-1',
      },
    },
  },
)

const barColorMap = {
  danger: 'bg-danger',
  default: 'bg-accent',
  success: 'bg-success',
  warning: 'bg-warning',
}

type ProgressProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof progressVariants> & {
    showLabel?: boolean
    value?: number
    variant?: 'danger' | 'default' | 'success' | 'warning'
  }

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  function Progress(
    { className, showLabel = false, size, value = 0, variant = 'default', ...props },
    ref,
  ) {
    const clamped = Math.max(0, Math.min(100, value))

    return (
      <div
        className={cx('flex items-center gds-gap-sm', className)}
        data-component="progress"
        ref={ref}
        {...props}
      >
        <div
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={clamped}
          className={progressVariants({ size })}
          role="progressbar"
        >
          <div
            className={cx(
              'h-full gds-radius-badge transition-all',
              barColorMap[variant],
            )}
            style={{ width: `${clamped}%` }}
          />
        </div>
        {showLabel && (
          <span className="shrink-0 font-mono gds-text-label text-fg-muted tabular-nums select-none">
            {clamped}%
          </span>
        )}
      </div>
    )
  },
)

export { progressVariants }
export type { ProgressProps }
