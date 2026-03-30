import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type AuditEntryVariant = 'danger' | 'default' | 'success' | 'warning'

type AuditEntryProps = React.HTMLAttributes<HTMLDivElement> & {
  action: string
  target?: string
  timestamp: string
  user: string
  variant?: AuditEntryVariant
}

const variantCls: Record<AuditEntryVariant, string> = {
  default: 'text-fg',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
}

export const AuditEntry = forwardRef<HTMLDivElement, AuditEntryProps>(
  function AuditEntry(
    {
      action,
      className,
      target,
      timestamp,
      user,
      variant = 'default',
      ...props
    },
    ref
  ) {
    return (
      <div
        className={cx(
          'gds-gap gds-text flex items-center justify-between',
          className
        )}
        data-component="audit-entry"
        ref={ref}
        {...props}
      >
        <span className="text-fg-muted shrink-0 text-xs">{timestamp}</span>
        <span className="flex-1 truncate">
          <span className="text-fg font-medium">{user}</span>{' '}
          <span className={variantCls[variant]}>{action}</span>
          {target !== undefined && (
            <span className="text-fg-muted"> {target}</span>
          )}
        </span>
      </div>
    )
  }
)

export type { AuditEntryProps, AuditEntryVariant }
