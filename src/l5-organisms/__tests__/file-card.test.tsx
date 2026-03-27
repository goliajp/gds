import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { FileCard } from '../file-card'

describe('FileCard', () => {
  it('renders with data-component', () => {
    const { container } = render(<FileCard name="report.pdf" />)
    expect(container.querySelector('[data-component="file-card"]')).not.toBeNull()
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
})
