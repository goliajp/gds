// dashboard-layout — full page layout with sidebar + header + content
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type DashboardLayoutProps = {
  sidebar: ReactNode
  header?: ReactNode
  children: ReactNode
  sidebarWidth?: number
  className?: string
}

const DashboardLayout = forwardRef<HTMLDivElement, DashboardLayoutProps>(
  function DashboardLayout({ sidebar, header, children, sidebarWidth = 240, className }, ref) {
    return (
      <div ref={ref} className={cx('flex h-full min-h-0 bg-bg', className)} data-component="dashboard-layout">
        <aside className="shrink-0 overflow-y-auto border-r border-border bg-surface" style={{ width: sidebarWidth }}>
          {sidebar}
        </aside>
        <div className="flex flex-1 flex-col min-w-0">
          {header !== undefined && (
            <header className="sticky top-0 z-10 shrink-0 border-b border-border bg-surface/80 backdrop-blur-sm">
              {header}
            </header>
          )}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    )
  },
)

export { DashboardLayout }
export type { DashboardLayoutProps }
