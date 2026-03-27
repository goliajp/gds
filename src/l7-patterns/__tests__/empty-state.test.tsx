import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { EmptyState } from '../empty-state'

describe('EmptyState', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<EmptyState title="No data" />)
    expect(container.querySelector('[data-component="empty-state"]')).not.toBeNull()
  })

  it('renders title', () => {
    render(<EmptyState title="Nothing here" />)
    expect(screen.getByText('Nothing here')).toBeDefined()
  })

  it('renders description when provided', () => {
    render(<EmptyState title="Empty" description="Try adding some items" />)
    expect(screen.getByText('Try adding some items')).toBeDefined()
  })

  it('renders action slot', () => {
    render(<EmptyState title="Empty" action={<button>Add item</button>} />)
    expect(screen.getByText('Add item')).toBeDefined()
  })
})
