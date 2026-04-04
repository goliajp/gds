import { forwardRef } from 'react'
import {
  Bar,
  BarChart as RBarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { cx } from '../utils/cx'

type ChartData = Record<string, unknown>

export type BarChartProps = {
  data: ChartData[]
  dataKey: string
  xKey?: string
  className?: string
  height?: number
  color?: string
  glass?: boolean
}

export const BarChart = forwardRef<HTMLDivElement, BarChartProps>(
  function BarChart(
    {
      data,
      dataKey,
      xKey = 'name',
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
        data-component="bar-chart"
        ref={ref}
        {...props}
      >
        <ResponsiveContainer height={height} width="100%">
          <RBarChart data={data}>
            <CartesianGrid
              stroke="var(--gds-border, #e5e7eb)"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey={xKey}
              stroke="var(--gds-fg-muted, #6b7280)"
              tick={{ fill: 'var(--gds-fg-muted, #6b7280)', fontSize: 11 }}
            />
            <YAxis
              stroke="var(--gds-fg-muted, #6b7280)"
              tick={{ fill: 'var(--gds-fg-muted, #6b7280)', fontSize: 11 }}
            />
            <Tooltip contentStyle={{ background: 'var(--gds-bg-secondary, #1f2937)', border: '1px solid var(--gds-border, #374151)', borderRadius: 6, color: 'var(--gds-fg, #f9fafb)' }} labelStyle={{ color: 'var(--gds-fg-muted, #9ca3af)' }} />
            <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
          </RBarChart>
        </ResponsiveContainer>
      </div>
    )
  }
)
