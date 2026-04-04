import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { RelativeTime } from '../relative-time'

describe('RelativeTime', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<RelativeTime date={new Date()} />)
    expect(
      container.querySelector('[data-component="relative-time"]')
    ).not.toBeNull()
  })

  it('renders as a time element', () => {
    const { container } = render(<RelativeTime date={new Date()} />)
    expect(container.querySelector('time')).not.toBeNull()
  })

  it('displays "just now" for recent dates', () => {
    render(<RelativeTime date={new Date()} />)
    expect(screen.getByText('just now')).toBeDefined()
  })

  it('displays minutes ago', () => {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
    render(<RelativeTime date={fiveMinutesAgo} />)
    expect(screen.getByText('5m ago')).toBeDefined()
  })

  it('displays hours ago', () => {
    const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000)
    render(<RelativeTime date={threeHoursAgo} />)
    expect(screen.getByText('3h ago')).toBeDefined()
  })

  it('displays "yesterday" for 1 day ago', () => {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
    render(<RelativeTime date={yesterday} />)
    expect(screen.getByText('yesterday')).toBeDefined()
  })

  it('displays days ago for 2-29 days', () => {
    const tenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
    render(<RelativeTime date={tenDaysAgo} />)
    expect(screen.getByText('10d ago')).toBeDefined()
  })

  it('displays months ago for 30+ days', () => {
    const twoMonthsAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
    render(<RelativeTime date={twoMonthsAgo} />)
    expect(screen.getByText('2mo ago')).toBeDefined()
  })

  it('displays years ago for 12+ months', () => {
    const twoYearsAgo = new Date(Date.now() - 730 * 24 * 60 * 60 * 1000)
    render(<RelativeTime date={twoYearsAgo} />)
    expect(screen.getByText('2y ago')).toBeDefined()
  })

  it('accepts date as number (timestamp)', () => {
    const { container } = render(<RelativeTime date={Date.now()} />)
    expect(container.querySelector('time')).not.toBeNull()
    expect(screen.getByText('just now')).toBeDefined()
  })

  it('accepts date as string', () => {
    const { container } = render(
      <RelativeTime date={new Date().toISOString()} />
    )
    expect(container.querySelector('time')).not.toBeNull()
    expect(screen.getByText('just now')).toBeDefined()
  })

  it('prepends prefix when provided', () => {
    render(<RelativeTime date={new Date()} prefix="updated" />)
    expect(screen.getByText('updated just now')).toBeDefined()
  })

  it('does not prepend prefix when undefined', () => {
    render(<RelativeTime date={new Date()} />)
    expect(screen.getByText('just now')).toBeDefined()
  })

  it('sets dateTime attribute on time element', () => {
    const date = new Date('2025-01-15T12:00:00Z')
    const { container } = render(<RelativeTime date={date} />)
    const time = container.querySelector('time')
    expect(time?.getAttribute('dateTime')).toBe(date.toISOString())
  })

  it('sets title attribute with full date', () => {
    const date = new Date('2025-01-15T12:00:00Z')
    const { container } = render(<RelativeTime date={date} />)
    const time = container.querySelector('time')
    expect(time?.getAttribute('title')).toBe(date.toLocaleString())
  })

  it('applies custom className', () => {
    const { container } = render(
      <RelativeTime date={new Date()} className="custom" />
    )
    const time = container.querySelector('time')
    expect(time?.className).toContain('custom')
  })

  it('forwards additional props', () => {
    const { container } = render(
      <RelativeTime date={new Date()} data-testid="rt" />
    )
    expect(container.querySelector('[data-testid="rt"]')).not.toBeNull()
  })
})
