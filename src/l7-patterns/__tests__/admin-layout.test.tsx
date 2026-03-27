import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AdminLayout } from '../admin-layout'

describe('AdminLayout', () => {
  it('renders with data-component', () => {
    const { container } = render(
      <AdminLayout sidebar={<nav>Menu</nav>}>Content</AdminLayout>,
    )
    expect(container.querySelector('[data-component="admin-layout"]')).not.toBeNull()
  })

  it('renders sidebar and content', () => {
    render(<AdminLayout sidebar={<nav>Side</nav>}>Main</AdminLayout>)
    expect(screen.getByText('Side')).toBeDefined()
    expect(screen.getByText('Main')).toBeDefined()
  })

  it('renders topbar when provided', () => {
    render(
      <AdminLayout sidebar={<nav>Side</nav>} topbar={<div>Top Bar</div>}>
        Main
      </AdminLayout>,
    )
    expect(screen.getByText('Top Bar')).toBeDefined()
  })
})
