import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type ToolbarGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

export const ToolbarGroup = forwardRef<HTMLDivElement, ToolbarGroupProps>(
  function ToolbarGroup({ children, className, ...props }, ref) {
    return (
      <div
        className={cx(
          'border-border inline-flex items-center overflow-hidden rounded-md border',
          '[&>*]:border-border [&>*]:rounded-none [&>*]:border-0 [&>*]:border-r [&>*:last-child]:border-r-0',
          className
        )}
        data-component="toolbar-group"
        ref={ref}
        role="toolbar"
        {...props}
      >
        {children}
      </div>
    )
  }
)

export type { ToolbarGroupProps }
