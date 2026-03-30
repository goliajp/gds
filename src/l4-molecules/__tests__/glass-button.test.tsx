import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { GlassButton } from '../glass-button'

describe('GlassButton', () => {
  it('renders with data-component', () => {
    const { container } = render(<GlassButton>Click</GlassButton>)
    expect(
      container.querySelector('[data-component="glass-button"]')
    ).not.toBeNull()
  })

  it('renders children', () => {
    const { getByText } = render(<GlassButton>Label</GlassButton>)
    expect(getByText('Label')).toBeDefined()
  })

  it('applies default variant and size classes', () => {
    const { container } = render(<GlassButton>Default</GlassButton>)
    const btn = container.querySelector('button')!
    expect(btn.className).toContain('bg-bg/50')
    expect(btn.className).toContain('h-8')
  })

  it('applies accent variant', () => {
    const { container } = render(
      <GlassButton variant="accent">Accent</GlassButton>
    )
    const btn = container.querySelector('button')!
    expect(btn.className).toContain('bg-accent/20')
  })

  it('applies sm size', () => {
    const { container } = render(<GlassButton size="sm">Small</GlassButton>)
    const btn = container.querySelector('button')!
    expect(btn.className).toContain('h-7')
  })

  it('applies lg size', () => {
    const { container } = render(<GlassButton size="lg">Large</GlassButton>)
    const btn = container.querySelector('button')!
    expect(btn.className).toContain('h-9')
  })

  it('merges custom className', () => {
    const { container } = render(
      <GlassButton className="custom-cls">C</GlassButton>
    )
    const btn = container.querySelector('button')!
    expect(btn.className).toContain('custom-cls')
  })

  it('forwards additional button props', () => {
    const { container } = render(<GlassButton disabled>Disabled</GlassButton>)
    const btn = container.querySelector('button')!
    expect(btn.disabled).toBe(true)
  })
})
