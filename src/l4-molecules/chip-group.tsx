import { forwardRef } from 'react'

import { Chip } from '../l3-atoms/chip'
import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'

type ChipGroupOption = { value: string; label: string }

type ChipGroupProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  options: ChipGroupOption[]
  value: string[]
  onChange: (value: string[]) => void
  exclusive?: boolean
  className?: string
}

export const ChipGroup = forwardRef<HTMLDivElement, ChipGroupProps>(
  function ChipGroup({ options, value, onChange, exclusive = false, className, ...props }, ref) {
    function handleClick(optionValue: string) {
      if (exclusive) {
        const next = value.includes(optionValue) ? [] : [optionValue]
        onChange(next)
        return
      }
      const next = value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue]
      onChange(next)
    }

    return (
      <div
        className={cx('flex flex-wrap gds-gap', className)}
        data-component="chip-group"
        ref={ref}
        {...props}
      >
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={cx('cursor-pointer', focusCls)}
            onClick={() => handleClick(opt.value)}
          >
            <Chip
              label={opt.label}
              variant={value.includes(opt.value) ? 'accent' : 'default'}
            />
          </button>
        ))}
      </div>
    )
  },
)

export type { ChipGroupOption, ChipGroupProps }
