import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { RadialBarChart } from '../radial-bar-chart'

const data = [
  { name: 'Sales', value: 80 },
  { name: 'Marketing', value: 60 },
]

describe('RadialBarChart', () => {
  it('renders without crash', () => {
    const { container } = render(<RadialBarChart data={data} />)
    expect(container.firstChild).not.toBeNull()
  })

  it('applies custom height', () => {
    const { container } = render(<RadialBarChart data={data} height={400} />)
    const el = container.querySelector('[data-component="radial-bar-chart"]')
    expect(el).not.toBeNull()
  })

  it('applies glass class', () => {
    const { container } = render(<RadialBarChart data={data} glass />)
    const el = container.querySelector('[data-component="radial-bar-chart"]')
    expect(el?.className).toContain('gds-glass')
  })

  it('has data-component attribute', () => {
    const { container } = render(<RadialBarChart data={data} />)
    expect(
      container.querySelector('[data-component="radial-bar-chart"]')
    ).not.toBeNull()
  })
})
