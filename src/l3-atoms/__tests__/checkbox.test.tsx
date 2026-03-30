import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Checkbox } from '../checkbox'

describe('Checkbox', () => {
  it('has role="checkbox"', () => {
    render(<Checkbox />)
    expect(screen.getByRole('checkbox')).toBeDefined()
  })

  it('has aria-checked=false by default', () => {
    render(<Checkbox />)
    expect(screen.getByRole('checkbox').getAttribute('aria-checked')).toBe(
      'false'
    )
  })

  it('has aria-checked=true when checked', () => {
    render(<Checkbox checked />)
    expect(screen.getByRole('checkbox').getAttribute('aria-checked')).toBe(
      'true'
    )
  })

  it('has data-component="checkbox"', () => {
    const { container } = render(<Checkbox />)
    expect(
      container.querySelector('[data-component="checkbox"]')
    ).not.toBeNull()
  })

  it('has data-state="unchecked" when not checked', () => {
    const { container } = render(<Checkbox />)
    expect(container.querySelector('[data-state="unchecked"]')).not.toBeNull()
  })

  it('has data-state="checked" when checked', () => {
    const { container } = render(<Checkbox checked />)
    expect(container.querySelector('[data-state="checked"]')).not.toBeNull()
  })

  it('renders label text', () => {
    render(<Checkbox label="Accept terms" />)
    expect(screen.getByText('Accept terms')).toBeDefined()
  })

  it('calls onChange with toggled value on click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Checkbox checked={false} onChange={onChange} />)
    await user.click(screen.getByRole('checkbox'))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('does not call onChange when disabled', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Checkbox disabled onChange={onChange} />)
    await user.click(screen.getByRole('checkbox'))
    expect(onChange).not.toHaveBeenCalled()
  })
})
