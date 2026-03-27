import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { InboxLayout } from '../inbox-layout'

describe('InboxLayout', () => {
  it('renders list and detail panes', () => {
    render(
      <InboxLayout
        list={<div>Email list</div>}
        detail={<div>Email detail</div>}
      />,
    )
    expect(screen.getByText('Email list')).toBeDefined()
    expect(screen.getByText('Email detail')).toBeDefined()
  })

  it('sets data-component attribute', () => {
    const { container } = render(
      <InboxLayout list={<div />} detail={<div />} />,
    )
    expect(container.querySelector('[data-component="inbox-layout"]')).not.toBeNull()
  })

  it('applies custom list width', () => {
    const { container } = render(
      <InboxLayout list={<div />} detail={<div />} listWidth={400} />,
    )
    const listPane = container.querySelector('[data-component="inbox-layout"] > div')
    expect((listPane as HTMLElement)?.style.width).toBe('400px')
  })
})
