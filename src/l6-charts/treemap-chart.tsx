import { forwardRef } from 'react'
import { ResponsiveContainer, Treemap } from 'recharts'

import { cx } from '../utils/cx'

type TreemapNode = {
  name: string
  value?: number
  children?: TreemapNode[]
  [key: string]: unknown
}

export type TreemapChartProps = {
  data: TreemapNode[]
  dataKey?: string
  className?: string
  height?: number
  color?: string
  glass?: boolean
}

export const TreemapChart = forwardRef<HTMLDivElement, TreemapChartProps>(
  function TreemapChart(
    { data, dataKey = 'value', className, height = 300, color = 'var(--gds-accent)', glass, ...props },
    ref,
  ) {
    return (
      <div
        className={cx('w-full', glass && 'gds-radius-popover backdrop-blur-md bg-white/5', className)}
        data-component="treemap-chart"
        ref={ref}
        {...props}
      >
        <ResponsiveContainer height={height} width="100%">
          <Treemap data={data} dataKey={dataKey} fill={color} stroke="var(--gds-bg, #fff)" />
        </ResponsiveContainer>
      </div>
    )
  },
)
