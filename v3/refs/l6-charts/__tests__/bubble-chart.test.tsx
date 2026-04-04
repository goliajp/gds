import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { BubbleChart } from '../bubble-chart'

const data = [
  { x: 10, y: 20, z: 100 },
  { x: 30, y: 40, z: 200 },
]

describe('BubbleChart', () => {
  it('renders without crash', () => {
    const { container } = render(<BubbleChart data={data} />)
    expect(container.firstChild).not.toBeNull()
  })

  it('applies custom height via style', () => {
    const { container } = render(<BubbleChart data={data} height={400} />)
    const el = container.querySelector('[data-component="bubble-chart"]')
    expect(el).not.toBeNull()
  })

  it('applies glass mode', () => {
    const { container } = render(<BubbleChart data={data} glass />)
    const el = container.querySelector('[data-component="bubble-chart"]')
    expect(el?.className).toContain('backdrop-blur-md')
  })

  it('has data-component attribute', () => {
    const { container } = render(<BubbleChart data={data} />)
    expect(
      container.querySelector('[data-component="bubble-chart"]')
    ).not.toBeNull()
  })
})
