import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ZoomOnHover } from '../zoom-on-hover'

describe('ZoomOnHover', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(
      <ZoomOnHover>
        <span>Content</span>
      </ZoomOnHover>
    )
    expect(
      container.querySelector('[data-component="zoom-on-hover"]')
    ).not.toBeNull()
  })

  it('renders children', () => {
    render(
      <ZoomOnHover>
        <span>Hello</span>
      </ZoomOnHover>
    )
    expect(screen.getByText('Hello')).toBeDefined()
  })

  it('uses default duration of 300ms', () => {
    const { container } = render(
      <ZoomOnHover>
        <span>X</span>
      </ZoomOnHover>
    )
    const inner = container.querySelector(
      '[data-component="zoom-on-hover"] > div'
    ) as HTMLElement
    expect(inner.style.transitionDuration).toBe('300ms')
  })

  it('applies custom duration', () => {
    const { container } = render(
      <ZoomOnHover duration={500}>
        <span>X</span>
      </ZoomOnHover>
    )
    const inner = container.querySelector(
      '[data-component="zoom-on-hover"] > div'
    ) as HTMLElement
    expect(inner.style.transitionDuration).toBe('500ms')
  })

  it('scales up on mouse enter with default scale', () => {
    const { container } = render(
      <ZoomOnHover>
        <span>X</span>
      </ZoomOnHover>
    )
    const inner = container.querySelector(
      '[data-component="zoom-on-hover"] > div'
    ) as HTMLElement
    fireEvent.mouseEnter(inner)
    expect(inner.style.transform).toBe('scale(1.1)')
  })

  it('scales up on mouse enter with custom scale', () => {
    const { container } = render(
      <ZoomOnHover scale={1.5}>
        <span>X</span>
      </ZoomOnHover>
    )
    const inner = container.querySelector(
      '[data-component="zoom-on-hover"] > div'
    ) as HTMLElement
    fireEvent.mouseEnter(inner)
    expect(inner.style.transform).toBe('scale(1.5)')
  })

  it('resets scale on mouse leave', () => {
    const { container } = render(
      <ZoomOnHover>
        <span>X</span>
      </ZoomOnHover>
    )
    const inner = container.querySelector(
      '[data-component="zoom-on-hover"] > div'
    ) as HTMLElement
    fireEvent.mouseEnter(inner)
    fireEvent.mouseLeave(inner)
    expect(inner.style.transform).toBe('scale(1)')
  })

  it('applies custom className', () => {
    const { container } = render(
      <ZoomOnHover className="my-zoom">
        <span>X</span>
      </ZoomOnHover>
    )
    const el = container.querySelector('[data-component="zoom-on-hover"]')
    expect(el?.className).toContain('my-zoom')
  })

  it('forwards additional props', () => {
    const { container } = render(
      <ZoomOnHover data-testid="zoom">
        <span>X</span>
      </ZoomOnHover>
    )
    expect(container.querySelector('[data-testid="zoom"]')).not.toBeNull()
  })
})
