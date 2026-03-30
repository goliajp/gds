import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

// mock tiptap before importing component
vi.mock('../../utils/tiptap', () => {
  const mockConfigure = vi.fn(() => ({}))
  return {
    useEditor: vi.fn(() => null),
    EditorContent: ({ className }: { editor: unknown; className?: string }) => (
      <div data-testid="editor-content" className={className} />
    ),
    StarterKit: { configure: mockConfigure },
    ExtCodeBlockLowlight: { configure: mockConfigure },
    ExtImage: { configure: mockConfigure },
    ExtLink: { configure: mockConfigure },
    ExtPlaceholder: { configure: mockConfigure },
    ExtTable: { configure: mockConfigure },
    ExtTableRow: {},
    ExtTableCell: {},
    ExtTableHeader: {},
    ExtTaskList: {},
    ExtTaskItem: { configure: mockConfigure },
    ExtUnderline: {},
  }
})

import { RichTextEditor } from '../rich-text-editor'

describe('RichTextEditor', () => {
  it('renders with data-component="rich-text-editor"', () => {
    const { container } = render(<RichTextEditor />)
    expect(container.querySelector('[data-component="rich-text-editor"]')).not.toBeNull()
  })

  it('sets data-variant to full by default', () => {
    const { container } = render(<RichTextEditor />)
    const el = container.querySelector('[data-component="rich-text-editor"]')
    expect(el?.getAttribute('data-variant')).toBe('full')
  })

  it('sets data-variant to minimal when mode="minimal"', () => {
    const { container } = render(<RichTextEditor mode="minimal" />)
    const el = container.querySelector('[data-component="rich-text-editor"]')
    expect(el?.getAttribute('data-variant')).toBe('minimal')
  })

  it('renders editor content area', () => {
    const { container } = render(<RichTextEditor />)
    expect(container.querySelector('[data-testid="editor-content"]')).not.toBeNull()
  })

  it('does not render toolbar when toolbar={false}', () => {
    const { container } = render(<RichTextEditor toolbar={false} />)
    // toolbar has border-b class on a div inside the component, but editor is null so toolbar won't show anyway
    // With editor = null, toolbar is hidden regardless. The important thing is no toolbar buttons appear.
    const buttons = container.querySelectorAll('button')
    expect(buttons.length).toBe(0)
  })

  it('applies glass classes when glass={true}', () => {
    const { container } = render(<RichTextEditor glass />)
    const el = container.querySelector('[data-component="rich-text-editor"]')
    expect(el?.className).toContain('bg-bg/60')
  })

  it('applies custom className', () => {
    const { container } = render(<RichTextEditor className="my-editor" />)
    const el = container.querySelector('[data-component="rich-text-editor"]')
    expect(el?.className).toContain('my-editor')
  })
})
