// app-shell — root application layout with sidebar, content, status bar, and mobile nav
// the outermost frame for mailrs-style applications
// desktop: sidebar + content + optional status bar
// mobile: content + bottom nav, sidebar hidden

import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'
import { useIsMobile } from '../utils/hooks'

export type AppShellProps = React.HTMLAttributes<HTMLDivElement> & {
  /** sidebar slot (left or right) */
  sidebar?: ReactNode
  /** main content area */
  children: ReactNode
  /** bottom status bar (hidden on mobile) */
  statusBar?: ReactNode
  /** bottom navigation on mobile (hidden on desktop) */
  mobileNav?: ReactNode

  /** sidebar width in px, default 56 (icon-only like mailrs) */
  sidebarWidth?: number
  /** sidebar position */
  sidebarPosition?: 'left' | 'right'

  /** add padding around content, default true */
  padded?: boolean
  /** gap between sidebar and content in px, default 0 */
  gap?: number

  /** frosted glass effect */
  glass?: boolean
  className?: string
}

export const AppShell = forwardRef<HTMLDivElement, AppShellProps>(
  function AppShell(
    {
      sidebar,
      children,
      statusBar,
      mobileNav,
      sidebarWidth = 56,
      sidebarPosition = 'left',
      padded = false,
      gap = 0,
      glass,
      className,
      ...props
    },
    ref
  ) {
    const isMobile = useIsMobile()

    return (
      <div
        {...props}
        ref={ref}
        className={cx(
          'bg-bg fixed inset-0 flex flex-col',
          glassClass(glass),
          className
        )}
        data-component="app-shell"
      >
        {/* main area: sidebar + content */}
        <div
          className={cx(
            'flex min-h-0 flex-1',
            sidebarPosition === 'right' && 'flex-row-reverse'
          )}
          style={gap > 0 ? { gap } : undefined}
        >
          {/* sidebar — hidden on mobile */}
          {sidebar !== undefined && !isMobile && (
            <div
              className="shrink-0 overflow-hidden"
              style={{ width: sidebarWidth }}
            >
              {sidebar}
            </div>
          )}

          {/* content area */}
          <div
            className={cx(
              'flex min-w-0 flex-1 flex-col overflow-hidden',
              padded && 'p-1.5 md:p-1.5'
            )}
          >
            {children}
          </div>
        </div>

        {/* status bar — desktop only */}
        {statusBar !== undefined && !isMobile && (
          <div
            className="border-border bg-bg-secondary shrink-0 border-t"
            data-component="app-shell-status-bar"
          >
            {statusBar}
          </div>
        )}

        {/* mobile nav — bottom, mobile only */}
        {mobileNav !== undefined && isMobile && (
          <div
            className="border-border bg-bg-secondary shrink-0 border-t"
            data-component="app-shell-mobile-nav"
          >
            {mobileNav}
          </div>
        )}
      </div>
    )
  }
)
