// flame-chart — hierarchical flame graph for performance profiling
import { useMemo } from 'react'

import { cx } from '../utils/cx'

type FlameNode = {
  children?: FlameNode[]
  name: string
  value: number
}

type FlameChartProps = {
  className?: string
  data: FlameNode
  height?: number
}

const PALETTE = [
  'var(--gds-palette-0)', 'var(--gds-palette-1)', 'var(--gds-palette-2)', 'var(--gds-palette-3)',
  'var(--gds-palette-4)', 'var(--gds-palette-5)', 'var(--gds-palette-6)', 'var(--gds-palette-7)',
]

type FlatBar = { color: string; depth: number; name: string; width: number; x: number }

function flattenNode(
  node: FlameNode, depth: number, x: number, totalWidth: number, parentValue: number, colorIndex: number,
): FlatBar[] {
  const width = parentValue > 0 ? (node.value / parentValue) * totalWidth : 0
  const bars: FlatBar[] = [{ color: PALETTE[colorIndex % PALETTE.length], depth, name: node.name, width, x }]

  if (node.children !== undefined) {
    let childX = x
    node.children.forEach((child, i) => {
      bars.push(...flattenNode(child, depth + 1, childX, totalWidth, node.value, colorIndex + i + 1))
      childX += node.value > 0 ? (child.value / node.value) * totalWidth : 0
    })
  }
  return bars
}

const BAR_HEIGHT = 24
const CHART_WIDTH = 600

export function FlameChart({ className, data, height = 200 }: FlameChartProps) {
  const bars = useMemo(() => flattenNode(data, 0, 0, CHART_WIDTH, data.value, 0), [data])
  const maxDepth = bars.reduce((max, b) => Math.max(max, b.depth), 0)
  const svgHeight = Math.max(height, (maxDepth + 1) * BAR_HEIGHT)

  return (
    <div className={cx('inline-block overflow-x-auto', className)} data-component="flame-chart">
      <svg height={svgHeight} viewBox={`0 0 ${CHART_WIDTH} ${svgHeight}`} width={CHART_WIDTH}>
        {bars.map((bar, i) => (
          <g key={i}>
            <rect
              fill={bar.color}
              fillOpacity={0.8}
              height={BAR_HEIGHT - 2}
              rx={2}
              width={Math.max(bar.width - 1, 0)}
              x={bar.x}
              y={bar.depth * BAR_HEIGHT}
            />
            {bar.width > 40 && (
              <text
                dominantBaseline="middle"
                fill="var(--gds-fg)"
                fontSize={10}
                x={bar.x + 4}
                y={bar.depth * BAR_HEIGHT + BAR_HEIGHT / 2 - 1}
              >
                {bar.name}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  )
}

export type { FlameChartProps, FlameNode }
