import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { TimelineChart } from '../timeline-chart'

const events = [
  { date: '2025-01-15', label: 'Launch' },
  { date: '2025-03-20', label: 'Beta' },
  { date: '2025-06-01', label: 'GA' },
  { date: '2025-09-10', label: 'v2.0' },
]

describe('TimelineChart', () => {
  it('renders SVG element', () => {
    const { container } = render(<TimelineChart events={events} />)
    expect(container.querySelector('svg')).not.toBeNull()
  })

  it('renders event markers', () => {
    const { container } = render(<TimelineChart events={events} />)
    const eventGroups = container.querySelectorAll('[data-event]')
    expect(eventGroups.length).toBe(4)
  })

  it('alternates label positions above and below', () => {
    const { container } = render(<TimelineChart events={events} />)
    const aboveLabels = container.querySelectorAll('[data-label="above"]')
    const belowLabels = container.querySelectorAll('[data-label="below"]')
    expect(aboveLabels.length).toBe(2)
    expect(belowLabels.length).toBe(2)
  })

  it('has data-component attribute', () => {
    const { container } = render(<TimelineChart events={events} />)
    expect(
      container.querySelector('[data-component="timeline-chart"]')
    ).not.toBeNull()
  })
})
