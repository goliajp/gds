import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Toast } from '../toast'

describe('Toast', () => {
  it('renders without crash', () => {
    const { container } = render(<Toast title="Saved" />)
    expect(container.querySelector('[data-component="toast"]')).not.toBeNull()
  })

  it('has role="status"', () => {
    render(<Toast title="Saved" />)
    expect(screen.getByRole('status')).toBeDefined()
  })

  it('renders title', () => {
    render(<Toast title="Operation complete" />)
    expect(screen.getByText('Operation complete')).toBeDefined()
  })

  it('renders description', () => {
    render(<Toast title="Saved" description="Your changes have been saved" />)
    expect(screen.getByText('Your changes have been saved')).toBeDefined()
  })

  it('applies variant data attribute', () => {
    const { container } = render(<Toast title="Error" variant="danger" />)
    const el = container.querySelector('[data-component="toast"]')
    expect(el?.getAttribute('data-variant')).toBe('danger')
  })

  it('calls onClose when dismiss button clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<Toast title="Msg" onClose={onClose} />)
    await user.click(screen.getByLabelText('Dismiss'))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('does not render dismiss button without onClose', () => {
    render(<Toast title="Msg" />)
    expect(screen.queryByLabelText('Dismiss')).toBeNull()
  })
})
