import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type HRDashboardProps = React.HTMLAttributes<HTMLDivElement> & {
  departments?: ReactNode
  onboarding?: ReactNode
  stats?: ReactNode
}

export const HRDashboard = forwardRef<HTMLDivElement, HRDashboardProps>(
  function HRDashboard(
    { className, departments, onboarding, stats, ...props },
    ref
  ) {
    return (
      <div
        className={cx('gds-ctx gds-gap flex flex-col', className)}
        data-component="hr-dashboard"
        ref={ref}
        {...props}
      >
        {stats !== undefined && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">{stats}</div>
        )}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {onboarding !== undefined && (
            <div className="gds-radius-card border-border bg-surface gds-pad border">
              {onboarding}
            </div>
          )}
          {departments !== undefined && (
            <div className="gds-radius-card border-border bg-surface gds-pad border">
              {departments}
            </div>
          )}
        </div>
      </div>
    )
  }
)

export type { HRDashboardProps }
