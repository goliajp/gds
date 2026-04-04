import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { BoxPlot } from '../box-plot'

const data = [
  { label: 'Group A', values: [2, 4, 6, 8, 10, 12, 14] },
  { label: 'Group B', values: [1, 3, 5, 7, 9, 11] },
]

describe('BoxPlot', () => {
  it('renders SVG', () => {
    const { container } = render(<BoxPlot data={data} />)
    expect(container.querySelector('svg')).not.toBeNull()
  })

  it('shows boxes for each group', () => {
    const { container } = render(<BoxPlot data={data} />)
    const boxes = container.querySelectorAll('[data-box]')
    expect(boxes.length).toBe(2)
  })

  it('has data-component attribute', () => {
    const { container } = render(<BoxPlot data={data} />)
    expect(
      container.querySelector('[data-component="box-plot"]')
    ).not.toBeNull()
  })

  it('applies glass class', () => {
    const { container } = render(<BoxPlot data={data} glass />)
    const el = container.querySelector('[data-component="box-plot"]')
    expect(el?.className).toContain('backdrop-blur-md')
  })

  it('does not apply glass mode when glass is falsy', () => {
    const { container } = render(<BoxPlot data={data} />)
    const el = container.querySelector('[data-component="box-plot"]')
    expect(el?.className).not.toContain('backdrop-blur-md')
  })

  it('merges custom className', () => {
    const { container } = render(<BoxPlot data={data} className="my-box" />)
    const el = container.querySelector('[data-component="box-plot"]')
    expect(el?.className).toContain('my-box')
  })

  it('applies custom width and height', () => {
    const { container } = render(
      <BoxPlot data={data} width={500} height={400} />
    )
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('width')).toBe('500')
    expect(svg?.getAttribute('height')).toBe('400')
  })

  it('handles empty data array', () => {
    const { container } = render(<BoxPlot data={[]} />)
    const boxes = container.querySelectorAll('[data-box]')
    expect(boxes.length).toBe(0)
  })

  it('handles group with empty values', () => {
    const emptyGroup = [{ label: 'Empty', values: [] as number[] }]
    const { container } = render(<BoxPlot data={emptyGroup} />)
    // group with empty values returns null
    const boxes = container.querySelectorAll('[data-box]')
    expect(boxes.length).toBe(0)
  })

  it('handles single value in group', () => {
    const singleVal = [{ label: 'Single', values: [5] }]
    const { container } = render(<BoxPlot data={singleVal} />)
    const boxes = container.querySelectorAll('[data-box]')
    expect(boxes.length).toBe(1)
  })

  it('handles uniform values (all same)', () => {
    const uniform = [{ label: 'Uniform', values: [10, 10, 10, 10] }]
    const { container } = render(<BoxPlot data={uniform} />)
    const boxes = container.querySelectorAll('[data-box]')
    expect(boxes.length).toBe(1)
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<BoxPlot data={data} ref={ref} />)
    expect(ref.current).not.toBeNull()
    expect(ref.current?.getAttribute('data-component')).toBe('box-plot')
  })

  it('renders labels for each group', () => {
    const { container } = render(<BoxPlot data={data} />)
    const texts = container.querySelectorAll('text')
    const textContents = Array.from(texts).map((t) => t.textContent)
    expect(textContents).toContain('Group A')
    expect(textContents).toContain('Group B')
  })
})
