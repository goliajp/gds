import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { StockTicker } from '../stock-ticker'

const items = [
  { symbol: 'AAPL', price: 150, change: 2.5 },
  { symbol: 'GOOG', price: 2800, change: -1.2 },
]

describe('StockTicker', () => {
  it('renders without crash', () => {
    const { container } = render(<StockTicker items={items} />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<StockTicker items={items} />)
    expect(
      container.querySelector('[data-component="stock-ticker"]')
    ).not.toBeNull()
  })

  it('renders ticker symbols', () => {
    render(<StockTicker items={items} />)
    expect(screen.getAllByText('AAPL').length).toBeGreaterThan(0)
    expect(screen.getAllByText('GOOG').length).toBeGreaterThan(0)
  })

  it('applies custom className', () => {
    const { container } = render(
      <StockTicker className="custom" items={items} />
    )
    expect(
      container.querySelector('[data-component="stock-ticker"]')?.className
    ).toContain('custom')
  })
})
