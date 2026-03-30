import { act, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { AnimatePresence } from '../animate-presence'

describe('AnimatePresence', () => {
  it('renders children when present', () => {
    const { getByText } = render(
      <AnimatePresence>
        <span>hello</span>
      </AnimatePresence>
    )
    expect(getByText('hello')).toBeInTheDocument()
  })

  it('applies enter animation class', () => {
    const { container } = render(
      <AnimatePresence animation="scale">
        <span>content</span>
      </AnimatePresence>
    )
    const wrapper = container.querySelector(
      '[data-component="animate-presence"]'
    )
    expect(wrapper?.className).toContain('animate-scale-in')
  })

  it('removes children after exit animation', () => {
    vi.useFakeTimers()
    const { container, rerender } = render(
      <AnimatePresence duration={100}>
        <span>bye</span>
      </AnimatePresence>
    )
    // trigger exit by removing children
    rerender(<AnimatePresence duration={100}>{false}</AnimatePresence>)
    // still rendered during exit animation
    expect(
      container.querySelector('[data-component="animate-presence"]')
    ).toBeInTheDocument()
    // after duration, should be removed
    act(() => {
      vi.advanceTimersByTime(150)
    })
    expect(
      container.querySelector('[data-component="animate-presence"]')
    ).not.toBeInTheDocument()
    vi.useRealTimers()
  })

  it('has data-component attribute', () => {
    const { container } = render(
      <AnimatePresence>
        <span>test</span>
      </AnimatePresence>
    )
    expect(
      container.querySelector('[data-component="animate-presence"]')
    ).toBeInTheDocument()
  })
})
