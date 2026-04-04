import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Calendar } from '../calendar'

describe('Calendar', () => {
  it('renders without crash', () => {
    const { container } = render(<Calendar />)
    expect(
      container.querySelector('[data-component="calendar"]')
    ).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<Calendar />)
    expect(
      container.querySelector('[data-component="calendar"]')
    ).not.toBeNull()
  })

  it('displays weekday headers', () => {
    render(<Calendar />)
    expect(screen.getByText('Su')).toBeDefined()
    expect(screen.getByText('Mo')).toBeDefined()
    expect(screen.getByText('Fr')).toBeDefined()
  })

  it('calls onChange when a day is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Calendar value={new Date(2025, 0, 15)} onChange={onChange} />)
    const day10 = screen.getByText('10')
    await user.click(day10)
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][0].getDate()).toBe(10)
  })

  it('disables days outside min/max range', () => {
    render(
      <Calendar
        value={new Date(2025, 0, 15)}
        min={new Date(2025, 0, 10)}
        max={new Date(2025, 0, 20)}
      />
    )
    const day5 = screen.getByText('5')
    expect(day5.hasAttribute('disabled')).toBe(true)
  })

  it('navigates to previous month', async () => {
    const user = userEvent.setup()
    render(<Calendar value={new Date(2025, 1, 15)} />)
    expect(screen.getByText('February 2025')).toBeDefined()
    await user.click(screen.getByLabelText('Previous month'))
    expect(screen.getByText('January 2025')).toBeDefined()
  })

  it('navigates to next month', async () => {
    const user = userEvent.setup()
    render(<Calendar value={new Date(2025, 0, 15)} />)
    expect(screen.getByText('January 2025')).toBeDefined()
    await user.click(screen.getByLabelText('Next month'))
    expect(screen.getByText('February 2025')).toBeDefined()
  })

  it('wraps from January to previous year December', async () => {
    const user = userEvent.setup()
    render(<Calendar value={new Date(2025, 0, 15)} />)
    await user.click(screen.getByLabelText('Previous month'))
    expect(screen.getByText('December 2024')).toBeDefined()
  })

  it('wraps from December to next year January', async () => {
    const user = userEvent.setup()
    render(<Calendar value={new Date(2025, 11, 15)} />)
    await user.click(screen.getByLabelText('Next month'))
    expect(screen.getByText('January 2026')).toBeDefined()
  })

  it('does not call onChange for disabled day click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <Calendar
        value={new Date(2025, 0, 15)}
        onChange={onChange}
        min={new Date(2025, 0, 10)}
        max={new Date(2025, 0, 20)}
      />
    )
    const day5 = screen.getByText('5')
    await user.click(day5)
    expect(onChange).not.toHaveBeenCalled()
  })

  it('applies custom className', () => {
    const { container } = render(<Calendar className="my-calendar" />)
    const root = container.querySelector('[data-component="calendar"]')
    expect(root?.className).toContain('my-calendar')
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<Calendar ref={ref} />)
    expect(ref.current).not.toBeNull()
  })
})
