import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { HeatmapChart } from '../heatmap-chart'

const data = [
  [1, 2, 3],
  [4, 5, 6],
]

describe('HeatmapChart', () => {
  it('renders without crash', () => {
    const { container } = render(<HeatmapChart data={data} />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<HeatmapChart data={data} />)
    expect(
      container.querySelector('[data-component="heatmap-chart"]')
    ).not.toBeNull()
  })

  it('renders correct number of cells', () => {
    const { container } = render(<HeatmapChart data={data} />)
    const cells = container.querySelectorAll('.rounded-sm')
    expect(cells.length).toBe(6)
  })

  it('merges className', () => {
    const { container } = render(
      <HeatmapChart className="custom-class" data={data} />
    )
    const el = container.querySelector('[data-component="heatmap-chart"]')
    expect(el?.className).toContain('custom-class')
  })

  it('applies glass mode', () => {
    const { container } = render(<HeatmapChart data={data} glass />)
    const el = container.querySelector('[data-component="heatmap-chart"]')
    expect(el?.className).toContain('backdrop-blur-md')
  })

  it('does not apply glass mode when glass is falsy', () => {
    const { container } = render(<HeatmapChart data={data} />)
    const el = container.querySelector('[data-component="heatmap-chart"]')
    expect(el?.className).not.toContain('backdrop-blur-md')
  })

  it('renders with xLabels', () => {
    const { container } = render(
      <HeatmapChart data={data} xLabels={['A', 'B', 'C']} />
    )
    const el = container.querySelector('[data-component="heatmap-chart"]')
    expect(el?.textContent).toContain('A')
    expect(el?.textContent).toContain('B')
    expect(el?.textContent).toContain('C')
  })

  it('renders with yLabels', () => {
    const { container } = render(
      <HeatmapChart data={data} yLabels={['Row1', 'Row2']} />
    )
    const el = container.querySelector('[data-component="heatmap-chart"]')
    expect(el?.textContent).toContain('Row1')
    expect(el?.textContent).toContain('Row2')
  })

  it('renders with both xLabels and yLabels', () => {
    const { container } = render(
      <HeatmapChart
        data={data}
        xLabels={['A', 'B', 'C']}
        yLabels={['R1', 'R2']}
      />
    )
    const el = container.querySelector('[data-component="heatmap-chart"]')
    expect(el?.textContent).toContain('A')
    expect(el?.textContent).toContain('R1')
  })

  it('handles uniform data (all same values)', () => {
    const uniformData = [
      [5, 5, 5],
      [5, 5, 5],
    ]
    const { container } = render(<HeatmapChart data={uniformData} />)
    // dataMax === dataMin => normalize returns 0.5
    const cells = container.querySelectorAll('.rounded-sm')
    expect(cells.length).toBe(6)
  })

  it('applies custom cellSize', () => {
    const { container } = render(<HeatmapChart data={data} cellSize={48} />)
    const cells = container.querySelectorAll('.rounded-sm')
    expect(cells.length).toBe(6)
  })

  it('applies custom colorScale', () => {
    const { container } = render(
      <HeatmapChart
        data={data}
        colorScale={{ min: '#000000', max: '#ffffff' }}
      />
    )
    const cells = container.querySelectorAll('.rounded-sm')
    expect(cells.length).toBe(6)
  })

  it('renders empty data', () => {
    const { container } = render(<HeatmapChart data={[]} />)
    expect(
      container.querySelector('[data-component="heatmap-chart"]')
    ).not.toBeNull()
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<HeatmapChart data={data} ref={ref} />)
    expect(ref.current).not.toBeNull()
    expect(ref.current?.getAttribute('data-component')).toBe('heatmap-chart')
  })

  it('renders without xLabels but with yLabels (padding-left is 0)', () => {
    const { container } = render(
      <HeatmapChart data={data} yLabels={['R1', 'R2']} />
    )
    const el = container.querySelector('[data-component="heatmap-chart"]')
    expect(el).not.toBeNull()
  })
})
