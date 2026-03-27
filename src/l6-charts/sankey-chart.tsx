import { forwardRef } from 'react'
import { ResponsiveContainer, Sankey, Tooltip } from 'recharts'

import { cx } from '../utils/cx'

type SankeyNode = {
  name: string
  [key: string]: unknown
}

type SankeyLink = {
  source: number
  target: number
  value: number
  [key: string]: unknown
}

export type SankeyChartProps = {
  nodes: SankeyNode[]
  links: SankeyLink[]
  className?: string
  height?: number
  nodePadding?: number
  nodeWidth?: number
  glass?: boolean
}

export const SankeyChart = forwardRef<HTMLDivElement, SankeyChartProps>(
  function SankeyChart(
    { nodes, links, className, height = 300, nodePadding = 50, nodeWidth = 10, glass, ...props },
    ref,
  ) {
    const data = { nodes, links }

    return (
      <div
        className={cx('w-full', glass && 'gds-radius-popover backdrop-blur-md bg-white/5', className)}
        data-component="sankey-chart"
        ref={ref}
        {...props}
      >
        <ResponsiveContainer height={height} width="100%">
          <Sankey data={data} nodePadding={nodePadding} nodeWidth={nodeWidth}>
            <Tooltip />
          </Sankey>
        </ResponsiveContainer>
      </div>
    )
  },
)
