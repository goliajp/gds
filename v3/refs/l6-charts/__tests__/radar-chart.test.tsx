import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { RadarChart } from '../radar-chart'

const data = [
  { name: 'A', value: 10 },
  { name: 'B', value: 20 },
]

describe('RadarChart', () => {
  it('renders without crash', () => {
    const { container } = render(<RadarChart data={data} dataKey="value" />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<RadarChart data={data} dataKey="value" />)
    expect(
      container.querySelector('[data-component="radar-chart"]')
    ).not.toBeNull()
  })

  it('merges className', () => {
    const { container } = render(
      <RadarChart className="custom-class" data={data} dataKey="value" />
    )
    const el = container.querySelector('[data-component="radar-chart"]')
    expect(el?.className).toContain('custom-class')
  })
})
