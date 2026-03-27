// phone-input — phone number input with country code prefix
import { forwardRef, useCallback, useRef, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { useClickOutside } from '../utils/hooks'

export type PhoneCountry = {
  code: string
  label: string
  flag: string
}

const DEFAULT_COUNTRIES: PhoneCountry[] = [
  { code: '+1', label: 'US', flag: '\u{1F1FA}\u{1F1F8}' },
  { code: '+44', label: 'UK', flag: '\u{1F1EC}\u{1F1E7}' },
  { code: '+81', label: 'JP', flag: '\u{1F1EF}\u{1F1F5}' },
  { code: '+86', label: 'CN', flag: '\u{1F1E8}\u{1F1F3}' },
  { code: '+82', label: 'KR', flag: '\u{1F1F0}\u{1F1F7}' },
]

export type PhoneInputProps = {
  value: string
  onChange: (value: string) => void
  defaultCountry?: string
  countries?: PhoneCountry[]
  disabled?: boolean
  error?: boolean
  placeholder?: string
  className?: string
}

export const PhoneInput = forwardRef<HTMLDivElement, PhoneInputProps>(
  function PhoneInput(
    {
      value,
      onChange,
      defaultCountry = '+81',
      countries,
      disabled = false,
      error = false,
      placeholder = 'Phone number',
      className,
    },
    ref,
  ) {
    const countryList = countries ?? DEFAULT_COUNTRIES
    const [selectedCode, setSelectedCode] = useState(defaultCountry)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useClickOutside(dropdownRef, dropdownOpen, () => setDropdownOpen(false))

    const selectedCountry = countryList.find((c) => c.code === selectedCode) ?? countryList[0]

    const handleCountrySelect = useCallback((code: string) => {
      setSelectedCode(code)
      setDropdownOpen(false)
    }, [])

    const handleInputChange = useCallback((raw: string) => {
      // strip non-digit chars except dashes
      const cleaned = raw.replace(/[^\d-]/g, '')
      onChange(cleaned)
    }, [onChange])

    return (
      <div
        ref={ref}
        className={cx(
          'relative inline-flex items-stretch gds-h gds-radius-input border',
          error ? 'border-danger' : 'border-border',
          disabled && 'cursor-not-allowed opacity-40',
          className,
        )}
        data-component="phone-input"
        data-disabled={disabled ? '' : undefined}
        data-error={error ? '' : undefined}
      >
        {/* country code selector */}
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            disabled={disabled}
            className={cx(
              'flex h-full items-center gap-1 border-r border-border px-2 text-sm select-none',
              'hover:bg-white/5 transition-colors gds-radius-input rounded-r-none',
              focusCls,
            )}
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-label="Select country code"
          >
            <span>{selectedCountry?.flag}</span>
            <span className="text-fg-muted gds-text-body">{selectedCountry?.code}</span>
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 top-full z-50 mt-1 min-w-[140px] animate-popup rounded-lg border border-border bg-surface shadow-lg">
              {countryList.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  className={cx(
                    'flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm hover:bg-white/5 transition-colors',
                    c.code === selectedCode && 'bg-accent/10 text-accent',
                  )}
                  onClick={() => handleCountrySelect(c.code)}
                >
                  <span>{c.flag}</span>
                  <span className="text-fg-muted">{c.label}</span>
                  <span className="ml-auto text-fg-muted/60">{c.code}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* phone number input */}
        <input
          type="tel"
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          className={cx(
            'flex-1 bg-transparent px-3 text-fg gds-text-body focus:outline-none',
            focusCls,
          )}
          aria-label="Phone number"
        />
      </div>
    )
  },
)
