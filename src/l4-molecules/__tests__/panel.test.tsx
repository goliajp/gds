import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Panel } from '../panel'

describe('Panel', () => {
  it('renders title', () => {
    render(<Panel title="Settings">Content</Panel>)
    expect(screen.getByText('Settings')).toBeDefined()
  })

  it('shows children when open', () => {
    render(<Panel defaultOpen title="Settings">Panel content</Panel>)
    expect(screen.getByText('Panel content')).toBeDefined()
  })

  it('hides children when collapsed', () => {
    render(<Panel defaultOpen={false} title="Settings">Panel content</Panel>)
    expect(screen.queryByText('Panel content')).toBeNull()
  })

  it('toggles on header click', async () => {
    const user = userEvent.setup()
    render(<Panel defaultOpen title="Settings">Panel content</Panel>)
    expect(screen.getByText('Panel content')).toBeDefined()
    await user.click(screen.getByText('Settings'))
    expect(screen.queryByText('Panel content')).toBeNull()
    await user.click(screen.getByText('Settings'))
    expect(screen.getByText('Panel content')).toBeDefined()
  })

  it('stays open when collapsible is false', () => {
    const { container } = render(
      <Panel collapsible={false} title="Settings">Always visible</Panel>,
    )
    expect(screen.getByText('Always visible')).toBeDefined()
    // no button rendered — title is plain text
    expect(container.querySelector('button')).toBeNull()
  })
})
