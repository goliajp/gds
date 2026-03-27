import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type WeatherWidgetProps = React.HTMLAttributes<HTMLDivElement> & {
  condition: string
  icon?: ReactNode
  location: string
  temp: number
  unit?: 'C' | 'F'
}

export const WeatherWidget = forwardRef<HTMLDivElement, WeatherWidgetProps>(
  function WeatherWidget({ className, condition, icon, location, temp, unit = 'C', ...props }, ref) {
    return (
      <div
        className={cx(
          'inline-flex items-center gap-4 rounded-xl border border-border bg-surface p-4 select-none',
          className,
        )}
        data-component="weather-widget"
        ref={ref}
        {...props}
      >
        {icon !== undefined && <div className="text-2xl text-fg-muted">{icon}</div>}
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-fg leading-tight">
            {temp}&deg;{unit}
          </span>
          <span className="text-sm text-fg-muted">{condition}</span>
          <span className="text-xs text-fg-muted/70">{location}</span>
        </div>
      </div>
    )
  },
)

export type { WeatherWidgetProps }
