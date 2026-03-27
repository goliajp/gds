// stat-grid — responsive grid layout for metric cards and stat widgets
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

const colsMap = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
} as const

export type StatGridProps = {
  children: ReactNode
  columns?: 2 | 3 | 4
  className?: string
}

export const StatGrid = forwardRef<HTMLDivElement, StatGridProps>(
  function StatGrid({ children, columns = 3, className }, ref) {
    return (
      <div
        ref={ref}
        className={cx('grid gds-gap-lg', colsMap[columns], className)}
        data-component="stat-grid"
      >
        {children}
      </div>
    )
  },
)
