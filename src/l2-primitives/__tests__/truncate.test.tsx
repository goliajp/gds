import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Truncate } from '../truncate'

describe('Truncate', () => {
  it('applies truncate class for single line', () => {
    const { container } = render(<Truncate>long text here</Truncate>)
    const el = container.querySelector('[data-component="truncate"]')
    expect(el?.className).toContain('truncate')
  })

  it('applies line-clamp styles for multi-line', () => {
    const { container } = render(<Truncate lines={3}>multi line text</Truncate>)
    const el = container.querySelector('[data-component="truncate"]') as HTMLElement
    // jsdom doesn't fully support -webkit-box in style object, check overflow instead
    expect(el.style.overflow).toBe('hidden')
    // should not have single-line truncate class
    expect(el.className).not.toContain('truncate')
  })

  it('expands on click when expandable', () => {
    const { container } = render(
      <Truncate lines={2} expandable>
        expandable text
      </Truncate>,
    )
    const el = container.querySelector('[data-component="truncate"]') as HTMLElement
    // initially clamped — has overflow hidden
    expect(el.style.overflow).toBe('hidden')
    // click to expand
    fireEvent.click(el)
    expect(el.getAttribute('data-expanded')).toBe('true')
    // styles should be removed when expanded (no inline style)
    expect(el.style.overflow).toBe('')
  })

  it('has data-component attribute', () => {
    const { container } = render(<Truncate>text</Truncate>)
    expect(container.querySelector('[data-component="truncate"]')).toBeInTheDocument()
  })
})
