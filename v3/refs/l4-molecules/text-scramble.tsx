// text-scramble — text that scrambles through random characters before revealing
import { forwardRef, useEffect, useRef, useState } from 'react'

import { cx } from '../utils/cx'

export type TextScrambleProps = {
  characters?: string
  className?: string
  speed?: number
  text: string
}

export const TextScramble = forwardRef<HTMLSpanElement, TextScrambleProps>(
  function TextScramble(
    {
      characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%',
      className,
      speed = 50,
      text,
    },
    ref
  ) {
    const [display, setDisplay] = useState(text)
    const frameRef = useRef(0)

    useEffect(() => {
      let iteration = 0
      const target = text

      const interval = setInterval(() => {
        setDisplay(
          target
            .split('')
            .map((char, i) => {
              if (i < iteration) return target[i]
              return characters[Math.floor(Math.random() * characters.length)]
            })
            .join('')
        )

        iteration += 1 / 3
        if (iteration >= target.length) {
          clearInterval(interval)
          setDisplay(target)
        }
      }, speed)

      return () => clearInterval(interval)
    }, [text, characters, speed])

    // cleanup on unmount
    useEffect(() => {
      const frame = frameRef
      return () => cancelAnimationFrame(frame.current)
    }, [])

    return (
      <span
        ref={ref}
        className={cx('text-fg inline-block font-mono', className)}
        data-component="text-scramble"
        aria-label={text}
      >
        {display}
      </span>
    )
  }
)
