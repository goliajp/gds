import { describe, expect, it } from 'vitest'

import {
  drag,
  gestureConfig,
  gestureToCssVars,
  inertia,
  longPress,
  pinchZoom,
  pullToRefresh,
  swipe,
} from '../gesture-system'

describe('gesture-system', () => {
  it('swipe thresholds are reasonable', () => {
    expect(swipe.minDistance).toBeGreaterThan(10)
    expect(swipe.minDistance).toBeLessThan(100)
    expect(swipe.minVelocity).toBeGreaterThan(0)
  })

  it('pullToRefresh trigger < max', () => {
    expect(pullToRefresh.triggerDistance).toBeLessThan(pullToRefresh.maxDistance)
    expect(pullToRefresh.resistanceFactor).toBeGreaterThan(0)
    expect(pullToRefresh.resistanceFactor).toBeLessThan(1)
  })

  it('pinchZoom has valid scale range', () => {
    expect(pinchZoom.minScale).toBeLessThan(1)
    expect(pinchZoom.maxScale).toBeGreaterThan(1)
    expect(pinchZoom.snapScales[0]).toBe(1)
  })

  it('longPress duration is perceptible', () => {
    expect(longPress.duration).toBeGreaterThanOrEqual(300)
    expect(longPress.duration).toBeLessThanOrEqual(1000)
  })

  it('drag startThreshold prevents accidental drag', () => {
    expect(drag.startThreshold).toBeGreaterThan(0)
    expect(drag.startThreshold).toBeLessThan(20)
  })

  it('inertia friction is between 0.9 and 1', () => {
    expect(inertia.friction).toBeGreaterThan(0.9)
    expect(inertia.friction).toBeLessThan(1)
  })

  it('gestureConfig bundles all configs', () => {
    expect(gestureConfig.swipe).toBe(swipe)
    expect(gestureConfig.pullToRefresh).toBe(pullToRefresh)
    expect(gestureConfig.pinchZoom).toBe(pinchZoom)
    expect(gestureConfig.longPress).toBe(longPress)
    expect(gestureConfig.drag).toBe(drag)
    expect(gestureConfig.inertia).toBe(inertia)
  })

  it('gestureToCssVars outputs expected keys', () => {
    const vars = gestureToCssVars()
    expect(vars['--gds-gesture-dismiss-duration']).toBe('200ms')
    expect(vars['--gds-gesture-longpress-duration']).toBe('500ms')
    expect(vars['--gds-gesture-pull-trigger']).toBe('80px')
  })
})
