import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import {
  Area,
  AreaChart as RArea,
  Bar,
  BarChart as RBar,
  CartesianGrid,
  Line,
  LineChart as RLine,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Sparkline } from '@gds/l6-charts'

import { Ctrl } from '../components/ctrl'
import { DemoCard, DocSection, DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

// ─── helpers ────────────────────────────────────────────────────────────────

const PALETTE = Array.from({ length: 10 }, (_, i) => `var(--color-palette-${i})`)

const tooltipStyle: React.CSSProperties = {
  backgroundColor: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  borderRadius: 6,
  color: 'var(--color-fg)',
  fontSize: 11,
}

// ─── 1. chart-realtime ──────────────────────────────────────────────────────

function randomWalk(prev: number, min: number, max: number): number {
  const delta = (Math.random() - 0.5) * (max - min) * 0.08
  const next = prev + delta
  if (next < min) return min + Math.abs(delta)
  if (next > max) return max - Math.abs(delta)
  return next
}

// self-contained canvas realtime chart
function MiniRealtimeChart({ data, color, label, height, showGrid }: {
  data: number[]
  color: string
  label: string
  height: number
  showGrid: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas === null) return
    const ctx = canvas.getContext('2d')
    if (ctx === null) return

    const dpr = window.devicePixelRatio ?? 1
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx.scale(dpr, dpr)

    ctx.clearRect(0, 0, w, h)

    // grid
    if (showGrid) {
      ctx.strokeStyle = 'rgba(255,255,255,0.06)'
      ctx.lineWidth = 1
      for (let y = 0; y < h; y += h / 4) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }
    }

    // line
    if (data.length < 2) return
    const min = 0
    const max = 100
    const step = w / (data.length - 1)

    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = 1.5
    ctx.lineJoin = 'round'
    data.forEach((v, i) => {
      const x = i * step
      const y = h - ((v - min) / (max - min)) * h
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()

    // label
    ctx.fillStyle = 'rgba(255,255,255,0.5)'
    ctx.font = '10px system-ui'
    ctx.fillText(label, 6, 14)

    // value
    const last = data[data.length - 1]
    ctx.fillStyle = color
    ctx.font = 'bold 12px system-ui'
    ctx.fillText(`${last.toFixed(1)}`, 6, 28)
  }, [data, color, label, height, showGrid])

  return (
    <canvas
      ref={canvasRef}
      className="w-full rounded-lg border border-white/[0.06] bg-bg-secondary/30"
      style={{ height }}
    />
  )
}

function RealtimeStage({ config }: { config: Record<string, unknown> }) {
  const showGrid = config.showGrid !== false
  const speed =
    config.speed === 'slow' ? 200 : config.speed === 'fast' ? 30 : 80

  const [cpuData, setCpuData] = useState<number[]>(() =>
    Array.from({ length: 50 }, () => 40 + Math.random() * 30),
  )
  const [memData, setMemData] = useState<number[]>(() =>
    Array.from({ length: 50 }, () => 55 + Math.random() * 20),
  )
  const [netData, setNetData] = useState<number[]>(() =>
    Array.from({ length: 50 }, () => 10 + Math.random() * 40),
  )

  const cpuRef = useRef(cpuData[cpuData.length - 1])
  const memRef = useRef(memData[memData.length - 1])
  const netRef = useRef(netData[netData.length - 1])

  const tick = useCallback(() => {
    cpuRef.current = randomWalk(cpuRef.current, 15, 95)
    memRef.current = randomWalk(memRef.current, 30, 90)
    netRef.current = randomWalk(netRef.current, 0, 80)

    setCpuData(prev => [...prev.slice(-199), cpuRef.current])
    setMemData(prev => [...prev.slice(-199), memRef.current])
    setNetData(prev => [...prev.slice(-199), netRef.current])
  }, [])

  useEffect(() => {
    const id = setInterval(tick, speed)
    return () => clearInterval(id)
  }, [tick, speed])

  return (
    <div>
      <ImportLine text="import { RealtimeChart } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="grid w-full gap-3 lg:grid-cols-3">
          <MiniRealtimeChart color="var(--color-palette-0)" data={cpuData} height={180} label="CPU %" showGrid={showGrid} />
          <MiniRealtimeChart color="var(--color-palette-1)" data={memData} height={180} label="Memory %" showGrid={showGrid} />
          <MiniRealtimeChart color="var(--color-palette-2)" data={netData} height={180} label="Network Mbps" showGrid={showGrid} />
        </div>
      </LivePreview>
      <DocSection title="Single Channel (Large)">
        <MiniRealtimeChart color="var(--color-accent)" data={cpuData} height={280} label="CPU Usage" showGrid={showGrid} />
      </DocSection>
    </div>
  )
}

// ─── 2. waterfall chart (inline SVG) ────────────────────────────────────────

const waterfallData = [
  { label: 'Revenue', value: 500 },
  { label: 'COGS', value: -200 },
  { label: 'OpEx', value: -80 },
  { label: 'Tax', value: -50 },
  { label: 'Interest', value: -20 },
]

