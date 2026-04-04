import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type StatusDotStatus = 'connected' | 'connecting' | 'disconnected'

type StatusDotProps = React.HTMLAttributes<HTMLSpanElement> & {
  label?: string
  status: StatusDotStatus
}

const dotCls: Record<StatusDotStatus, string> = {
  connected: 'bg-success',
  connecting: 'bg-warning animate-pulse',
  disconnected: 'bg-danger',
}

export const StatusDot = forwardRef<HTMLSpanElement, StatusDotProps>(
  function StatusDot({ className, label, status, ...props }, ref) {
    return (
      <span
        className={cx('gds-gap-sm inline-flex items-center', className)}
        data-component="status-dot"
        data-state={status}
        ref={ref}
        {...props}
      >
        <span className={cx('h-2 w-2 shrink-0 rounded-full', dotCls[status])} />
        {label !== undefined && (
          <span className="gds-text-label text-fg-muted">{label}</span>
        )}
      </span>
    )
  }
)

const statusDotVariants = {
  status: dotCls,
} as const

export { statusDotVariants }
export type { StatusDotProps, StatusDotStatus }
