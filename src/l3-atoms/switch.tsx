import { cva } from 'class-variance-authority'
import { forwardRef } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import type { VariantProps } from '../utils/types'

const switchVariants = cva(
  'relative inline-flex shrink-0 cursor-pointer select-none items-center gds-radius-badge transition-colors ' +
    focusCls,
  {
    defaultVariants: { size: 'default' },
    variants: {
      size: {
        default: 'h-5 w-9',
        sm: 'h-4 w-7',
      },
    },
  }
)

const thumbSizeMap = {
  default: 'gds-icon',
  sm: 'h-3 w-3',
}

const thumbTranslateMap = {
  default: { off: 'translate-x-0.5', on: 'translate-x-4' },
  sm: { off: 'translate-x-0.5', on: 'translate-x-3.5' },
}

type SwitchProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'onChange'
> &
  VariantProps<typeof switchVariants> & {
    checked?: boolean
    label?: string
    onChange?: (checked: boolean) => void
  }

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  function Switch(
    {
      checked = false,
      className,
      disabled = false,
      label,
      onChange,
      size = 'default',
      ...props
    },
    ref
  ) {
    const sizeKey = size ?? 'default'

    return (
      <label
        className={cx(
          'gds-gap-sm inline-flex items-center select-none',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
        data-component="switch"
        data-state={checked ? 'on' : 'off'}
      >
        <button
          aria-checked={checked}
          className={cx(
            switchVariants({ size }),
            checked ? 'bg-accent' : 'bg-bg-tertiary',
            disabled && 'cursor-not-allowed'
          )}
          disabled={disabled}
          onClick={() => onChange?.(!checked)}
          ref={ref}
          role="switch"
          type="button"
          {...props}
        >
          <span
            className={cx(
              'gds-radius-badge bg-fg gds-shadow-sm transition-transform',
              thumbSizeMap[sizeKey],
              checked
                ? thumbTranslateMap[sizeKey].on
                : thumbTranslateMap[sizeKey].off
            )}
          />
        </button>
        {label !== undefined && (
          <span className="gds-text-body text-fg">{label}</span>
        )}
      </label>
    )
  }
)

export { switchVariants }
export type { SwitchProps }
