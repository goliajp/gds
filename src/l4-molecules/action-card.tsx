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
  function ActionCard({ className, description, icon, onClick, title, ...props }, ref) {
    return (
      <div
        className={cx(
          'flex cursor-pointer items-center gds-gap gds-pad gds-radius',
          'border border-border bg-surface transition-colors hover:bg-surface-hover',
          className,
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
        {icon !== undefined && <span className="shrink-0 text-accent">{icon}</span>}
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium text-fg">{title}</span>
          {description !== undefined && <span className="text-xs text-fg-muted">{description}</span>}
        </div>
      </div>
    )
  },
)

export type { ActionCardProps }
