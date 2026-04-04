import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { GradientText } from '../gradient-text'

describe('GradientText', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<GradientText>Hello</GradientText>)
    const el = container.querySelector('[data-component="gradient-text"]')
    expect(el).not.toBeNull()
  })

  it('renders the children text', () => {
    render(<GradientText>Hello World</GradientText>)
    expect(screen.getByText('Hello World')).toBeDefined()
  })

  it('applies default gradient colors', () => {
    const { container } = render(<GradientText>Test</GradientText>)
    const el = container.querySelector(
      '[data-component="gradient-text"]'
    ) as HTMLElement
    expect(el?.style.backgroundImage).toBe(
      'linear-gradient(to right, #6366f1, #ec4899)'
    )
  })

  it('applies custom from color', () => {
    const { container } = render(
      <GradientText from="#ff0000">Test</GradientText>
    )
    const el = container.querySelector(
      '[data-component="gradient-text"]'
    ) as HTMLElement
    expect(el?.style.backgroundImage).toBe(
      'linear-gradient(to right, #ff0000, #ec4899)'
    )
  })

  it('applies custom to color', () => {
    const { container } = render(<GradientText to="#00ff00">Test</GradientText>)
    const el = container.querySelector(
      '[data-component="gradient-text"]'
    ) as HTMLElement
    expect(el?.style.backgroundImage).toBe(
      'linear-gradient(to right, #6366f1, #00ff00)'
    )
  })

  it('applies both custom from and to colors', () => {
    const { container } = render(
      <GradientText from="#aaa" to="#bbb">
        Test
      </GradientText>
    )
    const el = container.querySelector(
      '[data-component="gradient-text"]'
    ) as HTMLElement
    expect(el?.style.backgroundImage).toBe(
      'linear-gradient(to right, #aaa, #bbb)'
    )
  })

  it('applies custom className', () => {
    const { container } = render(
      <GradientText className="my-class">Test</GradientText>
    )
    const el = container.querySelector('[data-component="gradient-text"]')
    expect(el?.classList.contains('my-class')).toBe(true)
  })

  it('has text-transparent and bg-clip-text classes', () => {
    const { container } = render(<GradientText>Test</GradientText>)
    const el = container.querySelector('[data-component="gradient-text"]')
    expect(el?.classList.contains('text-transparent')).toBe(true)
    expect(el?.classList.contains('bg-clip-text')).toBe(true)
  })

  it('passes extra props', () => {
    const { container } = render(
      <GradientText data-testid="grad">Test</GradientText>
    )
    expect(container.querySelector('[data-testid="grad"]')).not.toBeNull()
  })
})
