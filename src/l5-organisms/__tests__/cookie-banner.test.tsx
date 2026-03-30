import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { CookieBanner } from '../cookie-banner'

describe('CookieBanner', () => {
  it('renders default message via portal', () => {
    render(<CookieBanner onAccept={() => {}} />)
    expect(
      document.querySelector('[data-component="cookie-banner"]')
    ).not.toBeNull()
  })

  it('calls onAccept when accept button clicked', async () => {
    const user = userEvent.setup()
    const onAccept = vi.fn()
    render(<CookieBanner onAccept={onAccept} />)
    await user.click(screen.getByText('Accept'))
    expect(onAccept).toHaveBeenCalledOnce()
  })

  it('renders reject button only when onReject provided', () => {
    const { unmount } = render(<CookieBanner onAccept={() => {}} />)
    expect(screen.queryByText('Reject')).toBeNull()
    unmount()
    render(<CookieBanner onAccept={() => {}} onReject={() => {}} />)
    expect(screen.getByText('Reject')).toBeDefined()
  })
})
