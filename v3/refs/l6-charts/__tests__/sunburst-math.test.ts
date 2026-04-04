import { describe, expect, it } from 'vitest'

import { arcPath, collectArcs, nodeTotal } from '../sunburst-math'

describe('nodeTotal', () => {
  it('returns value for leaf node', () => {
    expect(nodeTotal({ name: 'A', value: 42 })).toBe(42)
  })

  it('returns 0 for leaf node without value', () => {
    expect(nodeTotal({ name: 'A' })).toBe(0)
  })

  it('sums children values recursively', () => {
    const node = {
      name: 'Root',
      children: [
        { name: 'A', value: 10 },
        { name: 'B', value: 20 },
      ],
    }
    expect(nodeTotal(node)).toBe(30)
  })

  it('handles nested children', () => {
    const node = {
      name: 'Root',
      children: [
        {
          name: 'A',
          children: [
            { name: 'A1', value: 5 },
            { name: 'A2', value: 3 },
          ],
        },
        { name: 'B', value: 10 },
      ],
    }
    expect(nodeTotal(node)).toBe(18)
  })

  it('returns 0 when children array is empty', () => {
    expect(nodeTotal({ name: 'X', children: [] })).toBe(0)
  })
})

describe('arcPath', () => {
  it('generates a valid SVG path string', () => {
    const path = arcPath(100, 100, 30, 60, 0, Math.PI / 2)
    expect(path).toContain('M')
    expect(path).toContain('A')
    expect(path).toContain('Z')
  })

  it('uses large arc flag for sweeps > PI', () => {
    const path = arcPath(100, 100, 30, 60, 0, Math.PI * 1.5)
    // large arc flag = 1 for outer arc
    expect(path).toContain(' 1 1 ')
  })

  it('uses small arc flag for sweeps <= PI', () => {
    const path = arcPath(100, 100, 30, 60, 0, Math.PI * 0.5)
    // large arc flag = 0 for outer arc
    expect(path).toContain(' 0 1 ')
  })

  it('clamps near-full-circle sweeps', () => {
    // sweep of exactly 2*PI should be clamped to avoid rendering issues
    const path = arcPath(100, 100, 30, 60, 0, 2 * Math.PI)
    expect(path).toContain('M')
    expect(path).toContain('Z')
  })
})

describe('collectArcs', () => {
  it('returns empty for leaf node', () => {
    const arcs = collectArcs({ name: 'A', value: 10 }, 0, 0, Math.PI * 2, 0)
    expect(arcs).toEqual([])
  })

  it('returns empty for node with empty children', () => {
    const arcs = collectArcs({ name: 'A', children: [] }, 0, 0, Math.PI * 2, 0)
    expect(arcs).toEqual([])
  })

  it('returns empty when total is 0', () => {
    const node = { name: 'Root', children: [{ name: 'A' }, { name: 'B' }] }
    const arcs = collectArcs(node, 0, 0, Math.PI * 2, 0)
    expect(arcs).toEqual([])
  })

  it('collects arcs for children', () => {
    const node = {
      name: 'Root',
      children: [
        { name: 'A', value: 30 },
        { name: 'B', value: 70 },
      ],
    }
    const arcs = collectArcs(node, 0, 0, Math.PI * 2, 0)
    expect(arcs.length).toBe(2)
    expect(arcs[0].depth).toBe(0)
    expect(arcs[1].depth).toBe(0)
  })

  it('collects nested arcs recursively', () => {
    const node = {
      name: 'Root',
      children: [
        { name: 'A', value: 30 },
        {
          name: 'B',
          children: [
            { name: 'B1', value: 10 },
            { name: 'B2', value: 20 },
          ],
        },
      ],
    }
    const arcs = collectArcs(node, 0, 0, Math.PI * 2, 0)
    // 2 top-level arcs + 2 nested arcs for B's children
    expect(arcs.length).toBe(4)
    expect(arcs.some((a) => a.depth === 1)).toBe(true)
  })
})
