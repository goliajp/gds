import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { computeBins, Histogram } from '../histogram'

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

describe('Histogram', () => {
  it('renders without crash', () => {
    const { container } = render(<Histogram data={data} />)
    expect(container.firstChild).not.toBeNull()
  })

  it('computes bins correctly', () => {
    const bins = computeBins([1, 2, 3, 4, 5], 2)
    expect(bins.length).toBe(2)
    expect(bins[0].count + bins[1].count).toBe(5)
  })

  it('has data-component attribute', () => {
    const { container } = render(<Histogram data={data} />)
    expect(
      container.querySelector('[data-component="histogram"]')
    ).not.toBeNull()
  })

  it('applies glass class', () => {
    const { container } = render(<Histogram data={data} glass />)
    const el = container.querySelector('[data-component="histogram"]')
    expect(el?.className).toContain('backdrop-blur-md')
  })
})
