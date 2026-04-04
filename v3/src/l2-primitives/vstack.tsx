import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type VStackProps = React.HTMLAttributes<HTMLDivElement> & {
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'
  wrap?: boolean
}

const GAP_MAP = { xs: 'gap-1', sm: 'gap-1.5', md: 'gap-2', lg: 'gap-3', xl: 'gap-4' }
const ALIGN_MAP = { start: 'items-start', center: 'items-center', end: 'items-end', stretch: 'items-stretch', baseline: 'items-baseline' }
const JUSTIFY_MAP = { start: 'justify-start', center: 'justify-center', end: 'justify-end', between: 'justify-between', around: 'justify-around' }

const VStack = forwardRef<HTMLDivElement, VStackProps>(
  function VStack({ gap = 'md', align = 'stretch', justify, wrap, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cx(
          'flex flex-col',
          GAP_MAP[gap],
          ALIGN_MAP[align],
          justify !== undefined && JUSTIFY_MAP[justify],
          wrap === true && 'flex-wrap',
          className
        )}
        data-component="vstack"
        {...props}
      />
    )
  }
)

export { VStack }
export type { VStackProps }
