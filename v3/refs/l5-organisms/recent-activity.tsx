import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type RecentActivityItem = {
  action: string
  timestamp: string
  user: string
}

type RecentActivityProps = React.HTMLAttributes<HTMLDivElement> & {
  items: RecentActivityItem[]
  title?: string
}

const RecentActivity = forwardRef<HTMLDivElement, RecentActivityProps>(
  function RecentActivity(
    { className, items, title = 'Recent Activity', ...props },
    ref
  ) {
    return (
      <div
        className={cx('flex flex-col', className)}
        data-component="recent-activity"
        ref={ref}
        {...props}
      >
        <h3 className="text-fg-muted mb-2 text-xs font-semibold tracking-wider uppercase">
          {title}
        </h3>
        <div className="flex flex-col gap-1">
          {items.map((item, i) => (
            <div
              className="flex items-baseline justify-between gap-2 py-1 text-sm"
              key={i}
            >
              <div className="min-w-0 truncate">
                <span className="text-fg font-medium">{item.user}</span>
                <span className="text-fg-muted"> {item.action}</span>
              </div>
              <span className="text-fg-muted shrink-0 text-xs">
                {item.timestamp}
              </span>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-fg-muted py-2 text-center text-xs">
              No activity
            </p>
          )}
        </div>
      </div>
    )
  }
)

export { RecentActivity }
export type { RecentActivityItem, RecentActivityProps }
