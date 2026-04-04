// toggle-field — label + switch + optional description for settings
import { forwardRef } from 'react'

import { Switch } from '../l3-atoms/switch'
import { cx } from '../utils/cx'

type ToggleFieldProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange'
> & {
  label: string
  description?: string
  checked: boolean
  onChange: (v: boolean) => void
  disabled?: boolean
}

const ToggleField = forwardRef<HTMLDivElement, ToggleFieldProps>(
  function ToggleField(
    { label, description, checked, onChange, disabled, className, ...props },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cx('flex items-center justify-between gap-4', className)}
        data-component="toggle-field"
        {...props}
      >
        <div className="flex flex-col">
          <span className="gds-text-body text-fg select-none">{label}</span>
          {description !== undefined && (
            <span className="text-fg-muted text-xs select-none">
              {description}
            </span>
          )}
        </div>
        <Switch checked={checked} onChange={onChange} disabled={disabled} />
      </div>
    )
  }
)

export { ToggleField }
export type { ToggleFieldProps }
