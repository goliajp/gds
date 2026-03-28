import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

import { useFavorites } from '../use-favorites'

describe('useFavorites', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns empty array initially', () => {
    const { result } = renderHook(() => useFavorites())
    expect(result.current.favorites).toEqual([])
  })

  it('adds favorite', () => {
    const { result } = renderHook(() => useFavorites())
    act(() => result.current.toggleFavorite('button'))
    expect(result.current.favorites).toEqual(['button'])
    expect(result.current.isFavorite('button')).toBe(true)
  })

  it('removes favorite', () => {
    const { result } = renderHook(() => useFavorites())
    act(() => result.current.toggleFavorite('button'))
    act(() => result.current.toggleFavorite('button'))
    expect(result.current.favorites).toEqual([])
    expect(result.current.isFavorite('button')).toBe(false)
  })

  it('toggles favorite', () => {
    const { result } = renderHook(() => useFavorites())
    act(() => result.current.toggleFavorite('button'))
    act(() => result.current.toggleFavorite('badge'))
    expect(result.current.favorites).toEqual(['button', 'badge'])
    act(() => result.current.toggleFavorite('button'))
    expect(result.current.favorites).toEqual(['badge'])
  })

  it('persists to localStorage', () => {
    const { result } = renderHook(() => useFavorites())
    act(() => result.current.toggleFavorite('button'))
    const stored = JSON.parse(localStorage.getItem('gds-favorites') ?? '[]')
    expect(stored).toEqual(['button'])
  })

  it('prevents duplicate favorites', () => {
    const { result } = renderHook(() => useFavorites())
    act(() => result.current.toggleFavorite('button'))
    act(() => result.current.toggleFavorite('badge'))
    act(() => result.current.toggleFavorite('button'))
    act(() => result.current.toggleFavorite('button'))
    const count = result.current.favorites.filter((f) => f === 'button').length
    expect(count).toBe(1)
  })

  it('restores favorites from localStorage on mount', () => {
    localStorage.setItem('gds-favorites', JSON.stringify(['badge', 'card']))
    const { result } = renderHook(() => useFavorites())
    expect(result.current.favorites).toEqual(['badge', 'card'])
    expect(result.current.isFavorite('badge')).toBe(true)
    expect(result.current.isFavorite('card')).toBe(true)
  })

  it('handles corrupted localStorage gracefully', () => {
    localStorage.setItem('gds-favorites', 'not-valid-json')
    const { result } = renderHook(() => useFavorites())
    expect(result.current.favorites).toEqual([])
  })

  it('handles non-array JSON in localStorage', () => {
    localStorage.setItem('gds-favorites', '"hello"')
    const { result } = renderHook(() => useFavorites())
    expect(result.current.favorites).toEqual([])
  })

  it('isFavorite returns false for unknown id', () => {
    const { result } = renderHook(() => useFavorites())
    expect(result.current.isFavorite('nonexistent')).toBe(false)
  })
})
