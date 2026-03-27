import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { NotificationList } from '../notification-list'

const items = [
  { id: '1', title: 'Deploy complete', message: 'v2.0 is live', timestamp: '2 min ago' },
  { id: '2', title: 'New comment', timestamp: '5 min ago', read: true },
]

describe('NotificationList', () => {
  it('renders with data-component', () => {
    const { container } = render(<NotificationList notifications={items} />)
    expect(container.querySelector('[data-component="notification-list"]')).not.toBeNull()
  })

  it('renders notification titles', () => {
    render(<NotificationList notifications={items} />)
    expect(screen.getByText('Deploy complete')).toBeDefined()
    expect(screen.getByText('New comment')).toBeDefined()
  })

  it('shows empty state when no notifications', () => {
    render(<NotificationList notifications={[]} />)
    expect(screen.getByText('No notifications')).toBeDefined()
  })

  it('calls onRead when item is clicked', () => {
    const onRead = vi.fn()
    render(<NotificationList notifications={items} onRead={onRead} />)
    fireEvent.click(screen.getByText('Deploy complete'))
    expect(onRead).toHaveBeenCalledWith('1')
  })
})
