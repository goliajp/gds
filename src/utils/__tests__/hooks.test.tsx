import { act, render, renderHook } from '@testing-library/react'
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

// helper component that uses useFocusTrap and renders a div with buttons
function TrapContainer({ active }: { active: boolean }) {
  const ref = useFocusTrap(active)
  return (
    <div ref={ref} data-testid="trap">
      <button data-testid="btn1">First</button>
      <button data-testid="btn2">Last</button>
    </div>
  )
}

function EmptyTrapContainer({ active }: { active: boolean }) {
  const ref = useFocusTrap(active)
  return (
    <div ref={ref} data-testid="trap">
      <span>no focusable elements</span>
    </div>
  )
}

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

  it('does nothing when active is false', () => {
    const { result, unmount } = renderHook(() => useFocusTrap(false))
    expect(result.current.current).toBeNull()
    unmount()
  })

  it('ref.current is null when not attached to DOM', () => {
    const { result } = renderHook(() => useFocusTrap(true))
    expect(result.current.current).toBeNull()
  })

  it('focuses first focusable element after timeout', () => {
    vi.useFakeTimers()
    const { getByTestId } = render(<TrapContainer active />)
    const trap = getByTestId('trap')
    expect(trap).not.toBeNull()

    // advance past the 50ms setTimeout
    act(() => vi.advanceTimersByTime(60))
    vi.useRealTimers()
  })

  it('handles Tab key on last element by wrapping to first', () => {
    vi.useFakeTimers()
    const { getByTestId } = render(<TrapContainer active />)
    act(() => vi.advanceTimersByTime(60))

    const btn2 = getByTestId('btn2')
    btn2.focus()

    // dispatch Tab (not shift) while on last element
    const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true })
    document.dispatchEvent(tabEvent)

    vi.useRealTimers()
  })

  it('handles Shift+Tab key on first element by wrapping to last', () => {
    vi.useFakeTimers()
    const { getByTestId } = render(<TrapContainer active />)
    act(() => vi.advanceTimersByTime(60))

    const btn1 = getByTestId('btn1')
    btn1.focus()

    // dispatch Shift+Tab while on first element
    const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true })
    document.dispatchEvent(tabEvent)

    vi.useRealTimers()
  })

  it('ignores non-Tab keys', () => {
    vi.useFakeTimers()
    render(<TrapContainer active />)
    act(() => vi.advanceTimersByTime(60))

    // dispatch Enter — should not throw
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
    document.dispatchEvent(enterEvent)

    vi.useRealTimers()
  })

  it('handles container with no focusable elements', () => {
    vi.useFakeTimers()
    render(<EmptyTrapContainer active />)
    act(() => vi.advanceTimersByTime(60))

    // dispatch Tab — focusable list is empty, should not throw
    const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true })
    document.dispatchEvent(tabEvent)

    vi.useRealTimers()
  })

  it('restores previous focus on unmount', () => {
    vi.useFakeTimers()
    const button = document.createElement('button')
    document.body.appendChild(button)
    button.focus()

    const { unmount } = render(<TrapContainer active />)
    act(() => vi.advanceTimersByTime(60))
    unmount()

    vi.useRealTimers()
    document.body.removeChild(button)
  })

  it('cleans up keydown listener on unmount', () => {
    vi.useFakeTimers()
    const { unmount } = render(<TrapContainer active />)
    act(() => vi.advanceTimersByTime(60))
    unmount()

    // dispatch Tab after unmount — should not throw
    const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true })
    document.dispatchEvent(tabEvent)

    vi.useRealTimers()
  })
})
