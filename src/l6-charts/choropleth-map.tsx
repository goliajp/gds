// choropleth-map — geographic heatmap (Japan regions)
import { useState } from 'react'

import { cx } from '../utils/cx'

type ChoroplethData = { id: string; label?: string; value: number }
type ChoroplethMapProps = { className?: string; colorScale?: string[]; data: ChoroplethData[]; height?: number }

const REGIONS: { id: string; label: string; path: string }[] = [
  { id: 'hokkaido', label: 'Hokkaido', path: 'M 320,20 L 380,15 L 420,35 L 430,70 L 410,95 L 370,100 L 330,85 L 310,55 Z' },
  { id: 'tohoku', label: 'Tohoku', path: 'M 330,110 L 370,105 L 395,120 L 400,160 L 390,200 L 355,210 L 325,195 L 315,155 Z' },
  { id: 'kanto', label: 'Kanto', path: 'M 310,215 L 365,212 L 390,230 L 385,265 L 355,280 L 315,275 L 300,250 Z' },
  { id: 'chubu', label: 'Chubu', path: 'M 255,210 L 305,205 L 310,245 L 300,280 L 270,295 L 240,280 L 235,245 Z' },
  { id: 'kansai', label: 'Kansai', path: 'M 220,280 L 268,275 L 285,300 L 275,335 L 245,345 L 215,330 L 205,305 Z' },
  { id: 'chugoku', label: 'Chugoku', path: 'M 140,275 L 210,270 L 218,300 L 210,335 L 175,345 L 140,330 L 130,305 Z' },
  { id: 'shikoku', label: 'Shikoku', path: 'M 170,350 L 230,348 L 250,365 L 245,395 L 215,405 L 180,395 L 165,375 Z' },
  { id: 'kyushu', label: 'Kyushu', path: 'M 70,310 L 130,305 L 145,330 L 140,375 L 120,400 L 85,395 L 65,365 Z' },
]

export function ChoroplethMap({ className, colorScale = ['var(--gds-palette-0)'], data, height = 400 }: ChoroplethMapProps) {
  const [hoveredId, setHoveredId] = useState<null | string>(null)
  const dataMap = new Map(data.map((d) => [d.id, d]))
  const values = data.map((d) => d.value)
  const minVal = Math.min(...values)
  const maxVal = Math.max(...values)
  const valRange = maxVal - minVal || 1
  const color = colorScale[0] ?? 'var(--gds-palette-0)'

  const getColor = (id: string) => {
    const d = dataMap.get(id)
    if (d === undefined) return 'var(--gds-border)'
    const t = (d.value - minVal) / valRange
    const opacity = 0.15 + t * 0.85
    return `color-mix(in srgb, ${color} ${Math.round(opacity * 100)}%, transparent)`
  }

  return (
    <div className={cx('relative select-none', className)} data-component="choropleth-map">
      <svg className="w-full" viewBox={`0 0 500 ${height}`}>
        {REGIONS.map((r) => (
          <path d={r.path} fill={getColor(r.id)} key={r.id} onMouseEnter={() => setHoveredId(r.id)} onMouseLeave={() => setHoveredId(null)} stroke="var(--gds-border)" strokeWidth={hoveredId === r.id ? 2 : 1} style={{ transition: 'fill 0.2s' }} />
        ))}
        {REGIONS.map((r) => {
          const nums = r.path.match(/[\d.]+/g)?.map(Number) ?? []
          let cxVal = 0, cyVal = 0, count = 0
          for (let i = 0; i < nums.length; i += 2) { if (nums[i] !== undefined && nums[i + 1] !== undefined) { cxVal += nums[i]; cyVal += nums[i + 1]; count++ } }
          if (count > 0) { cxVal /= count; cyVal /= count }
          return <text fill="var(--gds-fg-muted)" fontSize={9} key={r.id} pointerEvents="none" textAnchor="middle" x={cxVal} y={cyVal + 3}>{r.label}</text>
        })}
      </svg>
      {hoveredId !== null && (() => {
        const region = REGIONS.find((r) => r.id === hoveredId)
        const d = dataMap.get(hoveredId)
        const name = d?.label ?? region?.label ?? ''
        const val = d !== undefined ? `: ${d.value}` : ''
        return <div className="pointer-events-none absolute top-2 left-1/2 -translate-x-1/2 rounded bg-surface px-2 py-1 text-xs text-fg shadow-sm ring-1 ring-border">{name}{val}</div>
      })()}
    </div>
  )
}

export type { ChoroplethData, ChoroplethMapProps }
