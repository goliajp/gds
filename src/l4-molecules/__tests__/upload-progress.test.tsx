import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { UploadProgress } from '../upload-progress'

const files = [
  { name: 'photo.jpg', progress: 75, status: 'uploading' as const },
  { name: 'doc.pdf', progress: 100, status: 'done' as const },
  {
    name: 'data.csv',
    progress: 30,
    status: 'error' as const,
    error: 'Network error',
  },
]

describe('UploadProgress', () => {
  it('renders without crash', () => {
    const { container } = render(<UploadProgress files={files} />)
    expect(container.firstChild).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<UploadProgress files={files} />)
    expect(
      container.querySelector('[data-component="upload-progress"]')
    ).not.toBeNull()
  })

  it('renders file names', () => {
    render(<UploadProgress files={files} />)
    expect(screen.getByText('photo.jpg')).toBeDefined()
    expect(screen.getByText('doc.pdf')).toBeDefined()
    expect(screen.getByText('data.csv')).toBeDefined()
  })

  it('applies custom className', () => {
    const { container } = render(
      <UploadProgress className="custom" files={files} />
    )
    expect(
      container.querySelector('[data-component="upload-progress"]')?.className
    ).toContain('custom')
  })
})
