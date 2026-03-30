import { useCallback } from 'react'

import { cx } from '../utils/cx'

type VolumeSliderProps = {
  className?: string
  onChange: (v: number) => void
  value: number
}

const TOTAL_BARS = 10

export function VolumeSlider({
  className,
  onChange,
  value,
}: VolumeSliderProps) {
  const filledBars = Math.round((value / 100) * TOTAL_BARS)

  const handleBarClick = useCallback(
    (barIndex: number) => {
      onChange(Math.round(((barIndex + 1) / TOTAL_BARS) * 100))
    },
    [onChange]
  )

  return (
    <div
      className={cx(
        'inline-flex flex-col-reverse items-center gap-1 select-none',
        className
      )}
      data-component="volume-slider"
    >
      {Array.from({ length: TOTAL_BARS }, (_, i) => (
        <button
          className={cx(
            'h-2 w-8 cursor-pointer rounded-sm transition-colors',
            i < filledBars ? 'bg-accent' : 'bg-bg-tertiary'
          )}
          key={i}
          onClick={() => handleBarClick(i)}
          type="button"
        />
      ))}
    </div>
  )
}

export type { VolumeSliderProps }
