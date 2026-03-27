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
    expect(container.querySelector('[data-component="box-plot"]')).not.toBeNull()
  })

  it('applies glass class', () => {
    const { container } = render(<BoxPlot data={data} glass />)
    const el = container.querySelector('[data-component="box-plot"]')
    expect(el?.className).toContain('backdrop-blur-md')
  })
})
