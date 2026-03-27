import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CertBadge } from '../cert-badge'

describe('CertBadge', () => {
  it('renders data-component attribute', () => {
    const { container } = render(<CertBadge domain="golia.jp" expiresAt="2026-12-01" status="valid" />)
    expect(container.querySelector('[data-component="cert-badge"]')).not.toBeNull()
  })

  it('renders domain and expiry text', () => {
    render(<CertBadge domain="api.golia.jp" expiresAt="2026-06-15" status="expiring" />)
    expect(screen.getByText('api.golia.jp')).toBeDefined()
    expect(screen.getByText('2026-06-15')).toBeDefined()
  })

  it('applies status-specific styling', () => {
    const { container } = render(<CertBadge domain="old.test" expiresAt="2024-01-01" status="expired" />)
    const el = container.querySelector('[data-component="cert-badge"]') as HTMLElement
    expect(el.className).toContain('danger')
  })
})
