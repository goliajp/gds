import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { NoiseOverlay } from '../noise-overlay'

describe('NoiseOverlay', () => {
  it('renders without crash', () => {
    const { container } = render(<NoiseOverlay />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<NoiseOverlay />)
    expect(container.querySelector('[data-component="noise-overlay"]')).not.toBeNull()
  })

  it('renders SVG filter element', () => {
    const { container } = render(<NoiseOverlay />)
    expect(container.querySelector('feTurbulence')).not.toBeNull()
  })

  it('applies custom className', () => {
    const { container } = render(<NoiseOverlay className="custom" />)
    expect(container.querySelector('[data-component="noise-overlay"]')?.className).toContain('custom')
  })
})
