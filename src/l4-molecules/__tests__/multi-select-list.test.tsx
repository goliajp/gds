import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { MultiSelectList } from '../multi-select-list'

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
]

function renderList(
  overrides: Partial<React.ComponentProps<typeof MultiSelectList>> = {}
) {
  const searchRef = React.createRef<HTMLInputElement>()
  const defaultProps = {
    filtered: options,
    glass: false,
    onSearchChange: vi.fn(),
    onToggle: vi.fn(),
    searchQuery: '',
    searchRef,
    value: [] as string[],
  }
  const props = { ...defaultProps, ...overrides }
  const result = render(<MultiSelectList {...props} />)
  return { ...result, props }
}

describe('MultiSelectList', () => {
  it('renders search input with placeholder', () => {
    renderList()
    const input = screen.getByPlaceholderText('Search...')
    expect(input).toBeDefined()
  })

  it('renders all filtered options', () => {
    renderList()
    expect(screen.getByText('Apple')).toBeDefined()
    expect(screen.getByText('Banana')).toBeDefined()
    expect(screen.getByText('Cherry')).toBeDefined()
  })

  it('shows "No results" when filtered is empty', () => {
    renderList({ filtered: [] })
    expect(screen.getByText('No results')).toBeDefined()
  })

  it('displays search query in input', () => {
    const { container } = renderList({ searchQuery: 'app' })
    const input = container.querySelector(
      'input[type="text"]'
    ) as HTMLInputElement
    expect(input.value).toBe('app')
  })

  it('calls onSearchChange when typing', () => {
    const onSearchChange = vi.fn()
    const { container } = renderList({ onSearchChange })
    const input = container.querySelector('input[type="text"]')!
    fireEvent.change(input, { target: { value: 'ban' } })
    expect(onSearchChange).toHaveBeenCalledWith('ban')
  })

  it('calls onToggle when clicking an option', async () => {
    const user = userEvent.setup()
    const { props } = renderList()
    await user.click(screen.getByText('Banana'))
    expect(props.onToggle).toHaveBeenCalledWith('banana')
  })

  it('shows check icon for selected values', () => {
    const { container } = renderList({ value: ['apple', 'cherry'] })
    const svgs = container.querySelectorAll('svg')
    // apple and cherry are selected, so 2 check icons
    expect(svgs.length).toBe(2)
  })

  it('does not show check icon for unselected values', () => {
    const { container } = renderList({ value: [] })
    const svgs = container.querySelectorAll('svg')
    expect(svgs.length).toBe(0)
  })

  it('applies selected styling to selected options', () => {
    const { container } = renderList({ value: ['banana'] })
    const buttons = container.querySelectorAll('.max-h-60 button')
    // banana is index 1
    expect(buttons[1].className).toContain('text-accent')
  })

  it('applies unselected styling to non-selected options', () => {
    const { container } = renderList({ value: ['banana'] })
    const buttons = container.querySelectorAll('.max-h-60 button')
    // apple is index 0, not selected
    expect(buttons[0].className).toContain('text-fg')
  })

  it('applies accent border to selected checkbox indicator', () => {
    const { container } = renderList({ value: ['apple'] })
    const buttons = container.querySelectorAll('.max-h-60 button')
    const checkbox = buttons[0].querySelector('.h-4.w-4')
    expect(checkbox?.className).toContain('border-accent')
    expect(checkbox?.className).toContain('bg-accent/10')
  })

  it('applies default border to unselected checkbox indicator', () => {
    const { container } = renderList({ value: [] })
    const buttons = container.querySelectorAll('.max-h-60 button')
    const checkbox = buttons[0].querySelector('.h-4.w-4')
    expect(checkbox?.className).toContain('border-border')
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
