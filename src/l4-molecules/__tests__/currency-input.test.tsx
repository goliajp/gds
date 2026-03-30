import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { CurrencyInput } from '../currency-input'

describe('CurrencyInput', () => {
  it('renders with currency symbol', () => {
    render(<CurrencyInput value={1000} onChange={() => {}} currency="$" />)
    expect(screen.getByText('$')).toBeDefined()
  })

  it('formats number on blur', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<CurrencyInput value={null} onChange={onChange} />)

    const input = screen.getByLabelText('Currency amount')
    await user.click(input)
    await user.type(input, '1234567')
    await user.tab()

    expect(onChange).toHaveBeenCalledWith(1234567)
  })

  it('strips non-numeric characters during input', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<CurrencyInput value={null} onChange={onChange} />)

    const input = screen.getByLabelText('Currency amount')
    await user.click(input)
    await user.type(input, 'abc123def')
    await user.tab()

    expect(onChange).toHaveBeenCalledWith(123)
  })

  it('clamps to min and max', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<CurrencyInput value={null} onChange={onChange} min={0} max={100} />)

    const input = screen.getByLabelText('Currency amount')
    await user.click(input)
    await user.type(input, '999')
    await user.tab()

    expect(onChange).toHaveBeenCalledWith(100)
  })

  it('applies error state', () => {
    const { container } = render(
      <CurrencyInput value={0} onChange={() => {}} error />
    )
    expect(container.querySelector('[data-error]')).not.toBeNull()
  })
})
