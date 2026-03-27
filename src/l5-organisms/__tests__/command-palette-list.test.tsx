import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import type { CommandItem } from '../command-palette'
import { CommandPaletteList } from '../command-palette-list'

const items: CommandItem[] = [
  { id: 'save', label: 'Save File', group: 'File', shortcut: '⌘S' },
  { id: 'open', label: 'Open File', group: 'File' },
  { id: 'theme', label: 'Toggle Theme', group: 'View', icon: <span>🎨</span> },
]

function buildGroups(list: CommandItem[]): Map<string, CommandItem[]> {
  const groups = new Map<string, CommandItem[]>()
  for (const item of list) {
    const key = item.group ?? ''
    const existing = groups.get(key) ?? []
    groups.set(key, [...existing, item])
  }
  return groups
}

describe('CommandPaletteList', () => {
  it('renders no results message when filteredCount is 0', () => {
    const { container } = render(
      <CommandPaletteList
        groups={new Map()}
        activeIndex={0}
        filteredCount={0}
        onSelect={vi.fn()}
      />,
    )
    expect(container.textContent).toContain('No results found')
  })

  it('renders all items with labels', () => {
    const groups = buildGroups(items)
    render(
      <CommandPaletteList
        groups={groups}
        activeIndex={0}
        filteredCount={3}
        onSelect={vi.fn()}
      />,
    )
    expect(screen.getByText('Save File')).toBeDefined()
    expect(screen.getByText('Open File')).toBeDefined()
    expect(screen.getByText('Toggle Theme')).toBeDefined()
  })

  it('renders group headings', () => {
    const groups = buildGroups(items)
    const { container } = render(
      <CommandPaletteList
        groups={groups}
        activeIndex={0}
        filteredCount={3}
        onSelect={vi.fn()}
      />,
    )
    const headings = container.querySelectorAll('.uppercase')
    expect(headings.length).toBe(2)
    expect(headings[0].textContent).toBe('File')
    expect(headings[1].textContent).toBe('View')
  })

  it('does not render group heading for empty group key', () => {
    const groups = new Map<string, CommandItem[]>()
    groups.set('', [{ id: 'a', label: 'No Group Item' }])
    const { container } = render(
      <CommandPaletteList
        groups={groups}
        activeIndex={0}
        filteredCount={1}
        onSelect={vi.fn()}
      />,
    )
    expect(screen.getByText('No Group Item')).toBeDefined()
    // should not have a heading element with tracking style
    const headings = container.querySelectorAll('.tracking-\\[0\\.1em\\]')
    expect(headings.length).toBe(0)
  })

  it('marks active item with data-active attribute', () => {
    const groups = buildGroups(items)
    render(
      <CommandPaletteList
        groups={groups}
        activeIndex={1}
        filteredCount={3}
        onSelect={vi.fn()}
      />,
    )
    const buttons = screen.getAllByRole('button')
    expect(buttons[0].getAttribute('data-active')).toBe('false')
    expect(buttons[1].getAttribute('data-active')).toBe('true')
    expect(buttons[2].getAttribute('data-active')).toBe('false')
  })

  it('calls onSelect with item id when clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    const groups = buildGroups(items)
    render(
      <CommandPaletteList
        groups={groups}
        activeIndex={0}
        filteredCount={3}
        onSelect={onSelect}
      />,
    )
    await user.click(screen.getByText('Open File'))
    expect(onSelect).toHaveBeenCalledWith('open')
  })

  it('renders shortcut kbd element when item has shortcut', () => {
    const groups = buildGroups(items)
    render(
      <CommandPaletteList
        groups={groups}
        activeIndex={0}
        filteredCount={3}
        onSelect={vi.fn()}
      />,
    )
    expect(screen.getByText('⌘S')).toBeDefined()
    expect(screen.getByText('⌘S').tagName).toBe('KBD')
  })

  it('renders icon when item has icon', () => {
    const groups = buildGroups(items)
    render(
      <CommandPaletteList
        groups={groups}
        activeIndex={0}
        filteredCount={3}
        onSelect={vi.fn()}
      />,
    )
    expect(screen.getByText('🎨')).toBeDefined()
  })
})
