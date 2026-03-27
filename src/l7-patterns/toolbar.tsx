// toolbar — horizontal toolbar with icon buttons, separators, and groups
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

type ToolbarPosition = 'bottom' | 'floating' | 'top'

export type ToolbarProps = React.HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  glass?: boolean
  position?: ToolbarPosition
}

export const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(
  function Toolbar(
    { children, className, glass, position = 'top', ...props },
    ref,
  ) {
    const isFloating = position === 'floating'
    const resolvedGlass = glass ?? isFloating

    return (
      <div
        ref={ref}
        className={cx(
          'flex items-center gds-gap-sm gds-pad-x gds-pad-y-sm',
          position === 'top' && 'border-b border-border',
          position === 'bottom' && 'border-t border-border',
          isFloating && 'rounded-full gds-shadow-lg',
          resolvedGlass === true
            ? cx(glassClass(resolvedGlass), 'border-white/10 bg-bg/60')
            : !isFloating && 'bg-surface',
          isFloating && resolvedGlass !== true && 'border border-border bg-surface',
          className,
        )}
        data-component="toolbar"
        data-position={position}
        role="toolbar"
        {...props}
      >
        {children}
      </div>
    )
  },
)
