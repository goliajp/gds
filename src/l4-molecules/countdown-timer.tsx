// countdown-timer — DD:HH:MM:SS countdown to a target date
import { forwardRef, useEffect, useState } from 'react'

import { cx } from '../utils/cx'

export type CountdownTimerProps = {
  className?: string
  label?: string
  onComplete?: () => void
  target: Date
}

function computeRemaining(target: Date): { dd: string; hh: string; mm: string; ss: string; done: boolean } {
  const diff = Math.max(0, target.getTime() - Date.now())
  const done = diff <= 0
  const totalSec = Math.floor(diff / 1000)
  const dd = String(Math.floor(totalSec / 86400)).padStart(2, '0')
  const hh = String(Math.floor((totalSec % 86400) / 3600)).padStart(2, '0')
  const mm = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0')
  const ss = String(totalSec % 60).padStart(2, '0')
  return { dd, hh, mm, ss, done }
}

export const CountdownTimer = forwardRef<HTMLDivElement, CountdownTimerProps>(
  function CountdownTimer({ className, label, onComplete, target }, ref) {
    const [remaining, setRemaining] = useState(() => computeRemaining(target))

    useEffect(() => {
      const id = setInterval(() => {
        const next = computeRemaining(target)
        setRemaining(next)
        if (next.done) {
          clearInterval(id)
          onComplete?.()
        }
      }, 1000)
      return () => clearInterval(id)
    }, [target, onComplete])

    return (
      <div ref={ref} className={cx('flex flex-col items-center gds-gap-sm', className)} data-component="countdown-timer">
        {label !== undefined && <span className="gds-text text-fg-muted">{label}</span>}
        <div className="flex items-center gap-1 font-mono text-2xl font-bold text-fg tabular-nums">
          <span>{remaining.dd}</span>:<span>{remaining.hh}</span>:<span>{remaining.mm}</span>:<span>{remaining.ss}</span>
        </div>
      </div>
    )
  },
)
