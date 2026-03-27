import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Dropdown } from '../dropdown'

describe('Dropdown', () => {
  const items = [
    { id: 'edit', label: 'Edit' },
    { id: 'delete', label: 'Delete', danger: true },
  ]

  it('renders without crash', () => {
    const { container } = render(
      <Dropdown trigger={<span>Menu</span>} items={items} onSelect={vi.fn()} />,
    )
    expect(container.querySelector('[data-component="dropdown"]')).not.toBeNull()
  })

  it('is closed by default', () => {
    const { container } = render(
      <Dropdown trigger={<span>Menu</span>} items={items} onSelect={vi.fn()} />,
    )
    expect(container.querySelector('[data-state="closed"]')).not.toBeNull()
  })

  it('opens on trigger click', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Dropdown trigger={<span>Menu</span>} items={items} onSelect={vi.fn()} />,
    )
    await user.click(screen.getByText('Menu'))
    expect(container.querySelector('[data-state="open"]')).not.toBeNull()
    expect(screen.getByText('Edit')).toBeDefined()
  })

  it('calls onSelect and closes when item clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    const { container } = render(
      <Dropdown trigger={<span>Menu</span>} items={items} onSelect={onSelect} />,
    )
    await user.click(screen.getByText('Menu'))
    await user.click(screen.getByText('Edit'))
    expect(onSelect).toHaveBeenCalledWith('edit')
    expect(container.querySelector('[data-state="closed"]')).not.toBeNull()
  })

  it('toggles on repeated trigger clicks', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Dropdown trigger={<span>Menu</span>} items={items} onSelect={vi.fn()} />,
    )
    await user.click(screen.getByText('Menu'))
    expect(container.querySelector('[data-state="open"]')).not.toBeNull()
    await user.click(screen.getByText('Menu'))
    expect(container.querySelector('[data-state="closed"]')).not.toBeNull()
  })

  it('renders separator items', async () => {
    const user = userEvent.setup()
    const itemsWithSep = [
      { id: 'edit', label: 'Edit' },
      { id: 'sep', label: '', separator: true },
      { id: 'delete', label: 'Delete', danger: true },
    ]
    const { container } = render(
      <Dropdown trigger={<span>Menu</span>} items={itemsWithSep} onSelect={vi.fn()} />,
    )
    await user.click(screen.getByText('Menu'))
    // separator should be a div with h-px class
    const sep = container.querySelector('.h-px.bg-border')
    expect(sep).not.toBeNull()
  })

  it('renders item with icon', async () => {
    const user = userEvent.setup()
    const itemsWithIcon = [
      { id: 'edit', label: 'Edit', icon: <span data-testid="edit-icon">E</span> },
    ]
    render(
      <Dropdown trigger={<span>Menu</span>} items={itemsWithIcon} onSelect={vi.fn()} />,
    )
    await user.click(screen.getByText('Menu'))
    expect(screen.getByTestId('edit-icon')).toBeDefined()
  })

  it('renders item with shortcut', async () => {
    const user = userEvent.setup()
    const itemsWithShortcut = [
      { id: 'edit', label: 'Edit', shortcut: '⌘E' },
    ]
    render(
      <Dropdown trigger={<span>Menu</span>} items={itemsWithShortcut} onSelect={vi.fn()} />,
    )
    await user.click(screen.getByText('Menu'))
    expect(screen.getByText('⌘E')).toBeDefined()
  })

  it('renders disabled items with opacity', async () => {
    const user = userEvent.setup()
    const itemsWithDisabled = [
      { id: 'edit', label: 'Edit', disabled: true },
    ]
    const { container } = render(
      <Dropdown trigger={<span>Menu</span>} items={itemsWithDisabled} onSelect={vi.fn()} />,
    )
    await user.click(screen.getByText('Menu'))
    const editBtn = screen.getByText('Edit').closest('button')
    expect(editBtn?.className).toContain('opacity-40')
    expect(editBtn).toBeDisabled()
  })

  it('applies danger styling to danger items', async () => {
    const user = userEvent.setup()
    render(
      <Dropdown trigger={<span>Menu</span>} items={items} onSelect={vi.fn()} />,
    )
    await user.click(screen.getByText('Menu'))
    const deleteBtn = screen.getByText('Delete').closest('button')
    expect(deleteBtn?.className).toContain('text-danger')
  })

  it('aligns to end when align="end"', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Dropdown trigger={<span>Menu</span>} items={items} onSelect={vi.fn()} align="end" />,
    )
    await user.click(screen.getByText('Menu'))
    const menu = container.querySelector('.animate-popup')
    expect(menu?.className).toContain('right-0')
  })

  it('aligns to start by default', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Dropdown trigger={<span>Menu</span>} items={items} onSelect={vi.fn()} />,
    )
    await user.click(screen.getByText('Menu'))
    const menu = container.querySelector('.animate-popup')
    expect(menu?.className).toContain('left-0')
  })

  it('applies glass styling when glass is true', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Dropdown trigger={<span>Menu</span>} items={items} onSelect={vi.fn()} glass />,
    )
    await user.click(screen.getByText('Menu'))
    const menu = container.querySelector('.animate-popup')
    expect(menu?.className).toContain('gds-glass')
  })

  it('applies non-glass styling when glass is falsy', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Dropdown trigger={<span>Menu</span>} items={items} onSelect={vi.fn()} />,
    )
    await user.click(screen.getByText('Menu'))
    const menu = container.querySelector('.animate-popup')
    expect(menu?.className).toContain('bg-surface')
  })

  it('applies custom className', () => {
    const { container } = render(
      <Dropdown trigger={<span>Menu</span>} items={items} onSelect={vi.fn()} className="my-dd" />,
    )
    const el = container.querySelector('[data-component="dropdown"]')
    expect(el?.className).toContain('my-dd')
  })
})
