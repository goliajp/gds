import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { DashboardLayout } from '../dashboard-layout'

describe('DashboardLayout', () => {
  it('has data-component="dashboard-layout"', () => {
    const { container } = render(
      <DashboardLayout sidebar={<nav>Menu</nav>}>Content</DashboardLayout>,
    )
    expect(container.querySelector('[data-component="dashboard-layout"]')).not.toBeNull()
  })

  it('renders sidebar and content', () => {
    render(<DashboardLayout sidebar={<nav>Side</nav>}>Main</DashboardLayout>)
    expect(screen.getByText('Side')).toBeDefined()
    expect(screen.getByText('Main')).toBeDefined()
  })

  it('renders header when provided', () => {
    render(
      <DashboardLayout sidebar={<nav>Side</nav>} header={<div>Top Bar</div>}>
        Main
      </DashboardLayout>,
    )
    expect(screen.getByText('Top Bar')).toBeDefined()
  })
})
