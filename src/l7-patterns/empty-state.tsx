// empty-state — placeholder for sections with no content
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type EmptyStateProps = {
  title: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
  className?: string
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  function EmptyState({ title, description, icon, action, className }, ref) {
    return (
      <div
        ref={ref}
        className={cx(
          'flex flex-col items-center justify-center py-12',
          className
        )}
        data-component="empty-state"
      >
        {icon !== undefined && (
          <div className="text-fg-muted/20 mb-3 flex h-12 w-12 items-center justify-center">
            {icon}
          </div>
        )}
        <p className="gds-text-body text-fg font-medium">{title}</p>
        {description !== undefined && (
          <p className="gds-text-body text-fg-muted mt-1">{description}</p>
        )}
        {action !== undefined && <div className="mt-4">{action}</div>}
      </div>
    )
  }
)
