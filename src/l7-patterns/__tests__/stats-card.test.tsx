import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { StatsCard } from '../stats-card'

describe('StatsCard', () => {
  it('renders label and value', () => {
    render(<StatsCard label="Revenue" value="$12,345" />)
    expect(screen.getByText('Revenue')).toBeDefined()
    expect(screen.getByText('$12,345')).toBeDefined()
  })

  it('shows trend with correct color', () => {
    const { container } = render(<StatsCard label="Users" value={100} trend={12} />)
    const badge = container.querySelector('[data-component="stats-card"] span')
    expect(badge?.textContent).toContain('+12%')
    expect(badge?.className).toContain('text-success')
  })

  it('renders sparkline when sparkData provided', () => {
    const { container } = render(
      <StatsCard label="Sales" value={50} sparkData={[1, 3, 2, 5, 4]} />,
    )
    const svg = container.querySelector('svg')
    expect(svg).not.toBeNull()
    expect(svg?.querySelector('polyline')).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<StatsCard label="Test" value={0} />)
    expect(container.querySelector('[data-component="stats-card"]')).not.toBeNull()
  })
})
