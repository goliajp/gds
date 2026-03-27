import { cx } from '../utils/cx'

type SkipNavProps = {
  targetId?: string
  label?: string
  className?: string
}

export function SkipNav({
  targetId = 'main-content',
  label = 'Skip to content',
  className,
}: SkipNavProps) {
  return (
    <a
      className={cx(
        'absolute left-2 top-2 z-50 -translate-y-full rounded bg-accent px-3 py-2 text-sm font-medium text-white transition-transform focus:translate-y-0 focus:outline-none',
        className,
      )}
      data-component="skip-nav"
      href={`#${targetId}`}
    >
      {label}
    </a>
  )
}

export type { SkipNavProps }
