import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Footer } from '../footer'

describe('Footer', () => {
  it('renders columns with links', () => {
    render(
      <Footer
        columns={[
          { title: 'Product', links: [{ label: 'Features', href: '/features' }] },
        ]}
      />,
    )
    expect(screen.getByText('Product')).toBeDefined()
    expect(screen.getByText('Features')).toBeDefined()
  })

  it('renders copyright text', () => {
    render(<Footer copyright="2026 GOLIA" />)
    expect(screen.getByText('2026 GOLIA')).toBeDefined()
  })

  it('renders logo slot', () => {
    render(<Footer logo={<span>Logo</span>} copyright="test" />)
    expect(screen.getByText('Logo')).toBeDefined()
  })

  it('has data-component="footer"', () => {
    const { container } = render(<Footer copyright="test" />)
    expect(container.querySelector('[data-component="footer"]')).not.toBeNull()
  })
})
