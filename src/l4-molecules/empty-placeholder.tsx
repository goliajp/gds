// empty-placeholder — inline empty state for cards/tables (lighter than EmptyState L7)
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type EmptyPlaceholderProps = {
  message: string
  icon?: ReactNode
  action?: ReactNode
  className?: string
}

export const EmptyPlaceholder = forwardRef<HTMLDivElement, EmptyPlaceholderProps>(
  function EmptyPlaceholder({ message, icon, action, className }, ref) {
    return (
      <div
        ref={ref}
        className={cx('flex flex-col items-center justify-center gap-2 py-6 select-none', className)}
        data-component="empty-placeholder"
      >
        {icon !== undefined && <div className="text-fg-muted/30">{icon}</div>}
        <p className="gds-text-body text-fg-muted">{message}</p>
        {action !== undefined && <div className="mt-1">{action}</div>}
      </div>
    )
  },
)
