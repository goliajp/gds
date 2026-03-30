import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SystemHealth } from '../system-health'

const metrics = [
  { label: 'CPU', value: 45, max: 100, unit: '%' },
  { label: 'Memory', value: 12, max: 16, unit: 'GB' },
  { label: 'Disk', value: 180, max: 500, unit: 'GB' },
]

describe('SystemHealth', () => {
  it('renders data-component attribute', () => {
    const { container } = render(<SystemHealth metrics={metrics} />)
    expect(
      container.querySelector('[data-component="system-health"]')
    ).not.toBeNull()
  })

  it('renders all metric labels', () => {
    render(<SystemHealth metrics={metrics} />)
    expect(screen.getByText('CPU')).toBeDefined()
    expect(screen.getByText('Memory')).toBeDefined()
    expect(screen.getByText('Disk')).toBeDefined()
  })

  it('renders progress bars', () => {
    const { container } = render(<SystemHealth metrics={metrics} />)
    const bars = container.querySelectorAll('[role="progressbar"]')
    expect(bars.length).toBe(3)
  })

  it('defaults max to 100 when not provided', () => {
    render(<SystemHealth metrics={[{ label: 'Load', value: 75 }]} />)
    expect(screen.getByText('Load')).toBeDefined()
    expect(screen.getByText('75 / 100 (75%)')).toBeDefined()
  })
})
