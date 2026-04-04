import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { GlowEffect } from '../glow-effect'

describe('GlowEffect', () => {
  it('renders children', () => {
    render(<GlowEffect>Hello</GlowEffect>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('has data-component attribute', () => {
    const { container } = render(<GlowEffect>Content</GlowEffect>)
    expect(
      container.querySelector('[data-component="glow-effect"]')
    ).toBeInTheDocument()
  })

  it('renders as a single DOM node wrapping children', () => {
    const { container } = render(<GlowEffect>Content</GlowEffect>)
    const root = container.querySelector(
      '[data-component="glow-effect"]'
    ) as HTMLElement
    expect(root.textContent).toBe('Content')
    expect(root.querySelector('[aria-hidden]')).toBeNull()
  })

  it('applies default intensity as box-shadow with dual layers', () => {
    const { container } = render(<GlowEffect>Content</GlowEffect>)
    const root = container.querySelector(
      '[data-component="glow-effect"]'
    ) as HTMLElement
    expect(root.style.boxShadow).toContain('32px')
    expect(root.style.boxShadow).toContain('8px')
    expect(root.style.boxShadow).toContain('color-mix')
    // dual shadow (outer + inner)
    expect(root.style.boxShadow.split(',').length).toBeGreaterThanOrEqual(2)
  })

  it('applies sm intensity', () => {
    const { container } = render(
      <GlowEffect intensity="sm">Content</GlowEffect>
    )
    const root = container.querySelector(
      '[data-component="glow-effect"]'
    ) as HTMLElement
    expect(root.style.boxShadow).toContain('20px')
    expect(root.style.boxShadow).toContain('15%')
  })

  it('applies lg intensity', () => {
    const { container } = render(
      <GlowEffect intensity="lg">Content</GlowEffect>
    )
    const root = container.querySelector(
      '[data-component="glow-effect"]'
    ) as HTMLElement
    expect(root.style.boxShadow).toContain('48px')
    expect(root.style.boxShadow).toContain('25%')
  })

  it('applies custom color in box-shadow', () => {
    const { container } = render(
      <GlowEffect color="var(--gds-danger)">Content</GlowEffect>
    )
    const root = container.querySelector(
      '[data-component="glow-effect"]'
    ) as HTMLElement
    expect(root.style.boxShadow).toContain('var(--gds-danger)')
  })

  it('applies border-radius when radius prop is provided', () => {
    const { container } = render(<GlowEffect radius={12}>Content</GlowEffect>)
    const root = container.querySelector(
      '[data-component="glow-effect"]'
    ) as HTMLElement
    expect(root.style.borderRadius).toBe('12px')
  })

  it('does not set border-radius when radius prop is omitted', () => {
    const { container } = render(<GlowEffect>Content</GlowEffect>)
    const root = container.querySelector(
      '[data-component="glow-effect"]'
    ) as HTMLElement
    expect(root.style.borderRadius).toBe('')
  })
})
