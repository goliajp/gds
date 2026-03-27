import { forwardRef } from 'react'

import { AuditEntry } from '../l4-molecules/audit-entry'
import { cx } from '../utils/cx'

type AuditLogEntry = {
  action: string
  id: string
  target?: string
  timestamp: string
  user: string
  variant?: 'danger' | 'default' | 'success' | 'warning'
}

type AuditLogProps = React.HTMLAttributes<HTMLDivElement> & {
  entries: AuditLogEntry[]
}

export const AuditLog = forwardRef<HTMLDivElement, AuditLogProps>(
  function AuditLog({ className, entries, ...props }, ref) {
    return (
      <div
        className={cx('flex flex-col', className)}
        data-component="audit-log"
        ref={ref}
        {...props}
      >
        {entries.map((entry, i) => (
          <div key={entry.id} className={cx('gds-pad-x gds-pad-y', i % 2 === 1 && 'bg-surface/50')}>
            <AuditEntry
              action={entry.action}
              target={entry.target}
              timestamp={entry.timestamp}
              user={entry.user}
              variant={entry.variant ?? 'default'}
            />
          </div>
        ))}
      </div>
    )
  },
)

export type { AuditLogEntry, AuditLogProps }
