import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { UserMenu } from '../user-menu'

const items = [
  { id: 'profile', label: 'Profile' },
  { id: 'logout', label: 'Logout', danger: true },
]

describe('UserMenu', () => {
  it('renders with data-component', () => {
    const { container } = render(
      <UserMenu name="Alice" items={items} onSelect={vi.fn()} />
    )
    expect(
      container.querySelector('[data-component="user-menu"]')
    ).not.toBeNull()
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

  it('renders avatar image when avatar URL is provided', () => {
    render(
      <UserMenu
        name="Alice"
        items={items}
        onSelect={vi.fn()}
        avatar="https://example.com/pic.jpg"
      />
    )
    const img = document.querySelector('img')
    expect(img?.getAttribute('src')).toBe('https://example.com/pic.jpg')
  })

  it('renders initials when no avatar', () => {
    render(<UserMenu name="Alice Smith" items={items} onSelect={vi.fn()} />)
    expect(screen.getByText('AS')).toBeDefined()
  })

  it('renders role text in dropdown', () => {
    render(
      <UserMenu name="Alice" items={items} onSelect={vi.fn()} role="Admin" />
    )
    fireEvent.click(screen.getByTestId('user-menu-trigger'))
    expect(screen.getByText('Admin')).toBeDefined()
  })

  it('renders item icon when provided', () => {
    const itemsWithIcon = [
      {
        id: 'profile',
        label: 'Profile',
        icon: <span data-testid="item-icon">👤</span>,
      },
    ]
    render(<UserMenu name="Alice" items={itemsWithIcon} onSelect={vi.fn()} />)
    fireEvent.click(screen.getByTestId('user-menu-trigger'))
    expect(screen.getByTestId('item-icon')).toBeDefined()
  })

  it('applies danger class to danger items', () => {
    render(<UserMenu name="Alice" items={items} onSelect={vi.fn()} />)
    fireEvent.click(screen.getByTestId('user-menu-trigger'))
    const logoutBtn = screen.getByText('Logout')
    expect(logoutBtn.className).toContain('text-danger')
  })

  it('closes dropdown on item click', () => {
    render(<UserMenu name="Alice" items={items} onSelect={vi.fn()} />)
    fireEvent.click(screen.getByTestId('user-menu-trigger'))
    expect(screen.getByTestId('user-menu-dropdown')).toBeDefined()
    fireEvent.click(screen.getByText('Profile'))
    expect(screen.queryByTestId('user-menu-dropdown')).toBeNull()
  })
})
