import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { MetricTile } from '../metric-tile'

describe('MetricTile', () => {
  it('renders with data-component', () => {
    const { container } = render(<MetricTile label="CPU" value="72%" />)
    expect(
      container.querySelector('[data-component="metric-tile"]')
    ).not.toBeNull()
  })

  it('renders label and value', () => {
    render(<MetricTile label="Memory" value={85} unit="%" />)
    expect(screen.getByText('Memory')).toBeDefined()
    expect(screen.getByText('85')).toBeDefined()
    expect(screen.getByText('%')).toBeDefined()
  })

  it('renders without unit', () => {
    render(<MetricTile label="Requests" value={1200} />)
    expect(screen.getByText('1200')).toBeDefined()
    expect(screen.getByText('Requests')).toBeDefined()
  })
})
