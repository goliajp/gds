import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ProgressRing } from '../progress-ring'

describe('ProgressRing', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<ProgressRing value={50} />)
    expect(container.querySelector('[data-component="progress-ring"]')).not.toBeNull()
  })

  it('has progressbar role with aria attributes', () => {
    render(<ProgressRing value={75} />)
    const el = screen.getByRole('progressbar')
    expect(el.getAttribute('aria-valuenow')).toBe('75')
    expect(el.getAttribute('aria-valuemin')).toBe('0')
    expect(el.getAttribute('aria-valuemax')).toBe('100')
  })

  it('clamps value below 0 to 0', () => {
    render(<ProgressRing value={-10} />)
    const el = screen.getByRole('progressbar')
    expect(el.getAttribute('aria-valuenow')).toBe('0')
    expect(screen.getByText('0%')).toBeDefined()
  })

  it('clamps value above 100 to 100', () => {
    render(<ProgressRing value={200} />)
    const el = screen.getByRole('progressbar')
    expect(el.getAttribute('aria-valuenow')).toBe('100')
    expect(screen.getByText('100%')).toBeDefined()
  })

  it('displays clamped percentage text', () => {
    render(<ProgressRing value={42} />)
    expect(screen.getByText('42%')).toBeDefined()
  })

  it('uses default size=48 and strokeWidth=4', () => {
    const { container } = render(<ProgressRing value={50} />)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('width')).toBe('48')
    expect(svg?.getAttribute('height')).toBe('48')
    const circles = container.querySelectorAll('circle')
    expect(circles[0]?.getAttribute('stroke-width')).toBe('4')
  })

  it('accepts custom size and strokeWidth', () => {
    const { container } = render(<ProgressRing value={50} size={100} strokeWidth={8} />)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('width')).toBe('100')
    expect(svg?.getAttribute('height')).toBe('100')
    const circle = container.querySelectorAll('circle')[0]
    expect(circle?.getAttribute('stroke-width')).toBe('8')
    expect(circle?.getAttribute('r')).toBe('46')
  })

  it('computes correct stroke-dashoffset for foreground circle', () => {
    const size = 48
    const strokeWidth = 4
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const expectedOffset = circumference * (1 - 60 / 100)

    const { container } = render(<ProgressRing value={60} />)
    const foreground = container.querySelectorAll('circle')[1]
    expect(Number(foreground?.getAttribute('stroke-dashoffset'))).toBeCloseTo(expectedOffset, 1)
  })

  it('applies custom className', () => {
    const { container } = render(<ProgressRing value={50} className="custom-class" />)
    const el = container.querySelector('[data-component="progress-ring"]')
    expect(el?.className).toContain('custom-class')
  })

  it('forwards additional props', () => {
    const { container } = render(<ProgressRing value={50} data-testid="ring" />)
    expect(container.querySelector('[data-testid="ring"]')).not.toBeNull()
  })

  it('sets font-size based on size prop', () => {
    const { container } = render(<ProgressRing value={50} size={100} />)
    const span = container.querySelector('span')
    expect(span?.style.fontSize).toBe(`${100 * 0.22}px`)
  })
})
