import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CalendarHeatmap } from '../calendar-heatmap'

const data = [
  { date: '2025-06-01', value: 3 },
  { date: '2025-06-15', value: 7 },
  { date: '2025-07-01', value: 1 },
  { date: '2025-12-25', value: 10 },
]

describe('CalendarHeatmap', () => {
  it('renders an SVG element', () => {
    const { container } = render(
      <CalendarHeatmap data={data} startDate="2025-01-01" endDate="2025-12-31" />,
    )
    const svg = container.querySelector('svg')
    expect(svg).not.toBeNull()
  })

  it('renders cells as rect elements', () => {
    const { container } = render(
      <CalendarHeatmap data={data} startDate="2025-06-01" endDate="2025-06-07" />,
    )
    const rects = container.querySelectorAll('rect')
    expect(rects.length).toBeGreaterThan(0)
  })

  it('renders month labels', () => {
    const { container } = render(
      <CalendarHeatmap data={data} startDate="2025-01-01" endDate="2025-12-31" />,
    )
    const texts = container.querySelectorAll('text')
    const labels = Array.from(texts).map((t) => t.textContent)
    expect(labels.some((l) => l === 'Jan')).toBe(true)
  })

  it('has data-component attribute', () => {
    const { container } = render(
      <CalendarHeatmap data={data} startDate="2025-01-01" endDate="2025-03-01" />,
    )
    expect(container.querySelector('[data-component="calendar-heatmap"]')).not.toBeNull()
  })
})
