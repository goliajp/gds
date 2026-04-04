import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { RippleEffect } from '../ripple-effect'

describe('RippleEffect', () => {
  it('renders children', () => {
    render(<RippleEffect>Click me</RippleEffect>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('creates ripple span on pointer down', () => {
    const { container } = render(<RippleEffect>Content</RippleEffect>)
    const el = container.querySelector('[data-component="ripple-effect"]')!
    fireEvent.pointerDown(el, { clientX: 50, clientY: 50 })
    const ripple = container.querySelector('.animate-ripple')
    expect(ripple).toBeInTheDocument()
  })

  it('removes ripple after animation ends', () => {
    const { container } = render(<RippleEffect>Content</RippleEffect>)
    const el = container.querySelector('[data-component="ripple-effect"]')!
    fireEvent.pointerDown(el, { clientX: 50, clientY: 50 })
    const ripple = container.querySelector('.animate-ripple')!
    fireEvent.animationEnd(ripple)
    expect(container.querySelector('.animate-ripple')).not.toBeInTheDocument()
  })

  it('does not create ripple when disabled', () => {
    const { container } = render(<RippleEffect disabled>Content</RippleEffect>)
    const el = container.querySelector('[data-component="ripple-effect"]')!
    fireEvent.pointerDown(el, { clientX: 50, clientY: 50 })
    expect(container.querySelector('.animate-ripple')).not.toBeInTheDocument()
  })
})
