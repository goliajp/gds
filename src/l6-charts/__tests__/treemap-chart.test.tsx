import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { TreemapChart } from '../treemap-chart'

const data = [
  { name: 'A', value: 100 },
  { name: 'B', value: 200 },
]

describe('TreemapChart', () => {
  it('renders without crash', () => {
    const { container } = render(<TreemapChart data={data} />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<TreemapChart data={data} />)
    expect(container.querySelector('[data-component="treemap-chart"]')).not.toBeNull()
  })

  it('merges className', () => {
    const { container } = render(<TreemapChart className="custom-class" data={data} />)
    const el = container.querySelector('[data-component="treemap-chart"]')
    expect(el?.className).toContain('custom-class')
  })
})
