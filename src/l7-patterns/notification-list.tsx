import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type NotificationEntry = {
  id: string
  message?: string
  read?: boolean
  timestamp: string
  title: string
}

type NotificationListProps = React.HTMLAttributes<HTMLDivElement> & {
  notifications: NotificationEntry[]
  onRead?: (id: string) => void
  onReadAll?: () => void
}

export const NotificationList = forwardRef<HTMLDivElement, NotificationListProps>(
  function NotificationList({ className, notifications, onRead, onReadAll, ...props }, ref) {
    return (
      <div
        className={cx('gds-ctx gds-radius-card border border-border bg-surface', className)}
        data-component="notification-list"
        ref={ref}
        {...props}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <span className="text-sm font-semibold text-fg">Notifications</span>
          {onReadAll !== undefined && (
            <button className="text-xs text-accent hover:underline" onClick={onReadAll} type="button">
              Mark all read
            </button>
          )}
        </div>
        {notifications.length === 0 ? (
          <div className="px-4 py-6 text-center text-xs text-fg-muted">No notifications</div>
        ) : (
          <div className="divide-y divide-border">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={cx(
                  'flex gap-3 px-4 py-2.5',
                  n.read !== true && 'border-l-2 border-l-accent',
                  onRead !== undefined && 'cursor-pointer hover:bg-bg-tertiary',
                )}
                onClick={onRead !== undefined ? () => onRead(n.id) : undefined}
              >
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium text-fg">{n.title}</div>
                  {n.message !== undefined && (
                    <div className="mt-0.5 text-xs text-fg-muted">{n.message}</div>
                  )}
                  <div className="mt-1 text-[10px] text-fg-muted">{n.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  },
)

export type { NotificationEntry, NotificationListProps }
