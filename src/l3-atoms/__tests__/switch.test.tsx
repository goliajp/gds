import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Switch } from '../switch'

describe('Switch', () => {
  it('has role="switch"', () => {
    render(<Switch />)
    expect(screen.getByRole('switch')).toBeDefined()
  })

  it('has aria-checked=false by default', () => {
    render(<Switch />)
    expect(screen.getByRole('switch').getAttribute('aria-checked')).toBe('false')
  })

  it('has aria-checked=true when checked', () => {
    render(<Switch checked />)
    expect(screen.getByRole('switch').getAttribute('aria-checked')).toBe('true')
  })

  it('has data-component="switch"', () => {
    const { container } = render(<Switch />)
    expect(container.querySelector('[data-component="switch"]')).not.toBeNull()
  })

  it('has data-state="off" when unchecked', () => {
    const { container } = render(<Switch />)
    expect(container.querySelector('[data-state="off"]')).not.toBeNull()
  })

  it('has data-state="on" when checked', () => {
    const { container } = render(<Switch checked />)
    expect(container.querySelector('[data-state="on"]')).not.toBeNull()
  })

  it('renders label text', () => {
    render(<Switch label="Dark mode" />)
    expect(screen.getByText('Dark mode')).toBeDefined()
  })

  it('calls onChange with toggled value on click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Switch checked={false} onChange={onChange} />)
    await user.click(screen.getByRole('switch'))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('applies size variant', () => {
    const { container } = render(<Switch size="sm" />)
    const btn = container.querySelector('[role="switch"]')
    expect(btn?.className).toContain('h-4')
  })

  it('does not call onChange when disabled', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Switch disabled onChange={onChange} />)
    await user.click(screen.getByRole('switch'))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('does not render label when label is not provided', () => {
    const { container } = render(<Switch />)
    const spans = container.querySelectorAll('[data-component="switch"] > span')
    // no label span should exist
    expect(spans.length).toBe(0)
  })

  it('works without onChange handler', async () => {
    // should not throw when clicked without onChange
    const user = userEvent.setup()
    render(<Switch />)
    await user.click(screen.getByRole('switch'))
  })
})
