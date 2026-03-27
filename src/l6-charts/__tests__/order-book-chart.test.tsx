import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { OrderBookChart } from '../order-book-chart'

const bids = [
  { price: 100, depth: 50 },
  { price: 99, depth: 120 },
  { price: 98, depth: 200 },
]
const asks = [
  { price: 101, depth: 40 },
  { price: 102, depth: 100 },
  { price: 103, depth: 180 },
]

describe('OrderBookChart', () => {
  it('renders without crash', () => {
    const { container } = render(<OrderBookChart bids={bids} asks={asks} />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<OrderBookChart bids={bids} asks={asks} />)
    expect(container.querySelector('[data-component="order-book-chart"]')).not.toBeNull()
  })

  it('respects height prop', () => {
    const { container } = render(<OrderBookChart bids={bids} asks={asks} height={400} />)
    const rc = container.querySelector('.recharts-responsive-container')
    expect(rc?.getAttribute('style')).toContain('400')
  })

  it('applies glass class', () => {
    const { container } = render(<OrderBookChart bids={bids} asks={asks} glass />)
    const el = container.querySelector('[data-component="order-book-chart"]')
    expect(el?.className).toContain('backdrop-blur-md')
  })
})
