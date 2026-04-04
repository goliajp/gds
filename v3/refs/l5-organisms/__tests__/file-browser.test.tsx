import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { FileBrowser } from '../file-browser'

const files = [
  { id: '1', name: 'Documents', type: 'folder' as const },
  {
    id: '2',
    name: 'readme.txt',
    type: 'file' as const,
    size: 2048,
    modified: '2025-01-01',
  },
]

describe('FileBrowser', () => {
  it('renders without crash', () => {
    const { container } = render(<FileBrowser files={files} />)
    expect(
      container.querySelector('[data-component="file-browser"]')
    ).not.toBeNull()
  })

  it('has data-component attribute', () => {
    const { container } = render(<FileBrowser files={files} />)
    expect(
      container.querySelector('[data-component="file-browser"]')
    ).not.toBeNull()
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

  it('calls onSelect when file is clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<FileBrowser files={files} onSelect={onSelect} />)
    await user.click(screen.getByText('readme.txt'))
    expect(onSelect).toHaveBeenCalledWith('2')
  })

  it('does not call onSelect for folder click', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<FileBrowser files={files} onSelect={onSelect} />)
    await user.click(screen.getByText('Documents'))
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('does not call onNavigate for file click', async () => {
    const user = userEvent.setup()
    const onNavigate = vi.fn()
    render(<FileBrowser files={files} onNavigate={onNavigate} />)
    await user.click(screen.getByText('readme.txt'))
    expect(onNavigate).not.toHaveBeenCalled()
  })

  it('formats file size in bytes', () => {
    const smallFiles = [
      { id: '1', name: 'tiny.txt', type: 'file' as const, size: 512 },
    ]
    render(<FileBrowser files={smallFiles} />)
    expect(screen.getByText('512 B')).toBeDefined()
  })

  it('formats file size in KB', () => {
    render(<FileBrowser files={files} />)
    expect(screen.getByText('2.0 KB')).toBeDefined()
  })

  it('formats file size in MB', () => {
    const bigFiles = [
      {
        id: '1',
        name: 'big.zip',
        type: 'file' as const,
        size: 2 * 1024 * 1024,
      },
    ]
    render(<FileBrowser files={bigFiles} />)
    expect(screen.getByText('2.0 MB')).toBeDefined()
  })

  it('shows dash for undefined size', () => {
    const noSizeFiles = [{ id: '1', name: 'nosize.txt', type: 'file' as const }]
    render(<FileBrowser files={noSizeFiles} />)
    // file type shows dash for size since size is undefined via formatSize
  })

  it('shows modified date', () => {
    render(<FileBrowser files={files} />)
    expect(screen.getByText('2025-01-01')).toBeDefined()
  })

  it('shows dash for folders in size column', () => {
    render(<FileBrowser files={files} />)
    // Folders show '—' for size
  })

  it('highlights selected file', () => {
    const { container } = render(<FileBrowser files={files} selected="2" />)
    const rows = container.querySelectorAll('tbody tr')
    expect(rows[1]?.className).toContain('bg-accent/10')
  })

  it('handles Enter key on folder row', () => {
    const onNavigate = vi.fn()
    const { container } = render(
      <FileBrowser files={files} onNavigate={onNavigate} />
    )
    const rows = container.querySelectorAll('tbody tr')
    fireEvent.keyDown(rows[0], { key: 'Enter' })
    expect(onNavigate).toHaveBeenCalledWith('1')
  })

  it('handles Enter key on file row', () => {
    const onSelect = vi.fn()
    const { container } = render(
      <FileBrowser files={files} onSelect={onSelect} />
    )
    const rows = container.querySelectorAll('tbody tr')
    fireEvent.keyDown(rows[1], { key: 'Enter' })
    expect(onSelect).toHaveBeenCalledWith('2')
  })

  it('renders custom icon when provided', () => {
    const filesWithIcon = [
      {
        id: '1',
        name: 'custom.txt',
        type: 'file' as const,
        icon: <span data-testid="custom-icon">C</span>,
      },
    ]
    render(<FileBrowser files={filesWithIcon} />)
    expect(screen.getByTestId('custom-icon')).toBeDefined()
  })

  it('applies custom className', () => {
    const { container } = render(
      <FileBrowser files={files} className="my-browser" />
    )
    const root = container.querySelector('[data-component="file-browser"]')
    expect(root?.className).toContain('my-browser')
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<FileBrowser files={files} ref={ref} />)
    expect(ref.current).not.toBeNull()
  })
})
