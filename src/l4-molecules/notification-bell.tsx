// notification-bell — icon button with unread count badge
import { forwardRef } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'

export type NotificationBellProps = {
  unread: number
  onClick: () => void
  className?: string
}

export const NotificationBell = forwardRef<HTMLButtonElement, NotificationBellProps>(
  function NotificationBell({ unread, onClick, className }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        className={cx(
          'relative inline-flex h-8 w-8 items-center justify-center gds-radius-button text-fg-muted transition-colors select-none hover:bg-bg-tertiary hover:text-fg',
          focusCls,
          className,
        )}
        data-component="notification-bell"
        onClick={onClick}
        aria-label={`Notifications${unread > 0 ? ` (${unread} unread)` : ''}`}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cx(unread > 0 && 'animate-pulse')}
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-medium text-white">
            {unread > 99 ? '99+' : unread}
          </span>
        )}
      </button>
    )
  },
)
