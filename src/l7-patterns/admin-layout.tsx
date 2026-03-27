// admin-layout — full admin application layout with sidebar + topbar + content
import type { ReactNode } from 'react'

import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type AdminLayoutProps = {
  sidebar: ReactNode
  topbar?: ReactNode
  children: ReactNode
  sidebarWidth?: number
  className?: string
}

const AdminLayout = forwardRef<HTMLDivElement, AdminLayoutProps>(
  function AdminLayout({ sidebar, topbar, children, sidebarWidth = 240, className }, ref) {
    return (
      <div ref={ref} className={cx('flex h-screen min-h-0 bg-bg', className)} data-component="admin-layout">
        <aside className="shrink-0 overflow-y-auto border-r border-border bg-surface" style={{ width: sidebarWidth }}>
          {sidebar}
        </aside>
        <div className="flex flex-1 flex-col min-w-0">
          {topbar !== undefined && (
            <header className="sticky top-0 z-10 shrink-0 border-b border-border bg-surface/80 backdrop-blur-sm">
              {topbar}
            </header>
          )}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    )
  },
)

export { AdminLayout }
export type { AdminLayoutProps }
