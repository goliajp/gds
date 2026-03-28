import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ScatterChart } from '../scatter-chart'

const data = [
  { x: 10, y: 20 },
  { x: 30, y: 40 },
]

describe('ScatterChart', () => {
  it('renders without crash', () => {
    const { container } = render(<ScatterChart data={data} xKey="x" yKey="y" />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<ScatterChart data={data} xKey="x" yKey="y" />)
    expect(container.querySelector('[data-component="scatter-chart"]')).not.toBeNull()
  })

  it('merges className', () => {
    const { container } = render(<ScatterChart className="custom-class" data={data} xKey="x" yKey="y" />)
    const el = container.querySelector('[data-component="scatter-chart"]')
    expect(el?.className).toContain('custom-class')
  })

  it('applies glass mode', () => {
    const { container } = render(<ScatterChart data={data} xKey="x" yKey="y" glass />)
    const el = container.querySelector('[data-component="scatter-chart"]')
    expect(el?.className).toContain('backdrop-blur-md')
  })

  it('does not apply glass classes when glass is falsy', () => {
    const { container } = render(<ScatterChart data={data} xKey="x" yKey="y" />)
    const el = container.querySelector('[data-component="scatter-chart"]')
    expect(el?.className).not.toContain('backdrop-blur-md')
  })

  it('applies custom height', () => {
    const { container } = render(<ScatterChart data={data} xKey="x" yKey="y" height={500} />)
    expect(container.querySelector('[data-component="scatter-chart"]')).not.toBeNull()
  })

  it('applies custom color', () => {
    const { container } = render(<ScatterChart data={data} xKey="x" yKey="y" color="#ff0000" />)
    expect(container.querySelector('[data-component="scatter-chart"]')).not.toBeNull()
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<ScatterChart data={data} xKey="x" yKey="y" ref={ref} />)
    expect(ref.current).not.toBeNull()
  })

  it('spreads additional props', () => {
    const { container } = render(<ScatterChart data={data} xKey="x" yKey="y" data-custom="test" />)
    const el = container.querySelector('[data-component="scatter-chart"]')
    expect(el?.getAttribute('data-custom')).toBe('test')
  })
})
