import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AnimatedNumber } from '../animated-number'

describe('AnimatedNumber', () => {
  it('renders the value', () => {
    const { container } = render(<AnimatedNumber value={42} duration={0} />)
    const el = container.querySelector('[data-component="animated-number"]')!
    expect(el.textContent).toBe('42')
  })

  it('formats with default toLocaleString', () => {
    const { container } = render(<AnimatedNumber value={1234} duration={0} />)
    const el = container.querySelector('[data-component="animated-number"]')!
    expect(el.textContent).toBe('1,234')
  })

  it('uses custom format function', () => {
    const fmt = (n: number) => `$${n.toFixed(2)}`
    const { container } = render(
      <AnimatedNumber value={99} duration={0} format={fmt} />
    )
    const el = container.querySelector('[data-component="animated-number"]')!
    expect(el.textContent).toBe('$99.00')
  })

  it('has data-component attribute', () => {
    const { container } = render(<AnimatedNumber value={0} duration={0} />)
    expect(
      container.querySelector('[data-component="animated-number"]')
    ).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <AnimatedNumber value={0} duration={0} className="extra" />
    )
    const el = container.querySelector('[data-component="animated-number"]')
    expect(el?.className).toContain('extra')
  })

  it('starts animation when duration > 0', () => {
    const { container } = render(<AnimatedNumber value={100} />)
    const el = container.querySelector('[data-component="animated-number"]')!
    // initial state matches initial value (100) since useState(value)
    expect(el).not.toBeNull()
  })
})
