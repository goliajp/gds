// sidebar — collapsible navigation panel with item support
import type { ReactNode } from 'react'
import { createContext, forwardRef, useContext, useState } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

// context for sidebar collapsed state — children can react to it
type SidebarContextValue = { collapsed: boolean }
const SidebarContext = createContext<SidebarContextValue>({ collapsed: false })

export type SidebarItemProps = {
  icon: ReactNode
  label: string
  badge?: number | string
  active?: boolean
  onClick?: () => void
  href?: string
  className?: string
}

// sidebar item — shows icon + label when expanded, icon + tooltip when collapsed
export function SidebarItem({ icon, label, badge, active, onClick, href, className }: SidebarItemProps) {
  const { collapsed } = useContext(SidebarContext)
  const [showTooltip, setShowTooltip] = useState(false)

  const content = (
    <>
      <span className="flex h-5 w-5 shrink-0 items-center justify-center">{icon}</span>
      {!collapsed && <span className="flex-1 truncate gds-text-body">{label}</span>}
      {!collapsed && badge !== undefined && (
        <span className="shrink-0 rounded-full bg-accent/15 px-1.5 py-px gds-text-caption font-medium text-accent">
          {badge}
        </span>
      )}
      {collapsed && badge !== undefined && (
        <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-danger" />
      )}
    </>
  )

  const baseCls = cx(
    'relative flex items-center gap-2.5 rounded-md px-2.5 py-2 text-left transition-colors select-none',
    active === true
      ? 'bg-accent/15 text-accent font-medium'
      : 'text-fg-muted hover:bg-white/[0.04] hover:text-fg',
    collapsed && 'justify-center px-0',
    className,
  )

  const tooltipEl = collapsed && showTooltip
    ? (
      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50 whitespace-nowrap rounded-md bg-bg-secondary border border-border px-2.5 py-1 gds-text-label text-fg shadow-lg pointer-events-none">
        {label}
        {badge !== undefined && <span className="ml-1.5 text-accent font-medium">{badge}</span>}
      </div>
    )
    : null

  const hoverHandlers = collapsed
    ? { onMouseEnter: () => setShowTooltip(true), onMouseLeave: () => setShowTooltip(false) }
    : {}

  if (href !== undefined) {
    return (
      <div className="relative" {...hoverHandlers}>
        <a href={href} className={baseCls} data-component="sidebar-item" data-state={active === true ? 'active' : undefined}>
          {content}
        </a>
        {tooltipEl}
      </div>
    )
  }

  return (
    <div className="relative" {...hoverHandlers}>
      <button type="button" onClick={onClick} className={cx(baseCls, 'w-full')} data-component="sidebar-item" data-state={active === true ? 'active' : undefined}>
        {content}
      </button>
      {tooltipEl}
    </div>
  )
}

export type SidebarProps = {
  children: ReactNode
  collapsed?: boolean
  onCollapse?: (collapsed: boolean) => void
  width?: number
  collapsedWidth?: number
  position?: 'left' | 'right'
  glass?: boolean
  className?: string
  /** v2: structured nav items (alternative to children) */
  items?: SidebarItemProps[]
  /** v2: show tooltip on hover when collapsed, default true */
  showTooltipOnCollapse?: boolean
}

export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  function Sidebar(
    {
      children,
      collapsed = false,
      onCollapse,
      width = 240,
      collapsedWidth = 56,
      position = 'left',
      glass,
      className,
      items,
    },
    ref,
  ) {
    const currentWidth = collapsed ? collapsedWidth : width

    return (
      <SidebarContext value={{ collapsed }}>
        <div
          ref={ref}
          className={cx(
            'flex flex-col overflow-hidden transition-[width] duration-200',
            position === 'left' ? 'border-r' : 'border-l',
            glass === true
              ? cx(glassClass(glass), 'border-white/10 bg-bg/60')
              : 'border-border bg-surface',
            className,
          )}
          data-collapsed={collapsed}
          data-component="sidebar"
          style={{ width: currentWidth }}
        >
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {items !== undefined && (
              <nav className="flex flex-col gap-0.5 p-2">
                {items.map(item => (
                  <SidebarItem key={item.label} {...item} />
                ))}
              </nav>
            )}
            {children}
          </div>
          {onCollapse !== undefined && (
            <button
              className="flex h-10 items-center justify-center border-t border-border/50 text-fg-muted hover:text-fg transition-colors"
              type="button"
              onClick={() => onCollapse(!collapsed)}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <svg
                className={cx('transition-transform duration-200', collapsed && 'rotate-180', position === 'right' && 'rotate-180', collapsed && position === 'right' && 'rotate-0')}
                fill="none"
                height="14"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="14"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}
        </div>
      </SidebarContext>
    )
  },
)
