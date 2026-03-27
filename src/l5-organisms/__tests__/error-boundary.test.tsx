import { render, screen } from '@testing-library/react'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

import { ErrorBoundary } from '../error-boundary'

function ThrowingComponent({ message }: { message: string }): never {
  throw new Error(message)
}

describe('ErrorBoundary', () => {
  // suppress console.error from React error boundary logs
  const originalError = console.error
  beforeAll(() => { console.error = () => {} })
  afterAll(() => { console.error = originalError })

  it('renders children normally when no error', () => {
    render(
      <ErrorBoundary>
        <p>Hello world</p>
      </ErrorBoundary>,
    )
    expect(screen.getByText('Hello world')).toBeDefined()
  })

  it('shows default fallback on error', () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent message="test failure" />
      </ErrorBoundary>,
    )
    expect(screen.getByText('Something went wrong')).toBeDefined()
    expect(screen.getByText('test failure')).toBeDefined()
  })

  it('calls onError when error occurs', () => {
    const onError = vi.fn()
    render(
      <ErrorBoundary onError={onError}>
        <ThrowingComponent message="callback test" />
      </ErrorBoundary>,
    )
    expect(onError).toHaveBeenCalledOnce()
    expect(onError.mock.calls[0][0].message).toBe('callback test')
  })

  it('renders custom fallback element', () => {
    render(
      <ErrorBoundary fallback={<p>Custom error view</p>}>
        <ThrowingComponent message="custom" />
      </ErrorBoundary>,
    )
    expect(screen.getByText('Custom error view')).toBeDefined()
  })
})
