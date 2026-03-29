import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AnnotatedChart } from '../annotated-chart'

const data = [
  { x: 0, y: 10 },
  { x: 1, y: 20 },
  { x: 2, y: 15 },
]

const annotations = [
  { label: 'Peak', description: 'Highest point', x: 1 },
]

describe('AnnotatedChart', () => {
  it('renders without crash', () => {
    const { container } = render(<AnnotatedChart annotations={annotations} data={data} />)
    expect(container.querySelector('[data-component="annotated-chart"]')).not.toBeNull()
  })

  it('renders polyline for data', () => {
    const { container } = render(<AnnotatedChart annotations={[]} data={data} />)
    expect(container.querySelector('polyline')).not.toBeNull()
  })

  it('renders annotation markers', () => {
    const { container } = render(<AnnotatedChart annotations={annotations} data={data} />)
    const rects = container.querySelectorAll('rect')
    expect(rects.length).toBe(1)
  })
})
