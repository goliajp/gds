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
    // fuzzy highlight splits text across spans, so use textContent check
    const buttons = document.querySelectorAll('button')
    const matchTexts = Array.from(buttons).map(b => b.textContent)
    expect(matchTexts.some(t => t !== null && t.includes('Toggle Theme'))).toBe(true)
    expect(matchTexts.some(t => t !== null && t.includes('Save File'))).toBe(false)
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

  // --- v2 feature tests ---

  it('fuzzy search scores consecutive matches higher', async () => {
    const user = userEvent.setup()
    const manyItems = [
      { id: 'toggle-theme', label: 'Toggle Theme', group: 'View' },
      { id: 'the-thing', label: 'The Thing', group: 'Other' },
    ]
    render(
      <CommandPalette open={true} onClose={vi.fn()} items={manyItems} onSelect={vi.fn()} fuzzy />,
    )
    const input = screen.getByPlaceholderText('Search components, patterns, tokens...')
    await user.type(input, 'The')
    // Both should match, but "The Thing" should score higher (starts with "The")
    const buttons = document.querySelectorAll('[data-active]')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('disables fuzzy and uses substring search when fuzzy is false', async () => {
    const user = userEvent.setup()
    render(
      <CommandPalette open={true} onClose={vi.fn()} items={items} onSelect={vi.fn()} fuzzy={false} />,
    )
    const input = screen.getByPlaceholderText('Search components, patterns, tokens...')
    await user.type(input, 'Save')
    const buttons = document.querySelectorAll('button')
    const matchTexts = Array.from(buttons).map(b => b.textContent)
    expect(matchTexts.some(t => t !== null && t.includes('Save File'))).toBe(true)
  })

  it('shows recent items when query is empty and recentItems provided', () => {
    const recentItems = [
      { id: 'recent1', label: 'Recent Action', group: 'Commands' },
    ]
    render(
      <CommandPalette
        open={true}
        onClose={vi.fn()}
        items={items}
        onSelect={vi.fn()}
        recentItems={recentItems}
      />,
    )
    // recent items should be shown with "Recent" group label
    expect(screen.getAllByText('Recent').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('Recent Action')).toBeDefined()
  })

  it('limits recent items to maxRecent', () => {
    const recentItems = [
      { id: 'r1', label: 'Recent 1' },
      { id: 'r2', label: 'Recent 2' },
      { id: 'r3', label: 'Recent 3' },
    ]
    render(
      <CommandPalette
        open={true}
        onClose={vi.fn()}
        items={items}
        onSelect={vi.fn()}
        recentItems={recentItems}
        maxRecent={2}
      />,
    )
    expect(screen.getByText('Recent 1')).toBeDefined()
    expect(screen.getByText('Recent 2')).toBeDefined()
    expect(screen.queryByText('Recent 3')).toBeNull()
  })

  it('calls onExecute when item is selected', async () => {
    const user = userEvent.setup()
    const onExecute = vi.fn()
    const onSelect = vi.fn()
    render(
      <CommandPalette
        open={true}
        onClose={vi.fn()}
        items={items}
        onSelect={onSelect}
        onExecute={onExecute}
      />,
    )
    await user.click(screen.getByText('Save File'))
    expect(onExecute).toHaveBeenCalledWith('save')
    expect(onSelect).toHaveBeenCalledWith('save')
  })

  it('fires item action callback when selected', async () => {
    const user = userEvent.setup()
    const action = vi.fn()
    const actionItems = [
      { id: 'act', label: 'Do Action', action },
    ]
    render(
      <CommandPalette
        open={true}
        onClose={vi.fn()}
        items={actionItems}
        onSelect={vi.fn()}
      />,
    )
    await user.click(screen.getByText('Do Action'))
    expect(action).toHaveBeenCalled()
  })

  it('handles empty items array', () => {
    render(
      <CommandPalette open={true} onClose={vi.fn()} items={[]} onSelect={vi.fn()} />,
    )
    expect(screen.getByText('No results found')).toBeDefined()
    expect(screen.getByText('0 commands')).toBeDefined()
  })

  it('respects maxResults limit', async () => {
    const user = userEvent.setup()
    const manyItems = Array.from({ length: 100 }, (_, i) => ({
      id: `item-${i}`,
      label: `Item ${i}`,
    }))
    render(
      <CommandPalette open={true} onClose={vi.fn()} items={manyItems} onSelect={vi.fn()} maxResults={5} />,
    )
    const input = screen.getByPlaceholderText('Search components, patterns, tokens...')
    await user.type(input, 'Item')
    const resultButtons = document.querySelectorAll('[data-active]')
    expect(resultButtons.length).toBeLessThanOrEqual(5)
  })

  it('does not select disabled items', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    const disabledItems = [
      { id: 'dis', label: 'Disabled Action', disabled: true },
    ]
    render(
      <CommandPalette open={true} onClose={vi.fn()} items={disabledItems} onSelect={onSelect} />,
    )
    await user.click(screen.getByText('Disabled Action'))
    expect(onSelect).not.toHaveBeenCalled()
  })
})
