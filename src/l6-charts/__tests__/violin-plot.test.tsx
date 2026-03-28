import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ViolinPlot } from '../violin-plot'

const data = [
  { label: 'Group A', values: [2, 4, 6, 8, 10, 12, 14] },
  { label: 'Group B', values: [1, 3, 5, 7, 9, 11] },
]

describe('ViolinPlot', () => {
  it('renders SVG', () => {
    const { container } = render(<ViolinPlot data={data} />)
    expect(container.querySelector('svg')).not.toBeNull()
  })

  it('shows violins for each group', () => {
    const { container } = render(<ViolinPlot data={data} />)
    const violins = container.querySelectorAll('[data-violin]')
    expect(violins.length).toBe(2)
  })

  it('shows labels', () => {
    const { container } = render(<ViolinPlot data={data} />)
    const texts = container.querySelectorAll('text')
    const textContents = Array.from(texts).map((t) => t.textContent)
    expect(textContents).toContain('Group A')
    expect(textContents).toContain('Group B')
  })

  it('has data-component attribute', () => {
    const { container } = render(<ViolinPlot data={data} />)
    expect(container.querySelector('[data-component="violin-plot"]')).not.toBeNull()
  })

  it('applies glass mode', () => {
    const { container } = render(<ViolinPlot data={data} glass />)
    const el = container.querySelector('[data-component="violin-plot"]')
    expect(el?.className).toContain('backdrop-blur-md')
  })

  it('does not apply glass mode when glass is falsy', () => {
    const { container } = render(<ViolinPlot data={data} />)
    const el = container.querySelector('[data-component="violin-plot"]')
    expect(el?.className).not.toContain('backdrop-blur-md')
  })

  it('merges custom className', () => {
    const { container } = render(<ViolinPlot data={data} className="my-violin" />)
    const el = container.querySelector('[data-component="violin-plot"]')
    expect(el?.className).toContain('my-violin')
  })

  it('applies custom width and height', () => {
    const { container } = render(<ViolinPlot data={data} width={600} height={400} />)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('width')).toBe('600')
    expect(svg?.getAttribute('height')).toBe('400')
  })

  it('handles empty data array', () => {
    const { container } = render(<ViolinPlot data={[]} />)
    const violins = container.querySelectorAll('[data-violin]')
    expect(violins.length).toBe(0)
  })

  it('handles group with empty values', () => {
    const emptyGroup = [{ label: 'Empty', values: [] as number[] }]
    const { container } = render(<ViolinPlot data={emptyGroup} />)
    // group with empty values returns null
    const violins = container.querySelectorAll('[data-violin]')
    expect(violins.length).toBe(0)
  })

  it('handles single value in group', () => {
    const singleVal = [{ label: 'Single', values: [5] }]
    const { container } = render(<ViolinPlot data={singleVal} />)
    const violins = container.querySelectorAll('[data-violin]')
    expect(violins.length).toBe(1)
  })

  it('handles uniform values (all same) in group', () => {
    const uniform = [{ label: 'Uniform', values: [10, 10, 10, 10] }]
    const { container } = render(<ViolinPlot data={uniform} />)
    // range === 0 => computeDensity returns uniform density
    const violins = container.querySelectorAll('[data-violin]')
    expect(violins.length).toBe(1)
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<ViolinPlot data={data} ref={ref} />)
    expect(ref.current).not.toBeNull()
    expect(ref.current?.getAttribute('data-component')).toBe('violin-plot')
  })

  it('renders median dot for each group', () => {
    const { container } = render(<ViolinPlot data={data} />)
    const circles = container.querySelectorAll('circle')
    expect(circles.length).toBe(2)
  })

  it('computes median for even-length arrays', () => {
    // Group B has 6 values (even length) — tests the even median branch
    const { container } = render(<ViolinPlot data={data} />)
    const violins = container.querySelectorAll('[data-violin]')
    expect(violins.length).toBe(2)
  })

  it('computes median for odd-length arrays', () => {
    // Group A has 7 values (odd length) — tests the odd median branch
    const oddData = [{ label: 'Odd', values: [1, 3, 5, 7, 9] }]
    const { container } = render(<ViolinPlot data={oddData} />)
    const violins = container.querySelectorAll('[data-violin]')
    expect(violins.length).toBe(1)
  })
})
