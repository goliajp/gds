import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { Typewriter } from '../typewriter'

describe('Typewriter', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders text progressively', () => {
    const { container } = render(<Typewriter text="hello" speed={100} cursor={false} />)
    const el = container.querySelector('[data-component="typewriter"]')!
    expect(el.textContent).toBe('')

    act(() => { vi.advanceTimersByTime(100) })
    expect(el.textContent).toBe('h')

    act(() => { vi.advanceTimersByTime(100) })
    expect(el.textContent).toBe('he')
  })

  it('shows cursor when cursor is true', () => {
    render(<Typewriter text="hi" cursor />)
    expect(screen.getByTestId('cursor')).toBeInTheDocument()
  })

  it('fires onComplete when typing finishes', () => {
    const onComplete = vi.fn()
    render(<Typewriter text="ab" speed={50} onComplete={onComplete} />)

    act(() => { vi.advanceTimersByTime(50) }) // a
    act(() => { vi.advanceTimersByTime(50) }) // b
    expect(onComplete).toHaveBeenCalled()
  })

  it('respects delay before starting', () => {
    const { container } = render(<Typewriter text="x" speed={50} delay={200} cursor={false} />)
    const el = container.querySelector('[data-component="typewriter"]')!

    act(() => { vi.advanceTimersByTime(100) })
    expect(el.textContent).toBe('')

    act(() => { vi.advanceTimersByTime(100) }) // delay done
    act(() => { vi.advanceTimersByTime(50) })  // first char
    expect(el.textContent).toBe('x')
  })
})
