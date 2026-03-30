import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ResponsiveStack } from '../responsive-stack'

describe('ResponsiveStack', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(
      <ResponsiveStack>
        <div>child</div>
      </ResponsiveStack>
    )
    expect(
      container.querySelector('[data-component="responsive-stack"]')
    ).not.toBeNull()
  })

  it('renders children', () => {
    render(
      <ResponsiveStack>
        <div>Alpha</div>
        <div>Beta</div>
      </ResponsiveStack>
    )
    expect(screen.getByText('Alpha')).toBeDefined()
    expect(screen.getByText('Beta')).toBeDefined()
  })

  it('applies default breakpoint (md), gap (default), and align (stretch)', () => {
    const { container } = render(
      <ResponsiveStack>
        <div>child</div>
      </ResponsiveStack>
    )
    const root = container.querySelector('[data-component="responsive-stack"]')
    expect(root?.className).toContain('md:flex-row')
    expect(root?.className).toContain('gap-4')
    expect(root?.className).toContain('items-stretch')
  })

  it('applies sm breakpoint', () => {
    const { container } = render(
      <ResponsiveStack breakpoint="sm">
        <div>child</div>
      </ResponsiveStack>
    )
    const root = container.querySelector('[data-component="responsive-stack"]')
    expect(root?.className).toContain('sm:flex-row')
  })

  it('applies lg breakpoint', () => {
    const { container } = render(
      <ResponsiveStack breakpoint="lg">
        <div>child</div>
      </ResponsiveStack>
    )
    const root = container.querySelector('[data-component="responsive-stack"]')
    expect(root?.className).toContain('lg:flex-row')
  })

  it('applies sm gap', () => {
    const { container } = render(
      <ResponsiveStack gap="sm">
        <div>child</div>
      </ResponsiveStack>
    )
    const root = container.querySelector('[data-component="responsive-stack"]')
    expect(root?.className).toContain('gap-2')
  })

  it('applies lg gap', () => {
    const { container } = render(
      <ResponsiveStack gap="lg">
        <div>child</div>
      </ResponsiveStack>
    )
    const root = container.querySelector('[data-component="responsive-stack"]')
    expect(root?.className).toContain('gap-6')
  })

  it('applies start alignment', () => {
    const { container } = render(
      <ResponsiveStack align="start">
        <div>child</div>
      </ResponsiveStack>
    )
    const root = container.querySelector('[data-component="responsive-stack"]')
    expect(root?.className).toContain('items-start')
  })

  it('applies center alignment', () => {
    const { container } = render(
      <ResponsiveStack align="center">
        <div>child</div>
      </ResponsiveStack>
    )
    const root = container.querySelector('[data-component="responsive-stack"]')
    expect(root?.className).toContain('items-center')
  })

  it('applies end alignment', () => {
    const { container } = render(
      <ResponsiveStack align="end">
        <div>child</div>
      </ResponsiveStack>
    )
    const root = container.querySelector('[data-component="responsive-stack"]')
    expect(root?.className).toContain('items-end')
  })

  it('applies custom className', () => {
    const { container } = render(
      <ResponsiveStack className="extra">
        <div>child</div>
      </ResponsiveStack>
    )
    const root = container.querySelector('[data-component="responsive-stack"]')
    expect(root?.className).toContain('extra')
  })

  it('always includes flex and flex-col base classes', () => {
    const { container } = render(
      <ResponsiveStack>
        <div>child</div>
      </ResponsiveStack>
    )
    const root = container.querySelector('[data-component="responsive-stack"]')
    expect(root?.className).toContain('flex')
    expect(root?.className).toContain('flex-col')
  })

  it('forwards ref', () => {
    let divRef: HTMLDivElement | null = null
    render(
      <ResponsiveStack
        ref={(el) => {
          divRef = el
        }}
      >
        <div>child</div>
      </ResponsiveStack>
    )
    expect(divRef).not.toBeNull()
    expect((divRef as unknown as HTMLElement)?.tagName).toBe('DIV')
  })
})
