import type { ReactNode } from 'react'
import { Children } from 'react'

import { cx } from '../utils/cx'

type StaggerProps = { animation?: 'fade' | 'scale' | 'slide-up'; children: ReactNode[]; className?: string; delay?: number }

const animationClasses: Record<string, string> = {
  fade: 'animate-[stagger-fade_0.4s_ease_both]',
  scale: 'animate-[stagger-scale_0.4s_ease_both]',
  'slide-up': 'animate-[stagger-slide-up_0.4s_ease_both]',
}

export function Stagger({ animation = 'fade', children, className, delay = 80 }: StaggerProps) {
  const items = Children.toArray(children)
  return (
    <div className={cx('', className)} data-component="stagger">
      {items.map((child, i) => (
        <div className={animationClasses[animation]} key={i} style={{ animationDelay: `${i * delay}ms` }}>
          {child}
        </div>
      ))}
    </div>
  )
}

export type { StaggerProps }
