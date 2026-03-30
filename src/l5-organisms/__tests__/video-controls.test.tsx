import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { VideoControls } from '../video-controls'

const defaultProps = {
  currentTime: 0,
  duration: 0,
  playing: false,
  isMuted: false,
  showControls: true,
  onTogglePlay: vi.fn(),
  onToggleMute: vi.fn(),
  onSeek: vi.fn(),
  onFullscreen: vi.fn(),
}

describe('VideoControls', () => {
  it('renders all control buttons', () => {
    render(<VideoControls {...defaultProps} />)
    expect(screen.getByTestId('play-button')).toBeDefined()
    expect(screen.getByTestId('mute-button')).toBeDefined()
    expect(screen.getByTestId('fullscreen-button')).toBeDefined()
    expect(screen.getByTestId('progress-bar')).toBeDefined()
    expect(screen.getByTestId('time-display')).toBeDefined()
  })

  it('displays 0:00 / 0:00 when currentTime and duration are 0', () => {
    render(<VideoControls {...defaultProps} />)
    expect(screen.getByTestId('time-display').textContent).toBe('0:00 / 0:00')
  })

  it('formats time correctly', () => {
    render(<VideoControls {...defaultProps} currentTime={90} duration={300} />)
    expect(screen.getByTestId('time-display').textContent).toBe('1:30 / 5:00')
  })

  it('shows Play label when not playing', () => {
    render(<VideoControls {...defaultProps} playing={false} />)
    expect(screen.getByTestId('play-button')).toHaveAttribute(
      'aria-label',
      'Play'
    )
  })

  it('shows Pause label when playing', () => {
    render(<VideoControls {...defaultProps} playing={true} />)
    expect(screen.getByTestId('play-button')).toHaveAttribute(
      'aria-label',
      'Pause'
    )
  })

  it('shows Mute label when not muted', () => {
    render(<VideoControls {...defaultProps} isMuted={false} />)
    expect(screen.getByTestId('mute-button')).toHaveAttribute(
      'aria-label',
      'Mute'
    )
  })

  it('shows Unmute label when muted', () => {
    render(<VideoControls {...defaultProps} isMuted={true} />)
    expect(screen.getByTestId('mute-button')).toHaveAttribute(
      'aria-label',
      'Unmute'
    )
  })

  it('calls onTogglePlay when play button is clicked', async () => {
    const user = userEvent.setup()
    const onTogglePlay = vi.fn()
    render(<VideoControls {...defaultProps} onTogglePlay={onTogglePlay} />)
    await user.click(screen.getByTestId('play-button'))
    expect(onTogglePlay).toHaveBeenCalledOnce()
  })

  it('calls onToggleMute when mute button is clicked', async () => {
    const user = userEvent.setup()
    const onToggleMute = vi.fn()
    render(<VideoControls {...defaultProps} onToggleMute={onToggleMute} />)
    await user.click(screen.getByTestId('mute-button'))
    expect(onToggleMute).toHaveBeenCalledOnce()
  })

  it('calls onFullscreen when fullscreen button is clicked', async () => {
    const user = userEvent.setup()
    const onFullscreen = vi.fn()
    render(<VideoControls {...defaultProps} onFullscreen={onFullscreen} />)
    await user.click(screen.getByTestId('fullscreen-button'))
    expect(onFullscreen).toHaveBeenCalledOnce()
  })

  it('calls onSeek when progress bar is clicked', async () => {
    const user = userEvent.setup()
    const onSeek = vi.fn()
    render(<VideoControls {...defaultProps} onSeek={onSeek} />)
    await user.click(screen.getByTestId('progress-bar'))
    expect(onSeek).toHaveBeenCalledOnce()
  })

  it('shows controls when showControls is true', () => {
    render(<VideoControls {...defaultProps} showControls={true} />)
    const controls = screen.getByTestId('controls')
    expect(controls.className).toContain('opacity-100')
  })

  it('hides controls when showControls is false', () => {
    render(<VideoControls {...defaultProps} showControls={false} />)
    const controls = screen.getByTestId('controls')
    expect(controls.className).toContain('opacity-0')
    expect(controls.className).toContain('pointer-events-none')
  })

  it('renders progress bar with correct aria attributes', () => {
    render(<VideoControls {...defaultProps} currentTime={30} duration={120} />)
    const bar = screen.getByTestId('progress-bar')
    expect(bar).toHaveAttribute('role', 'slider')
    expect(bar).toHaveAttribute('aria-label', 'Seek')
    expect(bar).toHaveAttribute('aria-valuemin', '0')
    expect(bar).toHaveAttribute('aria-valuemax', '120')
    expect(bar).toHaveAttribute('aria-valuenow', '30')
  })

  it('renders progress bar fill width based on currentTime/duration', () => {
    render(<VideoControls {...defaultProps} currentTime={50} duration={200} />)
    const bar = screen.getByTestId('progress-bar')
    const fill = bar.firstElementChild as HTMLElement
    expect(fill.style.width).toBe('25%')
  })

  it('renders 0% progress when duration is 0', () => {
    render(<VideoControls {...defaultProps} currentTime={0} duration={0} />)
    const bar = screen.getByTestId('progress-bar')
    const fill = bar.firstElementChild as HTMLElement
    expect(fill.style.width).toBe('0%')
  })

  it('has Fullscreen aria-label on fullscreen button', () => {
    render(<VideoControls {...defaultProps} />)
    expect(screen.getByTestId('fullscreen-button')).toHaveAttribute(
      'aria-label',
      'Fullscreen'
    )
  })
})
