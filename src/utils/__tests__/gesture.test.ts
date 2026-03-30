import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { drag, inertia, longPress, swipe } from '../../l0-tokens/gesture-system'
import { applyInertia, useDrag, useLongPress, useSwipe } from '../gesture'

// helper to create a mock PointerEvent-like object
function pointerEvent(
  overrides: Record<string, unknown> = {}
): React.PointerEvent {
  return {
    clientX: 0,
    clientY: 0,
    pointerId: 1,
    target: {
      setPointerCapture: vi.fn(),
    },
    ...overrides,
  } as unknown as React.PointerEvent
}

describe('useSwipe', () => {
  it('detects a right swipe', () => {
    const onSwipe = vi.fn()
    const { result } = renderHook(() => useSwipe(onSwipe))

    // start at 0,0
    act(() => {
      result.current.onPointerDown(pointerEvent({ clientX: 0, clientY: 0 }))
    })

    // move far right
    const distance = swipe.minDistance + 20
    act(() => {
      result.current.onPointerMove(
        pointerEvent({ clientX: distance, clientY: 0 })
      )
    })

    // release quickly (mock Date.now to control velocity)
    const originalNow = Date.now
    let callCount = 0
    vi.spyOn(Date, 'now').mockImplementation(() => {
      callCount++
      // first call in onPointerDown, second in onPointerUp
      if (callCount <= 1) return 1000
      return 1010 // 10ms elapsed -> high velocity
    })

    // re-do from start with mocked time
    const { result: result2 } = renderHook(() => useSwipe(onSwipe))
    act(() => {
      result2.current.onPointerDown(pointerEvent({ clientX: 0, clientY: 0 }))
    })
    act(() => {
      result2.current.onPointerMove(
        pointerEvent({ clientX: distance, clientY: 5 })
      )
    })
    act(() => {
      result2.current.onPointerUp()
    })

    expect(onSwipe).toHaveBeenCalledWith('right', expect.any(Number))
    Date.now = originalNow
    vi.restoreAllMocks()
  })

  it('detects a left swipe', () => {
    const onSwipe = vi.fn()
    const startTime = 1000
    let callCount = 0
    vi.spyOn(Date, 'now').mockImplementation(() => {
      callCount++
      if (callCount <= 1) return startTime
      return startTime + 10
    })

    const { result } = renderHook(() => useSwipe(onSwipe))
    const distance = swipe.minDistance + 20

    act(() =>
      result.current.onPointerDown(pointerEvent({ clientX: 100, clientY: 50 }))
    )
    act(() =>
      result.current.onPointerMove(
        pointerEvent({ clientX: 100 - distance, clientY: 50 })
      )
    )
    act(() => result.current.onPointerUp())

    expect(onSwipe).toHaveBeenCalledWith('left', expect.any(Number))
    vi.restoreAllMocks()
  })

  it('detects a down swipe', () => {
    const onSwipe = vi.fn()
    let callCount = 0
    vi.spyOn(Date, 'now').mockImplementation(() => {
      callCount++
      if (callCount <= 1) return 1000
      return 1010
    })

    const { result } = renderHook(() => useSwipe(onSwipe))
    const distance = swipe.minDistance + 20

    act(() =>
      result.current.onPointerDown(pointerEvent({ clientX: 50, clientY: 0 }))
    )
    act(() =>
      result.current.onPointerMove(
        pointerEvent({ clientX: 50, clientY: distance })
      )
    )
    act(() => result.current.onPointerUp())

    expect(onSwipe).toHaveBeenCalledWith('down', expect.any(Number))
    vi.restoreAllMocks()
  })

  it('detects an up swipe', () => {
    const onSwipe = vi.fn()
    let callCount = 0
    vi.spyOn(Date, 'now').mockImplementation(() => {
      callCount++
      if (callCount <= 1) return 1000
      return 1010
    })

    const { result } = renderHook(() => useSwipe(onSwipe))
    const distance = swipe.minDistance + 20

    act(() =>
      result.current.onPointerDown(pointerEvent({ clientX: 50, clientY: 100 }))
    )
    act(() =>
      result.current.onPointerMove(
        pointerEvent({ clientX: 50, clientY: 100 - distance })
      )
    )
    act(() => result.current.onPointerUp())

    expect(onSwipe).toHaveBeenCalledWith('up', expect.any(Number))
    vi.restoreAllMocks()
  })

  it('does not fire when distance is too short', () => {
    const onSwipe = vi.fn()
    let callCount = 0
    vi.spyOn(Date, 'now').mockImplementation(() => {
      callCount++
      if (callCount <= 1) return 1000
      return 1010
    })

    const { result } = renderHook(() => useSwipe(onSwipe))

    act(() =>
      result.current.onPointerDown(pointerEvent({ clientX: 0, clientY: 0 }))
    )
    act(() =>
      result.current.onPointerMove(pointerEvent({ clientX: 5, clientY: 0 }))
    )
    act(() => result.current.onPointerUp())

    expect(onSwipe).not.toHaveBeenCalled()
    vi.restoreAllMocks()
  })

  it('does not fire when velocity is too low', () => {
    const onSwipe = vi.fn()
    // make the gesture take a very long time so velocity is below threshold
    // velocity = distance / dt, need velocity < 0.3
    // distance = minDistance + 20 = 50, so dt must be > 50/0.3 = ~167ms
    vi.spyOn(Date, 'now')
      .mockReturnValueOnce(1000) // onPointerDown
      .mockReturnValueOnce(2000) // onPointerUp — 1000ms elapsed -> velocity = 50/1000 = 0.05

    const { result } = renderHook(() => useSwipe(onSwipe))
    const distance = swipe.minDistance + 20

    act(() =>
      result.current.onPointerDown(pointerEvent({ clientX: 0, clientY: 0 }))
    )
    act(() =>
      result.current.onPointerMove(
        pointerEvent({ clientX: distance, clientY: 0 })
      )
    )
    act(() => result.current.onPointerUp())

    expect(onSwipe).not.toHaveBeenCalled()
    vi.restoreAllMocks()
  })

  it('does not fire when cross deviation is too large', () => {
    const onSwipe = vi.fn()
    vi.spyOn(Date, 'now').mockReturnValueOnce(1000).mockReturnValueOnce(1010)

    const { result } = renderHook(() => useSwipe(onSwipe))
    // use a large horizontal distance so it's clearly horizontal,
    // but with cross deviation exceeding threshold
    const distance = swipe.maxCrossDeviation + 50

    act(() =>
      result.current.onPointerDown(pointerEvent({ clientX: 0, clientY: 0 }))
    )
    act(() =>
      result.current.onPointerMove(
        pointerEvent({
          clientX: distance,
          clientY: swipe.maxCrossDeviation + 10,
        })
      )
    )
    act(() => result.current.onPointerUp())

    expect(onSwipe).not.toHaveBeenCalled()
    vi.restoreAllMocks()
  })

  it('does nothing on pointerMove/pointerUp without pointerDown', () => {
    const onSwipe = vi.fn()
    const { result } = renderHook(() => useSwipe(onSwipe))

    act(() =>
      result.current.onPointerMove(pointerEvent({ clientX: 100, clientY: 0 }))
    )
    act(() => result.current.onPointerUp())

    expect(onSwipe).not.toHaveBeenCalled()
  })
})

