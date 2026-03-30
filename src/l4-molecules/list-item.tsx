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
  function ListItem(
    {
      icon,
      title,
      description,
      trailing,
      onClick,
      active,
      disabled,
      className,
    },
    ref
  ) {
    const isClickable = onClick !== undefined && disabled !== true

    return (
      <div
        ref={ref}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onClick={isClickable ? onClick : undefined}
        onKeyDown={
          isClickable
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onClick()
                }
              }
            : undefined
        }
        className={cx(
          'gds-pad-x gds-pad-y-sm gds-text-body flex items-center gap-3 select-none',
          isClickable && 'hover:bg-bg-tertiary cursor-pointer',
          active === true && 'border-l-accent bg-accent/5 border-l-2',
          disabled === true && 'pointer-events-none opacity-50',
          className
        )}
        data-component="list-item"
        data-state={active === true ? 'active' : undefined}
      >
        {icon !== undefined && (
          <span className="text-fg-muted shrink-0">{icon}</span>
        )}
        <div className="min-w-0 flex-1">
          <div className="text-fg font-medium">{title}</div>
          {description !== undefined && (
            <div className="text-fg-muted gds-text-caption mt-0.5">
              {description}
            </div>
          )}
        </div>
        {trailing !== undefined && <span className="shrink-0">{trailing}</span>}
      </div>
    )
  }
)
