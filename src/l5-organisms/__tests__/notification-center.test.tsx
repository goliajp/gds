import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { NotificationCenter } from '../notification-center'

const sampleNotifications = [
  { id: '1', title: 'Build succeeded', message: 'Deploy v1.2.3 complete', variant: 'success' as const },
  { id: '2', title: 'Disk warning', variant: 'warning' as const },
  { id: '3', title: 'New comment', message: 'Alice replied to your PR', variant: 'info' as const },
]

describe('NotificationCenter', () => {
  it('renders notifications', () => {
    render(<NotificationCenter notifications={sampleNotifications} />)
    expect(screen.getByText('Build succeeded')).toBeDefined()
    expect(screen.getByText('Disk warning')).toBeDefined()
    expect(screen.getByText('New comment')).toBeDefined()
  })

  it('shows dismiss buttons when onClose provided', () => {
    const onClose = vi.fn()
    const { container } = render(
      <NotificationCenter notifications={sampleNotifications} onClose={onClose} />,
    )
    const dismissButtons = container.querySelectorAll('[aria-label="Dismiss"]')
    expect(dismissButtons.length).toBe(3)
  })

  it('shows clear all button when onClear provided', () => {
    const onClear = vi.fn()
    render(<NotificationCenter notifications={sampleNotifications} onClear={onClear} />)
    expect(screen.getByText('Clear all')).toBeDefined()
  })

  it('shows empty state when no notifications', () => {
    render(<NotificationCenter notifications={[]} />)
    expect(screen.getByText('No notifications')).toBeDefined()
  })

  it('sets data-component attribute', () => {
    const { container } = render(<NotificationCenter notifications={[]} />)
    expect(container.querySelector('[data-component="notification-center"]')).toBeDefined()
  })
})
