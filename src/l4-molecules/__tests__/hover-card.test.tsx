import { act, fireEvent, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { HoverCard } from '../hover-card'

describe('HoverCard', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders without crash', () => {
    const { container } = render(
      <HoverCard trigger={<span>Hover me</span>}>Card content</HoverCard>,
    )
    expect(container.querySelector('[data-component="hover-card"]')).not.toBeNull()
  })

  it('is closed by default', () => {
    const { container } = render(
      <HoverCard trigger={<span>Hover me</span>}>Card content</HoverCard>,
    )
    expect(container.querySelector('[data-state="closed"]')).not.toBeNull()
  })

  it('opens after delay on mouseEnter', () => {
    const { container } = render(
      <HoverCard trigger={<span>Hover me</span>} delay={200}>Card content</HoverCard>,
    )
    const wrapper = container.querySelector('[data-component="hover-card"]')!
    fireEvent.mouseEnter(wrapper)

    // still closed before delay
    expect(container.querySelector('[data-state="closed"]')).not.toBeNull()

    act(() => {
      vi.advanceTimersByTime(200)
    })
    expect(container.querySelector('[data-state="open"]')).not.toBeNull()
  })

  it('closes on mouseLeave', () => {
    const { container } = render(
      <HoverCard trigger={<span>Hover me</span>} delay={0}>Card content</HoverCard>,
    )
    const wrapper = container.querySelector('[data-component="hover-card"]')!

    fireEvent.mouseEnter(wrapper)
    act(() => {
      vi.advanceTimersByTime(0)
    })
    expect(container.querySelector('[data-state="open"]')).not.toBeNull()

    fireEvent.mouseLeave(wrapper)
    act(() => {
      vi.advanceTimersByTime(150)
    })
    expect(container.querySelector('[data-state="closed"]')).not.toBeNull()
  })

  it('applies placement classes', () => {
    const { container } = render(
      <HoverCard trigger={<span>Hover me</span>} delay={0} placement="top">
        Card content
      </HoverCard>,
    )
    const wrapper = container.querySelector('[data-component="hover-card"]')!
    fireEvent.mouseEnter(wrapper)
    act(() => {
      vi.advanceTimersByTime(0)
    })
    const card = wrapper.querySelector('.absolute')
    expect(card?.className).toContain('bottom-full')
  })
})
