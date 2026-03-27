import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { CountUp } from '../count-up'

describe('CountUp', () => {
  it('renders final value when duration is 0', () => {
    const { container } = render(<CountUp value={1234} duration={0} />)
    const el = container.querySelector('[data-component="count-up"]')!
    expect(el.textContent).toBe('1,234')
  })

  it('shows prefix and suffix', () => {
    const { container } = render(<CountUp value={100} duration={0} prefix="$" suffix="%" />)
    const el = container.querySelector('[data-component="count-up"]')!
    expect(el.textContent).toBe('$100%')
  })

  it('applies thousands separator', () => {
    const { container } = render(<CountUp value={1000000} duration={0} separator="," />)
    const el = container.querySelector('[data-component="count-up"]')!
    expect(el.textContent).toBe('1,000,000')
  })

  it('has data-component attribute', () => {
    const { container } = render(<CountUp value={42} duration={0} />)
    expect(container.querySelector('[data-component="count-up"]')).toBeInTheDocument()
  })
})
