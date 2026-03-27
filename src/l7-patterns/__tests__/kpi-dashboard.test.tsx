import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { KPIDashboard } from '../kpi-dashboard'

describe('KPIDashboard', () => {
  it('renders title', () => {
    render(<KPIDashboard title="Overview" />)
    expect(screen.getByText('Overview')).toBeDefined()
  })

  it('renders metric cards', () => {
    const metrics = [
      { title: 'Revenue', value: '$10k' },
      { title: 'Users', value: '500', change: 12 },
    ]
    render(<KPIDashboard metrics={metrics} />)
    expect(screen.getByText('Revenue')).toBeDefined()
    expect(screen.getByText('$10k')).toBeDefined()
    expect(screen.getByText('Users')).toBeDefined()
  })

  it('renders chart slot', () => {
    render(<KPIDashboard chart={<div>Chart Area</div>} />)
    expect(screen.getByText('Chart Area')).toBeDefined()
  })

  it('renders table slot', () => {
    render(<KPIDashboard table={<div>Table Area</div>} />)
    expect(screen.getByText('Table Area')).toBeDefined()
  })
})
