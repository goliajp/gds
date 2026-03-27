import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { StarRating } from '../star-rating'

describe('StarRating', () => {
  it('has data-component="star-rating"', () => {
    const { container } = render(<StarRating value={3} />)
    expect(container.querySelector('[data-component="star-rating"]')).not.toBeNull()
  })

  it('renders 5 stars by default', () => {
    const { container } = render(<StarRating value={3} />)
    const svgs = container.querySelectorAll('svg')
    expect(svgs.length).toBe(5)
  })

  it('renders custom max stars', () => {
    const { container } = render(<StarRating value={2} max={10} />)
    const svgs = container.querySelectorAll('svg')
    expect(svgs.length).toBe(10)
  })

  it('sets aria-label with value and max', () => {
    const { container } = render(<StarRating value={3.5} max={5} />)
    const el = container.querySelector('[data-component="star-rating"]')
    expect(el?.getAttribute('aria-label')).toBe('3.5 out of 5 stars')
  })
})
