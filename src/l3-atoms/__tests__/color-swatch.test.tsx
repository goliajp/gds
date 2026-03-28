import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ColorSwatch } from '../color-swatch'

describe('ColorSwatch', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<ColorSwatch color="#ff0000" />)
    const el = container.querySelector('[data-component="color-swatch"]')
    expect(el).not.toBeNull()
  })

  it('displays the color string', () => {
    render(<ColorSwatch color="#abcdef" />)
    expect(screen.getByText('#abcdef')).toBeDefined()
  })

  it('renders swatch with the correct background color', () => {
    const { container } = render(<ColorSwatch color="rgb(0, 128, 255)" />)
    const swatch = container.querySelector('[data-component="color-swatch"] span[style]') as HTMLElement
    expect(swatch?.style.backgroundColor).toBe('rgb(0, 128, 255)')
  })

  it('renders as non-copyable by default (no button)', () => {
    const { container } = render(<ColorSwatch color="#000" />)
    const button = container.querySelector('button')
    expect(button).toBeNull()
  })

  it('renders a button when copyable is true', () => {
    const { container } = render(<ColorSwatch color="#000" copyable />)
    const button = container.querySelector('button')
    expect(button).not.toBeNull()
    expect(button?.getAttribute('aria-label')).toBe('Copy #000')
  })

  it('renders label when provided', () => {
    render(<ColorSwatch color="#000" label="Primary" />)
    expect(screen.getByText('Primary')).toBeDefined()
  })

  it('does not render label when not provided', () => {
    const { container } = render(<ColorSwatch color="#000" />)
    const spans = container.querySelectorAll('[data-component="color-swatch"] > span')
    // should have swatch span and color text span, but no label span
    expect(spans.length).toBe(2)
  })

  it('applies default size variant', () => {
    const { container } = render(<ColorSwatch color="#000" />)
    const swatch = container.querySelector('[style]') as HTMLElement
    expect(swatch?.classList.contains('h-10')).toBe(true)
    expect(swatch?.classList.contains('w-10')).toBe(true)
  })

  it('applies sm size variant', () => {
    const { container } = render(<ColorSwatch color="#000" size="sm" />)
    const swatch = container.querySelector('[style]') as HTMLElement
    expect(swatch?.classList.contains('h-7')).toBe(true)
  })

  it('applies lg size variant', () => {
    const { container } = render(<ColorSwatch color="#000" size="lg" />)
    const swatch = container.querySelector('[style]') as HTMLElement
    expect(swatch?.classList.contains('h-14')).toBe(true)
  })

  it('applies custom className', () => {
    const { container } = render(<ColorSwatch className="extra" color="#000" />)
    const el = container.querySelector('[data-component="color-swatch"]')
    expect(el?.classList.contains('extra')).toBe(true)
  })
})
