import { forwardRef } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'

type RadioOption = {
  disabled?: boolean
  label: string
  value: string
}

type RadioGroupProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange'
> & {
  direction?: 'horizontal' | 'vertical'
  disabled?: boolean
  onChange?: (value: string) => void
  options: RadioOption[]
  value?: string
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  function RadioGroup(
    {
      className,
      direction = 'vertical',
      disabled = false,
      onChange,
      options,
      value,
      ...props
    },
    ref
  ) {
    return (
      <div
        className={cx(
          'gds-gap flex',
          direction === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
          className
        )}
        data-component="radio-group"
        ref={ref}
        role="radiogroup"
        {...props}
      >
        {options.map((opt) => {
          const selected = opt.value === value
          const isDisabled = disabled || opt.disabled === true

          return (
            <button
              aria-checked={selected}
              className={cx(
                'gds-gap-sm gds-text-body inline-flex items-center select-none',
                focusCls,
                isDisabled && 'cursor-not-allowed opacity-50'
              )}
              disabled={isDisabled}
              key={opt.value}
              onClick={() => onChange?.(opt.value)}
              role="radio"
              type="button"
            >
              <span
                className={cx(
                  'gds-icon gds-radius-badge inline-flex shrink-0 items-center justify-center border transition-colors',
                  selected
                    ? 'border-accent'
                    : 'border-border hover:border-accent/50'
                )}
              >
                {selected && (
                  <span className="gds-radius-badge bg-accent h-2 w-2" />
                )}
              </span>
              <span className="text-fg">{opt.label}</span>
            </button>
          )
        })}
      </div>
    )
  }
)

export type { RadioGroupProps, RadioOption }
