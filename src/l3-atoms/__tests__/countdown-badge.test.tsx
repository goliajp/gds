import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CountdownBadge } from '../countdown-badge'

describe('CountdownBadge', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<CountdownBadge count={5} />)
    const el = container.querySelector('[data-component="countdown-badge"]')
    expect(el).not.toBeNull()
  })

  it('displays the count value', () => {
    render(<CountdownBadge count={42} />)
    expect(screen.getByText('42')).toBeDefined()
  })

  it('returns null when count is 0', () => {
    const { container } = render(<CountdownBadge count={0} />)
    const el = container.querySelector('[data-component="countdown-badge"]')
    expect(el).toBeNull()
  })

  it('returns null when count is negative', () => {
    const { container } = render(<CountdownBadge count={-5} />)
    const el = container.querySelector('[data-component="countdown-badge"]')
    expect(el).toBeNull()
  })

  it('shows max+ when count exceeds default max (99)', () => {
    render(<CountdownBadge count={100} />)
    expect(screen.getByText('99+')).toBeDefined()
  })

  it('shows max+ when count exceeds custom max', () => {
    render(<CountdownBadge count={15} max={10} />)
    expect(screen.getByText('10+')).toBeDefined()
  })

  it('shows exact count when equal to max', () => {
    render(<CountdownBadge count={99} max={99} />)
    expect(screen.getByText('99')).toBeDefined()
  })

  it('applies default variant classes', () => {
    const { container } = render(<CountdownBadge count={1} />)
    const el = container.querySelector('[data-component="countdown-badge"]')
    expect(el?.classList.contains('bg-accent')).toBe(true)
  })

  it('applies danger variant classes', () => {
    const { container } = render(<CountdownBadge count={1} variant="danger" />)
    const el = container.querySelector('[data-component="countdown-badge"]')
    expect(el?.classList.contains('bg-danger')).toBe(true)
    expect(el?.classList.contains('animate-pulse')).toBe(true)
  })

  it('applies custom className', () => {
    const { container } = render(<CountdownBadge className="extra" count={1} />)
    const el = container.querySelector('[data-component="countdown-badge"]')
    expect(el?.classList.contains('extra')).toBe(true)
  })

  it('passes extra props', () => {
    const { container } = render(<CountdownBadge count={1} data-testid="badge" />)
    expect(container.querySelector('[data-testid="badge"]')).not.toBeNull()
  })
})
