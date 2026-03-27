import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FunnelChart } from '../funnel-chart'

const data = [
  { name: 'Visit', value: 1000 },
  { name: 'Cart', value: 500 },
  { name: 'Buy', value: 200 },
]

describe('FunnelChart', () => {
  it('renders without crash', () => {
    const { container } = render(<FunnelChart data={data} dataKey="value" />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<FunnelChart data={data} dataKey="value" />)
    expect(container.querySelector('[data-component="funnel-chart"]')).not.toBeNull()
  })

  it('merges className', () => {
    const { container } = render(<FunnelChart className="custom-class" data={data} dataKey="value" />)
    const el = container.querySelector('[data-component="funnel-chart"]')
    expect(el?.className).toContain('custom-class')
  })
})
