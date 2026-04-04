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
        className={cx(
          'gds-gap-sm gds-pad gds-radius border-border bg-surface flex flex-col border',
          className
        )}
        data-component="live-metric"
      >
        <div className="gds-gap-sm flex items-center">
          {pulse === true && (
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="bg-success absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
              <span className="bg-success relative inline-flex h-2.5 w-2.5 rounded-full" />
            </span>
          )}
          <span className="text-fg-muted text-xs">{label}</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-fg text-2xl font-bold tabular-nums">
            {value}
          </span>
          {unit !== undefined && (
            <span className="text-fg-muted text-sm">{unit}</span>
          )}
        </div>
      </div>
    )
  }
)
