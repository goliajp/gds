import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Watermark } from '../watermark'

describe('Watermark', () => {
  it('renders with data-component', () => {
    const { container } = render(<Watermark text="DRAFT">Content</Watermark>)
    expect(container.querySelector('[data-component="watermark"]')).not.toBeNull()
  })

  it('renders children', () => {
    const { getByText } = render(<Watermark text="DRAFT"><p>Hello</p></Watermark>)
    expect(getByText('Hello')).toBeDefined()
  })

  it('renders watermark text 64 times', () => {
    const { container } = render(<Watermark text="SECRET">Content</Watermark>)
    const spans = container.querySelectorAll('span.text-lg')
    expect(spans.length).toBe(64)
    spans.forEach((span) => {
      expect(span.textContent).toBe('SECRET')
    })
  })

  it('applies default opacity of 0.1', () => {
    const { container } = render(<Watermark text="DRAFT">Content</Watermark>)
    const overlay = container.querySelector('.pointer-events-none') as HTMLElement
    expect(overlay.style.opacity).toBe('0.1')
  })

  it('applies custom opacity', () => {
    const { container } = render(<Watermark text="DRAFT" opacity={0.3}>Content</Watermark>)
    const overlay = container.querySelector('.pointer-events-none') as HTMLElement
    expect(overlay.style.opacity).toBe('0.3')
  })

  it('applies -30deg rotation to inner container', () => {
    const { container } = render(<Watermark text="DRAFT">Content</Watermark>)
    const inner = container.querySelector('.absolute.inset-\\[-50\\%\\]') as HTMLElement
    expect(inner.style.transform).toBe('rotate(-30deg)')
  })

  it('merges custom className', () => {
    const { container } = render(<Watermark text="DRAFT" className="extra">C</Watermark>)
    const el = container.querySelector('[data-component="watermark"]')!
    expect(el.className).toContain('extra')
  })

  it('overlay is not interactive', () => {
    const { container } = render(<Watermark text="DRAFT">Content</Watermark>)
    const overlay = container.querySelector('.pointer-events-none')
    expect(overlay).not.toBeNull()
    expect(overlay!.className).toContain('select-none')
  })
})
