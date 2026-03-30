import type { ReactNode } from 'react'
import { forwardRef, useState } from 'react'

import { Input } from '../l2-primitives/input'
import { Progress } from '../l2-primitives/progress'
import { cx } from '../utils/cx'

type StrengthLevel = 'none' | 'weak' | 'fair' | 'strong'

function computeStrength(value: string): StrengthLevel {
  if (value.length === 0) return 'none'
  let score = 0
  if (value.length >= 8) score += 1
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score += 1
  if (/\d/.test(value)) score += 1
  if (/[^a-zA-Z0-9]/.test(value)) score += 1
  if (score <= 1) return 'weak'
  if (score <= 2) return 'fair'
  return 'strong'
}

const strengthConfig: Record<
  Exclude<StrengthLevel, 'none'>,
  { label: string; value: number; variant: 'danger' | 'warning' | 'success' }
> = {
  weak: { label: 'Weak', value: 33, variant: 'danger' },
  fair: { label: 'Fair', value: 66, variant: 'warning' },
  strong: { label: 'Strong', value: 100, variant: 'success' },
}

type PasswordInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type'
> & {
  error?: boolean
  glass?: boolean
  icon?: ReactNode
  inputSize?: 'default' | 'sm'
  showStrength?: boolean
}

const eyeSvg = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const eyeOffSvg = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
)

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput({ className, showStrength = false, ...props }, ref) {
    const [visible, setVisible] = useState(false)
    const value = typeof props.value === 'string' ? props.value : ''
    const strength = showStrength ? computeStrength(value) : 'none'

    const toggleButton = (
      <button
        aria-label={visible ? 'Hide password' : 'Show password'}
        className="text-fg-muted/50 hover:text-fg-muted cursor-pointer"
        onClick={() => setVisible((v) => !v)}
        tabIndex={-1}
        type="button"
      >
        {visible ? eyeOffSvg : eyeSvg}
      </button>
    )

    return (
      <div
        className={cx('flex flex-col gap-1.5', className)}
        data-component="password-input"
      >
        <Input
          {...props}
          ref={ref}
          rightIcon={toggleButton}
          type={visible ? 'text' : 'password'}
        />
        {showStrength && strength !== 'none' && (
          <div className="flex items-center gap-2">
            <Progress
              size="sm"
              value={strengthConfig[strength].value}
              variant={strengthConfig[strength].variant}
            />
            <span className="text-fg-muted shrink-0 text-[10px] select-none">
              {strengthConfig[strength].label}
            </span>
          </div>
        )}
      </div>
    )
  }
)

export type { PasswordInputProps }
