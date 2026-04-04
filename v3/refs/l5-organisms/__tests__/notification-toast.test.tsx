import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { NotificationToast } from '../notification-toast'

describe('NotificationToast', () => {
  it('renders nothing when toasts array is empty', () => {
    const { container } = render(
      <NotificationToast toasts={[]} onClose={() => {}} />
    )
    expect(container.innerHTML).toBe('')
  })

  it('renders toast titles', () => {
    const toasts = [
      { id: '1', title: 'Saved', variant: 'success' as const },
      { id: '2', title: 'Error', variant: 'danger' as const },
    ]
    render(<NotificationToast toasts={toasts} onClose={() => {}} />)
    expect(screen.getByText('Saved')).toBeDefined()
    expect(screen.getByText('Error')).toBeDefined()
  })

  it('auto-dismisses after 5 seconds', () => {
    vi.useFakeTimers()
    const onClose = vi.fn()
    const toasts = [{ id: 'a', title: 'Test' }]
    render(<NotificationToast toasts={toasts} onClose={onClose} />)

    vi.advanceTimersByTime(5000)
    expect(onClose).toHaveBeenCalledWith('a')
    vi.useRealTimers()
  })

  it('renders in portal on document.body', () => {
    const toasts = [{ id: '1', title: 'Portal test' }]
    render(<NotificationToast toasts={toasts} onClose={() => {}} />)
    const el = document.body.querySelector(
      '[data-component="notification-toast"]'
    )
    expect(el).not.toBeNull()
  })
})
