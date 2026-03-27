import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { PieChart } from '../pie-chart'

const data = [
  { name: 'A', value: 30 },
  { name: 'B', value: 70 },
]

describe('PieChart', () => {
  it('renders without crash', () => {
    const { container } = render(<PieChart data={data} dataKey="value" />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<PieChart data={data} dataKey="value" />)
    expect(container.querySelector('[data-component="pie-chart"]')).not.toBeNull()
  })

  it('merges className', () => {
    const { container } = render(<PieChart className="custom-class" data={data} dataKey="value" />)
    const el = container.querySelector('[data-component="pie-chart"]')
    expect(el?.className).toContain('custom-class')
  })
})
