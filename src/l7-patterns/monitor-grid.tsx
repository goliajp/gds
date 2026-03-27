// monitor-grid — responsive grid layout for service/server monitoring cards
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type MonitorGridProps = {
  children: ReactNode
  columns?: number
  className?: string
}

export const MonitorGrid = forwardRef<HTMLDivElement, MonitorGridProps>(
  function MonitorGrid({ children, columns, className }, ref) {
    return (
      <div
        ref={ref}
        className={cx(
          'grid gds-gap',
          columns !== undefined
            ? `grid-cols-${columns}`
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
          className,
        )}
        data-component="monitor-grid"
      >
        {children}
      </div>
    )
  },
)
