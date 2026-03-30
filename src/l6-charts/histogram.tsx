// histogram — frequency distribution of continuous data
import { forwardRef } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { cx } from '../utils/cx'

export type HistogramProps = {
  data: number[]
  bins?: number
  height?: number
  color?: string
  glass?: boolean
  className?: string
}

function computeBins(data: number[], binCount: number) {
  if (data.length === 0) return []
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min
  const binWidth = range === 0 ? 1 : range / binCount

  return Array.from({ length: binCount }, (_, i) => {
    const lo = min + i * binWidth
    const hi = lo + binWidth
    const count = data.filter((v) =>
      i === binCount - 1 ? v >= lo && v <= hi : v >= lo && v < hi
    ).length
    return { range: `${lo.toFixed(1)}–${hi.toFixed(1)}`, count }
  })
}

export const Histogram = forwardRef<HTMLDivElement, HistogramProps>(
  function Histogram(
    {
      data,
      bins = 10,
      height = 300,
      color = 'var(--gds-accent)',
      glass,
      className,
      ...props
    },
    ref
  ) {
    const binData = computeBins(data, bins)

    return (
      <div
        className={cx(
          'gds-radius-popover border-border w-full border',
          glass && 'bg-white/5 backdrop-blur-md',
          className
        )}
        data-component="histogram"
        ref={ref}
        {...props}
      >
        <ResponsiveContainer height={height} width="100%">
          <BarChart data={binData}>
            <CartesianGrid
              stroke="var(--gds-border, #e5e7eb)"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="range"
              stroke="var(--gds-fg-muted, #6b7280)"
              tick={{ fill: 'var(--gds-fg-muted, #6b7280)', fontSize: 10 }}
            />
            <YAxis
              stroke="var(--gds-fg-muted, #6b7280)"
              tick={{ fill: 'var(--gds-fg-muted, #6b7280)', fontSize: 11 }}
            />
            <Tooltip />
            <Bar dataKey="count" fill={color} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
)

export { computeBins }
