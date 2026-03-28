import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

import { useRecent } from '../use-recent'

describe('useRecent', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns empty initially', () => {
    const { result } = renderHook(() => useRecent())
    expect(result.current.recent).toEqual([])
  })

  it('adds item to recent', () => {
    const { result } = renderHook(() => useRecent())
    act(() => result.current.addRecent('button'))
    expect(result.current.recent).toEqual(['button'])
  })

  it('moves repeated item to front', () => {
    const { result } = renderHook(() => useRecent())
    act(() => result.current.addRecent('button'))
    act(() => result.current.addRecent('badge'))
    act(() => result.current.addRecent('button'))
    expect(result.current.recent).toEqual(['button', 'badge'])
  })

  it('limits to 20 items', () => {
    const { result } = renderHook(() => useRecent())
    for (let i = 0; i < 25; i++) {
      act(() => result.current.addRecent(`item-${i}`))
    }
    expect(result.current.recent).toHaveLength(20)
    expect(result.current.recent[0]).toBe('item-24')
  })

  it('preserves ordering: most recent first', () => {
    const { result } = renderHook(() => useRecent())
    act(() => result.current.addRecent('alpha'))
    act(() => result.current.addRecent('beta'))
    act(() => result.current.addRecent('gamma'))
    expect(result.current.recent).toEqual(['gamma', 'beta', 'alpha'])
  })

  it('drops oldest items when limit is exceeded', () => {
    const { result } = renderHook(() => useRecent())
    for (let i = 0; i < 25; i++) {
      act(() => result.current.addRecent(`item-${i}`))
    }
    expect(result.current.recent).not.toContain('item-0')
    expect(result.current.recent).not.toContain('item-4')
    expect(result.current.recent).toContain('item-5')
  })

  it('persists to localStorage', () => {
    const { result } = renderHook(() => useRecent())
    act(() => result.current.addRecent('button'))
    const stored = JSON.parse(localStorage.getItem('gds-recent') ?? '[]')
    expect(stored).toEqual(['button'])
  })

  it('handles corrupted localStorage gracefully', () => {
    localStorage.setItem('gds-recent', '{invalid')
    const { result } = renderHook(() => useRecent())
    expect(result.current.recent).toEqual([])
  })

  it('handles non-array JSON in localStorage', () => {
    localStorage.setItem('gds-recent', '42')
    const { result } = renderHook(() => useRecent())
    expect(result.current.recent).toEqual([])
  })

  it('restores recent from localStorage on mount', () => {
    localStorage.setItem('gds-recent', JSON.stringify(['x', 'y']))
    const { result } = renderHook(() => useRecent())
    expect(result.current.recent).toEqual(['x', 'y'])
  })
})
