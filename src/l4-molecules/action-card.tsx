import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type ActionCardProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> & {
  description?: string
  icon?: ReactNode
  onClick: () => void
  title: string
}

export const ActionCard = forwardRef<HTMLDivElement, ActionCardProps>(
  function ActionCard(
    { className, description, icon, onClick, title, ...props },
    ref
  ) {
    return (
      <div
        className={cx(
          'gds-gap gds-pad gds-radius flex cursor-pointer items-center',
          'border-border bg-surface hover:bg-surface-hover border transition-colors',
          className
        )}
        data-component="action-card"
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onClick()
          }
        }}
        ref={ref}
        role="button"
        tabIndex={0}
        {...props}
      >
        {icon !== undefined && (
          <span className="text-accent shrink-0">{icon}</span>
        )}
        <div className="flex flex-col gap-0.5">
          <span className="text-fg text-sm font-medium">{title}</span>
          {description !== undefined && (
            <span className="text-fg-muted text-xs">{description}</span>
          )}
        </div>
      </div>
    )
  }
)

export type { ActionCardProps }
