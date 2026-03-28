import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { MasonryGrid } from '../masonry-grid'

describe('MasonryGrid', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(
      <MasonryGrid>
        <div>A</div>
        <div>B</div>
      </MasonryGrid>,
    )
    expect(container.querySelector('[data-component="masonry-grid"]')).not.toBeNull()
  })

  it('uses default columns (3) and gap (16)', () => {
    const { container } = render(
      <MasonryGrid>
        <div>A</div>
      </MasonryGrid>,
    )
    const grid = container.querySelector('[data-component="masonry-grid"]') as HTMLElement
    expect(grid.style.columnCount).toBe('3')
    expect(grid.style.columnGap).toBe('16px')
  })

  it('applies custom columns and gap', () => {
    const { container } = render(
      <MasonryGrid columns={4} gap={24}>
        <div>A</div>
      </MasonryGrid>,
    )
    const grid = container.querySelector('[data-component="masonry-grid"]') as HTMLElement
    expect(grid.style.columnCount).toBe('4')
    expect(grid.style.columnGap).toBe('24px')
  })

  it('wraps each child in a break-inside-avoid container', () => {
    const { container } = render(
      <MasonryGrid gap={8}>
        <div>A</div>
        <div>B</div>
        <div>C</div>
      </MasonryGrid>,
    )
    const grid = container.querySelector('[data-component="masonry-grid"]') as HTMLElement
    const wrappers = grid.children
    expect(wrappers.length).toBe(3)
    const first = wrappers[0] as HTMLElement
    expect(first.style.breakInside).toBe('avoid')
    expect(first.style.marginBottom).toBe('8px')
  })

  it('applies custom className', () => {
    const { container } = render(
      <MasonryGrid className="my-class">
        <div>A</div>
      </MasonryGrid>,
    )
    const grid = container.querySelector('[data-component="masonry-grid"]')
    expect(grid?.className).toContain('my-class')
  })

  it('forwards ref', () => {
    let divRef: HTMLDivElement | null = null
    render(
      <MasonryGrid ref={(el) => { divRef = el }}>
        <div>A</div>
      </MasonryGrid>,
    )
    expect(divRef).not.toBeNull()
    expect((divRef as unknown as HTMLElement)?.tagName).toBe('DIV')
  })

  it('renders with no children', () => {
    const { container } = render(<MasonryGrid>{null}</MasonryGrid>)
    expect(container.querySelector('[data-component="masonry-grid"]')).not.toBeNull()
  })
})
