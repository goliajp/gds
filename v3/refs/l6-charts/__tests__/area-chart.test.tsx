import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AreaChart } from '../area-chart'

const data = [
  { name: 'A', value: 10 },
  { name: 'B', value: 20 },
]

describe('AreaChart', () => {
  it('renders without crash', () => {
    const { container } = render(<AreaChart data={data} dataKey="value" />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<AreaChart data={data} dataKey="value" />)
    expect(
      container.querySelector('[data-component="area-chart"]')
    ).not.toBeNull()
  })

  it('merges className', () => {
    const { container } = render(
      <AreaChart className="custom-class" data={data} dataKey="value" />
    )
    const el = container.querySelector('[data-component="area-chart"]')
    expect(el?.className).toContain('custom-class')
  })
})
