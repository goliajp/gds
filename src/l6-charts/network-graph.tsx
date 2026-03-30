// network-graph — simple circle-layout network graph using SVG
import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type NetworkNode = {
  id: string
  label: string
  group?: number
}

type NetworkEdge = {
  source: string
  target: string
}

export type NetworkGraphProps = {
  nodes: NetworkNode[]
  edges: NetworkEdge[]
  width?: number
  height?: number
  glass?: boolean
  className?: string
}

const PALETTE = [
  'var(--gds-palette-0, #6366f1)',
  'var(--gds-palette-1, #8b5cf6)',
  'var(--gds-palette-2, #06b6d4)',
  'var(--gds-palette-3, #10b981)',
  'var(--gds-palette-4, #f59e0b)',
  'var(--gds-palette-5, #ef4444)',
  'var(--gds-palette-6, #ec4899)',
  'var(--gds-palette-7, #14b8a6)',
  'var(--gds-palette-8, #f97316)',
  'var(--gds-palette-9, #84cc16)',
]

function computePositions(
  count: number,
  cx: number,
  cy: number,
  radius: number
) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (2 * Math.PI * i) / count - Math.PI / 2
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    }
  })
}

export const NetworkGraph = forwardRef<HTMLDivElement, NetworkGraphProps>(
  function NetworkGraph(
    { nodes, edges, width = 400, height = 300, glass, className },
    ref
  ) {
    const centerX = width / 2
    const centerY = height / 2
    const layoutRadius = Math.min(centerX, centerY) * 0.65
    const positions = computePositions(
      nodes.length,
      centerX,
      centerY,
      layoutRadius
    )

    const nodeMap = new Map(nodes.map((n, i) => [n.id, i]))
    const nodeRadius = Math.max(
      8,
      Math.min(16, 120 / Math.max(nodes.length, 1))
    )

    return (
      <div
        ref={ref}
        className={cx(
          'gds-radius-popover border-border border',
          glass && 'bg-white/5 backdrop-blur-md',
          className
        )}
        data-component="network-graph"
      >
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          {edges.map((edge, i) => {
            const si = nodeMap.get(edge.source)
            const ti = nodeMap.get(edge.target)
            if (si === undefined || ti === undefined) return null
            const s = positions[si]
            const t = positions[ti]
            return (
              <line
                key={i}
                x1={s.x}
                y1={s.y}
                x2={t.x}
                y2={t.y}
                stroke="var(--gds-border, #374151)"
                strokeWidth={1.5}
                strokeOpacity={0.5}
              />
            )
          })}
          {nodes.map((node, i) => {
            const pos = positions[i]
            const color = PALETTE[(node.group ?? i) % PALETTE.length]
            return (
              <g key={node.id}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={nodeRadius}
                  fill={color}
                  fillOpacity={0.8}
                />
                <text
                  x={pos.x}
                  y={pos.y + nodeRadius + 14}
                  textAnchor="middle"
                  fill="var(--gds-fg-muted, #9ca3af)"
                  fontSize={10}
                >
                  {node.label}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    )
  }
)

export type { NetworkEdge, NetworkNode }
