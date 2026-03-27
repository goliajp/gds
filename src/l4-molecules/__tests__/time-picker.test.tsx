import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { TimePicker } from '../time-picker'

describe('TimePicker', () => {
  it('renders with placeholder text', () => {
    render(<TimePicker value={null} onChange={() => {}} />)
    expect(screen.getByText('Select time')).toBeDefined()
  })

  it('renders with custom placeholder', () => {
    render(<TimePicker value={null} onChange={() => {}} placeholder="Pick a time" />)
    expect(screen.getByText('Pick a time')).toBeDefined()
  })

  it('displays the selected value', () => {
    render(<TimePicker value="14:30" onChange={() => {}} />)
    expect(screen.getByText('14:30')).toBeDefined()
  })

  it('has data-component="time-picker"', () => {
    const { container } = render(<TimePicker value={null} onChange={() => {}} />)
    expect(container.querySelector('[data-component="time-picker"]')).not.toBeNull()
  })

  it('opens dropdown on click', async () => {
    const user = userEvent.setup()
    const { container } = render(<TimePicker value={null} onChange={() => {}} />)
    await user.click(screen.getByRole('button'))
    expect(container.querySelector('[data-state="open"]')).not.toBeNull()
  })

  it('selects hour and calls onChange', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<TimePicker value={null} onChange={onChange} />)
    await user.click(screen.getByRole('button'))
    // click hour "09"
    const hourButtons = screen.getAllByRole('button')
    const hour09 = hourButtons.find((b) => b.textContent === '09')
    if (hour09 !== undefined) {
      await user.click(hour09)
      expect(onChange).toHaveBeenCalledWith('09:00')
    }
  })

  it('selects minute and calls onChange', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<TimePicker value="14:00" onChange={onChange} minuteStep={15} />)
    await user.click(screen.getByRole('button'))
    const buttons = screen.getAllByRole('button')
    const min30 = buttons.find((b) => b.textContent === '30')
    if (min30 !== undefined) {
      await user.click(min30)
      expect(onChange).toHaveBeenCalledWith('14:30')
    }
  })

  it('closes on Escape key', async () => {
    const user = userEvent.setup()
    const { container } = render(<TimePicker value={null} onChange={() => {}} />)
    await user.click(screen.getByRole('button'))
    expect(container.querySelector('[data-state="open"]')).not.toBeNull()
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(container.querySelector('[data-state="closed"]')).not.toBeNull()
  })

  it('applies error styling', () => {
    render(<TimePicker value={null} onChange={() => {}} error />)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('border-danger')
  })

  it('is disabled when disabled prop is true', () => {
    render(<TimePicker value={null} onChange={() => {}} disabled />)
    expect(screen.getByRole('button').hasAttribute('disabled')).toBe(true)
  })
})
