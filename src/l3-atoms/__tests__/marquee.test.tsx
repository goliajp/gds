import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Marquee } from '../marquee'

describe('Marquee', () => {
  it('renders children', () => {
    render(<Marquee><span data-testid="child">hello</span></Marquee>)
    const matches = screen.getAllByTestId('child')
    // children duplicated for seamless loop
    expect(matches.length).toBe(2)
    expect(matches[0]).toHaveTextContent('hello')
  })

  it('applies animation style', () => {
    const { container } = render(<Marquee speed={60}>text</Marquee>)
    const inner = container.querySelector('[data-component="marquee"] > div')
    expect(inner).not.toBeNull()
    const style = inner!.getAttribute('style') ?? ''
    expect(style).toContain('marquee-scroll')
  })

  it('supports pauseOnHover', () => {
    const { container } = render(<Marquee pauseOnHover>text</Marquee>)
    const inner = container.querySelector('[data-component="marquee"] > div')
    expect(inner!.className).toContain('hover:')
  })

  it('has data-component attribute', () => {
    const { container } = render(<Marquee>x</Marquee>)
    expect(container.querySelector('[data-component="marquee"]')).toBeInTheDocument()
  })
})
