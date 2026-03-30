import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { ConfirmDialog } from '../confirm-dialog'

describe('ConfirmDialog', () => {
  it('renders nothing when closed', () => {
    render(<ConfirmDialog open={false} onClose={vi.fn()} onConfirm={vi.fn()} />)
    expect(
      document.querySelector('[data-component="confirm-dialog"]')
    ).toBeNull()
  })

  it('renders title and message when open', () => {
    render(
      <ConfirmDialog
        open={true}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        title="Delete?"
        message="This cannot be undone."
      />
    )
    expect(screen.getByText('Delete?')).toBeDefined()
    expect(screen.getByText('This cannot be undone.')).toBeDefined()
  })

  it('calls onConfirm when confirm button clicked', async () => {
    const user = userEvent.setup()
    const onConfirm = vi.fn()
    render(
      <ConfirmDialog
        open={true}
        onClose={vi.fn()}
        onConfirm={onConfirm}
        confirmLabel="Yes"
      />
    )
    await user.click(screen.getByText('Yes'))
    expect(onConfirm).toHaveBeenCalledOnce()
  })

  it('calls onClose when cancel button clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(
      <ConfirmDialog
        open={true}
        onClose={onClose}
        onConfirm={vi.fn()}
        cancelLabel="No"
      />
    )
    await user.click(screen.getByText('No'))
    expect(onClose).toHaveBeenCalledOnce()
  })
})
