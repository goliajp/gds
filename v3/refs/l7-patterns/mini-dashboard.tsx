// mini-dashboard — section-level container with optional title header
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

export type MiniDashboardProps = {
  title?: string
  children: ReactNode
  glass?: boolean
  className?: string
}

export const MiniDashboard = forwardRef<HTMLDivElement, MiniDashboardProps>(
  function MiniDashboard({ title, children, glass, className }, ref) {
    return (
      <div
        ref={ref}
        className={cx(
          'gds-ctx gds-radius-card border',
          glass === true
            ? cx(glassClass(glass), 'bg-bg/60 border-white/10')
            : 'border-border bg-surface',
          'gds-pad-x-lg gds-pad-y-lg',
          className
        )}
        data-component="mini-dashboard"
      >
        {title !== undefined && (
          <h2 className="gds-text-body text-fg mb-3 font-semibold">{title}</h2>
        )}
        {children}
      </div>
    )
  }
)
