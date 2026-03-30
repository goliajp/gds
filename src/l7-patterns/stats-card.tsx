// stats-card — rich KPI card with icon, value, trend, and sparkline
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

export type StatsCardProps = {
  icon?: ReactNode
  label: string
  value: string | number
  trend?: number
  sparkData?: number[]
  glass?: boolean
  className?: string
}

function MiniSparkline({ data }: { data: number[] }) {
  const h = 24
  const w = 64
  if (data.length < 2) return null
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w
      const y = range > 0 ? h - ((v - min) / range) * h : h / 2
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg className="mt-2" height={h} viewBox={`0 0 ${w} ${h}`} width={w}>
      <polyline
        fill="none"
        points={points}
        stroke="var(--gds-accent)"
        strokeWidth={1.5}
      />
    </svg>
  )
}

export const StatsCard = forwardRef<HTMLDivElement, StatsCardProps>(
  function StatsCard(
    { icon, label, value, trend, sparkData, glass, className },
    ref
  ) {
    const isPositive = trend !== undefined && trend >= 0

    return (
      <div
        ref={ref}
        className={cx(
          'gds-ctx gds-radius-card gds-pad-x-lg gds-pad-y-lg relative border',
          glass === true
            ? cx(glassClass(glass), 'bg-bg/60 border-white/10')
            : 'border-border bg-surface',
          className
        )}
        data-component="stats-card"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {icon !== undefined && (
              <div className="text-fg-muted/50">{icon}</div>
            )}
            <p className="gds-text-body text-fg-muted">{label}</p>
          </div>
          {trend !== undefined && (
            <span
              className={cx(
                'inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-medium',
                isPositive
                  ? 'bg-success/10 text-success'
                  : 'bg-danger/10 text-danger'
              )}
            >
              {isPositive ? '\u2191' : '\u2193'}
              {isPositive ? '+' : ''}
              {trend}%
            </span>
          )}
        </div>
        <p className="text-fg mt-1 text-2xl font-bold">{value}</p>
        {sparkData !== undefined && sparkData.length >= 2 && (
          <MiniSparkline data={sparkData} />
        )}
      </div>
    )
  }
)
