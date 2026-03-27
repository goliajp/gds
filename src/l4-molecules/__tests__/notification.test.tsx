import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Notification } from '../notification'

describe('Notification', () => {
  it('renders title', () => {
    render(<Notification title="System update available" />)
    expect(screen.getByText('System update available')).toBeDefined()
  })

  it('shows description when provided', () => {
    render(<Notification title="Update" description="A new version is ready to install" />)
    expect(screen.getByText('A new version is ready to install')).toBeDefined()
  })

  it('shows close button when onClose is provided', () => {
    render(<Notification title="Info" onClose={() => {}} />)
    expect(screen.getByLabelText('Dismiss')).toBeDefined()
  })

  it('calls onClose when dismiss button is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<Notification title="Info" onClose={onClose} />)
    await user.click(screen.getByLabelText('Dismiss'))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('shows action slot when provided', () => {
    render(<Notification title="Info" action={<button>Retry</button>} />)
    expect(screen.getByText('Retry')).toBeDefined()
  })

  it('applies variant data attribute', () => {
    const { container } = render(<Notification title="Error" variant="danger" />)
    const el = container.querySelector('[data-component="notification"]')
    expect(el?.getAttribute('data-variant')).toBe('danger')
  })
})
