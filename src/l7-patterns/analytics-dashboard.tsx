import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type AnalyticsDashboardProps = {
  charts?: ReactNode
  className?: string
  data?: ReactNode
  metrics?: ReactNode
}

const AnalyticsDashboard = forwardRef<HTMLDivElement, AnalyticsDashboardProps>(
  function AnalyticsDashboard({ charts, className, data, metrics }, ref) {
    return (
      <div
        className={cx('gds-gap flex flex-col', className)}
        data-component="analytics-dashboard"
        ref={ref}
      >
        {metrics !== undefined && (
          <section className="gds-gap flex flex-wrap" data-slot="metrics">
            {metrics}
          </section>
        )}
        {charts !== undefined && (
          <section className="gds-gap flex flex-col" data-slot="charts">
            {charts}
          </section>
        )}
        {data !== undefined && (
          <section className="gds-gap flex flex-col" data-slot="data">
            {data}
          </section>
        )}
      </div>
    )
  }
)

export { AnalyticsDashboard }
export type { AnalyticsDashboardProps }
