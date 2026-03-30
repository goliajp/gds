// email-composer — full-featured block-based email composition
// supports new/reply/reply-all/forward modes with rich text editing
// uses RichTextEditor for body, EmailComposerField for recipients

import { Paperclip, Send, X } from 'lucide-react'
import type { ReactNode } from 'react'
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'

import type { EmailContact } from '../l4-molecules/email-composer-field'
import { EmailComposerField } from '../l4-molecules/email-composer-field'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'
import { sanitizeEmailHtml } from '../utils/sanitize'
import type { RichTextEditorHandle } from './rich-text-editor'
import { RichTextEditor } from './rich-text-editor'

// ---- types ----

export type EmailComposerMode = 'forward' | 'new' | 'reply' | 'reply-all'

export type ComposerBlock =
  | { type: 'text'; id: string; html: string; text: string }
  | {
      type: 'attachment'
      id: string
      file: File
      name: string
      size: number
      mimeType: string
    }
  | {
      type: 'quote'
      id: string
      html: string
      headerText: string
      collapsed: boolean
    }
  | { type: 'signature'; id: string; html: string; text: string }
  | { type: 'divider'; id: string }

export type AssembledEmail = {
  html: string
  text: string
  attachments: File[]
}

export type EmailComposerHandle = {
  focus: () => void
  getAssembled: () => AssembledEmail
  getEditorRef: () => RichTextEditorHandle | null
  addAttachment: (file: File) => void
  clearContent: () => void
}

export type EmailComposerProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'ref'
> & {
  /** compose mode */
  mode: EmailComposerMode

  /** recipients (controlled) */
  to: EmailContact[]
  onToChange: (contacts: EmailContact[]) => void
  cc?: EmailContact[]
  onCcChange?: (contacts: EmailContact[]) => void
  bcc?: EmailContact[]
  onBccChange?: (contacts: EmailContact[]) => void
  showCc?: boolean
  showBcc?: boolean

  /** subject */
  subject: string
  onSubjectChange: (subject: string) => void

  /** contact search */
  onContactSearch: (query: string) => Promise<EmailContact[]>

  /** image upload (passed to RichTextEditor) */
  onImageUpload?: (file: File) => Promise<string | null>

  /** initial quoted content (for reply/forward) */
  quotedHtml?: string
  quotedHeader?: string
  /** HTML signature */
  signature?: string

  /** actions */
  onSend: (email: AssembledEmail) => void
  onDiscard?: () => void
  onSaveDraft?: (email: AssembledEmail) => void

  /** submit button config */
  submitLabel?: string
  submitShortcut?: string

  /** extra action buttons in footer (e.g. AI Suggest, Polish) */
  footerActions?: ReactNode

  /** frosted glass effect */
  glass?: boolean
  className?: string
}

// ---- helpers ----

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function assembleEmail(
  bodyHtml: string,
  bodyText: string,
  attachments: File[],
  quotedHtml?: string,
  quotedHeader?: string,
  signatureHtml?: string
): AssembledEmail {
  const htmlParts: string[] = []
  const textParts: string[] = []

  // body
  htmlParts.push(bodyHtml)
  textParts.push(bodyText)

  // signature
  if (signatureHtml !== undefined && signatureHtml !== '') {
    htmlParts.push(
      '<div style="margin-top:16px;border-top:1px solid #e5e5e5;padding-top:12px">'
    )
    htmlParts.push(signatureHtml)
    htmlParts.push('</div>')
    textParts.push('\n-- \n')
  }

  // quoted content
  if (quotedHtml !== undefined && quotedHtml !== '') {
    const header = quotedHeader ?? ''
    htmlParts.push(
      `<div style="margin-top:16px;padding-left:12px;border-left:3px solid #d1d5db;color:#6b7280">`
    )
    if (header !== '')
      htmlParts.push(`<p style="margin-bottom:8px">${header}</p>`)
    htmlParts.push(quotedHtml)
    htmlParts.push('</div>')
    if (header !== '') textParts.push(`\n${header}\n`)
    textParts.push('> (quoted content)')
  }

  return {
    html: htmlParts.join('\n'),
    text: textParts.join('\n'),
    attachments,
  }
}

// ---- component ----

