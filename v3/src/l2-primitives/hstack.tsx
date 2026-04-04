import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type HStackProps = React.HTMLAttributes<HTMLDivElement> & {
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'
  wrap?: boolean
}

const GAP_MAP = { xs: 'gap-1', sm: 'gap-1.5', md: 'gap-2', lg: 'gap-3', xl: 'gap-4' }
const ALIGN_MAP = { start: 'items-start', center: 'items-center', end: 'items-end', stretch: 'items-stretch', baseline: 'items-baseline' }
const JUSTIFY_MAP = { start: 'justify-start', center: 'justify-center', end: 'justify-end', between: 'justify-between', around: 'justify-around' }

const HStack = forwardRef<HTMLDivElement, HStackProps>(
  function HStack({ gap = 'md', align = 'center', justify, wrap, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cx(
          'flex',
          GAP_MAP[gap],
          ALIGN_MAP[align],
          justify !== undefined && JUSTIFY_MAP[justify],
          wrap === true && 'flex-wrap',
          className
        )}
        data-component="hstack"
        {...props}
      />
    )
  }
)

export { HStack }
export type { HStackProps }
