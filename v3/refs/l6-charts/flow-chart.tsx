// flow-chart — simple left-to-right flow diagram using pure SVG
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type FlowNode = {
  id: string
  label: string
  type?: 'start' | 'end' | 'process' | 'decision'
}

type FlowEdge = {
  from: string
  to: string
  label?: string
}

export type FlowChartProps = {
  nodes: FlowNode[]
  edges: FlowEdge[]
  width?: number
  height?: number
  glass?: boolean
  className?: string
}

const NODE_COLORS: Record<string, string> = {
  start: 'var(--gds-palette-3, #10b981)',
  end: 'var(--gds-palette-5, #ef4444)',
  process: 'var(--gds-palette-0, #6366f1)',
  decision: 'var(--gds-palette-4, #f59e0b)',
}

const NODE_W = 100
const NODE_H = 40

function renderNode(node: FlowNode, x: number, y: number) {
  const color = NODE_COLORS[node.type ?? 'process']
  const nodeType = node.type ?? 'process'

  if (nodeType === 'decision') {
    const half = NODE_H * 0.7
    return (
      <g key={node.id} data-node={node.id}>
        <polygon
          points={`${x},${y - half} ${x + half},${y} ${x},${y + half} ${x - half},${y}`}
          fill={color}
          fillOpacity={0.15}
          stroke={color}
          strokeWidth={1.5}
        />
        <text
          x={x}
          y={y + 4}
          textAnchor="middle"
          fill="var(--gds-fg, #e5e7eb)"
          fontSize={10}
        >
          {node.label}
        </text>
      </g>
    )
  }

  const rx = nodeType === 'start' || nodeType === 'end' ? NODE_H / 2 : 4
  return (
    <g key={node.id} data-node={node.id}>
      <rect
        x={x - NODE_W / 2}
        y={y - NODE_H / 2}
        width={NODE_W}
        height={NODE_H}
        rx={rx}
        fill={color}
        fillOpacity={0.15}
        stroke={color}
        strokeWidth={1.5}
      />
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fill="var(--gds-fg, #e5e7eb)"
        fontSize={10}
      >
        {node.label}
      </text>
    </g>
  )
}

export const FlowChart = forwardRef<HTMLDivElement, FlowChartProps>(
  function FlowChart(
    { nodes, edges, width = 600, height = 200, glass, className },
    ref
  ) {
    const spacing = nodes.length > 1 ? (width - 80) / (nodes.length - 1) : 0
    const startX = nodes.length === 1 ? width / 2 : 40
    const centerY = height / 2

    const posMap = new Map(
      nodes.map((n, i) => [n.id, { x: startX + i * spacing, y: centerY }])
    )

    return (
      <div
        ref={ref}
        className={cx(
          'gds-radius-popover border-border border',
          glass && 'bg-white/5 backdrop-blur-md',
          className
        )}
        data-component="flow-chart"
      >
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <defs>
            <marker
              id="gds-arrow"
              markerWidth="8"
              markerHeight="6"
              refX="8"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L8,3 L0,6" fill="var(--gds-fg-muted, #6b7280)" />
            </marker>
          </defs>

          {/* edges */}
          {edges.map((edge, i) => {
            const from = posMap.get(edge.from)
            const to = posMap.get(edge.to)
            if (from === undefined || to === undefined) return null
            const x1 = from.x + NODE_W / 2
            const x2 = to.x - NODE_W / 2
            const midX = (x1 + x2) / 2
            const midY = (from.y + to.y) / 2
            return (
              <g key={i}>
                <line
                  x1={x1}
                  y1={from.y}
                  x2={x2}
                  y2={to.y}
                  stroke="var(--gds-fg-muted, #6b7280)"
                  strokeWidth={1.5}
                  markerEnd="url(#gds-arrow)"
                />
                {edge.label !== undefined && (
                  <text
                    x={midX}
                    y={midY - 8}
                    textAnchor="middle"
                    fill="var(--gds-fg-muted, #9ca3af)"
                    fontSize={9}
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            )
          })}

          {/* nodes */}
          {nodes.map((node, _i) => {
            const pos = posMap.get(node.id)
            if (pos === undefined) return null
            return renderNode(node, pos.x, pos.y)
          })}
        </svg>
      </div>
    )
  }
)

export type { FlowEdge, FlowNode }
