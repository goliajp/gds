import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { AudioPlayer } from '../audio-player'

describe('AudioPlayer', () => {
  it('renders audio element with src', () => {
    render(<AudioPlayer src="test.mp3" />)
    const audio = screen.getByTestId('audio-element')
    expect(audio).toBeInTheDocument()
    expect(audio).toHaveAttribute('src', 'test.mp3')
  })

  it('shows title when provided', () => {
    render(<AudioPlayer src="test.mp3" title="My Song" />)
    expect(screen.getByTestId('title')).toHaveTextContent('My Song')
  })

  it('hides title when not provided', () => {
    render(<AudioPlayer src="test.mp3" />)
    expect(screen.queryByTestId('title')).toBeNull()
  })

  it('renders play button with Play label', () => {
    render(<AudioPlayer src="test.mp3" />)
    const playBtn = screen.getByTestId('play-button')
    expect(playBtn).toBeInTheDocument()
    expect(playBtn).toHaveAttribute('aria-label', 'Play')
  })

  it('has data-component attribute', () => {
    const { container } = render(<AudioPlayer src="test.mp3" />)
    expect(container.querySelector('[data-component="audio-player"]')).toBeInTheDocument()
  })

  it('toggles play/pause on click', async () => {
    const user = userEvent.setup()
    render(<AudioPlayer src="test.mp3" />)
    const audio = screen.getByTestId('audio-element') as HTMLAudioElement

    // mock paused property and play/pause methods
    let paused = true
    Object.defineProperty(audio, 'paused', { get: () => paused, configurable: true })
    audio.play = vi.fn().mockImplementation(() => { paused = false; return Promise.resolve() })
    audio.pause = vi.fn().mockImplementation(() => { paused = true })

    const playBtn = screen.getByTestId('play-button')
    await user.click(playBtn)
    expect(audio.play).toHaveBeenCalled()
    expect(playBtn).toHaveAttribute('aria-label', 'Pause')

    await user.click(playBtn)
    expect(audio.pause).toHaveBeenCalled()
    expect(playBtn).toHaveAttribute('aria-label', 'Play')
  })

  it('handles play rejection gracefully', async () => {
    const user = userEvent.setup()
    render(<AudioPlayer src="test.mp3" />)
    const audio = screen.getByTestId('audio-element') as HTMLAudioElement
    audio.play = vi.fn().mockRejectedValue(new Error('not allowed'))

    const playBtn = screen.getByTestId('play-button')
    // should not throw
    await user.click(playBtn)
    expect(playBtn).toHaveAttribute('aria-label', 'Pause')
  })

  it('handles timeupdate event', () => {
    render(<AudioPlayer src="test.mp3" />)
    const audio = screen.getByTestId('audio-element') as HTMLAudioElement

    Object.defineProperty(audio, 'currentTime', { value: 65, writable: true })
    fireEvent.timeUpdate(audio)

    expect(screen.getByTestId('time-display')).toHaveTextContent('1:05')
  })

  it('handles loadedmetadata event', () => {
    render(<AudioPlayer src="test.mp3" />)
    const audio = screen.getByTestId('audio-element') as HTMLAudioElement

    Object.defineProperty(audio, 'duration', { value: 180, writable: true })
    fireEvent.loadedMetadata(audio)

    expect(screen.getByTestId('time-display')).toHaveTextContent('3:00')
  })

  it('handles ended event — resets to Play', async () => {
    const user = userEvent.setup()
    render(<AudioPlayer src="test.mp3" />)
    const audio = screen.getByTestId('audio-element') as HTMLAudioElement
    audio.play = vi.fn().mockResolvedValue(undefined)

    const playBtn = screen.getByTestId('play-button')
    await user.click(playBtn)
    expect(playBtn).toHaveAttribute('aria-label', 'Pause')

    fireEvent.ended(audio)
    expect(playBtn).toHaveAttribute('aria-label', 'Play')
  })

  it('handles seek click on progress bar', () => {
    render(<AudioPlayer src="test.mp3" />)
    const audio = screen.getByTestId('audio-element') as HTMLAudioElement

    // set duration first
    Object.defineProperty(audio, 'duration', { value: 100, writable: true })
    fireEvent.loadedMetadata(audio)

    const progressBar = screen.getByTestId('progress-bar')

    // mock getBoundingClientRect
    vi.spyOn(progressBar, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      width: 200,
      top: 0,
      right: 200,
      bottom: 10,
      height: 10,
      x: 0,
      y: 0,
      toJSON: vi.fn(),
    })

    fireEvent.click(progressBar, { clientX: 100 })
    // 100/200 * 100 = 50
    expect(audio.currentTime).toBe(50)
  })

  it('shows progress percentage based on currentTime/duration', () => {
    render(<AudioPlayer src="test.mp3" />)
    const audio = screen.getByTestId('audio-element') as HTMLAudioElement

    Object.defineProperty(audio, 'duration', { value: 200, writable: true })
    fireEvent.loadedMetadata(audio)

    Object.defineProperty(audio, 'currentTime', { value: 100, writable: true })
    fireEvent.timeUpdate(audio)

    // progress bar inner div should have width 50%
    const progressBar = screen.getByTestId('progress-bar')
    const inner = progressBar.firstElementChild as HTMLElement
    expect(inner.style.width).toBe('50%')
  })

  it('applies glass classes when glass is true', () => {
    const { container } = render(<AudioPlayer src="test.mp3" glass />)
    const el = container.querySelector('[data-component="audio-player"]')
    expect(el?.className).toContain('gds-glass')
    expect(el?.className).toContain('border-white/10')
  })

  it('applies custom className', () => {
    const { container } = render(<AudioPlayer src="test.mp3" className="my-player" />)
    const el = container.querySelector('[data-component="audio-player"]')
    expect(el?.className).toContain('my-player')
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<AudioPlayer src="test.mp3" ref={ref} />)
    expect(ref.current).not.toBeNull()
    expect(ref.current?.getAttribute('data-component')).toBe('audio-player')
  })

  it('formats time correctly for zero', () => {
    render(<AudioPlayer src="test.mp3" />)
    expect(screen.getByTestId('time-display')).toHaveTextContent('0:00 / 0:00')
  })
})
