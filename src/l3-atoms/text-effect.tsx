import { forwardRef } from 'react'

import { cx } from '../utils/cx'

type TextEffectType = 'glow' | 'gradient' | 'highlight'

type TextEffectProps = React.HTMLAttributes<HTMLSpanElement> & {
  children: string
  effect: TextEffectType
  gradientFrom?: string
  gradientTo?: string
}

export const TextEffect = forwardRef<HTMLSpanElement, TextEffectProps>(
  function TextEffect(
    { children, className, effect, gradientFrom, gradientTo, style, ...props },
    ref
  ) {
    const from = gradientFrom ?? 'var(--gds-accent)'
    const to = gradientTo ?? 'var(--gds-success)'

    if (effect === 'gradient') {
      return (
        <span
          className={cx('bg-clip-text text-transparent', className)}
          data-component="text-effect"
          data-variant={effect}
          ref={ref}
          style={{
            backgroundImage: `linear-gradient(135deg, ${from}, ${to})`,
            ...style,
          }}
          {...props}
        >
          {children}
        </span>
      )
    }

    if (effect === 'highlight') {
      return (
        <span
          className={cx('bg-accent/20 box-decoration-clone px-1', className)}
          data-component="text-effect"
          data-variant={effect}
          ref={ref}
          style={style}
          {...props}
        >
          {children}
        </span>
      )
    }

    // glow
    return (
      <span
        className={cx(className)}
        data-component="text-effect"
        data-variant={effect}
        ref={ref}
        style={{
          textShadow: `0 0 8px var(--gds-accent), 0 0 16px var(--gds-accent)`,
          ...style,
        }}
        {...props}
      >
        {children}
      </span>
    )
  }
)

export type { TextEffectProps, TextEffectType }
