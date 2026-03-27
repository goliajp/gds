import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Confetti } from '../confetti'

describe('Confetti', () => {
  it('renders nothing when inactive', () => {
    const { container } = render(<Confetti active={false} />)
    expect(container.innerHTML).toBe('')
  })

  it('renders canvas when active', () => {
    render(<Confetti active={true} />)
    const canvas = document.body.querySelector('canvas[data-component="confetti"]')
    expect(canvas).not.toBeNull()
  })

  it('portals canvas to document.body', () => {
    const { container } = render(<Confetti active={true} />)
    // canvas should NOT be inside the component container — it's portaled to body
    expect(container.querySelector('canvas')).toBeNull()
    expect(document.body.querySelector('canvas[data-component="confetti"]')).not.toBeNull()
  })

  it('has data-component attribute', () => {
    render(<Confetti active={true} />)
    const canvas = document.body.querySelector('[data-component="confetti"]')
    expect(canvas).not.toBeNull()
    expect(canvas?.tagName.toLowerCase()).toBe('canvas')
  })

  it('applies custom className', () => {
    render(<Confetti active={true} className="my-confetti" />)
    const canvas = document.body.querySelector('[data-component="confetti"]')
    expect(canvas?.className).toContain('my-confetti')
  })

  it('accepts custom colors prop', () => {
    render(<Confetti active={true} colors={['#ff0000', '#00ff00']} />)
    const canvas = document.body.querySelector('[data-component="confetti"]')
    expect(canvas).not.toBeNull()
  })

  it('accepts custom particleCount prop', () => {
    render(<Confetti active={true} particleCount={50} />)
    const canvas = document.body.querySelector('[data-component="confetti"]')
    expect(canvas).not.toBeNull()
  })

  it('accepts custom duration prop', () => {
    render(<Confetti active={true} duration={1000} />)
    const canvas = document.body.querySelector('[data-component="confetti"]')
    expect(canvas).not.toBeNull()
  })

  it('clears particles when active changes to false', () => {
    const { rerender } = render(<Confetti active={true} />)
    expect(document.body.querySelector('[data-component="confetti"]')).not.toBeNull()

    rerender(<Confetti active={false} />)
    expect(document.body.querySelector('[data-component="confetti"]')).toBeNull()
  })

  it('runs effect cleanup on unmount', () => {
    const { unmount } = render(<Confetti active={true} />)
    // should not throw on unmount
    unmount()
    expect(document.body.querySelector('[data-component="confetti"]')).toBeNull()
  })
})
