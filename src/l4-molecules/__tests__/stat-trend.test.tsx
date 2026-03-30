import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { StatTrend } from '../stat-trend'

describe('StatTrend', () => {
  it('renders without crash', () => {
    const { container } = render(
      <StatTrend label="Revenue" value="$1,234" trend={5.2} />
    )
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(
      <StatTrend label="Revenue" value="$1,234" trend={5.2} />
    )
    expect(
      container.querySelector('[data-component="stat-trend"]')
    ).not.toBeNull()
  })

  it('displays value and label', () => {
    render(<StatTrend label="Users" value="1,000" trend={3} />)
    expect(screen.getByText('Users')).toBeDefined()
    expect(screen.getByText('1,000')).toBeDefined()
  })

  it('applies custom className', () => {
    const { container } = render(
      <StatTrend className="custom" label="X" value="0" trend={0} />
    )
    expect(
      container.querySelector('[data-component="stat-trend"]')?.className
    ).toContain('custom')
  })
})
