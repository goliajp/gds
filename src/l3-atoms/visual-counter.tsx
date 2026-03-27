// visual-counter — number display with +/- controls
import { forwardRef } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'

type VisualCounterProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}

export const VisualCounter = forwardRef<HTMLDivElement, VisualCounterProps>(
  function VisualCounter(
    { value, onChange, min, max, step = 1, disabled = false, className, ...props },
    ref,
  ) {
    const atMin = min !== undefined && value <= min
    const atMax = max !== undefined && value >= max

    return (
      <div
        ref={ref}
        className={cx('inline-flex items-center gap-1 select-none', className)}
        data-component="visual-counter"
        {...props}
      >
        <button
          type="button"
          className={cx('flex h-7 w-7 items-center justify-center rounded-md border border-border text-fg-muted transition-colors hover:bg-bg-tertiary disabled:opacity-40', focusCls)}
          disabled={disabled || atMin}
          onClick={() => onChange(Math.max(min ?? -Infinity, value - step))}
        >
          −
        </button>
        <span className="min-w-[2rem] text-center tabular-nums gds-text text-fg">{value}</span>
        <button
          type="button"
          className={cx('flex h-7 w-7 items-center justify-center rounded-md border border-border text-fg-muted transition-colors hover:bg-bg-tertiary disabled:opacity-40', focusCls)}
          disabled={disabled || atMax}
          onClick={() => onChange(Math.min(max ?? Infinity, value + step))}
        >
          +
        </button>
      </div>
    )
  },
)

export type { VisualCounterProps }
