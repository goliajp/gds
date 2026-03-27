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
})
