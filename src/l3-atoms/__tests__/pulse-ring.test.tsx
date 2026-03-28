import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { PulseRing } from '../pulse-ring'

describe('PulseRing', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<PulseRing />)
    expect(container.querySelector('[data-component="pulse-ring"]')).not.toBeNull()
  })

  it('renders rings when active (default)', () => {
    const { container } = render(<PulseRing />)
    const rings = container.querySelectorAll('span')
    expect(rings.length).toBe(3)
  })

  it('renders no rings when active=false', () => {
    const { container } = render(<PulseRing active={false} />)
    const rings = container.querySelectorAll('span')
    expect(rings.length).toBe(0)
  })

  it('still has data-component when inactive', () => {
    const { container } = render(<PulseRing active={false} />)
    expect(container.querySelector('[data-component="pulse-ring"]')).not.toBeNull()
  })

  it('renders custom count of rings', () => {
    const { container } = render(<PulseRing count={5} />)
    const rings = container.querySelectorAll('span')
    expect(rings.length).toBe(5)
  })

  it('applies custom size', () => {
    const { container } = render(<PulseRing size={120} />)
    const el = container.querySelector('[data-component="pulse-ring"]') as HTMLElement
    expect(el.style.width).toBe('120px')
    expect(el.style.height).toBe('120px')
  })

  it('uses default accent color when no color prop', () => {
    const { container } = render(<PulseRing count={1} />)
    const ring = container.querySelector('span') as HTMLElement
    expect(ring.style.borderColor).toBe('var(--color-accent)')
  })

  it('applies custom color', () => {
    const { container } = render(<PulseRing count={1} color="red" />)
    const ring = container.querySelector('span') as HTMLElement
    expect(ring.style.borderColor).toBe('red')
  })

  it('applies custom className', () => {
    const { container } = render(<PulseRing className="my-class" />)
    const el = container.querySelector('[data-component="pulse-ring"]')
    expect(el?.className).toContain('my-class')
  })

  it('applies className when inactive', () => {
    const { container } = render(<PulseRing active={false} className="my-class" />)
    const el = container.querySelector('[data-component="pulse-ring"]')
    expect(el?.className).toContain('my-class')
  })

  it('forwards additional props', () => {
    const { container } = render(<PulseRing data-testid="pulse" />)
    expect(container.querySelector('[data-testid="pulse"]')).not.toBeNull()
  })

  it('injects keyframe style element when active', () => {
    const { container } = render(<PulseRing />)
    const style = container.querySelector('style')
    expect(style).not.toBeNull()
    expect(style?.textContent).toContain('gds-pulse-ring')
  })

  it('sets staggered animation on each ring', () => {
    const { container } = render(<PulseRing count={3} />)
    const rings = container.querySelectorAll('span')
    const anim0 = rings[0]?.style.animation
    const anim1 = rings[1]?.style.animation
    expect(anim0).toBeDefined()
    expect(anim1).toBeDefined()
    expect(anim0).not.toBe(anim1)
  })
})
