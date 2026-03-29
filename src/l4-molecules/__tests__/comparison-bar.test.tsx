import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ComparisonBar } from '../comparison-bar'

const segments = [
  { label: 'A', value: 60, color: 'var(--gds-palette-0)' },
  { label: 'B', value: 40, color: 'var(--gds-palette-1)' },
]

describe('ComparisonBar', () => {
  it('renders without crash', () => {
    const { container } = render(<ComparisonBar segments={segments} />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<ComparisonBar segments={segments} />)
    expect(container.querySelector('[data-component="comparison-bar"]')).not.toBeNull()
  })

  it('renders SVG with rect segments', () => {
    const { container } = render(<ComparisonBar segments={segments} />)
    const rects = container.querySelectorAll('rect')
    expect(rects.length).toBe(2)
  })

  it('returns null when total is zero', () => {
    const { container } = render(<ComparisonBar segments={[{ label: 'X', value: 0, color: 'red' }]} />)
    expect(container.querySelector('[data-component="comparison-bar"]')).toBeNull()
  })
})
