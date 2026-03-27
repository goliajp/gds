import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { TextEffect } from '../text-effect'

describe('TextEffect', () => {
  it('renders text content', () => {
    render(<TextEffect effect="gradient">Hello World</TextEffect>)
    expect(screen.getByText('Hello World')).toBeDefined()
  })

  it('applies gradient styles', () => {
    const { container } = render(
      <TextEffect effect="gradient">Gradient</TextEffect>,
    )
    const el = container.querySelector('[data-component="text-effect"]')
    expect(el?.className).toContain('bg-clip-text')
    expect(el?.className).toContain('text-transparent')
  })

  it('applies highlight styles', () => {
    const { container } = render(
      <TextEffect effect="highlight">Highlighted</TextEffect>,
    )
    const el = container.querySelector('[data-component="text-effect"]')
    expect(el?.className).toContain('bg-accent/20')
  })

  it('applies glow styles via text-shadow', () => {
    const { container } = render(
      <TextEffect effect="glow">Glowing</TextEffect>,
    )
    const el = container.querySelector('[data-component="text-effect"]') as HTMLElement
    expect(el?.style.textShadow).toContain('var(--gds-accent)')
  })

  it('has data-component="text-effect"', () => {
    const { container } = render(
      <TextEffect effect="gradient">Test</TextEffect>,
    )
    expect(container.querySelector('[data-component="text-effect"]')).not.toBeNull()
  })
})
