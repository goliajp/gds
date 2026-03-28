import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { Milestone } from '../progress-timeline'
import { ProgressTimeline } from '../progress-timeline'

const milestones: Milestone[] = [
  { label: 'Start', date: '2025-01-01', completed: true },
  { label: 'Design', date: '2025-02-01', completed: true },
  { label: 'Build', date: '2025-03-01', completed: false },
  { label: 'Launch', date: '2025-04-01', completed: false },
]

describe('ProgressTimeline', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<ProgressTimeline milestones={milestones} />)
    expect(container.querySelector('[data-component="progress-timeline"]')).not.toBeNull()
  })

  it('renders all milestone labels and dates', () => {
    render(<ProgressTimeline milestones={milestones} />)
    expect(screen.getByText('Start')).toBeDefined()
    expect(screen.getByText('Design')).toBeDefined()
    expect(screen.getByText('Build')).toBeDefined()
    expect(screen.getByText('Launch')).toBeDefined()
    expect(screen.getByText('2025-01-01')).toBeDefined()
  })

  it('marks completed milestones with accent style', () => {
    const { container } = render(<ProgressTimeline milestones={milestones} />)
    const circles = container.querySelectorAll('[data-completed]')
    expect(circles[0]?.getAttribute('data-completed')).toBe('true')
    expect(circles[0]?.className).toContain('bg-accent')
    expect(circles[2]?.getAttribute('data-completed')).toBe('false')
    expect(circles[2]?.className).toContain('bg-bg')
  })

  it('renders progress line when there are completed milestones and more than 1 milestone', () => {
    const { container } = render(<ProgressTimeline milestones={milestones} />)
    // progress line: second absolute div with bg-accent
    const accentDivs = container.querySelectorAll('.bg-accent')
    // at least one should be the progress line (not a circle)
    const progressLine = Array.from(accentDivs).find(
      (el) => el.classList.contains('h-0.5') && el.classList.contains('absolute'),
    )
    expect(progressLine).not.toBeUndefined()
  })

  it('does not render progress line when no milestones are completed', () => {
    const noComplete: Milestone[] = [
      { label: 'A', date: '2025-01-01', completed: false },
      { label: 'B', date: '2025-02-01', completed: false },
    ]
    const { container } = render(<ProgressTimeline milestones={noComplete} />)
    const progressLines = Array.from(container.querySelectorAll('.bg-accent')).filter(
      (el) => el.classList.contains('h-0.5') && el.classList.contains('absolute'),
    )
    expect(progressLines.length).toBe(0)
  })

  it('does not render progress line when only 1 milestone exists', () => {
    const single: Milestone[] = [
      { label: 'Only', date: '2025-01-01', completed: true },
    ]
    const { container } = render(<ProgressTimeline milestones={single} />)
    const progressLines = Array.from(container.querySelectorAll('.bg-accent')).filter(
      (el) => el.classList.contains('h-0.5') && el.classList.contains('absolute'),
    )
    expect(progressLines.length).toBe(0)
  })

  it('applies custom className', () => {
    const { container } = render(
      <ProgressTimeline className="custom" milestones={milestones} />,
    )
    const root = container.querySelector('[data-component="progress-timeline"]')
    expect(root?.className).toContain('custom')
  })

  it('forwards ref', () => {
    let divRef: HTMLDivElement | null = null
    render(
      <ProgressTimeline
        milestones={milestones}
        ref={(el) => { divRef = el }}
      />,
    )
    expect(divRef).not.toBeNull()
    expect((divRef as unknown as HTMLElement)?.tagName).toBe('DIV')
  })

  it('calculates correct progress width for last completed index', () => {
    // all completed: progress line should be 100%
    const allComplete: Milestone[] = [
      { label: 'A', date: '2025-01-01', completed: true },
      { label: 'B', date: '2025-02-01', completed: true },
      { label: 'C', date: '2025-03-01', completed: true },
    ]
    const { container } = render(<ProgressTimeline milestones={allComplete} />)
    const progressLine = Array.from(container.querySelectorAll('.bg-accent')).find(
      (el) => el.classList.contains('h-0.5') && el.classList.contains('absolute'),
    ) as HTMLElement
    expect(progressLine?.style.width).toBe('100%')
  })
})
