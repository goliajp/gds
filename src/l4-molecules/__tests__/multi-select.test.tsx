import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { MultiSelect } from '../multi-select'

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
]

describe('MultiSelect', () => {
  it('renders placeholder when no value selected', () => {
    render(<MultiSelect options={options} value={[]} onChange={() => {}} placeholder="Pick fruits" />)
    expect(screen.getByText('Pick fruits')).toBeTruthy()
  })

  it('shows selected values as chips', () => {
    const { container } = render(
      <MultiSelect options={options} value={['apple', 'banana']} onChange={() => {}} />,
    )
    expect(container.querySelector('[data-component="multi-select"]')).not.toBeNull()
    expect(screen.getByText('Apple')).toBeTruthy()
    expect(screen.getByText('Banana')).toBeTruthy()
  })

  it('opens dropdown on click', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <MultiSelect options={options} value={[]} onChange={() => {}} />,
    )
    const trigger = container.querySelector('button')!
    await user.click(trigger)
    expect(container.querySelector('[data-state="open"]')).not.toBeNull()
    // all options visible
    expect(screen.getByText('Apple')).toBeTruthy()
    expect(screen.getByText('Cherry')).toBeTruthy()
  })

  it('toggles selection on option click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const { container } = render(
      <MultiSelect options={options} value={['apple']} onChange={onChange} />,
    )
    // open dropdown
    await user.click(container.querySelector('button')!)
    // click banana to add
    const bananaBtn = screen.getAllByText('Banana').find(
      (el) => el.closest('button[type="button"]') !== null,
    )
    await user.click(bananaBtn!)
    expect(onChange).toHaveBeenCalledWith(['apple', 'banana'])
  })

  it('filters options by search query', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <MultiSelect options={options} value={[]} onChange={() => {}} />,
    )
    await user.click(container.querySelector('button')!)
    const searchInput = container.querySelector('input[type="text"]')!
    await user.type(searchInput, 'cher')
    // only cherry should be visible
    expect(screen.getByText('Cherry')).toBeTruthy()
    expect(screen.queryByText('Apple')).toBeNull()
  })

  it('shows overflow count when exceeding maxDisplay', () => {
    render(
      <MultiSelect
        options={options}
        value={['apple', 'banana', 'cherry', 'date', 'elderberry']}
        onChange={() => {}}
        maxDisplay={2}
      />,
    )
    expect(screen.getByText('Apple')).toBeTruthy()
    expect(screen.getByText('Banana')).toBeTruthy()
    expect(screen.getByText('+3 more')).toBeTruthy()
  })
})
