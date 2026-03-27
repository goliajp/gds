import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { PropertyEditor } from '../property-editor'

const properties = [
  { key: 'Name', value: 'Alice', editable: true },
  { key: 'Email', value: 'alice@test.com', editable: true },
  { key: 'Role', value: 'Admin' },
]

describe('PropertyEditor', () => {
  it('renders all property keys and values', () => {
    render(<PropertyEditor properties={properties} />)
    expect(screen.getByText('Name')).toBeDefined()
    expect(screen.getByText('Alice')).toBeDefined()
    expect(screen.getByText('Role')).toBeDefined()
    expect(screen.getByText('Admin')).toBeDefined()
  })

  it('has data-component attribute', () => {
    const { container } = render(<PropertyEditor properties={properties} />)
    expect(container.querySelector('[data-component="property-editor"]')).not.toBeNull()
  })

  it('shows inline edit for editable properties', () => {
    const { container } = render(<PropertyEditor properties={properties} onChange={vi.fn()} />)
    expect(container.querySelectorAll('[data-component="inline-edit"]')).toHaveLength(2)
  })

  it('calls onChange when editable property is saved', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<PropertyEditor properties={properties} onChange={onChange} />)
    // click Alice text to start editing
    await user.click(screen.getByText('Alice'))
    const input = screen.getByDisplayValue('Alice')
    await user.clear(input)
    await user.type(input, 'Bob')
    await user.click(screen.getByLabelText('Save'))
    expect(onChange).toHaveBeenCalledWith('Name', 'Bob')
  })
})
