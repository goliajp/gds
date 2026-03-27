import type { ReactNode } from 'react'
import { useCallback, useEffect } from 'react'

import { Kbd } from '../l2-primitives/kbd'
import { cx } from '../utils/cx'

type KeyboardShortcutProps = {
  keys: string
  onTrigger: () => void
  showBadge?: boolean
  disabled?: boolean
  className?: string
}

function parseKeys(keys: string) {
  const parts = keys.toLowerCase().split('+')
  const modifiers = {
    ctrl: false,
    meta: false,
    shift: false,
    alt: false,
  }
  let mainKey = ''

  for (const part of parts) {
    if (part === 'ctrl') {
      modifiers.ctrl = true
    } else if (part === 'meta' || part === 'cmd') {
      modifiers.meta = true
    } else if (part === 'shift') {
      modifiers.shift = true
    } else if (part === 'alt') {
      modifiers.alt = true
    } else {
      mainKey = part
    }
  }

  return { modifiers, mainKey }
}

function formatKeyLabel(part: string): string {
  const map: Record<string, string> = {
    ctrl: 'Ctrl',
    meta: '\u2318',
    cmd: '\u2318',
    shift: '\u21E7',
    alt: 'Alt',
  }
  return map[part.toLowerCase()] ?? part.toUpperCase()
}

export function KeyboardShortcut({
  keys,
  onTrigger,
  showBadge = false,
  disabled = false,
  className,
}: KeyboardShortcutProps) {
  const { modifiers, mainKey } = parseKeys(keys)

  const handler = useCallback(
    (e: KeyboardEvent) => {
      if (disabled) return
      if (e.ctrlKey !== modifiers.ctrl) return
      if (e.metaKey !== modifiers.meta) return
      if (e.shiftKey !== modifiers.shift) return
      if (e.altKey !== modifiers.alt) return
      if (e.key.toLowerCase() !== mainKey) return

      e.preventDefault()
      onTrigger()
    },
    [disabled, modifiers.ctrl, modifiers.meta, modifiers.shift, modifiers.alt, mainKey, onTrigger],
  )

  useEffect(() => {
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handler])

  if (!showBadge) return null

  const parts = keys.split('+')
  const badges: ReactNode[] = parts.map((part, i) => (
    <Kbd key={i}>{formatKeyLabel(part)}</Kbd>
  ))

  return (
    <span className={cx('inline-flex items-center gap-1', className)} data-component="keyboard-shortcut">
      {badges}
    </span>
  )
}

export type { KeyboardShortcutProps }
