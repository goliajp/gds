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

  it('applies glass mode', () => {
    const { container } = render(<FunnelChart data={data} dataKey="value" glass />)
    const el = container.querySelector('[data-component="funnel-chart"]')
    expect(el?.className).toContain('backdrop-blur-md')
  })

  it('does not apply glass classes when glass is falsy', () => {
    const { container } = render(<FunnelChart data={data} dataKey="value" />)
    const el = container.querySelector('[data-component="funnel-chart"]')
    expect(el?.className).not.toContain('backdrop-blur-md')
  })

  it('applies custom height', () => {
    const { container } = render(<FunnelChart data={data} dataKey="value" height={500} />)
    expect(container.querySelector('[data-component="funnel-chart"]')).not.toBeNull()
  })

  it('applies custom colors', () => {
    const { container } = render(
      <FunnelChart data={data} dataKey="value" colors={['red', 'green', 'blue']} />,
    )
    expect(container.querySelector('[data-component="funnel-chart"]')).not.toBeNull()
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<FunnelChart data={data} dataKey="value" ref={ref} />)
    expect(ref.current).not.toBeNull()
  })

  it('spreads additional props', () => {
    const { container } = render(<FunnelChart data={data} dataKey="value" data-custom="test" />)
    const el = container.querySelector('[data-component="funnel-chart"]')
    expect(el?.getAttribute('data-custom')).toBe('test')
  })
})
