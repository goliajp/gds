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

  it('renders checkbox field and calls onChange', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const checkboxFields = [
      { id: 'agree', label: 'I agree', type: 'checkbox' as const },
    ]
    render(<FormBuilder fields={checkboxFields} values={{ agree: false }} onChange={onChange} />)
    const checkbox = screen.getByLabelText('I agree')
    await user.click(checkbox)
    expect(onChange).toHaveBeenCalledWith('agree', true)
  })

  it('renders textarea field and calls onChange', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<FormBuilder fields={fields} values={{}} onChange={onChange} />)
    const textarea = screen.getByLabelText('Bio')
    await user.type(textarea, 'X')
    expect(onChange).toHaveBeenCalledWith('bio', 'X')
  })

  it('renders select field with options', () => {
    render(<FormBuilder fields={fields} values={{}} onChange={vi.fn()} />)
    const select = screen.getByLabelText('Role')
    expect(select.tagName).toBe('SELECT')
    expect(screen.getByText('Admin')).toBeDefined()
    expect(screen.getByText('User')).toBeDefined()
  })

  it('calls onChange when select value changes', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<FormBuilder fields={fields} values={{}} onChange={onChange} />)
    const select = screen.getByLabelText('Role')
    await user.selectOptions(select, 'Admin')
    expect(onChange).toHaveBeenCalledWith('role', 'Admin')
  })

  it('renders number field and calls onChange with number', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const numFields = [
      { id: 'age', label: 'Age', type: 'number' as const },
    ]
    render(<FormBuilder fields={numFields} values={{}} onChange={onChange} />)
    const input = screen.getByLabelText('Age')
    await user.type(input, '5')
    expect(onChange).toHaveBeenCalledWith('age', 5)
  })

  it('shows required asterisk on text field', () => {
    render(<FormBuilder fields={fields} values={{}} onChange={vi.fn()} />)
    // Full Name has required: true
    const label = screen.getByText('Full Name')
    const asterisk = label.closest('label')?.querySelector('.text-danger') ?? label.parentElement?.querySelector('.text-danger')
    expect(asterisk).not.toBeNull()
  })

  it('shows required asterisk on checkbox field', () => {
    const reqCheckbox = [
      { id: 'agree', label: 'I agree', type: 'checkbox' as const, required: true },
    ]
    render(<FormBuilder fields={reqCheckbox} values={{}} onChange={vi.fn()} />)
    expect(screen.getByText('*')).toBeDefined()
  })

  it('shows required asterisk on textarea field', () => {
    const reqTextarea = [
      { id: 'bio', label: 'Bio', type: 'textarea' as const, required: true },
    ]
    render(<FormBuilder fields={reqTextarea} values={{}} onChange={vi.fn()} />)
    expect(screen.getByText(/\*/)).toBeDefined()
  })

  it('shows required asterisk on select field', () => {
    const reqSelect = [
      { id: 'role', label: 'Role', type: 'select' as const, options: ['A'], required: true },
    ]
    render(<FormBuilder fields={reqSelect} values={{}} onChange={vi.fn()} />)
    expect(screen.getByText(/\*/)).toBeDefined()
  })

  it('select shows placeholder text', () => {
    const selectWithPlaceholder = [
      { id: 'role', label: 'Role', type: 'select' as const, options: ['A'], placeholder: 'Choose role' },
    ]
    render(<FormBuilder fields={selectWithPlaceholder} values={{}} onChange={vi.fn()} />)
    expect(screen.getByText('Choose role')).toBeDefined()
  })

  it('select shows default placeholder when none provided', () => {
    render(<FormBuilder fields={fields} values={{}} onChange={vi.fn()} />)
    expect(screen.getByText('Select...')).toBeDefined()
  })

  it('renders text field with placeholder', () => {
    const textWithPlaceholder = [
      { id: 'name', label: 'Name', type: 'text' as const, placeholder: 'Enter name' },
    ]
    render(<FormBuilder fields={textWithPlaceholder} values={{}} onChange={vi.fn()} />)
    expect(screen.getByPlaceholderText('Enter name')).toBeDefined()
  })

  it('renders textarea with placeholder', () => {
    const taWithPlaceholder = [
      { id: 'bio', label: 'Bio', type: 'textarea' as const, placeholder: 'Tell us about yourself' },
    ]
    render(<FormBuilder fields={taWithPlaceholder} values={{}} onChange={vi.fn()} />)
    expect(screen.getByPlaceholderText('Tell us about yourself')).toBeDefined()
  })

  it('displays existing values in fields', () => {
    render(<FormBuilder fields={fields} values={{ name: 'John', bio: 'Hello' }} onChange={vi.fn()} />)
    expect(screen.getByDisplayValue('John')).toBeDefined()
    expect(screen.getByDisplayValue('Hello')).toBeDefined()
  })

  it('applies custom className', () => {
    const { container } = render(
      <FormBuilder fields={fields} values={{}} onChange={vi.fn()} className="my-form" />,
    )
    const root = container.querySelector('[data-component="form-builder"]')
    expect(root?.className).toContain('my-form')
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<FormBuilder fields={fields} values={{}} onChange={vi.fn()} ref={ref} />)
    expect(ref.current).not.toBeNull()
  })

  it('calls onChange with empty string when number input is cleared', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const numFields = [
      { id: 'age', label: 'Age', type: 'number' as const },
    ]
    render(<FormBuilder fields={numFields} values={{ age: 5 }} onChange={onChange} />)
    const input = screen.getByLabelText('Age')
    await user.clear(input)
    expect(onChange).toHaveBeenCalledWith('age', '')
  })
})
