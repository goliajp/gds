import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Alert } from '../alert'

describe('Alert', () => {
  it('renders without crash', () => {
    const { container } = render(<Alert>Test message</Alert>)
    expect(container.querySelector('[data-component="alert"]')).not.toBeNull()
  })

  it('has role="alert"', () => {
    render(<Alert>Test message</Alert>)
    expect(screen.getByRole('alert')).toBeDefined()
  })

  it('renders title when provided', () => {
    render(<Alert title="Warning">Details here</Alert>)
    expect(screen.getByText('Warning')).toBeDefined()
    expect(screen.getByText('Details here')).toBeDefined()
  })

  it('applies variant data attribute', () => {
    const { container } = render(<Alert variant="danger">Error</Alert>)
    const el = container.querySelector('[data-component="alert"]')
    expect(el?.getAttribute('data-variant')).toBe('danger')
  })

  it('calls onClose when dismiss button clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<Alert onClose={onClose}>Closeable</Alert>)
    const btn = screen.getByLabelText('Dismiss')
    await user.click(btn)
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('does not render dismiss button when onClose is undefined', () => {
    render(<Alert>No close</Alert>)
    expect(screen.queryByLabelText('Dismiss')).toBeNull()
  })
})
