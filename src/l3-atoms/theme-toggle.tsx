// theme-toggle — dark/light mode toggle with icon transition
import { forwardRef } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'

type ThemeToggleMode = 'dark' | 'light'

export type ThemeToggleProps = {
  mode: ThemeToggleMode
  onChange: (mode: ThemeToggleMode) => void
  size?: 'default' | 'sm'
  className?: string
}

const sizeMap = {
  default: 'h-8 w-8',
  sm: 'h-6 w-6',
}

const iconSizeMap = {
  default: 16,
  sm: 14,
}

export const ThemeToggle = forwardRef<HTMLButtonElement, ThemeToggleProps>(
  function ThemeToggle({ mode, onChange, size = 'default', className }, ref) {
    const isDark = mode === 'dark'
    const iconSize = iconSizeMap[size]

    return (
      <button
        ref={ref}
        type="button"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        onClick={() => onChange(isDark ? 'light' : 'dark')}
        className={cx(
          'inline-flex items-center justify-center rounded-full text-fg-muted transition-colors hover:text-fg select-none',
          sizeMap[size],
          focusCls,
          className,
        )}
        data-component="theme-toggle"
        data-state={mode}
      >
        {isDark ? (
          // sun icon — shown in dark mode, click to switch to light
          <svg width={iconSize} height={iconSize} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="transition-transform duration-200">
            <circle cx="8" cy="8" r="3" />
            <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" />
          </svg>
        ) : (
          // moon icon — shown in light mode, click to switch to dark
          <svg width={iconSize} height={iconSize} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="transition-transform duration-200">
            <path d="M13.5 8.5a5.5 5.5 0 01-7-7A5.5 5.5 0 108 14a5.48 5.48 0 005.5-5.5z" />
          </svg>
        )}
      </button>
    )
  },
)
