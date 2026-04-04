import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CursorFollow } from '../cursor-follow'

describe('CursorFollow', () => {
  it('renders children', () => {
    render(
      <CursorFollow>
        <span>cursor content</span>
      </CursorFollow>
    )
    expect(screen.getByText('cursor content')).toBeDefined()
  })

  it('has data-component="cursor-follow"', () => {
    const { container } = render(
      <CursorFollow>
        <span>test</span>
      </CursorFollow>
    )
    expect(
      container.querySelector('[data-component="cursor-follow"]')
    ).not.toBeNull()
  })

  it('has a position tracking container with relative class', () => {
    const { container } = render(
      <CursorFollow>
        <span>test</span>
      </CursorFollow>
    )
    const el = container.querySelector('[data-component="cursor-follow"]')
    expect(el?.className).toContain('relative')
  })

  it('updates position on mouse move', () => {
    const { container } = render(
      <CursorFollow>
        <span>dot</span>
      </CursorFollow>
    )
    const el = container.querySelector(
      '[data-component="cursor-follow"]'
    ) as HTMLElement
    el.getBoundingClientRect = () => ({
      left: 10,
      top: 20,
      right: 110,
      bottom: 120,
      width: 100,
      height: 100,
      x: 10,
      y: 20,
      toJSON: () => {},
    })

    fireEvent.mouseMove(el, { clientX: 50, clientY: 70 })
    const follower = el.querySelector('.absolute') as HTMLElement
    // x = 50 - 10 = 40, y = 70 - 20 = 50
    expect(follower.style.transform).toBe('translate(40px, 50px)')
  })

  it('applies offset to position', () => {
    const { container } = render(
      <CursorFollow offset={{ x: 5, y: -3 }}>
        <span>dot</span>
      </CursorFollow>
    )
    const el = container.querySelector(
      '[data-component="cursor-follow"]'
    ) as HTMLElement
    el.getBoundingClientRect = () => ({
      left: 0,
      top: 0,
      right: 100,
      bottom: 100,
      width: 100,
      height: 100,
      x: 0,
      y: 0,
      toJSON: () => {},
    })

    fireEvent.mouseMove(el, { clientX: 20, clientY: 30 })
    const follower = el.querySelector('.absolute') as HTMLElement
    expect(follower.style.transform).toBe('translate(25px, 27px)')
  })

  it('disables transition when smooth is false', () => {
    const { container } = render(
      <CursorFollow smooth={false}>
        <span>dot</span>
      </CursorFollow>
    )
    const el = container.querySelector('[data-component="cursor-follow"]')!
    const follower = el.querySelector('.absolute') as HTMLElement
    expect(follower.style.transition).toBe('')
  })
})
