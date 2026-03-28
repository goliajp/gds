import { act, fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { VideoPlayer } from '../video-player'

describe('VideoPlayer', () => {
  it('renders video element with src', () => {
    render(<VideoPlayer src="test.mp4" />)
    const video = screen.getByTestId('video-element')
    expect(video).toBeInTheDocument()
    expect(video).toHaveAttribute('src', 'test.mp4')
  })

  it('shows custom controls by default', () => {
    render(<VideoPlayer src="test.mp4" />)
    expect(screen.getByTestId('controls')).toBeInTheDocument()
    expect(screen.getByTestId('play-button')).toBeInTheDocument()
    expect(screen.getByTestId('mute-button')).toBeInTheDocument()
    expect(screen.getByTestId('fullscreen-button')).toBeInTheDocument()
  })

  it('hides controls when controls=false', () => {
    render(<VideoPlayer src="test.mp4" controls={false} />)
    expect(screen.queryByTestId('controls')).toBeNull()
  })

  it('toggles play state on play button click', () => {
    render(<VideoPlayer src="test.mp4" />)
    const video = screen.getByTestId('video-element') as HTMLVideoElement

    let paused = true
    Object.defineProperty(video, 'paused', { get: () => paused, configurable: true })
    video.play = vi.fn().mockImplementation(() => { paused = false; return Promise.resolve() })
    video.pause = vi.fn().mockImplementation(() => { paused = true })

    const playBtn = screen.getByTestId('play-button')
    expect(playBtn).toHaveAttribute('aria-label', 'Play')

    fireEvent.click(playBtn)
    expect(video.play).toHaveBeenCalled()
    expect(playBtn).toHaveAttribute('aria-label', 'Pause')

    fireEvent.click(playBtn)
    expect(video.pause).toHaveBeenCalled()
    expect(playBtn).toHaveAttribute('aria-label', 'Play')
  })

  it('toggles mute on mute button click', () => {
    render(<VideoPlayer src="test.mp4" />)
    const muteBtn = screen.getByTestId('mute-button')
    expect(muteBtn).toHaveAttribute('aria-label', 'Mute')
    fireEvent.click(muteBtn)
    expect(muteBtn).toHaveAttribute('aria-label', 'Unmute')
    fireEvent.click(muteBtn)
    expect(muteBtn).toHaveAttribute('aria-label', 'Mute')
  })

  it('has data-component attribute', () => {
    const { container } = render(<VideoPlayer src="test.mp4" />)
    expect(container.querySelector('[data-component="video-player"]')).toBeInTheDocument()
  })

  it('handles timeupdate event', () => {
    render(<VideoPlayer src="test.mp4" />)
    const video = screen.getByTestId('video-element') as HTMLVideoElement

    Object.defineProperty(video, 'currentTime', { value: 90, writable: true })
    fireEvent.timeUpdate(video)

    expect(screen.getByTestId('time-display')).toHaveTextContent('1:30')
  })

  it('handles loadedmetadata event', () => {
    render(<VideoPlayer src="test.mp4" />)
    const video = screen.getByTestId('video-element') as HTMLVideoElement

    Object.defineProperty(video, 'duration', { value: 300, writable: true })
    fireEvent.loadedMetadata(video)

    expect(screen.getByTestId('time-display')).toHaveTextContent('5:00')
  })

  it('handles ended event — resets play state and shows controls', () => {
    render(<VideoPlayer src="test.mp4" />)
    const video = screen.getByTestId('video-element') as HTMLVideoElement
    video.play = vi.fn().mockResolvedValue(undefined)

    // start playing
    fireEvent.click(screen.getByTestId('play-button'))
    expect(screen.getByTestId('play-button')).toHaveAttribute('aria-label', 'Pause')

    // trigger ended
    fireEvent.ended(video)
    expect(screen.getByTestId('play-button')).toHaveAttribute('aria-label', 'Play')
    // controls should be visible
    expect(screen.getByTestId('controls').className).toContain('opacity-100')
  })

  it('handles seek click on progress bar', () => {
    render(<VideoPlayer src="test.mp4" />)
    const video = screen.getByTestId('video-element') as HTMLVideoElement

    Object.defineProperty(video, 'duration', { value: 100, writable: true })
    fireEvent.loadedMetadata(video)

    const progressBar = screen.getByTestId('progress-bar')
    vi.spyOn(progressBar, 'getBoundingClientRect').mockReturnValue({
      left: 0, width: 200, top: 0, right: 200, bottom: 10, height: 10, x: 0, y: 0,
      toJSON: vi.fn(),
    })

    fireEvent.click(progressBar, { clientX: 100 })
    expect(video.currentTime).toBe(50)
  })

  it('applies poster attribute', () => {
    render(<VideoPlayer src="test.mp4" poster="thumb.jpg" />)
    const video = screen.getByTestId('video-element')
    expect(video).toHaveAttribute('poster', 'thumb.jpg')
  })

  it('applies autoPlay attribute', () => {
    render(<VideoPlayer src="test.mp4" autoPlay />)
    const video = screen.getByTestId('video-element') as HTMLVideoElement
    expect(video.autoplay).toBe(true)
  })

  it('applies loop attribute', () => {
    render(<VideoPlayer src="test.mp4" loop />)
    const video = screen.getByTestId('video-element') as HTMLVideoElement
    expect(video.loop).toBe(true)
  })

  it('starts muted when muted prop is true', () => {
    render(<VideoPlayer src="test.mp4" muted />)
    const muteBtn = screen.getByTestId('mute-button')
    expect(muteBtn).toHaveAttribute('aria-label', 'Unmute')
  })

  it('applies glass class when glass is true', () => {
    const { container } = render(<VideoPlayer src="test.mp4" glass />)
    const el = container.querySelector('[data-component="video-player"]')
    expect(el?.className).toContain('gds-glass')
  })

  it('applies custom className', () => {
    const { container } = render(<VideoPlayer src="test.mp4" className="my-player" />)
    const el = container.querySelector('[data-component="video-player"]')
    expect(el?.className).toContain('my-player')
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<VideoPlayer src="test.mp4" ref={ref} />)
    expect(ref.current).not.toBeNull()
    expect(ref.current?.getAttribute('data-component')).toBe('video-player')
  })

  it('handles fullscreen button click without crash', () => {
    render(<VideoPlayer src="test.mp4" />)
    // in jsdom, requestFullscreen is not available, but the handler catches errors
    fireEvent.click(screen.getByTestId('fullscreen-button'))
    // should not throw
    expect(screen.getByTestId('fullscreen-button')).toBeInTheDocument()
  })

  it('hides controls on mouse leave', () => {
    const { container } = render(<VideoPlayer src="test.mp4" />)
    const el = container.querySelector('[data-component="video-player"]')!
    fireEvent.mouseLeave(el)
    const controls = screen.getByTestId('controls')
    expect(controls.className).toContain('opacity-0')
  })

  it('shows controls on mouse move', () => {
    const { container } = render(<VideoPlayer src="test.mp4" />)
    const el = container.querySelector('[data-component="video-player"]')!
    fireEvent.mouseLeave(el)
    fireEvent.mouseMove(el)
    const controls = screen.getByTestId('controls')
    expect(controls.className).toContain('opacity-100')
  })

  it('displays progress percentage based on currentTime/duration', () => {
    render(<VideoPlayer src="test.mp4" />)
    const video = screen.getByTestId('video-element') as HTMLVideoElement

    Object.defineProperty(video, 'duration', { value: 200, writable: true })
    fireEvent.loadedMetadata(video)

    Object.defineProperty(video, 'currentTime', { value: 50, writable: true })
    fireEvent.timeUpdate(video)

    const progressBar = screen.getByTestId('progress-bar')
    const inner = progressBar.firstElementChild as HTMLElement
    expect(inner.style.width).toBe('25%')
  })

  it('displays 0:00 / 0:00 initially', () => {
    render(<VideoPlayer src="test.mp4" />)
    expect(screen.getByTestId('time-display')).toHaveTextContent('0:00 / 0:00')
  })

  it('does not attach mouse handlers when controls=false', () => {
    const { container } = render(<VideoPlayer src="test.mp4" controls={false} />)
    const el = container.querySelector('[data-component="video-player"]')!
    // mouseMove and mouseLeave should not cause errors
    fireEvent.mouseMove(el)
    fireEvent.mouseLeave(el)
  })

  it('handles fullscreen exit when already in fullscreen', () => {
    render(<VideoPlayer src="test.mp4" />)
    // simulate being in fullscreen
    Object.defineProperty(document, 'fullscreenElement', { value: document.body, configurable: true })
    document.exitFullscreen = vi.fn().mockResolvedValue(undefined)

    fireEvent.click(screen.getByTestId('fullscreen-button'))
    expect(document.exitFullscreen).toHaveBeenCalled()

    // restore
    Object.defineProperty(document, 'fullscreenElement', { value: null, configurable: true })
  })

  it('does not apply glass class when glass is false', () => {
    const { container } = render(<VideoPlayer src="test.mp4" />)
    const el = container.querySelector('[data-component="video-player"]')
    expect(el?.className).not.toContain('gds-glass')
  })

  it('auto-hides controls after timeout while playing', () => {
    vi.useFakeTimers()

    render(<VideoPlayer src="test.mp4" />)
    const video = screen.getByTestId('video-element') as HTMLVideoElement

    let paused = true
    Object.defineProperty(video, 'paused', { get: () => paused, configurable: true })
    video.play = vi.fn().mockImplementation(() => { paused = false; return Promise.resolve() })

    // start playing
    fireEvent.click(screen.getByTestId('play-button'))

    // controls should be visible initially
    expect(screen.getByTestId('controls').className).toContain('opacity-100')

    // advance past the 3000ms hide timer
    act(() => {
      vi.advanceTimersByTime(3100)
    })

    // controls should be hidden now
    expect(screen.getByTestId('controls').className).toContain('opacity-0')

    vi.useRealTimers()
  })

  it('requestFullscreen is called when not in fullscreen', () => {
    render(<VideoPlayer src="test.mp4" />)
    const video = screen.getByTestId('video-element') as HTMLVideoElement

    // ensure not in fullscreen
    Object.defineProperty(document, 'fullscreenElement', { value: null, configurable: true })
    video.requestFullscreen = vi.fn().mockResolvedValue(undefined)

    fireEvent.click(screen.getByTestId('fullscreen-button'))
    expect(video.requestFullscreen).toHaveBeenCalled()
  })

  it('resets hide timer on mouse move while playing', () => {
    vi.useFakeTimers()

    const { container } = render(<VideoPlayer src="test.mp4" />)
    const video = screen.getByTestId('video-element') as HTMLVideoElement
    const el = container.querySelector('[data-component="video-player"]')!

    let paused = true
    Object.defineProperty(video, 'paused', { get: () => paused, configurable: true })
    video.play = vi.fn().mockImplementation(() => { paused = false; return Promise.resolve() })

    fireEvent.click(screen.getByTestId('play-button'))

    // advance partway
    act(() => {
      vi.advanceTimersByTime(2000)
    })

    // mouse move should reset the timer
    fireEvent.mouseMove(el)

    // advance another 2000ms (total 4000 from start, but only 2000 from last move)
    act(() => {
      vi.advanceTimersByTime(2000)
    })

    // controls should still be visible since timer was reset
    expect(screen.getByTestId('controls').className).toContain('opacity-100')

    vi.useRealTimers()
  })
})
