import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { DateRangeInput } from '../date-range-input'

describe('DateRangeInput', () => {
  it('renders both date inputs', () => {
    render(
      <DateRangeInput startDate={null} endDate={null} onChange={() => {}} />
    )
    const inputs = screen.getAllByDisplayValue('')
    expect(inputs.length).toBe(2)
  })

  it('calls onChange when start date changes', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <DateRangeInput
        startDate={null}
        endDate="2026-12-31"
        onChange={onChange}
      />
    )

    const startInput = screen.getByLabelText('Start date')
    await user.clear(startInput)
    await user.type(startInput, '2026-01-01')

    expect(onChange).toHaveBeenCalledWith('2026-01-01', '2026-12-31')
  })

  it('calls onChange when end date changes', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <DateRangeInput
        startDate="2026-01-01"
        endDate={null}
        onChange={onChange}
      />
    )

    const endInput = screen.getByLabelText('End date')
    await user.clear(endInput)
    await user.type(endInput, '2026-12-31')

    expect(onChange).toHaveBeenCalledWith('2026-01-01', '2026-12-31')
  })

  it('applies error state', () => {
    const { container } = render(
      <DateRangeInput
        startDate={null}
        endDate={null}
        onChange={() => {}}
        error
      />
    )
    expect(container.querySelector('[data-error]')).not.toBeNull()
  })

  it('applies disabled state', () => {
    render(
      <DateRangeInput
        startDate={null}
        endDate={null}
        onChange={() => {}}
        disabled
      />
    )
    const inputs = screen.getAllByDisplayValue('')
    for (const input of inputs) {
      expect(input).toHaveAttribute('disabled')
    }
  })
})
