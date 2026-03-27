import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { FormBuilder } from '../form-builder'

const fields = [
  { id: 'name', label: 'Full Name', type: 'text' as const, required: true },
  { id: 'bio', label: 'Bio', type: 'textarea' as const },
  { id: 'role', label: 'Role', type: 'select' as const, options: ['Admin', 'User'] },
]

describe('FormBuilder', () => {
  it('renders without crash', () => {
    const { container } = render(
      <FormBuilder fields={fields} values={{}} onChange={vi.fn()} />,
    )
    expect(container.querySelector('[data-component="form-builder"]')).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(
      <FormBuilder fields={fields} values={{}} onChange={vi.fn()} />,
    )
    expect(container.querySelector('[data-component="form-builder"]')).not.toBeNull()
  })

  it('renders all field labels', () => {
    render(<FormBuilder fields={fields} values={{}} onChange={vi.fn()} />)
    expect(screen.getByText('Full Name')).toBeDefined()
    expect(screen.getByText('Bio')).toBeDefined()
    expect(screen.getByText('Role')).toBeDefined()
  })

  it('calls onChange when text input changes', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<FormBuilder fields={fields} values={{}} onChange={onChange} />)
    const input = screen.getByLabelText(/Full Name/)
    await user.type(input, 'A')
    expect(onChange).toHaveBeenCalledWith('name', 'A')
  })
})
