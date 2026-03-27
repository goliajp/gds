import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { ListItem } from '../list-item'

describe('ListItem', () => {
  it('renders title', () => {
    render(<ListItem title="Settings" />)
    expect(screen.getByText('Settings')).toBeDefined()
  })

  it('shows icon when provided', () => {
    render(<ListItem title="Profile" icon={<span data-testid="icon">★</span>} />)
    expect(screen.getByTestId('icon')).toBeDefined()
  })

  it('renders trailing element', () => {
    render(<ListItem title="Notifications" trailing={<span data-testid="trail">ON</span>} />)
    expect(screen.getByTestId('trail')).toBeDefined()
  })

  it('applies active state', () => {
    const { container } = render(<ListItem title="Active item" active />)
    const el = container.querySelector('[data-component="list-item"]')
    expect(el?.getAttribute('data-state')).toBe('active')
  })
})
