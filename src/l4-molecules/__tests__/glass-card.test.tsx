import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { GlassCard } from '../glass-card'

describe('GlassCard', () => {
  it('renders with data-component', () => {
    const { container } = render(<GlassCard>Content</GlassCard>)
    expect(
      container.querySelector('[data-component="glass-card"]')
    ).not.toBeNull()
  })

  it('renders children', () => {
    const { getByText } = render(<GlassCard>Hello</GlassCard>)
    expect(getByText('Hello')).toBeDefined()
  })

  it('applies default blur class', () => {
    const { container } = render(<GlassCard>Default</GlassCard>)
    const el = container.querySelector('[data-component="glass-card"]')!
    expect(el.className).toContain('gds-glass')
    expect(el.className).toContain('border-border/20')
  })

  it('applies sm blur variant', () => {
    const { container } = render(<GlassCard blur="sm">Sm</GlassCard>)
    const el = container.querySelector('[data-component="glass-card"]')!
    expect(el.className).toContain('gds-glass-sm')
    expect(el.className).toContain('border-border/25')
  })

  it('applies lg blur variant', () => {
    const { container } = render(<GlassCard blur="lg">Lg</GlassCard>)
    const el = container.querySelector('[data-component="glass-card"]')!
    expect(el.className).toContain('gds-glass-lg')
    expect(el.className).toContain('border-border/15')
  })

  it('merges custom className', () => {
    const { container } = render(<GlassCard className="extra">C</GlassCard>)
    const el = container.querySelector('[data-component="glass-card"]')!
    expect(el.className).toContain('extra')
  })
})
