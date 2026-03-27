// L-dep internal hooks — DOM-level utilities used by overlay components
// these are NOT L1 systems — they're stateless side-effect helpers

import { useEffect, useRef, useState } from 'react'

// prevent body scroll when overlay is open (dialog, sheet, command palette)
export function useScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [active])
}

// close overlay on Escape key
export function useEscapeKey(active: boolean, onClose: () => void): void {
  useEffect(() => {
    if (!active) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [active, onClose])
}

// detect click outside an element
export function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  active: boolean,
  onClickOutside: () => void,
): void {
  useEffect(() => {
    if (!active) return
    const handler = (e: MouseEvent) => {
      if (ref.current !== null && !ref.current.contains(e.target as Node)) {
        onClickOutside()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [ref, active, onClickOutside])
}

// subscribe to a CSS media query — returns live match state
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    try { return window.matchMedia(query).matches } catch { return false }
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    let mql: MediaQueryList
    try { mql = window.matchMedia(query) } catch { return }
    setMatches(mql.matches)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [query])

  return matches
}

// convenience breakpoint hooks
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 767px)')
}

export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)')
}

// trap tab focus within a container (for modals/dialogs)
const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

export function useFocusTrap(active: boolean): React.RefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement>(null)
  const prevFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!active) return
    prevFocusRef.current = document.activeElement as HTMLElement | null
    const container = ref.current
    if (container === null) return

    const timer = setTimeout(() => {
      container.querySelector<HTMLElement>(FOCUSABLE)?.focus()
    }, 50)

    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const focusable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handler)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('keydown', handler)
      prevFocusRef.current?.focus()
    }
  }, [active])

  return ref
}
