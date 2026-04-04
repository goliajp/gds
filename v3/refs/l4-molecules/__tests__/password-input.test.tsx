import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { PasswordInput } from '../password-input'

describe('PasswordInput', () => {
  it('renders as password type by default', () => {
    render(<PasswordInput value="" onChange={() => {}} />)
    const input = screen.getByDisplayValue('')
    expect(input).toHaveAttribute('type', 'password')
  })

  it('toggles visibility on button click', async () => {
    const user = userEvent.setup()
    render(<PasswordInput value="secret" onChange={() => {}} />)

    const input = screen.getByDisplayValue('secret')
    expect(input).toHaveAttribute('type', 'password')

    const toggle = screen.getByLabelText('Show password')
    await user.click(toggle)

    expect(input).toHaveAttribute('type', 'text')
    expect(screen.getByLabelText('Hide password')).toBeDefined()
  })

  it('shows strength bar when showStrength is true', () => {
    render(<PasswordInput value="Abc123!@" onChange={() => {}} showStrength />)
    expect(screen.getByRole('progressbar')).toBeDefined()
  })

  it('computes correct strength levels', () => {
    const { rerender } = render(
      <PasswordInput value="ab" onChange={() => {}} showStrength />
    )
    expect(screen.getByText('Weak')).toBeDefined()

    rerender(
      <PasswordInput value="abcdef12" onChange={() => {}} showStrength />
    )
    expect(screen.getByText('Fair')).toBeDefined()

    rerender(
      <PasswordInput value="Abcdef12!@" onChange={() => {}} showStrength />
    )
    expect(screen.getByText('Strong')).toBeDefined()
  })

  it('passes error state to input', () => {
    const { container } = render(
      <PasswordInput value="" onChange={() => {}} error />
    )
    const input = container.querySelector('input')
    expect(input?.className).toContain('border-danger')
  })
})
