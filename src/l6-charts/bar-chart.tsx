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
    { data, dataKey, xKey = 'name', className, height = 300, color = 'var(--gds-accent)', glass, ...props },
    ref,
  ) {
    return (
      <div
        className={cx('w-full', glass && 'gds-radius-popover backdrop-blur-md bg-white/5', className)}
        data-component="bar-chart"
        ref={ref}
        {...props}
      >
        <ResponsiveContainer height={height} width="100%">
          <RBarChart data={data}>
            <CartesianGrid stroke="var(--gds-border, #e5e7eb)" strokeDasharray="3 3" />
            <XAxis dataKey={xKey} stroke="var(--gds-fg-muted, #6b7280)" tick={{ fontSize: 11 }} />
            <YAxis stroke="var(--gds-fg-muted, #6b7280)" tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
          </RBarChart>
        </ResponsiveContainer>
      </div>
    )
  },
)
