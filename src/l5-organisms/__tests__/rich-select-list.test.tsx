import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import type { RichSelectOption } from '../rich-select'
import { RichSelectList } from '../rich-select-list'

const options: RichSelectOption[] = [
  { value: 'apple', label: 'Apple', description: 'A fruit', badge: 'popular', icon: <span>🍎</span> },
  { value: 'banana', label: 'Banana', description: 'Yellow fruit' },
  { value: 'cherry', label: 'Cherry' },
]

describe('RichSelectList', () => {
  it('renders with listbox role', () => {
    render(
      <RichSelectList
        options={options}
        value={null}
        focusedIndex={-1}
        onSelect={vi.fn()}
        onFocus={vi.fn()}
      />,
    )
    expect(screen.getByRole('listbox')).toBeDefined()
  })

  it('renders all option labels', () => {
    render(
      <RichSelectList
        options={options}
        value={null}
        focusedIndex={-1}
        onSelect={vi.fn()}
        onFocus={vi.fn()}
      />,
    )
    expect(screen.getByText('Apple')).toBeDefined()
    expect(screen.getByText('Banana')).toBeDefined()
    expect(screen.getByText('Cherry')).toBeDefined()
  })

  it('renders option descriptions when present', () => {
    render(
      <RichSelectList
        options={options}
        value={null}
        focusedIndex={-1}
        onSelect={vi.fn()}
        onFocus={vi.fn()}
      />,
    )
    expect(screen.getByText('A fruit')).toBeDefined()
    expect(screen.getByText('Yellow fruit')).toBeDefined()
  })

  it('renders option badge when present', () => {
    render(
      <RichSelectList
        options={options}
        value={null}
        focusedIndex={-1}
        onSelect={vi.fn()}
        onFocus={vi.fn()}
      />,
    )
    expect(screen.getByText('popular')).toBeDefined()
  })

  it('renders option icon when present', () => {
    render(
      <RichSelectList
        options={options}
        value={null}
        focusedIndex={-1}
        onSelect={vi.fn()}
        onFocus={vi.fn()}
      />,
    )
    expect(screen.getByText('🍎')).toBeDefined()
  })

  it('marks selected option with aria-selected', () => {
    render(
      <RichSelectList
        options={options}
        value="banana"
        focusedIndex={-1}
        onSelect={vi.fn()}
        onFocus={vi.fn()}
      />,
    )
    const allOptions = screen.getAllByRole('option')
    expect(allOptions[0].getAttribute('aria-selected')).toBe('false')
    expect(allOptions[1].getAttribute('aria-selected')).toBe('true')
    expect(allOptions[2].getAttribute('aria-selected')).toBe('false')
  })

  it('marks focused option with data-focused attribute', () => {
    render(
      <RichSelectList
        options={options}
        value={null}
        focusedIndex={2}
        onSelect={vi.fn()}
        onFocus={vi.fn()}
      />,
    )
    const allOptions = screen.getAllByRole('option')
    expect(allOptions[0].getAttribute('data-focused')).toBeNull()
    expect(allOptions[1].getAttribute('data-focused')).toBeNull()
    expect(allOptions[2].getAttribute('data-focused')).toBe('')
  })

  it('calls onSelect with option value when clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(
      <RichSelectList
        options={options}
        value={null}
        focusedIndex={-1}
        onSelect={onSelect}
        onFocus={vi.fn()}
      />,
    )
    await user.click(screen.getByText('Cherry'))
    expect(onSelect).toHaveBeenCalledWith('cherry')
  })

  it('calls onFocus with index on mouse enter', async () => {
    const user = userEvent.setup()
    const onFocus = vi.fn()
    render(
      <RichSelectList
        options={options}
        value={null}
        focusedIndex={-1}
        onSelect={vi.fn()}
        onFocus={onFocus}
      />,
    )
    const allOptions = screen.getAllByRole('option')
    await user.hover(allOptions[1])
    expect(onFocus).toHaveBeenCalledWith(1)
  })

  it('applies glass class when glass prop is true', () => {
    render(
      <RichSelectList
        options={options}
        value={null}
        focusedIndex={-1}
        glass={true}
        onSelect={vi.fn()}
        onFocus={vi.fn()}
      />,
    )
    const listbox = screen.getByRole('listbox')
    expect(listbox.className).toContain('gds-glass')
  })
})
