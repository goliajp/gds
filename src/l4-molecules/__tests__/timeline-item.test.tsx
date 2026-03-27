import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { TimelineEntry } from '../timeline-item'

describe('TimelineEntry', () => {
  it('renders with data-component', () => {
    const { container } = render(<TimelineEntry>Event</TimelineEntry>)
    expect(container.querySelector('[data-component="timeline-entry"]')).not.toBeNull()
  })

  it('renders children content', () => {
    render(<TimelineEntry>Deployed v2.0</TimelineEntry>)
    expect(screen.getByText('Deployed v2.0')).toBeDefined()
  })

  it('hides connector line when last is true', () => {
    const { container } = render(<TimelineEntry last>Final</TimelineEntry>)
    expect(container.querySelector('.bg-border')).toBeNull()
  })
})