describe('useLongPress', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('fires after holding for duration', () => {
    const onLongPress = vi.fn()
    const { result } = renderHook(() => useLongPress(onLongPress))

    act(() =>
      result.current.onPointerDown(pointerEvent({ clientX: 50, clientY: 50 }))
    )
    act(() => vi.advanceTimersByTime(longPress.duration + 10))

    expect(onLongPress).toHaveBeenCalledOnce()
  })

  it('does not fire if released early', () => {
    const onLongPress = vi.fn()
    const { result } = renderHook(() => useLongPress(onLongPress))

    act(() =>
      result.current.onPointerDown(pointerEvent({ clientX: 50, clientY: 50 }))
    )
    act(() => vi.advanceTimersByTime(100))
    act(() => result.current.onPointerUp())
    act(() => vi.advanceTimersByTime(longPress.duration))

    expect(onLongPress).not.toHaveBeenCalled()
  })

  it('cancels if moved too far', () => {
    const onLongPress = vi.fn()
    const { result } = renderHook(() => useLongPress(onLongPress))

    act(() =>
      result.current.onPointerDown(pointerEvent({ clientX: 50, clientY: 50 }))
    )
    act(() =>
      result.current.onPointerMove(
        pointerEvent({ clientX: 50 + longPress.maxMovement + 5, clientY: 50 })
      )
    )
    act(() => vi.advanceTimersByTime(longPress.duration + 10))

    expect(onLongPress).not.toHaveBeenCalled()
  })

  it('does not cancel if moved within threshold', () => {
    const onLongPress = vi.fn()
    const { result } = renderHook(() => useLongPress(onLongPress))

    act(() =>
      result.current.onPointerDown(pointerEvent({ clientX: 50, clientY: 50 }))
    )
    act(() =>
      result.current.onPointerMove(
        pointerEvent({ clientX: 50 + longPress.maxMovement - 1, clientY: 50 })
      )
    )
    act(() => vi.advanceTimersByTime(longPress.duration + 10))

    expect(onLongPress).toHaveBeenCalledOnce()
  })

  it('pointerMove without pointerDown does nothing', () => {
    const onLongPress = vi.fn()
    const { result } = renderHook(() => useLongPress(onLongPress))

    act(() =>
      result.current.onPointerMove(pointerEvent({ clientX: 100, clientY: 100 }))
    )
    act(() => vi.advanceTimersByTime(longPress.duration + 10))

    expect(onLongPress).not.toHaveBeenCalled()
  })

  it('pointerUp without pointerDown does not throw', () => {
    const onLongPress = vi.fn()
    const { result } = renderHook(() => useLongPress(onLongPress))

    expect(() => {
      act(() => result.current.onPointerUp())
    }).not.toThrow()
  })
})

