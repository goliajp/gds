import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Percentage } from '../percentage'

describe('Percentage', () => {
  it('renders with data-component', () => {
    const { container } = render(<Percentage value={5} />)
    expect(
      container.querySelector('[data-component="percentage"]')
    ).not.toBeNull()
  })

  it('formats positive value with precision', () => {
    render(<Percentage value={12.345} precision={2} />)
    expect(screen.getByText('12.35%')).toBeDefined()
  })

  it('shows sign when showSign is true', () => {
    render(<Percentage value={8} showSign />)
    expect(screen.getByText('+8.0%')).toBeDefined()
  })

  it('does not show sign for positive value when showSign is false', () => {
    render(<Percentage value={5} />)
    expect(screen.getByText('5.0%')).toBeDefined()
  })

  it('renders negative value with danger color', () => {
    const { container } = render(<Percentage value={-3.5} />)
    const el = container.querySelector('[data-component="percentage"]')
    expect(el?.textContent).toBe('-3.5%')
    expect(el?.className).toContain('text-danger')
  })

  it('renders zero value with muted color', () => {
    const { container } = render(<Percentage value={0} />)
    const el = container.querySelector('[data-component="percentage"]')
    expect(el?.textContent).toBe('0.0%')
    expect(el?.className).toContain('text-fg-muted')
  })

  it('does not show plus sign for zero even when showSign is true', () => {
    render(<Percentage value={0} showSign />)
    expect(screen.getByText('0.0%')).toBeDefined()
  })

  it('uses default precision of 1', () => {
    render(<Percentage value={3.456} />)
    expect(screen.getByText('3.5%')).toBeDefined()
  })
})
