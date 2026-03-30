import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { NotificationBell } from '../notification-bell'

describe('NotificationBell', () => {
  it('renders with data-component', () => {
    const { container } = render(
      <NotificationBell unread={0} onClick={() => {}} />
    )
    expect(
      container.querySelector('[data-component="notification-bell"]')
    ).not.toBeNull()
  })

  it('shows unread count when > 0', () => {
    const { getByText } = render(
      <NotificationBell unread={5} onClick={() => {}} />
    )
    expect(getByText('5')).toBeDefined()
  })

  it('shows 99+ when unread > 99', () => {
    const { getByText } = render(
      <NotificationBell unread={100} onClick={() => {}} />
    )
    expect(getByText('99+')).toBeDefined()
  })

  it('does not show badge when unread is 0', () => {
    const { container } = render(
      <NotificationBell unread={0} onClick={() => {}} />
    )
    const badge = container.querySelector('.bg-danger')
    expect(badge).toBeNull()
  })

  it('applies animate-pulse when unread > 0', () => {
    const { container } = render(
      <NotificationBell unread={3} onClick={() => {}} />
    )
    const svg = container.querySelector('svg')!
    expect(svg.getAttribute('class')).toContain('animate-pulse')
  })

  it('does not apply animate-pulse when unread is 0', () => {
    const { container } = render(
      <NotificationBell unread={0} onClick={() => {}} />
    )
    const svg = container.querySelector('svg')!
    const cls = svg.getAttribute('class') ?? ''
    expect(cls).not.toContain('animate-pulse')
  })

  it('has correct aria-label with unread', () => {
    const { container } = render(
      <NotificationBell unread={3} onClick={() => {}} />
    )
    const btn = container.querySelector('button')!
    expect(btn.getAttribute('aria-label')).toBe('Notifications (3 unread)')
  })

  it('has correct aria-label without unread', () => {
    const { container } = render(
      <NotificationBell unread={0} onClick={() => {}} />
    )
    const btn = container.querySelector('button')!
    expect(btn.getAttribute('aria-label')).toBe('Notifications')
  })

  it('calls onClick when clicked', () => {
    const handler = vi.fn()
    const { container } = render(
      <NotificationBell unread={0} onClick={handler} />
    )
    fireEvent.click(container.querySelector('button')!)
    expect(handler).toHaveBeenCalledOnce()
  })

  it('merges custom className', () => {
    const { container } = render(
      <NotificationBell unread={0} onClick={() => {}} className="extra" />
    )
    const btn = container.querySelector('button')!
    expect(btn.className).toContain('extra')
  })
})
