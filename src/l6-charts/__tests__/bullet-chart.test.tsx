import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { BulletChart } from '../bullet-chart'

describe('BulletChart', () => {
  it('renders without crash', () => {
    const { container } = render(<BulletChart actual={75} max={100} target={80} />)
    expect(container.querySelector('[data-component="bullet-chart"]')).not.toBeNull()
  })

  it('renders label when provided', () => {
    const { container } = render(<BulletChart actual={50} label="Revenue" max={100} target={80} />)
    expect(container.textContent).toContain('Revenue')
  })

  it('renders svg with rects', () => {
    const { container } = render(<BulletChart actual={50} max={100} target={80} />)
    const rects = container.querySelectorAll('rect')
    // 3 range rects + 1 actual bar = 4
    expect(rects.length).toBe(4)
  })

  it('renders target marker line', () => {
    const { container } = render(<BulletChart actual={50} max={100} target={80} />)
    const lines = container.querySelectorAll('line')
    expect(lines.length).toBe(1)
  })
})
