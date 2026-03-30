import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CurrencyDisplay } from '../currency-display'

describe('CurrencyDisplay', () => {
  it('renders with data-component', () => {
    const { container } = render(<CurrencyDisplay amount={100000} />)
    expect(
      container.querySelector('[data-component="currency-display"]')
    ).not.toBeNull()
  })

  it('renders formatted amount with default currency', () => {
    render(<CurrencyDisplay amount={250000} />)
    expect(screen.getByText('\u00a5250,000')).toBeDefined()
  })

  it('renders change indicator and period', () => {
    render(
      <CurrencyDisplay amount={500000} change={12.5} period="vs last month" />
    )
    expect(screen.getByText('\u219112.5%')).toBeDefined()
    expect(screen.getByText('vs last month')).toBeDefined()
  })

  it('renders negative change with down arrow', () => {
    render(<CurrencyDisplay amount={100000} change={-5.2} />)
    expect(screen.getByText('\u21935.2%')).toBeDefined()
  })

  it('renders positive change with up arrow and success color', () => {
    const { container } = render(
      <CurrencyDisplay amount={100000} change={10} />
    )
    const changeEl = container.querySelector('.text-success')
    expect(changeEl).not.toBeNull()
  })

  it('renders negative change with danger color', () => {
    const { container } = render(
      <CurrencyDisplay amount={100000} change={-3} />
    )
    const changeEl = container.querySelector('.text-danger')
    expect(changeEl).not.toBeNull()
  })

  it('does not render change when not provided', () => {
    const { container } = render(<CurrencyDisplay amount={100000} />)
    expect(container.querySelector('.text-success')).toBeNull()
    expect(container.querySelector('.text-danger')).toBeNull()
  })

  it('does not render period when not provided', () => {
    render(<CurrencyDisplay amount={100000} />)
    expect(screen.queryByText('vs last month')).toBeNull()
  })

  it('uses custom currency symbol', () => {
    render(<CurrencyDisplay amount={1000} currency="$" />)
    expect(screen.getByText('$1,000')).toBeDefined()
  })

  it('renders zero change as positive', () => {
    render(<CurrencyDisplay amount={100} change={0} />)
    expect(screen.getByText('\u21910%')).toBeDefined()
  })
})
