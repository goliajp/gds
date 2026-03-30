import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { TruncatedList } from '../truncated-list'

describe('TruncatedList', () => {
  it('renders with data-component', () => {
    const { container } = render(<TruncatedList items={['A', 'B']} />)
    expect(
      container.querySelector('[data-component="truncated-list"]')
    ).not.toBeNull()
  })

  it('shows all items when count <= max', () => {
    render(<TruncatedList items={['A', 'B', 'C']} max={3} />)
    expect(screen.getByText('A')).toBeDefined()
    expect(screen.getByText('B')).toBeDefined()
    expect(screen.getByText('C')).toBeDefined()
  })

  it('truncates and shows "+N more" when items exceed max', () => {
    render(<TruncatedList items={['A', 'B', 'C', 'D', 'E']} max={2} />)
    expect(screen.getByText('A')).toBeDefined()
    expect(screen.getByText('B')).toBeDefined()
    expect(screen.getByText('+3 more')).toBeDefined()
  })

  it('uses custom moreLabel function', () => {
    render(
      <TruncatedList
        items={['A', 'B', 'C', 'D']}
        max={1}
        moreLabel={(n) => `and ${n} others`}
      />
    )
    expect(screen.getByText('and 3 others')).toBeDefined()
  })

  it('does not show more label when items exactly equal max', () => {
    const { container } = render(
      <TruncatedList items={['A', 'B', 'C']} max={3} />
    )
    const moreSpan = container.querySelector('.text-fg-muted')
    expect(moreSpan).toBeNull()
  })
})
