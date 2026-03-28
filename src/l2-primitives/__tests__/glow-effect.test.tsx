import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { GlowEffect } from '../glow-effect'

describe('GlowEffect', () => {
  it('renders children', () => {
    render(<GlowEffect>Hello</GlowEffect>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('has a glow div with aria-hidden', () => {
    const { container } = render(<GlowEffect>Content</GlowEffect>)
    const glow = container.querySelector('[aria-hidden]')
    expect(glow).toBeInTheDocument()
  })

  it('uses DOM order instead of negative z-index for layering', () => {
    const { container } = render(<GlowEffect>Content</GlowEffect>)
    const glow = container.querySelector('[aria-hidden]') as HTMLElement
    expect(glow.style.zIndex).toBe('')
    const childWrapper = glow.nextElementSibling as HTMLElement
    expect(childWrapper.className).toContain('relative')
    expect(childWrapper.textContent).toBe('Content')
  })

  it('applies default intensity styles', () => {
    const { container } = render(<GlowEffect>Content</GlowEffect>)
    const glow = container.querySelector('[aria-hidden]') as HTMLElement
    expect(glow.style.filter).toBe('blur(48px)')
    expect(glow.style.opacity).toBe('0.12')
    expect(glow.style.inset).toBe('-16px')
    expect(glow.style.borderRadius).toBe('16px')
  })

  it('applies sm intensity styles', () => {
    const { container } = render(<GlowEffect intensity="sm">Content</GlowEffect>)
    const glow = container.querySelector('[aria-hidden]') as HTMLElement
    expect(glow.style.filter).toBe('blur(32px)')
    expect(glow.style.opacity).toBe('0.08')
    expect(glow.style.inset).toBe('-10px')
  })

  it('applies lg intensity styles', () => {
    const { container } = render(<GlowEffect intensity="lg">Content</GlowEffect>)
    const glow = container.querySelector('[aria-hidden]') as HTMLElement
    expect(glow.style.filter).toBe('blur(64px)')
    expect(glow.style.opacity).toBe('0.18')
    expect(glow.style.inset).toBe('-24px')
  })

  it('applies custom color', () => {
    const { container } = render(<GlowEffect color="red">Content</GlowEffect>)
    const glow = container.querySelector('[aria-hidden]') as HTMLElement
    expect(glow.style.backgroundColor).toBe('red')
  })

  it('applies custom radius', () => {
    const { container } = render(<GlowEffect radius={24}>Content</GlowEffect>)
    const glow = container.querySelector('[aria-hidden]') as HTMLElement
    expect(glow.style.borderRadius).toBe('24px')
  })

  it('has data-component attribute', () => {
    const { container } = render(<GlowEffect>Content</GlowEffect>)
    expect(container.querySelector('[data-component="glow-effect"]')).toBeInTheDocument()
  })
})
