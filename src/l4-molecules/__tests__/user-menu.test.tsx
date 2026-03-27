import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { UserMenu } from '../user-menu'

const items = [
  { id: 'profile', label: 'Profile' },
  { id: 'logout', label: 'Logout', danger: true },
]

describe('UserMenu', () => {
  it('renders with data-component', () => {
    const { container } = render(<UserMenu name="Alice" items={items} onSelect={vi.fn()} />)
    expect(container.querySelector('[data-component="user-menu"]')).not.toBeNull()
  })

  it('renders user name', () => {
    render(<UserMenu name="Alice Smith" items={items} onSelect={vi.fn()} />)
    expect(screen.getByText('Alice Smith')).toBeDefined()
  })

  it('opens dropdown on click', () => {
    render(<UserMenu name="Alice" items={items} onSelect={vi.fn()} />)
    fireEvent.click(screen.getByTestId('user-menu-trigger'))
    expect(screen.getByTestId('user-menu-dropdown')).toBeDefined()
    expect(screen.getByText('Profile')).toBeDefined()
  })

  it('calls onSelect when item clicked', () => {
    const handler = vi.fn()
    render(<UserMenu name="Alice" items={items} onSelect={handler} />)
    fireEvent.click(screen.getByTestId('user-menu-trigger'))
    fireEvent.click(screen.getByText('Profile'))
    expect(handler).toHaveBeenCalledWith('profile')
  })
})
