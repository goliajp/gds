import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { WaterfallChart } from '../waterfall-chart'

describe('WaterfallChart', () => {
  it('renders without crash', () => {
    const { container } = render(<WaterfallChart data={[{ label: 'A', value: 100 }]} />)
    expect(container.querySelector('[data-component="waterfall-chart"]')).not.toBeNull()
  })

  it('renders bars for data items plus total', () => {
    const data = [{ label: 'Revenue', value: 200 }, { label: 'Cost', value: -80 }]
    const { container } = render(<WaterfallChart data={data} />)
    // 2 data + 1 total = 3 rects
    const rects = container.querySelectorAll('rect')
    expect(rects.length).toBe(3)
  })

  it('renders empty when no data', () => {
    const { container } = render(<WaterfallChart data={[]} />)
    expect(container.querySelectorAll('rect').length).toBe(0)
  })
})
