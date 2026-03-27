import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { MediaGrid } from '../media-grid'

describe('MediaGrid', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(
      <MediaGrid>
        <img src="a.jpg" alt="a" />
      </MediaGrid>,
    )
    expect(container.querySelector('[data-component="media-grid"]')).not.toBeNull()
  })

  it('renders children', () => {
    const { container } = render(
      <MediaGrid>
        <img src="a.jpg" alt="a" />
        <img src="b.jpg" alt="b" />
        <img src="c.jpg" alt="c" />
      </MediaGrid>,
    )
    const items = container.querySelectorAll('[data-component="aspect-ratio"]')
    expect(items.length).toBe(3)
  })

  it('applies grid columns for fixed number', () => {
    const { container } = render(
      <MediaGrid columns={3}>
        <div>1</div>
      </MediaGrid>,
    )
    const grid = container.querySelector('[data-component="media-grid"]')
    expect(grid?.className).toContain('grid-cols-3')
  })

  it('applies aspect ratio to children', () => {
    const { container } = render(
      <MediaGrid aspectRatio={16 / 9}>
        <div>1</div>
      </MediaGrid>,
    )
    const aspectDiv = container.querySelector('[data-component="aspect-ratio"]')
    expect(aspectDiv).not.toBeNull()
  })
})
