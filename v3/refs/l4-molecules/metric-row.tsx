// metric-row — horizontal row of compact metric values
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type MetricRowMetric = {
  label: string
  value: string | number
  unit?: string
  variant?: 'danger' | 'default' | 'success' | 'warning'
}

export type MetricRowProps = {
  metrics: MetricRowMetric[]
  className?: string
}

const variantColor: Record<string, string> = {
  default: 'text-fg',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
}

export const MetricRow = forwardRef<HTMLDivElement, MetricRowProps>(
  function MetricRow({ metrics, className }, ref) {
    return (
      <div
        ref={ref}
        className={cx(
          'gds-gap gds-text-body flex items-center select-none',
          className
        )}
        data-component="metric-row"
      >
        {metrics.map((m) => (
          <div key={m.label} className="flex items-baseline gap-1.5">
            <span className="text-fg-muted">{m.label}</span>
            <span
              className={cx(
                'font-semibold',
                variantColor[m.variant ?? 'default']
              )}
            >
              {m.value}
              {m.unit !== undefined && (
                <span className="text-fg-muted ml-0.5 font-normal">
                  {m.unit}
                </span>
              )}
            </span>
          </div>
        ))}
      </div>
    )
  }
)
