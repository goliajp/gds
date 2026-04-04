// color-swatch — color display block with optional copy-to-clipboard
import { cva } from 'class-variance-authority'
import { forwardRef, useCallback, useRef, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import type { VariantProps } from '../utils/types'

const colorSwatchVariants = cva('rounded-md', {
  defaultVariants: { size: 'default' },
  variants: {
    size: {
      default: 'h-10 w-10',
      lg: 'h-14 w-14',
      sm: 'h-7 w-7',
    },
  },
})

type ColorSwatchProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof colorSwatchVariants> & {
    color: string
    copyable?: boolean
    label?: string
  }

export const ColorSwatch = forwardRef<HTMLSpanElement, ColorSwatchProps>(
  function ColorSwatch(
    { className, color, copyable = false, label, size, ...props },
    ref
  ) {
    const [copied, setCopied] = useState(false)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const handleClick = useCallback(async () => {
      if (!copyable) return
      await navigator.clipboard.writeText(color)
      setCopied(true)
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current)
      }
      timerRef.current = setTimeout(() => {
        setCopied(false)
        timerRef.current = null
      }, 2000)
    }, [color, copyable])

    const swatchEl = (
      <span
        className={cx(colorSwatchVariants({ size }), 'block')}
        style={{ backgroundColor: color }}
      />
    )

    return (
      <span
        className={cx('inline-flex flex-col items-center gap-1', className)}
        data-component="color-swatch"
        ref={ref}
        {...props}
      >
        {copyable ? (
          <button
            aria-label={`Copy ${color}`}
            className={cx('rounded-md select-none', focusCls)}
            onClick={handleClick}
            type="button"
          >
            {swatchEl}
          </button>
        ) : (
          swatchEl
        )}
        <span className="text-fg-muted font-mono text-[10px]">
          {copied ? 'Copied!' : color}
        </span>
        {label !== undefined && (
          <span className="text-fg-muted/60 text-[10px]">{label}</span>
        )}
      </span>
    )
  }
)

export { colorSwatchVariants }
export type { ColorSwatchProps }
