import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ActivityFeed } from '../activity-feed'

const items = [
  {
    id: '1',
    user: 'Alice',
    action: 'created',
    target: 'Project X',
    timestamp: '2 min ago',
  },
  { id: '2', user: 'Bob', action: 'commented on', timestamp: '5 min ago' },
]

describe('ActivityFeed', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<ActivityFeed items={items} />)
    expect(
      container.querySelector('[data-component="activity-feed"]')
    ).not.toBeNull()
  })

  it('has role="list"', () => {
    render(<ActivityFeed items={items} />)
    expect(screen.getByRole('list')).toBeDefined()
  })

  it('renders user names and actions', () => {
    render(<ActivityFeed items={items} />)
    expect(screen.getByText('Alice')).toBeDefined()
    expect(screen.getByText('Bob')).toBeDefined()
  })

  it('renders target when provided', () => {
    render(<ActivityFeed items={items} />)
    expect(screen.getByText('Project X')).toBeDefined()
  })
})
