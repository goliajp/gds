import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { EmptyPlaceholder } from '../empty-placeholder'

describe('EmptyPlaceholder', () => {
  it('renders message text', () => {
    render(<EmptyPlaceholder message="No items found" />)
    expect(screen.getByText('No items found')).toBeDefined()
  })

  it('renders data-component attribute', () => {
    const { container } = render(<EmptyPlaceholder message="Empty" />)
    expect(container.querySelector('[data-component="empty-placeholder"]')).not.toBeNull()
  })

  it('renders icon and action slots when provided', () => {
    render(
      <EmptyPlaceholder
        message="Nothing here"
        icon={<span>icon</span>}
        action={<button>Add</button>}
      />,
    )
    expect(screen.getByText('icon')).toBeDefined()
    expect(screen.getByText('Add')).toBeDefined()
  })
})
