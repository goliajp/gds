import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

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
    expect(el.style.overflow).toBe('hidden')
    expect(el.className).not.toContain('truncate')
  })

  it('calls onToggle on click when controlled', () => {
    const onToggle = vi.fn()
    const { container } = render(
      <Truncate lines={2} onToggle={onToggle}>
        controlled text
      </Truncate>,
    )
    const el = container.querySelector('[data-component="truncate"]') as HTMLElement
    expect(el.style.overflow).toBe('hidden')
    fireEvent.click(el)
    expect(onToggle).toHaveBeenCalledOnce()
  })

  it('removes clamp when expanded is true', () => {
    const { container } = render(
      <Truncate lines={2} expanded onToggle={() => {}}>
        expanded text
      </Truncate>,
    )
    const el = container.querySelector('[data-component="truncate"]') as HTMLElement
    expect(el.getAttribute('data-expanded')).toBe('true')
    expect(el.style.overflow).toBe('')
  })

  it('has data-component attribute', () => {
    const { container } = render(<Truncate>text</Truncate>)
    expect(container.querySelector('[data-component="truncate"]')).toBeInTheDocument()
  })
})
