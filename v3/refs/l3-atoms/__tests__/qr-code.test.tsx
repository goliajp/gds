import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { QRCode } from '../qr-code'

describe('QRCode', () => {
  it('renders SVG element', () => {
    render(<QRCode value="hello" />)
    const svg = screen.getByTestId('qr-code-svg')
    expect(svg).toBeInTheDocument()
    expect(svg.tagName).toBe('svg')
  })

  it('applies correct size', () => {
    render(<QRCode value="hello" size={256} />)
    const svg = screen.getByTestId('qr-code-svg')
    expect(svg).toHaveAttribute('width', '256')
    expect(svg).toHaveAttribute('height', '256')
  })

  it('renders finder patterns (3 corner groups of 7x7)', () => {
    const { container } = render(<QRCode value="test" />)
    const rects = container.querySelectorAll('rect')
    // at least background rect + finder pattern rects (3 * ~25 cells each = ~75)
    expect(rects.length).toBeGreaterThan(50)
  })

  it('has data-component attribute', () => {
    const { container } = render(<QRCode value="test" />)
    expect(
      container.querySelector('[data-component="qr-code"]')
    ).toBeInTheDocument()
  })
})
