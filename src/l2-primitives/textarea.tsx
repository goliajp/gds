import { cva } from 'class-variance-authority'
import { forwardRef } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'
import type { VariantProps } from '../utils/types'

type TextareaResize = 'both' | 'none' | 'vertical'

const textareaVariants = cva(
  'w-full gds-radius-input border bg-bg gds-pad-x gds-pad-y text-fg gds-text-body placeholder:text-fg-muted/50 outline-none disabled:cursor-not-allowed disabled:opacity-50 ' +
    focusCls,
  {
    compoundVariants: [
      {
        error: true,
        className: 'focus-visible:ring-danger',
      },
    ],
    defaultVariants: {
      error: false,
    },
    variants: {
      error: {
        false: 'border-border hover:border-border-strong',
        true: 'border-danger',
      },
    },
  }
)

const resizeClasses: Record<TextareaResize, string> = {
  both: 'resize',
  none: 'resize-none',
  vertical: 'resize-y',
}

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  VariantProps<typeof textareaVariants> & {
    autoGrow?: boolean
    glass?: boolean
    resize?: TextareaResize
  }

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      autoGrow = false,
      className,
      error,
      glass,
      resize = 'vertical',
      ...props
    },
    ref
  ) {
    return (
      <textarea
        className={cx(
          textareaVariants({ error }),
          resizeClasses[resize],
          autoGrow && '[field-sizing:content] overflow-hidden',
          glassClass(glass),
          glass === true && 'bg-bg/60 border-white/10',
          className
        )}
        data-component="textarea"
        ref={ref}
        {...props}
      />
    )
  }
)

export { textareaVariants }
export type { TextareaProps, TextareaResize }
