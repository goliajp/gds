// range-slider — styled native range input with optional value label
import { forwardRef, useMemo } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'

type RangeSliderProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'type' | 'value'
> & {
  disabled?: boolean
  max?: number
  min?: number
  onChange: (value: number) => void
  showValue?: boolean
  step?: number
  value: number
}

export const RangeSlider = forwardRef<HTMLInputElement, RangeSliderProps>(
  function RangeSlider(
    {
      className,
      disabled = false,
      max = 100,
      min = 0,
      onChange,
      showValue = false,
      step = 1,
      value,
      ...props
    },
    ref
  ) {
    const percent = useMemo(() => {
      const range = max - min
      if (range <= 0) return 0
      return ((value - min) / range) * 100
    }, [value, min, max])

    return (
      <div
        className={cx(
          'relative flex items-center select-none',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
        data-component="range-slider"
        data-state={disabled ? 'disabled' : 'enabled'}
      >
        {showValue && (
          <span
            className="text-fg-muted absolute -top-5 text-[10px] font-medium transition-[left]"
            style={{ left: `${percent}%`, transform: 'translateX(-50%)' }}
          >
            {value}
          </span>
        )}
        <input
          className={cx(
            'gds-range-slider bg-bg-tertiary h-1.5 w-full cursor-pointer appearance-none rounded-full',
            focusCls,
            disabled && 'pointer-events-none'
          )}
          disabled={disabled}
          max={max}
          min={min}
          onChange={(e) => onChange(Number(e.target.value))}
          ref={ref}
          step={step}
          style={{
            background: `linear-gradient(to right, var(--gds-accent) 0%, var(--gds-accent) ${percent}%, var(--gds-bg-tertiary) ${percent}%, var(--gds-bg-tertiary) 100%)`,
          }}
          type="range"
          value={value}
          {...props}
        />
      </div>
    )
  }
)

export type { RangeSliderProps }
