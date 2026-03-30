import { forwardRef } from 'react'
import {
  Area,
  AreaChart as RAreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { cx } from '../utils/cx'

type ChartData = Record<string, unknown>

export type AreaChartProps = {
  data: ChartData[]
  dataKey: string
  xKey?: string
  className?: string
  height?: number
  color?: string
  glass?: boolean
}

const GRADIENT_ID = 'gds-area-gradient'

export const AreaChart = forwardRef<HTMLDivElement, AreaChartProps>(
  function AreaChart(
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
        data-component="area-chart"
        ref={ref}
        {...props}
      >
        <ResponsiveContainer height={height} width="100%">
          <RAreaChart data={data}>
            <defs>
              <linearGradient id={GRADIENT_ID} x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
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
            <Area
              dataKey={dataKey}
              fill={`url(#${GRADIENT_ID})`}
              fillOpacity={1}
              stroke={color}
              strokeWidth={2}
              type="monotone"
            />
          </RAreaChart>
        </ResponsiveContainer>
      </div>
    )
  }
)
