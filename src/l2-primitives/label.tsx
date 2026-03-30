import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { children, className, required = false, ...props },
  ref
) {
  return (
    <label
      className={cx(
        'gds-text-body text-fg block font-medium select-none',
        className
      )}
      data-component="label"
      ref={ref}
      {...props}
    >
      {children}
      {required && <span className="text-danger ml-0.5">*</span>}
    </label>
  )
})

export type { LabelProps }
