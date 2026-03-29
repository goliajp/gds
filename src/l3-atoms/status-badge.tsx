import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

type StatusType = 'active' | 'draft' | 'error' | 'inactive' | 'pending' | 'warning'

const statusColorMap: Record<StatusType, string> = {
  active: 'bg-success/10 text-success',
  draft: 'bg-fg-muted/10 text-fg-muted',
  error: 'bg-danger/10 text-danger',
  inactive: 'bg-fg-muted/10 text-fg-muted',
  pending: 'bg-warning/10 text-warning',
  warning: 'bg-warning/10 text-warning',
}

type StatusBadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  glass?: boolean
  icon?: ReactNode
  label?: string
  size?: 'default' | 'sm'
  status: StatusType
}

export const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  function StatusBadge(
    { className, glass, icon, label, size = 'default', status, ...props },
    ref,
  ) {
    const displayLabel = label ?? status
    const sizeClasses = size === 'sm' ? 'gds-pad-x-sm py-px gds-text-caption' : 'gds-pad-x-sm gds-pad-y-sm gds-text-body'

    return (
      <span
        className={cx(
          'inline-flex select-none items-center gds-gap-xs gds-radius-badge font-medium',
          sizeClasses,
          statusColorMap[status],
          glassClass(glass),
          glass === true && 'border border-white/10 bg-white/5',
          className,
        )}
        data-component="status-badge"
        data-state={status}
        ref={ref}
        {...props}
      >
        {icon !== undefined && (
          <span className="gds-icon-child-sm">{icon}</span>
        )}
        {displayLabel}
      </span>
    )
  },
)

const statusBadgeVariants = {
  status: statusColorMap,
  size: {
    default: 'gds-pad-x-sm gds-pad-y-sm gds-text-body',
    sm: 'gds-pad-x-sm py-px gds-text-caption',
  },
} as const

export { statusBadgeVariants }
export type { StatusBadgeProps, StatusType }
