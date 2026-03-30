// input-group — groups input with prefix/suffix addons
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type InputGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  error?: boolean
  disabled?: boolean
  className?: string
}

export const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(
  function InputGroup(
    { prefix, suffix, error, disabled, className, children, ...props },
    ref
  ) {
    return (
      <div
        ref={ref}
        data-component="input-group"
        className={cx(
          'gds-radius-input flex items-center overflow-hidden border transition-colors',
          error ? 'border-danger' : 'border-border',
          disabled && 'pointer-events-none opacity-50',
          // strip border/radius from nested inputs
          '[&_input]:flex-1 [&_input]:rounded-none [&_input]:border-0 [&_input]:ring-0 [&_input]:focus-visible:ring-0',
          className
        )}
        {...props}
      >
        {prefix !== undefined && (
          <span className="bg-bg-tertiary border-border text-fg-muted flex items-center border-r px-3 text-sm select-none">
            {prefix}
          </span>
        )}
        {children}
        {suffix !== undefined && (
          <span className="bg-bg-tertiary border-border text-fg-muted flex items-center border-l px-3 text-sm select-none">
            {suffix}
          </span>
        )}
      </div>
    )
  }
)
