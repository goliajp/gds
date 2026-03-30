import type { ReactNode } from 'react'

import { cx } from '../utils/cx'

type OrbitProps = {
  children: ReactNode[]
  className?: string
  duration?: number
  radius?: number
}

export function Orbit({
  children,
  className,
  duration = 10,
  radius = 100,
}: OrbitProps) {
  const count = children.length
  return (
    <div
      className={cx('relative select-none', className)}
      data-component="orbit"
      style={{ height: radius * 2, width: radius * 2 }}
    >
      {children.map((child, i) => {
        const angle = (360 / count) * i
        return (
          <div
            className="absolute top-1/2 left-1/2"
            key={i}
            style={{
              animation: `orbit-spin ${duration}s linear infinite`,
              animationDelay: `${-(duration / count) * i}s`,
              height: 0,
              width: 0,
            }}
          >
            <div
              className="-translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`,
              }}
            >
              {child}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export type { OrbitProps }
