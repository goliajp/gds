import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { TimeSince } from '../time-since'

describe('TimeSince', () => {
  it('renders with data-component', () => {
    const { container } = render(<TimeSince date={Date.now()} />)
    expect(container.querySelector('[data-component="time-since"]')).not.toBeNull()
  })

  it('shows "just now" for recent timestamps', () => {
    render(<TimeSince date={Date.now()} />)
    expect(screen.getByText('just now')).toBeDefined()
  })

  it('shows relative time for past dates', () => {
    const twoHoursAgo = Date.now() - 2 * 60 * 60 * 1000
    render(<TimeSince date={twoHoursAgo} />)
    expect(screen.getByText('2h ago')).toBeDefined()
  })
})
