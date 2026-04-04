// video-player — styled html5 video player with custom controls
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'

import { cx } from '../utils/cx'
import { VideoControls } from './video-controls'

export type VideoPlayerProps = {
  src: string
  poster?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  controls?: boolean
  glass?: boolean
  className?: string
}

export const VideoPlayer = forwardRef<HTMLDivElement, VideoPlayerProps>(
  function VideoPlayer(
    {
      src,
      poster,
      autoPlay = false,
      muted: mutedProp = false,
      loop = false,
      controls = true,
      glass = false,
      className,
    },
    ref
  ) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const hideTimerRef = useRef<ReturnType<typeof setTimeout>>(null)

    const [playing, setPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [isMuted, setIsMuted] = useState(mutedProp)
    const [showControls, setShowControls] = useState(true)

    const resetHideTimer = useCallback(() => {
      setShowControls(true)
      if (hideTimerRef.current !== null) {
        clearTimeout(hideTimerRef.current)
      }
      hideTimerRef.current = setTimeout(() => {
        if (playing) setShowControls(false)
      }, 3000)
    }, [playing])

    // auto-hide controls
    useEffect(() => {
      if (!controls) return
      resetHideTimer()
      return () => {
        if (hideTimerRef.current !== null) clearTimeout(hideTimerRef.current)
      }
    }, [controls, resetHideTimer])

    const togglePlay = useCallback(() => {
      const video = videoRef.current
      if (video === null) return
      if (video.paused) {
        video.play().catch(() => {})
        setPlaying(true)
      } else {
        video.pause()
        setPlaying(false)
      }
    }, [])

    const toggleMute = useCallback(() => {
      const video = videoRef.current
      if (video === null) return
      video.muted = !video.muted
      setIsMuted(video.muted)
    }, [])

    const handleTimeUpdate = useCallback(() => {
      const video = videoRef.current
      if (video === null) return
      setCurrentTime(video.currentTime)
    }, [])

    const handleLoadedMetadata = useCallback(() => {
      const video = videoRef.current
      if (video === null) return
      setDuration(video.duration)
    }, [])

    const handleSeek = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        const video = videoRef.current
        if (video === null) return
        const rect = e.currentTarget.getBoundingClientRect()
        const ratio = (e.clientX - rect.left) / rect.width
        video.currentTime = ratio * duration
      },
      [duration]
    )

    const handleFullscreen = useCallback(() => {
      const video = videoRef.current
      if (video === null) return
      if (document.fullscreenElement !== null) {
        document.exitFullscreen().catch(() => {})
      } else {
        video.requestFullscreen().catch(() => {})
      }
    }, [])

    const handleEnded = useCallback(() => {
      setPlaying(false)
      setShowControls(true)
    }, [])

    return (
      <div
        ref={ref}
        className={cx(
          'gds-radius-card relative overflow-hidden',
          glass && 'gds-glass',
          className
        )}
        data-component="video-player"
        onMouseMove={controls ? resetHideTimer : undefined}
        onMouseLeave={controls ? () => setShowControls(false) : undefined}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          muted={isMuted}
          loop={loop}
          className="block h-full w-full object-cover"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          data-testid="video-element"
        />

        {controls && (
          <VideoControls
            currentTime={currentTime}
            duration={duration}
            playing={playing}
            isMuted={isMuted}
            showControls={showControls}
            onTogglePlay={togglePlay}
            onToggleMute={toggleMute}
            onSeek={handleSeek}
            onFullscreen={handleFullscreen}
          />
        )}
      </div>
    )
  }
)
