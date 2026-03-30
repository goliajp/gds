import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

// mock useIsMobile hook
vi.mock('../../utils/hooks', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../../utils/hooks')>()
  return {
    ...mod,
    useIsMobile: vi.fn(() => false),
  }
})

import { useIsMobile } from '../../utils/hooks'
import { InboxLayout } from '../inbox-layout'

describe('InboxLayout', () => {
  it('renders with data-component="inbox-layout"', () => {
    const { container } = render(
      <InboxLayout list={<div>List</div>} detail={<div>Detail</div>} />
    )
    expect(
      container.querySelector('[data-component="inbox-layout"]')
    ).not.toBeNull()
  })

  it('renders list and detail panes', () => {
    render(
      <InboxLayout
        list={<div>Email list</div>}
        detail={<div>Email detail</div>}
      />
    )
    expect(screen.getByText('Email list')).toBeDefined()
    expect(screen.getByText('Email detail')).toBeDefined()
  })

  it('shows empty state when detail is null/undefined', () => {
    render(
      <InboxLayout
        list={<div>List</div>}
        emptyState={<div>Select an email</div>}
      />
    )
    expect(screen.getByText('Select an email')).toBeDefined()
  })

  it('renders sidebar when provided', () => {
    render(
      <InboxLayout
        sidebar={<div>Sidebar</div>}
        list={<div>List</div>}
        detail={<div>Detail</div>}
      />
    )
    expect(screen.getByText('Sidebar')).toBeDefined()
  })

  it('applies custom list width', () => {
    const { container } = render(
      <InboxLayout
        list={<div>List</div>}
        detail={<div>Detail</div>}
        listWidth={400}
      />
    )
    const layout = container.querySelector('[data-component="inbox-layout"]')
    // list pane is the first child div (or second if sidebar exists)
    const listPane = layout?.querySelector('.border-r') as HTMLElement
    expect(listPane?.style.width).toBe('400px')
  })

  it('renders resizable divider by default', () => {
    const { container } = render(
      <InboxLayout list={<div>List</div>} detail={<div>Detail</div>} />
    )
    const separator = container.querySelector('[role="separator"]')
    expect(separator).not.toBeNull()
  })

  it('hides resizable divider when resizable={false}', () => {
    const { container } = render(
      <InboxLayout
        list={<div>List</div>}
        detail={<div>Detail</div>}
        resizable={false}
      />
    )
    const separator = container.querySelector('[role="separator"]')
    expect(separator).toBeNull()
  })

  it('renders batch actions when provided', () => {
    render(
      <InboxLayout
        list={<div>List</div>}
        detail={<div>Detail</div>}
        batchActions={<div>Batch actions bar</div>}
      />
    )
    expect(screen.getByText('Batch actions bar')).toBeDefined()
  })

  it('applies custom className', () => {
    const { container } = render(
      <InboxLayout list={<div>List</div>} className="my-inbox" />
    )
    const el = container.querySelector('[data-component="inbox-layout"]')
    expect(el?.className).toContain('my-inbox')
  })

  describe('mobile view', () => {
    it('shows list pane by default on mobile', () => {
      vi.mocked(useIsMobile).mockReturnValue(true)
      render(
        <InboxLayout
          list={<div>Mobile list</div>}
          detail={<div>Mobile detail</div>}
        />
      )
      expect(screen.getByText('Mobile list')).toBeDefined()
      expect(screen.queryByText('Mobile detail')).toBeNull()
    })

    it('shows detail pane when mobileView="detail"', () => {
      vi.mocked(useIsMobile).mockReturnValue(true)
      render(
        <InboxLayout
          list={<div>Mobile list</div>}
          detail={<div>Mobile detail</div>}
          mobileView="detail"
        />
      )
      expect(screen.queryByText('Mobile list')).toBeNull()
      expect(screen.getByText('Mobile detail')).toBeDefined()
    })

    it('shows Back button in detail view', () => {
      vi.mocked(useIsMobile).mockReturnValue(true)
      render(
        <InboxLayout
          list={<div>List</div>}
          detail={<div>Detail</div>}
          mobileView="detail"
        />
      )
      expect(screen.getByText('Back')).toBeDefined()
    })

    it('calls onMobileViewChange when Back is clicked', () => {
      vi.mocked(useIsMobile).mockReturnValue(true)
      const onMobileViewChange = vi.fn()
      render(
        <InboxLayout
          list={<div>List</div>}
          detail={<div>Detail</div>}
          mobileView="detail"
          onMobileViewChange={onMobileViewChange}
        />
      )
      fireEvent.click(screen.getByText('Back'))
      expect(onMobileViewChange).toHaveBeenCalledWith('list')
    })

    it('sets data-mobile-view attribute', () => {
      vi.mocked(useIsMobile).mockReturnValue(true)
      const { container } = render(
        <InboxLayout list={<div>List</div>} mobileView="list" />
      )
      const el = container.querySelector('[data-component="inbox-layout"]')
      expect(el?.getAttribute('data-mobile-view')).toBe('list')
    })

    // reset mock after mobile tests
    it('desktop: does not show Back button', () => {
      vi.mocked(useIsMobile).mockReturnValue(false)
      render(<InboxLayout list={<div>List</div>} detail={<div>Detail</div>} />)
      expect(screen.queryByText('Back')).toBeNull()
    })
  })
})
