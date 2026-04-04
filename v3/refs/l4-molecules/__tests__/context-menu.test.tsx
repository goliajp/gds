import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { ContextMenu } from '../context-menu'

describe('ContextMenu', () => {
  const items = [
    { id: 'copy', label: 'Copy' },
    { id: 'paste', label: 'Paste' },
    { id: 'sep', label: '', separator: true },
    { id: 'delete', label: 'Delete', danger: true },
  ]

  it('renders without crash', () => {
    const { container } = render(
      <ContextMenu
        trigger={<span>Right click me</span>}
        items={items}
        onSelect={vi.fn()}
      />
    )
    expect(
      container.querySelector('[data-component="context-menu"]')
    ).not.toBeNull()
  })

  it('is closed by default', () => {
    const { container } = render(
      <ContextMenu
        trigger={<span>Trigger</span>}
        items={items}
        onSelect={vi.fn()}
      />
    )
    expect(container.querySelector('[data-state="closed"]')).not.toBeNull()
  })

  it('opens on contextmenu event', () => {
    const { container } = render(
      <ContextMenu
        trigger={<span>Trigger</span>}
        items={items}
        onSelect={vi.fn()}
      />
    )
    const el = container.querySelector('[data-component="context-menu"]')!
    fireEvent.contextMenu(el)
    expect(container.querySelector('[data-state="open"]')).not.toBeNull()
    expect(screen.getByText('Copy')).toBeDefined()
    expect(screen.getByText('Delete')).toBeDefined()
  })

  it('calls onSelect when item is clicked', () => {
    const onSelect = vi.fn()
    const { container } = render(
      <ContextMenu
        trigger={<span>Trigger</span>}
        items={items}
        onSelect={onSelect}
      />
    )
    fireEvent.contextMenu(
      container.querySelector('[data-component="context-menu"]')!
    )
    fireEvent.click(screen.getByText('Copy'))
    expect(onSelect).toHaveBeenCalledWith('copy')
  })

  it('renders separator items', () => {
    const { container } = render(
      <ContextMenu
        trigger={<span>Trigger</span>}
        items={items}
        onSelect={vi.fn()}
      />
    )
    fireEvent.contextMenu(
      container.querySelector('[data-component="context-menu"]')!
    )
    // separator is a div with bg-border class, not a button
    const buttons = container.querySelectorAll('button')
    // 3 clickable items (copy, paste, delete), no button for separator
    expect(buttons.length).toBe(3)
  })

  it('renders item with icon', () => {
    const itemsWithIcon = [
      {
        id: 'edit',
        label: 'Edit',
        icon: <span data-testid="edit-icon">✏</span>,
      },
    ]
    const { container } = render(
      <ContextMenu
        trigger={<span>Trigger</span>}
        items={itemsWithIcon}
        onSelect={vi.fn()}
      />
    )
    fireEvent.contextMenu(
      container.querySelector('[data-component="context-menu"]')!
    )
    expect(screen.getByTestId('edit-icon')).toBeDefined()
  })

  it('renders item with shortcut', () => {
    const itemsWithShortcut = [{ id: 'copy', label: 'Copy', shortcut: '⌘C' }]
    const { container } = render(
      <ContextMenu
        trigger={<span>Trigger</span>}
        items={itemsWithShortcut}
        onSelect={vi.fn()}
      />
    )
    fireEvent.contextMenu(
      container.querySelector('[data-component="context-menu"]')!
    )
    expect(screen.getByText('⌘C')).toBeDefined()
  })

  it('renders disabled item', () => {
    const itemsWithDisabled = [
      { id: 'locked', label: 'Locked', disabled: true },
    ]
    const { container } = render(
      <ContextMenu
        trigger={<span>Trigger</span>}
        items={itemsWithDisabled}
        onSelect={vi.fn()}
      />
    )
    fireEvent.contextMenu(
      container.querySelector('[data-component="context-menu"]')!
    )
    const btn = screen.getByText('Locked')
    expect(btn.closest('button')?.disabled).toBe(true)
  })

  it('closes menu after selecting item', () => {
    const { container } = render(
      <ContextMenu
        trigger={<span>Trigger</span>}
        items={items}
        onSelect={vi.fn()}
      />
    )
    fireEvent.contextMenu(
      container.querySelector('[data-component="context-menu"]')!
    )
    expect(container.querySelector('[data-state="open"]')).not.toBeNull()
    fireEvent.click(screen.getByText('Copy'))
    expect(container.querySelector('[data-state="closed"]')).not.toBeNull()
  })

  it('applies danger class to danger items', () => {
    const { container } = render(
      <ContextMenu
        trigger={<span>Trigger</span>}
        items={items}
        onSelect={vi.fn()}
      />
    )
    fireEvent.contextMenu(
      container.querySelector('[data-component="context-menu"]')!
    )
    const deleteBtn = screen.getByText('Delete')
    expect(deleteBtn.closest('button')?.className).toContain('text-danger')
  })
})
