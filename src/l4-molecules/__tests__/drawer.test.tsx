import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Drawer } from '../drawer'

describe('Drawer', () => {
  it('renders nothing when closed', () => {
    const { container } = render(
      <Drawer open={false} onClose={vi.fn()}>Content</Drawer>,
    )
    expect(container.querySelector('[data-component="drawer"]')).toBeNull()
  })

  it('renders portal when open', () => {
    const { container } = render(
      <Drawer open={true} onClose={vi.fn()}>Drawer body</Drawer>,
    )
    expect(container.querySelector('[data-component="drawer"]')).not.toBeNull()
    expect(screen.getByText('Drawer body')).toBeDefined()
  })

  it('shows title when provided', () => {
    render(
      <Drawer open={true} onClose={vi.fn()} title="My Drawer">Content</Drawer>,
    )
    expect(screen.getByText('My Drawer')).toBeDefined()
  })

  it('calls onClose when backdrop clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    const { container } = render(
      <Drawer open={true} onClose={onClose}>Content</Drawer>,
    )
    const backdrop = container.querySelector('[data-component="drawer"]')!
    await user.click(backdrop)
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('shows drag handle', () => {
    render(
      <Drawer open={true} onClose={vi.fn()}>Content</Drawer>,
    )
    expect(screen.getByTestId('drag-handle')).toBeDefined()
  })
})
