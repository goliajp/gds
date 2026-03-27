import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Sheet } from '../sheet'

describe('Sheet', () => {
  it('renders nothing when closed', () => {
    const { container } = render(
      <Sheet open={false} onClose={vi.fn()}>Content</Sheet>,
    )
    expect(container.querySelector('[data-component="sheet"]')).toBeNull()
  })

  it('renders when open', () => {
    const { container } = render(
      <Sheet open={true} onClose={vi.fn()}>Sheet body</Sheet>,
    )
    expect(container.querySelector('[data-component="sheet"]')).not.toBeNull()
    expect(screen.getByText('Sheet body')).toBeDefined()
  })

  it('has data-state="open" when open', () => {
    const { container } = render(
      <Sheet open={true} onClose={vi.fn()}>Content</Sheet>,
    )
    expect(container.querySelector('[data-state="open"]')).not.toBeNull()
  })

  it('renders title and description', () => {
    render(
      <Sheet open={true} onClose={vi.fn()} title="Settings" description="Configure options">
        Body
      </Sheet>,
    )
    expect(screen.getByText('Settings')).toBeDefined()
    expect(screen.getByText('Configure options')).toBeDefined()
  })

  it('calls onClose when close button clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(
      <Sheet open={true} onClose={onClose} title="Title">Content</Sheet>,
    )
    await user.click(screen.getByLabelText('Close'))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onClose when backdrop clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    const { container } = render(
      <Sheet open={true} onClose={onClose}>Content</Sheet>,
    )
    const backdrop = container.querySelector('[data-component="sheet"]')!
    await user.click(backdrop)
    expect(onClose).toHaveBeenCalledOnce()
  })
})
