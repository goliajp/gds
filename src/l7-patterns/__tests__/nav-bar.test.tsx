import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { NavBar } from '../nav-bar'

describe('NavBar', () => {
  it('renders logo slot', () => {
    render(<NavBar logo={<span>Brand</span>} />)
    expect(screen.getByText('Brand')).toBeDefined()
  })

  it('renders links with active state', () => {
    render(
      <NavBar
        links={[
          { label: 'Home', href: '/', active: true },
          { label: 'About', href: '/about' },
        ]}
      />
    )
    expect(screen.getByText('Home')).toBeDefined()
    expect(screen.getByText('About')).toBeDefined()
  })

  it('renders actions slot', () => {
    render(<NavBar actions={<button>Sign In</button>} />)
    expect(screen.getByText('Sign In')).toBeDefined()
  })

  it('has sticky class by default', () => {
    const { container } = render(<NavBar logo={<span>X</span>} />)
    const el = container.querySelector('[data-component="nav-bar"]')
    expect(el?.className).toContain('sticky')
  })
})
