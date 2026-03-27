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
})
