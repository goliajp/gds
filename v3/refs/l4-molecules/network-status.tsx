// network-status — connection status indicator
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type NetworkStatusValue = 'offline' | 'online' | 'slow'

export type NetworkStatusProps = {
  className?: string
  status: NetworkStatusValue
}

const statusConfig: Record<
  NetworkStatusValue,
  { color: string; label: string }
> = {
  online: { color: 'bg-success', label: 'Online' },
  offline: { color: 'bg-danger', label: 'Offline' },
  slow: { color: 'bg-warning', label: 'Slow' },
}

export const NetworkStatus = forwardRef<HTMLDivElement, NetworkStatusProps>(
  function NetworkStatus({ className, status }, ref) {
    const config = statusConfig[status]

    return (
      <div
        ref={ref}
        className={cx('gds-gap-sm flex items-center', className)}
        data-component="network-status"
        data-state={status}
      >
        <span
          className={cx(
            'inline-block h-2 w-2 shrink-0 rounded-full',
            config.color
          )}
        />
        <span className="gds-text text-fg-muted">{config.label}</span>
      </div>
    )
  }
)
