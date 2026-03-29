import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { PolarAreaChart } from '../polar-area-chart'

const data = [
  { label: 'A', value: 30 },
  { label: 'B', value: 50 },
  { label: 'C', value: 20 },
]

describe('PolarAreaChart', () => {
  it('renders without crash', () => {
    const { container } = render(<PolarAreaChart data={data} />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<PolarAreaChart data={data} />)
    expect(container.querySelector('[data-component="polar-area-chart"]')).not.toBeNull()
  })

  it('renders SVG path segments', () => {
    const { container } = render(<PolarAreaChart data={data} />)
    const paths = container.querySelectorAll('path')
    expect(paths.length).toBe(3)
  })

  it('applies custom className', () => {
    const { container } = render(<PolarAreaChart className="custom" data={data} />)
    expect(container.querySelector('[data-component="polar-area-chart"]')?.className).toContain('custom')
  })
})
