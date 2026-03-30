import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Select } from '../select'

describe('Select', () => {
  it('renders without crash', () => {
    const { container } = render(
      <Select>
        <option value="a">A</option>
        <option value="b">B</option>
      </Select>
    )
    expect(container.querySelector('[data-component="select"]')).not.toBeNull()
  })

  it('renders a native select element', () => {
    const { container } = render(
      <Select>
        <option value="a">A</option>
      </Select>
    )
    expect(container.querySelector('select')).not.toBeNull()
  })

  it('applies error variant class', () => {
    const { container } = render(
      <Select error={true}>
        <option value="a">A</option>
      </Select>
    )
    const select = container.querySelector('select')
    expect(select?.className).toContain('border-danger')
  })

  it('applies sm size variant class', () => {
    const { container } = render(
      <Select inputSize="sm">
        <option value="a">A</option>
      </Select>
    )
    const select = container.querySelector('select')
    expect(select?.className).toContain('gds-h-sm')
  })

  it('fires onChange', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const { container } = render(
      <Select onChange={onChange}>
        <option value="a">A</option>
        <option value="b">B</option>
      </Select>
    )
    const select = container.querySelector('select')!
    await user.selectOptions(select, 'b')
    expect(onChange).toHaveBeenCalled()
  })
})
