// toolbar-generic — horizontal toolbar container with optional floating variant
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

export type ToolbarGenericProps = {
  children: ReactNode
  variant?: 'default' | 'floating'
  glass?: boolean
  className?: string
}

export const ToolbarGeneric = forwardRef<HTMLDivElement, ToolbarGenericProps>(
  function ToolbarGeneric(
    { children, variant = 'default', glass, className },
    ref
  ) {
    const variantCls =
      variant === 'floating'
        ? 'gds-radius border border-border bg-surface shadow-md'
        : 'border-b border-border bg-bg'

    return (
      <div
        ref={ref}
        className={cx(
          'gds-gap flex items-center px-3 py-2 select-none',
          variantCls,
          glass === true && glassClass(glass),
          className
        )}
        data-component="toolbar-generic"
        data-variant={variant}
        role="toolbar"
      >
        {children}
      </div>
    )
  }
)

export const ToolbarSeparator = forwardRef<HTMLDivElement>(
  function ToolbarSeparator(_props, ref) {
    return (
      <div
        ref={ref}
        className="bg-border/50 h-4 w-px"
        data-component="toolbar-separator"
      />
    )
  }
)
