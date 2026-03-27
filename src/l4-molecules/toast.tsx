// toast — notification card with variant, title, description, and action
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'

export type ToastVariant = 'danger' | 'default' | 'success' | 'warning'

const borderColorMap: Record<ToastVariant, string> = {
  default: 'border-l-accent',
  success: 'border-l-success',
  warning: 'border-l-warning',
  danger: 'border-l-danger',
}

const iconMap: Record<ToastVariant, ReactNode> = {
  default: (
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

const iconColorMap: Record<ToastVariant, string> = {
  default: 'text-accent',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
}

export type ToastProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string
  description?: string
  variant?: ToastVariant
  onClose?: () => void
  action?: ReactNode
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  function Toast({ title, description, variant = 'default', onClose, action, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cx(
          'flex items-start gds-gap gds-radius-popover border border-border border-l-4 bg-surface gds-pad-x gds-pad-y gds-shadow-lg',
          borderColorMap[variant],
          className,
        )}
        data-component="toast"
        data-variant={variant}
        role="status"
        {...props}
      >
        <span className={cx('mt-px shrink-0', iconColorMap[variant])}>{iconMap[variant]}</span>
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
