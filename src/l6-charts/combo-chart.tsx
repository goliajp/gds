import { forwardRef } from 'react'
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

export type ComboChartProps = {
  data: Record<string, unknown>[]
  barKey: string
  lineKey: string
  xKey?: string
  barColor?: string
  lineColor?: string
  height?: number
  glass?: boolean
  className?: string
}

export const ComboChart = forwardRef<HTMLDivElement, ComboChartProps>(
  function ComboChart(
    {
      data,
      barKey,
      lineKey,
      xKey = 'name',
      barColor = 'var(--gds-accent)',
      lineColor = 'var(--gds-success)',
      height = 300,
      glass,
      className,
      ...props
    },
    ref
  ) {
    return (
      <div
        className={cx(
          'gds-radius-popover w-full border border-white/[0.06]',
          glassClass(glass),
          className
        )}
        data-component="combo-chart"
        ref={ref}
        {...props}
      >
        <ResponsiveContainer height={height} width="100%">
          <ComposedChart data={data}>
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
            <Tooltip />
            <Legend />
            <Bar dataKey={barKey} fill={barColor} radius={[4, 4, 0, 0]} />
            <Line
              dataKey={lineKey}
              dot={false}
              stroke={lineColor}
              strokeWidth={2}
              type="monotone"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    )
  }
)
