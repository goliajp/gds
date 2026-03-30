// kpi-dashboard — pre-composed KPI layout with metrics, chart, and table slots
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'
import { MetricCard } from './metric-card'

type KPIMetric = {
  title: string
  value: string
  change?: number
}

type KPIDashboardProps = {
  title?: string
  metrics?: KPIMetric[]
  chart?: ReactNode
  table?: ReactNode
  glass?: boolean
  className?: string
}

const KPIDashboard = forwardRef<HTMLDivElement, KPIDashboardProps>(
  function KPIDashboard(
    { title, metrics, chart, table, glass, className },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cx('gds-ctx gds-gap flex flex-col', className)}
        data-component="kpi-dashboard"
      >
        {title !== undefined && (
          <h2 className="gds-heading text-fg font-semibold">{title}</h2>
        )}
        {metrics !== undefined && metrics.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {metrics.map((m) => (
              <MetricCard
                key={m.title}
                change={m.change}
                glass={glass}
                title={m.title}
                value={m.value}
              />
            ))}
          </div>
        )}
        {chart !== undefined && (
          <div
            className={cx(
              'gds-radius-card gds-pad border',
              glass === true
                ? cx(glassClass(glass), 'bg-bg/60 border-white/10')
                : 'border-border bg-surface'
            )}
          >
            {chart}
          </div>
        )}
        {table !== undefined && (
          <div
            className={cx(
              'gds-radius-card gds-pad border',
              glass === true
                ? cx(glassClass(glass), 'bg-bg/60 border-white/10')
                : 'border-border bg-surface'
            )}
          >
            {table}
          </div>
        )}
      </div>
    )
  }
)

export { KPIDashboard }
export type { KPIDashboardProps, KPIMetric }
