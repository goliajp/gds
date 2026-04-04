// audio-player — compact audio player with progress bar
import { forwardRef, useCallback, useRef, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

export type AudioPlayerProps = {
  src: string
  title?: string
  glass?: boolean
  className?: string
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export const AudioPlayer = forwardRef<HTMLDivElement, AudioPlayerProps>(
  function AudioPlayer({ src, title, glass, className }, ref) {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [playing, setPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    const togglePlay = useCallback(() => {
      const audio = audioRef.current
      if (audio === null) return
      if (audio.paused) {
        audio.play().catch(() => {})
        setPlaying(true)
      } else {
        audio.pause()
        setPlaying(false)
      }
    }, [])

    const handleTimeUpdate = useCallback(() => {
      const audio = audioRef.current
      if (audio === null) return
      setCurrentTime(audio.currentTime)
    }, [])

    const handleLoadedMetadata = useCallback(() => {
      const audio = audioRef.current
      if (audio === null) return
      setDuration(audio.duration)
    }, [])

    const handleEnded = useCallback(() => {
      setPlaying(false)
    }, [])

    const handleSeek = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        const audio = audioRef.current
        if (audio === null) return
        const rect = e.currentTarget.getBoundingClientRect()
        const ratio = (e.clientX - rect.left) / rect.width
        audio.currentTime = ratio * duration
      },
      [duration]
    )

    const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

    return (
      <div
        ref={ref}
        className={cx(
          'gds-radius-card gds-pad-x gds-pad-y flex items-center gap-2',
          'border-border bg-bg-secondary border',
          glassClass(glass),
          glass === true && 'bg-bg/60 border-white/10',
          className
        )}
        data-component="audio-player"
      >
        <audio
          ref={audioRef}
          src={src}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          data-testid="audio-element"
        />

        {/* play/pause */}
        <button
          type="button"
          onClick={togglePlay}
          className={cx('text-fg shrink-0', focusCls)}
          aria-label={playing ? 'Pause' : 'Play'}
          data-testid="play-button"
        >
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <rect x="3" y="2" width="4" height="12" rx="1" />
              <rect x="9" y="2" width="4" height="12" rx="1" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4 2l10 6-10 6V2z" />
            </svg>
          )}
        </button>

        {/* title */}
        {title !== undefined && (
          <span
            className="text-fg-muted shrink-0 text-xs select-none"
            data-testid="title"
          >
            {title}
          </span>
        )}

        {/* progress bar */}
        <div
          className={cx(
            'bg-bg-tertiary relative h-1 flex-1 cursor-pointer rounded-full',
            focusCls
          )}
          onClick={handleSeek}
          role="slider"
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={Math.floor(duration)}
          aria-valuenow={Math.floor(currentTime)}
          tabIndex={0}
          data-testid="progress-bar"
        >
          <div
            className="bg-accent absolute inset-y-0 left-0 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* time */}
        <span
          className="text-fg-muted shrink-0 text-xs tabular-nums select-none"
          data-testid="time-display"
        >
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
    )
  }
)
