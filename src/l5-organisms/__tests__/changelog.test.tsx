import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Changelog } from '../changelog'

const entries = [
  {
    version: 'v1.2.0',
    date: '2026-03-01',
    changes: [
      { type: 'added' as const, text: 'New login form' },
      { type: 'fixed' as const, text: 'Button alignment' },
    ],
  },
  {
    version: 'v1.1.0',
    date: '2026-02-15',
    changes: [{ type: 'changed' as const, text: 'Updated color tokens' }],
  },
]

describe('Changelog', () => {
  it('has data-component="changelog"', () => {
    const { container } = render(<Changelog entries={entries} />)
    expect(
      container.querySelector('[data-component="changelog"]')
    ).not.toBeNull()
  })

  it('renders version numbers', () => {
    render(<Changelog entries={entries} />)
    expect(screen.getByText('v1.2.0')).toBeDefined()
    expect(screen.getByText('v1.1.0')).toBeDefined()
  })

  it('renders dates', () => {
    render(<Changelog entries={entries} />)
    expect(screen.getByText('2026-03-01')).toBeDefined()
    expect(screen.getByText('2026-02-15')).toBeDefined()
  })

  it('renders change descriptions with type tags', () => {
    render(<Changelog entries={entries} />)
    expect(screen.getByText('New login form')).toBeDefined()
    expect(screen.getByText('Button alignment')).toBeDefined()
    expect(screen.getByText('Updated color tokens')).toBeDefined()
  })
})
