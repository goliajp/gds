// video-controls — custom controls bar for video player (internal)
import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'

type VideoControlsProps = {
  currentTime: number
  duration: number
  playing: boolean
  isMuted: boolean
  showControls: boolean
  onTogglePlay: () => void
  onToggleMute: () => void
  onSeek: (e: React.MouseEvent<HTMLDivElement>) => void
  onFullscreen: () => void
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M4 2l10 6-10 6V2z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="3" y="2" width="4" height="12" rx="1" />
      <rect x="9" y="2" width="4" height="12" rx="1" />
    </svg>
  )
}

function MuteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M2 5h3l4-3v12l-4-3H2V5z" />
      <line
        x1="12"
        y1="5"
        x2="12"
        y2="11"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}

function UnmuteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M2 5h3l4-3v12l-4-3H2V5z" />
      <path
        d="M11 4c1.5 1 2 2.5 2 4s-.5 3-2 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}

function FullscreenIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4" />
    </svg>
  )
}

function VideoControls({
  currentTime,
  duration,
  playing,
  isMuted,
  showControls,
  onTogglePlay,
  onToggleMute,
  onSeek,
  onFullscreen,
}: VideoControlsProps) {
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div
      className={cx(
        'absolute inset-x-0 bottom-0 flex items-center gap-2 bg-black/60 px-3 py-2 transition-opacity duration-200',
        showControls ? 'opacity-100' : 'pointer-events-none opacity-0'
      )}
      data-testid="controls"
    >
      <button
        type="button"
        onClick={onTogglePlay}
        className={cx('text-white', focusCls)}
        aria-label={playing ? 'Pause' : 'Play'}
        data-testid="play-button"
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>

      <div
        className={cx(
          'relative h-1 flex-1 cursor-pointer rounded-full bg-white/30',
          focusCls
        )}
        onClick={onSeek}
        role="slider"
        aria-label="Seek"
        aria-valuemin={0}
        aria-valuemax={Math.floor(duration)}
        aria-valuenow={Math.floor(currentTime)}
        tabIndex={0}
        data-testid="progress-bar"
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-white"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <span
        className="text-xs text-white/80 select-none"
        data-testid="time-display"
      >
        {formatTime(currentTime)} / {formatTime(duration)}
      </span>

      <button
        type="button"
        onClick={onToggleMute}
        className={cx('text-white', focusCls)}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
        data-testid="mute-button"
      >
        {isMuted ? <MuteIcon /> : <UnmuteIcon />}
      </button>

      <button
        type="button"
        onClick={onFullscreen}
        className={cx('text-white', focusCls)}
        aria-label="Fullscreen"
        data-testid="fullscreen-button"
      >
        <FullscreenIcon />
      </button>
    </div>
  )
}

export { VideoControls }
export type { VideoControlsProps }
