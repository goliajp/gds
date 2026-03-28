import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ProgressCircle } from '../progress-circle'

describe('ProgressCircle', () => {
  it('renders SVG with data-component', () => {
    const { container } = render(<ProgressCircle value={50} />)
    expect(container.querySelector('svg[data-component="progress-circle"]')).not.toBeNull()
  })

  it('shows percentage value text', () => {
    render(<ProgressCircle value={75} />)
    expect(screen.getByText('75%')).toBeDefined()
  })

  it('computes correct stroke-dashoffset', () => {
    const size = 64
    const strokeWidth = 4
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const expectedOffset = circumference * (1 - 40 / 100)

    const { container } = render(<ProgressCircle value={40} />)
    const circles = container.querySelectorAll('circle')
    const foreground = circles[1]
    expect(Number(foreground?.getAttribute('stroke-dashoffset'))).toBeCloseTo(expectedOffset, 1)
  })

  it('applies variant color class', () => {
    const { container } = render(<ProgressCircle value={50} variant="danger" />)
    const circles = container.querySelectorAll('circle')
    const foreground = circles[1]
    expect(foreground?.getAttribute('class')).toContain('stroke-danger')
  })

  it('hides value text when showValue is false', () => {
    const { container } = render(<ProgressCircle value={75} showValue={false} />)
    expect(container.querySelector('text')).toBeNull()
  })

  it('clamps value above 100', () => {
    render(<ProgressCircle value={150} />)
    expect(screen.getByText('100%')).toBeDefined()
  })

  it('clamps value below 0', () => {
    render(<ProgressCircle value={-10} />)
    expect(screen.getByText('0%')).toBeDefined()
  })

  it('applies all variant colors', () => {
    for (const v of ['success', 'warning'] as const) {
      const { container } = render(<ProgressCircle value={50} variant={v} />)
      const circles = container.querySelectorAll('circle')
      expect(circles[1]?.getAttribute('class')).toContain(`stroke-${v}`)
    }
  })
})
