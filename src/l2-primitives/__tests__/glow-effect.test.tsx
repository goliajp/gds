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

  it('applies intensity class', () => {
    const { container } = render(<GlowEffect intensity="lg">Content</GlowEffect>)
    const glow = container.querySelector('[aria-hidden]')
    expect(glow?.className).toContain('blur-2xl')
    expect(glow?.className).toContain('opacity-40')
  })

  it('has data-component attribute', () => {
    const { container } = render(<GlowEffect>Content</GlowEffect>)
    expect(container.querySelector('[data-component="glow-effect"]')).toBeInTheDocument()
  })
})
