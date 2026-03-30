import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Dialog } from '../dialog'

describe('Dialog', () => {
  it('renders nothing when closed', () => {
    render(
      <Dialog open={false} onClose={vi.fn()}>
        Content
      </Dialog>
    )
    expect(document.querySelector('[data-component="dialog"]')).toBeNull()
  })

  it('renders when open', () => {
    render(
      <Dialog open={true} onClose={vi.fn()}>
        Dialog body
      </Dialog>
    )
    expect(document.querySelector('[data-component="dialog"]')).not.toBeNull()
    expect(screen.getByText('Dialog body')).toBeDefined()
  })

  it('has data-state="open" when open', () => {
    render(
      <Dialog open={true} onClose={vi.fn()}>
        Content
      </Dialog>
    )
    expect(document.querySelector('[data-state="open"]')).not.toBeNull()
  })

  it('renders title and description', () => {
    render(
      <Dialog
        open={true}
        onClose={vi.fn()}
        title="My Dialog"
        description="Some info"
      >
        Body
      </Dialog>
    )
    expect(screen.getByText('My Dialog')).toBeDefined()
    expect(screen.getByText('Some info')).toBeDefined()
  })

  it('calls onClose when close button clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(
      <Dialog open={true} onClose={onClose} title="Title">
        Content
      </Dialog>
    )
    await user.click(screen.getByLabelText('Close'))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onClose when backdrop clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(
      <Dialog open={true} onClose={onClose}>
        Content
      </Dialog>
    )
    const backdrop = document.querySelector('[data-component="dialog"]')!
    await user.click(backdrop)
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('applies glass styling', () => {
    render(
      <Dialog open={true} onClose={vi.fn()} glass>
        Content
      </Dialog>
    )
    const dialog = document.querySelector('.gds-ctx')
    expect(dialog?.className).toContain('bg-bg/60')
    expect(dialog?.className).toContain('gds-glass')
  })

  it('uses custom width', () => {
    render(
      <Dialog open={true} onClose={vi.fn()} width="sm">
        Content
      </Dialog>
    )
    const dialog = document.querySelector('.gds-ctx')
    expect(dialog?.className).toContain('max-w-sm')
  })

  it('uses xl width', () => {
    render(
      <Dialog open={true} onClose={vi.fn()} width="xl">
        Content
      </Dialog>
    )
    const dialog = document.querySelector('.gds-ctx')
    expect(dialog?.className).toContain('max-w-4xl')
  })

  it('renders description without title', () => {
    render(
      <Dialog open={true} onClose={vi.fn()} description="Description only">
        Content
      </Dialog>
    )
    expect(screen.getByText('Description only')).toBeDefined()
  })

  it('does not render header section when no title or description', () => {
    render(
      <Dialog open={true} onClose={vi.fn()}>
        Content only
      </Dialog>
    )
    expect(screen.queryByLabelText('Close')).toBeNull()
  })
})
