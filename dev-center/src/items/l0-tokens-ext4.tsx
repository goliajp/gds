import * as LucideIcons from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@gds/l2-primitives'
import { Badge } from '@gds/l2-primitives'
import { Input } from '@gds/l2-primitives'
import { Alert } from '@gds/l4-molecules'
import { Card, CardHeader } from '@gds/l4-molecules'
import { cx } from '@gds/utils/cx'

import { Ctrl } from '../components/ctrl'
import { DocSection, DemoCard, DocTable } from '../components/demo'

import type { DevCenterItem } from '../types'

// ─── iconography ───

const iconNames = [
  'Search', 'Plus', 'X', 'Check', 'ChevronDown', 'ChevronRight',
  'ChevronLeft', 'ChevronUp', 'ArrowLeft', 'ArrowRight', 'ArrowUp',
  'ArrowDown', 'Home', 'Settings', 'User', 'Users', 'Mail',
  'MessageCircle', 'Phone', 'Calendar', 'Clock', 'Bell', 'Star',
  'Heart', 'Bookmark', 'File', 'Folder', 'FolderOpen', 'Download',
  'Upload', 'Share2', 'ExternalLink', 'Link', 'Edit2', 'Trash2',
  'Copy', 'ClipboardCopy', 'Scissors', 'Save', 'Eye', 'EyeOff',
  'Lock', 'Unlock', 'Key', 'Shield', 'Monitor', 'Mic', 'MicOff',
  'Video', 'VideoOff', 'Camera', 'Sun', 'Moon', 'Cloud', 'Zap',
  'Flame', 'Hash', 'AtSign', 'Globe', 'Map', 'Pin', 'Code',
  'Terminal', 'Database', 'Server', 'Cpu', 'HardDrive', 'GitBranch',
  'GitCommit', 'GitMerge', 'GitPullRequest', 'AlertCircle',
  'AlertTriangle', 'Info', 'HelpCircle', 'PlayCircle', 'PauseCircle',
  'StopCircle', 'RefreshCw', 'Filter', 'SortAsc', 'SortDesc',
  'LayoutGrid', 'LayoutList', 'Columns', 'Image', 'FileText',
  'FilePlus', 'FileCode', 'Send', 'Inbox', 'Archive', 'Forward',
  'Reply', 'Smile', 'Frown', 'ThumbsUp', 'ThumbsDown',
]

function IconGrid() {
  const [filter, setFilter] = useState('')

  const filtered = filter
    ? iconNames.filter((n) => n.toLowerCase().includes(filter.toLowerCase()))
    : iconNames

  return (
    <div>
      <DocSection title="Icon Grid">
        <div className="sticky top-0 z-10 mb-4 border-b border-border/30 bg-bg/90 py-2 backdrop-blur-sm">
          <input
            className="h-8 w-64 rounded-md border border-border bg-bg px-3 font-mono text-xs text-fg outline-none placeholder:text-fg-muted/50 focus:border-accent"
            onChange={(e) => setFilter(e.target.value)}
            placeholder="filter icons..."
            value={filter}
          />
          <span className="ml-3 text-xs text-fg-muted/40">
            {filtered.length} / {iconNames.length}
          </span>
        </div>

        <div className="grid grid-cols-8 gap-2">
          {filtered.map((name) => {
            const Icon = (LucideIcons as any)[name]
            if (!Icon) return null
            return (
              <button
                className="flex flex-col items-center gap-1 rounded-lg p-2 text-fg-muted transition-colors hover:bg-bg-tertiary hover:text-fg"
                key={name}
                onClick={() => {
                  navigator.clipboard
                    .writeText(`<${name} />`)
                    .catch(() => {})
                }}
                title={name}
              >
                <Icon className="h-5 w-5" />
                <span className="truncate font-mono text-[10px]">{name}</span>
              </button>
            )
          })}
        </div>
      </DocSection>
    </div>
  )
}

// ─── tokens ───

const tokenGroups = [
  {
    label: 'Backgrounds',
    vars: [
      '--gds-bg', '--gds-bg-secondary', '--gds-bg-tertiary',
      '--gds-surface', '--gds-surface-raised',
    ],
  },
  {
    label: 'Foreground',
    vars: ['--gds-fg', '--gds-fg-secondary', '--gds-fg-muted'],
  },
  { label: 'Border', vars: ['--gds-border', '--gds-border-strong'] },
  {
    label: 'Accent',
    vars: ['--gds-accent', '--gds-accent-hover', '--gds-accent-fg'],
  },
  {
    label: 'Semantic',
    vars: ['--gds-success', '--gds-warning', '--gds-danger'],
  },
  {
    label: 'Status',
    vars: [
      '--gds-status-active', '--gds-status-inactive',
      '--gds-status-pending', '--gds-status-draft',
    ],
  },
  {
    label: 'Priority',
    vars: [
      '--gds-priority-critical', '--gds-priority-high',
      '--gds-priority-medium', '--gds-priority-low',
    ],
  },
  {
    label: 'Palette',
    vars: Array.from({ length: 10 }, (_, i) => `--gds-palette-${i}`),
  },
  {
    label: 'Action',
    vars: [
      '--gds-action-create', '--gds-action-update',
      '--gds-action-delete', '--gds-dot',
    ],
  },
  {
    label: 'Elevation',
    vars: ['--gds-shadow-sm', '--gds-shadow-md', '--gds-shadow-lg'],
  },
  {
    label: 'Radius',
    vars: [
      '--gds-radius-sm', '--gds-radius-md',
      '--gds-radius-lg', '--gds-radius-xl',
    ],
  },
  {
    label: 'Z-Index',
    vars: [
      '--gds-z-dropdown', '--gds-z-sticky', '--gds-z-overlay',
      '--gds-z-modal', '--gds-z-popover', '--gds-z-toast',
    ],
  },
  {
    label: 'Transition Duration',
    vars: [
      '--gds-duration-fast', '--gds-duration-normal',
      '--gds-duration-slow', '--gds-duration-slower',
    ],
  },
  {
    label: 'Transition Easing',
    vars: ['--gds-ease-default', '--gds-ease-in', '--gds-ease-out'],
  },
  {
    label: 'Typography Size',
    vars: [
      '--gds-text-2xs', '--gds-text-xs', '--gds-text-sm',
      '--gds-text-base', '--gds-text-lg', '--gds-text-xl', '--gds-text-2xl',
    ],
  },
  {
    label: 'Line Height',
    vars: [
      '--gds-leading-tight', '--gds-leading-normal', '--gds-leading-relaxed',
    ],
  },
  {
    label: 'Letter Spacing',
    vars: [
      '--gds-tracking-tight', '--gds-tracking-normal',
      '--gds-tracking-wide', '--gds-tracking-wider', '--gds-tracking-widest',
    ],
  },
]

