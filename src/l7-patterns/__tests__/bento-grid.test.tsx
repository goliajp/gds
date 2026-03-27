import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { BentoGrid } from '../bento-grid'

describe('BentoGrid', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<BentoGrid><div>item</div></BentoGrid>)
    expect(container.querySelector('[data-component="bento-grid"]')).not.toBeNull()
  })

  it('renders children', () => {
    render(<BentoGrid><span>Cell A</span><span>Cell B</span></BentoGrid>)
    expect(screen.getByText('Cell A')).toBeDefined()
    expect(screen.getByText('Cell B')).toBeDefined()
  })

  it('applies grid columns class', () => {
    const { container } = render(<BentoGrid columns={3}><div>item</div></BentoGrid>)
    const el = container.querySelector('[data-component="bento-grid"]')
    expect(el?.className).toContain('grid-cols-3')
  })
})
