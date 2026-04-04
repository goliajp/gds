import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { StarRating } from '../star-rating'

describe('StarRating', () => {
  it('has data-component="star-rating"', () => {
    const { container } = render(<StarRating value={3} />)
    expect(
      container.querySelector('[data-component="star-rating"]')
    ).not.toBeNull()
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

  it('renders half stars correctly', () => {
    const { container } = render(<StarRating value={2.5} />)
    const svgs = container.querySelectorAll('svg')
    // 2 full, 1 half, 2 empty = 5 svgs
    expect(svgs.length).toBe(5)
    // half star has a clipPath defs
    const defsCount = container.querySelectorAll('defs').length
    expect(defsCount).toBe(1)
  })

  it('renders empty stars', () => {
    const { container } = render(<StarRating value={0} />)
    const svgs = container.querySelectorAll('svg')
    expect(svgs.length).toBe(5)
    // all empty stars have fill="none" on the svg element
    svgs.forEach((svg) => {
      expect(svg.getAttribute('fill')).toBe('none')
    })
  })

  it('renders with custom color', () => {
    const { container } = render(<StarRating value={3} color="red" />)
    const svgs = container.querySelectorAll('svg')
    // first star is full — svg has fill="red"
    expect(svgs[0]?.getAttribute('fill')).toBe('red')
  })

  it('renders with sm size', () => {
    const { container } = render(<StarRating value={1} size="sm" />)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('width')).toBe('14')
  })

  it('renders with lg size', () => {
    const { container } = render(<StarRating value={1} size="lg" />)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('width')).toBe('24')
  })
})
