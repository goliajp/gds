import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SankeyChart } from '../sankey-chart'

const nodes = [{ name: 'A' }, { name: 'B' }, { name: 'C' }]
const links = [
  { source: 0, target: 1, value: 10 },
  { source: 1, target: 2, value: 5 },
]

describe('SankeyChart', () => {
  it('renders without crash', () => {
    const { container } = render(<SankeyChart links={links} nodes={nodes} />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<SankeyChart links={links} nodes={nodes} />)
    expect(
      container.querySelector('[data-component="sankey-chart"]')
    ).not.toBeNull()
  })

  it('merges className', () => {
    const { container } = render(
      <SankeyChart className="custom-class" links={links} nodes={nodes} />
    )
    const el = container.querySelector('[data-component="sankey-chart"]')
    expect(el?.className).toContain('custom-class')
  })
})
