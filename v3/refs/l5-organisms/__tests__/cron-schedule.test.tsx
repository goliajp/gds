import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CronSchedule } from '../cron-schedule'

describe('CronSchedule', () => {
  it('renders the raw expression', () => {
    render(<CronSchedule expression="0 3 * * *" />)
    expect(screen.getByText('0 3 * * *')).toBeDefined()
  })

  it('displays daily schedule in human-readable format', () => {
    render(<CronSchedule expression="0 3 * * *" />)
    expect(screen.getByText('Every day at 03:00')).toBeDefined()
  })

  it('displays weekly schedule with day name', () => {
    render(<CronSchedule expression="0 9 * * 1" />)
    expect(screen.getByText('Every Monday at 09:00')).toBeDefined()
  })

  it('displays every minute for * * * * *', () => {
    render(<CronSchedule expression="* * * * *" />)
    expect(screen.getByText('Every minute')).toBeDefined()
  })

  it('displays midnight schedule', () => {
    render(<CronSchedule expression="0 0 * * *" />)
    expect(screen.getByText('Every day at midnight')).toBeDefined()
  })

  it('displays hourly schedule with minute', () => {
    render(<CronSchedule expression="30 * * * *" />)
    expect(screen.getByText('Every hour at minute 30')).toBeDefined()
  })

  it('displays monthly schedule with time', () => {
    render(<CronSchedule expression="0 9 15 * *" />)
    expect(screen.getByText('Day 15 of every month at 09:00')).toBeDefined()
  })

  it('displays monthly schedule without time', () => {
    render(<CronSchedule expression="* * 15 * *" />)
    expect(screen.getByText('Day 15 of every month')).toBeDefined()
  })

  it('displays weekly schedule without time', () => {
    render(<CronSchedule expression="* * * * 5" />)
    expect(screen.getByText('Every Friday')).toBeDefined()
  })

  it('displays weekly schedule with non-numeric day name', () => {
    render(<CronSchedule expression="0 10 * * MON" />)
    expect(screen.getByText('Every MON at 10:00')).toBeDefined()
  })

  it('displays fallback for invalid expression', () => {
    render(<CronSchedule expression="bad" />)
    expect(screen.getByText('Cron: bad')).toBeDefined()
  })

  it('displays fallback for daily with null time', () => {
    render(<CronSchedule expression="* 9 * * *" />)
    // hour=9 minute=* → time is null → falls to final return
    expect(screen.getByText(/Cron:/)).toBeDefined()
  })

  it('applies custom className', () => {
    const { container } = render(
      <CronSchedule expression="* * * * *" className="my-cron" />
    )
    const root = container.querySelector('[data-component="cron-schedule"]')
    expect(root?.className).toContain('my-cron')
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<CronSchedule expression="* * * * *" ref={ref} />)
    expect(ref.current).not.toBeNull()
  })

  it('handles day-of-week with question mark', () => {
    render(<CronSchedule expression="0 12 * * ?" />)
    expect(screen.getByText('Every day at 12:00')).toBeDefined()
  })

  it('handles day-of-month with question mark', () => {
    render(<CronSchedule expression="0 12 ? * *" />)
    expect(screen.getByText('Every day at 12:00')).toBeDefined()
  })

  it('wraps day number modulo 7', () => {
    render(<CronSchedule expression="0 8 * * 7" />)
    expect(screen.getByText('Every Sunday at 08:00')).toBeDefined()
  })
})
