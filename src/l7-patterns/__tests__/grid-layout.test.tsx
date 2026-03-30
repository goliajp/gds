import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { GridLayout } from '../grid-layout'

describe('GridLayout', () => {
  it('renders children', () => {
    render(
      <GridLayout>
        <div>Item 1</div>
        <div>Item 2</div>
      </GridLayout>
    )
    expect(screen.getByText('Item 1')).toBeDefined()
    expect(screen.getByText('Item 2')).toBeDefined()
  })

  it('applies grid class', () => {
    const { container } = render(
      <GridLayout>
        <div>A</div>
      </GridLayout>
    )
    const el = container.querySelector(
      '[data-component="grid-layout"]'
    ) as HTMLElement
    expect(el.className).toContain('grid')
  })

  it('applies responsive column classes by default', () => {
    const { container } = render(
      <GridLayout>
        <div>A</div>
      </GridLayout>
    )
    const el = container.querySelector(
      '[data-component="grid-layout"]'
    ) as HTMLElement
    expect(el.className).toContain('sm:grid-cols-1')
    expect(el.className).toContain('md:grid-cols-2')
    expect(el.className).toContain('lg:grid-cols-3')
  })

  it('applies custom gap', () => {
    const { container } = render(
      <GridLayout gap="lg">
        <div>A</div>
      </GridLayout>
    )
    const el = container.querySelector(
      '[data-component="grid-layout"]'
    ) as HTMLElement
    expect(el.className).toContain('gds-gap-lg')
  })

  it('applies fixed column count', () => {
    const { container } = render(
      <GridLayout columns={4}>
        <div>A</div>
      </GridLayout>
    )
    const el = container.querySelector(
      '[data-component="grid-layout"]'
    ) as HTMLElement
    expect(el.className).toContain('grid-cols-4')
  })

  it('applies small gap', () => {
    const { container } = render(
      <GridLayout gap="sm">
        <div>A</div>
      </GridLayout>
    )
    const el = container.querySelector(
      '[data-component="grid-layout"]'
    ) as HTMLElement
    expect(el.className).toContain('gds-gap-sm')
  })

  it('falls back to template literal for columns > 6', () => {
    const { container } = render(
      <GridLayout columns={8}>
        <div>A</div>
      </GridLayout>
    )
    const el = container.querySelector(
      '[data-component="grid-layout"]'
    ) as HTMLElement
    expect(el.className).toContain('grid-cols-8')
  })

  it('handles responsive columns with xl', () => {
    const { container } = render(
      <GridLayout columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}>
        <div>A</div>
      </GridLayout>
    )
    const el = container.querySelector(
      '[data-component="grid-layout"]'
    ) as HTMLElement
    expect(el.className).toContain('xl:grid-cols-4')
    expect(el.className).toContain('grid-cols-1')
  })

  it('falls back to template literal for responsive columns > 6', () => {
    const { container } = render(
      <GridLayout columns={{ md: 8 }}>
        <div>A</div>
      </GridLayout>
    )
    const el = container.querySelector(
      '[data-component="grid-layout"]'
    ) as HTMLElement
    expect(el.className).toContain('md:grid-cols-8')
  })

  it('applies custom className', () => {
    const { container } = render(
      <GridLayout className="my-grid">
        <div>A</div>
      </GridLayout>
    )
    const el = container.querySelector(
      '[data-component="grid-layout"]'
    ) as HTMLElement
    expect(el.className).toContain('my-grid')
  })
})
