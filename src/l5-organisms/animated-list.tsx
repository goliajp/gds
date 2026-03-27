import type { ReactNode } from 'react'
import { Children, forwardRef } from 'react'

import { cx } from '../utils/cx'

type AnimatedListAnimation = 'fade' | 'scale' | 'slide-left' | 'slide-up'

type AnimatedListProps = React.HTMLAttributes<HTMLDivElement> & {
  animation?: AnimatedListAnimation
  children: ReactNode
  stagger?: number
}

const animationClassMap: Record<AnimatedListAnimation, string> = {
  fade: 'animate-fade-in',
  scale: 'animate-scale-in',
  'slide-left': 'animate-slide-left',
  'slide-up': 'animate-slide-up',
}

export const AnimatedList = forwardRef<HTMLDivElement, AnimatedListProps>(
  function AnimatedList(
    { animation = 'slide-up', children, className, stagger = 50, ...props },
    ref,
  ) {
    const items = Children.toArray(children)

    return (
      <div
        className={cx('flex flex-col', className)}
        data-component="animated-list"
        ref={ref}
        {...props}
      >
        {items.map((child, index) => (
          <div
            key={index}
            className={animationClassMap[animation]}
            style={{ animationDelay: `${index * stagger}ms` }}
          >
            {child}
          </div>
        ))}
      </div>
    )
  },
)

export type { AnimatedListAnimation, AnimatedListProps }
