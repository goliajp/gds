import { forwardRef } from 'react'
import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart as RScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { cx } from '../utils/cx'

type ChartData = Record<string, unknown>

export type ScatterChartProps = {
  data: ChartData[]
  xKey: string
  yKey: string
  className?: string
  height?: number
  color?: string
  glass?: boolean
}

export const ScatterChart = forwardRef<HTMLDivElement, ScatterChartProps>(
  function ScatterChart(
    {
      data,
      xKey,
      yKey,
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
        data-component="scatter-chart"
        ref={ref}
        {...props}
      >
        <ResponsiveContainer height={height} width="100%">
          <RScatterChart>
            <CartesianGrid
              stroke="var(--gds-border, #e5e7eb)"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey={xKey}
              stroke="var(--gds-fg-muted, #6b7280)"
              tick={{ fill: 'var(--gds-fg-muted, #6b7280)', fontSize: 11 }}
              type="number"
            />
            <YAxis
              dataKey={yKey}
              stroke="var(--gds-fg-muted, #6b7280)"
              tick={{ fill: 'var(--gds-fg-muted, #6b7280)', fontSize: 11 }}
              type="number"
            />
            <Tooltip contentStyle={{ background: 'var(--gds-bg-secondary, #1f2937)', border: '1px solid var(--gds-border, #374151)', borderRadius: 6, color: 'var(--gds-fg, #f9fafb)' }} labelStyle={{ color: 'var(--gds-fg-muted, #9ca3af)' }} />
            <Scatter data={data} fill={color} />
          </RScatterChart>
        </ResponsiveContainer>
      </div>
    )
  }
)
