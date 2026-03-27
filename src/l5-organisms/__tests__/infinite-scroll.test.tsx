import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { InfiniteScroll } from '../infinite-scroll'

// mock IntersectionObserver
const mockObserve = vi.fn()
const mockDisconnect = vi.fn()
let observerCallback: IntersectionObserverCallback

vi.stubGlobal('IntersectionObserver', class {
  constructor(callback: IntersectionObserverCallback) {
    observerCallback = callback
  }
  observe = mockObserve
  disconnect = mockDisconnect
  unobserve = vi.fn()
})

describe('InfiniteScroll', () => {
  it('renders children', () => {
    render(
      <InfiniteScroll onLoadMore={vi.fn()} hasMore>
        <div>Child content</div>
      </InfiniteScroll>,
    )
    expect(screen.getByText('Child content')).toBeDefined()
  })

  it('shows default loader when loading', () => {
    const { container } = render(
      <InfiniteScroll onLoadMore={vi.fn()} hasMore loading>
        <div>Content</div>
      </InfiniteScroll>,
    )
    expect(container.querySelector('[data-component="loading-dots"]')).not.toBeNull()
  })

  it('shows custom loader when provided', () => {
    render(
      <InfiniteScroll onLoadMore={vi.fn()} hasMore loading loader={<div data-testid="custom-loader">Loading...</div>}>
        <div>Content</div>
      </InfiniteScroll>,
    )
    expect(screen.getByTestId('custom-loader')).toBeDefined()
  })

  it('hides loader when not loading', () => {
    const { container } = render(
      <InfiniteScroll onLoadMore={vi.fn()} hasMore loading={false}>
        <div>Content</div>
      </InfiniteScroll>,
    )
    expect(container.querySelector('[data-component="loading-dots"]')).toBeNull()
  })

  it('renders sentinel div', () => {
    const { container } = render(
      <InfiniteScroll onLoadMore={vi.fn()} hasMore>
        <div>Content</div>
      </InfiniteScroll>,
    )
    expect(container.querySelector('[data-sentinel="true"]')).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(
      <InfiniteScroll onLoadMore={vi.fn()} hasMore>
        <div>Content</div>
      </InfiniteScroll>,
    )
    expect(container.querySelector('[data-component="infinite-scroll"]')).not.toBeNull()
  })

  it('calls onLoadMore when sentinel is intersecting and hasMore is true', () => {
    const onLoadMore = vi.fn()
    render(
      <InfiniteScroll onLoadMore={onLoadMore} hasMore>
        <div>Content</div>
      </InfiniteScroll>,
    )

    // simulate intersection
    observerCallback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    )

    expect(onLoadMore).toHaveBeenCalledOnce()
  })

  it('does not call onLoadMore when not intersecting', () => {
    const onLoadMore = vi.fn()
    render(
      <InfiniteScroll onLoadMore={onLoadMore} hasMore>
        <div>Content</div>
      </InfiniteScroll>,
    )

    observerCallback(
      [{ isIntersecting: false } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    )

    expect(onLoadMore).not.toHaveBeenCalled()
  })

  it('does not call onLoadMore when hasMore is false', () => {
    const onLoadMore = vi.fn()
    render(
      <InfiniteScroll onLoadMore={onLoadMore} hasMore={false}>
        <div>Content</div>
      </InfiniteScroll>,
    )

    observerCallback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    )

    expect(onLoadMore).not.toHaveBeenCalled()
  })

  it('does not call onLoadMore when loading is true', () => {
    const onLoadMore = vi.fn()
    render(
      <InfiniteScroll onLoadMore={onLoadMore} hasMore loading>
        <div>Content</div>
      </InfiniteScroll>,
    )

    observerCallback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    )

    expect(onLoadMore).not.toHaveBeenCalled()
  })

  it('observes the sentinel element', () => {
    const { container } = render(
      <InfiniteScroll onLoadMore={vi.fn()} hasMore>
        <div>Content</div>
      </InfiniteScroll>,
    )

    const sentinel = container.querySelector('[data-sentinel="true"]')
    expect(mockObserve).toHaveBeenCalledWith(sentinel)
  })

  it('disconnects observer on unmount', () => {
    const { unmount } = render(
      <InfiniteScroll onLoadMore={vi.fn()} hasMore>
        <div>Content</div>
      </InfiniteScroll>,
    )

    unmount()
    expect(mockDisconnect).toHaveBeenCalled()
  })

  it('applies custom className', () => {
    const { container } = render(
      <InfiniteScroll onLoadMore={vi.fn()} hasMore className="my-scroll">
        <div>Content</div>
      </InfiniteScroll>,
    )
    const el = container.querySelector('[data-component="infinite-scroll"]')
    expect(el?.className).toContain('my-scroll')
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(
      <InfiniteScroll onLoadMore={vi.fn()} hasMore ref={ref}>
        <div>Content</div>
      </InfiniteScroll>,
    )
    expect(ref.current).not.toBeNull()
    expect(ref.current?.getAttribute('data-component')).toBe('infinite-scroll')
  })

  it('spreads additional HTML props', () => {
    const { container } = render(
      <InfiniteScroll onLoadMore={vi.fn()} hasMore data-custom="test">
        <div>Content</div>
      </InfiniteScroll>,
    )
    const el = container.querySelector('[data-component="infinite-scroll"]')
    expect(el?.getAttribute('data-custom')).toBe('test')
  })

  it('hides loader when loading is undefined', () => {
    const { container } = render(
      <InfiniteScroll onLoadMore={vi.fn()} hasMore>
        <div>Content</div>
      </InfiniteScroll>,
    )
    expect(container.querySelector('[data-component="loading-dots"]')).toBeNull()
  })
})
