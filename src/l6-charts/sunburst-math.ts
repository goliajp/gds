// sunburst-math — pure math helpers for sunburst chart arc computation

import type { SunburstNode } from './sunburst-chart'

export type ArcSegment = {
  depth: number
  index: number
  startAngle: number
  endAngle: number
}

// compute total value for a node (sum of children or own value)
export function nodeTotal(node: SunburstNode): number {
  if (node.children !== undefined && node.children.length > 0) {
    return node.children.reduce((sum, c) => sum + nodeTotal(c), 0)
  }
  return node.value ?? 0
}

// describe an arc path
export function arcPath(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startAngle: number,
  endAngle: number,
): string {
  // clamp to avoid full-circle issues
  const sweep = Math.min(endAngle - startAngle, 2 * Math.PI - 0.001)
  const largeArc = sweep > Math.PI ? 1 : 0

  const x1 = cx + outerR * Math.cos(startAngle)
  const y1 = cy + outerR * Math.sin(startAngle)
  const x2 = cx + outerR * Math.cos(startAngle + sweep)
  const y2 = cy + outerR * Math.sin(startAngle + sweep)
  const x3 = cx + innerR * Math.cos(startAngle + sweep)
  const y3 = cy + innerR * Math.sin(startAngle + sweep)
  const x4 = cx + innerR * Math.cos(startAngle)
  const y4 = cy + innerR * Math.sin(startAngle)

  return [
    `M ${x1} ${y1}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2} ${y2}`,
    `L ${x3} ${y3}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${x4} ${y4}`,
    'Z',
  ].join(' ')
}

// collect all arcs recursively
export function collectArcs(
  node: SunburstNode,
  depth: number,
  startAngle: number,
  endAngle: number,
  parentIndex: number,
): ArcSegment[] {
  if (node.children === undefined || node.children.length === 0) return []

  const arcs: ArcSegment[] = []
  const total = nodeTotal(node)
  if (total === 0) return []

  let angle = startAngle
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i]
    const childTotal = nodeTotal(child)
    const sweep = (childTotal / total) * (endAngle - startAngle)
    const childEnd = angle + sweep

    arcs.push({ depth, index: parentIndex * 10 + i, startAngle: angle, endAngle: childEnd })
    arcs.push(...collectArcs(child, depth + 1, angle, childEnd, parentIndex * 10 + i))
    angle = childEnd
  }

  return arcs
}
