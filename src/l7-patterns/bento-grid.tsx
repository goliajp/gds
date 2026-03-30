// bento-grid — bento box grid layout where items can span multiple rows/columns
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type BentoGap = 'default' | 'lg' | 'sm'

export type BentoGridProps = {
  children: ReactNode
  columns?: number
  gap?: BentoGap
  className?: string
}

const gapMap: Record<BentoGap, string> = {
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

export const BentoGrid = forwardRef<HTMLDivElement, BentoGridProps>(
  function BentoGrid(
    { children, columns = 4, gap = 'default', className },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cx(
          'grid auto-rows-[minmax(120px,auto)]',
          colClass(columns),
          gapMap[gap],
          className
        )}
        data-component="bento-grid"
      >
        {children}
      </div>
    )
  }
)
