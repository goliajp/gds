import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type OnlineIndicatorProps = React.HTMLAttributes<HTMLSpanElement> & {
  label?: string
  online: boolean
}

export const OnlineIndicator = forwardRef<HTMLSpanElement, OnlineIndicatorProps>(
  function OnlineIndicator({ className, label, online, ...props }, ref) {
    const dotCls = online ? 'bg-success' : 'bg-fg-muted/40'
    const text = label ?? (online ? 'Online' : 'Offline')

    return (
      <span
        className={cx('inline-flex items-center gds-gap-sm', className)}
        data-component="online-indicator"
        ref={ref}
        {...props}
      >
        <span className={cx('h-2 w-2 shrink-0 rounded-full', dotCls)} />
        <span className="gds-text-label text-fg-muted">{text}</span>
      </span>
    )
  },
)

export type { OnlineIndicatorProps }
