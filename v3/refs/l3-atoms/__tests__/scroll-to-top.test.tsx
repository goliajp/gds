import { fireEvent, render } from '@testing-library/react'
import { act } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { ScrollToTop } from '../scroll-to-top'

describe('ScrollToTop', () => {
  it('is hidden when scrollY is below threshold', () => {
    const { container } = render(<ScrollToTop />)
    expect(
      container.querySelector('[data-component="scroll-to-top"]')
    ).toBeNull()
  })

  it('has data-component attribute', () => {
    // force visible by setting a very low threshold and simulating scroll
    Object.defineProperty(window, 'scrollY', { value: 400, writable: true })
    window.dispatchEvent(new Event('scroll'))
    const { container } = render(<ScrollToTop threshold={0} />)
    // threshold=0 means scrollY >= 0 is always true
    expect(
      container.querySelector('[data-component="scroll-to-top"]')
    ).not.toBeNull()
  })

  it('renders a button element', () => {
    const { container } = render(<ScrollToTop threshold={0} />)
    const btn = container.querySelector('button')
    expect(btn).not.toBeNull()
  })

  it('has aria-label for accessibility', () => {
    const { container } = render(<ScrollToTop threshold={0} />)
    const btn = container.querySelector('button')
    expect(btn?.getAttribute('aria-label')).toBe('Scroll to top')
  })

  it('calls window.scrollTo with smooth behavior on click', () => {
    const scrollTo = vi.fn()
    Object.defineProperty(window, 'scrollTo', {
      value: scrollTo,
      writable: true,
    })

    const { container } = render(<ScrollToTop threshold={0} />)
    const btn = container.querySelector('button')!
    fireEvent.click(btn)
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('calls window.scrollTo with auto behavior when smooth is false', () => {
    const scrollTo = vi.fn()
    Object.defineProperty(window, 'scrollTo', {
      value: scrollTo,
      writable: true,
    })

    const { container } = render(<ScrollToTop threshold={0} smooth={false} />)
    const btn = container.querySelector('button')!
    fireEvent.click(btn)
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'auto' })
  })

  it('becomes visible when scrollY crosses threshold via scroll event', () => {
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
      configurable: true,
    })

    const { container } = render(<ScrollToTop threshold={100} />)
    expect(
      container.querySelector('[data-component="scroll-to-top"]')
    ).toBeNull()

    Object.defineProperty(window, 'scrollY', {
      value: 200,
      writable: true,
      configurable: true,
    })
    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })
    expect(
      container.querySelector('[data-component="scroll-to-top"]')
    ).not.toBeNull()
  })

  it('applies custom className', () => {
    const { container } = render(
      <ScrollToTop threshold={0} className="my-class" />
    )
    const btn = container.querySelector('[data-component="scroll-to-top"]')
    expect(btn?.className).toContain('my-class')
  })
})
