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

  it('closes calendar on second click', async () => {
    const user = userEvent.setup()
    const { container } = render(<DatePicker />)
    const button = container.querySelector('button')!
    await user.click(button)
    expect(container.querySelector('[data-component="date-picker"]')?.getAttribute('data-state')).toBe('open')
    await user.click(button)
    expect(container.querySelector('[data-component="date-picker"]')?.getAttribute('data-state')).toBe('closed')
  })

  it('shows default placeholder text', () => {
    render(<DatePicker />)
    expect(screen.getByText('Select date')).toBeDefined()
  })

  it('applies glass styling', () => {
    const { container } = render(<DatePicker glass />)
    const button = container.querySelector('button')
    expect(button?.className).toContain('border-white/10')
  })

  it('applies custom className', () => {
    const { container } = render(<DatePicker className="my-picker" />)
    const root = container.querySelector('[data-component="date-picker"]')
    expect(root?.className).toContain('my-picker')
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<DatePicker ref={ref} />)
    expect(ref.current).not.toBeNull()
  })

  it('calls onChange when date is selected', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const { container } = render(<DatePicker value={new Date(2025, 0, 15)} onChange={onChange} />)
    await user.click(container.querySelector('button')!)
    const day10 = screen.getByText('10')
    await user.click(day10)
    expect(onChange).toHaveBeenCalledTimes(1)
  })
})
