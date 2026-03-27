// checkbox-group — group of checkboxes with optional select-all
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { Checkbox } from './checkbox'

type CheckboxGroupOption = {
  label: string
  value: string
}

type CheckboxGroupProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  disabled?: boolean
  onChange: (value: string[]) => void
  options: CheckboxGroupOption[]
  selectAll?: boolean
  value: string[]
}

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  function CheckboxGroup({ className, disabled = false, onChange, options, selectAll = false, value, ...props }, ref) {
    const allSelected = options.length > 0 && options.every((o) => value.includes(o.value))

    const handleToggle = (optValue: string, checked: boolean) => {
      if (checked) {
        onChange([...value, optValue])
      } else {
        onChange(value.filter((v) => v !== optValue))
      }
    }

    const handleSelectAll = (checked: boolean) => {
      if (checked) {
        onChange(options.map((o) => o.value))
      } else {
        onChange([])
      }
    }

    return (
      <div ref={ref} className={cx('flex flex-col gds-gap', className)} data-component="checkbox-group" role="group" {...props}>
        {selectAll && (
          <Checkbox checked={allSelected} disabled={disabled} label="Select all" onChange={handleSelectAll} />
        )}
        {options.map((opt) => (
          <Checkbox
            checked={value.includes(opt.value)}
            disabled={disabled}
            key={opt.value}
            label={opt.label}
            onChange={(checked) => handleToggle(opt.value, checked)}
          />
        ))}
      </div>
    )
  },
)

export type { CheckboxGroupOption, CheckboxGroupProps }
