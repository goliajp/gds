import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ScrollToTop } from '../scroll-to-top'

describe('ScrollToTop', () => {
  it('is hidden when scrollY is below threshold', () => {
    const { container } = render(<ScrollToTop />)
    expect(container.querySelector('[data-component="scroll-to-top"]')).toBeNull()
  })

  it('has data-component attribute', () => {
    // force visible by setting a very low threshold and simulating scroll
    Object.defineProperty(window, 'scrollY', { value: 400, writable: true })
    window.dispatchEvent(new Event('scroll'))
    const { container } = render(<ScrollToTop threshold={0} />)
    // threshold=0 means scrollY >= 0 is always true
    expect(container.querySelector('[data-component="scroll-to-top"]')).not.toBeNull()
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
})
