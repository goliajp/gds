import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ChordDiagram } from '../chord-diagram'

const matrix = [
  [0, 10, 5],
  [10, 0, 8],
  [5, 8, 0],
]
const labels = ['Alpha', 'Beta', 'Gamma']

describe('ChordDiagram', () => {
  it('renders SVG', () => {
    const { container } = render(<ChordDiagram matrix={matrix} labels={labels} />)
    expect(container.querySelector('svg')).not.toBeNull()
  })

  it('shows labels', () => {
    const { container } = render(<ChordDiagram matrix={matrix} labels={labels} />)
    const texts = container.querySelectorAll('text')
    const textContents = Array.from(texts).map((t) => t.textContent)
    expect(textContents).toContain('Alpha')
    expect(textContents).toContain('Beta')
    expect(textContents).toContain('Gamma')
  })

  it('draws arcs for each entity', () => {
    const { container } = render(<ChordDiagram matrix={matrix} labels={labels} />)
    const arcs = container.querySelectorAll('[data-arc]')
    expect(arcs.length).toBe(3)
  })

  it('has data-component attribute', () => {
    const { container } = render(<ChordDiagram matrix={matrix} labels={labels} />)
    expect(container.querySelector('[data-component="chord-diagram"]')).not.toBeNull()
  })
})
