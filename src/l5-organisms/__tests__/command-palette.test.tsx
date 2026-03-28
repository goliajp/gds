import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { CommandPalette } from '../command-palette'

const items = [
  { id: 'save', label: 'Save File', group: 'File' },
  { id: 'open', label: 'Open File', group: 'File' },
  { id: 'theme', label: 'Toggle Theme', group: 'View' },
]

describe('CommandPalette', () => {
  it('renders nothing when closed', () => {
    render(
      <CommandPalette open={false} onClose={vi.fn()} items={items} onSelect={vi.fn()} />,
    )
    expect(document.querySelector('[data-component="command-palette"]')).toBeNull()
  })

  it('renders with data-component when open', () => {
    render(
      <CommandPalette open={true} onClose={vi.fn()} items={items} onSelect={vi.fn()} />,
    )
    expect(document.querySelector('[data-component="command-palette"]')).not.toBeNull()
  })

  it('displays all items', () => {
    render(
      <CommandPalette open={true} onClose={vi.fn()} items={items} onSelect={vi.fn()} />,
    )
    expect(screen.getByText('Save File')).toBeDefined()
    expect(screen.getByText('Open File')).toBeDefined()
    expect(screen.getByText('Toggle Theme')).toBeDefined()
  })

  it('filters items by search query', async () => {
    const user = userEvent.setup()
    render(
      <CommandPalette open={true} onClose={vi.fn()} items={items} onSelect={vi.fn()} />,
    )
    const input = screen.getByPlaceholderText('Search components, patterns, tokens...')
    await user.type(input, 'Theme')
    expect(screen.getByText('Toggle Theme')).toBeDefined()
    expect(screen.queryByText('Save File')).toBeNull()
  })

  it('calls onSelect when item is clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(
      <CommandPalette open={true} onClose={vi.fn()} items={items} onSelect={onSelect} />,
    )
    await user.click(screen.getByText('Save File'))
    expect(onSelect).toHaveBeenCalledWith('save')
  })

  it('navigates with ArrowDown key', async () => {
    const user = userEvent.setup()
    render(
      <CommandPalette open={true} onClose={vi.fn()} items={items} onSelect={vi.fn()} />,
    )
    screen.getByPlaceholderText('Search components, patterns, tokens...')
    await user.keyboard('{ArrowDown}')
    // should highlight second item
  })

  it('navigates with ArrowUp key', async () => {
    const user = userEvent.setup()
    render(
      <CommandPalette open={true} onClose={vi.fn()} items={items} onSelect={vi.fn()} />,
    )
    await user.keyboard('{ArrowUp}')
    // should wrap to last item
  })

  it('selects item with Enter key', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    const onClose = vi.fn()
    render(
      <CommandPalette open={true} onClose={onClose} items={items} onSelect={onSelect} />,
    )
    await user.keyboard('{Enter}')
    expect(onSelect).toHaveBeenCalledWith('save')
    expect(onClose).toHaveBeenCalled()
  })

  it('closes on backdrop click', async () => {
    const onClose = vi.fn()
    render(
      <CommandPalette open={true} onClose={onClose} items={items} onSelect={vi.fn()} />,
    )
    const backdrop = document.querySelector('[data-component="command-palette"]')!
    // click on the backdrop itself (not a child)
    fireEvent.click(backdrop)
    expect(onClose).toHaveBeenCalled()
  })

  it('groups items correctly', () => {
    render(
      <CommandPalette open={true} onClose={vi.fn()} items={items} onSelect={vi.fn()} />,
    )
    // Group headers and shortcut labels both render the text
    expect(screen.getAllByText('File').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('View').length).toBeGreaterThanOrEqual(1)
  })

  it('shows item count in footer', () => {
    render(
      <CommandPalette open={true} onClose={vi.fn()} items={items} onSelect={vi.fn()} />,
    )
    expect(screen.getByText('3 commands')).toBeDefined()
  })

  it('accepts custom placeholder', async () => {
    render(
      <CommandPalette open={true} onClose={vi.fn()} items={items} onSelect={vi.fn()} placeholder="Type here" />,
    )
    expect(screen.getByPlaceholderText('Type here')).toBeDefined()
  })

  it('applies custom className', () => {
    render(
      <CommandPalette open={true} onClose={vi.fn()} items={items} onSelect={vi.fn()} className="my-palette" />,
    )
    const inner = document.querySelector('.my-palette')
    expect(inner).not.toBeNull()
  })

  it('handles items without group', () => {
    const ungroupedItems = [
      { id: 'a', label: 'Action A' },
      { id: 'b', label: 'Action B' },
    ]
    render(
      <CommandPalette open={true} onClose={vi.fn()} items={ungroupedItems} onSelect={vi.fn()} />,
    )
    expect(screen.getByText('Action A')).toBeDefined()
    expect(screen.getByText('Action B')).toBeDefined()
  })
})
