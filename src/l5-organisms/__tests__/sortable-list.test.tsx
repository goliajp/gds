import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { SortableList } from '../sortable-list'

const items = [
  { id: '1', content: <span>Item One</span> },
  { id: '2', content: <span>Item Two</span> },
  { id: '3', content: <span>Item Three</span> },
]

describe('SortableList', () => {
  it('renders all items', () => {
    render(<SortableList items={items} onReorder={vi.fn()} />)
    expect(screen.getByText('Item One')).toBeDefined()
    expect(screen.getByText('Item Two')).toBeDefined()
    expect(screen.getByText('Item Three')).toBeDefined()
  })

  it('items are draggable', () => {
    const { container } = render(<SortableList items={items} onReorder={vi.fn()} />)
    const draggableItems = container.querySelectorAll('[draggable="true"]')
    expect(draggableItems.length).toBe(3)
  })

  it('has data-component attribute', () => {
    const { container } = render(<SortableList items={items} onReorder={vi.fn()} />)
    expect(container.querySelector('[data-component="sortable-list"]')).not.toBeNull()
  })

  it('disables dragging when disabled', () => {
    const { container } = render(<SortableList items={items} onReorder={vi.fn()} disabled />)
    const draggableItems = container.querySelectorAll('[draggable="true"]')
    expect(draggableItems.length).toBe(0)
  })

  it('shows grip icons when not disabled', () => {
    const { container } = render(<SortableList items={items} onReorder={vi.fn()} />)
    const svgs = container.querySelectorAll('svg')
    expect(svgs.length).toBe(3)
  })

  it('hides grip icons when disabled', () => {
    const { container } = render(<SortableList items={items} onReorder={vi.fn()} disabled />)
    const svgs = container.querySelectorAll('svg')
    expect(svgs.length).toBe(0)
  })

  it('sets data-item-id on each item', () => {
    const { container } = render(<SortableList items={items} onReorder={vi.fn()} />)
    expect(container.querySelector('[data-item-id="1"]')).not.toBeNull()
    expect(container.querySelector('[data-item-id="2"]')).not.toBeNull()
    expect(container.querySelector('[data-item-id="3"]')).not.toBeNull()
  })

  it('calls onReorder after drag and drop', () => {
    const onReorder = vi.fn()
    const { container } = render(<SortableList items={items} onReorder={onReorder} />)
    const dragItems = container.querySelectorAll('[draggable="true"]')

    // drag item 0 to item 2
    fireEvent.dragStart(dragItems[0])
    fireEvent.dragOver(dragItems[2], { preventDefault: vi.fn() })
    fireEvent.drop(dragItems[2], { preventDefault: vi.fn() })

    expect(onReorder).toHaveBeenCalledOnce()
    const reordered = onReorder.mock.calls[0][0]
    // item 0 moved to position 2
    expect(reordered[0].id).toBe('2')
    expect(reordered[1].id).toBe('3')
    expect(reordered[2].id).toBe('1')
  })

  it('does not reorder when dropping on same index', () => {
    const onReorder = vi.fn()
    const { container } = render(<SortableList items={items} onReorder={onReorder} />)
    const dragItems = container.querySelectorAll('[draggable="true"]')

    fireEvent.dragStart(dragItems[1])
    fireEvent.drop(dragItems[1], { preventDefault: vi.fn() })

    expect(onReorder).not.toHaveBeenCalled()
  })

  it('handles dragLeave by clearing drop indicator', () => {
    const { container } = render(<SortableList items={items} onReorder={vi.fn()} />)
    const dragItems = container.querySelectorAll('[draggable="true"]')

    fireEvent.dragStart(dragItems[0])
    fireEvent.dragOver(dragItems[2], { preventDefault: vi.fn() })
    fireEvent.dragLeave(dragItems[2])
    // no error thrown
  })

  it('handles dragEnd by clearing state', () => {
    const { container } = render(<SortableList items={items} onReorder={vi.fn()} />)
    const dragItems = container.querySelectorAll('[draggable="true"]')

    fireEvent.dragStart(dragItems[0])
    fireEvent.dragEnd(dragItems[0])
    // should not have opacity-50 on any item after dragEnd
  })

  it('does not start drag when disabled', () => {
    const onReorder = vi.fn()
    const { container } = render(<SortableList items={items} onReorder={onReorder} disabled />)
    const listItems = container.querySelectorAll('[data-item-id]')

    fireEvent.dragStart(listItems[0])
    fireEvent.dragOver(listItems[2], { preventDefault: vi.fn() })
    fireEvent.drop(listItems[2], { preventDefault: vi.fn() })

    expect(onReorder).not.toHaveBeenCalled()
  })

  it('applies custom className', () => {
    const { container } = render(
      <SortableList items={items} onReorder={vi.fn()} className="custom-class" />,
    )
    expect(container.querySelector('.custom-class')).not.toBeNull()
  })

  it('applies itemClassName to each item', () => {
    const { container } = render(
      <SortableList items={items} onReorder={vi.fn()} itemClassName="item-cls" />,
    )
    const itemEls = container.querySelectorAll('.item-cls')
    expect(itemEls.length).toBe(3)
  })
})
