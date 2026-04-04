import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { CheckboxGroup } from '../checkbox-group'

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
]

describe('CheckboxGroup', () => {
  it('renders all options as checkboxes', () => {
    render(<CheckboxGroup options={options} value={[]} onChange={vi.fn()} />)
    expect(screen.getAllByRole('checkbox')).toHaveLength(3)
    expect(screen.getByText('Apple')).toBeDefined()
    expect(screen.getByText('Banana')).toBeDefined()
  })

  it('calls onChange with added value when unchecked item clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <CheckboxGroup options={options} value={['apple']} onChange={onChange} />
    )
    await user.click(screen.getByText('Banana'))
    expect(onChange).toHaveBeenCalledWith(['apple', 'banana'])
  })

  it('calls onChange with removed value when checked item clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <CheckboxGroup
        options={options}
        value={['apple', 'banana']}
        onChange={onChange}
      />
    )
    await user.click(screen.getByText('Apple'))
    expect(onChange).toHaveBeenCalledWith(['banana'])
  })

  it('renders select-all checkbox when selectAll is true', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <CheckboxGroup
        options={options}
        value={[]}
        onChange={onChange}
        selectAll
      />
    )
    expect(screen.getByText('Select all')).toBeDefined()
    await user.click(screen.getByText('Select all'))
    expect(onChange).toHaveBeenCalledWith(['apple', 'banana', 'cherry'])
  })
})
