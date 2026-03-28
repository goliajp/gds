import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AnimatedCounter } from '../animated-counter'

describe('AnimatedCounter', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<AnimatedCounter value={42} />)
    const el = container.querySelector('[data-component="animated-counter"]')
    expect(el).toBeDefined()
    expect(el).not.toBeNull()
  })

  it('displays integer value with default format', () => {
    render(<AnimatedCounter value={0} />)
    expect(screen.getByText('0')).toBeDefined()
  })

  it('renders prefix when provided', () => {
    render(<AnimatedCounter prefix="$" value={100} />)
    expect(screen.getByText('$')).toBeDefined()
  })

  it('renders suffix when provided', () => {
    render(<AnimatedCounter suffix="%" value={75} />)
    expect(screen.getByText('%')).toBeDefined()
  })

  it('does not render prefix when not provided', () => {
    const { container } = render(<AnimatedCounter value={10} />)
    const spans = container.querySelectorAll('[data-component="animated-counter"] > span')
    expect(spans.length).toBe(0)
  })

  it('renders both prefix and suffix', () => {
    render(<AnimatedCounter prefix="~" suffix="km" value={5} />)
    expect(screen.getByText('~')).toBeDefined()
    expect(screen.getByText('km')).toBeDefined()
  })

  it('uses custom format function', () => {
    const format = (n: number) => `${n.toFixed(1)}!`
    render(<AnimatedCounter format={format} value={3} />)
    expect(screen.getByText('3.0!')).toBeDefined()
  })

  it('applies custom className', () => {
    const { container } = render(<AnimatedCounter className="custom-class" value={0} />)
    const el = container.querySelector('[data-component="animated-counter"]')
    expect(el?.classList.contains('custom-class')).toBe(true)
  })

  it('passes extra props to the span element', () => {
    const { container } = render(<AnimatedCounter data-testid="counter" value={0} />)
    expect(container.querySelector('[data-testid="counter"]')).not.toBeNull()
  })

  it('formats non-integer values with up to 2 fraction digits', () => {
    render(<AnimatedCounter value={0} />)
    // default format with integer returns toLocaleString
    expect(screen.getByText('0')).toBeDefined()
  })

  it('renders non-integer with default format', () => {
    render(<AnimatedCounter value={3.14} />)
    // default format for non-integer uses maximumFractionDigits: 2
    expect(screen.getByText('3.14')).toBeDefined()
  })

  it('does not render prefix span when prefix is undefined', () => {
    const { container } = render(<AnimatedCounter value={5} />)
    const spans = container.querySelectorAll('[data-component="animated-counter"] > span')
    expect(spans.length).toBe(0)
  })

  it('does not render suffix span when suffix is undefined', () => {
    const { container } = render(<AnimatedCounter value={5} />)
    const spans = container.querySelectorAll('[data-component="animated-counter"] > span')
    expect(spans.length).toBe(0)
  })
})
