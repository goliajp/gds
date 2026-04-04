// slider-field — label + range slider + value display
import { forwardRef } from 'react'

import { RangeSlider } from '../l3-atoms/range-slider'
import { cx } from '../utils/cx'

type SliderFieldProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange'
> & {
  label: string
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  step?: number
  unit?: string
}

const SliderField = forwardRef<HTMLDivElement, SliderFieldProps>(
  function SliderField(
    {
      label,
      value,
      onChange,
      min = 0,
      max = 100,
      step = 1,
      unit,
      className,
      ...props
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cx('flex flex-col gap-1.5', className)}
        data-component="slider-field"
        {...props}
      >
        <div className="flex items-center justify-between">
          <label className="gds-text-body text-fg-muted select-none">
            {label}
          </label>
          <span className="gds-text-body text-fg tabular-nums">
            {value}
            {unit !== undefined ? ` ${unit}` : ''}
          </span>
        </div>
        <RangeSlider
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
        />
      </div>
    )
  }
)

export { SliderField }
export type { SliderFieldProps }
