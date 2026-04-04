import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type QuickStatProps = React.HTMLAttributes<HTMLDivElement> & {
  icon?: React.ReactNode
  label: string
  trend?: number
  value: string | number
}

export const QuickStat = forwardRef<HTMLDivElement, QuickStatProps>(
  function QuickStat({ className, icon, label, trend, value, ...props }, ref) {
    const trendColor =
      trend !== undefined && trend > 0
        ? 'text-success'
        : trend !== undefined && trend < 0
          ? 'text-danger'
          : 'text-fg-muted'

    return (
      <div
        className={cx('inline-flex items-center gap-3 select-none', className)}
        data-component="quick-stat"
        ref={ref}
        {...props}
      >
        {icon !== undefined && <div className="text-fg-muted">{icon}</div>}
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span className="text-fg text-lg leading-tight font-semibold">
              {value}
            </span>
            {trend !== undefined && (
              <span className={cx('text-xs font-medium', trendColor)}>
                {trend > 0 ? '+' : ''}
                {trend}%
              </span>
            )}
          </div>
          <span className="text-fg-muted text-xs leading-tight">{label}</span>
        </div>
      </div>
    )
  }
)

export type { QuickStatProps }
