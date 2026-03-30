import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { BentoGrid } from '../bento-grid'

describe('BentoGrid', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(
      <BentoGrid>
        <div>item</div>
      </BentoGrid>
    )
    expect(
      container.querySelector('[data-component="bento-grid"]')
    ).not.toBeNull()
  })

  it('renders children', () => {
    render(
      <BentoGrid>
        <span>Cell A</span>
        <span>Cell B</span>
      </BentoGrid>
    )
    expect(screen.getByText('Cell A')).toBeDefined()
    expect(screen.getByText('Cell B')).toBeDefined()
  })

  it('applies grid columns class', () => {
    const { container } = render(
      <BentoGrid columns={3}>
        <div>item</div>
      </BentoGrid>
    )
    const el = container.querySelector('[data-component="bento-grid"]')
    expect(el?.className).toContain('grid-cols-3')
  })

  it('falls back to template literal for columns > 6', () => {
    const { container } = render(
      <BentoGrid columns={8}>
        <div>item</div>
      </BentoGrid>
    )
    const el = container.querySelector('[data-component="bento-grid"]')
    expect(el?.className).toContain('grid-cols-8')
  })

  it('applies small gap', () => {
    const { container } = render(
      <BentoGrid gap="sm">
        <div>item</div>
      </BentoGrid>
    )
    const el = container.querySelector('[data-component="bento-grid"]')
    expect(el?.className).toContain('gds-gap-sm')
  })

  it('applies large gap', () => {
    const { container } = render(
      <BentoGrid gap="lg">
        <div>item</div>
      </BentoGrid>
    )
    const el = container.querySelector('[data-component="bento-grid"]')
    expect(el?.className).toContain('gds-gap-lg')
  })

  it('uses default 4 columns', () => {
    const { container } = render(
      <BentoGrid>
        <div>item</div>
      </BentoGrid>
    )
    const el = container.querySelector('[data-component="bento-grid"]')
    expect(el?.className).toContain('grid-cols-4')
  })
})
