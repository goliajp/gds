// list-item — structured list row with icon, title, description, and trailing element
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type ListItemProps = {
  icon?: ReactNode
  title: string
  description?: string
  trailing?: ReactNode
  onClick?: () => void
  active?: boolean
  disabled?: boolean
  className?: string
}

export const ListItem = forwardRef<HTMLDivElement, ListItemProps>(
  function ListItem({ icon, title, description, trailing, onClick, active, disabled, className }, ref) {
    const isClickable = onClick !== undefined && disabled !== true

    return (
      <div
        ref={ref}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onClick={isClickable ? onClick : undefined}
        onKeyDown={isClickable ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onClick()
          }
        } : undefined}
        className={cx(
          'flex items-center gap-3 gds-pad-x gds-pad-y-sm gds-text-body select-none',
          isClickable && 'cursor-pointer hover:bg-bg-tertiary',
          active === true && 'border-l-2 border-l-accent bg-accent/5',
          disabled === true && 'pointer-events-none opacity-50',
          className,
        )}
        data-component="list-item"
        data-state={active === true ? 'active' : undefined}
      >
        {icon !== undefined && <span className="shrink-0 text-fg-muted">{icon}</span>}
        <div className="min-w-0 flex-1">
          <div className="font-medium text-fg">{title}</div>
          {description !== undefined && (
            <div className="mt-0.5 text-fg-muted gds-text-caption">{description}</div>
          )}
        </div>
        {trailing !== undefined && <span className="shrink-0">{trailing}</span>}
      </div>
    )
  },
)
