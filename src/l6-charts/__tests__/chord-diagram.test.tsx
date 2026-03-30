import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ChordDiagram } from '../chord-diagram'
import { arcPath, computeArcs, computeChords } from '../chord-math'

const matrix = [
  [0, 10, 5],
  [10, 0, 8],
  [5, 8, 0],
]
const labels = ['Alpha', 'Beta', 'Gamma']

describe('ChordDiagram', () => {
  it('renders SVG', () => {
    const { container } = render(
      <ChordDiagram matrix={matrix} labels={labels} />
    )
    expect(container.querySelector('svg')).not.toBeNull()
  })

  it('shows labels', () => {
    const { container } = render(
      <ChordDiagram matrix={matrix} labels={labels} />
    )
    const texts = container.querySelectorAll('text')
    const textContents = Array.from(texts).map((t) => t.textContent)
    expect(textContents).toContain('Alpha')
    expect(textContents).toContain('Beta')
    expect(textContents).toContain('Gamma')
  })

  it('draws arcs for each entity', () => {
    const { container } = render(
      <ChordDiagram matrix={matrix} labels={labels} />
    )
    const arcs = container.querySelectorAll('[data-arc]')
    expect(arcs.length).toBe(3)
  })

  it('has data-component attribute', () => {
    const { container } = render(
      <ChordDiagram matrix={matrix} labels={labels} />
    )
    expect(
      container.querySelector('[data-component="chord-diagram"]')
    ).not.toBeNull()
  })

  it('applies glass mode', () => {
    const { container } = render(
      <ChordDiagram matrix={matrix} labels={labels} glass />
    )
    const el = container.querySelector('[data-component="chord-diagram"]')
    expect(el?.className).toContain('backdrop-blur-md')
  })

  it('does not apply glass mode when glass is falsy', () => {
    const { container } = render(
      <ChordDiagram matrix={matrix} labels={labels} />
    )
    const el = container.querySelector('[data-component="chord-diagram"]')
    expect(el?.className).not.toContain('backdrop-blur-md')
  })

  it('merges custom className', () => {
    const { container } = render(
      <ChordDiagram matrix={matrix} labels={labels} className="my-chord" />
    )
    const el = container.querySelector('[data-component="chord-diagram"]')
    expect(el?.className).toContain('my-chord')
  })

  it('applies custom width and height', () => {
    const { container } = render(
      <ChordDiagram matrix={matrix} labels={labels} width={500} height={500} />
    )
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('width')).toBe('500')
    expect(svg?.getAttribute('height')).toBe('500')
  })

  it('handles zero matrix (grandTotal === 0)', () => {
    const zeroMatrix = [
      [0, 0],
      [0, 0],
    ]
    const { container } = render(
      <ChordDiagram matrix={zeroMatrix} labels={['A', 'B']} />
    )
    // renders empty SVG fallback
    const el = container.querySelector('[data-component="chord-diagram"]')
    expect(el).not.toBeNull()
    const arcs = container.querySelectorAll('[data-arc]')
    expect(arcs.length).toBe(0)
  })

  it('handles empty labels (n === 0)', () => {
    const { container } = render(<ChordDiagram matrix={[]} labels={[]} />)
    const el = container.querySelector('[data-component="chord-diagram"]')
    expect(el).not.toBeNull()
    const arcs = container.querySelectorAll('[data-arc]')
    expect(arcs.length).toBe(0)
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<ChordDiagram matrix={matrix} labels={labels} ref={ref} />)
    expect(ref.current).not.toBeNull()
    expect(ref.current?.getAttribute('data-component')).toBe('chord-diagram')
  })

  it('renders chords between entities', () => {
    const { container } = render(
      <ChordDiagram matrix={matrix} labels={labels} />
    )
    // chords are path elements without data-arc
    const allPaths = container.querySelectorAll('path')
    const arcPaths = container.querySelectorAll('[data-arc]')
    // chord paths = total paths - arc paths - marker arrow path
    expect(allPaths.length).toBeGreaterThan(arcPaths.length)
  })

  it('handles matrix with zero connections between some pairs', () => {
    // val <= 0 branch in computeChords
    const sparseMatrix = [
      [0, 10, 0],
      [10, 0, 0],
      [0, 0, 0],
    ]
    const { container } = render(
      <ChordDiagram matrix={sparseMatrix} labels={['A', 'B', 'C']} />
    )
    expect(
      container.querySelector('[data-component="chord-diagram"]')
    ).not.toBeNull()
  })
})

describe('chord-math', () => {
  it('arcPath uses large arc flag when span > PI', () => {
    // angle span > Math.PI triggers largeArc = 1
    const path = arcPath(150, 150, 100, 0, Math.PI + 0.5)
    expect(path).toContain(' 1 0 ')
  })

  it('arcPath uses small arc flag when span <= PI', () => {
    const path = arcPath(150, 150, 100, 0, Math.PI * 0.5)
    expect(path).toContain(' 0 0 ')
  })

  it('computeChords skips pairs with val <= 0', () => {
    const arcs = computeArcs([10, 0, 10], 20, 3, 0.04)
    // second entity has total 0 but we still compute arcs
    // matrix pairs with zero values should be skipped
    const zeroMatrix = [
      [0, 10, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]
    const chords = computeChords(zeroMatrix, arcs, 20, 3, 0.04)
    // only pair (0,1) has non-zero val, pairs (0,2) and (1,2) are zero
    expect(chords.length).toBe(1)
  })
})
