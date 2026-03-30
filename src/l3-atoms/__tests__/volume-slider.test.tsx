import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { VolumeSlider } from '../volume-slider'

describe('VolumeSlider', () => {
  it('renders without crash', () => {
    const { container } = render(<VolumeSlider value={50} onChange={vi.fn()} />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<VolumeSlider value={50} onChange={vi.fn()} />)
    expect(
      container.querySelector('[data-component="volume-slider"]')
    ).not.toBeNull()
  })

  it('renders 10 bars', () => {
    const { container } = render(<VolumeSlider value={50} onChange={vi.fn()} />)
    const bars = container.querySelectorAll(
      '[data-component="volume-slider"] button'
    )
    expect(bars.length).toBe(10)
  })

  it('applies custom className', () => {
    const { container } = render(
      <VolumeSlider className="custom" value={50} onChange={vi.fn()} />
    )
    expect(
      container.querySelector('[data-component="volume-slider"]')?.className
    ).toContain('custom')
  })
})
