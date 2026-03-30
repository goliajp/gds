import { cva } from 'class-variance-authority'
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import type { VariantProps } from '../utils/types'

const anchorVariants = cva(
  'inline-flex items-center gds-gap-xs underline-offset-2 transition-colors hover:underline ' +
    focusCls,
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: 'text-accent hover:text-accent/80',
        muted: 'text-fg-muted hover:text-fg',
      },
    },
  }
)

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof anchorVariants> & {
    external?: boolean
    externalIcon?: ReactNode
  }

export const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(
  function Anchor(
    { children, className, external = false, externalIcon, variant, ...props },
    ref
  ) {
    return (
      <a
        className={cx(anchorVariants({ variant }), className)}
        data-component="anchor"
        ref={ref}
        {...(external && {
          rel: 'noopener noreferrer',
          target: '_blank',
        })}
        {...props}
      >
        {children}
        {external && externalIcon !== undefined && (
          <span className="gds-icon-child-xs">{externalIcon}</span>
        )}
      </a>
    )
  }
)

export { anchorVariants }
export type { AnchorProps }
