import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { Label } from '../l2-primitives/label'
import { cx } from '../utils/cx'

type FieldWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  label: string
  children: ReactNode
  error?: string
  helperText?: string
  required?: boolean
}

export const FieldWrapper = forwardRef<HTMLDivElement, FieldWrapperProps>(
  function FieldWrapper({ children, className, error, helperText, label, required, ...props }, ref) {
    const hasError = error !== undefined && error !== ''

    return (
      <div
        className={cx('flex flex-col gds-gap-sm', className)}
        data-component="field-wrapper"
        data-state={hasError ? 'error' : 'idle'}
        ref={ref}
        {...props}
      >
        <Label required={required}>{label}</Label>
        {children}
        {hasError && (
          <span className="gds-text-caption text-danger">{error}</span>
        )}
        {!hasError && helperText !== undefined && (
          <span className="gds-text-caption text-fg-muted">{helperText}</span>
        )}
      </div>
    )
  },
)

export type { FieldWrapperProps }
