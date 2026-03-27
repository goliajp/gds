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
  function InputGroup({ prefix, suffix, error, disabled, className, children, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-component="input-group"
        className={cx(
          'flex items-center gds-radius-input overflow-hidden border transition-colors',
          error ? 'border-danger' : 'border-border',
          disabled && 'opacity-50 pointer-events-none',
          // strip border/radius from nested inputs
          '[&_input]:border-0 [&_input]:rounded-none [&_input]:ring-0 [&_input]:focus-visible:ring-0 [&_input]:flex-1',
          className,
        )}
        {...props}
      >
        {prefix !== undefined && (
          <span className="flex items-center bg-bg-tertiary border-r border-border px-3 text-sm text-fg-muted select-none">
            {prefix}
          </span>
        )}
        {children}
        {suffix !== undefined && (
          <span className="flex items-center bg-bg-tertiary border-l border-border px-3 text-sm text-fg-muted select-none">
            {suffix}
          </span>
        )}
      </div>
    )
  },
)
