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
})
