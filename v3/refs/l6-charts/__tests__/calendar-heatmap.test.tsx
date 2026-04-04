import { fireEvent, render } from '@testing-library/react'
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
      <CalendarHeatmap
        data={data}
        startDate="2025-01-01"
        endDate="2025-12-31"
      />
    )
    const svg = container.querySelector('svg')
    expect(svg).not.toBeNull()
  })

  it('renders cells as rect elements', () => {
    const { container } = render(
      <CalendarHeatmap
        data={data}
        startDate="2025-06-01"
        endDate="2025-06-07"
      />
    )
    const rects = container.querySelectorAll('rect')
    expect(rects.length).toBeGreaterThan(0)
  })

  it('renders month labels', () => {
    const { container } = render(
      <CalendarHeatmap
        data={data}
        startDate="2025-01-01"
        endDate="2025-12-31"
      />
    )
    const texts = container.querySelectorAll('text')
    const labels = Array.from(texts).map((t) => t.textContent)
    expect(labels.some((l) => l === 'Jan')).toBe(true)
  })

  it('has data-component attribute', () => {
    const { container } = render(
      <CalendarHeatmap
        data={data}
        startDate="2025-01-01"
        endDate="2025-03-01"
      />
    )
    expect(
      container.querySelector('[data-component="calendar-heatmap"]')
    ).not.toBeNull()
  })

  it('applies glass mode', () => {
    const { container } = render(
      <CalendarHeatmap
        data={data}
        startDate="2025-01-01"
        endDate="2025-03-01"
        glass
      />
    )
    const el = container.querySelector('[data-component="calendar-heatmap"]')
    expect(el?.className).toContain('rounded-lg')
  })

  it('does not apply glass mode when glass is falsy', () => {
    const { container } = render(
      <CalendarHeatmap
        data={data}
        startDate="2025-01-01"
        endDate="2025-03-01"
      />
    )
    const el = container.querySelector('[data-component="calendar-heatmap"]')
    expect(el?.className).not.toContain('rounded-lg')
  })

  it('merges custom className', () => {
    const { container } = render(
      <CalendarHeatmap
        data={data}
        startDate="2025-01-01"
        endDate="2025-03-01"
        className="my-heatmap"
      />
    )
    const el = container.querySelector('[data-component="calendar-heatmap"]')
    expect(el?.className).toContain('my-heatmap')
  })

  it('applies custom cellSize', () => {
    const { container } = render(
      <CalendarHeatmap
        data={data}
        startDate="2025-06-01"
        endDate="2025-06-07"
        cellSize={20}
      />
    )
    const rects = container.querySelectorAll('rect')
    expect(rects.length).toBeGreaterThan(0)
  })

  it('handles empty data array', () => {
    const { container } = render(
      <CalendarHeatmap data={[]} startDate="2025-01-01" endDate="2025-01-07" />
    )
    expect(
      container.querySelector('[data-component="calendar-heatmap"]')
    ).not.toBeNull()
  })

  it('renders custom colorScale', () => {
    const { container } = render(
      <CalendarHeatmap
        data={data}
        startDate="2025-06-01"
        endDate="2025-06-07"
        colorScale={['#000', '#111', '#222', '#333', '#fff']}
      />
    )
    const rects = container.querySelectorAll('rect')
    expect(rects.length).toBeGreaterThan(0)
  })

  it('renders without startDate and endDate (uses defaults)', () => {
    const { container } = render(<CalendarHeatmap data={data} />)
    expect(
      container.querySelector('[data-component="calendar-heatmap"]')
    ).not.toBeNull()
  })

  it('renders day labels', () => {
    const { container } = render(
      <CalendarHeatmap
        data={data}
        startDate="2025-01-01"
        endDate="2025-12-31"
      />
    )
    const texts = container.querySelectorAll('text')
    const labels = Array.from(texts).map((t) => t.textContent)
    // DAY_LABELS has Mon, Wed, Fri
    expect(labels.some((l) => l === 'Mon')).toBe(true)
  })

  it('shows tooltip on mouse enter and hides on mouse leave', () => {
    const { container } = render(
      <CalendarHeatmap
        data={data}
        startDate="2025-06-01"
        endDate="2025-06-30"
      />
    )
    const rects = container.querySelectorAll('rect')
    expect(rects.length).toBeGreaterThan(0)

    // mouse enter on a rect
    fireEvent.mouseEnter(rects[0])
    // tooltip should appear
    const tooltip = container.querySelector('.pointer-events-none.fixed')
    expect(tooltip).not.toBeNull()

    // mouse leave
    fireEvent.mouseLeave(rects[0])
    // tooltip should disappear
    const tooltipAfter = container.querySelector('.pointer-events-none.fixed')
    expect(tooltipAfter).toBeNull()
  })

  it('forwards ref to SVG element', () => {
    const ref = { current: null as SVGSVGElement | null }
    render(
      <CalendarHeatmap
        data={data}
        startDate="2025-01-01"
        endDate="2025-03-01"
        ref={ref}
      />
    )
    expect(ref.current).not.toBeNull()
    expect(ref.current?.tagName).toBe('svg')
  })
})
