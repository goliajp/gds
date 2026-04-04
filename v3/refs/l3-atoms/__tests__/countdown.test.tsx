import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { Countdown } from '../countdown'

describe('Countdown', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders countdown segments', () => {
    const target = Date.now() + 90061000 // 1d 1h 1m 1s
    const { container } = render(<Countdown targetDate={target} />)
    expect(
      container.querySelector('[data-component="countdown"]')
    ).toBeInTheDocument()
    expect(screen.getByTestId('segment-D')).toBeInTheDocument()
    expect(screen.getByTestId('segment-H')).toBeInTheDocument()
    expect(screen.getByTestId('segment-M')).toBeInTheDocument()
    expect(screen.getByTestId('segment-S')).toBeInTheDocument()
  })

  it('hides days when showDays is false', () => {
    const target = Date.now() + 90061000
    render(<Countdown targetDate={target} showDays={false} />)
    expect(screen.queryByTestId('segment-D')).toBeNull()
    expect(screen.getByTestId('segment-H')).toBeInTheDocument()
  })

  it('hides seconds when showSeconds is false', () => {
    const target = Date.now() + 90061000
    render(<Countdown targetDate={target} showSeconds={false} />)
    expect(screen.queryByTestId('segment-S')).toBeNull()
    expect(screen.getByTestId('segment-M')).toBeInTheDocument()
  })

  it('fires onComplete when countdown reaches zero', () => {
    const onComplete = vi.fn()
    const target = Date.now() + 2000
    render(<Countdown targetDate={target} onComplete={onComplete} />)
    act(() => {
      vi.advanceTimersByTime(3000)
    })
    expect(onComplete).toHaveBeenCalled()
  })
})
