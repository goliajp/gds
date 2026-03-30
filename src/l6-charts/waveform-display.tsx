import { forwardRef, useMemo } from 'react'

import { cx } from '../utils/cx'

export type WaveformDisplayProps = {
  data: number[]
  width?: number
  height?: number
  progress?: number
  color?: string
  playedColor?: string
  glass?: boolean
  className?: string
}

export const WaveformDisplay = forwardRef<HTMLDivElement, WaveformDisplayProps>(
  function WaveformDisplay(
    {
      data,
      width = 400,
      height = 100,
      progress = 0,
      color = 'var(--gds-accent, #6366f1)',
      playedColor,
      glass,
      className,
      ...props
    },
    ref
  ) {
    const resolvedPlayedColor = playedColor ?? color
    const progressIndex = Math.floor(progress * data.length)
    const centerY = height / 2

    const bars = useMemo(() => {
      if (data.length === 0) return []
      const barWidth = width / data.length
      return data.map((amp, i) => {
        const barHeight = Math.max(amp * centerY, 1)
        return {
          x: i * barWidth,
          y: centerY - barHeight,
          w: Math.max(barWidth - 1, 1),
          h: barHeight * 2,
          played: i < progressIndex,
        }
      })
    }, [data, width, centerY, progressIndex])

    return (
      <div
        ref={ref}
        className={cx(
          'gds-radius-popover border-border inline-block border',
          glass && 'bg-white/5 backdrop-blur-md',
          className
        )}
        data-component="waveform-display"
        {...props}
      >
        <svg height={height} width={width} viewBox={`0 0 ${width} ${height}`}>
          {bars.map((bar, i) => (
            <rect
              key={i}
              x={bar.x}
              y={bar.y}
              width={bar.w}
              height={bar.h}
              fill={bar.played ? resolvedPlayedColor : color}
              opacity={bar.played ? 1 : 0.3}
              rx={1}
            />
          ))}
        </svg>
      </div>
    )
  }
)
