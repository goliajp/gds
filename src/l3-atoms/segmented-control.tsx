// segmented-control — mutually exclusive button group (iOS-style)
import { forwardRef } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

type SegmentedControlOption = {
  value: string
  label: string
}

type SegmentedControlSize = 'default' | 'sm'

type SegmentedControlProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  options: SegmentedControlOption[]
  value: string
  onChange: (value: string) => void
  size?: SegmentedControlSize
  disabled?: boolean
  glass?: boolean
}

const sizeClasses: Record<SegmentedControlSize, string> = {
  default: 'px-3 py-1.5 text-xs',
  sm: 'px-2 py-1 text-[11px]',
}

const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(
  function SegmentedControl({ options, value, onChange, size = 'default', disabled, glass, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cx(
          'inline-flex select-none gds-radius-button bg-bg-tertiary p-0.5',
          glass === true && glassClass(glass),
          disabled === true && 'pointer-events-none opacity-50',
          className,
        )}
        data-component="segmented-control"
        data-state={disabled === true ? 'disabled' : 'enabled'}
        role="radiogroup"
        {...props}
      >
        {options.map((option) => {
          const isActive = option.value === value
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isActive}
              disabled={disabled}
              onClick={() => {
                if (!isActive) {
                  onChange(option.value)
                }
              }}
              className={cx(
                'gds-radius-button transition-all',
                sizeClasses[size ?? 'default'],
                focusCls,
                isActive
                  ? 'bg-bg font-medium text-fg gds-shadow-sm'
                  : 'text-fg-muted hover:text-fg',
              )}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    )
  },
)

export { SegmentedControl }
export type { SegmentedControlOption, SegmentedControlProps, SegmentedControlSize }
