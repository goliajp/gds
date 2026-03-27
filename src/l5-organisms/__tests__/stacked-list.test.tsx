import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { StackedList } from '../stacked-list'

const items = [
  { id: '1', title: 'First item', description: 'Description 1' },
  { id: '2', title: 'Second item' },
  { id: '3', title: 'Third item', description: 'Description 3' },
]

describe('StackedList', () => {
  it('renders all items', () => {
    const { container } = render(<StackedList items={items} />)
    expect(container.querySelector('[data-component="stacked-list"]')).not.toBeNull()
    expect(screen.getByText('First item')).toBeDefined()
    expect(screen.getByText('Second item')).toBeDefined()
    expect(screen.getByText('Third item')).toBeDefined()
  })

  it('calls onSelect when item is clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<StackedList items={items} onSelect={onSelect} />)
    await user.click(screen.getByText('Second item'))
    expect(onSelect).toHaveBeenCalledWith('2')
  })

  it('renders header when provided', () => {
    render(<StackedList items={items} header={<span>List Header</span>} />)
    expect(screen.getByText('List Header')).toBeDefined()
  })

  it('renders dividers between items by default', () => {
    const { container } = render(<StackedList items={items} />)
    const listItems = container.querySelectorAll('[data-component="list-item"]')
    // first two items should have border-b class (dividers), last should not
    expect(listItems[0]?.className).toContain('border-b')
    expect(listItems[2]?.className).not.toContain('border-b')
  })
})
