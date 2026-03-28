import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Popover } from '../popover'

describe('Popover', () => {
  it('has data-component="popover"', () => {
    const { container } = render(
      <Popover content={<div>Content</div>} trigger={<button>Open</button>} />,
    )
    expect(container.querySelector('[data-component="popover"]')).not.toBeNull()
  })

  it('has data-state="closed" by default', () => {
    const { container } = render(
      <Popover content={<div>Content</div>} trigger={<button>Open</button>} />,
    )
    expect(container.querySelector('[data-state="closed"]')).not.toBeNull()
  })

  it('renders trigger', () => {
    render(
      <Popover content={<div>Content</div>} trigger={<button>Open</button>} />,
    )
    expect(screen.getByText('Open')).toBeDefined()
  })

  it('shows content on trigger click', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Popover content={<div>Popover body</div>} trigger={<button>Open</button>} />,
    )
    await user.click(screen.getByText('Open'))
    expect(container.querySelector('[data-state="open"]')).not.toBeNull()
    expect(screen.getByText('Popover body')).toBeDefined()
  })

  it('hides content on second trigger click', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Popover content={<div>Popover body</div>} trigger={<button>Open</button>} />,
    )
    await user.click(screen.getByText('Open'))
    await user.click(screen.getByText('Open'))
    expect(container.querySelector('[data-state="closed"]')).not.toBeNull()
  })
})
