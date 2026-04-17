import { useEffect, useState } from 'react'

type Mode = 'light' | 'system' | 'dark'
const STORAGE_KEY = 'theme-mode'

function resolveMode(mode: Mode): 'light' | 'dark' {
  if (mode !== 'system') return mode
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyMode(mode: Mode) {
  document.documentElement.dataset.theme = resolveMode(mode)
}

export function ThemeToggle() {
  const [mode, setMode] = useState<Mode>(
    () => (localStorage.getItem(STORAGE_KEY) as Mode | null) ?? 'system'
  )

  useEffect(() => {
    applyMode(mode)
    localStorage.setItem(STORAGE_KEY, mode)
  }, [mode])

  useEffect(() => {
    if (mode !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => applyMode('system')
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [mode])

  const modes: Mode[] = ['light', 'system', 'dark']

  return (
    <div className="bg-bg-tertiary flex items-center rounded-full p-0.5">
      {modes.map((m) => (
        <button
          className={`cursor-pointer rounded-full px-3 py-1 text-xs capitalize transition-colors ${
            mode === m ? 'bg-bg text-fg shadow-sm' : 'text-fg-muted hover:text-fg'
          }`}
          key={m}
          onClick={() => setMode(m)}
          type="button"
        >
          {m}
        </button>
      ))}
    </div>
  )
}
