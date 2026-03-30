import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type ScrollAreaProps = React.HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  maxHeight?: number | string
  orientation?: 'both' | 'horizontal' | 'vertical'
}

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  function ScrollArea(
    {
      children,
      className,
      maxHeight,
      orientation = 'vertical',
      style,
      ...props
    },
    ref
  ) {
    return (
      <div
        className={cx(
          orientation === 'vertical' && 'overflow-x-hidden overflow-y-auto',
          orientation === 'horizontal' && 'overflow-x-auto overflow-y-hidden',
          orientation === 'both' && 'overflow-auto',
          className
        )}
        data-component="scroll-area"
        ref={ref}
        style={{
          ...style,
          maxHeight:
            maxHeight !== undefined
              ? typeof maxHeight === 'number'
                ? `${maxHeight}px`
                : maxHeight
              : undefined,
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
)

export type { ScrollAreaProps }
