// notification-center — notification list panel with dismiss and clear
import { forwardRef } from 'react'

import { Notification } from '../l4-molecules/notification'
import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

type NotificationItem = {
  id: string
  message?: string
  timestamp?: string
  title: string
  variant?: 'danger' | 'info' | 'success' | 'warning'
}

export type NotificationCenterProps = React.HTMLAttributes<HTMLDivElement> & {
  emptyMessage?: string
  glass?: boolean
  notifications: NotificationItem[]
  onClear?: () => void
  onClose?: (id: string) => void
}

export const NotificationCenter = forwardRef<HTMLDivElement, NotificationCenterProps>(
  function NotificationCenter(
    {
      className,
      emptyMessage = 'No notifications',
      glass,
      notifications,
      onClear,
      onClose,
      ...props
    },
    ref,
  ) {
    const hasItems = notifications.length > 0

    return (
      <div
        ref={ref}
        className={cx(
          'flex flex-col gds-radius-popover border border-border',
          glass === true ? cx(glassClass(glass), 'border-white/10 bg-bg/60') : 'bg-surface',
          className,
        )}
        data-component="notification-center"
        {...props}
      >
        <div className="flex items-center justify-between border-b border-border gds-pad-x gds-pad-y-sm">
          <span className="gds-text-body font-medium text-fg select-none">Notifications</span>
          {hasItems && onClear !== undefined && (
            <button
              type="button"
              onClick={onClear}
              className={cx('gds-text-label text-accent hover:text-accent-hover', focusCls)}
            >
              Clear all
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          {hasItems ? (
            <div className="flex flex-col gds-gap-sm gds-pad">
              {notifications.map((n) => (
                <Notification
                  key={n.id}
                  title={n.title}
                  description={n.message}
                  variant={n.variant ?? 'info'}
                  onClose={onClose !== undefined ? () => onClose(n.id) : undefined}
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center gds-pad-lg">
              <span className="gds-text-label text-fg-muted">{emptyMessage}</span>
            </div>
          )}
        </div>
      </div>
    )
  },
)

export type { NotificationItem }