function TokenRow({ varName }: { varName: string }) {
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(
      getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim()
    )
  }, [varName])

  return (
    <button
      className="flex items-center gap-3 rounded px-3 py-1.5 text-left transition-colors hover:bg-bg-tertiary/50"
      onClick={() => {
        navigator.clipboard.writeText(varName).catch(() => {})
      }}
    >
      {value.startsWith('#') || value.startsWith('rgb') ? (
        <div
          className="h-5 w-5 shrink-0 rounded border border-border/30"
          style={{ backgroundColor: value }}
        />
      ) : (
        <div className="h-5 w-5 shrink-0" />
      )}
      <span className="w-52 shrink-0 font-mono text-[11px] text-accent">
        {varName}
      </span>
      <span className="flex-1 font-mono text-[11px] text-fg-muted/50">
        {value}
      </span>
    </button>
  )
}

// ─── token comparison helpers ───

const comparisonTokenGroups: Record<string, { label: string; vars: string[] }> = {
  Backgrounds: {
    label: 'Backgrounds',
    vars: [
      '--gds-bg', '--gds-bg-secondary', '--gds-bg-tertiary',
      '--gds-surface', '--gds-surface-raised',
    ],
  },
  Text: {
    label: 'Text',
    vars: ['--gds-fg', '--gds-fg-secondary', '--gds-fg-muted', '--gds-accent-fg'],
  },
  Semantic: {
    label: 'Semantic',
    vars: [
      '--gds-accent', '--gds-accent-hover', '--gds-success',
      '--gds-warning', '--gds-danger', '--gds-border', '--gds-border-strong',
    ],
  },
  Status: {
    label: 'Status',
    vars: [
      '--gds-status-active', '--gds-status-inactive',
      '--gds-status-pending', '--gds-status-draft',
    ],
  },
  Priority: {
    label: 'Priority',
    vars: [
      '--gds-priority-critical', '--gds-priority-high',
      '--gds-priority-medium', '--gds-priority-low',
    ],
  },
  Palette: {
    label: 'Palette',
    vars: Array.from({ length: 10 }, (_, i) => `--gds-palette-${i}`),
  },
}

const comparisonGroupKeys = Object.keys(comparisonTokenGroups)

function readTokenValue(el: HTMLElement, varName: string): string {
  return getComputedStyle(el).getPropertyValue(varName).trim()
}

function formatRatio(ratio: number): string {
  return ratio.toFixed(2)
}

