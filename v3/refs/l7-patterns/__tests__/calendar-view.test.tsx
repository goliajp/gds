import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { CalendarView } from '../calendar-view'

describe('CalendarView', () => {
  it('has data-component="calendar-view"', () => {
    const { container } = render(<CalendarView month={3} year={2026} />)
    expect(
      container.querySelector('[data-component="calendar-view"]')
    ).not.toBeNull()
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
    const cells = container.querySelectorAll(
      '[data-component="calendar-view"] .grid > div'
    )
    // 7 weekday headers + blank cells + 28 day cells
    expect(cells.length).toBeGreaterThanOrEqual(35)
  })

  it('calls onDateClick when a day is clicked', () => {
    const onClick = vi.fn()
    render(<CalendarView month={3} onDateClick={onClick} year={2026} />)
    fireEvent.click(screen.getByText('15'))
    expect(onClick).toHaveBeenCalledWith(15)
  })

  it('renders event dots on days with events', () => {
    const events = [
      { date: 5, label: 'Meeting', color: 'red' },
      { date: 5, label: 'Lunch' },
    ]
    const { container } = render(
      <CalendarView month={3} year={2026} events={events} />
    )
    const dots = container.querySelectorAll('.rounded-full')
    expect(dots.length).toBeGreaterThanOrEqual(2)
  })

  it('uses default accent color when event has no color', () => {
    const events = [{ date: 10, label: 'Task' }]
    const { container } = render(
      <CalendarView month={3} year={2026} events={events} />
    )
    const dot = container.querySelector('.rounded-full') as HTMLElement
    expect(dot?.style.backgroundColor).toBe('var(--color-accent)')
  })

  it('does not call onDateClick when clicking empty cell', () => {
    const onClick = vi.fn()
    // march 2026 starts on sunday, so first cell is day 1, no blank cells before
    // use february 2026 which starts on sunday too — let's use april 2026 which starts on wednesday
    const { container } = render(
      <CalendarView month={4} year={2026} onDateClick={onClick} />
    )
    // the first 3 cells are blank (april 2026 starts on wednesday)
    const grid = container.querySelector('.grid')
    const cells = grid?.children
    // first 7 are weekday headers, next cells start with blanks
    if (cells !== undefined && cells.length > 7) {
      fireEvent.click(cells[7] as HTMLElement)
    }
    // clicking a blank cell should not call onDateClick
    expect(onClick).not.toHaveBeenCalled()
  })

  it('applies custom className', () => {
    const { container } = render(
      <CalendarView month={3} year={2026} className="my-cal" />
    )
    const el = container.querySelector('[data-component="calendar-view"]')
    expect(el?.className).toContain('my-cal')
  })
})
