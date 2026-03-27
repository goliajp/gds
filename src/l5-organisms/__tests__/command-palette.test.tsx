import { render, screen } from '@testing-library/react'
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
})
