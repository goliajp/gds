// notification — persistent banner with variant, title, description, and action
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

type NotificationVariant = 'danger' | 'info' | 'success' | 'warning'

const borderColorMap: Record<NotificationVariant, string> = {
  info: 'border-l-accent',
  success: 'border-l-success',
  warning: 'border-l-warning',
  danger: 'border-l-danger',
}

const bgColorMap: Record<NotificationVariant, string> = {
  info: 'bg-accent/5',
  success: 'bg-success/5',
  warning: 'bg-warning/5',
  danger: 'bg-danger/5',
}

const iconColorMap: Record<NotificationVariant, string> = {
  info: 'text-accent',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
}

const iconMap: Record<NotificationVariant, ReactNode> = {
  info: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="8" cy="8" r="6.5" /><path d="M8 5.5h.01M8 7.5v3" />
    </svg>
  ),
  success: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="6.5" /><path d="M5.5 8l2 2 3-3.5" />
    </svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M7.13 2.5l-5.5 10h11l-5.5-10z" /><path d="M7.63 6.5v2.5M7.63 11h.01" />
    </svg>
  ),
  danger: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="8" cy="8" r="6.5" /><path d="M5.5 5.5l5 5M10.5 5.5l-5 5" />
    </svg>
  ),
}

type NotificationProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string
  description?: string
  variant?: NotificationVariant
  action?: ReactNode
  onClose?: () => void
  glass?: boolean
}

const Notification = forwardRef<HTMLDivElement, NotificationProps>(
  function Notification({ title, description, variant = 'info', action, onClose, glass, className, ...props }, ref) {
    const v = variant ?? 'info'

    return (
      <div
        ref={ref}
        className={cx(
          'flex w-full items-start gds-gap gds-radius-popover border border-border border-l-2 gds-pad-x gds-pad-y',
          borderColorMap[v],
          bgColorMap[v],
          glass === true && glassClass(glass),
          className,
        )}
        data-component="notification"
        data-variant={v}
        role="alert"
        {...props}
      >
        <span className={cx('mt-px shrink-0', iconColorMap[v])}>{iconMap[v]}</span>
        <div className="min-w-0 flex-1">
          <p className="gds-text-body font-medium text-fg">{title}</p>
          {description !== undefined && <p className="mt-0.5 gds-text-label text-fg-muted">{description}</p>}
        </div>
        {action !== undefined && <div className="shrink-0">{action}</div>}
        {onClose !== undefined && (
          <button
            type="button"
            onClick={onClose}
            className={cx('shrink-0 gds-radius-button p-0.5 text-fg-muted opacity-60 hover:opacity-100', focusCls)}
            aria-label="Dismiss"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M2 2l8 8M10 2l-8 8" />
            </svg>
          </button>
        )}
      </div>
    )
  },
)

export { Notification }
export type { NotificationProps, NotificationVariant }
