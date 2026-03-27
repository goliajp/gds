import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { ChipGroup } from '../chip-group'

const options = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma' },
]

describe('ChipGroup', () => {
  it('renders all options', () => {
    const { container } = render(
      <ChipGroup options={options} value={[]} onChange={() => {}} />,
    )
    expect(container.querySelector('[data-component="chip-group"]')).not.toBeNull()
    expect(container.querySelectorAll('[data-component="chip"]')).toHaveLength(3)
  })

  it('toggles selection on click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const { getByText } = render(
      <ChipGroup options={options} value={['a']} onChange={onChange} />,
    )
    // click unselected chip
    await user.click(getByText('Beta'))
    expect(onChange).toHaveBeenCalledWith(['a', 'b'])
    // click selected chip to deselect
    onChange.mockClear()
    await user.click(getByText('Alpha'))
    expect(onChange).toHaveBeenCalledWith([])
  })

  it('exclusive mode allows only one selection', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const { getByText } = render(
      <ChipGroup options={options} value={['a']} onChange={onChange} exclusive />,
    )
    await user.click(getByText('Beta'))
    expect(onChange).toHaveBeenCalledWith(['b'])
  })

  it('sets data-component attribute', () => {
    const { container } = render(
      <ChipGroup options={options} value={[]} onChange={() => {}} />,
    )
    expect(container.querySelector('[data-component="chip-group"]')).not.toBeNull()
  })
})
