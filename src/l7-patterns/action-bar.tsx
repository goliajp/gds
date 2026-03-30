// action-bar — sticky bottom/top action bar for forms and bulk operations
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

type ActionBarPosition = 'bottom' | 'top'
type ActionBarJustify = 'between' | 'center' | 'end' | 'start'

export type ActionBarProps = {
  children: ReactNode
  className?: string
  glass?: boolean
  justify?: ActionBarJustify
  position?: ActionBarPosition
}

const justifyMap: Record<ActionBarJustify, string> = {
  between: 'justify-between',
  center: 'justify-center',
  end: 'justify-end',
  start: 'justify-start',
}

export const ActionBar = forwardRef<HTMLDivElement, ActionBarProps>(
  function ActionBar(
    { children, className, glass = true, justify = 'end', position = 'bottom' },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cx(
          'gds-pad-x-lg gds-pad-y sticky z-10 flex items-center',
          position === 'bottom' ? 'bottom-0 border-t' : 'top-0 border-b',
          justifyMap[justify],
          glass === true
            ? cx(glassClass(glass), 'bg-bg/60 border-white/10')
            : 'border-border bg-surface',
          className
        )}
        data-component="action-bar"
      >
        {children}
      </div>
    )
  }
)
