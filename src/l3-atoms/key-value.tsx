// key-value — simple inline key: value pair for compact data display
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type KeyValueProps = React.HTMLAttributes<HTMLDivElement> & {
  label: string
  mono?: boolean
  value: ReactNode
}

export const KeyValue = forwardRef<HTMLDivElement, KeyValueProps>(
  function KeyValue({ label, value, mono = false, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cx(
          'gds-text-body inline-flex items-baseline gap-1.5',
          className
        )}
        data-component="key-value"
        {...props}
      >
        <span className="text-fg-muted gds-text-caption shrink-0">{label}</span>
        <span className={cx('text-fg', mono && 'font-mono')}>{value}</span>
      </div>
    )
  }
)

export type { KeyValueProps }
