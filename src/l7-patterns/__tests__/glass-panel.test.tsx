import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { GlassPanel } from '../glass-panel'

describe('GlassPanel', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<GlassPanel>Content</GlassPanel>)
    expect(container.querySelector('[data-component="glass-panel"]')).not.toBeNull()
  })

  it('renders children', () => {
    render(<GlassPanel>Panel body</GlassPanel>)
    expect(screen.getByText('Panel body')).toBeDefined()
  })

  it('applies gds-ctx and glass classes', () => {
    const { container } = render(<GlassPanel>Content</GlassPanel>)
    const el = container.querySelector('[data-component="glass-panel"]')
    expect(el?.className).toContain('gds-ctx')
    expect(el?.className).toContain('gds-glass')
  })

  it('applies padding variant', () => {
    const { container } = render(<GlassPanel padding="lg">Content</GlassPanel>)
    const el = container.querySelector('[data-component="glass-panel"]')
    expect(el?.className).toContain('p-6')
  })
})
