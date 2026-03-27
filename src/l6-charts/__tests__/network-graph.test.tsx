import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { NetworkGraph } from '../network-graph'

const nodes = [
  { id: 'a', label: 'Node A', group: 0 },
  { id: 'b', label: 'Node B', group: 1 },
  { id: 'c', label: 'Node C', group: 0 },
]

const edges = [
  { source: 'a', target: 'b' },
  { source: 'b', target: 'c' },
]

describe('NetworkGraph', () => {
  it('renders nodes', () => {
    const { container } = render(<NetworkGraph nodes={nodes} edges={edges} />)
    const circles = container.querySelectorAll('circle')
    expect(circles.length).toBe(3)
  })

  it('renders edges', () => {
    const { container } = render(<NetworkGraph nodes={nodes} edges={edges} />)
    const lines = container.querySelectorAll('line')
    expect(lines.length).toBe(2)
  })

  it('applies glass class', () => {
    const { container } = render(<NetworkGraph nodes={nodes} edges={edges} glass />)
    const el = container.querySelector('[data-component="network-graph"]')
    expect(el?.className).toContain('backdrop-blur-md')
  })

  it('has data-component attribute', () => {
    const { container } = render(<NetworkGraph nodes={nodes} edges={edges} />)
    expect(container.querySelector('[data-component="network-graph"]')).not.toBeNull()
  })
})
