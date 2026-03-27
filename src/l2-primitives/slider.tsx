// slider — native range input with value display
import { forwardRef } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'

type SliderProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  disabled?: boolean
  max?: number
  min?: number
  onChange?: (value: number) => void
  step?: number
  value?: number
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  function Slider(
    { className, disabled = false, max = 100, min = 0, onChange, step = 1, value = 0, ...props },
    ref,
  ) {
    return (
      <div className={cx('flex items-center gap-3', className)} data-component="slider" {...props}>
        <input
          className={cx(
            'h-1.5 w-full cursor-pointer appearance-none rounded-full bg-bg-tertiary accent-accent',
            disabled && 'cursor-not-allowed opacity-50',
            focusCls,
          )}
          disabled={disabled}
          max={max}
          min={min}
          onChange={(e) => onChange?.(Number(e.target.value))}
          ref={ref}
          step={step}
          type="range"
          value={value}
        />
        <span className="w-8 shrink-0 text-right font-mono text-xs text-fg-muted tabular-nums">
          {value}
        </span>
      </div>
    )
  },
)

export type { SliderProps }
