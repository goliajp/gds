import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { BarChart } from '../bar-chart'

const data = [
  { name: 'A', value: 10 },
  { name: 'B', value: 20 },
]

describe('BarChart', () => {
  it('renders without crash', () => {
    const { container } = render(<BarChart data={data} dataKey="value" />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<BarChart data={data} dataKey="value" />)
    expect(
      container.querySelector('[data-component="bar-chart"]')
    ).not.toBeNull()
  })

  it('merges className', () => {
    const { container } = render(
      <BarChart className="custom-class" data={data} dataKey="value" />
    )
    const el = container.querySelector('[data-component="bar-chart"]')
    expect(el?.className).toContain('custom-class')
  })
})
