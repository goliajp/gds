import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { DropZone } from '../drop-zone'

describe('DropZone', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<DropZone onDrop={vi.fn()} />)
    expect(
      container.querySelector('[data-component="drop-zone"]')
    ).not.toBeNull()
  })

  it('renders default text when no children provided', () => {
    render(<DropZone onDrop={vi.fn()} />)
    expect(screen.getByText('Drop files here')).toBeDefined()
  })

  it('renders custom children instead of default text', () => {
    render(
      <DropZone onDrop={vi.fn()}>
        <span>Custom content</span>
      </DropZone>
    )
    expect(screen.getByText('Custom content')).toBeDefined()
    expect(screen.queryByText('Drop files here')).toBeNull()
  })

  it('renders accept hint when accept is provided', () => {
    render(<DropZone onDrop={vi.fn()} accept=".png, .jpg" />)
    expect(screen.getByText('.png, .jpg')).toBeDefined()
  })

  it('does not render accept hint when accept is undefined', () => {
    const { container } = render(<DropZone onDrop={vi.fn()} />)
    const hints = container.querySelectorAll('.text-xs')
    expect(hints.length).toBe(0)
  })

  it('has idle state by default', () => {
    const { container } = render(<DropZone onDrop={vi.fn()} />)
    const el = container.querySelector('[data-component="drop-zone"]')
    expect(el?.getAttribute('data-state')).toBe('idle')
  })

  it('has active state when active prop is true', () => {
    const { container } = render(<DropZone onDrop={vi.fn()} active />)
    const el = container.querySelector('[data-component="drop-zone"]')
    expect(el?.getAttribute('data-state')).toBe('active')
  })

  it('becomes active on dragOver and idle on dragLeave', () => {
    const { container } = render(<DropZone onDrop={vi.fn()} />)
    const el = container.querySelector(
      '[data-component="drop-zone"]'
    ) as HTMLElement

    fireEvent.dragOver(el)
    expect(el.getAttribute('data-state')).toBe('active')

    fireEvent.dragLeave(el)
    expect(el.getAttribute('data-state')).toBe('idle')
  })

  it('calls onDrop with files on drop event', () => {
    const onDrop = vi.fn()
    const { container } = render(<DropZone onDrop={onDrop} />)
    const el = container.querySelector(
      '[data-component="drop-zone"]'
    ) as HTMLElement

    const file = new File(['content'], 'test.txt', { type: 'text/plain' })
    fireEvent.drop(el, { dataTransfer: { files: [file] } })

    expect(onDrop).toHaveBeenCalledOnce()
    expect(onDrop.mock.calls[0][0]).toHaveLength(1)
    expect(onDrop.mock.calls[0][0][0].name).toBe('test.txt')
  })

  it('resets to idle after drop', () => {
    const { container } = render(<DropZone onDrop={vi.fn()} />)
    const el = container.querySelector(
      '[data-component="drop-zone"]'
    ) as HTMLElement

    fireEvent.dragOver(el)
    expect(el.getAttribute('data-state')).toBe('active')

    const file = new File(['content'], 'test.txt', { type: 'text/plain' })
    fireEvent.drop(el, { dataTransfer: { files: [file] } })
    expect(el.getAttribute('data-state')).toBe('idle')
  })

  it('applies glass class when glass is true', () => {
    const { container } = render(<DropZone onDrop={vi.fn()} glass />)
    const el = container.querySelector('[data-component="drop-zone"]')
    expect(el?.className).toContain('gds-glass')
  })

  it('applies custom className', () => {
    const { container } = render(
      <DropZone onDrop={vi.fn()} className="my-cls" />
    )
    const el = container.querySelector('[data-component="drop-zone"]')
    expect(el?.className).toContain('my-cls')
  })
})
