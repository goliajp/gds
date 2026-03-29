import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { LiveMetric } from '../live-metric'

describe('LiveMetric', () => {
  it('renders without crash', () => {
    const { container } = render(<LiveMetric label="CPU" value={85} />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<LiveMetric label="CPU" value={85} />)
    expect(container.querySelector('[data-component="live-metric"]')).not.toBeNull()
  })

  it('displays value and label', () => {
    render(<LiveMetric label="Memory" value={4096} unit="MB" />)
    expect(screen.getByText('Memory')).toBeDefined()
    expect(screen.getByText('4096')).toBeDefined()
    expect(screen.getByText('MB')).toBeDefined()
  })

  it('renders pulse indicator when pulse is true', () => {
    const { container } = render(<LiveMetric label="Live" value={1} pulse />)
    expect(container.querySelector('.animate-ping')).not.toBeNull()
  })
})
