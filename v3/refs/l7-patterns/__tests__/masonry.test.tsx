import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Masonry } from '../masonry'

describe('Masonry', () => {
  it('renders children', () => {
    render(
      <Masonry>
        <div>Item 1</div>
        <div>Item 2</div>
      </Masonry>
    )
    expect(screen.getByText('Item 1')).toBeDefined()
    expect(screen.getByText('Item 2')).toBeDefined()
  })

  it('applies column-count via inline style', () => {
    const { container } = render(
      <Masonry columns={4}>
        <div>A</div>
      </Masonry>
    )
    const el = container.querySelector(
      '[data-component="masonry"]'
    ) as HTMLElement
    expect(el.style.columnCount).toBe('4')
  })

  it('applies custom gap', () => {
    const { container } = render(
      <Masonry gap={24}>
        <div>A</div>
      </Masonry>
    )
    const el = container.querySelector(
      '[data-component="masonry"]'
    ) as HTMLElement
    expect(el.style.columnGap).toBe('24px')
  })

  it('applies data-component attribute', () => {
    const { container } = render(
      <Masonry>
        <div>A</div>
      </Masonry>
    )
    expect(container.querySelector('[data-component="masonry"]')).not.toBeNull()
  })
})
