import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Timeline } from '../timeline'

const items = [
  {
    id: '1',
    title: 'Created',
    date: '2025-01-01',
    variant: 'success' as const,
  },
  {
    id: '2',
    title: 'Updated',
    description: 'Fixed a bug',
    variant: 'warning' as const,
  },
  { id: '3', title: 'Deleted', variant: 'danger' as const },
]

describe('Timeline', () => {
  it('renders without crash', () => {
    const { container } = render(<Timeline items={items} />)
    expect(
      container.querySelector('[data-component="timeline"]')
    ).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<Timeline items={items} />)
    expect(
      container.querySelector('[data-component="timeline"]')
    ).not.toBeNull()
  })

  it('renders item titles', () => {
    render(<Timeline items={items} />)
    expect(screen.getByText('Created')).toBeDefined()
    expect(screen.getByText('Updated')).toBeDefined()
    expect(screen.getByText('Deleted')).toBeDefined()
  })

  it('renders date and description when provided', () => {
    render(<Timeline items={items} />)
    expect(screen.getByText('2025-01-01')).toBeDefined()
    expect(screen.getByText('Fixed a bug')).toBeDefined()
  })

  it('renders custom icon when provided', () => {
    const itemsWithIcon = [
      {
        id: '1',
        title: 'Deployed',
        icon: <span data-testid="deploy-icon">D</span>,
      },
    ]
    render(<Timeline items={itemsWithIcon} />)
    expect(screen.getByTestId('deploy-icon')).toBeDefined()
  })

  it('uses default variant when none provided', () => {
    const defaultItems = [{ id: '1', title: 'Default' }]
    const { container } = render(<Timeline items={defaultItems} />)
    expect(container.querySelector('.bg-fg-muted')).not.toBeNull()
  })

  it('does not render date when not provided', () => {
    const noDateItems = [{ id: '1', title: 'No date' }]
    render(<Timeline items={noDateItems} />)
    expect(screen.getByText('No date')).toBeDefined()
  })

  it('does not render description when not provided', () => {
    const noDescItems = [{ id: '1', title: 'No desc' }]
    render(<Timeline items={noDescItems} />)
    expect(screen.getByText('No desc')).toBeDefined()
  })

  it('applies custom className', () => {
    const { container } = render(
      <Timeline items={items} className="my-timeline" />
    )
    const root = container.querySelector('[data-component="timeline"]')
    expect(root?.className).toContain('my-timeline')
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<Timeline items={items} ref={ref} />)
    expect(ref.current).not.toBeNull()
  })
})
