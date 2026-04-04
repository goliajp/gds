import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { TrendIndicator } from '../trend-indicator'

describe('TrendIndicator', () => {
  it('renders without crash', () => {
    const { container } = render(<TrendIndicator value={5} />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<TrendIndicator value={0} />)
    expect(
      container.querySelector('[data-component="trend-indicator"]')
    ).not.toBeNull()
  })

  it('displays positive value with plus sign', () => {
    render(<TrendIndicator value={12} />)
    expect(screen.getByText('+12%')).toBeDefined()
  })

  it('displays zero value', () => {
    const { container } = render(<TrendIndicator value={0} />)
    expect(
      container.querySelector('[data-component="trend-indicator"]')?.className
    ).toContain('text-fg-muted')
  })
})
