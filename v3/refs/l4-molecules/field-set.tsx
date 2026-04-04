// field-set — bordered fieldset with legend label
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type FieldSetProps = {
  children: ReactNode
  legend: string
  disabled?: boolean
  className?: string
}

export const FieldSet = forwardRef<HTMLFieldSetElement, FieldSetProps>(
  function FieldSet({ children, legend, disabled = false, className }, ref) {
    return (
      <fieldset
        ref={ref}
        className={cx(
          'gds-radius border-border gds-pad border',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
        data-component="field-set"
        disabled={disabled}
      >
        <legend className="text-fg-muted px-2 text-xs font-medium select-none">
          {legend}
        </legend>
        {children}
      </fieldset>
    )
  }
)
