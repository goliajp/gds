// L-dep — gesture hooks
// consumes L0 gesture-system thresholds
// provides touch/pointer gesture recognition for components

import { useCallback, useRef } from 'react'

import type { GestureDirection } from '../l0-tokens/gesture-system'
import { drag, inertia, longPress, swipe } from '../l0-tokens/gesture-system'

// shared pointer state tracked during gestures
type PointerState = {
  startX: number
  startY: number
  startTime: number
  currentX: number
  currentY: number
  pointerId: number
}

// === useSwipe ===
// detects swipe gestures on an element
// returns handlers to spread on the target element
export type SwipeHandler = (dir: GestureDirection, velocity: number) => void

export function useSwipe(onSwipe: SwipeHandler) {
  const stateRef = useRef<PointerState | null>(null)

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    stateRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startTime: Date.now(),
      currentX: e.clientX,
      currentY: e.clientY,
      pointerId: e.pointerId,
    }
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (stateRef.current === null) return
    stateRef.current.currentX = e.clientX
    stateRef.current.currentY = e.clientY
  }, [])

  const onPointerUp = useCallback(() => {
    const s = stateRef.current
    if (s === null) return
    stateRef.current = null

    const dx = s.currentX - s.startX
    const dy = s.currentY - s.startY
    const dt = Math.max(1, Date.now() - s.startTime)
    const absDx = Math.abs(dx)
    const absDy = Math.abs(dy)

    // determine if it's a horizontal or vertical swipe
    const isHorizontal = absDx > absDy
    const distance = isHorizontal ? absDx : absDy
    const crossDeviation = isHorizontal ? absDy : absDx
    const velocity = distance / dt

    // must meet thresholds
    if (distance < swipe.minDistance) return
    if (velocity < swipe.minVelocity) return
    if (crossDeviation > swipe.maxCrossDeviation) return

    let dir: GestureDirection
    if (isHorizontal) {
      dir = dx > 0 ? 'right' : 'left'
    } else {
      dir = dy > 0 ? 'down' : 'up'
    }

    onSwipe(dir, velocity)
  }, [onSwipe])

  return { onPointerDown, onPointerMove, onPointerUp }
}

// === useLongPress ===
// detects long press on an element
export function useLongPress(onLongPress: () => void) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const startRef = useRef<{ x: number, y: number } | null>(null)

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    startRef.current = { x: e.clientX, y: e.clientY }
    timerRef.current = setTimeout(() => {
      onLongPress()
      timerRef.current = null
    }, longPress.duration)
  }, [onLongPress])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (startRef.current === null || timerRef.current === null) return
    const dx = Math.abs(e.clientX - startRef.current.x)
    const dy = Math.abs(e.clientY - startRef.current.y)
    if (dx > longPress.maxMovement || dy > longPress.maxMovement) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const onPointerUp = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    startRef.current = null
  }, [])

  return { onPointerDown, onPointerMove, onPointerUp }
}

// === useDrag ===
// provides drag position tracking with start threshold
export type DragState = {
  dx: number
  dy: number
  isDragging: boolean
}

export type DragHandler = (state: DragState) => void

export function useDrag(onDrag: DragHandler, onDragEnd?: (state: DragState) => void) {
  const stateRef = useRef<PointerState | null>(null)
  const isDragging = useRef(false)

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    stateRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startTime: Date.now(),
      currentX: e.clientX,
      currentY: e.clientY,
      pointerId: e.pointerId,
    }
    isDragging.current = false
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const s = stateRef.current
    if (s === null) return

    const dx = e.clientX - s.startX
    const dy = e.clientY - s.startY

    // start threshold — prevent accidental drag on tap
    if (!isDragging.current) {
      if (Math.abs(dx) < drag.startThreshold && Math.abs(dy) < drag.startThreshold) return
      isDragging.current = true
    }

    s.currentX = e.clientX
    s.currentY = e.clientY
    onDrag({ dx, dy, isDragging: true })
  }, [onDrag])

  const onPointerUp = useCallback(() => {
    const s = stateRef.current
    if (s === null) return

    const dx = s.currentX - s.startX
    const dy = s.currentY - s.startY

    if (isDragging.current && onDragEnd) {
      onDragEnd({ dx, dy, isDragging: false })
    }

    stateRef.current = null
    isDragging.current = false
  }, [onDragEnd])

  return { onPointerDown, onPointerMove, onPointerUp }
}

// === useInertia ===
// applies momentum to a value after drag release
export function applyInertia(
  velocity: number,
  position: number,
  onFrame: (pos: number) => void,
  onEnd?: () => void,
): () => void {
  let vel = Math.min(Math.abs(velocity), inertia.maxVelocity) * Math.sign(velocity)
  let pos = position
  let frame: number

  const step = () => {
    vel *= inertia.friction
    pos += vel

    if (Math.abs(vel) < inertia.minVelocity) {
      onFrame(pos)
      onEnd?.()
      return
    }

    onFrame(pos)
    frame = requestAnimationFrame(step)
  }

  frame = requestAnimationFrame(step)

  // return cancel function
  return () => cancelAnimationFrame(frame)
}
