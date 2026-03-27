import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { RecentActivity } from '../recent-activity'

const items = [
  { user: 'Alice', action: 'pushed to main', timestamp: '2m ago' },
  { user: 'Bob', action: 'merged PR #42', timestamp: '10m ago' },
]

describe('RecentActivity', () => {
  it('renders with data-component', () => {
    const { container } = render(<RecentActivity items={items} />)
    expect(container.querySelector('[data-component="recent-activity"]')).not.toBeNull()
  })

  it('renders title and items', () => {
    render(<RecentActivity items={items} title="Activity" />)
    expect(screen.getByText('Activity')).toBeDefined()
    expect(screen.getByText('Alice')).toBeDefined()
    expect(screen.getByText('2m ago')).toBeDefined()
  })

  it('shows empty state when no items', () => {
    render(<RecentActivity items={[]} />)
    expect(screen.getByText('No activity')).toBeDefined()
  })
})
