import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Drawer } from '../drawer'

describe('Drawer', () => {
  it('renders nothing when closed', () => {
    const { container } = render(
      <Drawer open={false} onClose={vi.fn()}>
        Content
      </Drawer>
    )
    expect(container.querySelector('[data-component="drawer"]')).toBeNull()
  })

  it('renders portal when open', () => {
    const { container } = render(
      <Drawer open={true} onClose={vi.fn()}>
        Drawer body
      </Drawer>
    )
    expect(container.querySelector('[data-component="drawer"]')).not.toBeNull()
    expect(screen.getByText('Drawer body')).toBeDefined()
  })

  it('shows title when provided', () => {
    render(
      <Drawer open={true} onClose={vi.fn()} title="My Drawer">
        Content
      </Drawer>
    )
    expect(screen.getByText('My Drawer')).toBeDefined()
  })

  it('calls onClose when backdrop clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    const { container } = render(
      <Drawer open={true} onClose={onClose}>
        Content
      </Drawer>
    )
    const backdrop = container.querySelector('[data-component="drawer"]')!
    await user.click(backdrop)
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('shows drag handle', () => {
    render(
      <Drawer open={true} onClose={vi.fn()}>
        Content
      </Drawer>
    )
    expect(screen.getByTestId('drag-handle')).toBeDefined()
  })

  it('applies glass styling when glass is true', () => {
    const { container } = render(
      <Drawer open={true} onClose={vi.fn()} glass>
        Content
      </Drawer>
    )
    const inner = container.querySelector('.gds-ctx')
    expect(inner?.className).toContain('bg-bg/60')
    expect(inner?.className).toContain('gds-glass')
  })

  it('applies normal styling when glass is not set', () => {
    const { container } = render(
      <Drawer open={true} onClose={vi.fn()}>
        Content
      </Drawer>
    )
    const inner = container.querySelector('.gds-ctx')
    expect(inner?.className).toContain('border-border')
    expect(inner?.className).toContain('bg-surface')
  })

  it('uses custom height', () => {
    const { container } = render(
      <Drawer open={true} onClose={vi.fn()} height="lg">
        Content
      </Drawer>
    )
    const inner = container.querySelector('.gds-ctx')
    expect(inner?.className).toContain('h-[75vh]')
  })

  it('uses full height', () => {
    const { container } = render(
      <Drawer open={true} onClose={vi.fn()} height="full">
        Content
      </Drawer>
    )
    const inner = container.querySelector('.gds-ctx')
    expect(inner?.className).toContain('h-screen')
  })

  it('shows close button when title is provided', () => {
    render(
      <Drawer open={true} onClose={vi.fn()} title="My Drawer">
        Content
      </Drawer>
    )
    expect(screen.getByLabelText('Close')).toBeDefined()
  })

  it('calls onClose when close button clicked', async () => {
    const onClose = vi.fn()
    render(
      <Drawer open={true} onClose={onClose} title="Title">
        Content
      </Drawer>
    )
    await userEvent.click(screen.getByLabelText('Close'))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('does not render title/close section when title is not provided', () => {
    render(
      <Drawer open={true} onClose={vi.fn()}>
        Content
      </Drawer>
    )
    expect(screen.queryByLabelText('Close')).toBeNull()
  })
})
