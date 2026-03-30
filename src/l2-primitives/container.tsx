// container — responsive max-width wrapper with size variants
import { cva } from 'class-variance-authority'
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { cx } from '../utils/cx'
import type { VariantProps } from '../utils/types'

const containerVariants = cva('mx-auto w-full px-4', {
  defaultVariants: { size: 'default' },
  variants: {
    size: {
      default: 'max-w-screen-md',
      full: 'max-w-full',
      lg: 'max-w-screen-lg',
      sm: 'max-w-screen-sm',
      xl: 'max-w-screen-xl',
    },
  },
})

type ContainerProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof containerVariants> & {
    children: ReactNode
  }

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  function Container({ children, className, size, ...props }, ref) {
    return (
      <div
        className={cx(containerVariants({ size }), className)}
        data-component="container"
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)

export { containerVariants }
export type { ContainerProps }
