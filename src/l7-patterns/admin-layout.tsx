// admin-layout — full admin application layout with sidebar + topbar + content
// supports mobile responsive drawer mode via Sheet
import type { ReactNode } from 'react'
import { forwardRef, useState } from 'react'

import { Sheet } from '../l4-molecules/sheet'
import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { useIsMobile } from '../utils/hooks'

type AdminLayoutProps = {
  sidebar: ReactNode
  topbar?: ReactNode
  children: ReactNode
  sidebarWidth?: number
  sidebarCollapsible?: boolean
  sidebarDefaultCollapsed?: boolean
  mobileDrawer?: boolean
  topbarHeight?: number
  topbarSticky?: boolean
  logo?: ReactNode
  className?: string
}

// simple 3-line hamburger icon — no lucide dependency in L7
function HamburgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M3 5h14M3 10h14M3 15h14" />
    </svg>
  )
}

// collapse/expand chevron icon
function CollapseIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cx('transition-transform duration-200', collapsed && 'rotate-180')}
    >
      <path d="M10 3L5 8l5 5" />
    </svg>
  )
}

const AdminLayout = forwardRef<HTMLDivElement, AdminLayoutProps>(
  function AdminLayout({
    sidebar,
    topbar,
    children,
    sidebarWidth = 240,
    sidebarCollapsible = true,
    sidebarDefaultCollapsed = false,
    mobileDrawer = true,
    topbarHeight = 48,
    topbarSticky = true,
    logo,
    className,
  }, ref) {
    const isMobile = useIsMobile()
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [collapsed, setCollapsed] = useState(sidebarDefaultCollapsed)

    const showMobileDrawer = mobileDrawer && isMobile
    const effectiveSidebarWidth = collapsed ? 56 : sidebarWidth

    return (
      <div ref={ref} className={cx('flex h-screen min-h-0 bg-bg', className)} data-component="admin-layout">
        {/* desktop sidebar */}
        {!showMobileDrawer && (
          <aside
            className="relative shrink-0 overflow-y-auto border-r border-border bg-surface transition-[width] duration-200"
            style={{ width: effectiveSidebarWidth }}
          >
            {logo !== undefined && (
              <div className="flex items-center border-b border-border px-3" style={{ height: topbarHeight }}>
                {logo}
              </div>
            )}
            <div className={cx(collapsed && 'overflow-hidden')}>
              {sidebar}
            </div>
            {sidebarCollapsible && (
              <button
                type="button"
                onClick={() => setCollapsed((prev) => !prev)}
                className={cx(
                  'absolute bottom-3 right-2 flex h-6 w-6 items-center justify-center rounded-md text-fg-muted hover:text-fg hover:bg-surface-hover',
                  focusCls,
                )}
                aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                <CollapseIcon collapsed={collapsed} />
              </button>
            )}
          </aside>
        )}

        {/* mobile drawer */}
        {showMobileDrawer && (
          <Sheet
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            side="left"
            width={sidebarWidth}
          >
            {logo !== undefined && (
              <div className="mb-2">{logo}</div>
            )}
            {sidebar}
          </Sheet>
        )}

        <div className="flex flex-1 flex-col min-w-0">
          {/* topbar — always render if mobile (for hamburger), or if topbar content provided */}
          {(topbar !== undefined || showMobileDrawer) && (
            <header
              className={cx(
                'z-10 shrink-0 flex items-center border-b border-border bg-surface/80 backdrop-blur-sm',
                topbarSticky && 'sticky top-0',
              )}
              style={{ height: topbarHeight }}
            >
              {showMobileDrawer && (
                <button
                  type="button"
                  onClick={() => setDrawerOpen(true)}
                  className={cx(
                    'ml-2 flex h-9 w-9 items-center justify-center rounded-md text-fg-muted hover:text-fg hover:bg-surface-hover',
                    focusCls,
                  )}
                  aria-label="Open sidebar menu"
                  data-testid="admin-layout-hamburger"
                >
                  <HamburgerIcon />
                </button>
              )}
              {topbar !== undefined && <div className="flex-1 min-w-0">{topbar}</div>}
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
