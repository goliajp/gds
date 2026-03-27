import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { WaffleChart } from '../waffle-chart'

const data = [
  { label: 'A', value: 60 },
  { label: 'B', value: 30 },
  { label: 'C', value: 10 },
]

describe('WaffleChart', () => {
  it('renders 100 cells', () => {
    const { container } = render(<WaffleChart data={data} />)
    const rects = container.querySelectorAll('rect')
    expect(rects).toHaveLength(100)
  })

  it('colors cells based on data segments', () => {
    const { container } = render(<WaffleChart data={data} />)
    const rects = container.querySelectorAll('rect')
    // first 60 cells belong to segment A
    const firstCellFill = rects[0].getAttribute('fill')
    const cell59Fill = rects[59].getAttribute('fill')
    expect(firstCellFill).toBe(cell59Fill)
    // cell 60 belongs to segment B (different color)
    const cell60Fill = rects[60].getAttribute('fill')
    expect(cell60Fill).not.toBe(firstCellFill)
  })

  it('shows legend with labels', () => {
    const { container } = render(<WaffleChart data={data} />)
    expect(container.textContent).toContain('A')
    expect(container.textContent).toContain('B')
    expect(container.textContent).toContain('C')
  })

  it('has data-component attribute', () => {
    const { container } = render(<WaffleChart data={data} />)
    expect(container.querySelector('[data-component="waffle-chart"]')).not.toBeNull()
  })
})
