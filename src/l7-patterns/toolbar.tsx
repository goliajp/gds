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
    ref
  ) {
    const isFloating = position === 'floating'
    const resolvedGlass = glass ?? isFloating

    return (
      <div
        ref={ref}
        className={cx(
          'gds-gap-sm gds-pad-x gds-pad-y-sm flex items-center',
          position === 'top' && 'border-border border-b',
          position === 'bottom' && 'border-border border-t',
          isFloating && 'gds-shadow-lg rounded-full',
          resolvedGlass === true
            ? cx(glassClass(resolvedGlass), 'bg-bg/60 border-white/10')
            : !isFloating && 'bg-surface',
          isFloating &&
            resolvedGlass !== true &&
            'border-border bg-surface border',
          className
        )}
        data-component="toolbar"
        data-position={position}
        role="toolbar"
        {...props}
      >
        {children}
      </div>
    )
  }
)
