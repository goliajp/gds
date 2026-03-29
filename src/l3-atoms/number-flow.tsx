import { forwardRef, useMemo } from 'react'

import { cx } from '../utils/cx'

type NumberFlowProps = { className?: string; format?: (n: number) => string; value: number }

export const NumberFlow = forwardRef<HTMLSpanElement, NumberFlowProps>(
  function NumberFlow({ className, format = String, value }, ref) {
    const chars = useMemo(() => format(value).split(''), [value, format])
    return (
      <span className={cx('inline-flex items-center tabular-nums select-none', className)} data-component="number-flow" ref={ref}>
        {chars.map((char, i) => {
          if (char >= '0' && char <= '9') {
            return (
              <span className="inline-block overflow-hidden" key={`${i}-slot`} style={{ lineHeight: 1 }}>
                <span className="inline-block transition-transform duration-300 ease-out">{char}</span>
              </span>
            )
          }
          return <span key={`${i}-static`}>{char}</span>
        })}
      </span>
    )
  },
)

export type { NumberFlowProps }
