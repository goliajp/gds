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
      <ContextMenu trigger={<span>Right click me</span>} items={items} onSelect={vi.fn()} />,
    )
    expect(container.querySelector('[data-component="context-menu"]')).not.toBeNull()
  })

  it('is closed by default', () => {
    const { container } = render(
      <ContextMenu trigger={<span>Trigger</span>} items={items} onSelect={vi.fn()} />,
    )
    expect(container.querySelector('[data-state="closed"]')).not.toBeNull()
  })

  it('opens on contextmenu event', () => {
    const { container } = render(
      <ContextMenu trigger={<span>Trigger</span>} items={items} onSelect={vi.fn()} />,
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
      <ContextMenu trigger={<span>Trigger</span>} items={items} onSelect={onSelect} />,
    )
    fireEvent.contextMenu(container.querySelector('[data-component="context-menu"]')!)
    fireEvent.click(screen.getByText('Copy'))
    expect(onSelect).toHaveBeenCalledWith('copy')
  })

  it('renders separator items', () => {
    const { container } = render(
      <ContextMenu trigger={<span>Trigger</span>} items={items} onSelect={vi.fn()} />,
    )
    fireEvent.contextMenu(container.querySelector('[data-component="context-menu"]')!)
    // separator is a div with bg-border class, not a button
    const buttons = container.querySelectorAll('button')
    // 3 clickable items (copy, paste, delete), no button for separator
    expect(buttons.length).toBe(3)
  })
})
