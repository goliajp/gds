import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { CalendarView } from '../calendar-view'

describe('CalendarView', () => {
  it('has data-component="calendar-view"', () => {
    const { container } = render(<CalendarView month={3} year={2026} />)
    expect(container.querySelector('[data-component="calendar-view"]')).not.toBeNull()
  })

  it('renders weekday headers', () => {
    render(<CalendarView month={3} year={2026} />)
    expect(screen.getByText('Sun')).toBeDefined()
    expect(screen.getByText('Mon')).toBeDefined()
    expect(screen.getByText('Sat')).toBeDefined()
  })

  it('renders correct number of days for february', () => {
    // february 2026 has 28 days
    const { container } = render(<CalendarView month={2} year={2026} />)
    expect(container.textContent).toContain('28')
    // 28 days means day 1 through 28, check grid cells
    const cells = container.querySelectorAll('[data-component="calendar-view"] .grid > div')
    // 7 weekday headers + blank cells + 28 day cells
    expect(cells.length).toBeGreaterThanOrEqual(35)
  })

  it('calls onDateClick when a day is clicked', () => {
    const onClick = vi.fn()
    render(<CalendarView month={3} onDateClick={onClick} year={2026} />)
    fireEvent.click(screen.getByText('15'))
    expect(onClick).toHaveBeenCalledWith(15)
  })
})
