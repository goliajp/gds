import { forwardRef } from 'react'
import {
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts'

import { cx } from '../utils/cx'

export type BubbleChartProps = {
  data: { x: number; y: number; z: number; name?: string }[]
  xLabel?: string
  yLabel?: string
  height?: number
  glass?: boolean
  className?: string
}

export const BubbleChart = forwardRef<HTMLDivElement, BubbleChartProps>(
  function BubbleChart(
    { data, xLabel, yLabel, height = 300, glass, className, ...props },
    ref
  ) {
    return (
      <div
        className={cx(
          'gds-radius-popover w-full border border-[var(--gds-border,#e5e7eb)]',
          glass && 'bg-white/5 backdrop-blur-md',
          className
        )}
        data-component="bubble-chart"
        ref={ref}
        {...props}
      >
        <ResponsiveContainer height={height} width="100%">
          <ScatterChart>
            <XAxis
              dataKey="x"
              name={xLabel}
              stroke="var(--gds-fg-muted, #6b7280)"
              tick={{ fill: 'var(--gds-fg-muted, #6b7280)', fontSize: 11 }}
              type="number"
            />
            <YAxis
              dataKey="y"
              name={yLabel}
              stroke="var(--gds-fg-muted, #6b7280)"
              tick={{ fill: 'var(--gds-fg-muted, #6b7280)', fontSize: 11 }}
              type="number"
            />
            <ZAxis dataKey="z" range={[20, 400]} type="number" />
            <Tooltip />
            <Scatter data={data} fill="var(--gds-accent)" fillOpacity={0.6} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    )
  }
)
