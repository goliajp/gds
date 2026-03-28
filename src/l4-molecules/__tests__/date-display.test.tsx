import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { DateDisplay } from '../date-display'

describe('DateDisplay', () => {
  it('has data-component="date-display"', () => {
    const { container } = render(<DateDisplay date={new Date()} />)
    expect(container.querySelector('[data-component="date-display"]')).not.toBeNull()
  })

  it('shows "just now" for recent dates in relative mode', () => {
    const { container } = render(<DateDisplay date={new Date()} format="relative" />)
    expect(container.textContent).toBe('just now')
  })

  it('shows absolute format as YYYY-MM-DD', () => {
    const date = new Date(2025, 0, 15) // 2025-01-15
    const { container } = render(<DateDisplay date={date} format="absolute" />)
    expect(container.textContent).toBe('2025-01-15')
  })

  it('sets title to ISO string', () => {
    const date = new Date(2025, 5, 1)
    const { container } = render(<DateDisplay date={date} />)
    const el = container.querySelector('[data-component="date-display"]')
    expect(el?.getAttribute('title')).toBe(date.toISOString())
  })

  it('accepts string date', () => {
    const { container } = render(<DateDisplay date="2025-01-15" format="absolute" />)
    expect(container.textContent).toBe('2025-01-15')
  })

  it('shows minutes ago for relative format', () => {
    const date = new Date(Date.now() - 5 * 60 * 1000) // 5 minutes ago
    const { container } = render(<DateDisplay date={date} format="relative" />)
    expect(container.textContent).toBe('5m ago')
  })

  it('shows hours ago for relative format', () => {
    const date = new Date(Date.now() - 3 * 60 * 60 * 1000) // 3 hours ago
    const { container } = render(<DateDisplay date={date} format="relative" />)
    expect(container.textContent).toBe('3h ago')
  })

  it('shows yesterday for relative format', () => {
    const date = new Date(Date.now() - 30 * 60 * 60 * 1000) // 30 hours ago
    const { container } = render(<DateDisplay date={date} format="relative" />)
    expect(container.textContent).toBe('yesterday')
  })

  it('shows days ago for relative format', () => {
    const date = new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) // 4 days ago
    const { container } = render(<DateDisplay date={date} format="relative" />)
    expect(container.textContent).toBe('4 days ago')
  })

  it('auto format shows relative for recent dates', () => {
    const date = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
    const { container } = render(<DateDisplay date={date} />)
    // auto mode, < 7 days → relative
    expect(container.textContent).not.toMatch(/^\d{4}-/)
  })

  it('auto format shows absolute for old dates', () => {
    const date = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 30 days ago
    const { container } = render(<DateDisplay date={date} />)
    expect(container.textContent).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('applies custom className', () => {
    const { container } = render(<DateDisplay date={new Date()} className="my-cls" />)
    const el = container.querySelector('[data-component="date-display"]')
    expect(el?.className).toContain('my-cls')
  })
})
