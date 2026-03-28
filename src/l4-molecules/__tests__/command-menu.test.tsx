import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { CommandMenu } from '../command-menu'

describe('CommandMenu', () => {
  const items = [
    { id: 'copy', label: 'Copy' },
    { id: 'paste', label: 'Paste' },
    { id: 'delete', label: 'Delete', danger: true },
  ]

  it('renders all items', () => {
    render(<CommandMenu items={items} onSelect={vi.fn()} />)
    expect(screen.getByText('Copy')).toBeDefined()
    expect(screen.getByText('Paste')).toBeDefined()
    expect(screen.getByText('Delete')).toBeDefined()
  })

  it('filters items by search query', async () => {
    const user = userEvent.setup()
    render(<CommandMenu items={items} onSelect={vi.fn()} />)
    const input = screen.getByTestId('command-menu-search')
    await user.type(input, 'cop')
    expect(screen.getByText('Copy')).toBeDefined()
    expect(screen.queryByText('Paste')).toBeNull()
  })

  it('calls onSelect when item clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<CommandMenu items={items} onSelect={onSelect} />)
    await user.click(screen.getByText('Paste'))
    expect(onSelect).toHaveBeenCalledWith('paste')
  })

  it('navigates with keyboard', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<CommandMenu items={items} onSelect={onSelect} />)
    const input = screen.getByTestId('command-menu-search')
    await user.click(input)
    await user.keyboard('{ArrowDown}{Enter}')
    expect(onSelect).toHaveBeenCalledWith('paste')
  })

  it('renders danger items with danger class', () => {
    render(<CommandMenu items={items} onSelect={vi.fn()} />)
    const deleteBtn = screen.getByTestId('command-menu-item-delete')
    expect(deleteBtn.className).toContain('text-danger')
  })

  it('shows "No results" when search yields nothing', async () => {
    const user = userEvent.setup()
    render(<CommandMenu items={items} onSelect={vi.fn()} />)
    const input = screen.getByTestId('command-menu-search')
    await user.type(input, 'zzzzz')
    expect(screen.getByText('No results')).toBeDefined()
  })

  it('hides search when searchable is false', () => {
    render(<CommandMenu items={items} onSelect={vi.fn()} searchable={false} />)
    expect(screen.queryByTestId('command-menu-search')).toBeNull()
  })

  it('renders items with icons', () => {
    const itemsWithIcons = [
      { id: 'a', label: 'Item A', icon: <span data-testid="icon-a">A</span> },
    ]
    render(<CommandMenu items={itemsWithIcons} onSelect={vi.fn()} />)
    expect(screen.getByTestId('icon-a')).toBeDefined()
  })

  it('renders items with shortcuts', () => {
    const itemsWithShortcut = [
      { id: 'a', label: 'Item A', shortcut: '⌘A' },
    ]
    render(<CommandMenu items={itemsWithShortcut} onSelect={vi.fn()} />)
    expect(screen.getByText('⌘A')).toBeDefined()
  })

  it('renders group headers', () => {
    const groupedItems = [
      { id: 'a', label: 'Item A', group: 'Actions' },
      { id: 'b', label: 'Item B', group: 'Navigation' },
    ]
    render(<CommandMenu items={groupedItems} onSelect={vi.fn()} />)
    expect(screen.getByText('Actions')).toBeDefined()
    expect(screen.getByText('Navigation')).toBeDefined()
  })

  it('navigates up with ArrowUp', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<CommandMenu items={items} onSelect={onSelect} />)
    const input = screen.getByTestId('command-menu-search')
    await user.click(input)
    await user.keyboard('{ArrowUp}{Enter}')
    // wraps around: from index 0 to last item (delete)
    expect(onSelect).toHaveBeenCalledWith('delete')
  })

  it('applies glass styling', () => {
    const { container } = render(<CommandMenu items={items} onSelect={vi.fn()} glass />)
    const el = container.querySelector('[data-component="command-menu"]')
    expect(el?.className).toContain('bg-bg/60')
  })
})