describe('useDrag', () => {
  it('does not fire onDrag until start threshold is exceeded', () => {
    const onDrag = vi.fn()
    const { result } = renderHook(() => useDrag(onDrag))

    act(() =>
      result.current.onPointerDown(pointerEvent({ clientX: 100, clientY: 100 }))
    )
    // move less than threshold
    act(() =>
      result.current.onPointerMove(
        pointerEvent({ clientX: 100 + drag.startThreshold - 1, clientY: 100 })
      )
    )

    expect(onDrag).not.toHaveBeenCalled()
  })

  it('fires onDrag after exceeding start threshold', () => {
    const onDrag = vi.fn()
    const { result } = renderHook(() => useDrag(onDrag))

    act(() =>
      result.current.onPointerDown(pointerEvent({ clientX: 100, clientY: 100 }))
    )
    act(() =>
      result.current.onPointerMove(
        pointerEvent({ clientX: 100 + drag.startThreshold + 5, clientY: 100 })
      )
    )

    expect(onDrag).toHaveBeenCalledWith({
      dx: drag.startThreshold + 5,
      dy: 0,
      isDragging: true,
    })
  })

  it('fires onDragEnd when released after dragging', () => {
    const onDrag = vi.fn()
    const onDragEnd = vi.fn()
    const { result } = renderHook(() => useDrag(onDrag, onDragEnd))

    act(() =>
      result.current.onPointerDown(pointerEvent({ clientX: 0, clientY: 0 }))
    )
    act(() =>
      result.current.onPointerMove(pointerEvent({ clientX: 50, clientY: 30 }))
    )
    act(() => result.current.onPointerUp())

    expect(onDragEnd).toHaveBeenCalledWith({
      dx: 50,
      dy: 30,
      isDragging: false,
    })
  })

  it('does not fire onDragEnd when released without dragging', () => {
    const onDrag = vi.fn()
    const onDragEnd = vi.fn()
    const { result } = renderHook(() => useDrag(onDrag, onDragEnd))

    act(() =>
      result.current.onPointerDown(pointerEvent({ clientX: 100, clientY: 100 }))
    )
    // move less than threshold
    act(() =>
      result.current.onPointerMove(pointerEvent({ clientX: 101, clientY: 100 }))
    )
    act(() => result.current.onPointerUp())

    expect(onDragEnd).not.toHaveBeenCalled()
  })

  it('does not fire onDragEnd without onDragEnd callback', () => {
    const onDrag = vi.fn()
    const { result } = renderHook(() => useDrag(onDrag))

    act(() =>
      result.current.onPointerDown(pointerEvent({ clientX: 0, clientY: 0 }))
    )
    act(() =>
      result.current.onPointerMove(pointerEvent({ clientX: 50, clientY: 0 }))
    )

    expect(() => {
      act(() => result.current.onPointerUp())
    }).not.toThrow()
  })

  it('pointerMove/pointerUp without pointerDown does nothing', () => {
    const onDrag = vi.fn()
    const { result } = renderHook(() => useDrag(onDrag))

    act(() =>
      result.current.onPointerMove(pointerEvent({ clientX: 200, clientY: 200 }))
    )
    act(() => result.current.onPointerUp())

    expect(onDrag).not.toHaveBeenCalled()
  })

  it('starts dragging when vertical movement exceeds threshold', () => {
    const onDrag = vi.fn()
    const { result } = renderHook(() => useDrag(onDrag))

    act(() =>
      result.current.onPointerDown(pointerEvent({ clientX: 100, clientY: 100 }))
    )
    // move only in Y direction past threshold
    act(() =>
      result.current.onPointerMove(
        pointerEvent({ clientX: 100, clientY: 100 + drag.startThreshold + 5 })
      )
    )

    expect(onDrag).toHaveBeenCalledWith({
      dx: 0,
      dy: drag.startThreshold + 5,
      isDragging: true,
    })
  })
})

