import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Breadcrumb } from '../breadcrumb'

describe('Breadcrumb', () => {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Detail' },
  ]

  it('renders without crash', () => {
    const { container } = render(<Breadcrumb items={items} />)
    expect(
      container.querySelector('[data-component="breadcrumb"]')
    ).not.toBeNull()
  })

  it('has aria-label="Breadcrumb"', () => {
    render(<Breadcrumb items={items} />)
    expect(screen.getByLabelText('Breadcrumb')).toBeDefined()
  })

  it('renders all items', () => {
    render(<Breadcrumb items={items} />)
    expect(screen.getByText('Home')).toBeDefined()
    expect(screen.getByText('Products')).toBeDefined()
    expect(screen.getByText('Detail')).toBeDefined()
  })

  it('renders links for items with href', () => {
    const { container } = render(<Breadcrumb items={items} />)
    const links = container.querySelectorAll('a')
    expect(links.length).toBe(2)
    expect(links[0].getAttribute('href')).toBe('/')
  })

  it('collapses with ellipsis when maxItems is set', () => {
    const manyItems = [
      { label: 'A', href: '/a' },
      { label: 'B', href: '/b' },
      { label: 'C', href: '/c' },
      { label: 'D' },
    ]
    render(<Breadcrumb items={manyItems} maxItems={2} />)
    expect(screen.getByText('A')).toBeDefined()
    expect(screen.getByText('...')).toBeDefined()
    expect(screen.getByText('D')).toBeDefined()
    expect(screen.queryByText('B')).toBeNull()
  })
})
