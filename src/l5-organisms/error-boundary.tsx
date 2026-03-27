// error-boundary — catches render errors and shows fallback UI
import type { ErrorInfo, ReactNode } from 'react'
import { Component } from 'react'

export type ErrorBoundaryProps = {
  children: ReactNode
  fallback?: ReactNode | ((error: Error) => ReactNode)
  onError?: (error: Error, info: ErrorInfo) => void
}

type ErrorBoundaryState = {
  error: Error | null
}

class ErrorBoundaryClass extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (this.props.onError !== undefined) {
      this.props.onError(error, info)
    }
  }

  render() {
    const { error } = this.state
    const { children, fallback } = this.props

    if (error === null) {
      return children
    }

    if (fallback !== undefined) {
      if (typeof fallback === 'function') {
        return fallback(error)
      }
      return fallback
    }

    return (
      <div
        className="flex flex-col items-center justify-center gap-2 gds-pad gds-text-body text-danger"
        data-component="error-boundary"
      >
        <p className="font-semibold">Something went wrong</p>
        <p className="text-fg-muted gds-text-caption">{error.message}</p>
      </div>
    )
  }
}

export { ErrorBoundaryClass as ErrorBoundary }
