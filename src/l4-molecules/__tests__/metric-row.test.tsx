import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { MetricRow } from '../metric-row'

const metrics = [
  { label: 'CPU', value: '12%' },
  { label: 'MEM', value: '45%' },
  { label: 'DISK', value: '72%', variant: 'warning' as const },
]

describe('MetricRow', () => {
  it('renders metric labels and values', () => {
    render(<MetricRow metrics={metrics} />)
    expect(screen.getByText('CPU')).toBeDefined()
    expect(screen.getByText('12%')).toBeDefined()
    expect(screen.getByText('MEM')).toBeDefined()
  })

  it('renders data-component attribute', () => {
    const { container } = render(<MetricRow metrics={metrics} />)
    expect(container.querySelector('[data-component="metric-row"]')).not.toBeNull()
  })

  it('applies variant color classes', () => {
    const { container } = render(<MetricRow metrics={[{ label: 'ERR', value: 5, variant: 'danger' }]} />)
    const valueEl = container.querySelector('.text-danger')
    expect(valueEl).not.toBeNull()
  })
})
