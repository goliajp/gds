import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { BeforeAfter } from '../before-after'

describe('BeforeAfter', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<BeforeAfter before={<div>Before</div>} after={<div>After</div>} />)
    expect(container.querySelector('[data-component="before-after"]')).not.toBeNull()
  })

  it('renders before and after content', () => {
    const { container } = render(
      <BeforeAfter before={<span data-testid="b">Before</span>} after={<span data-testid="a">After</span>} />,
    )
    expect(container.querySelector('[data-testid="b"]')).not.toBeNull()
    expect(container.querySelector('[data-testid="a"]')).not.toBeNull()
  })

  it('uses default initialPosition of 50', () => {
    const { container } = render(<BeforeAfter before={<div>B</div>} after={<div>A</div>} />)
    const divider = container.querySelector('[data-component="before-after"] > div:last-child')
    expect(divider?.getAttribute('style')).toContain('50%')
  })

  it('uses custom initialPosition', () => {
    const { container } = render(
      <BeforeAfter before={<div>B</div>} after={<div>A</div>} initialPosition={30} />,
    )
    const divider = container.querySelector('[data-component="before-after"] > div:last-child')
    expect(divider?.getAttribute('style')).toContain('30%')
  })

  it('applies custom className', () => {
    const { container } = render(
      <BeforeAfter before={<div>B</div>} after={<div>A</div>} className="my-cls" />,
    )
    const el = container.querySelector('[data-component="before-after"]')
    expect(el?.className).toContain('my-cls')
  })

  it('handles pointer events for dragging', () => {
    const { container } = render(<BeforeAfter before={<div>B</div>} after={<div>A</div>} />)
    const el = container.querySelector('[data-component="before-after"]') as HTMLElement

    // pointerMove without pointerDown should not change position
    fireEvent.pointerMove(el, { clientX: 80 })
    const dividerBefore = container.querySelector('[data-component="before-after"] > div:last-child')
    expect(dividerBefore?.getAttribute('style')).toContain('50%')

    // pointerUp without prior pointerDown should be safe
    fireEvent.pointerUp(el)
  })

  it('accepts a ref via callback', () => {
    let refNode: HTMLDivElement | null = null
    render(
      <BeforeAfter
        before={<div>B</div>}
        after={<div>A</div>}
        ref={(node) => { refNode = node }}
      />,
    )
    expect(refNode).not.toBeNull()
  })
})
