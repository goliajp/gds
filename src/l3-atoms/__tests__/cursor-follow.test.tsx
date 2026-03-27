import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CursorFollow } from '../cursor-follow'

describe('CursorFollow', () => {
  it('renders children', () => {
    render(<CursorFollow><span>cursor content</span></CursorFollow>)
    expect(screen.getByText('cursor content')).toBeDefined()
  })

  it('has data-component="cursor-follow"', () => {
    const { container } = render(<CursorFollow><span>test</span></CursorFollow>)
    expect(container.querySelector('[data-component="cursor-follow"]')).not.toBeNull()
  })

  it('has a position tracking container with relative class', () => {
    const { container } = render(<CursorFollow><span>test</span></CursorFollow>)
    const el = container.querySelector('[data-component="cursor-follow"]')
    expect(el?.className).toContain('relative')
  })
})
