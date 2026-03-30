import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { ComboboxList } from '../combobox-list'

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
]

function renderList(
  overrides: Partial<React.ComponentProps<typeof ComboboxList>> = {}
) {
  const searchRef = React.createRef<HTMLInputElement>()
  const defaultProps = {
    filtered: options,
    glass: false,
    highlightedIndex: 0,
    onSearchChange: vi.fn(),
    onSelect: vi.fn(),
    query: '',
    searchPlaceholder: 'Search...',
    searchRef,
    setHighlightedIndex: vi.fn(),
    value: null,
  }
  const props = { ...defaultProps, ...overrides }
  const result = render(<ComboboxList {...props} />)
  return { ...result, props }
}

describe('ComboboxList', () => {
  it('renders search input with placeholder', () => {
    renderList({ searchPlaceholder: 'Type to search...' })
    const input = screen.getByPlaceholderText('Type to search...')
    expect(input).toBeDefined()
  })

  it('renders all filtered options', () => {
    renderList()
    expect(screen.getByText('React')).toBeDefined()
    expect(screen.getByText('Vue')).toBeDefined()
    expect(screen.getByText('Svelte')).toBeDefined()
  })

  it('shows "No results" when filtered is empty', () => {
    renderList({ filtered: [] })
    expect(screen.getByText('No results')).toBeDefined()
  })

  it('displays search query in input', () => {
    const { container } = renderList({ query: 'rea' })
    const input = container.querySelector(
      'input[type="text"]'
    ) as HTMLInputElement
    expect(input.value).toBe('rea')
  })

  it('calls onSearchChange when typing', async () => {
    const onSearchChange = vi.fn()
    const { container } = renderList({ onSearchChange })
    const input = container.querySelector('input[type="text"]')!
    fireEvent.change(input, { target: { value: 'vue' } })
    expect(onSearchChange).toHaveBeenCalledWith('vue')
  })

  it('calls onSelect when clicking an option', async () => {
    const user = userEvent.setup()
    const { props } = renderList()
    await user.click(screen.getByText('Vue'))
    expect(props.onSelect).toHaveBeenCalledWith('vue')
  })

  it('calls setHighlightedIndex on mouse enter', async () => {
    const user = userEvent.setup()
    const { props } = renderList()
    await user.hover(screen.getByText('Svelte'))
    expect(props.setHighlightedIndex).toHaveBeenCalledWith(2)
  })

  it('applies active styling to selected value', () => {
    const { container } = renderList({ value: 'vue' })
    const buttons = container.querySelectorAll('.max-h-60 button')
    // vue is index 1
    expect(buttons[1].className).toContain('bg-accent/10')
    expect(buttons[1].className).toContain('text-accent')
  })

  it('applies highlighted styling to highlighted option', () => {
    const { container } = renderList({ highlightedIndex: 2 })
    const buttons = container.querySelectorAll('.max-h-60 button')
    expect(buttons[2].className).toContain('bg-bg-tertiary')
  })

  it('ArrowDown increments highlightedIndex', () => {
    const setHighlightedIndex = vi.fn()
    const { container } = renderList({
      highlightedIndex: 0,
      setHighlightedIndex,
    })
    const input = container.querySelector('input[type="text"]')!
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    expect(setHighlightedIndex).toHaveBeenCalledWith(1)
  })

  it('ArrowDown wraps from last to first', () => {
    const setHighlightedIndex = vi.fn()
    const { container } = renderList({
      highlightedIndex: 2,
      setHighlightedIndex,
    })
    const input = container.querySelector('input[type="text"]')!
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    expect(setHighlightedIndex).toHaveBeenCalledWith(0)
  })

  it('ArrowUp decrements highlightedIndex', () => {
    const setHighlightedIndex = vi.fn()
    const { container } = renderList({
      highlightedIndex: 2,
      setHighlightedIndex,
    })
    const input = container.querySelector('input[type="text"]')!
    fireEvent.keyDown(input, { key: 'ArrowUp' })
    expect(setHighlightedIndex).toHaveBeenCalledWith(1)
  })

  it('ArrowUp wraps from first to last', () => {
    const setHighlightedIndex = vi.fn()
    const { container } = renderList({
      highlightedIndex: 0,
      setHighlightedIndex,
    })
    const input = container.querySelector('input[type="text"]')!
    fireEvent.keyDown(input, { key: 'ArrowUp' })
    expect(setHighlightedIndex).toHaveBeenCalledWith(2)
  })

  it('Enter selects highlighted option', () => {
    const onSelect = vi.fn()
    const { container } = renderList({ highlightedIndex: 1, onSelect })
    const input = container.querySelector('input[type="text"]')!
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(onSelect).toHaveBeenCalledWith('vue')
  })

  it('Enter does nothing when filtered list is empty', () => {
    const onSelect = vi.fn()
    const { container } = renderList({
      filtered: [],
      highlightedIndex: 0,
      onSelect,
    })
    const input = container.querySelector('input[type="text"]')!
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('applies glass classes when glass is true', () => {
    const { container } = renderList({ glass: true })
    const wrapper = container.firstElementChild as HTMLElement
    expect(wrapper.className).toContain('gds-glass')
  })

  it('applies non-glass classes when glass is false', () => {
    const { container } = renderList({ glass: false })
    const wrapper = container.firstElementChild as HTMLElement
    expect(wrapper.className).toContain('border-border')
    expect(wrapper.className).toContain('bg-surface')
  })

  it('renders all options as buttons with type="button"', () => {
    const { container } = renderList()
    const buttons = container.querySelectorAll('.max-h-60 button')
    expect(buttons.length).toBe(3)
    buttons.forEach((btn) => {
      expect(btn.getAttribute('type')).toBe('button')
    })
  })
})
