import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FlowChart } from '../flow-chart'

const nodes = [
  { id: 'start', label: 'Start', type: 'start' as const },
  { id: 'process', label: 'Process', type: 'process' as const },
  { id: 'decide', label: 'OK?', type: 'decision' as const },
  { id: 'end', label: 'End', type: 'end' as const },
]

const edges = [
  { from: 'start', to: 'process' },
  { from: 'process', to: 'decide', label: 'next' },
  { from: 'decide', to: 'end', label: 'yes' },
]

describe('FlowChart', () => {
  it('renders nodes', () => {
    const { container } = render(<FlowChart nodes={nodes} edges={edges} />)
    const nodeEls = container.querySelectorAll('[data-node]')
    expect(nodeEls.length).toBe(4)
  })

  it('renders edges', () => {
    const { container } = render(<FlowChart nodes={nodes} edges={edges} />)
    const lines = container.querySelectorAll('line')
    expect(lines.length).toBe(3)
  })

  it('renders different node shapes', () => {
    const { container } = render(<FlowChart nodes={nodes} edges={edges} />)
    // decision node uses polygon
    expect(container.querySelector('polygon')).not.toBeNull()
    // others use rect
    expect(container.querySelectorAll('rect').length).toBe(3)
  })

  it('has data-component attribute', () => {
    const { container } = render(<FlowChart nodes={nodes} edges={edges} />)
    expect(container.querySelector('[data-component="flow-chart"]')).not.toBeNull()
  })

  it('applies glass mode', () => {
    const { container } = render(<FlowChart nodes={nodes} edges={edges} glass />)
    const el = container.querySelector('[data-component="flow-chart"]')
    expect(el?.className).toContain('backdrop-blur-md')
  })

  it('does not apply glass mode when glass is falsy', () => {
    const { container } = render(<FlowChart nodes={nodes} edges={edges} />)
    const el = container.querySelector('[data-component="flow-chart"]')
    expect(el?.className).not.toContain('backdrop-blur-md')
  })

  it('merges custom className', () => {
    const { container } = render(<FlowChart nodes={nodes} edges={edges} className="my-flow" />)
    const el = container.querySelector('[data-component="flow-chart"]')
    expect(el?.className).toContain('my-flow')
  })

  it('applies custom width and height', () => {
    const { container } = render(<FlowChart nodes={nodes} edges={edges} width={800} height={400} />)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('width')).toBe('800')
    expect(svg?.getAttribute('height')).toBe('400')
  })

  it('handles empty nodes and edges', () => {
    const { container } = render(<FlowChart nodes={[]} edges={[]} />)
    expect(container.querySelector('[data-component="flow-chart"]')).not.toBeNull()
  })

  it('handles single node', () => {
    const singleNode = [{ id: 'only', label: 'Only', type: 'process' as const }]
    const { container } = render(<FlowChart nodes={singleNode} edges={[]} />)
    const nodeEls = container.querySelectorAll('[data-node]')
    expect(nodeEls.length).toBe(1)
  })

  it('handles edge with invalid from/to (missing node)', () => {
    const badEdges = [{ from: 'nonexistent', to: 'also-missing' }]
    const { container } = render(<FlowChart nodes={nodes} edges={badEdges} />)
    // edge with unknown nodes returns null
    const lines = container.querySelectorAll('line')
    expect(lines.length).toBe(0)
  })

  it('renders edges without labels', () => {
    const noLabelEdges = [{ from: 'start', to: 'process' }]
    const { container } = render(<FlowChart nodes={nodes} edges={noLabelEdges} />)
    const lines = container.querySelectorAll('line')
    expect(lines.length).toBe(1)
  })

  it('renders edges with labels', () => {
    const labelEdges = [{ from: 'start', to: 'process', label: 'go' }]
    const { container } = render(<FlowChart nodes={nodes} edges={labelEdges} />)
    const texts = container.querySelectorAll('text')
    const textContents = Array.from(texts).map((t) => t.textContent)
    expect(textContents).toContain('go')
  })

  it('renders node without type (defaults to process)', () => {
    const noTypeNodes = [{ id: 'a', label: 'A' }]
    const { container } = render(<FlowChart nodes={noTypeNodes} edges={[]} />)
    const nodeEls = container.querySelectorAll('[data-node]')
    expect(nodeEls.length).toBe(1)
    // should render rect, not polygon
    expect(container.querySelector('rect')).not.toBeNull()
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<FlowChart nodes={nodes} edges={edges} ref={ref} />)
    expect(ref.current).not.toBeNull()
    expect(ref.current?.getAttribute('data-component')).toBe('flow-chart')
  })

  it('renders start/end nodes with rounded corners', () => {
    const startEnd = [
      { id: 's', label: 'Start', type: 'start' as const },
      { id: 'e', label: 'End', type: 'end' as const },
    ]
    const { container } = render(<FlowChart nodes={startEnd} edges={[]} />)
    const rects = container.querySelectorAll('rect')
    // start and end nodes get rx = NODE_H / 2 = 20
    for (const rect of Array.from(rects)) {
      expect(rect.getAttribute('rx')).toBe('20')
    }
  })
})
