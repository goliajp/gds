// grid-layout — responsive grid layout with configurable columns and breakpoints
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type ResponsiveColumns = {
  sm?: number
  md?: number
  lg?: number
  xl?: number
}

type GridGap = 'default' | 'lg' | 'sm'

export type GridLayoutProps = {
  children: ReactNode
  columns?: number | ResponsiveColumns
  gap?: GridGap
  className?: string
}

const gapMap: Record<GridGap, string> = {
  sm: 'gds-gap-sm',
  default: 'gds-gap',
  lg: 'gds-gap-lg',
}

const colClass = (n: number): string => {
  const map: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  }
  return map[n] ?? `grid-cols-${n}`
}

const responsiveColClass = (prefix: string, n: number): string => {
  const map: Record<number, string> = {
    1: `${prefix}:grid-cols-1`,
    2: `${prefix}:grid-cols-2`,
    3: `${prefix}:grid-cols-3`,
    4: `${prefix}:grid-cols-4`,
    5: `${prefix}:grid-cols-5`,
    6: `${prefix}:grid-cols-6`,
  }
  return map[n] ?? `${prefix}:grid-cols-${n}`
}

function buildColumnClasses(columns: number | ResponsiveColumns): string {
  if (typeof columns === 'number') {
    return colClass(columns)
  }

  const parts: string[] = []
  if (columns.sm !== undefined) parts.push(responsiveColClass('sm', columns.sm))
  if (columns.md !== undefined) parts.push(responsiveColClass('md', columns.md))
  if (columns.lg !== undefined) parts.push(responsiveColClass('lg', columns.lg))
  if (columns.xl !== undefined) parts.push(responsiveColClass('xl', columns.xl))

  // add base grid-cols-1 for mobile when using responsive
  if (parts.length > 0) {
    parts.unshift('grid-cols-1')
  }

  return parts.join(' ')
}

export const GridLayout = forwardRef<HTMLDivElement, GridLayoutProps>(
  function GridLayout(
    { children, columns = { sm: 1, md: 2, lg: 3 }, gap = 'default', className },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cx(
          'grid',
          buildColumnClasses(columns),
          gapMap[gap],
          className
        )}
        data-component="grid-layout"
      >
        {children}
      </div>
    )
  }
)
