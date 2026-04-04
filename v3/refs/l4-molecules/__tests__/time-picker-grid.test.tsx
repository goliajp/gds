import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { pad, TimePickerGrid } from '../time-picker-grid'

const defaultProps = {
  hours: [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ],
  minutes: [0, 15, 30, 45],
  onHourClick: vi.fn(),
  onMinuteClick: vi.fn(),
  selectedHour: null,
  selectedMinute: null,
}

describe('pad', () => {
  it('pads single digit with leading zero', () => {
    expect(pad(0)).toBe('00')
    expect(pad(5)).toBe('05')
    expect(pad(9)).toBe('09')
  })

  it('does not pad double digit numbers', () => {
    expect(pad(10)).toBe('10')
    expect(pad(23)).toBe('23')
    expect(pad(59)).toBe('59')
  })
})

describe('TimePickerGrid', () => {
  it('renders without crash', () => {
    const { container } = render(<TimePickerGrid {...defaultProps} />)
    expect(container.firstChild).not.toBeNull()
  })

  it('renders "Hour" and "Min" column headers', () => {
    render(<TimePickerGrid {...defaultProps} />)
    expect(screen.getByText('Hour')).toBeDefined()
    expect(screen.getByText('Min')).toBeDefined()
  })

  it('renders all hour buttons', () => {
    render(<TimePickerGrid {...defaultProps} />)
    const buttons = screen.getAllByRole('button')
    // 24 hours + 4 minutes = 28 buttons
    expect(buttons).toHaveLength(28)
  })

  it('renders hour values with zero-padded text', () => {
    render(<TimePickerGrid {...defaultProps} hours={[0, 1, 12]} minutes={[]} />)
    expect(screen.getByText('00')).toBeDefined()
    expect(screen.getByText('01')).toBeDefined()
    expect(screen.getByText('12')).toBeDefined()
  })

  it('renders minute values with zero-padded text', () => {
    render(<TimePickerGrid {...defaultProps} hours={[]} minutes={[0, 5, 30]} />)
    expect(screen.getByText('00')).toBeDefined()
    expect(screen.getByText('05')).toBeDefined()
    expect(screen.getByText('30')).toBeDefined()
  })

  it('calls onHourClick when an hour button is clicked', async () => {
    const user = userEvent.setup()
    const onHourClick = vi.fn()
    render(
      <TimePickerGrid
        {...defaultProps}
        hours={[9, 14]}
        minutes={[]}
        onHourClick={onHourClick}
      />
    )
    await user.click(screen.getByText('09'))
    expect(onHourClick).toHaveBeenCalledWith(9)
    expect(onHourClick).toHaveBeenCalledOnce()
  })

  it('calls onMinuteClick when a minute button is clicked', async () => {
    const user = userEvent.setup()
    const onMinuteClick = vi.fn()
    render(
      <TimePickerGrid
        {...defaultProps}
        hours={[]}
        minutes={[15, 30]}
        onMinuteClick={onMinuteClick}
      />
    )
    await user.click(screen.getByText('30'))
    expect(onMinuteClick).toHaveBeenCalledWith(30)
    expect(onMinuteClick).toHaveBeenCalledOnce()
  })

  it('highlights the selected hour', () => {
    render(
      <TimePickerGrid
        {...defaultProps}
        hours={[8, 9, 10]}
        minutes={[]}
        selectedHour={9}
      />
    )
    const btn = screen.getByText('09')
    expect(btn.className).toContain('text-accent')
    expect(btn.className).toContain('font-medium')
  })

  it('does not highlight non-selected hours', () => {
    render(
      <TimePickerGrid
        {...defaultProps}
        hours={[8, 9, 10]}
        minutes={[]}
        selectedHour={9}
      />
    )
    const btn = screen.getByText('08')
    expect(btn.className).not.toContain('text-accent')
  })

  it('highlights the selected minute', () => {
    render(
      <TimePickerGrid
        {...defaultProps}
        hours={[]}
        minutes={[0, 15, 30]}
        selectedMinute={15}
      />
    )
    const btn = screen.getByText('15')
    expect(btn.className).toContain('text-accent')
    expect(btn.className).toContain('font-medium')
  })

  it('does not highlight non-selected minutes', () => {
    render(
      <TimePickerGrid
        {...defaultProps}
        hours={[]}
        minutes={[0, 15, 30]}
        selectedMinute={15}
      />
    )
    const btn = screen.getByText('00')
    expect(btn.className).not.toContain('text-accent')
  })

  it('all buttons have type="button"', () => {
    render(
      <TimePickerGrid {...defaultProps} hours={[1, 2]} minutes={[0, 30]} />
    )
    const buttons = screen.getAllByRole('button')
    for (const btn of buttons) {
      expect(btn.getAttribute('type')).toBe('button')
    }
  })

  it('applies glass styling when glass prop is true', () => {
    const { container } = render(<TimePickerGrid {...defaultProps} glass />)
    const root = container.firstChild
    expect((root as HTMLElement).className).toContain('bg-bg/60')
  })

  it('applies solid styling when glass prop is false', () => {
    const { container } = render(
      <TimePickerGrid {...defaultProps} glass={false} />
    )
    const root = container.firstChild
    expect((root as HTMLElement).className).toContain('bg-surface')
  })

  it('applies solid styling when glass prop is omitted', () => {
    const { container } = render(<TimePickerGrid {...defaultProps} />)
    const root = container.firstChild
    expect((root as HTMLElement).className).toContain('bg-surface')
  })

  it('renders with empty hours and minutes arrays', () => {
    render(<TimePickerGrid {...defaultProps} hours={[]} minutes={[]} />)
    expect(screen.queryAllByRole('button')).toHaveLength(0)
    expect(screen.getByText('Hour')).toBeDefined()
    expect(screen.getByText('Min')).toBeDefined()
  })
})
