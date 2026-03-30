import { forwardRef } from 'react'

import { cx } from '../utils/cx'

const colorMap = {
  accent: 'bg-accent',
  danger: 'bg-danger',
  success: 'bg-success',
  warning: 'bg-warning',
} as const

const sizeMap = {
  default: 'h-2.5 w-2.5',
  lg: 'h-3.5 w-3.5',
  sm: 'h-2 w-2',
} as const

type PulseIndicatorProps = React.HTMLAttributes<HTMLSpanElement> & {
  color?: 'accent' | 'danger' | 'success' | 'warning'
  label?: string
  size?: 'default' | 'lg' | 'sm'
}

export const PulseIndicator = forwardRef<HTMLSpanElement, PulseIndicatorProps>(
  function PulseIndicator(
    { className, color = 'success', label, size = 'default', ...props },
    ref
  ) {
    return (
      <span
        className={cx(
          'inline-flex items-center',
          label !== undefined && 'gds-gap-sm',
          className
        )}
        data-component="pulse-indicator"
        ref={ref}
        {...props}
      >
        <span className="relative inline-flex">
          <span
            className={cx('rounded-full', colorMap[color], sizeMap[size])}
          />
          <span
            className={cx(
              'absolute inset-0 animate-ping rounded-full opacity-50',
              colorMap[color]
            )}
          />
        </span>
        {label !== undefined && (
          <span className="gds-text-label text-fg-muted">{label}</span>
        )}
      </span>
    )
  }
)

export type { PulseIndicatorProps }
