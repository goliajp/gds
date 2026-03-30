import { fireEvent, render, screen } from '@testing-library/react'
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

import { EmailComposer } from '../email-composer'

const defaultProps = {
  mode: 'new' as const,
  to: [],
  onToChange: vi.fn(),
  subject: '',
  onSubjectChange: vi.fn(),
  onContactSearch: vi.fn(async () => []),
  onSend: vi.fn(),
}

describe('EmailComposer', () => {
  it('renders with data-component="email-composer"', () => {
    const { container } = render(<EmailComposer {...defaultProps} />)
    expect(container.querySelector('[data-component="email-composer"]')).not.toBeNull()
  })

  it('sets data-variant from mode', () => {
    const { container } = render(<EmailComposer {...defaultProps} mode="reply" />)
    const el = container.querySelector('[data-component="email-composer"]')
    expect(el?.getAttribute('data-variant')).toBe('reply')
  })

  it('renders To field', () => {
    const { container } = render(<EmailComposer {...defaultProps} />)
    expect(container.querySelector('[data-component="email-composer-field"]')).not.toBeNull()
  })

  it('renders subject input', () => {
    render(<EmailComposer {...defaultProps} subject="Test Subject" />)
    const input = screen.getByPlaceholderText('Subject')
    expect(input).toBeDefined()
    expect((input as HTMLInputElement).value).toBe('Test Subject')
  })

  it('calls onSubjectChange when subject is typed', () => {
    const onSubjectChange = vi.fn()
    render(<EmailComposer {...defaultProps} onSubjectChange={onSubjectChange} />)
    const input = screen.getByPlaceholderText('Subject')
    fireEvent.change(input, { target: { value: 'New Subject' } })
    expect(onSubjectChange).toHaveBeenCalledWith('New Subject')
  })

  it('shows Cc and Bcc toggle buttons when not shown', () => {
    render(<EmailComposer {...defaultProps} />)
    expect(screen.getByText('Cc')).toBeDefined()
    expect(screen.getByText('Bcc')).toBeDefined()
  })

  it('shows Cc field when Cc button is clicked', () => {
    const onCcChange = vi.fn()
    const { container } = render(
      <EmailComposer {...defaultProps} cc={[]} onCcChange={onCcChange} />,
    )
    fireEvent.click(screen.getByText('Cc'))
    // after clicking Cc, a second email-composer-field should appear
    const fields = container.querySelectorAll('[data-component="email-composer-field"]')
    expect(fields.length).toBe(2)
  })

  it('shows Bcc field when Bcc button is clicked', () => {
    const onBccChange = vi.fn()
    const { container } = render(
      <EmailComposer {...defaultProps} bcc={[]} onBccChange={onBccChange} />,
    )
    fireEvent.click(screen.getByText('Bcc'))
    const fields = container.querySelectorAll('[data-component="email-composer-field"]')
    expect(fields.length).toBe(2)
  })

  it('calls onSend when Send button is clicked', () => {
    const onSend = vi.fn()
    render(<EmailComposer {...defaultProps} onSend={onSend} />)
    fireEvent.click(screen.getByText('Send'))
    expect(onSend).toHaveBeenCalledOnce()
  })

  it('calls onDiscard when Cancel button is clicked', () => {
    const onDiscard = vi.fn()
    render(<EmailComposer {...defaultProps} onDiscard={onDiscard} />)
    fireEvent.click(screen.getByText('Cancel'))
    expect(onDiscard).toHaveBeenCalledOnce()
  })

  it('renders custom submit label', () => {
    render(<EmailComposer {...defaultProps} submitLabel="Reply" />)
    expect(screen.getByText('Reply')).toBeDefined()
  })

  it('applies custom className', () => {
    const { container } = render(
      <EmailComposer {...defaultProps} className="my-composer" />,
    )
    const el = container.querySelector('[data-component="email-composer"]')
    expect(el?.className).toContain('my-composer')
  })
})