export const EmailComposer = forwardRef<
  EmailComposerHandle,
  EmailComposerProps
>(function EmailComposer(
  {
    mode,
    to,
    onToChange,
    cc,
    onCcChange,
    bcc,
    onBccChange,
    showCc: initialShowCc,
    showBcc: initialShowBcc,
    subject,
    onSubjectChange,
    onContactSearch,
    onImageUpload,
    quotedHtml,
    quotedHeader,
    signature,
    onSend,
    onDiscard,
    onSaveDraft: _onSaveDraft,
    submitLabel,
    submitShortcut,
    footerActions,
    glass,
    className,
    ...props
  },
  ref
) {
  const [showCc, setShowCc] = useState(initialShowCc === true)
  const [showBcc, setShowBcc] = useState(initialShowBcc === true)
  const [attachments, setAttachments] = useState<File[]>([])
  const [quoteCollapsed, setQuoteCollapsed] = useState(true)
  const editorRef = useRef<RichTextEditorHandle>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // sanitize quoted HTML to prevent XSS
  const sanitizedQuotedHtml = useMemo(() => {
    if (quotedHtml === undefined || quotedHtml === '') return quotedHtml
    return sanitizeEmailHtml(quotedHtml)
  }, [quotedHtml])

  // assemble and send
  const handleSend = useCallback(() => {
    const html = editorRef.current?.getHTML() ?? ''
    const text = editorRef.current?.getText() ?? ''
    const email = assembleEmail(
      html,
      text,
      attachments,
      quotedHtml,
      quotedHeader,
      signature
    )
    onSend(email)
  }, [attachments, quotedHtml, quotedHeader, signature, onSend])

  // Ctrl/Cmd+Enter from anywhere in composer
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault()
        handleSend()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [handleSend])

  // file attachment
  const addFiles = useCallback((files: FileList | File[]) => {
    setAttachments((prev) => [...prev, ...Array.from(files)])
  }, [])

  const removeAttachment = useCallback((index: number) => {
    setAttachments((prev) => {
      const next = [...prev]
      next.splice(index, 1)
      return next
    })
  }, [])

  // drag drop on entire composer
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const files = e.dataTransfer.files
      if (files.length > 0) addFiles(files)
    },
    [addFiles]
  )

  // imperative handle
  useImperativeHandle(
    ref,
    () => ({
      focus: () => editorRef.current?.focus(),
      getAssembled: () => {
        const html = editorRef.current?.getHTML() ?? ''
        const text = editorRef.current?.getText() ?? ''
        return assembleEmail(
          html,
          text,
          attachments,
          quotedHtml,
          quotedHeader,
          signature
        )
      },
      getEditorRef: () => editorRef.current,
      addAttachment: (file: File) => setAttachments((prev) => [...prev, file]),
      clearContent: () => {
        editorRef.current?.clearContent()
        setAttachments([])
      },
    }),
    [attachments, quotedHtml, quotedHeader, signature]
  )

  const sendLabel = submitLabel ?? 'Send'
  const shortcutHint = submitShortcut ?? 'Ctrl+Enter'

  return (
    <div
      {...props}
      className={cx(
        'border-border gds-radius-card bg-surface flex flex-col overflow-hidden border',
        glass === true && glassClass(glass),
        glass === true && 'bg-bg/60 border-white/10',
        className
      )}
      data-component="email-composer"
      data-variant={mode}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {/* recipient fields */}
      <div className="border-border flex flex-col border-b">
        <div className="flex items-center">
          <div className="flex-1">
            <EmailComposerField
              label="To"
              value={to}
              onChange={onToChange}
              onSearch={onContactSearch}
            />
          </div>
          {!showCc && !showBcc && (
            <div className="flex shrink-0 gap-1.5 px-2">
              <button
                type="button"
                className="gds-text-label text-fg-muted hover:text-accent transition-colors"
                onClick={() => setShowCc(true)}
              >
                Cc
              </button>
              <button
                type="button"
                className="gds-text-label text-fg-muted hover:text-accent transition-colors"
                onClick={() => setShowBcc(true)}
              >
                Bcc
              </button>
            </div>
          )}
        </div>

        {showCc && onCcChange !== undefined && (
          <EmailComposerField
            label="Cc"
            value={cc ?? []}
            onChange={onCcChange}
            onSearch={onContactSearch}
          />
        )}

        {showBcc && onBccChange !== undefined && (
          <EmailComposerField
            label="Bcc"
            value={bcc ?? []}
            onChange={onBccChange}
            onSearch={onContactSearch}
          />
        )}
      </div>

      {/* subject */}
      <div className="border-border border-b">
        <input
          type="text"
          value={subject}
          onChange={(e) => onSubjectChange(e.target.value)}
          placeholder="Subject"
          className="gds-text-body text-fg placeholder:text-fg-muted/30 w-full bg-transparent px-3 py-2.5 outline-none"
        />
      </div>

      {/* rich text body */}
      <div className="min-h-0 flex-1">
        <RichTextEditor
          ref={editorRef}
          mode="full"
          placeholder="Write your message..."
          onImageUpload={onImageUpload}
          onSubmit={handleSend}
          className="rounded-none border-0"
        />
      </div>

      {/* attachments */}
      {attachments.length > 0 && (
        <div className="border-border flex flex-wrap gap-2 border-t px-3 py-2">
          {attachments.map((file, i) => (
            <div
              key={`${file.name}-${i}`}
              className="bg-bg-secondary gds-text-label flex items-center gap-1.5 rounded-md px-2 py-1"
            >
              <Paperclip className="text-fg-muted h-3 w-3" />
              <span className="text-fg max-w-[140px] truncate">
                {file.name}
              </span>
              <span className="text-fg-muted">{formatFileSize(file.size)}</span>
              <button
                type="button"
                className="text-fg-muted hover:text-danger transition-colors"
                onClick={() => removeAttachment(i)}
                aria-label={`Remove ${file.name}`}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* quoted content (reply/forward) */}
      {sanitizedQuotedHtml !== undefined && sanitizedQuotedHtml !== '' && (
        <div className="border-border border-t">
          <button
            type="button"
            className="gds-text-label text-fg-muted hover:text-fg flex w-full items-center gap-1.5 px-3 py-1.5 transition-colors"
            onClick={() => setQuoteCollapsed((prev) => !prev)}
            aria-expanded={!quoteCollapsed}
            aria-label={
              quoteCollapsed ? 'Show original message' : 'Hide original message'
            }
          >
            <svg
              className={cx(
                'h-3 w-3 transition-transform',
                !quoteCollapsed && 'rotate-90'
              )}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
            {quoteCollapsed ? 'Show original' : 'Hide original'}
          </button>
          {!quoteCollapsed && (
            <div
              className="border-accent/20 text-fg-muted gds-text-body ml-3 border-l-2 px-3 pb-3"
              dangerouslySetInnerHTML={{ __html: sanitizedQuotedHtml }}
            />
          )}
        </div>
      )}

      {/* footer: actions + send */}
      <div className="border-border flex items-center justify-between border-t px-3 py-2">
        <div className="flex items-center gap-2">
          {/* attachment button */}
          <button
            type="button"
            className="text-fg-muted hover:text-fg flex items-center justify-center rounded p-1.5 transition-colors hover:bg-white/[0.04]"
            onClick={() => fileInputRef.current?.click()}
            title="Attach file"
            aria-label="Attach file"
          >
            <Paperclip className="h-4 w-4" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            aria-label="Choose files to attach"
            onChange={(e) => {
              if (e.target.files !== null && e.target.files.length > 0) {
                addFiles(e.target.files)
                e.target.value = ''
              }
            }}
          />

          {/* extra footer actions (AI Suggest, Polish, etc.) */}
          {footerActions}
        </div>

        <div className="flex items-center gap-2">
          {onDiscard !== undefined && (
            <button
              type="button"
              className="gds-text-body text-fg-muted hover:text-fg px-2 py-1 transition-colors"
              onClick={onDiscard}
            >
              Cancel
            </button>
          )}

          <button
            type="button"
            className="bg-accent gds-text-body text-accent-fg hover:bg-accent-hover inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-colors"
            onClick={handleSend}
            title={`${sendLabel} (${shortcutHint})`}
          >
            <Send className="h-3.5 w-3.5" />
            {sendLabel}
          </button>
        </div>
      </div>
    </div>
  )
})
