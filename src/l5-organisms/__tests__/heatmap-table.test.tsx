import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { HeatmapTable } from '../heatmap-table'

const headers = ['Mon', 'Tue', 'Wed']
const rows = [
  { label: 'Week 1', values: [8, 6, 10] },
  { label: 'Week 2', values: [4, 9, 2] },
]

describe('HeatmapTable', () => {
  it('renders with data-component', () => {
    const { container } = render(<HeatmapTable headers={headers} rows={rows} />)
    expect(
      container.querySelector('[data-component="heatmap-table"]')
    ).not.toBeNull()
  })

  it('renders headers', () => {
    render(<HeatmapTable headers={headers} rows={rows} />)
    expect(screen.getByText('Mon')).toBeDefined()
    expect(screen.getByText('Tue')).toBeDefined()
    expect(screen.getByText('Wed')).toBeDefined()
  })

  it('renders row labels and values', () => {
    render(<HeatmapTable headers={headers} rows={rows} />)
    expect(screen.getByText('Week 1')).toBeDefined()
    expect(screen.getByText('Week 2')).toBeDefined()
    expect(screen.getByText('10')).toBeDefined()
  })

  it('uses custom maxValue', () => {
    const { container } = render(
      <HeatmapTable headers={headers} rows={rows} maxValue={20} />
    )
    expect(
      container.querySelector('[data-component="heatmap-table"]')
    ).not.toBeNull()
  })
})
