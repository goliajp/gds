import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CopyField } from '../copy-field'

describe('CopyField', () => {
  it('has data-component="copy-field"', () => {
    const { container } = render(<CopyField value="test-value" />)
    expect(container.querySelector('[data-component="copy-field"]')).not.toBeNull()
  })

  it('displays value text', () => {
    render(<CopyField value="my-api-key-123" />)
    expect(screen.getByText('my-api-key-123')).toBeDefined()
  })

  it('renders label when provided', () => {
    render(<CopyField value="abc" label="API Key" />)
    expect(screen.getByText('API Key')).toBeDefined()
  })

  it('masks value with dots when masked is true', () => {
    const { container } = render(<CopyField value="secret" masked />)
    const span = container.querySelector('.font-mono')
    // should contain bullet characters, not the actual value
    expect(span?.textContent).not.toBe('secret')
    expect(span?.textContent).toContain('\u2022')
  })
})
