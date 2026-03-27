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
  function MetricCard({ title, value, change, changeLabel, icon, glass, className }, ref) {
    const isPositive = change !== undefined && change >= 0

    return (
      <div
        ref={ref}
        className={cx(
          'relative gds-radius-card border gds-pad-x-lg gds-pad-y-lg',
          glass === true
            ? cx(glassClass(glass), 'border-white/10 bg-bg/60')
            : 'border-border bg-surface',
          className,
        )}
        data-component="metric-card"
      >
        {icon !== undefined && (
          <div className="absolute right-4 top-4 text-fg-muted/40">{icon}</div>
        )}
        <p className="gds-text-body text-fg-muted">{title}</p>
        <p className="mt-1 text-2xl font-bold text-fg">{value}</p>
        {change !== undefined && (
          <p
            className={cx(
              'mt-1 gds-text-body',
              isPositive ? 'text-success' : 'text-danger',
            )}
          >
            {isPositive ? '+' : ''}
            {change}%{changeLabel !== undefined ? ` ${changeLabel}` : ''}
          </p>
        )}
      </div>
    )
  },
)
