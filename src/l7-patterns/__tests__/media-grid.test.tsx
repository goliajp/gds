import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { MediaGrid } from '../media-grid'

describe('MediaGrid', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(
      <MediaGrid>
        <img src="a.jpg" alt="a" />
      </MediaGrid>
    )
    expect(
      container.querySelector('[data-component="media-grid"]')
    ).not.toBeNull()
  })

  it('renders children', () => {
    const { container } = render(
      <MediaGrid>
        <img src="a.jpg" alt="a" />
        <img src="b.jpg" alt="b" />
        <img src="c.jpg" alt="c" />
      </MediaGrid>
    )
    const items = container.querySelectorAll('[data-component="aspect-ratio"]')
    expect(items.length).toBe(3)
  })

  it('applies grid columns for fixed number', () => {
    const { container } = render(
      <MediaGrid columns={3}>
        <div>1</div>
      </MediaGrid>
    )
    const grid = container.querySelector('[data-component="media-grid"]')
    expect(grid?.className).toContain('grid-cols-3')
  })

  it('applies aspect ratio to children', () => {
    const { container } = render(
      <MediaGrid aspectRatio={16 / 9}>
        <div>1</div>
      </MediaGrid>
    )
    const aspectDiv = container.querySelector('[data-component="aspect-ratio"]')
    expect(aspectDiv).not.toBeNull()
  })

  it('applies responsive columns by default', () => {
    const { container } = render(
      <MediaGrid>
        <div>1</div>
      </MediaGrid>
    )
    const grid = container.querySelector('[data-component="media-grid"]')
    expect(grid?.className).toContain('sm:grid-cols-2')
    expect(grid?.className).toContain('md:grid-cols-3')
    expect(grid?.className).toContain('lg:grid-cols-4')
  })

  it('applies responsive columns with partial breakpoints', () => {
    const { container } = render(
      <MediaGrid columns={{ sm: 1, lg: 3 }}>
        <div>1</div>
      </MediaGrid>
    )
    const grid = container.querySelector('[data-component="media-grid"]')
    expect(grid?.className).toContain('sm:grid-cols-1')
    expect(grid?.className).toContain('lg:grid-cols-3')
  })

  it('applies small gap', () => {
    const { container } = render(
      <MediaGrid gap="sm">
        <div>1</div>
      </MediaGrid>
    )
    const grid = container.querySelector('[data-component="media-grid"]')
    expect(grid?.className).toContain('gds-gap-sm')
  })

  it('applies large gap', () => {
    const { container } = render(
      <MediaGrid gap="lg">
        <div>1</div>
      </MediaGrid>
    )
    const grid = container.querySelector('[data-component="media-grid"]')
    expect(grid?.className).toContain('gds-gap-lg')
  })
})
