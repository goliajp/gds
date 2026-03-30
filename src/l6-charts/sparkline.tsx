import { forwardRef } from 'react'
import { Line, LineChart, ResponsiveContainer } from 'recharts'

import { cx } from '../utils/cx'

type ChartData = Record<string, unknown>

export type SparklineProps = {
  data: ChartData[]
  dataKey: string
  className?: string
  height?: number
  width?: number | `${number}%`
  color?: string
  glass?: boolean
}

export const Sparkline = forwardRef<HTMLDivElement, SparklineProps>(
  function Sparkline(
    {
      data,
      dataKey,
      className,
      height = 32,
      width = 120,
      color = 'var(--gds-accent)',
      glass,
      ...props
    },
    ref
  ) {
    return (
      <div
        className={cx(
          'inline-block',
          glass && 'rounded bg-white/5 backdrop-blur-md',
          className
        )}
        data-component="sparkline"
        ref={ref}
        {...props}
      >
        <ResponsiveContainer height={height} width={width}>
          <LineChart data={data}>
            <Line
              dataKey={dataKey}
              dot={false}
              stroke={color}
              strokeWidth={1.5}
              type="monotone"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }
)