// simple contrast ratio calculator (no external dependency)
function luminance(hex: string): number {
  const rgb = hex.replace('#', '').match(/.{2}/g)
  if (!rgb) return 0
  const [r, g, b] = rgb.map((c) => {
    const v = parseInt(c, 16) / 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function rgbToHex(rgb: string): string {
  const match = rgb.match(/\d+/g)
  if (!match) return '#000000'
  return '#' + match.slice(0, 3).map((n) => parseInt(n).toString(16).padStart(2, '0')).join('')
}

function getContrastRatio(c1: string, c2: string): number {
  const h1 = c1.startsWith('rgb') ? rgbToHex(c1) : c1
  const h2 = c2.startsWith('rgb') ? rgbToHex(c2) : c2
  const l1 = luminance(h1)
  const l2 = luminance(h2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

function wcagLevel(ratio: number): 'AAA' | 'AA' | 'Fail' {
  if (ratio >= 7) return 'AAA'
  if (ratio >= 4.5) return 'AA'
  return 'Fail'
}

function ColorComparisonTable({ group }: { group: string }) {
  const lightRef = useRef<HTMLDivElement>(null)
  const darkRef = useRef<HTMLDivElement>(null)
  const [rows, setRows] = useState<
    { dark: string; light: string; name: string; ratio: string }[]
  >([])

  const vars = comparisonTokenGroups[group]?.vars ?? []

  useEffect(() => {
    const lightEl = lightRef.current
    const darkEl = darkRef.current
    if (lightEl === null || darkEl === null) return

    const computed = vars.map((v) => {
      const light = readTokenValue(lightEl, v)
      const dark = readTokenValue(darkEl, v)
      let ratio = '\u2014'
      if (
        (light.startsWith('#') || light.startsWith('rgb')) &&
        (dark.startsWith('#') || dark.startsWith('rgb'))
      ) {
        try {
          const r = getContrastRatio(light, dark)
          ratio = formatRatio(r)
        } catch {
          ratio = '\u2014'
        }
      }
      return { dark, light, name: v, ratio }
    })
    setRows(computed)
  }, [group]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div
        ref={lightRef}
        className="pointer-events-none fixed -left-[9999px] h-0 w-0 overflow-hidden"
        data-theme="light"
      />
      <div
        ref={darkRef}
        className="pointer-events-none fixed -left-[9999px] h-0 w-0 overflow-hidden"
        data-theme="dark"
      />

      <div className="overflow-x-auto rounded-lg border border-border/20">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border/20 bg-bg-secondary/30">
              <th className="px-3 py-2 text-left font-medium text-fg-muted">Token</th>
              <th className="px-3 py-2 text-left font-medium text-fg-muted">Light</th>
              <th className="px-3 py-2 text-left font-medium text-fg-muted">Dark</th>
              <th className="px-3 py-2 text-right font-medium text-fg-muted">Contrast</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr className="border-b border-border/10 last:border-b-0" key={row.name}>
                <td className="px-3 py-1.5 font-mono text-[11px] text-accent">{row.name}</td>
                <td className="px-3 py-1.5">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 shrink-0 rounded border border-border/30" style={{ backgroundColor: row.light }} />
                    <span className="font-mono text-[10px] text-fg-muted">{row.light}</span>
                  </div>
                </td>
                <td className="px-3 py-1.5">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 shrink-0 rounded border border-border/30" style={{ backgroundColor: row.dark }} />
                    <span className="font-mono text-[10px] text-fg-muted">{row.dark}</span>
                  </div>
                </td>
                <td className="px-3 py-1.5 text-right font-mono text-[11px] text-fg-muted">{row.ratio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ThemedBox({ children, theme }: { children: React.ReactNode; theme: 'dark' | 'light' }) {
  return (
    <div
      className={cx('flex-1 rounded-lg border border-border/20 bg-bg p-4', 'min-w-0')}
      data-theme={theme}
    >
      <div className="mb-2 font-mono text-[10px] font-medium tracking-widest text-fg-muted/50 uppercase">
        {theme}
      </div>
      {children}
    </div>
  )
}

function ComponentComparison() {
  return (
    <div className="space-y-4">
      <div>
        <div className="mb-2 text-xs font-medium text-fg-muted">Button</div>
        <div className="flex gap-3">
          <ThemedBox theme="light">
            <div className="flex flex-wrap gap-2">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </ThemedBox>
          <ThemedBox theme="dark">
            <div className="flex flex-wrap gap-2">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </ThemedBox>
        </div>
      </div>

      <div>
        <div className="mb-2 text-xs font-medium text-fg-muted">Badge</div>
        <div className="flex gap-3">
          <ThemedBox theme="light">
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
            </div>
          </ThemedBox>
          <ThemedBox theme="dark">
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
            </div>
          </ThemedBox>
        </div>
      </div>

      <div>
        <div className="mb-2 text-xs font-medium text-fg-muted">Input</div>
        <div className="flex gap-3">
          <ThemedBox theme="light">
            <div className="space-y-2">
              <Input placeholder="Normal input" />
              <Input error placeholder="Error state" />
            </div>
          </ThemedBox>
          <ThemedBox theme="dark">
            <div className="space-y-2">
              <Input placeholder="Normal input" />
              <Input error placeholder="Error state" />
            </div>
          </ThemedBox>
        </div>
      </div>

      <div>
        <div className="mb-2 text-xs font-medium text-fg-muted">Card</div>
        <div className="flex gap-3">
          <ThemedBox theme="light">
            <Card>
              <CardHeader description="A card with header and content" title="Card Title" />
              <p className="text-xs text-fg-muted">Card body content goes here.</p>
            </Card>
          </ThemedBox>
          <ThemedBox theme="dark">
            <Card>
              <CardHeader description="A card with header and content" title="Card Title" />
              <p className="text-xs text-fg-muted">Card body content goes here.</p>
            </Card>
          </ThemedBox>
        </div>
      </div>

      <div>
        <div className="mb-2 text-xs font-medium text-fg-muted">Alert</div>
        <div className="flex gap-3">
          <ThemedBox theme="light">
            <div className="space-y-2">
              <Alert title="Info" variant="info">Informational message</Alert>
              <Alert title="Success" variant="success">Operation completed</Alert>
              <Alert title="Warning" variant="warning">Attention required</Alert>
              <Alert title="Danger" variant="danger">Something went wrong</Alert>
            </div>
          </ThemedBox>
          <ThemedBox theme="dark">
            <div className="space-y-2">
              <Alert title="Info" variant="info">Informational message</Alert>
              <Alert title="Success" variant="success">Operation completed</Alert>
              <Alert title="Warning" variant="warning">Attention required</Alert>
              <Alert title="Danger" variant="danger">Something went wrong</Alert>
            </div>
          </ThemedBox>
        </div>
      </div>
    </div>
  )
}

const fgTokens = [
  { label: 'fg', var: '--gds-fg' },
  { label: 'fg-secondary', var: '--gds-fg-secondary' },
  { label: 'fg-muted', var: '--gds-fg-muted' },
  { label: 'accent', var: '--gds-accent' },
]

const bgTokens = [
  { label: 'bg', var: '--gds-bg' },
  { label: 'bg-secondary', var: '--gds-bg-secondary' },
  { label: 'bg-tertiary', var: '--gds-bg-tertiary' },
  { label: 'surface', var: '--gds-surface' },
]

function ContrastMatrix() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [matrix, setMatrix] = useState<
    {
      bg: string
      bgLabel: string
      bgVal: string
      fg: string
      fgLabel: string
      fgVal: string
      level: 'AAA' | 'AA' | 'Fail'
      ratio: number
    }[][]
  >([])

  useEffect(() => {
    const el = containerRef.current
    if (el === null) return

    const computed = fgTokens.map((fg) => {
      const fgVal = readTokenValue(el, fg.var)
      return bgTokens.map((bg) => {
        const bgVal = readTokenValue(el, bg.var)
        let ratio = 1
        try {
          ratio = getContrastRatio(fgVal, bgVal)
        } catch {
          // fallback
        }
        return {
          bg: bgVal,
          bgLabel: bg.label,
          bgVal,
          fg: fgVal,
          fgLabel: fg.label,
          fgVal,
          level: wcagLevel(ratio),
          ratio,
        }
      })
    })
    setMatrix(computed)
  }, [])

  return (
    <div ref={containerRef}>
      <div className="overflow-x-auto rounded-lg border border-border/20">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border/20 bg-bg-secondary/30">
              <th className="px-3 py-2 text-left font-medium text-fg-muted">FG \ BG</th>
              {bgTokens.map((bg) => (
                <th className="px-3 py-2 text-center font-mono text-[11px] font-medium text-fg-muted" key={bg.var}>
                  {bg.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, i) => (
              <tr className="border-b border-border/10 last:border-b-0" key={fgTokens[i].var}>
                <td className="px-3 py-2 font-mono text-[11px] text-accent">{fgTokens[i].label}</td>
                {row.map((cell) => (
                  <td className="px-3 py-2 text-center" key={`${cell.fgLabel}-${cell.bgLabel}`}>
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className="flex h-6 w-6 items-center justify-center rounded border border-border/20 text-[9px] font-bold"
                        style={{ backgroundColor: cell.bg, color: cell.fg }}
                      >
                        Aa
                      </div>
                      <span className="font-mono text-[10px] text-fg-muted">
                        {formatRatio(cell.ratio)}
                      </span>
                      <Badge
                        variant={
                          cell.level === 'AAA' ? 'success' : cell.level === 'AA' ? 'warning' : 'danger'
                        }
                      >
                        {cell.level}
                      </Badge>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── formatting helpers (inline, no external dependency) ───

function fmtNumber(n: number, locale: string, opts?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat(locale, opts).format(n)
}

function fmtCurrency(n: number, currency: string, locale: string): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(n)
}

function fmtPercent(n: number, locale: string): string {
  return new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 2 }).format(n)
}

function fmtCompact(n: number, locale: string): string {
  return new Intl.NumberFormat(locale, { notation: 'compact' }).format(n)
}

function fmtDate(d: Date, locale: string, tz: string, style: 'short' | 'medium' | 'long' | 'iso'): string {
  if (style === 'iso') return d.toISOString().slice(0, 10)
  const opts: Intl.DateTimeFormatOptions = { timeZone: tz }
  if (style === 'short') {
    Object.assign(opts, { year: '2-digit', month: 'numeric', day: 'numeric' })
  } else if (style === 'medium') {
    Object.assign(opts, { year: 'numeric', month: 'short', day: 'numeric' })
  } else {
    Object.assign(opts, { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' })
  }
  return new Intl.DateTimeFormat(locale, opts).format(d)
}

function fmtTime(d: Date, locale: string, tz: string, hour12: boolean): string {
  return new Intl.DateTimeFormat(locale, {
    timeZone: tz, hour: 'numeric', minute: 'numeric', second: 'numeric', hour12,
  }).format(d)
}

function fmtDateTime(d: Date, locale: string, tz: string): string {
  return new Intl.DateTimeFormat(locale, {
    timeZone: tz, year: 'numeric', month: 'short', day: 'numeric',
    hour: 'numeric', minute: 'numeric',
  }).format(d)
}

function fmtRelativeTime(d: Date, locale: string): string {
  const diffMs = d.getTime() - Date.now()
  const diffSec = Math.round(diffMs / 1000)
  const diffMin = Math.round(diffSec / 60)
  const diffHr = Math.round(diffMin / 60)
  const diffDay = Math.round(diffHr / 24)
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })
  if (Math.abs(diffSec) < 60) return rtf.format(diffSec, 'second')
  if (Math.abs(diffMin) < 60) return rtf.format(diffMin, 'minute')
  if (Math.abs(diffHr) < 24) return rtf.format(diffHr, 'hour')
  return rtf.format(diffDay, 'day')
}

const commonTimezones = [
  'Asia/Tokyo', 'Asia/Shanghai', 'Asia/Seoul', 'UTC',
  'America/New_York', 'America/Los_Angeles', 'Europe/London', 'Europe/Berlin',
]

// ─── breakpoints ───

const breakpointDefs = [
  { label: 'sm', px: 640 },
  { label: 'md', px: 768 },
  { label: 'lg', px: 1024 },
  { label: 'xl', px: 1280 },
  { label: '1300px', px: 1300 },
  { label: '2xl', px: 1536 },
  { label: '1900px', px: 1900 },
]

const maxPx = 1920

function BreakpointsStage() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  )

  useEffect(() => {
    const handler = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  const isMobile = width < 640
  const isTablet = width >= 640 && width < 1024
  const isDesktop = width >= 1024 && width < 1536
  const isWide = width >= 1536

  return (
    <div>
      <DocSection title="Scale">
        <DemoCard title="Breakpoint Scale" description="Responsive breakpoints. Current window width shown with active highlighting." full>
          <div className="space-y-2">
            {breakpointDefs.map((b) => {
              const pct = Math.min((b.px / maxPx) * 100, 100)
              const isActive = width >= b.px
              return (
                <div className="flex items-center gap-3" key={b.label}>
                  <div className="flex w-16 shrink-0 items-baseline gap-1">
                    <span className="font-mono text-xs text-fg">{b.label}</span>
                  </div>
                  <div className="relative h-5 flex-1 rounded bg-bg-secondary/30">
                    <div
                      className={cx(
                        'h-full rounded transition-colors',
                        isActive ? 'bg-accent/40' : 'bg-bg-tertiary/40'
                      )}
                      style={{ width: `${pct}%` }}
                    />
                    <span className="absolute top-0.5 right-2 font-mono text-[10px] text-fg-muted/60">
                      {b.px}px
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </DemoCard>
      </DocSection>

      <DocSection title="Current viewport">
        <DemoCard title="Viewport Detection" description="Current window width and active breakpoint category" full>
          <div className="rounded-lg border border-border/20 bg-bg-secondary/20 p-4">
            <div className="mb-3 font-mono text-sm text-fg">
              Window width: <span className="text-accent">{width}px</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {([
                { active: isMobile, label: 'Mobile (<640)' },
                { active: isTablet, label: 'Tablet (640-1023)' },
                { active: isDesktop, label: 'Desktop (1024-1535)' },
                { active: isWide, label: 'Wide (1536+)' },
              ]).map((item) => (
                <div
                  className={cx(
                    'rounded px-2.5 py-1 font-mono text-xs',
                    item.active
                      ? 'bg-accent/20 text-accent'
                      : 'bg-bg-tertiary/30 text-fg-muted/40'
                  )}
                  key={item.label}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </DemoCard>
      </DocSection>
    </div>
  )
}

// ─── items ───

const tokenItemsExt4: DevCenterItem[] = [
  // iconography
  {
    id: 'iconography',
    label: 'Icons',
    layer: 'l0',
    type: 'reference',
    tags: ['lucide', 'svg', 'symbol', 'glyph', 'icon'],

    stage: () => <IconGrid />,

    docs: () => (
      <div className="space-y-4" data-selectable>
        <div className="font-mono text-xs font-bold tracking-widest text-fg-muted/40 uppercase">
          icon sizing
        </div>
        <div className="space-y-1.5 text-xs text-fg-muted">
          <p><span className="font-mono text-accent">h-3 w-3</span> (12px) — inline with text-xs, badges, tags</p>
          <p><span className="font-mono text-accent">h-4 w-4</span> (16px) — default. Buttons, menu items, table actions</p>
          <p><span className="font-mono text-accent">h-5 w-5</span> (20px) — nav items, section headers</p>
          <p><span className="font-mono text-accent">h-6 w-6</span> (24px) — page headers, empty state illustrations</p>
          <p><span className="font-mono text-accent">h-8 w-8</span> (32px) — large empty states, onboarding</p>
        </div>

        <div className="font-mono text-xs font-bold tracking-widest text-fg-muted/40 uppercase">
          color rules
        </div>
        <div className="space-y-1.5 text-xs text-fg-muted">
          <p>Default icon color: <span className="font-mono text-accent">text-fg-muted</span></p>
          <p>Active/selected: <span className="font-mono text-accent">text-accent</span></p>
          <p>Destructive actions: <span className="font-mono text-accent">text-danger</span></p>
          <p>Inherit parent text color with no explicit class for inline icons.</p>
        </div>

        <div className="font-mono text-xs font-bold tracking-widest text-fg-muted/40 uppercase">
          library
        </div>
        <div className="space-y-1.5 text-xs text-fg-muted">
          <p>Using <span className="font-medium text-fg">lucide-react</span> — consistent 24x24 viewBox, 2px stroke.</p>
          <p>Tree-shakeable: import only the icons you need.</p>
          <p>All icons accept standard SVG props (className, style, etc).</p>
        </div>
      </div>
    ),

    code: () => `// import specific icons (tree-shaking)
import { Plus, Search, Trash2 } from 'lucide-react'

// default size (h-4 w-4)
<Search className="h-4 w-4 text-fg-muted" />

// in a button
<Button icon={Plus}>Create</Button>

// inline with text
<span className="flex items-center gap-1.5">
  <AlertCircle className="h-3 w-3 text-danger" />
  <span className="text-xs">Error message</span>
</span>

// larger size for empty states
<Inbox className="h-10 w-10 text-fg-muted/20" />

// action colors
<Edit2 className="h-4 w-4 text-action-update" />
<Trash2 className="h-4 w-4 text-action-delete" />
<Plus className="h-4 w-4 text-action-create" />`,
  },

  // tokens
  {
    id: 'tokens',
    label: 'Tokens',
    layer: 'l0',
    type: 'reference',
    tags: ['css', 'variable', 'custom-property', 'design-token'],

    stage: () => (
      <div>
        <DemoCard title="Design Tokens" description="All CSS custom properties powering the design system. Click any token to copy." full>
          {tokenGroups.map((group) => (
            <DocSection key={group.label} title={group.label}>
              <div className="rounded-lg border border-border/20 bg-bg-secondary/30">
                {group.vars.map((v) => (
                  <TokenRow key={v} varName={v} />
                ))}
              </div>
            </DocSection>
          ))}
        </DemoCard>
      </div>
    ),

    docs: () => (
      <div className="space-y-4" data-selectable>
        <div className="font-mono text-xs font-bold tracking-widest text-fg-muted/40 uppercase">
          token architecture
        </div>
        <div className="space-y-1.5 text-xs text-fg-muted">
          <p>All tokens are CSS custom properties defined on <span className="font-mono text-accent">:root</span>.</p>
          <p>Dark/light mode switches token values — components never change their class names.</p>
          <p>Token prefix: <span className="font-mono text-accent">--gds-</span> to avoid collisions with third-party CSS.</p>
        </div>

        <div className="font-mono text-xs font-bold tracking-widest text-fg-muted/40 uppercase">
          token layers
        </div>
        <div className="space-y-1.5 text-xs text-fg-muted">
          <p><span className="font-medium text-fg">Primitive</span> — raw color values (hsl/hex). Not used directly in components.</p>
          <p><span className="font-medium text-fg">Semantic</span> — purpose-driven aliases (bg, fg, accent, danger). Used in all component code.</p>
          <p><span className="font-medium text-fg">Component</span> — component-specific overrides when semantic tokens are insufficient.</p>
        </div>

        <div className="font-mono text-xs font-bold tracking-widest text-fg-muted/40 uppercase">
          tailwind mapping
        </div>
        <div className="space-y-1.5 text-xs text-fg-muted">
          <p>Tailwind config maps CSS variables to utility classes automatically.</p>
          <p>Example: <span className="font-mono text-accent">--gds-accent</span> maps to <span className="font-mono text-accent">bg-accent</span>, <span className="font-mono text-accent">text-accent</span>, <span className="font-mono text-accent">border-accent</span>.</p>
          <p>Opacity modifiers work out of the box: <span className="font-mono text-accent">bg-accent/10</span>.</p>
        </div>
      </div>
    ),

    code: () => `// CSS custom properties — the source of truth
:root {
  --gds-bg: #0a0a0a;
  --gds-fg: #e5e5e5;
  --gds-accent: #3b82f6;
  --gds-border: #262626;
}

// use via Tailwind utility classes
<div className="bg-bg text-fg border-border">
  semantic tokens
</div>

// access in JS when needed
const accent = getComputedStyle(document.documentElement)
  .getPropertyValue('--gds-accent')

// override in a scoped context
<div style={{ '--gds-accent': '#10b981' }}>
  <Button>Green accent here</Button>
</div>`,
  },

  // token comparison
  {
    id: 'token-comparison',
    label: 'Token Comparison',
    layer: 'l0',
    type: 'interactive',
    tags: ['token', 'theme', 'dark', 'light', 'contrast', 'comparison', 'wcag', 'a11y'],
    variants: comparisonGroupKeys,
    defaultConfig: { group: 'Backgrounds' },

    stage: ({ config }) => {
      const activeGroup = (config.group as string) ?? 'Backgrounds'
      return (
        <div>
          <DocSection title="Color Token Comparison">
            <DemoCard title="Light vs Dark" description="Actual computed values for each token in light and dark mode. Contrast ratio measures the difference between the two theme values." full>
              <ColorComparisonTable group={activeGroup} />
            </DemoCard>
          </DocSection>

          <DocSection title="Component Preview">
            <DemoCard title="Side-by-Side" description="Key components rendered in isolated light and dark theme containers." full>
              <ComponentComparison />
            </DemoCard>
          </DocSection>

          <DocSection title="Contrast Matrix">
            <DemoCard title="WCAG Contrast" description="Foreground tokens vs background tokens with WCAG contrast ratios. AAA requires 7:1, AA requires 4.5:1." full>
              <ContrastMatrix />
            </DemoCard>
          </DocSection>
        </div>
      )
    },

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl
          label="group"
          onChange={(v) => setConfig('group', v)}
          options={comparisonGroupKeys}
          type="pills"
          value={(config.group as string) ?? 'Backgrounds'}
        />
      </>
    ),

    docs: () => (
      <div className="space-y-4" data-selectable>
        <div className="font-mono text-xs font-bold tracking-widest text-fg-muted/40 uppercase">
          purpose
        </div>
        <div className="space-y-1.5 text-xs text-fg-muted">
          <p>Verify that every design token looks correct in both light and dark mode before shipping.</p>
          <p>The contrast ratio column shows how different the light and dark values are from each other.</p>
        </div>

        <div className="font-mono text-xs font-bold tracking-widest text-fg-muted/40 uppercase">
          how it works
        </div>
        <div className="space-y-1.5 text-xs text-fg-muted">
          <p>Hidden elements with <span className="font-mono text-accent">data-theme</span> attributes are used to read actual computed CSS variable values in each mode.</p>
          <p>The contrast matrix calculates WCAG-compliant ratios between foreground and background tokens.</p>
        </div>

        <div className="font-mono text-xs font-bold tracking-widest text-fg-muted/40 uppercase">
          wcag levels
        </div>
        <div className="space-y-1.5 text-xs text-fg-muted">
          <p><span className="font-medium text-success">AAA</span> — ratio of 7:1 or higher (enhanced contrast)</p>
          <p><span className="font-medium text-warning">AA</span> — ratio of 4.5:1 or higher (minimum contrast)</p>
          <p><span className="font-medium text-danger">Fail</span> — ratio below 4.5:1 (insufficient contrast)</p>
        </div>
      </div>
    ),

    code: () => `// reading token values in both themes
const lightEl = document.querySelector('[data-theme="light"]')
const darkEl = document.querySelector('[data-theme="dark"]')

const lightBg = getComputedStyle(lightEl)
  .getPropertyValue('--gds-bg')
const darkBg = getComputedStyle(darkEl)
  .getPropertyValue('--gds-bg')

// isolated theme container
<div data-theme="light" className="bg-bg">
  <Button>Light mode button</Button>
</div>
<div data-theme="dark" className="bg-bg">
  <Button>Dark mode button</Button>
</div>`,
  },

  // elevation (shadows & radius)
  {
    id: 'elevation',
    label: 'Shadows & Radius',
    layer: 'l0',
    type: 'reference',
    tags: ['shadow', 'radius', 'depth', 'border-radius', 'rounded'],

    stage: () => (
      <div>
        <DocSection title="Shadows">
          <DemoCard title="Shadow Scale" description="Elevation through shadow depth" full>
            <div className="flex gap-6">
              {[
                { cls: 'shadow-sm', name: 'shadow-sm' },
                { cls: 'shadow-md', name: 'shadow-md' },
                { cls: 'shadow-lg', name: 'shadow-lg' },
              ].map((s) => (
                <div className="text-center" key={s.name}>
                  <div className={`flex h-20 w-28 items-center justify-center rounded-lg border border-border bg-surface ${s.cls}`}>
                    <span className="font-mono text-[10px] text-fg-muted">{s.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </DemoCard>
        </DocSection>

        <DocSection title="Radius">
          <DemoCard title="Border Radius Scale" description="Visual hierarchy through border-radius" full>
            <div className="flex gap-6">
              {[
                { cls: 'rounded-sm', name: 'radius-sm', val: '0.25rem' },
                { cls: 'rounded-md', name: 'radius-md', val: '0.375rem' },
                { cls: 'rounded-lg', name: 'radius-lg', val: '0.5rem' },
                { cls: 'rounded-xl', name: 'radius-xl', val: '0.75rem' },
                { cls: 'rounded-full', name: 'full', val: '9999px' },
              ].map((r) => (
                <div className="text-center" key={r.name}>
                  <div className={`flex h-16 w-16 items-center justify-center border border-border bg-accent/10 ${r.cls}`}>
                    <span className="font-mono text-[10px] text-accent">{r.val}</span>
                  </div>
                  <span className="mt-1 block font-mono text-[10px] text-fg-muted">{r.name}</span>
                </div>
              ))}
            </div>
          </DemoCard>
        </DocSection>
      </div>
    ),

    docs: () => (
      <div className="space-y-4" data-selectable>
        <div className="font-mono text-xs font-bold tracking-widest text-fg-muted/40 uppercase">
          elevation levels
        </div>
        <div className="space-y-1.5 text-xs text-fg-muted">
          <p><span className="font-medium text-fg">Level 0</span> — no shadow. Default flat surfaces (bg, bg-secondary).</p>
          <p><span className="font-medium text-fg">Level 1</span> (shadow-sm) — subtle lift. Cards, raised panels.</p>
          <p><span className="font-medium text-fg">Level 2</span> (shadow-md) — moderate lift. Dropdowns, popovers.</p>
          <p><span className="font-medium text-fg">Level 3</span> (shadow-lg) — highest lift. Modals, dialogs, command palette.</p>
        </div>

        <div className="font-mono text-xs font-bold tracking-widest text-fg-muted/40 uppercase">
          radius guide
        </div>
        <div className="space-y-1.5 text-xs text-fg-muted">
          <p><span className="font-mono text-accent">rounded-sm</span> — small controls: checkboxes, color swatches.</p>
          <p><span className="font-mono text-accent">rounded-md</span> — inputs, buttons, badges.</p>
          <p><span className="font-mono text-accent">rounded-lg</span> — cards, panels, dialogs. Most common.</p>
          <p><span className="font-mono text-accent">rounded-xl</span> — large cards, hero sections.</p>
          <p><span className="font-mono text-accent">rounded-full</span> — avatars, pills, circular buttons.</p>
        </div>

        <div className="font-mono text-xs font-bold tracking-widest text-fg-muted/40 uppercase">
          dark mode notes
        </div>
        <div className="space-y-1.5 text-xs text-fg-muted">
          <p>Shadows are subtle in dark mode. Borders provide more visual separation than shadows.</p>
          <p>Combine shadow + border for best results: <span className="font-mono text-accent">shadow-lg border border-border</span>.</p>
        </div>
      </div>
    ),

    code: () => `// shadow levels
<div className="shadow-sm">subtle card</div>
<div className="shadow-md">dropdown panel</div>
<div className="shadow-lg">modal dialog</div>

// border radius
<div className="rounded-sm">checkbox</div>
<div className="rounded-md">button / input</div>
<div className="rounded-lg">card / panel</div>
<div className="rounded-xl">large card</div>
<div className="rounded-full">avatar / pill</div>

// combining shadow + border (recommended)
<div className="rounded-lg border border-border bg-surface shadow-lg">
  modal content
</div>

// dropdown pattern
<div className="absolute z-50 animate-popup rounded-lg border border-border bg-surface shadow-lg">
  dropdown items
</div>`,
  },

  // formatting
  {
    id: 'formatting',
    label: 'Formatting',
    layer: 'l0',
    type: 'interactive',
    tags: ['i18n', 'intl', 'number', 'date', 'time', 'currency', 'timezone'],
    variants: ['all'],
    defaultConfig: { locale: 'en', timezone: 'Asia/Tokyo' },

    stage: ({ config }) => {
      const locale = config.locale as string
      const tz = config.timezone as string
      const now = new Date()
      const pastDate = new Date(Date.now() - 3 * 3600_000)
      const oldDate = new Date('2026-01-15T09:30:00Z')

      const rows = [
        {
          category: 'Number',
          items: [
            { label: 'Integer', value: fmtNumber(1234567, locale) },
            { label: 'Decimal', value: fmtNumber(1234567.89, locale, { minimumFractionDigits: 2 }) },
            { label: 'Compact', value: fmtCompact(1234567, locale) },
            { label: 'Percent', value: fmtPercent(0.1234, locale) },
          ],
        },
        {
          category: 'Currency',
          items: [
            { label: 'JPY', value: fmtCurrency(142857, 'JPY', locale) },
            { label: 'USD', value: fmtCurrency(1428.57, 'USD', locale) },
            { label: 'EUR', value: fmtCurrency(1428.57, 'EUR', locale) },
            { label: 'CNY', value: fmtCurrency(10000, 'CNY', locale) },
          ],
        },
        {
          category: 'Date',
          items: [
            { label: 'Short', value: fmtDate(now, locale, tz, 'short') },
            { label: 'Medium', value: fmtDate(now, locale, tz, 'medium') },
            { label: 'Long', value: fmtDate(now, locale, tz, 'long') },
            { label: 'ISO', value: fmtDate(now, locale, tz, 'iso') },
          ],
        },
        {
          category: 'Time',
          items: [
            { label: '24h', value: fmtTime(now, locale, tz, false) },
            { label: '12h', value: fmtTime(now, locale, tz, true) },
            { label: 'DateTime', value: fmtDateTime(now, locale, tz) },
          ],
        },
        {
          category: 'Relative',
          items: [
            { label: '3h ago', value: fmtRelativeTime(pastDate, locale) },
            { label: 'Jan 15', value: fmtRelativeTime(oldDate, locale) },
            { label: 'Future', value: fmtRelativeTime(new Date(Date.now() + 86400_000), locale) },
          ],
        },
      ]

      return (
        <div>
          {rows.map((group) => (
            <DocSection key={group.category} title={group.category}>
              <DemoCard title={group.category} description={`Locale: ${locale}, Timezone: ${tz}`} full>
                <div className="rounded-lg border border-border/20 bg-bg-secondary/20">
                  {group.items.map((item) => (
                    <div
                      className="flex items-center gap-4 border-b border-border/10 px-4 py-2 last:border-b-0"
                      key={item.label}
                    >
                      <span className="w-20 shrink-0 font-mono text-[10px] text-fg-muted/40">{item.label}</span>
                      <span className="font-mono text-xs text-fg" data-selectable>{item.value}</span>
                    </div>
                  ))}
                </div>
              </DemoCard>
            </DocSection>
          ))}
        </div>
      )
    },

    controls: ({ config, setConfig }) => (
      <div className="space-y-4">
        <Ctrl
          label="Locale"
          onChange={(v) => setConfig('locale', v)}
          options={['en', 'zh']}
          type="pills"
          value={config.locale}
        />
        <Ctrl
          label="Timezone"
          onChange={(v) => setConfig('timezone', v)}
          options={commonTimezones}
          type="select"
          value={config.timezone}
        />
      </div>
    ),

    docs: () => (
      <div className="space-y-4" data-selectable>
        <div className="font-mono text-xs font-bold tracking-widest text-fg-muted/40 uppercase">
          available functions
        </div>
        <div className="space-y-1.5 text-xs text-fg-muted">
          <p><span className="font-mono text-accent">formatNumber</span> — number with locale-aware thousands separator</p>
          <p><span className="font-mono text-accent">formatCurrency</span> — currency with proper symbol and decimals</p>
          <p><span className="font-mono text-accent">formatPercent</span> — percentage with configurable decimals</p>
          <p><span className="font-mono text-accent">formatDate</span> — date with timezone and format options</p>
          <p><span className="font-mono text-accent">formatTime</span> — time with 12h/24h toggle</p>
          <p><span className="font-mono text-accent">formatDateTime</span> — combined date + time</p>
          <p><span className="font-mono text-accent">formatRelativeTime</span> — human-readable relative time</p>
          <p><span className="font-mono text-accent">formatCompact</span> — compact notation (1.2K, 3.5M)</p>
        </div>

        <div className="font-mono text-xs font-bold tracking-widest text-fg-muted/40 uppercase">
          architecture
        </div>
        <div className="space-y-1.5 text-xs text-fg-muted">
          <p>Built on Intl API — zero external dependencies.</p>
          <p>All functions accept locale and optional timezone.</p>
        </div>
      </div>
    ),

    code: () => `// numbers
new Intl.NumberFormat('en').format(1234567)       // "1,234,567"
new Intl.NumberFormat('en', { notation: 'compact' }).format(1234567)  // "1.2M"

// currency
new Intl.NumberFormat('en', { style: 'currency', currency: 'JPY' }).format(142857)  // "\u00a5142,857"
new Intl.NumberFormat('zh', { style: 'currency', currency: 'USD' }).format(1428.57) // "US$1,428.57"

// dates with timezone
new Intl.DateTimeFormat('en', { timeZone: 'Asia/Tokyo', dateStyle: 'medium' }).format(new Date())

// relative time
new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(-3, 'hour')  // "3 hours ago"
new Intl.RelativeTimeFormat('zh', { numeric: 'auto' }).format(-3, 'hour')  // "3\u5c0f\u65f6\u524d"`,
  },

  // breakpoints
  {
    id: 'breakpoints',
    label: 'Breakpoints',
    layer: 'l0',
    type: 'reference',
    tags: ['responsive', 'media', 'mobile', 'tablet', 'desktop', 'viewport'],

    stage: () => <BreakpointsStage />,

    docs: () => (
      <div className="space-y-4" data-selectable>
        <div className="font-mono text-xs font-bold tracking-widest text-fg-muted/40 uppercase">
          breakpoints
        </div>
        <div className="space-y-1.5 text-xs text-fg-muted">
          <p><span className="font-mono text-accent">sm: 640px</span> — mobile landscape, small tablets</p>
          <p><span className="font-mono text-accent">md: 768px</span> — tablets</p>
          <p><span className="font-mono text-accent">lg: 1024px</span> — small desktops, landscape tablets</p>
          <p><span className="font-mono text-accent">xl: 1280px</span> — desktops</p>
          <p><span className="font-mono text-accent">2xl: 1536px</span> — large desktops</p>
          <p><span className="font-mono text-accent">1300px</span> — sidebar collapse</p>
          <p><span className="font-mono text-accent">1900px</span> — ultra-wide layout</p>
        </div>

        <div className="font-mono text-xs font-bold tracking-widest text-fg-muted/40 uppercase">
          responsive patterns
        </div>
        <div className="space-y-1.5 text-xs text-fg-muted">
          <p>Use Tailwind responsive prefixes: sm:, md:, lg:, xl:, 2xl:</p>
          <p>For JS-side detection, use window.matchMedia or a breakpoint hook.</p>
        </div>
      </div>
    ),

    code: () => `// Tailwind responsive classes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  responsive grid
</div>

// JS breakpoint detection
const mq = window.matchMedia('(min-width: 1024px)')
const isDesktop = mq.matches

// conditional rendering
if (width < 640) return <MobileLayout />
return <DesktopLayout />`,
  },
]

export { tokenItemsExt4 }
