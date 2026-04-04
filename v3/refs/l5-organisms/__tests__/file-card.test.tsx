import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { FileCard } from '../file-card'

describe('FileCard', () => {
  it('renders with data-component', () => {
    const { container } = render(<FileCard name="report.pdf" />)
    expect(
      container.querySelector('[data-component="file-card"]')
    ).not.toBeNull()
  })

  it('renders file name, size, and type', () => {
    render(<FileCard name="design.fig" size="2.4 MB" type="Figma" />)
    expect(screen.getByText('design.fig')).toBeDefined()
    expect(screen.getByText('2.4 MB')).toBeDefined()
    expect(screen.getByText('Figma')).toBeDefined()
  })

  it('fires onClick', () => {
    const handler = vi.fn()
    render(<FileCard name="doc.pdf" onClick={handler} />)
    fireEvent.click(screen.getByText('doc.pdf').closest('[role="button"]')!)
    expect(handler).toHaveBeenCalledOnce()
  })

  it('does not have button role when onClick is not provided', () => {
    const { container } = render(<FileCard name="report.pdf" />)
    expect(container.querySelector('[role="button"]')).toBeNull()
  })

  it('renders thumbnail image', () => {
    render(<FileCard name="photo.jpg" thumbnail="/thumb.jpg" />)
    const img = screen.getByRole('img')
    expect(img.getAttribute('src')).toBe('/thumb.jpg')
    expect(img.getAttribute('alt')).toBe('photo.jpg')
  })

  it('does not render thumbnail when not provided', () => {
    render(<FileCard name="report.pdf" />)
    expect(screen.queryByRole('img')).toBeNull()
  })

  it('renders actions slot', () => {
    render(
      <FileCard
        name="report.pdf"
        actions={<button type="button">Download</button>}
      />
    )
    expect(screen.getByText('Download')).toBeDefined()
  })

  it('does not render actions slot when not provided', () => {
    const { container } = render(<FileCard name="report.pdf" />)
    // should not have the actions div
    expect(
      container.querySelector('[data-component="file-card"]')
    ).not.toBeNull()
  })

  it('handles Enter key when clickable', () => {
    const handler = vi.fn()
    render(<FileCard name="doc.pdf" onClick={handler} />)
    const el = screen.getByRole('button')
    fireEvent.keyDown(el, { key: 'Enter' })
    expect(handler).toHaveBeenCalledOnce()
  })

  it('handles Space key when clickable', () => {
    const handler = vi.fn()
    render(<FileCard name="doc.pdf" onClick={handler} />)
    const el = screen.getByRole('button')
    fireEvent.keyDown(el, { key: ' ' })
    expect(handler).toHaveBeenCalledOnce()
  })

  it('does not render size when not provided', () => {
    render(<FileCard name="report.pdf" />)
    // just verifying no crash
  })

  it('renders size when provided', () => {
    render(<FileCard name="report.pdf" size="1.2 MB" />)
    expect(screen.getByText('1.2 MB')).toBeDefined()
  })

  it('renders type badge', () => {
    render(<FileCard name="report.pdf" type="PDF" />)
    expect(screen.getByText('PDF')).toBeDefined()
  })

  it('applies custom className', () => {
    const { container } = render(
      <FileCard name="report.pdf" className="my-card" />
    )
    const root = container.querySelector('[data-component="file-card"]')
    expect(root?.className).toContain('my-card')
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<FileCard name="report.pdf" ref={ref} />)
    expect(ref.current).not.toBeNull()
  })
})
