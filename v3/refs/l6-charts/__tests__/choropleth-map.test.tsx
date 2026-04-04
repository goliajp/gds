import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ChoroplethMap } from '../choropleth-map'

const data = [
  { id: 'kanto', value: 80 },
  { id: 'kansai', value: 60 },
]

describe('ChoroplethMap', () => {
  it('renders without crash', () => {
    const { container } = render(<ChoroplethMap data={data} />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<ChoroplethMap data={data} />)
    expect(
      container.querySelector('[data-component="choropleth-map"]')
    ).not.toBeNull()
  })

  it('renders SVG region paths', () => {
    const { container } = render(<ChoroplethMap data={data} />)
    const paths = container.querySelectorAll('path')
    expect(paths.length).toBeGreaterThan(0)
  })

  it('applies custom className', () => {
    const { container } = render(
      <ChoroplethMap className="custom" data={data} />
    )
    expect(
      container.querySelector('[data-component="choropleth-map"]')?.className
    ).toContain('custom')
  })
})
