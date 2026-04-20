import { createElement, forwardRef, type ElementType, type ReactNode } from 'react'

import { cx } from './utils'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type TextAs =
  | 'span'
  | 'p'
  | 'div'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'strong'
  | 'em'
  | 'small'
  | 'code'
  | 'label'

export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'inherit'
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold'
export type TextFamily = 'sans' | 'serif' | 'mono'
export type TextColor =
  | 'fg'
  | 'fg-secondary'
  | 'fg-muted'
  | 'accent'
  | 'danger'
  | 'warning'
  | 'success'
  | 'inherit'
export type TextAlign = 'start' | 'center' | 'end' | 'justify'
export type TextSelect = 'auto' | 'none' | 'text' | 'all'
export type TextTransform = 'none' | 'uppercase' | 'lowercase'
export type TextDecoration = 'none' | 'underline' | 'strike'
export type TextHighlightVariant = 'accent' | 'warning' | 'success'

export type TextHighlightConfig = {
  match: string | string[] | RegExp
  variant?: TextHighlightVariant
  caseSensitive?: boolean
}

export type TextAriaLive = 'off' | 'polite' | 'assertive'
export type TextDir = 'ltr' | 'rtl' | 'auto'

// 闭合 API：不走 ...rest 透传。每个允许的 prop 必须在这里显式列出。
// className 是唯一的样式逃生口；a11y 走 camelCase 提升为一等 prop。
export type TextProps = {
  // === 功能性：语义 + 排版 + 行为 ===
  as?: TextAs
  size?: TextSize
  weight?: TextWeight
  family?: TextFamily
  color?: TextColor
  align?: TextAlign
  select?: TextSelect
  transform?: TextTransform
  decoration?: TextDecoration
  truncate?: boolean | number
  tabular?: boolean
  lang?: string
  dir?: TextDir
  highlight?: TextHighlightConfig

  // === a11y（camelCase 一等 prop，内部 map 成 DOM kebab-case） ===
  ariaLabel?: string
  ariaLabelledBy?: string
  ariaDescribedBy?: string
  ariaHidden?: boolean
  ariaLive?: TextAriaLive
  role?: string

  // === identification ===
  id?: string

  // === 条件性（文档里说明何时生效） ===
  htmlFor?: string // 只对 as="label" 有意义
  dateTime?: string // 预留：as="time" 若后续加回

  // === 结构 ===
  children?: ReactNode
  className?: string
}

// ---------------------------------------------------------------------------
// Class maps
// ---------------------------------------------------------------------------

// size 走 inline style：绕开 tailwind-merge 把 text-[Npx] 和 text-fg 都当 "text-"
// 前缀误合并的陷阱，也去除"库要保证 Tailwind 扫到"的依赖。
const SIZE_STYLE: Record<TextSize, { fontSize?: string; lineHeight?: string }> = {
  xs: { fontSize: '11px', lineHeight: '1.4' },
  sm: { fontSize: '13px', lineHeight: '1.5' },
  md: { fontSize: '14px', lineHeight: '1.5' },
  lg: { fontSize: '16px', lineHeight: '1.45' },
  xl: { fontSize: '20px', lineHeight: '1.35' },
  '2xl': { fontSize: '24px', lineHeight: '1.3' },
  '3xl': { fontSize: '32px', lineHeight: '1.2' },
  inherit: {},
}

const WEIGHT_CLASS: Record<TextWeight, string> = {
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
}

const FAMILY_CLASS: Record<TextFamily, string> = {
  sans: 'font-sans',
  serif: 'font-serif',
  mono: 'font-mono',
}

const COLOR_CLASS: Record<TextColor, string> = {
  fg: 'text-fg',
  'fg-secondary': 'text-fg-secondary',
  'fg-muted': 'text-fg-muted',
  accent: 'text-accent',
  danger: 'text-danger',
  warning: 'text-warning',
  success: 'text-success',
  inherit: '',
}

const ALIGN_CLASS: Record<TextAlign, string> = {
  start: 'text-start',
  center: 'text-center',
  end: 'text-end',
  justify: 'text-justify',
}

const SELECT_CLASS: Record<TextSelect, string> = {
  auto: '',
  none: 'select-none [-webkit-touch-callout:none]',
  text: 'select-text',
  all: 'select-all',
}

const TRANSFORM_CLASS: Record<TextTransform, string> = {
  none: '',
  uppercase: 'uppercase tracking-[0.05em]',
  lowercase: 'lowercase',
}

const DECORATION_CLASS: Record<TextDecoration, string> = {
  none: '',
  underline: 'underline underline-offset-[0.15em] decoration-1',
  strike: 'line-through',
}

const MARK_VARIANT_CLASS: Record<TextHighlightVariant, string> = {
  accent: 'bg-accent/20 text-accent rounded-[2px] px-[1px]',
  warning: 'bg-warning/20 text-warning rounded-[2px] px-[1px]',
  success: 'bg-success/20 text-success rounded-[2px] px-[1px]',
}

