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
})
