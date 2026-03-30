import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { CommandBar } from '../command-bar'

const actions = [
  { id: 'delete', label: 'Delete', danger: true },
  { id: 'archive', label: 'Archive' },
]

describe('CommandBar', () => {
  it('renders without crash when items selected', () => {
    const { container } = render(
      <CommandBar
        actions={actions}
        selectedCount={3}
        onAction={vi.fn()}
        onClear={vi.fn()}
      />
    )
    expect(
      container.querySelector('[data-component="command-bar"]')
    ).not.toBeNull()
  })

  it('returns null when selectedCount is 0', () => {
    const { container } = render(
      <CommandBar
        actions={actions}
        selectedCount={0}
        onAction={vi.fn()}
        onClear={vi.fn()}
      />
    )
    expect(container.querySelector('[data-component="command-bar"]')).toBeNull()
  })

  it('displays selected count', () => {
    render(
      <CommandBar
        actions={actions}
        selectedCount={5}
        onAction={vi.fn()}
        onClear={vi.fn()}
      />
    )
    expect(screen.getByText('5 selected')).toBeDefined()
  })

  it('renders action buttons', () => {
    render(
      <CommandBar
        actions={actions}
        selectedCount={2}
        onAction={vi.fn()}
        onClear={vi.fn()}
      />
    )
    expect(screen.getByText('Delete')).toBeDefined()
    expect(screen.getByText('Archive')).toBeDefined()
  })
})
