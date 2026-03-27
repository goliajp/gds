import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { GradientBorder } from '../gradient-border'

describe('GradientBorder', () => {
  it('renders children', () => {
    const { getByText } = render(
      <GradientBorder>Hello</GradientBorder>,
    )
    expect(getByText('Hello')).toBeInTheDocument()
  })

  it('applies gradient as background', () => {
    const gradient = 'linear-gradient(90deg, red, blue)'
    const { container } = render(
      <GradientBorder gradient={gradient}>Content</GradientBorder>,
    )
    const outer = container.querySelector('[data-component="gradient-border"]')!
    expect((outer as HTMLElement).style.background).toBe(gradient)
  })

  it('applies custom width as padding', () => {
    const { container } = render(
      <GradientBorder width={3}>Content</GradientBorder>,
    )
    const outer = container.querySelector('[data-component="gradient-border"]')!
    expect((outer as HTMLElement).style.padding).toBe('3px')
  })

  it('has data-component attribute', () => {
    const { container } = render(
      <GradientBorder>Content</GradientBorder>,
    )
    expect(container.querySelector('[data-component="gradient-border"]')).toBeInTheDocument()
  })
})
