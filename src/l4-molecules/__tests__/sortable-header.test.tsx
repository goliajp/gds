import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { SortableHeader } from '../sortable-header'

// wrapper to render th inside table structure
function renderInTable(ui: React.ReactElement) {
  return render(<table><thead><tr>{ui}</tr></thead></table>)
}

describe('SortableHeader', () => {
  it('renders with data-component', () => {
    const { container } = renderInTable(
      <SortableHeader label="Name" direction={null} onSort={() => {}} />,
    )
    expect(container.querySelector('[data-component="sortable-header"]')).not.toBeNull()
  })

  it('renders label text', () => {
    const { getByText } = renderInTable(
      <SortableHeader label="Name" direction={null} onSort={() => {}} />,
    )
    expect(getByText('Name')).toBeDefined()
  })

  it('sets data-state="none" when direction is null', () => {
    const { container } = renderInTable(
      <SortableHeader label="Name" direction={null} onSort={() => {}} />,
    )
    const th = container.querySelector('[data-component="sortable-header"]')!
    expect(th.getAttribute('data-state')).toBe('none')
  })

  it('sets data-state="asc" for ascending', () => {
    const { container } = renderInTable(
      <SortableHeader label="Name" direction="asc" onSort={() => {}} />,
    )
    const th = container.querySelector('[data-component="sortable-header"]')!
    expect(th.getAttribute('data-state')).toBe('asc')
  })

  it('sets data-state="desc" for descending', () => {
    const { container } = renderInTable(
      <SortableHeader label="Name" direction="desc" onSort={() => {}} />,
    )
    const th = container.querySelector('[data-component="sortable-header"]')!
    expect(th.getAttribute('data-state')).toBe('desc')
  })

  it('renders asc svg icon when direction is asc', () => {
    const { container } = renderInTable(
      <SortableHeader label="Name" direction="asc" onSort={() => {}} />,
    )
    const svgs = container.querySelectorAll('svg')
    expect(svgs.length).toBe(1)
  })

  it('renders desc svg icon when direction is desc', () => {
    const { container } = renderInTable(
      <SortableHeader label="Name" direction="desc" onSort={() => {}} />,
    )
    const svgs = container.querySelectorAll('svg')
    expect(svgs.length).toBe(1)
  })

  it('renders no svg icon when direction is null', () => {
    const { container } = renderInTable(
      <SortableHeader label="Name" direction={null} onSort={() => {}} />,
    )
    const svgs = container.querySelectorAll('svg')
    expect(svgs.length).toBe(0)
  })

  it('applies accent text color when active', () => {
    const { container } = renderInTable(
      <SortableHeader label="Name" direction="asc" onSort={() => {}} />,
    )
    const th = container.querySelector('th')!
    expect(th.className).toContain('text-accent')
  })

  it('applies muted text color when inactive', () => {
    const { container } = renderInTable(
      <SortableHeader label="Name" direction={null} onSort={() => {}} />,
    )
    const th = container.querySelector('th')!
    expect(th.className).toContain('text-fg-muted')
  })

  it('calls onSort when clicked', () => {
    const handler = vi.fn()
    const { container } = renderInTable(
      <SortableHeader label="Name" direction={null} onSort={handler} />,
    )
    fireEvent.click(container.querySelector('th')!)
    expect(handler).toHaveBeenCalledOnce()
  })

  it('merges custom className', () => {
    const { container } = renderInTable(
      <SortableHeader label="Name" direction={null} onSort={() => {}} className="extra" />,
    )
    const th = container.querySelector('th')!
    expect(th.className).toContain('extra')
  })

  it('has role columnheader and tabIndex 0', () => {
    const { container } = renderInTable(
      <SortableHeader label="Name" direction={null} onSort={() => {}} />,
    )
    const th = container.querySelector('th')!
    expect(th.getAttribute('role')).toBe('columnheader')
    expect(th.getAttribute('tabindex')).toBe('0')
  })
})
