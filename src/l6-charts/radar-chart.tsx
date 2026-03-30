import { forwardRef } from 'react'
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RRadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

import { cx } from '../utils/cx'

type ChartData = Record<string, unknown>

export type RadarChartProps = {
  data: ChartData[]
  dataKey: string
  angleKey?: string
  className?: string
  height?: number
  color?: string
  glass?: boolean
}

export const RadarChart = forwardRef<HTMLDivElement, RadarChartProps>(
  function RadarChart(
    {
      data,
      dataKey,
      angleKey = 'name',
      className,
      height = 300,
      color = 'var(--gds-accent)',
      glass,
      ...props
    },
    ref
  ) {
    return (
      <div
        className={cx(
          'w-full',
          glass && 'gds-radius-popover bg-white/5 backdrop-blur-md',
          className
        )}
        data-component="radar-chart"
        ref={ref}
        {...props}
      >
        <ResponsiveContainer height={height} width="100%">
          <RRadarChart cx="50%" cy="50%" data={data} outerRadius="80%">
            <PolarGrid stroke="var(--gds-border, #e5e7eb)" />
            <PolarAngleAxis
              dataKey={angleKey}
              stroke="var(--gds-fg-muted, #6b7280)"
              tick={{ fill: 'var(--gds-fg-muted, #6b7280)', fontSize: 11 }}
            />
            <PolarRadiusAxis
              stroke="var(--gds-fg-muted, #6b7280)"
              tick={{ fill: 'var(--gds-fg-muted, #6b7280)', fontSize: 10 }}
            />
            <Tooltip contentStyle={{ background: 'var(--gds-bg-secondary, #1f2937)', border: '1px solid var(--gds-border, #374151)', borderRadius: 6, color: 'var(--gds-fg, #f9fafb)' }} labelStyle={{ color: 'var(--gds-fg-muted, #9ca3af)' }} />
            <Radar
              dataKey={dataKey}
              fill={color}
              fillOpacity={0.3}
              stroke={color}
              strokeWidth={2}
            />
          </RRadarChart>
        </ResponsiveContainer>
      </div>
    )
  }
)
