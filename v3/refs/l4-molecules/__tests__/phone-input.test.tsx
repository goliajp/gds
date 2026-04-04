import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { PhoneInput } from '../phone-input'

describe('PhoneInput', () => {
  it('renders with default country +81', () => {
    render(<PhoneInput value="" onChange={() => {}} />)
    expect(screen.getByText('+81')).toBeDefined()
  })

  it('opens country dropdown and selects a country', async () => {
    const user = userEvent.setup()
    render(<PhoneInput value="" onChange={() => {}} />)

    const countryBtn = screen.getByLabelText('Select country code')
    await user.click(countryBtn)

    // dropdown should show US option
    const usOption = screen.getByText('US')
    expect(usOption).toBeDefined()
    await user.click(usOption)

    // after selection, +1 should be visible
    expect(screen.getByText('+1')).toBeDefined()
  })

  it('calls onChange when input changes', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<PhoneInput value="" onChange={onChange} />)

    const input = screen.getByLabelText('Phone number')
    await user.type(input, '123')

    expect(onChange).toHaveBeenCalled()
  })

  it('applies error state', () => {
    const { container } = render(
      <PhoneInput value="" onChange={() => {}} error />
    )
    expect(container.querySelector('[data-error]')).not.toBeNull()
  })

  it('disables input when disabled', () => {
    render(<PhoneInput value="" onChange={() => {}} disabled />)
    const input = screen.getByLabelText('Phone number')
    expect(input).toHaveProperty('disabled', true)
  })
})