function WaterfallChartSvg({ data, height }: { data: { label: string; value: number }[]; height: number }) {
  const padding = { top: 20, right: 20, bottom: 40, left: 20 }
  const w = 500
  const h = height

  // compute cumulative values
  const items: { label: string; value: number; start: number; end: number }[] = []
  let cumulative = 0
  for (const d of data) {
    const start = cumulative
    cumulative += d.value
    items.push({ label: d.label, value: d.value, start, end: cumulative })
  }
  // add total
  items.push({ label: 'Net', value: cumulative, start: 0, end: cumulative })

  const allVals = items.flatMap(i => [i.start, i.end])
  const minVal = Math.min(0, ...allVals)
  const maxVal = Math.max(0, ...allVals)
  const range = maxVal - minVal

  const barW = (w - padding.left - padding.right) / items.length * 0.7
  const gap = (w - padding.left - padding.right) / items.length

  function yScale(v: number): number {
    return padding.top + (1 - (v - minVal) / range) * (h - padding.top - padding.bottom)
  }

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ maxHeight: height }}>
      {/* zero line */}
      <line x1={padding.left} x2={w - padding.right} y1={yScale(0)} y2={yScale(0)} stroke="rgba(255,255,255,0.15)" strokeWidth={1} />

      {items.map((item, i) => {
        const isTotal = i === items.length - 1
        const x = padding.left + i * gap + (gap - barW) / 2
        const y1 = yScale(item.start)
        const y2 = yScale(item.end)
        const barY = Math.min(y1, y2)
        const barH = Math.abs(y2 - y1)
        const fill = isTotal
          ? 'var(--color-accent)'
          : item.value >= 0
            ? 'var(--color-success, #22c55e)'
            : 'var(--color-danger, #ef4444)'

        return (
          <g key={item.label}>
            <rect x={x} y={barY} width={barW} height={Math.max(barH, 1)} fill={fill} rx={2} opacity={0.85} />
            {/* connector line */}
            {i < items.length - 1 && (
              <line
                x1={x + barW}
                x2={x + gap}
                y1={yScale(item.end)}
                y2={yScale(item.end)}
                stroke="rgba(255,255,255,0.15)"
                strokeDasharray="3 3"
                strokeWidth={1}
              />
            )}
            {/* value label */}
            <text x={x + barW / 2} y={barY - 4} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize={10}>
              {item.value >= 0 ? `+${item.value}` : item.value}
            </text>
            {/* category label */}
            <text x={x + barW / 2} y={h - padding.bottom + 16} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={10}>
              {item.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// ─── 3. gantt chart (inline SVG) ────────────────────────────────────────────

type GanttTask = {
  id: string
  label: string
  start: string
  end: string
  progress: number
  group: string
  color?: string
}

const ganttTasks: GanttTask[] = [
  { id: 'p1', label: 'Requirements', start: '2026-03-02', end: '2026-03-08', progress: 100, group: 'Planning' },
  { id: 'p2', label: 'Architecture', start: '2026-03-06', end: '2026-03-13', progress: 100, group: 'Planning' },
  { id: 'p3', label: 'UI Mockups', start: '2026-03-09', end: '2026-03-16', progress: 80, group: 'Planning' },
  { id: 'd1', label: 'API Dev', start: '2026-03-16', end: '2026-03-30', progress: 60, group: 'Development' },
  { id: 'd2', label: 'Frontend', start: '2026-03-18', end: '2026-04-03', progress: 40, group: 'Development' },
  { id: 'd3', label: 'DB Migration', start: '2026-03-16', end: '2026-03-22', progress: 90, group: 'Development' },
  { id: 'l1', label: 'Staging', start: '2026-04-06', end: '2026-04-09', progress: 0, group: 'Launch' },
  { id: 'l2', label: 'QA Sign-off', start: '2026-04-09', end: '2026-04-13', progress: 0, group: 'Launch' },
]

function GanttChartSvg({ tasks, height }: { tasks: GanttTask[]; height: number }) {
  const labelW = 120
  const padding = { top: 30, right: 10, bottom: 10 }
  const rowH = 28
  const w = 700
  const h = Math.max(height, tasks.length * rowH + padding.top + padding.bottom)

  const allDates = tasks.flatMap(t => [new Date(t.start).getTime(), new Date(t.end).getTime()])
  const minDate = Math.min(...allDates)
  const maxDate = Math.max(...allDates)
  const dateRange = maxDate - minDate

  function xScale(dateStr: string): number {
    const d = new Date(dateStr).getTime()
    return labelW + ((d - minDate) / dateRange) * (w - labelW - padding.right)
  }

  const groups = [...new Set(tasks.map(t => t.group))]
  const groupColors: Record<string, string> = {}
  groups.forEach((g, i) => {
    groupColors[g] = PALETTE[i % PALETTE.length]
  })

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ maxHeight: h }}>
      {/* header */}
      <text x={4} y={18} fill="rgba(255,255,255,0.4)" fontSize={9} fontWeight="bold">Task</text>
      <text x={labelW + 4} y={18} fill="rgba(255,255,255,0.4)" fontSize={9} fontWeight="bold">Timeline</text>
      <line x1={0} x2={w} y1={padding.top - 4} y2={padding.top - 4} stroke="rgba(255,255,255,0.08)" />

      {tasks.map((task, i) => {
        const y = padding.top + i * rowH
        const x1 = xScale(task.start)
        const x2 = xScale(task.end)
        const barH = 16
        const barY = y + (rowH - barH) / 2
        const color = groupColors[task.group]

        return (
          <g key={task.id}>
            {/* row bg */}
            {i % 2 === 0 && <rect x={0} y={y} width={w} height={rowH} fill="rgba(255,255,255,0.02)" />}
            {/* label */}
            <text x={4} y={y + rowH / 2 + 3} fill="rgba(255,255,255,0.6)" fontSize={10}>{task.label}</text>
            {/* bar background */}
            <rect x={x1} y={barY} width={Math.max(x2 - x1, 2)} height={barH} fill={color} opacity={0.2} rx={3} />
            {/* progress fill */}
            <rect x={x1} y={barY} width={Math.max((x2 - x1) * task.progress / 100, 0)} height={barH} fill={color} opacity={0.7} rx={3} />
            {/* progress text */}
            <text x={x2 + 4} y={y + rowH / 2 + 3} fill="rgba(255,255,255,0.4)" fontSize={9}>{task.progress}%</text>
          </g>
        )
      })}
    </svg>
  )
}

// ─── 4. polar area chart (inline SVG) ───────────────────────────────────────

const polarData = [
  { label: 'CSS', value: 85 },
  { label: 'JS', value: 70 },
  { label: 'Rust', value: 55 },
  { label: 'Go', value: 40 },
  { label: 'Python', value: 65 },
]

function PolarAreaChartSvg({ data, size }: { data: { label: string; value: number }[]; size: number }) {
  const cx = size / 2
  const cy = size / 2
  const maxR = size / 2 - 30
  const maxVal = Math.max(...data.map(d => d.value))
  const angleStep = (2 * Math.PI) / data.length

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto" style={{ maxWidth: size, maxHeight: size }}>
      {/* grid circles */}
      {[0.25, 0.5, 0.75, 1].map(f => (
        <circle key={f} cx={cx} cy={cy} r={maxR * f} fill="none" stroke="rgba(255,255,255,0.06)" />
      ))}

      {data.map((d, i) => {
        const startAngle = i * angleStep - Math.PI / 2
        const endAngle = startAngle + angleStep
        const r = (d.value / maxVal) * maxR

        const x1 = cx + r * Math.cos(startAngle)
        const y1 = cy + r * Math.sin(startAngle)
        const x2 = cx + r * Math.cos(endAngle)
        const y2 = cy + r * Math.sin(endAngle)

        const largeArc = angleStep > Math.PI ? 1 : 0
        const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`

        // label position
        const midAngle = startAngle + angleStep / 2
        const labelR = maxR + 14
        const lx = cx + labelR * Math.cos(midAngle)
        const ly = cy + labelR * Math.sin(midAngle)

        return (
          <g key={d.label}>
            <path d={path} fill={PALETTE[i % PALETTE.length]} opacity={0.6} stroke="rgba(0,0,0,0.3)" strokeWidth={1} />
            <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.6)" fontSize={10}>
              {d.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// ─── 5. flame chart (inline SVG) ────────────────────────────────────────────

type FlameNode = {
  name: string
  value: number
  children?: FlameNode[]
}

const flameData: FlameNode = {
  name: 'main()',
  value: 100,
  children: [
    {
      name: 'render()',
      value: 60,
      children: [
        { name: 'layout()', value: 35 },
        { name: 'paint()', value: 25 },
      ],
    },
    {
      name: 'fetch()',
      value: 40,
      children: [
        { name: 'parse()', value: 15 },
        { name: 'decode()', value: 25 },
      ],
    },
  ],
}

type FlatFlameRect = { name: string; x: number; width: number; depth: number }

function flattenFlame(node: FlameNode, x: number, totalWidth: number, depth: number): FlatFlameRect[] {
  const w = (node.value / (depth === 0 ? node.value : node.value)) * totalWidth
  const rects: FlatFlameRect[] = [{ name: node.name, x, width: totalWidth, depth }]

  if (node.children !== undefined) {
    let childX = x
    const childTotal = node.children.reduce((s, c) => s + c.value, 0)
    for (const child of node.children) {
      const childW = (child.value / childTotal) * totalWidth
      rects.push(...flattenFlame(child, childX, childW, depth + 1))
      childX += childW
    }
  }

  return rects
}

function FlameChartSvg({ data, height }: { data: FlameNode; height: number }) {
  const w = 600
  const rowH = 24
  const rects = flattenFlame(data, 0, w, 0)
  const maxDepth = Math.max(...rects.map(r => r.depth))
  const svgH = Math.max(height, (maxDepth + 1) * rowH + 10)

  // warm color scale
  const colors = ['#f97316', '#ef4444', '#ec4899', '#a855f7', '#6366f1', '#3b82f6']

  return (
    <svg viewBox={`0 0 ${w} ${svgH}`} className="w-full" style={{ maxHeight: svgH }}>
      {rects.map((r, i) => {
        const y = r.depth * rowH
        const color = colors[r.depth % colors.length]
        return (
          <g key={`${r.name}-${i}`}>
            <rect x={r.x} y={y} width={Math.max(r.width - 1, 1)} height={rowH - 2} fill={color} opacity={0.7} rx={2} />
            {r.width > 40 && (
              <text x={r.x + 4} y={y + rowH / 2} dominantBaseline="middle" fill="white" fontSize={10} opacity={0.9}>
                {r.name}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}

// ─── 6. bullet chart (inline SVG) ───────────────────────────────────────────

function BulletChartSvg({ actual, target, max, label }: {
  actual: number
  target: number
  max: number
  label: string
}) {
  const w = 400
  const h = 40
  const barH = 20
  const y = (h - barH) / 2

  function xScale(v: number): number {
    return (v / max) * w
  }

  const ranges = [max * 0.33, max * 0.66, max]

  return (
    <div className="space-y-1">
      <div className="text-xs text-fg-muted">{label}</div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ maxHeight: h }}>
        {/* range bands */}
        <rect x={0} y={y} width={xScale(ranges[2])} height={barH} fill="rgba(255,255,255,0.06)" rx={3} />
        <rect x={0} y={y} width={xScale(ranges[1])} height={barH} fill="rgba(255,255,255,0.1)" rx={3} />
        <rect x={0} y={y} width={xScale(ranges[0])} height={barH} fill="rgba(255,255,255,0.15)" rx={3} />
        {/* actual bar */}
        <rect x={0} y={y + barH * 0.25} width={xScale(actual)} height={barH * 0.5} fill="var(--color-accent)" rx={2} />
        {/* target marker */}
        <line x1={xScale(target)} x2={xScale(target)} y1={y - 2} y2={y + barH + 2} stroke="var(--color-danger, #ef4444)" strokeWidth={2} />
      </svg>
    </div>
  )
}

// ─── 7. choropleth map (inline SVG) ─────────────────────────────────────────

const choroplethData = [
  { id: 'hokkaido', value: 25, label: 'Hokkaido' },
  { id: 'tohoku', value: 18, label: 'Tohoku' },
  { id: 'kanto', value: 150, label: 'Kanto' },
  { id: 'chubu', value: 45, label: 'Chubu' },
  { id: 'kansai', value: 85, label: 'Kansai' },
  { id: 'chugoku', value: 20, label: 'Chugoku' },
  { id: 'shikoku', value: 12, label: 'Shikoku' },
  { id: 'kyushu', value: 55, label: 'Kyushu' },
]

// simplified Japan region shapes (rectangles positioned roughly)
const regionShapes: Record<string, { x: number; y: number; w: number; h: number }> = {
  hokkaido: { x: 260, y: 10, w: 100, h: 70 },
  tohoku: { x: 250, y: 90, w: 60, h: 80 },
  kanto: { x: 240, y: 180, w: 70, h: 50 },
  chubu: { x: 170, y: 150, w: 65, h: 60 },
  kansai: { x: 150, y: 220, w: 55, h: 45 },
  chugoku: { x: 80, y: 200, w: 65, h: 40 },
  shikoku: { x: 110, y: 250, w: 50, h: 35 },
  kyushu: { x: 30, y: 230, w: 60, h: 70 },
}

function ChoroplethMapSvg({ data, height }: { data: { id: string; value: number; label: string }[]; height: number }) {
  const [hovered, setHovered] = useState<string | null>(null)

  const maxVal = Math.max(...data.map(d => d.value))

  function intensityColor(value: number): string {
    const t = value / maxVal
    const r = Math.round(99 + t * 57)
    const g = Math.round(102 + t * (-4))
    const b = Math.round(241 + t * (-92))
    return `rgb(${r}, ${g}, ${b})`
  }

  return (
    <div className="relative">
      <svg viewBox="0 0 400 320" className="mx-auto w-full" style={{ maxHeight: height }}>
        {data.map(d => {
          const shape = regionShapes[d.id]
          if (shape === undefined) return null
          const isHovered = hovered === d.id
          return (
            <g key={d.id} onMouseEnter={() => setHovered(d.id)} onMouseLeave={() => setHovered(null)}>
              <rect
                x={shape.x}
                y={shape.y}
                width={shape.w}
                height={shape.h}
                fill={intensityColor(d.value)}
                opacity={isHovered ? 1 : 0.75}
                rx={4}
                stroke={isHovered ? 'white' : 'rgba(0,0,0,0.3)'}
                strokeWidth={isHovered ? 2 : 1}
                className="transition-opacity cursor-pointer"
              />
              <text
                x={shape.x + shape.w / 2}
                y={shape.y + shape.h / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize={10}
                opacity={0.9}
                className="pointer-events-none"
              >
                {d.label}
              </text>
            </g>
          )
        })}
      </svg>
      {hovered !== null && (() => {
        const item = data.find(d => d.id === hovered)
        if (item === undefined) return null
        return (
          <div className="absolute top-2 right-2 rounded-lg border border-white/10 bg-surface px-3 py-2 text-xs shadow-lg">
            <div className="font-semibold text-fg">{item.label}</div>
            <div className="text-fg-muted">Value: {item.value}</div>
          </div>
        )
      })()}
    </div>
  )
}

// ─── 8. chart-theming (recharts) ────────────────────────────────────────────

const themingData = [
  { a: 40, b: 24, c: 35, month: 'Jan' },
  { a: 30, b: 35, c: 28, month: 'Feb' },
  { a: 50, b: 28, c: 42, month: 'Mar' },
  { a: 45, b: 42, c: 38, month: 'Apr' },
  { a: 60, b: 38, c: 55, month: 'May' },
  { a: 55, b: 50, c: 48, month: 'Jun' },
]

// ─── 9. chart-patterns (recharts) ───────────────────────────────────────────

const revenueData = [
  { month: 'Jan', revenue: 2100000, target: 2500000 },
  { month: 'Feb', revenue: 2300000, target: 2500000 },
  { month: 'Mar', revenue: 2800000, target: 2500000 },
  { month: 'Apr', revenue: 2600000, target: 2800000 },
  { month: 'May', revenue: 3100000, target: 2800000 },
  { month: 'Jun', revenue: 2900000, target: 2800000 },
  { month: 'Jul', revenue: 3400000, target: 3000000 },
  { month: 'Aug', revenue: 3200000, target: 3000000 },
  { month: 'Sep', revenue: 3600000, target: 3200000 },
  { month: 'Oct', revenue: 3800000, target: 3200000 },
  { month: 'Nov', revenue: 4100000, target: 3500000 },
  { month: 'Dec', revenue: 4500000, target: 3500000 },
]

const fmtYen = (v: number) => `¥${(v / 10000).toFixed(0)}万`

const weeklyData = [
  { day: 'Mon', hours: 8.5 },
  { day: 'Tue', hours: 7.2 },
  { day: 'Wed', hours: 9.1 },
  { day: 'Thu', hours: 8.0 },
  { day: 'Fri', hours: 6.5 },
]

function DashboardCard({ label, value, change, up, chartData }: {
  label: string
  value: string
  change: string
  up: boolean
  chartData: number[]
}) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-fg-muted">{label}</div>
          <div className="mt-1 text-xl font-bold text-fg tabular-nums">{value}</div>
          <div className={`mt-0.5 text-xs tabular-nums ${up ? 'text-success' : 'text-danger'}`}>{change}</div>
        </div>
        <Sparkline color={up ? 'var(--color-success)' : 'var(--color-danger)'} data={chartData} height={32} width={64} />
      </div>
    </div>
  )
}

// ─── 10. chart-colors ───────────────────────────────────────────────────────

function interpolateHex(c1: string, c2: string, t: number): string {
  const r1 = parseInt(c1.slice(1, 3), 16)
  const g1 = parseInt(c1.slice(3, 5), 16)
  const b1 = parseInt(c1.slice(5, 7), 16)
  const r2 = parseInt(c2.slice(1, 3), 16)
  const g2 = parseInt(c2.slice(3, 5), 16)
  const b2 = parseInt(c2.slice(5, 7), 16)
  const r = Math.round(r1 + (r2 - r1) * t)
  const g = Math.round(g1 + (g2 - g1) * t)
  const b = Math.round(b1 + (b2 - b1) * t)
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

function generateScale(base: string, steps: number): string[] {
  // generate light-to-dark scale around base
  return Array.from({ length: steps }, (_, i) => {
    const t = i / (steps - 1)
    if (t < 0.5) {
      return interpolateHex('#ffffff', base, t * 2)
    }
    return interpolateHex(base, '#000000', (t - 0.5) * 2)
  })
}

function ColorSwatch({ color, label }: { color: string; label?: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="h-8 w-8 rounded-md border border-border" style={{ backgroundColor: color }} />
      {label !== undefined && <span className="font-mono text-[10px] text-fg-muted">{label}</span>}
    </div>
  )
}

function InterpolationDemo() {
  const steps = useMemo(
    () => Array.from({ length: 11 }, (_, i) => interpolateHex('#6366f1', '#ec4899', i / 10)),
    [],
  )

  return (
    <div>
      <div className="mb-2 text-xs font-medium text-fg-muted">#6366f1 → #ec4899 (11 steps)</div>
      <div className="flex gap-1">
        {steps.map((c, i) => (
          <div className="flex flex-col items-center gap-1" key={i}>
            <div className="h-8 w-12 rounded-md border border-border" style={{ backgroundColor: c }} />
            <span className="font-mono text-[9px] text-fg-muted">{c}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function HeatmapScaleDemo() {
  const scales = [
    { base: '#3b82f6', label: 'Blue' },
    { base: '#22c55e', label: 'Green' },
    { base: '#f59e0b', label: 'Amber' },
    { base: '#ef4444', label: 'Red' },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {scales.map(({ base, label }) => {
        const colors = generateScale(base, 9)
        return (
          <div key={base}>
            <div className="mb-2 text-xs font-medium text-fg-muted">{label} ({base})</div>
            <div className="flex gap-0.5">
              {colors.map((c, i) => (
                <div className="h-6 flex-1 first:rounded-l-md last:rounded-r-md" key={i} style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── recharts wrapper (lightweight GdsChart replacement) ────────────────────

function ChartCard({ title, description, height, children }: {
  title: string
  description?: string
  height: number
  children: React.ReactNode
}) {
  return (
    <div className="rounded-lg border border-border bg-surface p-3">
      <div className="mb-2">
        <div className="text-xs font-semibold text-fg">{title}</div>
        {description !== undefined && <div className="text-[10px] text-fg-muted">{description}</div>}
      </div>
      <div style={{ width: '100%', height }}>
        {children}
      </div>
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
// items
// ═════════════════════════════════════════════════════════════════════════════

const chartItemsExt10: DevCenterItem[] = [
  // 1. real-time chart
  {
    id: 'chart-realtime',
    label: 'Real-time Chart',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'realtime', 'canvas', 'streaming', 'monitor', 'live'],
    defaultConfig: { showGrid: true, speed: 'normal' },

    stage: ({ config }) => <RealtimeStage config={config} />,

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="grid" type="check" value={config.showGrid !== false} onChange={v => setConfig('showGrid', v)} />
        <Ctrl label="speed" type="pills" value={config.speed ?? 'normal'} options={['slow', 'normal', 'fast']} onChange={v => setConfig('speed', v)} />
      </>
    ),

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['data', 'Numeric data array', 'number[]', '—'],
          ['color', 'Line color', 'string', 'var(--color-accent)'],
          ['label', 'Top-left label', 'string', '—'],
          ['height', 'Canvas height in px', 'number', '200'],
          ['maxPoints', 'Max visible data points', 'number', '200'],
          ['lineWidth', 'Line stroke width', 'number', '1.5'],
          ['showGrid', 'Show horizontal grid lines', 'boolean', 'true'],
        ]} />
      </div>
    ),

    code: () => `// canvas-based real-time chart for streaming data
import { RealtimeChart } from '@goliapkg/gds'

<RealtimeChart
  data={liveValues}
  color="var(--color-accent)"
  label="CPU %"
  height={200}
  maxPoints={200}
/>`,
  },

  // 2. waterfall chart
  {
    id: 'chart-waterfall',
    label: 'Waterfall Chart',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'waterfall', 'financial', 'cascade', 'bridge'],
    defaultConfig: { height: 300 },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { WaterfallChart } from '@goliapkg/gds'" />
        <LivePreview>
          <WaterfallChartSvg data={waterfallData} height={config.height} />
        </LivePreview>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <Ctrl label="height" type="number" value={config.height} min={200} max={500} onChange={v => setConfig('height', v)} />
    ),

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['data', 'Waterfall items', '{ label: string; value: number }[]', '—'],
          ['height', 'Chart height in px', 'number', '300'],
          ['className', 'Extra classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Use for financial breakdowns showing cumulative positive/negative effects</p>
            <p>• Positive values shown in green, negative in red, total in accent</p>
            <p>• Connector lines show running total between bars</p>
          </div>
        </div>
      </div>
    ),

    code: ({ config }) => {
      const props = ['data={data}']
      if (config.height !== 300) props.push(`height={${config.height}}`)
      return `import { WaterfallChart } from '@goliapkg/gds'

const data = [
  { label: 'Revenue', value: 500 },
  { label: 'COGS', value: -200 },
  { label: 'OpEx', value: -80 },
]

<WaterfallChart ${props.join(' ')} />`
    },
  },

  // 3. gantt chart
  {
    id: 'chart-gantt',
    label: 'Gantt Chart',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'gantt', 'timeline', 'project', 'schedule', 'task'],
    defaultConfig: { showProgress: true },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { GanttChart } from '@goliapkg/gds'" />
        <LivePreview>
          <GanttChartSvg
            tasks={config.showProgress ? ganttTasks : ganttTasks.map(t => ({ ...t, progress: 0 }))}
            height={280}
          />
        </LivePreview>
        <DocSection title="Features">
          <div className="space-y-1 text-xs text-fg-muted/60">
            <p>• Date-based horizontal axis with automatic range</p>
            <p>• Progress fill per task bar</p>
            <p>• Group coloring via palette tokens</p>
            <p>• Alternating row backgrounds for readability</p>
          </div>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <Ctrl label="showProgress" type="check" value={config.showProgress} onChange={v => setConfig('showProgress', v)} />
    ),

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['tasks', 'Task definitions', 'GanttTask[]', '—'],
          ['viewMode', 'Timeline scale', "'day' | 'week' | 'month'", "'week'"],
          ['showToday', 'Red dashed line at today', 'boolean', 'true'],
          ['showDependencies', 'SVG dependency arrows', 'boolean', 'true'],
          ['showProgress', 'Progress fill in bars', 'boolean', 'true'],
          ['editable', 'Enable drag move/resize', 'boolean', 'false'],
          ['height', 'Total chart height px', 'number', 'auto'],
        ]} />
        <DocTable
          headers={['Field', 'Description', 'Type', 'Default']}
          rows={[
            ['id', 'Unique identifier', 'string', '—'],
            ['label', 'Display name', 'string', '—'],
            ['start', 'Start date', 'Date | string', '—'],
            ['end', 'End date', 'Date | string', '—'],
            ['progress', 'Completion %', 'number (0-100)', '—'],
            ['group', 'Group/phase name', 'string', '—'],
            ['dependencies', 'Prerequisite task IDs', 'string[]', '—'],
            ['milestone', 'Diamond marker', 'boolean', 'false'],
          ]}
        />
      </div>
    ),

    code: () => `import { GanttChart } from '@goliapkg/gds'

const tasks = [
  {
    id: 'p1', label: 'Requirements',
    start: '2026-03-02', end: '2026-03-08',
    progress: 100, group: 'Planning',
  },
  {
    id: 'd1', label: 'API Development',
    start: '2026-03-16', end: '2026-03-30',
    progress: 60, group: 'Development',
    dependencies: ['p1'],
  },
]

<GanttChart
  tasks={tasks}
  viewMode="week"
  showProgress
  showDependencies
/>`,
  },

  // 4. polar area chart
  {
    id: 'chart-polar-area',
    label: 'Polar Area Chart',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'polar', 'area', 'coxcomb', 'radial'],
    defaultConfig: { size: 300 },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { PolarAreaChart } from '@goliapkg/gds'" />
        <LivePreview>
          <PolarAreaChartSvg data={polarData} size={config.size} />
        </LivePreview>
        <DocSection title="Examples" columns={2}>
          <DemoCard title="5 Segments" code="<PolarAreaChart data={data} />">
            <PolarAreaChartSvg data={polarData} size={200} />
          </DemoCard>
          <DemoCard title="3 Segments" code="<PolarAreaChart data={smallData} size={200} />">
            <PolarAreaChartSvg data={polarData.slice(0, 3)} size={200} />
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <Ctrl label="size" type="number" value={config.size} min={200} max={500} onChange={v => setConfig('size', v)} />
    ),

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['data', 'Segment data array', 'PolarData[]', '—'],
          ['size', 'Chart size in px', 'number', '300'],
          ['className', 'Extra classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Equal angles, varying radius per value (coxcomb/nightingale)</p>
            <p>• Good for comparing magnitudes across categories</p>
            <p>• Uses palette tokens for automatic color assignment</p>
          </div>
        </div>
      </div>
    ),

    code: ({ config }) => {
      const props = ['data={data}']
      if (config.size !== 300) props.push(`size={${config.size}}`)
      return `import { PolarAreaChart } from '@goliapkg/gds'

const data = [
  { label: 'CSS', value: 85 },
  { label: 'JS', value: 70 },
  { label: 'Rust', value: 55 },
]

<PolarAreaChart ${props.join(' ')} />`
    },
  },

  // 5. flame chart
  {
    id: 'chart-flame',
    label: 'Flame Chart',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'flame', 'icicle', 'profiling', 'performance', 'stack'],
    defaultConfig: { height: 200 },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { FlameChart } from '@goliapkg/gds'" />
        <LivePreview>
          <FlameChartSvg data={flameData} height={config.height} />
        </LivePreview>
        <DocSection title="Examples" columns={2}>
          <DemoCard title="Nested Stack" code="<FlameChart data={nested} />">
            <FlameChartSvg data={flameData} height={120} />
          </DemoCard>
          <DemoCard title="Simple" code="<FlameChart data={simple} />">
            <FlameChartSvg
              data={{ name: 'app', value: 100, children: [{ name: 'init', value: 30 }, { name: 'run', value: 70 }] }}
              height={80}
            />
          </DemoCard>
        </DocSection>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <Ctrl label="height" type="number" value={config.height} min={100} max={400} onChange={v => setConfig('height', v)} />
    ),

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['data', 'Root flame node', 'FlameNode', '—'],
          ['height', 'Chart height in px', 'number', '200'],
          ['className', 'Extra classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Use for performance profiling and call stack visualization</p>
            <p>• Each row = depth level, width = proportional time</p>
            <p>• Warm color scale helps distinguish nesting levels</p>
          </div>
        </div>
      </div>
    ),

    code: ({ config }) => {
      const props = ['data={data}']
      if (config.height !== 200) props.push(`height={${config.height}}`)
      return `import { FlameChart } from '@goliapkg/gds'

const data = {
  name: 'main()',
  value: 100,
  children: [
    { name: 'render()', value: 60 },
    { name: 'fetch()', value: 40 },
  ],
}

<FlameChart ${props.join(' ')} />`
    },
  },

  // 6. bullet chart
  {
    id: 'chart-bullet',
    label: 'Bullet Chart',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'bullet', 'kpi', 'target', 'comparison', 'bar'],
    defaultConfig: { actual: 75, target: 90, max: 100 },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { BulletChart } from '@goliapkg/gds'" />
        <LivePreview>
          <div className="w-full max-w-md space-y-4">
            <BulletChartSvg actual={config.actual} target={config.target} max={config.max} label="Revenue" />
            <BulletChartSvg actual={45} target={80} max={100} label="Satisfaction" />
            <BulletChartSvg actual={92} target={85} max={100} label="Completion" />
          </div>
        </LivePreview>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl label="actual" type="number" value={config.actual} min={0} max={200} onChange={v => setConfig('actual', v)} />
        <Ctrl label="target" type="number" value={config.target} min={0} max={200} onChange={v => setConfig('target', v)} />
        <Ctrl label="max" type="number" value={config.max} min={1} max={300} onChange={v => setConfig('max', v)} />
      </>
    ),

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['actual', 'Current value', 'number', '—'],
          ['target', 'Target value', 'number', '—'],
          ['max', 'Maximum value', 'number', '—'],
          ['ranges', 'Poor/ok/good thresholds', '[number, number, number]', 'auto'],
          ['label', 'Label text', 'string', '—'],
          ['className', 'Extra classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Use for KPI vs target comparison in a compact format</p>
            <p>• Gray range bands show poor/ok/good thresholds</p>
            <p>• Target marker is a thin vertical line</p>
          </div>
        </div>
      </div>
    ),

    code: ({ config }) => `import { BulletChart } from '@goliapkg/gds'

<BulletChart
  actual={${config.actual}}
  target={${config.target}}
  max={${config.max}}
  label="Revenue"
/>`,
  },

  // 7. choropleth map
  {
    id: 'chart-choropleth',
    label: 'Choropleth Map',
    layer: 'l6',
    type: 'interactive',
    tags: ['chart', 'choropleth', 'map', 'geographic', 'region', 'heatmap'],
    defaultConfig: { height: 400 },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { ChoroplethMap } from '@goliapkg/gds'" />
        <LivePreview>
          <ChoroplethMapSvg data={choroplethData} height={config.height} />
        </LivePreview>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <Ctrl label="height" type="number" value={config.height} min={300} max={600} onChange={v => setConfig('height', v)} />
    ),

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['data', 'Region data with id and value', '{ id, value, label? }[]', '—'],
          ['height', 'Chart height in px', 'number', '400'],
          ['colorScale', 'Color gradient endpoints', 'string[]', 'palette-0..1'],
          ['className', 'Extra classes', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">Guidelines</div>
          <div className="space-y-1 text-[10px] text-fg-muted/50">
            <p>• Color-coded geographic regions by data values</p>
            <p>• Hover for detail tooltip</p>
            <p>• Intensity mapping from low to high values</p>
          </div>
        </div>
      </div>
    ),

    code: ({ config }) => `import { ChoroplethMap } from '@goliapkg/gds'

const data = [
  { id: 'hokkaido', value: 25, label: 'Hokkaido' },
  { id: 'kanto', value: 150, label: 'Kanto' },
  { id: 'kansai', value: 85, label: 'Kansai' },
]

<ChoroplethMap data={data}${config.height !== 400 ? ` height={${config.height}}` : ''} />`,
  },

  // 8. chart theming
  {
    id: 'chart-theming',
    label: 'Chart Theming',
    layer: 'l6',
    type: 'reference',
    tags: ['chart', 'theme', 'palette', 'colors', 'tokens'],

    stage: () => (
      <div>
        <DocSection title="Palette Colors">
          <div className="rounded-lg border border-border bg-surface p-4">
            <div className="mb-3 text-xs text-fg-muted">
              All charts use <code className="font-mono text-accent">var(--color-palette-N)</code> tokens.
              Toggle dark mode to see theme adaptation.
            </div>
            <div className="flex flex-wrap gap-2">
              {PALETTE.map((color, i) => (
                <div className="flex items-center gap-2" key={i}>
                  <span className="h-6 w-6 rounded" style={{ backgroundColor: color }} />
                  <span className="font-mono text-[10px] text-fg-muted">palette-{i}</span>
                </div>
              ))}
            </div>
          </div>
        </DocSection>

        <DocSection title="Same Data, Three Chart Types">
          <div className="grid gap-4 lg:grid-cols-3">
            <ChartCard title="Line" height={200}>
              <RLine data={themingData} width={280} height={200}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="var(--color-fg-muted)" tick={{ fontSize: 9 }} />
                <YAxis stroke="var(--color-fg-muted)" tick={{ fontSize: 9 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line dataKey="a" dot={false} stroke={PALETTE[0]} strokeWidth={2} type="monotone" />
                <Line dataKey="b" dot={false} stroke={PALETTE[1]} strokeWidth={2} type="monotone" />
                <Line dataKey="c" dot={false} stroke={PALETTE[4]} strokeWidth={2} type="monotone" />
              </RLine>
            </ChartCard>

            <ChartCard title="Bar" height={200}>
              <RBar data={themingData} width={280} height={200}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="var(--color-fg-muted)" tick={{ fontSize: 9 }} />
                <YAxis stroke="var(--color-fg-muted)" tick={{ fontSize: 9 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="a" fill={PALETTE[0]} radius={[3, 3, 0, 0]} />
                <Bar dataKey="b" fill={PALETTE[1]} radius={[3, 3, 0, 0]} />
                <Bar dataKey="c" fill={PALETTE[4]} radius={[3, 3, 0, 0]} />
              </RBar>
            </ChartCard>

            <ChartCard title="Area" height={200}>
              <RArea data={themingData} width={280} height={200}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="var(--color-fg-muted)" tick={{ fontSize: 9 }} />
                <YAxis stroke="var(--color-fg-muted)" tick={{ fontSize: 9 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area dataKey="a" fill={PALETTE[0]} fillOpacity={0.15} stroke={PALETTE[0]} strokeWidth={2} type="monotone" />
                <Area dataKey="b" fill={PALETTE[1]} fillOpacity={0.15} stroke={PALETTE[1]} strokeWidth={2} type="monotone" />
                <Area dataKey="c" fill={PALETTE[4]} fillOpacity={0.15} stroke={PALETTE[4]} strokeWidth={2} type="monotone" />
              </RArea>
            </ChartCard>
          </div>
        </DocSection>

        <DocSection title="Semantic Colors">
          <div className="rounded-lg border border-border bg-surface p-4">
            <div className="mb-3 text-xs font-medium text-fg">Available semantic color tokens for charts</div>
            <div className="grid grid-cols-2 gap-2 text-xs lg:grid-cols-4">
              {[
                { label: 'Accent', var: '--color-accent' },
                { label: 'Success', var: '--color-success' },
                { label: 'Warning', var: '--color-warning' },
                { label: 'Danger', var: '--color-danger' },
                { label: 'Border', var: '--color-border' },
                { label: 'FG Muted', var: '--color-fg-muted' },
                { label: 'Surface', var: '--color-surface' },
                { label: 'BG', var: '--color-bg' },
              ].map(t => (
                <div className="flex items-center gap-2" key={t.var}>
                  <span className="h-4 w-4 rounded border border-border" style={{ backgroundColor: `var(${t.var})` }} />
                  <span className="text-fg-muted">{t.label}</span>
                  <code className="font-mono text-[10px] text-fg-muted/60">{t.var}</code>
                </div>
              ))}
            </div>
          </div>
        </DocSection>
      </div>
    ),
  },

  // 9. chart patterns
  {
    id: 'chart-patterns',
    label: 'Chart Patterns',
    layer: 'l6',
    type: 'reference',
    tags: ['chart', 'pattern', 'dashboard', 'layout', 'card', 'reference'],

    stage: () => (
      <div>
        <DocSection title="Dashboard Cards with Sparklines">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <DashboardCard change="+12.5%" chartData={[2.0, 2.2, 2.5, 2.8, 3.0, 3.3, 3.5, 4.0, 4.5]} label="Revenue" up value="¥450万" />
            <DashboardCard change="+8.3%" chartData={[180, 190, 200, 210, 225, 230, 240, 250, 260]} label="Active Users" up value="260" />
            <DashboardCard change="-2.1%" chartData={[5.0, 4.8, 4.5, 4.2, 3.8, 3.5, 3.2, 3.0, 2.8]} label="Churn Rate" up={false} value="2.8%" />
            <DashboardCard change="+5pts" chartData={[65, 68, 70, 72, 75, 76, 78, 80, 82]} label="NPS Score" up value="82" />
          </div>
        </DocSection>

        <DocSection title="Charts with Reference Lines">
          <div className="grid gap-3 lg:grid-cols-2">
            <ChartCard title="Revenue vs Target" description="Revenue vs target with reference line" height={240}>
              <RLine data={revenueData} width={400} height={240}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="var(--color-fg-muted)" tick={{ fontSize: 9 }} />
                <YAxis stroke="var(--color-fg-muted)" tick={{ fontSize: 9 }} tickFormatter={fmtYen} />
                <Tooltip contentStyle={tooltipStyle} />
                <ReferenceLine stroke="var(--color-warning)" strokeDasharray="5 5" y={3100000} />
                <Line dataKey="revenue" dot={false} stroke="var(--color-palette-0)" strokeWidth={2} type="monotone" />
                <Line dataKey="target" dot={false} stroke="var(--color-fg-muted)" strokeDasharray="4 4" strokeWidth={1} type="monotone" />
              </RLine>
            </ChartCard>

            <ChartCard title="Work Hours" description="Weekly hours with average reference" height={240}>
              <RBar data={weeklyData} width={400} height={240}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="var(--color-fg-muted)" tick={{ fontSize: 9 }} />
                <YAxis domain={[0, 10]} stroke="var(--color-fg-muted)" tick={{ fontSize: 9 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <ReferenceLine stroke="var(--color-accent)" strokeDasharray="5 5" y={8} />
                <Bar dataKey="hours" fill="var(--color-palette-0)" radius={[4, 4, 0, 0]} />
              </RBar>
            </ChartCard>
          </div>
        </DocSection>

        <DocSection title="Mini Chart Row">
          <div className="rounded-lg border border-border bg-surface p-4">
            <div className="grid grid-cols-3 gap-4">
              {[
                { data: [30, 35, 32, 40, 38, 42, 45], label: 'Orders', value: '45' },
                { data: [85, 82, 88, 90, 87, 92, 95], label: 'Uptime %', value: '95%' },
                { data: [120, 135, 128, 142, 150, 145, 160], label: 'Requests/s', value: '160' },
              ].map(item => (
                <div className="flex items-center gap-3" key={item.label}>
                  <div>
                    <div className="text-[10px] text-fg-muted">{item.label}</div>
                    <div className="text-sm font-bold text-fg tabular-nums">{item.value}</div>
                  </div>
                  <Sparkline color="var(--color-accent)" data={item.data} height={20} width={60} />
                </div>
              ))}
            </div>
          </div>
        </DocSection>
      </div>
    ),
  },

  // 10. chart colors
  {
    id: 'chart-colors',
    label: 'Chart Colors',
    layer: 'l6',
    type: 'reference',
    tags: ['color', 'palette', 'interpolation', 'heatmap', 'scale', 'gradient'],

    stage: () => (
      <div>
        <DocSection title="Palette Token Colors (0-9)">
          <div className="rounded-lg border border-border bg-surface p-4">
            <div className="flex flex-wrap gap-3">
              {PALETTE.map((color, i) => (
                <div className="flex flex-col items-center gap-1" key={i}>
                  <div className="h-10 w-10 rounded-md border border-border" style={{ backgroundColor: color }} />
                  <span className="font-mono text-[10px] text-fg-muted">palette-{i}</span>
                </div>
              ))}
            </div>
          </div>
        </DocSection>

        <DocSection title="Auto-generated Chart Colors">
          <div className="space-y-4 rounded-lg border border-border bg-surface p-4">
            {[5, 10, 15, 20].map(count => {
              // generate colors: first 10 from palette, then interpolated
              const colors = Array.from({ length: count }, (_, i) => {
                if (i < 10) return PALETTE[i]
                return interpolateHex('#6366f1', '#ec4899', (i - 10) / Math.max(count - 10, 1))
              })
              return (
                <div key={count}>
                  <div className="mb-2 text-xs font-medium text-fg-muted">{count} data groups</div>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((c, i) => <ColorSwatch key={i} color={c} label={`${i}`} />)}
                  </div>
                </div>
              )
            })}
          </div>
        </DocSection>

        <DocSection title="Color Interpolation">
          <div className="rounded-lg border border-border bg-surface p-4">
            <InterpolationDemo />
          </div>
        </DocSection>

        <DocSection title="Heatmap Color Scales">
          <div className="rounded-lg border border-border bg-surface p-4">
            <HeatmapScaleDemo />
          </div>
        </DocSection>
      </div>
    ),
  },
]

export { chartItemsExt10 }
