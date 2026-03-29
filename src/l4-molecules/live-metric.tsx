// live-metric — card displaying a live metric value with optional pulse
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

export type LiveMetricProps = {
  className?: string
  label: string
  pulse?: boolean
  unit?: string
  value: number | string
}

export const LiveMetric = forwardRef<HTMLDivElement, LiveMetricProps>(
  function LiveMetric({ className, label, pulse, unit, value }, ref) {
    return (
      <div
        ref={ref}
        className={cx('flex flex-col gds-gap-sm gds-pad gds-radius border border-border bg-surface', className)}
        data-component="live-metric"
      >
        <div className="flex items-center gds-gap-sm">
          {pulse === true && (
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
            </span>
          )}
          <span className="text-xs text-fg-muted">{label}</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold tabular-nums text-fg">{value}</span>
          {unit !== undefined && <span className="text-sm text-fg-muted">{unit}</span>}
        </div>
      </div>
    )
  },
)
