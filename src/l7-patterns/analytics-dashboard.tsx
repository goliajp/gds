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
        className={cx('flex flex-col gds-gap', className)}
        data-component="analytics-dashboard"
        ref={ref}
      >
        {metrics !== undefined && (
          <section className="flex flex-wrap gds-gap" data-slot="metrics">{metrics}</section>
        )}
        {charts !== undefined && (
          <section className="flex flex-col gds-gap" data-slot="charts">{charts}</section>
        )}
        {data !== undefined && (
          <section className="flex flex-col gds-gap" data-slot="data">{data}</section>
        )}
      </div>
    )
  },
)

export { AnalyticsDashboard }
export type { AnalyticsDashboardProps }
