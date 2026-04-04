import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { LineChart } from '../line-chart'

const data = [
  { name: 'A', value: 10 },
  { name: 'B', value: 20 },
]

describe('LineChart', () => {
  it('renders without crash', () => {
    const { container } = render(<LineChart data={data} dataKey="value" />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<LineChart data={data} dataKey="value" />)
    expect(
      container.querySelector('[data-component="line-chart"]')
    ).not.toBeNull()
  })

  it('merges className', () => {
    const { container } = render(
      <LineChart className="custom-class" data={data} dataKey="value" />
    )
    const el = container.querySelector('[data-component="line-chart"]')
    expect(el?.className).toContain('custom-class')
  })
})
