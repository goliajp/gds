import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AnimatedBorder } from '../animated-border'

describe('AnimatedBorder', () => {
  it('renders without crash', () => {
    const { container } = render(
      <AnimatedBorder>
        <span>child</span>
      </AnimatedBorder>
    )
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(
      <AnimatedBorder>
        <span>child</span>
      </AnimatedBorder>
    )
    expect(
      container.querySelector('[data-component="animated-border"]')
    ).not.toBeNull()
  })

  it('renders children', () => {
    const { container } = render(
      <AnimatedBorder>
        <span data-testid="inner">hello</span>
      </AnimatedBorder>
    )
    expect(container.querySelector('[data-testid="inner"]')).not.toBeNull()
  })

  it('applies variant classes', () => {
    const { container: dashContainer } = render(
      <AnimatedBorder variant="dash">
        <span>x</span>
      </AnimatedBorder>
    )
    expect(
      dashContainer.querySelector('[data-component="animated-border"]')
        ?.className
    ).toContain('border-dashed')

    const { container: pulseContainer } = render(
      <AnimatedBorder variant="pulse">
        <span>x</span>
      </AnimatedBorder>
    )
    expect(
      pulseContainer.querySelector('[data-component="animated-border"]')
        ?.className
    ).toContain('border-accent')
  })
})
