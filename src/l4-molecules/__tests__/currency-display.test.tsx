import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CurrencyDisplay } from '../currency-display'

describe('CurrencyDisplay', () => {
  it('renders with data-component', () => {
    const { container } = render(<CurrencyDisplay amount={100000} />)
    expect(container.querySelector('[data-component="currency-display"]')).not.toBeNull()
  })

  it('renders formatted amount with default currency', () => {
    render(<CurrencyDisplay amount={250000} />)
    expect(screen.getByText('\u00a5250,000')).toBeDefined()
  })

  it('renders change indicator and period', () => {
    render(<CurrencyDisplay amount={500000} change={12.5} period="vs last month" />)
    expect(screen.getByText('\u219112.5%')).toBeDefined()
    expect(screen.getByText('vs last month')).toBeDefined()
  })
})
