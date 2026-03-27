import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  function Label({ children, className, required = false, ...props }, ref) {
    return (
      <label
        className={cx('block select-none gds-text-body font-medium text-fg', className)}
        data-component="label"
        ref={ref}
        {...props}
      >
        {children}
        {required && <span className="ml-0.5 text-danger">*</span>}
      </label>
    )
  },
)

export type { LabelProps }
