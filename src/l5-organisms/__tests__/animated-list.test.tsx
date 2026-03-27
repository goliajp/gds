import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AnimatedList } from '../animated-list'

describe('AnimatedList', () => {
  it('renders all children', () => {
    render(
      <AnimatedList>
        <div>Item A</div>
        <div>Item B</div>
        <div>Item C</div>
      </AnimatedList>,
    )
    expect(screen.getByText('Item A')).toBeDefined()
    expect(screen.getByText('Item B')).toBeDefined()
    expect(screen.getByText('Item C')).toBeDefined()
  })

  it('applies animation class to each child wrapper', () => {
    const { container } = render(
      <AnimatedList animation="fade">
        <div>One</div>
        <div>Two</div>
      </AnimatedList>,
    )
    const wrappers = container.querySelectorAll('.animate-fade-in')
    expect(wrappers.length).toBe(2)
  })

  it('applies stagger delay to each child', () => {
    const { container } = render(
      <AnimatedList stagger={100}>
        <div>A</div>
        <div>B</div>
        <div>C</div>
      </AnimatedList>,
    )
    const list = container.querySelector('[data-component="animated-list"]')
    const wrappers = list?.children
    expect((wrappers?.[0] as HTMLElement)?.style.animationDelay).toBe('0ms')
    expect((wrappers?.[1] as HTMLElement)?.style.animationDelay).toBe('100ms')
    expect((wrappers?.[2] as HTMLElement)?.style.animationDelay).toBe('200ms')
  })

  it('has data-component="animated-list"', () => {
    const { container } = render(
      <AnimatedList>
        <div>X</div>
      </AnimatedList>,
    )
    expect(container.querySelector('[data-component="animated-list"]')).not.toBeNull()
  })
})
