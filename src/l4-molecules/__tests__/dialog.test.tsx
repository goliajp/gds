import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Dialog } from '../dialog'

describe('Dialog', () => {
  it('renders nothing when closed', () => {
    render(
      <Dialog open={false} onClose={vi.fn()}>Content</Dialog>,
    )
    expect(document.querySelector('[data-component="dialog"]')).toBeNull()
  })

  it('renders when open', () => {
    render(
      <Dialog open={true} onClose={vi.fn()}>Dialog body</Dialog>,
    )
    expect(document.querySelector('[data-component="dialog"]')).not.toBeNull()
    expect(screen.getByText('Dialog body')).toBeDefined()
  })

  it('has data-state="open" when open', () => {
    render(
      <Dialog open={true} onClose={vi.fn()}>Content</Dialog>,
    )
    expect(document.querySelector('[data-state="open"]')).not.toBeNull()
  })

  it('renders title and description', () => {
    render(
      <Dialog open={true} onClose={vi.fn()} title="My Dialog" description="Some info">
        Body
      </Dialog>,
    )
    expect(screen.getByText('My Dialog')).toBeDefined()
    expect(screen.getByText('Some info')).toBeDefined()
  })

  it('calls onClose when close button clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(
      <Dialog open={true} onClose={onClose} title="Title">Content</Dialog>,
    )
    await user.click(screen.getByLabelText('Close'))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onClose when backdrop clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(
      <Dialog open={true} onClose={onClose}>Content</Dialog>,
    )
    const backdrop = document.querySelector('[data-component="dialog"]')!
    await user.click(backdrop)
    expect(onClose).toHaveBeenCalledOnce()
  })
})
