import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type MetricTileVariant = 'danger' | 'default' | 'success' | 'warning'

type MetricTileProps = React.HTMLAttributes<HTMLDivElement> & {
  label: string
  unit?: string
  value: number | string
  variant?: MetricTileVariant
}

const variantCls: Record<MetricTileVariant, string> = {
  default: 'text-fg',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
}

export const MetricTile = forwardRef<HTMLDivElement, MetricTileProps>(
  function MetricTile({ className, label, unit, value, variant = 'default', ...props }, ref) {
    return (
      <div
        className={cx('flex flex-col items-center gds-pad gds-radius bg-surface', className)}
        data-component="metric-tile"
        ref={ref}
        {...props}
      >
        <span className={cx('text-lg font-bold tabular-nums', variantCls[variant])}>
          {value}{unit !== undefined && <span className="ml-0.5 text-xs font-normal text-fg-muted">{unit}</span>}
        </span>
        <span className="text-xs text-fg-muted">{label}</span>
      </div>
    )
  },
)

export type { MetricTileProps, MetricTileVariant }
