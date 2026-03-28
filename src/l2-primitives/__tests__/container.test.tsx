import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Container, containerVariants } from '../container'

describe('Container', () => {
  it('renders without crash', () => {
    const { container } = render(<Container>content</Container>)
    expect(container.querySelector('[data-component="container"]')).toBeTruthy()
  })

  it('has data-component attribute', () => {
    const { container } = render(<Container>content</Container>)
    const el = container.querySelector('[data-component="container"]')
    expect(el!.getAttribute('data-component')).toBe('container')
  })

  it('renders children', () => {
    const { container } = render(<Container><span>hello</span></Container>)
    const el = container.querySelector('[data-component="container"]')
    expect(el!.textContent).toBe('hello')
  })

  it('applies default size variant (md)', () => {
    const { container } = render(<Container>content</Container>)
    const el = container.querySelector('[data-component="container"]')
    expect(el!.getAttribute('class')).toContain('max-w-screen-md')
  })

  it('applies sm size variant', () => {
    const { container } = render(<Container size="sm">content</Container>)
    const el = container.querySelector('[data-component="container"]')
    expect(el!.getAttribute('class')).toContain('max-w-screen-sm')
  })

  it('applies lg size variant', () => {
    const { container } = render(<Container size="lg">content</Container>)
    const el = container.querySelector('[data-component="container"]')
    expect(el!.getAttribute('class')).toContain('max-w-screen-lg')
  })

  it('applies xl size variant', () => {
    const { container } = render(<Container size="xl">content</Container>)
    const el = container.querySelector('[data-component="container"]')
    expect(el!.getAttribute('class')).toContain('max-w-screen-xl')
  })

  it('applies full size variant', () => {
    const { container } = render(<Container size="full">content</Container>)
    const el = container.querySelector('[data-component="container"]')
    expect(el!.getAttribute('class')).toContain('max-w-full')
  })

  it('has base classes on all variants', () => {
    const { container } = render(<Container>content</Container>)
    const el = container.querySelector('[data-component="container"]')
    const cls = el!.getAttribute('class')
    expect(cls).toContain('mx-auto')
    expect(cls).toContain('w-full')
    expect(cls).toContain('px-4')
  })

  it('merges className', () => {
    const { container } = render(<Container className="extra">content</Container>)
    const el = container.querySelector('[data-component="container"]')
    expect(el!.getAttribute('class')).toContain('extra')
  })

  it('forwards ref', () => {
    let el: HTMLDivElement | null = null
    render(<Container ref={(node) => { el = node }}>content</Container>)
    expect(el).toBeTruthy()
    expect(el!.tagName.toLowerCase()).toBe('div')
  })

  it('spreads additional HTML attributes', () => {
    const { container } = render(<Container data-testid="ctr" aria-label="wrapper">content</Container>)
    const el = container.querySelector('[data-component="container"]')
    expect(el!.getAttribute('data-testid')).toBe('ctr')
    expect(el!.getAttribute('aria-label')).toBe('wrapper')
  })
})

describe('containerVariants', () => {
  it('returns default variant classes', () => {
    const cls = containerVariants()
    expect(cls).toContain('max-w-screen-md')
    expect(cls).toContain('mx-auto')
  })

  it('returns sm variant classes', () => {
    expect(containerVariants({ size: 'sm' })).toContain('max-w-screen-sm')
  })

  it('returns lg variant classes', () => {
    expect(containerVariants({ size: 'lg' })).toContain('max-w-screen-lg')
  })

  it('returns xl variant classes', () => {
    expect(containerVariants({ size: 'xl' })).toContain('max-w-screen-xl')
  })

  it('returns full variant classes', () => {
    expect(containerVariants({ size: 'full' })).toContain('max-w-full')
  })
})
