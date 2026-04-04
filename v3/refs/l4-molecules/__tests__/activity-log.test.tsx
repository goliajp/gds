import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ActivityLog } from '../activity-log'

const entries = [
  {
    id: '1',
    actor: 'Alice',
    action: 'created',
    target: 'Issue #1',
    timestamp: '2024-01-01',
  },
  { id: '2', actor: 'Bob', action: 'closed', timestamp: '2024-01-02' },
]

describe('ActivityLog', () => {
  it('renders without crash', () => {
    const { container } = render(<ActivityLog entries={entries} />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<ActivityLog entries={entries} />)
    expect(
      container.querySelector('[data-component="activity-log"]')
    ).not.toBeNull()
  })

  it('renders all entries', () => {
    render(<ActivityLog entries={entries} />)
    expect(screen.getByText('Alice')).toBeDefined()
    expect(screen.getByText('Bob')).toBeDefined()
  })

  it('renders target when provided', () => {
    render(<ActivityLog entries={entries} />)
    expect(screen.getByText('Issue #1')).toBeDefined()
  })
})
