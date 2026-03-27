// sidebar — collapsible navigation panel
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

export type SidebarProps = {
  children: ReactNode
  collapsed?: boolean
  onCollapse?: (collapsed: boolean) => void
  width?: number
  collapsedWidth?: number
  position?: 'left' | 'right'
  glass?: boolean
  className?: string
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
    },
    ref,
  ) {
    const currentWidth = collapsed ? collapsedWidth : width

    return (
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
        <div className="flex-1 overflow-hidden">{children}</div>
        {onCollapse !== undefined && (
          <button
            className="flex h-10 items-center justify-center border-t border-border/50 text-fg-muted hover:text-fg transition-colors"
            type="button"
            onClick={() => onCollapse(!collapsed)}
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
    )
  },
)
