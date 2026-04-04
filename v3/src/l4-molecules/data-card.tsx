// data-card — compound metric display card
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'
import { glowClass } from '../utils/glow'
import type { GlowColor } from '../utils/types'

type DataCardProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string
  value: string | number
  change?: string
  trend?: 'up' | 'down' | 'flat'
  footer?: ReactNode
  glass?: boolean
  glow?: boolean | GlowColor
}

const DataCard = forwardRef<HTMLDivElement, DataCardProps>(
  function DataCard({ title, value, change, trend, footer, glass, glow, className, ...props }, ref) {
    const trendColor = trend === 'up' ? 'text-success' : trend === 'down' ? 'text-danger' : 'text-fg-muted'

    return (
      <div
        ref={ref}
        className={cx(
          'gds-ctx flex flex-col gds-gap gds-pad gds-radius gds-shadow border border-border bg-bg-secondary',
          glassClass(glass),
          glass && 'bg-bg/60 border-white/10',
          glowClass(glow),
          className
        )}
        data-component="data-card"
        {...props}
      >
        <span className="gds-text-caption text-fg-muted">{title}</span>
        <div className="flex items-baseline gds-gap-sm">
          <span className="gds-text-heading text-fg font-bold">{value}</span>
          {change !== undefined && (
            <span className={cx('gds-text-caption font-medium', trendColor)}>{change}</span>
          )}
        </div>
        {footer !== undefined && <div className="mt-auto">{footer}</div>}
      </div>
    )
  }
)

export { DataCard }
export type { DataCardProps }
