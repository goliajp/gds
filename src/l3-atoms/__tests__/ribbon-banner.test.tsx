import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { RibbonBanner } from '../ribbon-banner'

describe('RibbonBanner', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<RibbonBanner text="New" />)
    expect(container.querySelector('[data-component="ribbon-banner"]')).not.toBeNull()
  })

  it('displays the text', () => {
    render(<RibbonBanner text="Beta" />)
    expect(screen.getByText('Beta')).toBeDefined()
  })

  it('defaults to top-right position', () => {
    const { container } = render(<RibbonBanner text="New" />)
    const el = container.querySelector('[data-component="ribbon-banner"]') as HTMLElement
    expect(el.className).toContain('right-0')
    expect(el.className).not.toContain('left-0')
  })

  it('applies top-left position', () => {
    const { container } = render(<RibbonBanner text="New" position="top-left" />)
    const el = container.querySelector('[data-component="ribbon-banner"]') as HTMLElement
    expect(el.className).toContain('left-0')
    expect(el.className).not.toContain('right-0')
  })

  it('rotates 45deg for top-right', () => {
    const { container } = render(<RibbonBanner text="New" position="top-right" />)
    const inner = container.querySelector('[data-component="ribbon-banner"] > div') as HTMLElement
    expect(inner.style.transform).toBe('rotate(45deg)')
    expect(inner.style.right).toBe('-20px')
    expect(inner.style.left).toBe('')
  })

  it('rotates -45deg for top-left', () => {
    const { container } = render(<RibbonBanner text="New" position="top-left" />)
    const inner = container.querySelector('[data-component="ribbon-banner"] > div') as HTMLElement
    expect(inner.style.transform).toBe('rotate(-45deg)')
    expect(inner.style.left).toBe('-20px')
    expect(inner.style.right).toBe('')
  })

  it('uses default accent color when no color prop', () => {
    const { container } = render(<RibbonBanner text="New" />)
    const inner = container.querySelector('[data-component="ribbon-banner"] > div') as HTMLElement
    expect(inner.style.backgroundColor).toBe('var(--color-accent)')
  })

  it('applies custom color', () => {
    const { container } = render(<RibbonBanner text="New" color="red" />)
    const inner = container.querySelector('[data-component="ribbon-banner"] > div') as HTMLElement
    expect(inner.style.backgroundColor).toBe('red')
  })

  it('applies custom className', () => {
    const { container } = render(<RibbonBanner text="New" className="my-ribbon" />)
    const el = container.querySelector('[data-component="ribbon-banner"]')
    expect(el?.className).toContain('my-ribbon')
  })

  it('forwards additional props', () => {
    const { container } = render(<RibbonBanner text="New" data-testid="ribbon" />)
    expect(container.querySelector('[data-testid="ribbon"]')).not.toBeNull()
  })
})
