import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { FileUpload } from '../file-upload'

describe('FileUpload', () => {
  it('renders drop zone with default text', () => {
    render(<FileUpload onFiles={() => {}} />)
    expect(screen.getByText('Drop files here or click to browse')).toBeDefined()
  })

  it('has data-component="file-upload"', () => {
    const { container } = render(<FileUpload onFiles={() => {}} />)
    expect(container.querySelector('[data-component="file-upload"]')).not.toBeNull()
  })

  it('renders custom children instead of default UI', () => {
    render(<FileUpload onFiles={() => {}}><span>Custom content</span></FileUpload>)
    expect(screen.getByText('Custom content')).toBeDefined()
    expect(screen.queryByText('Drop files here or click to browse')).toBeNull()
  })

  it('opens file picker on click', async () => {
    const user = userEvent.setup()
    const { container } = render(<FileUpload onFiles={() => {}} />)
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    const clickSpy = vi.spyOn(input, 'click')
    const zone = container.querySelector('[data-component="file-upload"]')!
    await user.click(zone)
    expect(clickSpy).toHaveBeenCalled()
  })

  it('does not open file picker when disabled', async () => {
    const user = userEvent.setup()
    const { container } = render(<FileUpload onFiles={() => {}} disabled />)
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    const clickSpy = vi.spyOn(input, 'click')
    const zone = container.querySelector('[data-component="file-upload"]')!
    await user.click(zone)
    expect(clickSpy).not.toHaveBeenCalled()
  })

  it('handles drag over state', () => {
    const { container } = render(<FileUpload onFiles={() => {}} />)
    const zone = container.querySelector('[data-component="file-upload"]')!
    fireEvent.dragOver(zone, { dataTransfer: { files: [] } })
    expect(container.querySelector('[data-state="drag-over"]')).not.toBeNull()
  })

  it('does not set drag-over when disabled', () => {
    const { container } = render(<FileUpload onFiles={() => {}} disabled />)
    const zone = container.querySelector('[data-component="file-upload"]')!
    fireEvent.dragOver(zone, { dataTransfer: { files: [] } })
    expect(container.querySelector('[data-state="idle"]')).not.toBeNull()
  })

  it('handles drag leave state', () => {
    const { container } = render(<FileUpload onFiles={() => {}} />)
    const zone = container.querySelector('[data-component="file-upload"]')!
    fireEvent.dragOver(zone, { dataTransfer: { files: [] } })
    fireEvent.dragLeave(zone, { dataTransfer: { files: [] } })
    expect(container.querySelector('[data-state="idle"]')).not.toBeNull()
  })

  it('applies disabled styling', () => {
    const { container } = render(<FileUpload onFiles={() => {}} disabled />)
    const zone = container.querySelector('[data-component="file-upload"]')!
    expect(zone.className).toContain('opacity-50')
  })

  it('sets accept attribute on input', () => {
    const { container } = render(<FileUpload onFiles={() => {}} accept="image/*,.pdf" />)
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    expect(input.getAttribute('accept')).toBe('image/*,.pdf')
  })

  it('sets multiple attribute on input', () => {
    const { container } = render(<FileUpload onFiles={() => {}} multiple />)
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    expect(input.hasAttribute('multiple')).toBe(true)
  })

  it('handles file drop and calls onFiles', () => {
    const onFiles = vi.fn()
    const { container } = render(<FileUpload onFiles={onFiles} />)
    const zone = container.querySelector('[data-component="file-upload"]')!

    const file = new File(['hello'], 'test.txt', { type: 'text/plain' })
    fireEvent.drop(zone, { dataTransfer: { files: [file] } })

    expect(onFiles).toHaveBeenCalledWith([file])
    expect(container.querySelector('[data-state="idle"]')).not.toBeNull()
  })

  it('does not process drop when disabled', () => {
    const onFiles = vi.fn()
    const { container } = render(<FileUpload onFiles={onFiles} disabled />)
    const zone = container.querySelector('[data-component="file-upload"]')!

    const file = new File(['hello'], 'test.txt', { type: 'text/plain' })
    fireEvent.drop(zone, { dataTransfer: { files: [file] } })

    expect(onFiles).not.toHaveBeenCalled()
  })

  it('filters files by maxSize', () => {
    const onFiles = vi.fn()
    const { container } = render(<FileUpload onFiles={onFiles} maxSize={100} />)
    const zone = container.querySelector('[data-component="file-upload"]')!

    const smallFile = new File(['hi'], 'small.txt', { type: 'text/plain' })
    const bigFile = new File(['x'.repeat(200)], 'big.txt', { type: 'text/plain' })

    fireEvent.drop(zone, { dataTransfer: { files: [smallFile, bigFile] } })

    expect(onFiles).toHaveBeenCalledWith([smallFile])
  })

  it('handles input change event', () => {
    const onFiles = vi.fn()
    const { container } = render(<FileUpload onFiles={onFiles} />)
    const input = container.querySelector('input[type="file"]') as HTMLInputElement

    const file = new File(['content'], 'doc.pdf', { type: 'application/pdf' })
    fireEvent.change(input, { target: { files: [file] } })

    expect(onFiles).toHaveBeenCalledWith([file])
  })

  it('shows selected file count after drop (plural)', () => {
    const { container } = render(<FileUpload onFiles={() => {}} />)
    const zone = container.querySelector('[data-component="file-upload"]')!

    const file1 = new File(['a'], 'a.txt', { type: 'text/plain' })
    const file2 = new File(['b'], 'b.txt', { type: 'text/plain' })

    fireEvent.drop(zone, { dataTransfer: { files: [file1, file2] } })
    expect(screen.getByText('2 files selected')).toBeDefined()
  })

  it('shows singular "file" for single file', () => {
    const { container } = render(<FileUpload onFiles={() => {}} />)
    const zone = container.querySelector('[data-component="file-upload"]')!

    const file = new File(['a'], 'a.txt', { type: 'text/plain' })
    fireEvent.drop(zone, { dataTransfer: { files: [file] } })

    expect(screen.getByText('1 file selected')).toBeDefined()
  })

  it('applies glass class when glass is true', () => {
    const { container } = render(<FileUpload onFiles={() => {}} glass />)
    const zone = container.querySelector('[data-component="file-upload"]')!
    expect(zone.className).toContain('gds-glass')
  })

  it('applies custom className', () => {
    const { container } = render(<FileUpload onFiles={() => {}} className="my-upload" />)
    const zone = container.querySelector('[data-component="file-upload"]')!
    expect(zone.className).toContain('my-upload')
  })

  it('passes all files when maxSize is not set', () => {
    const onFiles = vi.fn()
    const { container } = render(<FileUpload onFiles={onFiles} />)
    const zone = container.querySelector('[data-component="file-upload"]')!

    const bigFile = new File(['x'.repeat(10000)], 'big.txt', { type: 'text/plain' })
    fireEvent.drop(zone, { dataTransfer: { files: [bigFile] } })

    expect(onFiles).toHaveBeenCalledWith([bigFile])
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null }
    render(<FileUpload onFiles={() => {}} ref={ref} />)
    expect(ref.current).not.toBeNull()
    expect(ref.current?.getAttribute('data-component')).toBe('file-upload')
  })
})
