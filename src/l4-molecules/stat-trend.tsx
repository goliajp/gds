// stat-trend — stat card with value, label, trend, and optional sparkline
import { forwardRef, useMemo } from 'react'

import { cx } from '../utils/cx'

export type StatTrendProps = {
  className?: string
  label: string
  trend: number
  trendData?: number[]
  value: number | string
}

function Sparkline({
  data,
  className,
}: {
  className?: string
  data: number[]
}) {
  if (data.length < 2) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const w = 60
  const h = 20
  const step = w / (data.length - 1)

  const points = data
    .map((v, i) => `${i * step},${h - ((v - min) / range) * h}`)
    .join(' ')

  return (
    <svg width={w} height={h} className={className} viewBox={`0 0 ${w} ${h}`}>
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const StatTrend = forwardRef<HTMLDivElement, StatTrendProps>(
  function StatTrend({ className, label, trend, trendData, value }, ref) {
    const isPositive = trend >= 0

    const trendIcon = useMemo(() => {
      if (isPositive) {
        return (
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 8l4-4 4 4" />
          </svg>
        )
      }
      return (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 4l4 4 4-4" />
        </svg>
      )
    }, [isPositive])

    return (
      <div
        ref={ref}
        className={cx(
          'gds-gap-sm gds-pad gds-radius border-border bg-surface flex flex-col border',
          className
        )}
        data-component="stat-trend"
      >
        <span className="text-fg-muted text-xs">{label}</span>
        <div className="gds-gap flex items-end justify-between">
          <span className="text-fg text-2xl font-bold tabular-nums">
            {value}
          </span>
          {trendData !== undefined && trendData.length >= 2 && (
            <Sparkline
              data={trendData}
              className={isPositive ? 'text-success' : 'text-danger'}
            />
          )}
        </div>
        <div
          className={cx(
            'gds-gap-sm flex items-center text-xs font-medium',
            isPositive ? 'text-success' : 'text-danger'
          )}
        >
          {trendIcon}
          <span>
            {isPositive ? '+' : ''}
            {trend}%
          </span>
        </div>
      </div>
    )
  }
)
