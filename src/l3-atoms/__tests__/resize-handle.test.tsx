import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { ResizeHandle } from '../resize-handle'

describe('ResizeHandle', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<ResizeHandle onResize={vi.fn()} />)
    expect(
      container.querySelector('[data-component="resize-handle"]')
    ).not.toBeNull()
  })

  it('has cursor-col-resize class for vertical orientation', () => {
    const { container } = render(
      <ResizeHandle onResize={vi.fn()} orientation="vertical" />
    )
    const el = container.querySelector('[data-component="resize-handle"]')
    expect(el?.className).toContain('cursor-col-resize')
  })

  it('has cursor-row-resize class for horizontal orientation', () => {
    const { container } = render(
      <ResizeHandle onResize={vi.fn()} orientation="horizontal" />
    )
    const el = container.querySelector('[data-component="resize-handle"]')
    expect(el?.className).toContain('cursor-row-resize')
  })

  it('applies disabled styling when disabled', () => {
    const { container } = render(<ResizeHandle onResize={vi.fn()} disabled />)
    const el = container.querySelector('[data-component="resize-handle"]')
    expect(el?.className).toContain('pointer-events-none')
    expect(el?.className).toContain('opacity-40')
  })

  it('defaults to vertical orientation', () => {
    const { container } = render(<ResizeHandle onResize={vi.fn()} />)
    const el = container.querySelector('[data-component="resize-handle"]')
    expect(el?.getAttribute('data-orientation')).toBe('vertical')
  })

  it('sets aria-orientation attribute', () => {
    const { container } = render(
      <ResizeHandle onResize={vi.fn()} orientation="horizontal" />
    )
    const el = container.querySelector('[data-component="resize-handle"]')
    expect(el?.getAttribute('aria-orientation')).toBe('horizontal')
  })

  it('has role="separator"', () => {
    const { container } = render(<ResizeHandle onResize={vi.fn()} />)
    const el = container.querySelector('[data-component="resize-handle"]')
    expect(el?.getAttribute('role')).toBe('separator')
  })

  it('calls onResize during mouse drag (vertical)', () => {
    const onResize = vi.fn()
    const { container } = render(
      <ResizeHandle onResize={onResize} orientation="vertical" />
    )
    const el = container.querySelector('[data-component="resize-handle"]')!

    fireEvent.mouseDown(el, { clientX: 100, clientY: 50 })
    fireEvent.mouseMove(document, { clientX: 110, clientY: 50 })
    expect(onResize).toHaveBeenCalledWith(10)

    fireEvent.mouseMove(document, { clientX: 105, clientY: 50 })
    expect(onResize).toHaveBeenCalledWith(-5)
  })

  it('calls onResize during mouse drag (horizontal)', () => {
    const onResize = vi.fn()
    const { container } = render(
      <ResizeHandle onResize={onResize} orientation="horizontal" />
    )
    const el = container.querySelector('[data-component="resize-handle"]')!

    fireEvent.mouseDown(el, { clientX: 50, clientY: 100 })
    fireEvent.mouseMove(document, { clientX: 50, clientY: 120 })
    expect(onResize).toHaveBeenCalledWith(20)
  })

  it('calls onResizeEnd on mouseUp', () => {
    const onResizeEnd = vi.fn()
    const { container } = render(
      <ResizeHandle onResize={vi.fn()} onResizeEnd={onResizeEnd} />
    )
    const el = container.querySelector('[data-component="resize-handle"]')!

    fireEvent.mouseDown(el, { clientX: 100, clientY: 50 })
    fireEvent.mouseUp(document)
    expect(onResizeEnd).toHaveBeenCalledOnce()
  })

  it('does not start drag when disabled', () => {
    const onResize = vi.fn()
    const { container } = render(<ResizeHandle onResize={onResize} disabled />)
    const el = container.querySelector('[data-component="resize-handle"]')!

    fireEvent.mouseDown(el, { clientX: 100, clientY: 50 })
    fireEvent.mouseMove(document, { clientX: 110, clientY: 50 })
    expect(onResize).not.toHaveBeenCalled()
  })

  it('removes event listeners on mouseUp', () => {
    const onResize = vi.fn()
    const { container } = render(<ResizeHandle onResize={onResize} />)
    const el = container.querySelector('[data-component="resize-handle"]')!

    fireEvent.mouseDown(el, { clientX: 100, clientY: 50 })
    fireEvent.mouseUp(document)

    // after mouseUp, further mouseMove should not trigger onResize
    onResize.mockClear()
    fireEvent.mouseMove(document, { clientX: 200, clientY: 50 })
    expect(onResize).not.toHaveBeenCalled()
  })

  it('applies custom className', () => {
    const { container } = render(
      <ResizeHandle onResize={vi.fn()} className="my-handle" />
    )
    const el = container.querySelector('[data-component="resize-handle"]')
    expect(el?.className).toContain('my-handle')
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<ResizeHandle onResize={vi.fn()} ref={ref} />)
    expect(ref.current).not.toBeNull()
    expect(ref.current?.getAttribute('data-component')).toBe('resize-handle')
  })

  it('spreads additional props to root element', () => {
    const { container } = render(
      <ResizeHandle onResize={vi.fn()} data-custom="test" />
    )
    const el = container.querySelector('[data-component="resize-handle"]')
    expect(el?.getAttribute('data-custom')).toBe('test')
  })

  it('renders inner bar with correct orientation classes', () => {
    const { container } = render(
      <ResizeHandle onResize={vi.fn()} orientation="horizontal" />
    )
    const inner = container.querySelector(
      '[data-component="resize-handle"] > div'
    )
    expect(inner?.className).toContain('h-0.5')
    expect(inner?.className).toContain('w-full')
  })
})
