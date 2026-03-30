// metric-card — single KPI display with optional trend indicator
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

export type MetricCardProps = {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: ReactNode
  glass?: boolean
  className?: string
}

export const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(
  function MetricCard(
    { title, value, change, changeLabel, icon, glass, className },
    ref
  ) {
    const isPositive = change !== undefined && change >= 0

    return (
      <div
        ref={ref}
        className={cx(
          'gds-radius-card gds-pad-x-lg gds-pad-y-lg relative border',
          glass === true
            ? cx(glassClass(glass), 'bg-bg/60 border-white/10')
            : 'border-border bg-surface',
          className
        )}
        data-component="metric-card"
      >
        {icon !== undefined && (
          <div className="text-fg-muted/40 absolute top-4 right-4">{icon}</div>
        )}
        <p className="gds-text-body text-fg-muted">{title}</p>
        <p className="text-fg mt-1 text-2xl font-bold">{value}</p>
        {change !== undefined && (
          <p
            className={cx(
              'gds-text-body mt-1',
              isPositive ? 'text-success' : 'text-danger'
            )}
          >
            {isPositive ? '+' : ''}
            {change}%{changeLabel !== undefined ? ` ${changeLabel}` : ''}
          </p>
        )}
      </div>
    )
  }
)
