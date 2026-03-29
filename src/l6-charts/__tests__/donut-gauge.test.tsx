import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { DonutGauge } from '../donut-gauge'

const rings = [
  { label: 'CPU', max: 100, value: 72 },
  { label: 'Memory', max: 100, value: 85 },
]

describe('DonutGauge', () => {
  it('renders without crash', () => {
    const { container } = render(<DonutGauge rings={rings} />)
    expect(container.querySelector('[data-component="donut-gauge"]')).not.toBeNull()
  })

  it('renders circles for each ring (track + fill)', () => {
    const { container } = render(<DonutGauge rings={rings} />)
    const circles = container.querySelectorAll('circle')
    // 2 rings × 2 circles (track + fill) = 4
    expect(circles.length).toBe(4)
  })

  it('renders legend labels', () => {
    const { container } = render(<DonutGauge rings={rings} />)
    expect(container.textContent).toContain('CPU')
    expect(container.textContent).toContain('Memory')
    expect(container.textContent).toContain('72/100')
  })

  it('applies custom size', () => {
    const { container } = render(<DonutGauge rings={rings} size={200} />)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('width')).toBe('200')
  })
})
