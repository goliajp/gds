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
})
