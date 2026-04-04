import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { PageHeader } from '../page-header'

describe('PageHeader', () => {
  it('renders title', () => {
    render(<PageHeader title="Users" />)
    expect(screen.getByText('Users')).toBeDefined()
  })

  it('renders subtitle', () => {
    render(<PageHeader title="Users" subtitle="Manage team members" />)
    expect(screen.getByText('Manage team members')).toBeDefined()
  })

  it('renders breadcrumb navigation', () => {
    render(
      <PageHeader
        title="Detail"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Users' }]}
      />
    )
    expect(screen.getByLabelText('Breadcrumb')).toBeDefined()
    expect(screen.getByText('Home')).toBeDefined()
    expect(screen.getByText('Users')).toBeDefined()
  })

  it('renders actions slot', () => {
    render(<PageHeader title="Users" actions={<button>Add user</button>} />)
    expect(screen.getByText('Add user')).toBeDefined()
  })
})
