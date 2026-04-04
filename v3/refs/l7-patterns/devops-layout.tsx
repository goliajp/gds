import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type DevOpsTab = { id: string; label: string }

type DevOpsLayoutProps = React.HTMLAttributes<HTMLDivElement> & {
  activeTab: string
  children: ReactNode
  onTabChange: (id: string) => void
  statusBar?: ReactNode
  tabs: DevOpsTab[]
}

export const DevOpsLayout = forwardRef<HTMLDivElement, DevOpsLayoutProps>(
  function DevOpsLayout(
    { activeTab, children, className, onTabChange, statusBar, tabs, ...props },
    ref
  ) {
    return (
      <div
        className={cx('flex h-full flex-col', className)}
        data-component="devops-layout"
        ref={ref}
        {...props}
      >
        <div className="border-border flex items-center gap-1 border-b px-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={cx(
                'gds-text-label px-3 py-2 font-medium transition-colors',
                tab.id === activeTab
                  ? 'border-accent text-accent border-b-2'
                  : 'text-fg-muted hover:text-fg'
              )}
              onClick={() => onTabChange(tab.id)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>
        {statusBar !== undefined && (
          <div className="border-border border-b px-3 py-2">{statusBar}</div>
        )}
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    )
  }
)

export type { DevOpsLayoutProps, DevOpsTab }
