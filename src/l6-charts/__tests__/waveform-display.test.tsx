import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { WaveformDisplay } from '../waveform-display'

const data = [0.2, 0.5, 0.8, 0.3, 0.6, 0.9, 0.4, 0.7]

describe('WaveformDisplay', () => {
  it('renders svg element', () => {
    const { container } = render(<WaveformDisplay data={data} />)
    expect(container.querySelector('svg')).not.toBeNull()
  })

  it('renders correct number of bars', () => {
    const { container } = render(<WaveformDisplay data={data} />)
    const rects = container.querySelectorAll('rect')
    expect(rects.length).toBe(data.length)
  })

  it('applies progress coloring', () => {
    const { container } = render(<WaveformDisplay data={data} progress={0.5} />)
    const rects = container.querySelectorAll('rect')
    const playedCount = Array.from(rects).filter(
      (r) => r.getAttribute('opacity') === '1'
    ).length
    expect(playedCount).toBe(Math.floor(0.5 * data.length))
  })

  it('has data-component attribute', () => {
    const { container } = render(<WaveformDisplay data={data} />)
    expect(
      container.querySelector('[data-component="waveform-display"]')
    ).not.toBeNull()
  })
})
