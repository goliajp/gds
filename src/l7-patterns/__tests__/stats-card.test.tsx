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

  it('shows negative trend with danger color', () => {
    const { container } = render(<StatsCard label="Users" value={100} trend={-5} />)
    const badge = container.querySelector('[data-component="stats-card"] span')
    expect(badge?.textContent).toContain('-5%')
    expect(badge?.className).toContain('text-danger')
  })

  it('renders icon when provided', () => {
    render(<StatsCard label="Sales" value={10} icon={<span data-testid="icon">$</span>} />)
    expect(screen.getByTestId('icon')).toBeDefined()
  })

  it('does not render trend badge when trend is undefined', () => {
    const { container } = render(<StatsCard label="Test" value={0} />)
    const spans = container.querySelectorAll('[data-component="stats-card"] .rounded-full')
    expect(spans.length).toBe(0)
  })

  it('applies glass classes when glass is true', () => {
    const { container } = render(<StatsCard label="Test" value={0} glass />)
    const el = container.querySelector('[data-component="stats-card"]')
    expect(el?.className).toContain('gds-glass')
  })

  it('applies surface background when glass is false', () => {
    const { container } = render(<StatsCard label="Test" value={0} />)
    const el = container.querySelector('[data-component="stats-card"]')
    expect(el?.className).toContain('bg-surface')
  })

  it('does not render sparkline when sparkData has fewer than 2 points', () => {
    const { container } = render(<StatsCard label="Test" value={0} sparkData={[1]} />)
    expect(container.querySelector('svg')).toBeNull()
  })

  it('does not render sparkline when sparkData is undefined', () => {
    const { container } = render(<StatsCard label="Test" value={0} />)
    expect(container.querySelector('svg')).toBeNull()
  })

  it('handles sparkData with equal values (zero range)', () => {
    const { container } = render(<StatsCard label="Test" value={0} sparkData={[5, 5, 5]} />)
    const svg = container.querySelector('svg')
    expect(svg).not.toBeNull()
  })

  it('renders trend=0 as positive', () => {
    const { container } = render(<StatsCard label="Users" value={100} trend={0} />)
    const badge = container.querySelector('[data-component="stats-card"] span')
    expect(badge?.textContent).toContain('+0%')
    expect(badge?.className).toContain('text-success')
  })
})
