// responsive-stack — column-to-row layout that switches at a breakpoint
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type ResponsiveStackProps = {
  children: ReactNode
  breakpoint?: 'sm' | 'md' | 'lg'
  gap?: 'sm' | 'default' | 'lg'
  align?: 'start' | 'center' | 'end' | 'stretch'
  className?: string
}

const breakpointMap = {
  sm: 'sm:flex-row',
  md: 'md:flex-row',
  lg: 'lg:flex-row',
} as const

const gapMap = {
  sm: 'gap-2',
  default: 'gap-4',
  lg: 'gap-6',
} as const

const alignMap = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
} as const

export const ResponsiveStack = forwardRef<HTMLDivElement, ResponsiveStackProps>(
  function ResponsiveStack(
    {
      children,
      breakpoint = 'md',
      gap = 'default',
      align = 'stretch',
      className,
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cx(
          'flex flex-col',
          breakpointMap[breakpoint],
          gapMap[gap],
          alignMap[align],
          className
        )}
        data-component="responsive-stack"
      >
        {children}
      </div>
    )
  }
)
