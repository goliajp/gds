import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { DownloadButton } from '../download-button'

describe('DownloadButton', () => {
  it('renders with data-component attribute', () => {
    const { container } = render(<DownloadButton label="Download" onClick={vi.fn()} />)
    expect(container.querySelector('[data-component="download-button"]')).not.toBeNull()
  })

  it('renders label in idle state', () => {
    render(<DownloadButton label="Get File" onClick={vi.fn()} />)
    expect(screen.getByText('Get File')).toBeDefined()
  })

  it('is not disabled in idle state by default', () => {
    render(<DownloadButton label="DL" onClick={vi.fn()} />)
    const btn = screen.getByRole('button')
    expect(btn.hasAttribute('disabled')).toBe(false)
  })

  it('calls onClick when clicked in idle state', () => {
    const onClick = vi.fn()
    render(<DownloadButton label="DL" onClick={onClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('shows progress percentage when downloading', () => {
    render(<DownloadButton label="DL" onClick={vi.fn()} progress={45} />)
    expect(screen.getByText('45%')).toBeDefined()
  })

  it('is disabled when downloading', () => {
    render(<DownloadButton label="DL" onClick={vi.fn()} progress={45} />)
    const btn = screen.getByRole('button')
    expect(btn.hasAttribute('disabled')).toBe(true)
  })

  it('shows "Downloaded" text when complete', () => {
    render(<DownloadButton label="DL" onClick={vi.fn()} complete />)
    expect(screen.getByText('Downloaded')).toBeDefined()
  })

  it('is not disabled when complete (no progress)', () => {
    render(<DownloadButton label="DL" onClick={vi.fn()} complete />)
    const btn = screen.getByRole('button')
    expect(btn.hasAttribute('disabled')).toBe(false)
  })

  it('shows complete state even when progress is provided', () => {
    render(<DownloadButton label="DL" onClick={vi.fn()} progress={100} complete />)
    expect(screen.getByText('Downloaded')).toBeDefined()
    expect(screen.queryByText('100%')).toBeNull()
  })

  it('is disabled when disabled prop is true', () => {
    render(<DownloadButton label="DL" onClick={vi.fn()} disabled />)
    const btn = screen.getByRole('button')
    expect(btn.hasAttribute('disabled')).toBe(true)
  })

  it('applies opacity class when disabled', () => {
    const { container } = render(<DownloadButton label="DL" onClick={vi.fn()} disabled />)
    const btn = container.querySelector('[data-component="download-button"]')
    expect(btn?.className).toContain('opacity-50')
  })

  it('applies custom className', () => {
    const { container } = render(<DownloadButton label="DL" onClick={vi.fn()} className="my-cls" />)
    const el = container.querySelector('[data-component="download-button"]')
    expect(el?.className).toContain('my-cls')
  })

  it('applies success border when complete', () => {
    const { container } = render(<DownloadButton label="DL" onClick={vi.fn()} complete />)
    const el = container.querySelector('[data-component="download-button"]')
    expect(el?.className).toContain('border-success')
  })
})
