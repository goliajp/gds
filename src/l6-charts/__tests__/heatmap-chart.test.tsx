import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { HeatmapChart } from '../heatmap-chart'

const data = [
  [1, 2, 3],
  [4, 5, 6],
]

describe('HeatmapChart', () => {
  it('renders without crash', () => {
    const { container } = render(<HeatmapChart data={data} />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<HeatmapChart data={data} />)
    expect(container.querySelector('[data-component="heatmap-chart"]')).not.toBeNull()
  })

  it('renders correct number of cells', () => {
    const { container } = render(<HeatmapChart data={data} />)
    const cells = container.querySelectorAll('.rounded-sm')
    expect(cells.length).toBe(6)
  })

  it('merges className', () => {
    const { container } = render(<HeatmapChart className="custom-class" data={data} />)
    const el = container.querySelector('[data-component="heatmap-chart"]')
    expect(el?.className).toContain('custom-class')
  })
})
