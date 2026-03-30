import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { PageNav } from '../page-nav'

describe('PageNav', () => {
  it('renders with data-component', () => {
    const { container } = render(<PageNav />)
    expect(
      container.querySelector('[data-component="page-nav"]')
    ).not.toBeNull()
  })

  it('renders prev and next labels', () => {
    render(<PageNav prev={{ label: 'Back' }} next={{ label: 'Forward' }} />)
    expect(screen.getByText('Back')).toBeDefined()
    expect(screen.getByText('Forward')).toBeDefined()
  })

  it('renders only next when prev is not provided', () => {
    render(<PageNav next={{ label: 'Next Page' }} />)
    expect(screen.getByText('Next Page')).toBeDefined()
    expect(screen.queryByText('Back')).toBeNull()
  })
})
