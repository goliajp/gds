// activity-feed — timestamped event log with avatars
import { forwardRef } from 'react'

import { Avatar } from '../l3-atoms/avatar'
import { cx } from '../utils/cx'

type ActivityFeedItem = {
  action: string
  avatar?: string
  id: string
  target?: string
  timestamp: string
  user: string
}

type ActivityFeedProps = {
  className?: string
  items: ActivityFeedItem[]
}

export const ActivityFeed = forwardRef<HTMLDivElement, ActivityFeedProps>(
  function ActivityFeed({ className, items }, ref) {
    return (
      <div
        ref={ref}
        className={cx('flex flex-col', className)}
        data-component="activity-feed"
        role="list"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="gds-pad-x gds-pad-y-sm flex items-start gap-3"
            role="listitem"
          >
            <Avatar name={item.user} src={item.avatar} size="sm" />
            <div className="min-w-0 flex-1">
              <div className="gds-text-body">
                <span className="text-fg font-medium">{item.user}</span>
                <span className="text-fg-muted"> {item.action}</span>
                {item.target !== undefined && (
                  <span className="text-fg font-medium"> {item.target}</span>
                )}
              </div>
              <div className="gds-text-caption text-fg-muted mt-0.5">
                {item.timestamp}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
)

export type { ActivityFeedItem, ActivityFeedProps }
