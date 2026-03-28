import { useCallback, useState } from 'react'

const STORAGE_KEY = 'gds-recent'
const MAX_RECENT = 20

function readRecent(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) return []
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed
    return []
  } catch {
    return []
  }
}

function writeRecent(recent: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recent))
  } catch {
    // storage full or unavailable
  }
}

export function useRecent(): {
  recent: string[]
  addRecent: (id: string) => void
} {
  const [recent, setRecent] = useState<string[]>(readRecent)

  const addRecent = useCallback((id: string) => {
    setRecent((prev) => {
      const filtered = prev.filter((r) => r !== id)
      const next = [id, ...filtered].slice(0, MAX_RECENT)
      writeRecent(next)
      return next
    })
  }, [])

  return { recent, addRecent }
}