describe('applyInertia', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    let frameId = 0
    vi.spyOn(globalThis, 'requestAnimationFrame').mockImplementation((cb) => {
      frameId++
      setTimeout(() => cb(performance.now()), 16)
      return frameId
    })
    vi.spyOn(globalThis, 'cancelAnimationFrame').mockImplementation((id) => {
      clearTimeout(id)
    })
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('calls onFrame with updated positions', () => {
    const onFrame = vi.fn()
    applyInertia(2, 100, onFrame)

    // advance a few frames
    act(() => vi.advanceTimersByTime(16))
    act(() => vi.advanceTimersByTime(16))

    expect(onFrame).toHaveBeenCalled()
    // position should change from initial
    const positions = onFrame.mock.calls.map((c) => c[0] as number)
    expect(positions[0]).not.toBe(100)
  })

  it('calls onEnd when velocity drops below minimum', () => {
    const onFrame = vi.fn()
    const onEnd = vi.fn()
    applyInertia(0.2, 0, onFrame, onEnd)

    // advance enough frames for velocity to decay below minVelocity
    for (let i = 0; i < 50; i++) {
      act(() => vi.advanceTimersByTime(16))
    }

    expect(onEnd).toHaveBeenCalled()
  })

  it('clamps velocity to maxVelocity', () => {
    const onFrame = vi.fn()
    applyInertia(100, 0, onFrame) // way above maxVelocity

    act(() => vi.advanceTimersByTime(16))

    // first frame: vel = maxVelocity * friction, pos = 0 + vel
    const firstPos = onFrame.mock.calls[0][0] as number
    const maxFirstStep = inertia.maxVelocity * inertia.friction
    expect(firstPos).toBeLessThanOrEqual(maxFirstStep + 0.01)
  })

  it('handles negative velocity', () => {
    const onFrame = vi.fn()
    applyInertia(-2, 100, onFrame)

    act(() => vi.advanceTimersByTime(16))

    const firstPos = onFrame.mock.calls[0][0] as number
    expect(firstPos).toBeLessThan(100)
  })

  it('returns a cancel function that is callable', () => {
    const onFrame = vi.fn()
    const cancel = applyInertia(2, 0, onFrame)

    expect(typeof cancel).toBe('function')

    // verify cancel doesn't throw
    expect(() => cancel()).not.toThrow()
  })
})
