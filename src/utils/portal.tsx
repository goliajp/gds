// portal — anti-corruption wrapper for react-dom createPortal
// all portal rendering must go through this utility, not import react-dom directly
import type { ReactNode, ReactPortal } from 'react'
import { createPortal } from 'react-dom'

// render children into a DOM container via portal
// returns null during SSR (no document available)
export function renderPortal(
  children: ReactNode,
  container?: Element | null,
): ReactPortal | null {
  if (typeof document === 'undefined') return null
  return createPortal(children, container ?? document.body)
}
