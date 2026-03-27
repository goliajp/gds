import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { DescriptionList } from '../description-list'

const items = [
  { term: 'Name', description: 'Alice' },
  { term: 'Role', description: 'Engineer' },
  { term: 'Team', description: 'Platform' },
]

describe('DescriptionList', () => {
  it('renders terms', () => {
    render(<DescriptionList items={items} />)
    expect(screen.getByText('Name')).toBeDefined()
    expect(screen.getByText('Role')).toBeDefined()
    expect(screen.getByText('Team')).toBeDefined()
  })

  it('renders descriptions', () => {
    render(<DescriptionList items={items} />)
    expect(screen.getByText('Alice')).toBeDefined()
    expect(screen.getByText('Engineer')).toBeDefined()
  })

  it('applies horizontal layout data attribute', () => {
    const { container } = render(<DescriptionList items={items} layout="horizontal" />)
    const el = container.querySelector('[data-component="description-list"]')
    expect(el?.getAttribute('data-variant')).toBe('horizontal')
  })

  it('renders dividers by default', () => {
    const { container } = render(<DescriptionList items={items} />)
    const rows = container.querySelectorAll('[data-component="description-list"] > div')
    // first two items should have border-b, last should not
    expect(rows[0]?.className).toContain('border-b')
    expect(rows[2]?.className).not.toContain('border-b')
  })
})
