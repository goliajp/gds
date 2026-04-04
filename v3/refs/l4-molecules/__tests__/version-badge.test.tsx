import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { VersionBadge } from '../version-badge'

describe('VersionBadge', () => {
  it('renders version with data-component', () => {
    const { container } = render(<VersionBadge version="1.2.3" />)
    expect(
      container.querySelector('[data-component="version-badge"]')
    ).not.toBeNull()
    expect(screen.getByText('v1.2.3')).toBeDefined()
  })

  it('shows no update indicator when latest matches version', () => {
    const { container } = render(
      <VersionBadge latest="1.2.3" version="1.2.3" />
    )
    expect(container.querySelector('[data-has-update="false"]')).not.toBeNull()
    expect(container.querySelector('svg')).toBeNull()
  })

  it('shows update indicator when latest differs', () => {
    const { container } = render(
      <VersionBadge latest="2.0.0" version="1.2.3" />
    )
    expect(container.querySelector('[data-has-update="true"]')).not.toBeNull()
    expect(container.querySelector('svg')).not.toBeNull()
  })
})
