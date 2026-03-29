// stat — KPI card with animated counter, trend, sparkline, and motion
import type { ReactNode } from 'react'
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'

import { cx } from '../utils/cx'

type StatProps = {
  animated?: boolean
  change?: string
  changeType?: 'down' | 'neutral' | 'up'
  className?: string
  description?: string
  footer?: ReactNode
  glass?: boolean
  icon?: ReactNode
  label: string
  motion?: 'counter' | 'fade' | 'slide-up'
  pulse?: boolean
  size?: 'default' | 'lg' | 'sm'
  sparkData?: number[]
  trend?: number
  unit?: string
  value: number | string
}

const valueSizes = { default: 'text-2xl', lg: 'text-3xl', sm: 'text-lg' }

const changeColors = { down: 'text-danger', neutral: 'text-fg-muted', up: 'text-success' }

// inline arrow SVGs
function ArrowUpIcon() { return <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" /></svg> }
function ArrowDownIcon() { return <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M19 12l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" /></svg> }
function MinusIcon() { return <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14" strokeLinecap="round" /></svg> }

const changeIcons = { down: ArrowDownIcon, neutral: MinusIcon, up: ArrowUpIcon }

function sparklinePath(data: number[], w: number, h: number): string {
  if (data.length < 2) return ''
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const step = w / (data.length - 1)
  return data.map((v, i) => `${i === 0 ? 'M' : 'L'}${(i * step).toFixed(1)},${(h - ((v - min) / range) * h).toFixed(1)}`).join(' ')
}

function useAnimatedValue(target: number, enabled: boolean, duration: number = 500): number {
  const [display, setDisplay] = useState(target)
  const prevRef = useRef(target)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!enabled) { setDisplay(target); return }
    const from = prevRef.current
    prevRef.current = target
    if (from === target) return
    const startTime = performance.now()
    const diff = target - from
    const animate = (now: number) => {
      const progress = Math.min(1, (now - startTime) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(from + diff * eased)
      if (progress < 1) { rafRef.current = requestAnimationFrame(animate) } else { setDisplay(target) }
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, enabled, duration])

  return display
}

export const Stat = forwardRef<HTMLDivElement, StatProps>(
  function Stat({ animated = false, change, changeType = 'neutral', className, description, footer, glass = false, icon, label, motion: motionProp, pulse = false, size = 'default', sparkData, trend, unit, value }, ref) {
    const ChangeIcon = changeIcons[changeType]
    const trendDir = trend !== undefined ? (trend > 0 ? 'up' : trend < 0 ? 'down' : 'neutral') : null
    const trendColor = trendDir !== null ? changeColors[trendDir] : null
    const sparkColor = trendDir === 'up' ? 'var(--gds-success)' : trendDir === 'down' ? 'var(--gds-danger)' : 'var(--gds-fg-muted)'

    const path = useMemo(() => sparkData !== undefined && sparkData.length >= 2 ? sparklinePath(sparkData, 80, 24) : null, [sparkData])

    const numericValue = typeof value === 'number' ? value : null
    const animatedValue = useAnimatedValue(numericValue ?? 0, animated && numericValue !== null)
    const displayValue = animated && numericValue !== null ? (Number.isInteger(animatedValue) ? animatedValue.toLocaleString() : animatedValue.toLocaleString(undefined, { maximumFractionDigits: 2 })) : value

    const motionCls = motionProp === 'fade' ? 'animate-fade-in' : motionProp === 'slide-up' ? 'animate-slide-up' : ''

    return (
      <div
        className={cx('select-none', glass ? 'rounded-lg border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur-xl' : 'space-y-1', pulse && 'animate-pulse', motionCls, className)}
        data-component="stat"
        ref={ref}
      >
        <div className="flex items-start justify-between">
          <div className="text-xs text-fg-muted">{label}</div>
          {icon !== undefined && <span className="h-4 w-4 text-fg-muted/30">{icon}</span>}
        </div>

        <div className="flex items-end gap-3">
          <div className={cx('font-bold text-fg tabular-nums', valueSizes[size])}>
            {displayValue}
            {unit !== undefined && <span className="ml-1 text-xs font-normal text-fg-muted">{unit}</span>}
          </div>
          {trend !== undefined && trendDir !== null && (
            <div className={cx('mb-0.5 flex items-center gap-0.5 text-xs font-medium', trendColor)}>
              {trendDir === 'up' && <ArrowUpIcon />}
              {trendDir === 'down' && <ArrowDownIcon />}
              {trendDir === 'neutral' && <MinusIcon />}
              <span>{trendDir === 'neutral' ? '0%' : `${trend > 0 ? '+' : ''}${trend}%`}</span>
            </div>
          )}
        </div>

        {change !== undefined && trend === undefined && (
          <div className={cx('inline-flex items-center gap-0.5 text-xs font-medium', changeColors[changeType])}>
            <ChangeIcon />
            {change}
          </div>
        )}

        {path !== null && (
          <svg className="mt-1" height={24} viewBox="0 0 80 24" width={80}>
            <path d={path} fill="none" stroke={sparkColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
          </svg>
        )}

        {description !== undefined && <div className="text-[11px] text-fg-muted">{description}</div>}
        {footer !== undefined && <div className="mt-3 border-t border-border/20 pt-2 text-[10px] text-fg-muted/50">{footer}</div>}
      </div>
    )
  },
)

export type { StatProps }
