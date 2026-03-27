import { Component } from 'react'

import type { ReactNode } from 'react'

import { layers } from './nav'

import type { DevCenterItem, StageProps } from '../types'

// error boundary

type ErrorBoundaryProps = {
  children: ReactNode
  resetKey: string
}

type ErrorBoundaryState = {
  hasError: boolean
  error: unknown
}

class StageErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false, error: null })
    }
  }

  render() {
    if (this.state.hasError) {
      const message = this.state.error instanceof Error
        ? this.state.error.message
        : 'An unexpected error occurred'

      return (
        <div className="flex h-full items-center justify-center">
          <div className="text-center max-w-md">
            <div className="text-sm font-medium text-danger mb-2">Component Error</div>
            <div className="text-xs text-fg-muted/50 mb-4 font-mono break-all">{message}</div>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false, error: null })}
              className="rounded px-3 py-1.5 text-xs font-medium text-fg bg-fg-muted/10 hover:bg-fg-muted/15"
            >
              Reset
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// stage component

type StageComponentProps = {
  item: DevCenterItem | undefined
  stageProps: StageProps
}

export function Stage({ item, stageProps }: StageComponentProps) {
  if (item === undefined) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="text-sm text-fg-muted/30">Select an item from the sidebar</div>
          <div className="mt-1 text-xs text-fg-muted/15">↑↓ to navigate</div>
        </div>
      </div>
    )
  }

  const meta = layers.find(l => l.id === item.layer)

  // call stage — supports both simple and rich signatures
  const stageContent = item.stage.length > 0
    ? (item.stage as (props: StageProps) => React.ReactNode)(stageProps)
    : (item.stage as () => React.ReactNode)()

  return (
    <div className="dc-stage flex h-full flex-col overflow-hidden">
      {/* header */}
      <div
        className="shrink-0 flex items-center border-b border-white/[0.06]"
        style={{ padding: 'var(--gds-pad-y, 6px) var(--gds-pad-x-lg, 16px)', gap: 'var(--gds-gap, 8px)' }}
      >
        <h1 className="text-sm font-semibold text-fg">{item.label}</h1>
        {meta !== undefined && (
          <span
            className="inline-flex rounded px-1.5 py-0.5 text-xs font-bold tracking-wider"
            style={{
              color: meta.color,
              background: `color-mix(in srgb, ${meta.color} 12%, transparent)`,
            }}
          >
            {meta.shortLabel}
          </span>
        )}
        {item.tags !== undefined && item.tags.length > 0 && (
          <div className="flex items-center gap-1 ml-auto">
            {item.tags.map(tag => (
              <span key={tag} className="rounded px-1.5 py-0.5 text-xs text-fg-muted/30 bg-fg-muted/5">
                {tag}
              </span>
            ))}
          </div>
        )}
        <button
          className="ml-auto shrink-0 rounded p-1 text-fg-muted/25 transition-colors hover:bg-fg-muted/5 hover:text-fg-muted/50"
          onClick={() => window.print()}
          title="Print"
          aria-label="Print current page"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
          </svg>
        </button>
      </div>

      {/* content — wrapped in error boundary, resets on item change */}
      <div className="flex-1 overflow-y-auto" style={{ padding: 'var(--gds-pad-x-lg, 16px)' }}>
        <StageErrorBoundary resetKey={item.id}>
          {stageContent}
        </StageErrorBoundary>
      </div>
    </div>
  )
}
