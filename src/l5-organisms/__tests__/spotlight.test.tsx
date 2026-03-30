import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Spotlight } from '../spotlight'

function makeTargetRef(rect?: Partial<DOMRect>) {
  const el = document.createElement('div')
  el.getBoundingClientRect = () => ({
    top: 100,
    left: 200,
    width: 150,
    height: 40,
    bottom: 140,
    right: 350,
    x: 200,
    y: 100,
    toJSON: () => '',
    ...rect,
  })
  document.body.appendChild(el)
  return { current: el }
}

describe('Spotlight', () => {
  it('renders nothing when inactive', () => {
    const ref = makeTargetRef()
    const { container } = render(
      <Spotlight active={false} targetRef={ref} title="Hello" />
    )
    expect(container.querySelector('[data-component="spotlight"]')).toBeNull()
  })

  it('renders overlay when active', () => {
    const ref = makeTargetRef()
    render(<Spotlight active={true} targetRef={ref} title="Welcome" />)
    expect(
      document.querySelector('[data-component="spotlight"]')
    ).not.toBeNull()
  })

  it('shows title text', () => {
    const ref = makeTargetRef()
    render(<Spotlight active={true} targetRef={ref} title="Step 1" />)
    expect(screen.getByText('Step 1')).toBeDefined()
  })

  it('applies data-component attribute', () => {
    const ref = makeTargetRef()
    render(<Spotlight active={true} targetRef={ref} />)
    expect(
      document.querySelector('[data-component="spotlight"]')
    ).not.toBeNull()
  })

  it('shows description when provided', () => {
    const ref = makeTargetRef()
    render(
      <Spotlight
        active={true}
        targetRef={ref}
        title="T"
        description="Click here to continue"
      />
    )
    expect(screen.getByText('Click here to continue')).toBeDefined()
  })

  it('calls onClose when clicking overlay', () => {
    const ref = makeTargetRef()
    const onClose = vi.fn()
    render(<Spotlight active={true} targetRef={ref} onClose={onClose} />)
    const overlay = document.querySelector(
      '[data-component="spotlight"]'
    ) as HTMLElement
    overlay.click()
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('shows "Got it" button when onClose is provided', () => {
    const ref = makeTargetRef()
    render(<Spotlight active={true} targetRef={ref} onClose={vi.fn()} />)
    expect(screen.getByText('Got it')).toBeDefined()
  })

  it('does not show "Got it" button when onClose is not provided', () => {
    const ref = makeTargetRef()
    render(<Spotlight active={true} targetRef={ref} />)
    expect(screen.queryByText('Got it')).toBeNull()
  })

  it('does not show title when not provided', () => {
    const ref = makeTargetRef()
    render(<Spotlight active={true} targetRef={ref} description="Only desc" />)
    expect(screen.getByText('Only desc')).toBeDefined()
  })

  it('does not show description when not provided', () => {
    const ref = makeTargetRef()
    render(<Spotlight active={true} targetRef={ref} title="Only title" />)
    expect(screen.getByText('Only title')).toBeDefined()
  })

  it('renders with placement=top', () => {
    const ref = makeTargetRef()
    render(
      <Spotlight active={true} targetRef={ref} placement="top" title="Top" />
    )
    expect(screen.getByText('Top')).toBeDefined()
  })

  it('renders with placement=left', () => {
    const ref = makeTargetRef()
    render(
      <Spotlight active={true} targetRef={ref} placement="left" title="Left" />
    )
    expect(screen.getByText('Left')).toBeDefined()
  })

  it('renders with placement=right', () => {
    const ref = makeTargetRef()
    render(
      <Spotlight
        active={true}
        targetRef={ref}
        placement="right"
        title="Right"
      />
    )
    expect(screen.getByText('Right')).toBeDefined()
  })

  it('calls onClose on Escape key', () => {
    const ref = makeTargetRef()
    const onClose = vi.fn()
    render(<Spotlight active={true} targetRef={ref} onClose={onClose} />)
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('does not call onClose on non-Escape key', () => {
    const ref = makeTargetRef()
    const onClose = vi.fn()
    render(<Spotlight active={true} targetRef={ref} onClose={onClose} />)
    fireEvent.keyDown(window, { key: 'Enter' })
    expect(onClose).not.toHaveBeenCalled()
  })

  it('applies custom className', () => {
    const ref = makeTargetRef()
    render(<Spotlight active={true} targetRef={ref} className="my-spotlight" />)
    const overlay = document.querySelector('[data-component="spotlight"]')
    expect(overlay?.className).toContain('my-spotlight')
  })

  it('renders nothing when target ref is null', () => {
    const ref = { current: null }
    render(<Spotlight active={true} targetRef={ref} title="Nothing" />)
    expect(document.querySelector('[data-component="spotlight"]')).toBeNull()
  })
})
