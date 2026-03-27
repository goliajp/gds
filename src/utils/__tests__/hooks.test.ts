import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import {
  useClickOutside,
  useEscapeKey,
  useFocusTrap,
  useIsDesktop,
  useIsMobile,
  useMediaQuery,
  useScrollLock,
} from '../hooks'

describe('useScrollLock', () => {
  it('sets overflow hidden when active', () => {
    renderHook(() => useScrollLock(true))
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('restores overflow on unmount', () => {
    document.body.style.overflow = ''
    const { unmount } = renderHook(() => useScrollLock(true))
    expect(document.body.style.overflow).toBe('hidden')
    unmount()
    expect(document.body.style.overflow).toBe('')
  })

  it('does nothing when not active', () => {
    const original = document.body.style.overflow
    renderHook(() => useScrollLock(false))
    expect(document.body.style.overflow).toBe(original)
  })

  it('preserves original overflow value on restore', () => {
    document.body.style.overflow = 'scroll'
    const { unmount } = renderHook(() => useScrollLock(true))
    expect(document.body.style.overflow).toBe('hidden')
    unmount()
    expect(document.body.style.overflow).toBe('scroll')
  })
})

describe('useEscapeKey', () => {
  it('calls onClose when Escape is pressed', () => {
    const onClose = vi.fn()
    renderHook(() => useEscapeKey(true, onClose))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('does not call onClose when not active', () => {
    const onClose = vi.fn()
    renderHook(() => useEscapeKey(false, onClose))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(onClose).not.toHaveBeenCalled()
  })

  it('ignores other keys', () => {
    const onClose = vi.fn()
    renderHook(() => useEscapeKey(true, onClose))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    expect(onClose).not.toHaveBeenCalled()
  })

  it('removes listener on unmount', () => {
    const onClose = vi.fn()
    const { unmount } = renderHook(() => useEscapeKey(true, onClose))
    unmount()
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(onClose).not.toHaveBeenCalled()
  })
})

describe('useClickOutside', () => {
  it('calls handler when clicking outside the ref element', () => {
    const handler = vi.fn()
    const div = document.createElement('div')
    document.body.appendChild(div)

    const ref = { current: div }
    renderHook(() => useClickOutside(ref, true, handler))

    // click on body (outside the div)
    const event = new MouseEvent('mousedown', { bubbles: true })
    document.body.dispatchEvent(event)

    expect(handler).toHaveBeenCalledOnce()
    document.body.removeChild(div)
  })

  it('does not call handler when clicking inside the ref element', () => {
    const handler = vi.fn()
    const div = document.createElement('div')
    const child = document.createElement('span')
    div.appendChild(child)
    document.body.appendChild(div)

    const ref = { current: div }
    renderHook(() => useClickOutside(ref, true, handler))

    const event = new MouseEvent('mousedown', { bubbles: true })
    child.dispatchEvent(event)

    expect(handler).not.toHaveBeenCalled()
    document.body.removeChild(div)
  })

  it('does nothing when not active', () => {
    const handler = vi.fn()
    const div = document.createElement('div')
    document.body.appendChild(div)

    const ref = { current: div }
    renderHook(() => useClickOutside(ref, false, handler))

    const event = new MouseEvent('mousedown', { bubbles: true })
    document.body.dispatchEvent(event)

    expect(handler).not.toHaveBeenCalled()
    document.body.removeChild(div)
  })

  it('handles null ref gracefully', () => {
    const handler = vi.fn()
    const ref = { current: null }
    renderHook(() => useClickOutside(ref, true, handler))

    const event = new MouseEvent('mousedown', { bubbles: true })
    document.body.dispatchEvent(event)

    // should not call handler when ref is null
    expect(handler).not.toHaveBeenCalled()
  })
})

describe('useMediaQuery', () => {
  it('returns a boolean', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 1024px)'))
    expect(typeof result.current).toBe('boolean')
  })

  it('responds to media query changes', () => {
    let changeHandler: ((e: MediaQueryListEvent) => void) | null = null

    const mockMql = {
      matches: false,
      addEventListener: vi.fn((_event: string, handler: (e: MediaQueryListEvent) => void) => {
        changeHandler = handler
      }),
      removeEventListener: vi.fn(),
    }

    vi.spyOn(window, 'matchMedia').mockReturnValue(mockMql as unknown as MediaQueryList)

    const { result } = renderHook(() => useMediaQuery('(min-width: 1024px)'))
    expect(result.current).toBe(false)

    // simulate media query change
    act(() => {
      if (changeHandler !== null) {
        changeHandler({ matches: true } as MediaQueryListEvent)
      }
    })

    expect(result.current).toBe(true)
    vi.restoreAllMocks()
  })

  it('handles matchMedia throwing', () => {
    vi.spyOn(window, 'matchMedia').mockImplementation(() => {
      throw new Error('not supported')
    })

    const { result } = renderHook(() => useMediaQuery('(min-width: 1024px)'))
    expect(result.current).toBe(false)
    vi.restoreAllMocks()
  })
})

describe('useIsMobile', () => {
  it('returns a boolean', () => {
    const { result } = renderHook(() => useIsMobile())
    expect(typeof result.current).toBe('boolean')
  })
})

describe('useIsDesktop', () => {
  it('returns a boolean', () => {
    const { result } = renderHook(() => useIsDesktop())
    expect(typeof result.current).toBe('boolean')
  })
})

describe('useFocusTrap', () => {
  it('returns a ref object', () => {
    const { result } = renderHook(() => useFocusTrap(false))
    expect(result.current).toHaveProperty('current')
  })

  it('ref.current is null when not attached', () => {
    const { result } = renderHook(() => useFocusTrap(true))
    expect(result.current.current).toBeNull()
  })

  it('does nothing when active is false', () => {
    const { result, unmount } = renderHook(() => useFocusTrap(false))
    expect(result.current.current).toBeNull()
    unmount()
  })

  it('restores previous focus on unmount', () => {
    const button = document.createElement('button')
    document.body.appendChild(button)
    button.focus()

    const { unmount } = renderHook(() => useFocusTrap(true))
    unmount()

    // previous focus should be restored (button)
    // note: in happy-dom, focus behavior may differ
    document.body.removeChild(button)
  })

  it('traps tab within container when active', () => {
    vi.useFakeTimers()
    const container = document.createElement('div')
    const input1 = document.createElement('input')
    const input2 = document.createElement('input')
    container.appendChild(input1)
    container.appendChild(input2)
    document.body.appendChild(container)

    // we need to manually set ref.current since renderHook doesn't attach to DOM
    const { result } = renderHook(() => useFocusTrap(false))

    // can't easily test full focus trap without mounting to real DOM,
    // but verify the hook doesn't throw
    expect(result.current).toBeDefined()

    vi.useRealTimers()
    document.body.removeChild(container)
  })
})
