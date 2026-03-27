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
})
