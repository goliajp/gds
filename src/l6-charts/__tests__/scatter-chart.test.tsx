import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ScatterChart } from '../scatter-chart'

const data = [
  { x: 10, y: 20 },
  { x: 30, y: 40 },
]

describe('ScatterChart', () => {
  it('renders without crash', () => {
    const { container } = render(<ScatterChart data={data} xKey="x" yKey="y" />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<ScatterChart data={data} xKey="x" yKey="y" />)
    expect(container.querySelector('[data-component="scatter-chart"]')).not.toBeNull()
  })

  it('merges className', () => {
    const { container } = render(<ScatterChart className="custom-class" data={data} xKey="x" yKey="y" />)
    const el = container.querySelector('[data-component="scatter-chart"]')
    expect(el?.className).toContain('custom-class')
  })
})