// Default as → mono family (for code)
function defaultFamilyFor(as: TextAs): TextFamily | undefined {
  if (as === 'code') return 'mono'
  return undefined
}

// Default as → select (for code)
function defaultSelectFor(as: TextAs): TextSelect | undefined {
  if (as === 'code') return 'all'
  return undefined
}

// ---------------------------------------------------------------------------
// Highlight logic
// ---------------------------------------------------------------------------

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function buildHighlightRegex(cfg: TextHighlightConfig): RegExp | null {
  const { match, caseSensitive = false } = cfg
  const flags = caseSensitive ? 'g' : 'gi'

  if (typeof match === 'string') {
    if (match.length === 0) return null
    return new RegExp(escapeRegex(match), flags)
  }
  if (Array.isArray(match)) {
    const parts = match.filter((s) => s.length > 0).map(escapeRegex)
    if (parts.length === 0) return null
    // longer first so overlap picks longer match
    parts.sort((a, b) => b.length - a.length)
    return new RegExp(parts.join('|'), flags)
  }
  if (match instanceof RegExp) {
    // ensure global flag so exec advances
    const src = match.source
    const mFlags = match.flags.includes('g') ? match.flags : match.flags + 'g'
    return new RegExp(src, mFlags)
  }
  return null
}

function applyHighlight(text: string, cfg: TextHighlightConfig): ReactNode[] {
  const regex = buildHighlightRegex(cfg)
  if (!regex) return [text]

  const variant = cfg.variant ?? 'accent'
  const markCls = MARK_VARIANT_CLASS[variant]

  const out: ReactNode[] = []
  let lastIndex = 0
  let m: RegExpExecArray | null
  let i = 0
  while ((m = regex.exec(text)) !== null) {
    if (m.index > lastIndex) out.push(text.slice(lastIndex, m.index))
    out.push(
      <mark className={markCls} data-gds-mark key={i}>
        {m[0]}
      </mark>
    )
    lastIndex = m.index + m[0].length
    i++
    if (m[0].length === 0) regex.lastIndex++ // avoid infinite loop on zero-width matches
  }
  if (lastIndex < text.length) out.push(text.slice(lastIndex))
  return out
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const Text = forwardRef<HTMLElement, TextProps>(function Text(props, ref) {
  const {
    as = 'span',
    size = 'md',
    weight = 'regular',
    family,
    color = 'fg',
    align,
    select,
    transform,
    decoration,
    truncate,
    tabular,
    lang,
    dir,
    highlight,
    // a11y
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    ariaHidden,
    ariaLive,
    role,
    // identification
    id,
    // conditional
    htmlFor,
    dateTime,
    // structure
    children,
    className,
  } = props

  // Per-as defaults
  const effectiveFamily = family ?? defaultFamilyFor(as)
  const effectiveSelect = select ?? defaultSelectFor(as)

  // truncate
  const truncateClass =
    truncate === true ? 'truncate' : typeof truncate === 'number' ? 'overflow-hidden' : ''
  const truncateStyle =
    typeof truncate === 'number'
      ? ({
          display: '-webkit-box',
          WebkitLineClamp: truncate,
          WebkitBoxOrient: 'vertical' as const,
          overflow: 'hidden',
        } as const)
      : undefined

  // highlight
  let content: ReactNode = children
  if (highlight && typeof children === 'string') {
    content = applyHighlight(children, highlight)
  } else if (highlight && import.meta.env?.DEV) {
    // dev-only warn: highlight with non-string children is ignored
    // eslint-disable-next-line no-console
    console.warn('[Text] `highlight` only works with string children; ignored.')
  }

  const classes = cx(
    WEIGHT_CLASS[weight],
    effectiveFamily ? FAMILY_CLASS[effectiveFamily] : '',
    COLOR_CLASS[color],
    align ? ALIGN_CLASS[align] : '',
    effectiveSelect ? SELECT_CLASS[effectiveSelect] : '',
    transform ? TRANSFORM_CLASS[transform] : '',
    decoration ? DECORATION_CLASS[decoration] : '',
    tabular ? 'tabular-nums' : '',
    truncateClass,
    className
  )

  const style = {
    ...(size !== 'inherit' ? SIZE_STYLE[size] : {}),
    ...(truncateStyle ?? {}),
  }

  const Tag = as as ElementType

  // Map camelCase a11y props → DOM kebab-case attrs
  return createElement(
    Tag,
    {
      ref,
      id,
      lang,
      dir,
      role,
      htmlFor: as === 'label' ? htmlFor : undefined,
      dateTime: dateTime, // noop until we add as="time"
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      'aria-hidden': ariaHidden,
      'aria-live': ariaLive,
      className: classes,
      style: Object.keys(style).length > 0 ? style : undefined,
      'data-gds-component': 'text',
      'data-gds-as': as,
    },
    content
  )
})
