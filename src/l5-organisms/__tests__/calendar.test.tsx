import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Calendar } from '../calendar'

describe('Calendar', () => {
  it('renders without crash', () => {
    const { container } = render(<Calendar />)
    expect(container.querySelector('[data-component="calendar"]')).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<Calendar />)
    expect(container.querySelector('[data-component="calendar"]')).not.toBeNull()
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
      />,
    )
    const day5 = screen.getByText('5')
    expect(day5.hasAttribute('disabled')).toBe(true)
  })
})
