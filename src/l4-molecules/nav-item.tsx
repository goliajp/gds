// nav-item — sidebar navigation item with icon, label, and optional badge
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type NavItemProps = {
  icon?: ReactNode
  label: string
  active?: boolean
  badge?: number
  onClick?: () => void
  collapsed?: boolean
  className?: string
}

const NavItem = forwardRef<HTMLButtonElement, NavItemProps>(function NavItem(
  { icon, label, active, badge, onClick, collapsed, className },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      title={collapsed === true ? label : undefined}
      className={cx(
        'gds-pad-x gds-pad-y-sm gds-text-body relative flex w-full items-center gap-3 select-none',
        'hover:bg-bg-tertiary transition-colors',
        active === true && 'bg-accent/10 text-accent font-medium',
        active !== true && 'text-fg-muted',
        collapsed === true && 'justify-center',
        className
      )}
      data-component="nav-item"
      data-state={active === true ? 'active' : undefined}
    >
      {icon !== undefined && <span className="shrink-0">{icon}</span>}
      {collapsed !== true && (
        <span className="flex-1 truncate text-left">{label}</span>
      )}
      {badge !== undefined && badge > 0 && (
        <span className="bg-accent text-accent-fg inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </button>
  )
})

export { NavItem }
export type { NavItemProps }
