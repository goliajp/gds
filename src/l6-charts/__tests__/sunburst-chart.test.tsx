import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SunburstChart } from '../sunburst-chart'

const data = {
  name: 'Root',
  children: [
    { name: 'A', value: 30 },
    {
      name: 'B',
      children: [
        { name: 'B1', value: 10 },
        { name: 'B2', value: 20 },
      ],
    },
    { name: 'C', value: 40 },
  ],
}

describe('SunburstChart', () => {
  it('renders SVG element', () => {
    const { container } = render(<SunburstChart data={data} />)
    expect(container.querySelector('svg')).not.toBeNull()
  })

  it('shows center label with root name', () => {
    const { container } = render(<SunburstChart data={data} />)
    const label = container.querySelector('[data-center-label]')
    expect(label?.textContent).toBe('Root')
  })

  it('renders arc segments', () => {
    const { container } = render(<SunburstChart data={data} />)
    const arcs = container.querySelectorAll('[data-arc]')
    // 3 first-level children + 2 second-level children of B = 5 arcs
    expect(arcs.length).toBe(5)
  })

  it('has data-component attribute', () => {
    const { container } = render(<SunburstChart data={data} />)
    expect(
      container.querySelector('[data-component="sunburst-chart"]')
    ).not.toBeNull()
  })
})
