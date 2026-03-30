import { forwardRef } from 'react'

import { Progress } from '../l2-primitives/progress'
import { cx } from '../utils/cx'

type HealthMetric = {
  label: string
  max?: number
  unit?: string
  value: number
}

type SystemHealthProps = React.HTMLAttributes<HTMLDivElement> & {
  metrics: HealthMetric[]
}

function barVariant(pct: number): 'danger' | 'default' | 'success' | 'warning' {
  if (pct >= 90) return 'danger'
  if (pct >= 70) return 'warning'
  return 'success'
}

export const SystemHealth = forwardRef<HTMLDivElement, SystemHealthProps>(
  function SystemHealth({ className, metrics, ...props }, ref) {
    return (
      <div
        className={cx('gds-gap flex flex-col', className)}
        data-component="system-health"
        ref={ref}
        {...props}
      >
        {metrics.map((m) => {
          const max = m.max ?? 100
          const pct = max > 0 ? Math.round((m.value / max) * 100) : 0
          return (
            <div key={m.label} className="flex flex-col gap-1">
              <div className="gds-text-label flex items-center justify-between">
                <span className="text-fg">{m.label}</span>
                <span className="text-fg-muted font-mono tabular-nums">
                  {m.value}
                  {m.unit ?? ''} / {max}
                  {m.unit ?? ''} ({pct}%)
                </span>
              </div>
              <Progress value={pct} variant={barVariant(pct)} size="sm" />
            </div>
          )
        })}
      </div>
    )
  }
)

export type { HealthMetric, SystemHealthProps }
