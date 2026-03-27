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
            ? cx(glassClass(glass), 'border-white/10 bg-bg/60')
            : 'border-border bg-surface',
          'gds-pad-x-lg gds-pad-y-lg',
          className,
        )}
        data-component="mini-dashboard"
      >
        {title !== undefined && (
          <h2 className="mb-3 gds-text-body font-semibold text-fg">{title}</h2>
        )}
        {children}
      </div>
    )
  },
)
