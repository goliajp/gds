import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { GridLayout } from '../grid-layout'

describe('GridLayout', () => {
  it('renders children', () => {
    render(
      <GridLayout>
        <div>Item 1</div>
        <div>Item 2</div>
      </GridLayout>,
    )
    expect(screen.getByText('Item 1')).toBeDefined()
    expect(screen.getByText('Item 2')).toBeDefined()
  })

  it('applies grid class', () => {
    const { container } = render(
      <GridLayout><div>A</div></GridLayout>,
    )
    const el = container.querySelector('[data-component="grid-layout"]') as HTMLElement
    expect(el.className).toContain('grid')
  })

  it('applies responsive column classes by default', () => {
    const { container } = render(
      <GridLayout><div>A</div></GridLayout>,
    )
    const el = container.querySelector('[data-component="grid-layout"]') as HTMLElement
    expect(el.className).toContain('sm:grid-cols-1')
    expect(el.className).toContain('md:grid-cols-2')
    expect(el.className).toContain('lg:grid-cols-3')
  })

  it('applies custom gap', () => {
    const { container } = render(
      <GridLayout gap="lg"><div>A</div></GridLayout>,
    )
    const el = container.querySelector('[data-component="grid-layout"]') as HTMLElement
    expect(el.className).toContain('gds-gap-lg')
  })
})
