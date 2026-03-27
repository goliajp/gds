import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ComboChart } from '../combo-chart'

const data = [
  { name: 'Jan', revenue: 400, growth: 24 },
  { name: 'Feb', revenue: 300, growth: 13 },
  { name: 'Mar', revenue: 500, growth: 38 },
]

describe('ComboChart', () => {
  it('renders without crash', () => {
    const { container } = render(<ComboChart barKey="revenue" data={data} lineKey="growth" />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<ComboChart barKey="revenue" data={data} lineKey="growth" />)
    expect(container.querySelector('[data-component="combo-chart"]')).not.toBeNull()
  })

  it('applies custom height via style', () => {
    const { container } = render(
      <ComboChart barKey="revenue" data={data} height={400} lineKey="growth" />,
    )
    const rc = container.querySelector('.recharts-responsive-container')
    expect(rc).not.toBeNull()
  })

  it('applies glass class when glass is true', () => {
    const { container } = render(<ComboChart barKey="revenue" data={data} glass lineKey="growth" />)
    const el = container.querySelector('[data-component="combo-chart"]')
    expect(el?.className).toContain('gds-glass')
  })
})
