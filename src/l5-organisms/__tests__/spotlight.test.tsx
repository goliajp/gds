import { render, screen } from '@testing-library/react'
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
      <Spotlight active={false} targetRef={ref} title="Hello" />,
    )
    expect(container.querySelector('[data-component="spotlight"]')).toBeNull()
  })

  it('renders overlay when active', () => {
    const ref = makeTargetRef()
    render(<Spotlight active={true} targetRef={ref} title="Welcome" />)
    expect(document.querySelector('[data-component="spotlight"]')).not.toBeNull()
  })

  it('shows title text', () => {
    const ref = makeTargetRef()
    render(<Spotlight active={true} targetRef={ref} title="Step 1" />)
    expect(screen.getByText('Step 1')).toBeDefined()
  })

  it('applies data-component attribute', () => {
    const ref = makeTargetRef()
    render(<Spotlight active={true} targetRef={ref} />)
    expect(document.querySelector('[data-component="spotlight"]')).not.toBeNull()
  })

  it('shows description when provided', () => {
    const ref = makeTargetRef()
    render(
      <Spotlight active={true} targetRef={ref} title="T" description="Click here to continue" />,
    )
    expect(screen.getByText('Click here to continue')).toBeDefined()
  })

  it('calls onClose when clicking overlay', () => {
    const ref = makeTargetRef()
    const onClose = vi.fn()
    render(<Spotlight active={true} targetRef={ref} onClose={onClose} />)
    const overlay = document.querySelector('[data-component="spotlight"]') as HTMLElement
    overlay.click()
    expect(onClose).toHaveBeenCalledOnce()
  })
})
