// color-picker — preset swatches + custom hex input
import { forwardRef, useCallback, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'

const DEFAULT_PRESETS = [
  '#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4',
  '#3b82f6', '#8b5cf6', '#ec4899', '#64748b', '#ffffff',
]

const HEX_REGEX = /^#[0-9a-fA-F]{6}$/

export type ColorPickerProps = {
  value: string
  onChange: (color: string) => void
  presets?: string[]
  showInput?: boolean
  disabled?: boolean
  className?: string
}

export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
  function ColorPicker({ value, onChange, presets, showInput = true, disabled = false, className }, ref) {
    const swatches = presets ?? DEFAULT_PRESETS
    const [inputValue, setInputValue] = useState(value)

    const handleSwatchClick = useCallback((color: string) => {
      if (disabled) return
      onChange(color)
      setInputValue(color)
    }, [disabled, onChange])

    const handleInputChange = useCallback((raw: string) => {
      // ensure # prefix
      const normalized = raw.startsWith('#') ? raw : `#${raw}`
      setInputValue(normalized)

      if (HEX_REGEX.test(normalized)) {
        onChange(normalized)
      }
    }, [onChange])

    return (
      <div
        ref={ref}
        className={cx('flex flex-col gds-gap', className)}
        data-component="color-picker"
        data-disabled={disabled ? '' : undefined}
      >
        {/* current color preview */}
        <div className="flex items-center gds-gap">
          <div
            className="h-8 w-8 shrink-0 gds-radius-button border border-border"
            style={{ backgroundColor: value }}
          />
          <span className="gds-text-body font-mono text-fg-muted">{value}</span>
        </div>

        {/* preset swatches */}
        <div className="flex flex-wrap gap-1.5">
          {swatches.map((color) => {
            const isActive = color.toLowerCase() === value.toLowerCase()
            return (
              <button
                key={color}
                type="button"
                disabled={disabled}
                onClick={() => handleSwatchClick(color)}
                className={cx(
                  'h-6 w-6 rounded-full border transition-shadow',
                  isActive ? 'ring-2 ring-accent ring-offset-1 ring-offset-bg border-transparent' : 'border-border hover:scale-110',
                  disabled && 'cursor-not-allowed opacity-40',
                  focusCls,
                )}
                style={{ backgroundColor: color }}
                aria-label={`Select color ${color}`}
              />
            )
          })}
        </div>

        {/* hex input */}
        {showInput && (
          <div className="flex items-center gds-gap">
            <span className="gds-text-body font-mono text-fg-muted select-none">#</span>
            <input
              type="text"
              value={inputValue.replace(/^#/, '')}
              onChange={(e) => handleInputChange(e.target.value)}
              disabled={disabled}
              maxLength={6}
              placeholder="000000"
              className={cx(
                'w-20 rounded border border-border bg-transparent px-2 py-1 font-mono gds-text-body text-fg',
                'focus:border-accent focus:outline-none',
                disabled && 'cursor-not-allowed opacity-40',
              )}
              aria-label="Hex color input"
            />
          </div>
        )}
      </div>
    )
  },
)
