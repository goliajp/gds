// masonry-grid — CSS column-based masonry layout
import type { ReactNode } from 'react'
import { Children, forwardRef } from 'react'

import { cx } from '../utils/cx'

export type MasonryGridProps = {
  children: ReactNode
  columns?: number
  gap?: number
  className?: string
}

export const MasonryGrid = forwardRef<HTMLDivElement, MasonryGridProps>(
  function MasonryGrid({ children, columns = 3, gap = 16, className }, ref) {
    return (
      <div
        ref={ref}
        className={cx(className)}
        data-component="masonry-grid"
        style={{ columnCount: columns, columnGap: `${gap}px` }}
      >
        {Children.map(children, (child) => (
          <div style={{ breakInside: 'avoid', marginBottom: `${gap}px` }}>
            {child}
          </div>
        ))}
      </div>
    )
  }
)
