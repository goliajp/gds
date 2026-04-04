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
  function DashboardLayout(
    { sidebar, header, children, sidebarWidth = 240, className },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cx('bg-bg flex h-full min-h-0', className)}
        data-component="dashboard-layout"
      >
        <aside
          className="border-border bg-surface shrink-0 overflow-y-auto border-r"
          style={{ width: sidebarWidth }}
        >
          {sidebar}
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          {header !== undefined && (
            <header className="border-border bg-surface/80 sticky top-0 z-10 shrink-0 border-b backdrop-blur-sm">
              {header}
            </header>
          )}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    )
  }
)

export { DashboardLayout }
export type { DashboardLayoutProps }
