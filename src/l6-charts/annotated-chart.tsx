// annotated-chart — line chart with interactive annotation markers
import { useState } from 'react'

import { cx } from '../utils/cx'

type Annotation = {
  color?: string
  description: string
  label: string
  x: number
}

type AnnotatedChartProps = {
  annotations: Annotation[]
  className?: string
  data: { x: number; y: number }[]
  height?: number
}

const PADDING = 32

function scalePoints(data: { x: number; y: number }[], width: number, height: number): { sx: number; sy: number }[] {
  if (data.length === 0) return []
  const xMin = Math.min(...data.map((d) => d.x))
  const xMax = Math.max(...data.map((d) => d.x))
  const yMin = Math.min(...data.map((d) => d.y))
  const yMax = Math.max(...data.map((d) => d.y))
  const xRange = xMax - xMin || 1
  const yRange = yMax - yMin || 1
  return data.map((d) => ({
    sx: PADDING + ((d.x - xMin) / xRange) * (width - PADDING * 2),
    sy: PADDING + (1 - (d.y - yMin) / yRange) * (height - PADDING * 2),
  }))
}

export function AnnotatedChart({ annotations, className, data, height = 200 }: AnnotatedChartProps) {
  const [activeIdx, setActiveIdx] = useState<null | number>(null)
  const width = 400
  const scaled = scalePoints(data, width, height)
  const polylinePoints = scaled.map((p) => `${p.sx},${p.sy}`).join(' ')

  return (
    <div className={cx('relative select-none', className)} data-component="annotated-chart">
      <svg className="w-full" viewBox={`0 0 ${width} ${height}`}>
        <polyline className="stroke-accent" fill="none" points={polylinePoints} strokeWidth={2} />
        {annotations.map((ann, i) => {
          const idx = data.findIndex((d) => d.x === ann.x)
          if (idx < 0) return null
          const pos = scaled[idx]
          return (
            <g
              className="cursor-pointer outline-none"
              key={i}
              onClick={() => setActiveIdx(activeIdx === i ? null : i)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveIdx(activeIdx === i ? null : i) } }}
              role="button"
              tabIndex={0}
            >
              <rect
                fill={ann.color ?? 'currentColor'}
                height={8}
                rx={1}
                transform={`translate(${pos.sx}, ${pos.sy}) rotate(45) translate(-4, -4)`}
                width={8}
              />
            </g>
          )
        })}
      </svg>
      {activeIdx !== null && (() => {
        const ann = annotations[activeIdx]
        const idx = data.findIndex((d) => d.x === ann.x)
        if (idx < 0) return null
        const pos = scaled[idx]
        return (
          <div
            className="absolute z-10 rounded-lg border border-border bg-surface px-3 py-2 shadow-lg"
            style={{ left: `${(pos.sx / width) * 100}%`, top: `${(pos.sy / height) * 100}%` }}
          >
            <div className="text-xs font-bold text-fg">{ann.label}</div>
            <div className="text-xs text-fg-muted">{ann.description}</div>
          </div>
        )
      })()}
    </div>
  )
}

export type { AnnotatedChartProps, Annotation }
