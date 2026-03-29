import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FlameChart } from '../flame-chart'

const sampleData = {
  name: 'root',
  value: 100,
  children: [
    { name: 'a', value: 60, children: [{ name: 'a1', value: 30 }, { name: 'a2', value: 30 }] },
    { name: 'b', value: 40 },
  ],
}

describe('FlameChart', () => {
  it('renders without crash', () => {
    const { container } = render(<FlameChart data={sampleData} />)
    expect(container.querySelector('[data-component="flame-chart"]')).not.toBeNull()
  })

  it('renders bars for each node', () => {
    const { container } = render(<FlameChart data={sampleData} />)
    const rects = container.querySelectorAll('rect')
    // root + a + a1 + a2 + b = 5
    expect(rects.length).toBe(5)
  })

  it('renders text labels for wide bars', () => {
    const { container } = render(<FlameChart data={sampleData} />)
    const texts = container.querySelectorAll('text')
    expect(texts.length).toBeGreaterThan(0)
  })
})
