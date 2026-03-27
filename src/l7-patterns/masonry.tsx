// masonry — CSS columns-based masonry layout
import type { CSSProperties, ReactNode } from 'react'
import { Children, forwardRef } from 'react'

import { cx } from '../utils/cx'

export type MasonryProps = {
  children: ReactNode
  columns?: number
  gap?: number
  className?: string
}

export const Masonry = forwardRef<HTMLDivElement, MasonryProps>(
  function Masonry({ children, columns = 3, gap = 16, className }, ref) {
    const containerStyle: CSSProperties = {
      columnCount: columns,
      columnGap: `${gap}px`,
    }

    const itemStyle: CSSProperties = {
      breakInside: 'avoid',
      marginBottom: `${gap}px`,
    }

    return (
      <div
        ref={ref}
        className={cx(className)}
        style={containerStyle}
        data-component="masonry"
      >
        {Children.map(children, (child) => {
          if (child === null || child === undefined) return null
          return (
            <div style={itemStyle}>
              {child}
            </div>
          )
        })}
      </div>
    )
  },
)
