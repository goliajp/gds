import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AnalyticsDashboard } from '../analytics-dashboard'

describe('AnalyticsDashboard', () => {
  it('renders with data-component', () => {
    const { container } = render(<AnalyticsDashboard />)
    expect(
      container.querySelector('[data-component="analytics-dashboard"]')
    ).not.toBeNull()
  })

  it('renders metrics, charts, and data slots', () => {
    const { container } = render(
      <AnalyticsDashboard
        metrics={<div>Metrics Row</div>}
        charts={<div>Charts Area</div>}
        data={<div>Data Table</div>}
      />
    )
    expect(screen.getByText('Metrics Row')).toBeDefined()
    expect(screen.getByText('Charts Area')).toBeDefined()
    expect(screen.getByText('Data Table')).toBeDefined()
    expect(container.querySelector('[data-slot="metrics"]')).not.toBeNull()
    expect(container.querySelector('[data-slot="charts"]')).not.toBeNull()
    expect(container.querySelector('[data-slot="data"]')).not.toBeNull()
  })

  it('omits empty slots', () => {
    const { container } = render(
      <AnalyticsDashboard metrics={<div>Only Metrics</div>} />
    )
    expect(container.querySelector('[data-slot="metrics"]')).not.toBeNull()
    expect(container.querySelector('[data-slot="charts"]')).toBeNull()
    expect(container.querySelector('[data-slot="data"]')).toBeNull()
  })
})
