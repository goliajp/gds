import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { FileBrowser } from '../file-browser'

const files = [
  { id: '1', name: 'Documents', type: 'folder' as const },
  { id: '2', name: 'readme.txt', type: 'file' as const, size: 2048, modified: '2025-01-01' },
]

describe('FileBrowser', () => {
  it('renders without crash', () => {
    const { container } = render(<FileBrowser files={files} />)
    expect(container.querySelector('[data-component="file-browser"]')).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<FileBrowser files={files} />)
    expect(container.querySelector('[data-component="file-browser"]')).not.toBeNull()
  })

  it('renders file and folder names', () => {
    render(<FileBrowser files={files} />)
    expect(screen.getByText('Documents')).toBeDefined()
    expect(screen.getByText('readme.txt')).toBeDefined()
  })

  it('calls onNavigate when folder is clicked', async () => {
    const user = userEvent.setup()
    const onNavigate = vi.fn()
    render(<FileBrowser files={files} onNavigate={onNavigate} />)
    await user.click(screen.getByText('Documents'))
    expect(onNavigate).toHaveBeenCalledWith('1')
  })

  it('shows empty folder message when no files', () => {
    render(<FileBrowser files={[]} />)
    expect(screen.getByText('Empty folder')).toBeDefined()
  })
})
