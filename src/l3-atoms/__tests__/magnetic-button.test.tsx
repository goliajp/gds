import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { MagneticButton } from '../magnetic-button'

describe('MagneticButton', () => {
  it('renders children', () => {
    render(<MagneticButton>Click me</MagneticButton>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('resets transform on mouse leave', () => {
    const { container } = render(<MagneticButton>Content</MagneticButton>)
    const el = container.querySelector('[data-component="magnetic-button"]') as HTMLElement
    fireEvent.mouseLeave(el)
    expect(el.style.transform).toBe('translate(0px, 0px)')
  })

  it('has data-component attribute', () => {
    const { container } = render(<MagneticButton>Content</MagneticButton>)
    expect(container.querySelector('[data-component="magnetic-button"]')).toBeInTheDocument()
  })

  it('applies transform on mouse move within radius', () => {
    const { container } = render(<MagneticButton strength={0.5} radius={200}>Content</MagneticButton>)
    const el = container.querySelector('[data-component="magnetic-button"]') as HTMLElement
    // mock getBoundingClientRect to return a known rect
    el.getBoundingClientRect = () => ({
      left: 0, top: 0, right: 100, bottom: 100, width: 100, height: 100, x: 0, y: 0, toJSON: () => {},
    })
    fireEvent.mouseMove(el, { clientX: 50, clientY: 50 })
    // center is (50,50), cursor at (50,50) => dx=0, dy=0 => no transform offset
    expect(el.style.transform).toBe('translate(0px, 0px)')
  })

  it('resets transform when cursor is outside radius', () => {
    const { container } = render(<MagneticButton strength={0.3} radius={10}>Content</MagneticButton>)
    const el = container.querySelector('[data-component="magnetic-button"]') as HTMLElement
    el.getBoundingClientRect = () => ({
      left: 0, top: 0, right: 100, bottom: 100, width: 100, height: 100, x: 0, y: 0, toJSON: () => {},
    })
    // cursor far from center (50,50) — distance > radius of 10
    fireEvent.mouseMove(el, { clientX: 200, clientY: 200 })
    expect(el.style.transform).toBe('translate(0px, 0px)')
  })

  it('applies offset when cursor is within radius', () => {
    const { container } = render(<MagneticButton strength={1} radius={500}>Content</MagneticButton>)
    const el = container.querySelector('[data-component="magnetic-button"]') as HTMLElement
    el.getBoundingClientRect = () => ({
      left: 0, top: 0, right: 100, bottom: 100, width: 100, height: 100, x: 0, y: 0, toJSON: () => {},
    })
    // center = (50, 50), cursor at (60, 50) => dx=10, dy=0, dist=10 < 500
    fireEvent.mouseMove(el, { clientX: 60, clientY: 50 })
    expect(el.style.transform).toBe('translate(10px, 0px)')
  })

  it('applies custom className', () => {
    const { container } = render(<MagneticButton className="extra">Content</MagneticButton>)
    const el = container.querySelector('[data-component="magnetic-button"]')
    expect(el?.className).toContain('extra')
  })
})
