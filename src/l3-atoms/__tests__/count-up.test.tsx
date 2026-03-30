import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CountUp } from '../count-up'

describe('CountUp', () => {
  it('renders final value when duration is 0', () => {
    const { container } = render(<CountUp value={1234} duration={0} />)
    const el = container.querySelector('[data-component="count-up"]')!
    expect(el.textContent).toBe('1,234')
  })

  it('shows prefix and suffix', () => {
    const { container } = render(
      <CountUp value={100} duration={0} prefix="$" suffix="%" />
    )
    const el = container.querySelector('[data-component="count-up"]')!
    expect(el.textContent).toBe('$100%')
  })

  it('applies thousands separator', () => {
    const { container } = render(
      <CountUp value={1000000} duration={0} separator="," />
    )
    const el = container.querySelector('[data-component="count-up"]')!
    expect(el.textContent).toBe('1,000,000')
  })

  it('has data-component attribute', () => {
    const { container } = render(<CountUp value={42} duration={0} />)
    expect(
      container.querySelector('[data-component="count-up"]')
    ).toBeInTheDocument()
  })

  it('renders with decimals', () => {
    const { container } = render(
      <CountUp value={3.14} duration={0} decimals={2} />
    )
    const el = container.querySelector('[data-component="count-up"]')!
    expect(el.textContent).toBe('3.14')
  })

  it('handles empty separator', () => {
    const { container } = render(
      <CountUp value={1000} duration={0} separator="" />
    )
    const el = container.querySelector('[data-component="count-up"]')!
    expect(el.textContent).toBe('1000')
  })

  it('renders without prefix or suffix', () => {
    const { container } = render(<CountUp value={50} duration={0} />)
    const el = container.querySelector('[data-component="count-up"]')!
    expect(el.textContent).toBe('50')
  })

  it('applies custom className', () => {
    const { container } = render(
      <CountUp value={0} duration={0} className="my-cls" />
    )
    const el = container.querySelector('[data-component="count-up"]')
    expect(el?.className).toContain('my-cls')
  })

  it('starts animation when duration > 0', () => {
    // just verifying it renders without error and starts at 0
    const { container } = render(<CountUp value={100} duration={500} />)
    const el = container.querySelector('[data-component="count-up"]')!
    // initial state starts at 0
    expect(el.textContent).toBe('0')
  })
})
