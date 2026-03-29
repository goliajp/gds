// activity-log — vertical feed of timestamped activity entries
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type ActivityEntry = {
  action: string
  actor: string
  id: string
  target?: string
  timestamp: string
}

export type ActivityLogProps = {
  className?: string
  entries: ActivityEntry[]
}

export const ActivityLog = forwardRef<HTMLDivElement, ActivityLogProps>(
  function ActivityLog({ className, entries }, ref) {
    return (
      <div
        ref={ref}
        className={cx('flex flex-col gds-gap', className)}
        data-component="activity-log"
      >
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="flex items-start gds-gap-sm border-l-2 border-border pl-3 py-1"
          >
            <div className="min-w-0 flex-1">
              <span className="gds-text font-medium text-fg">{entry.actor}</span>
              <span className="mx-1.5 inline-block rounded bg-bg-tertiary px-1.5 py-0.5 text-xs text-fg-muted">
                {entry.action}
              </span>
              {entry.target !== undefined && (
                <span className="gds-text text-fg-secondary">{entry.target}</span>
              )}
            </div>
            <time className="shrink-0 text-xs text-fg-muted">{entry.timestamp}</time>
          </div>
        ))}
      </div>
    )
  },
)
