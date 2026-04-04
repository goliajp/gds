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

export const NotificationList = forwardRef<
  HTMLDivElement,
  NotificationListProps
>(function NotificationList(
  { className, notifications, onRead, onReadAll, ...props },
  ref
) {
  return (
    <div
      className={cx(
        'gds-ctx gds-radius-card border-border bg-surface border',
        className
      )}
      data-component="notification-list"
      ref={ref}
      {...props}
    >
      <div className="border-border flex items-center justify-between border-b px-4 py-2.5">
        <span className="text-fg text-sm font-semibold">Notifications</span>
        {onReadAll !== undefined && (
          <button
            className="text-accent text-xs hover:underline"
            onClick={onReadAll}
            type="button"
          >
            Mark all read
          </button>
        )}
      </div>
      {notifications.length === 0 ? (
        <div className="text-fg-muted px-4 py-6 text-center text-xs">
          No notifications
        </div>
      ) : (
        <div className="divide-border divide-y">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={cx(
                'flex gap-3 px-4 py-2.5',
                n.read !== true && 'border-l-accent border-l-2',
                onRead !== undefined && 'hover:bg-bg-tertiary cursor-pointer'
              )}
              onClick={onRead !== undefined ? () => onRead(n.id) : undefined}
            >
              <div className="min-w-0 flex-1">
                <div className="text-fg text-xs font-medium">{n.title}</div>
                {n.message !== undefined && (
                  <div className="text-fg-muted mt-0.5 text-xs">
                    {n.message}
                  </div>
                )}
                <div className="text-fg-muted mt-1 text-[10px]">
                  {n.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
})

export type { NotificationEntry, NotificationListProps }
