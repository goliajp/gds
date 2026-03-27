import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Timeline } from '../timeline'

const items = [
  { id: '1', title: 'Created', date: '2025-01-01', variant: 'success' as const },
  { id: '2', title: 'Updated', description: 'Fixed a bug', variant: 'warning' as const },
  { id: '3', title: 'Deleted', variant: 'danger' as const },
]

describe('Timeline', () => {
  it('renders without crash', () => {
    const { container } = render(<Timeline items={items} />)
    expect(container.querySelector('[data-component="timeline"]')).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<Timeline items={items} />)
    expect(container.querySelector('[data-component="timeline"]')).not.toBeNull()
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
})
