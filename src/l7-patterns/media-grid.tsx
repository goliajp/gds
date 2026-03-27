// media-grid — responsive image/media grid layout for galleries
import type { ReactNode } from 'react'
import { Children, forwardRef } from 'react'

import { AspectRatio } from '../l2-primitives/aspect-ratio'
import { cx } from '../utils/cx'

type GridGap = 'default' | 'lg' | 'sm'

type ResponsiveColumns = {
  lg?: number
  md?: number
  sm?: number
}

export type MediaGridProps = {
  aspectRatio?: number
  children: ReactNode
  className?: string
  columns?: number | ResponsiveColumns
  gap?: GridGap
}

const gapMap: Record<GridGap, string> = {
  default: 'gds-gap',
  lg: 'gds-gap-lg',
  sm: 'gds-gap-sm',
}

function buildCols(columns: number | ResponsiveColumns): string {
  if (typeof columns === 'number') {
    return `grid-cols-${columns}`
  }
  const parts = ['grid-cols-1']
  if (columns.sm !== undefined) parts.push(`sm:grid-cols-${columns.sm}`)
  if (columns.md !== undefined) parts.push(`md:grid-cols-${columns.md}`)
  if (columns.lg !== undefined) parts.push(`lg:grid-cols-${columns.lg}`)
  return parts.join(' ')
}

export const MediaGrid = forwardRef<HTMLDivElement, MediaGridProps>(
  function MediaGrid(
    { aspectRatio = 1, children, className, columns = { sm: 2, md: 3, lg: 4 }, gap = 'default' },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cx('grid', buildCols(columns), gapMap[gap], className)}
        data-component="media-grid"
      >
        {Children.map(children, (child) => (
          <AspectRatio ratio={aspectRatio} className="overflow-hidden rounded-lg">
            {child}
          </AspectRatio>
        ))}
      </div>
    )
  },
)
