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
        className={cx('gds-gap flex flex-col', className)}
        data-component="activity-log"
      >
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="gds-gap-sm border-border flex items-start border-l-2 py-1 pl-3"
          >
            <div className="min-w-0 flex-1">
              <span className="gds-text text-fg font-medium">
                {entry.actor}
              </span>
              <span className="bg-bg-tertiary text-fg-muted mx-1.5 inline-block rounded px-1.5 py-0.5 text-xs">
                {entry.action}
              </span>
              {entry.target !== undefined && (
                <span className="gds-text text-fg-secondary">
                  {entry.target}
                </span>
              )}
            </div>
            <time className="text-fg-muted shrink-0 text-xs">
              {entry.timestamp}
            </time>
          </div>
        ))}
      </div>
    )
  }
)
