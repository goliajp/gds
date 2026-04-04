import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { EmojiPicker } from '../emoji-picker'

describe('EmojiPicker', () => {
  it('renders emoji buttons', () => {
    render(<EmojiPicker onSelect={vi.fn()} />)
    // default categories have emojis, check one exists
    expect(screen.getByText('😀')).toBeDefined()
  })

  it('calls onSelect when emoji is clicked', () => {
    const onSelect = vi.fn()
    render(<EmojiPicker onSelect={onSelect} />)
    fireEvent.click(screen.getByText('😀'))
    expect(onSelect).toHaveBeenCalledWith('😀')
  })

  it('filters emojis by search (shows all when searching)', () => {
    const onSelect = vi.fn()
    const { container } = render(<EmojiPicker onSelect={onSelect} />)
    const input = container.querySelector('input') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'test' } })
    // when search is active, all emojis from all categories are shown
    expect(screen.getByText('🐶')).toBeDefined()
    expect(screen.getByText('🔥')).toBeDefined()
  })

  it('applies data-component attribute', () => {
    const { container } = render(<EmojiPicker onSelect={vi.fn()} />)
    expect(
      container.querySelector('[data-component="emoji-picker"]')
    ).not.toBeNull()
  })

  it('switches categories on tab click', () => {
    render(<EmojiPicker onSelect={vi.fn()} />)
    fireEvent.click(screen.getByText('Animals'))
    expect(screen.getByText('🐶')).toBeDefined()
  })

  it('supports glass prop', () => {
    const { container } = render(<EmojiPicker onSelect={vi.fn()} glass />)
    const el = container.querySelector('[data-component="emoji-picker"]')
    expect(el?.className).toContain('backdrop-blur')
  })
})
