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

  it('applies default intensity styles', () => {
    const { container } = render(<GlowEffect>Content</GlowEffect>)
    const glow = container.querySelector('[aria-hidden]') as HTMLElement
    expect(glow.style.filter).toBe('blur(40px)')
    expect(glow.style.opacity).toBe('0.15')
    expect(glow.style.inset).toBe('-20px')
  })

  it('applies sm intensity styles', () => {
    const { container } = render(<GlowEffect intensity="sm">Content</GlowEffect>)
    const glow = container.querySelector('[aria-hidden]') as HTMLElement
    expect(glow.style.filter).toBe('blur(28px)')
    expect(glow.style.opacity).toBe('0.12')
    expect(glow.style.inset).toBe('-12px')
  })

  it('applies lg intensity styles', () => {
    const { container } = render(<GlowEffect intensity="lg">Content</GlowEffect>)
    const glow = container.querySelector('[aria-hidden]') as HTMLElement
    expect(glow.style.filter).toBe('blur(60px)')
    expect(glow.style.opacity).toBe('0.25')
    expect(glow.style.inset).toBe('-30px')
  })

  it('applies custom color', () => {
    const { container } = render(<GlowEffect color="red">Content</GlowEffect>)
    const glow = container.querySelector('[aria-hidden]') as HTMLElement
    expect(glow.style.backgroundColor).toBe('red')
  })

  it('has data-component attribute', () => {
    const { container } = render(<GlowEffect>Content</GlowEffect>)
    expect(container.querySelector('[data-component="glow-effect"]')).toBeInTheDocument()
  })
})
