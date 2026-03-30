import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type PayrollDashboardProps = React.HTMLAttributes<HTMLDivElement> & {
  chart?: ReactNode
  metrics?: ReactNode
  transactions?: ReactNode
}

export const PayrollDashboard = forwardRef<
  HTMLDivElement,
  PayrollDashboardProps
>(function PayrollDashboard(
  { chart, className, metrics, transactions, ...props },
  ref
) {
  return (
    <div
      className={cx('gds-ctx gds-gap flex flex-col', className)}
      data-component="payroll-dashboard"
      ref={ref}
      {...props}
    >
      {metrics !== undefined && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">{metrics}</div>
      )}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {chart !== undefined && (
          <div className="gds-radius-card border-border bg-surface gds-pad border">
            {chart}
          </div>
        )}
        {transactions !== undefined && (
          <div className="gds-radius-card border-border bg-surface gds-pad border">
            {transactions}
          </div>
        )}
      </div>
    </div>
  )
})

export type { PayrollDashboardProps }
