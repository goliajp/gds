import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { FilterBar } from '../filter-bar'

const filters = [
  { id: 'a', label: 'Alpha', active: false },
  { id: 'b', label: 'Beta', active: true },
  { id: 'c', label: 'Gamma', active: false },
]

describe('FilterBar', () => {
  it('renders all filter chips', () => {
    render(<FilterBar filters={filters} onChange={vi.fn()} />)
    expect(screen.getByText('Alpha')).toBeTruthy()
    expect(screen.getByText('Beta')).toBeTruthy()
    expect(screen.getByText('Gamma')).toBeTruthy()
  })

  it('calls onChange with correct id when chip clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<FilterBar filters={filters} onChange={onChange} />)
    await user.click(screen.getByText('Alpha'))
    expect(onChange).toHaveBeenCalledWith('a', true)
  })

  it('renders clear button when active filters exist and onClear provided', () => {
    render(<FilterBar filters={filters} onChange={vi.fn()} onClear={vi.fn()} />)
    expect(screen.getByText('Clear all')).toBeTruthy()
  })

  it('does not render clear button when no filters active', () => {
    const inactive = filters.map((f) => ({ ...f, active: false }))
    render(
      <FilterBar filters={inactive} onChange={vi.fn()} onClear={vi.fn()} />
    )
    expect(screen.queryByText('Clear all')).toBeNull()
  })
})
