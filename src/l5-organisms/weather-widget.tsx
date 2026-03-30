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
  function WeatherWidget(
    { className, condition, icon, location, temp, unit = 'C', ...props },
    ref
  ) {
    return (
      <div
        className={cx(
          'border-border bg-surface inline-flex items-center gap-4 rounded-xl border p-4 select-none',
          className
        )}
        data-component="weather-widget"
        ref={ref}
        {...props}
      >
        {icon !== undefined && (
          <div className="text-fg-muted text-2xl">{icon}</div>
        )}
        <div className="flex flex-col">
          <span className="text-fg text-2xl leading-tight font-bold">
            {temp}&deg;{unit}
          </span>
          <span className="text-fg-muted text-sm">{condition}</span>
          <span className="text-fg-muted/70 text-xs">{location}</span>
        </div>
      </div>
    )
  }
)

export type { WeatherWidgetProps }
