import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { DatePicker } from '../date-picker'

describe('DatePicker', () => {
  it('renders without crash', () => {
    const { container } = render(<DatePicker />)
    expect(container.querySelector('[data-component="date-picker"]')).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<DatePicker />)
    expect(container.querySelector('[data-component="date-picker"]')).not.toBeNull()
  })

  it('displays placeholder when no value', () => {
    render(<DatePicker placeholder="Pick a date" />)
    expect(screen.getByText('Pick a date')).toBeDefined()
  })

  it('displays formatted date when value is set', () => {
    render(<DatePicker value={new Date(2025, 5, 15)} />)
    expect(screen.getByText('2025-06-15')).toBeDefined()
  })

  it('opens calendar on click', async () => {
    const user = userEvent.setup()
    const { container } = render(<DatePicker />)
    const button = container.querySelector('button')!
    await user.click(button)
    expect(container.querySelector('[data-component="date-picker"]')?.getAttribute('data-state')).toBe('open')
  })
})
