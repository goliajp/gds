// email-composer — full-featured block-based email composition
// supports new/reply/reply-all/forward modes with rich text editing
// uses RichTextEditor for body, EmailComposerField for recipients

import { Paperclip, Send, X } from 'lucide-react'
import type { ReactNode } from 'react'
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'

import type { EmailContact } from '../l4-molecules/email-composer-field'
import { EmailComposerField } from '../l4-molecules/email-composer-field'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'
import type { RichTextEditorHandle } from './rich-text-editor'
import { RichTextEditor } from './rich-text-editor'

// ---- types ----

export type EmailComposerMode = 'forward' | 'new' | 'reply' | 'reply-all'

export type ComposerBlock =
  | { type: 'text'; id: string; html: string; text: string }
  | { type: 'attachment'; id: string; file: File; name: string; size: number; mimeType: string }
  | { type: 'quote'; id: string; html: string; headerText: string; collapsed: boolean }
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

export type EmailComposerProps = {
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

  /** ref */
  ref?: React.Ref<EmailComposerHandle>

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
  signatureHtml?: string,
): AssembledEmail {
  const htmlParts: string[] = []
  const textParts: string[] = []

  // body
  htmlParts.push(bodyHtml)
  textParts.push(bodyText)

  // signature
  if (signatureHtml !== undefined && signatureHtml !== '') {
    htmlParts.push('<div style="margin-top:16px;border-top:1px solid #e5e5e5;padding-top:12px">')
    htmlParts.push(signatureHtml)
    htmlParts.push('</div>')
    textParts.push('\n-- \n')
  }

  // quoted content
  if (quotedHtml !== undefined && quotedHtml !== '') {
    const header = quotedHeader ?? ''
    htmlParts.push(`<div style="margin-top:16px;padding-left:12px;border-left:3px solid #d1d5db;color:#6b7280">`)
    if (header !== '') htmlParts.push(`<p style="margin-bottom:8px">${header}</p>`)
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

export const EmailComposer = forwardRef<EmailComposerHandle, EmailComposerProps>(
  function EmailComposer({
    mode,
    to, onToChange,
    cc, onCcChange,
    bcc, onBccChange,
    showCc: initialShowCc,
    showBcc: initialShowBcc,
    subject, onSubjectChange,
    onContactSearch,
    onImageUpload,
    quotedHtml,
    quotedHeader,
    signature,
    onSend,
    onDiscard,
    submitLabel,
    submitShortcut,
    footerActions,
    glass,
    className,
  }, ref) {
    const [showCc, setShowCc] = useState(initialShowCc === true)
    const [showBcc, setShowBcc] = useState(initialShowBcc === true)
    const [attachments, setAttachments] = useState<File[]>([])
    const [quoteCollapsed, setQuoteCollapsed] = useState(true)
    const editorRef = useRef<RichTextEditorHandle>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // assemble and send
    const handleSend = useCallback(() => {
      const html = editorRef.current?.getHTML() ?? ''
      const text = editorRef.current?.getText() ?? ''
      const email = assembleEmail(html, text, attachments, quotedHtml, quotedHeader, signature)
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
      setAttachments(prev => [...prev, ...Array.from(files)])
    }, [])

    const removeAttachment = useCallback((index: number) => {
      setAttachments(prev => {
        const next = [...prev]
        next.splice(index, 1)
        return next
      })
    }, [])

    // drag drop on entire composer
    const handleDrop = useCallback((e: React.DragEvent) => {
      e.preventDefault()
      const files = e.dataTransfer.files
      if (files.length > 0) addFiles(files)
    }, [addFiles])

    // imperative handle
    useImperativeHandle(ref, () => ({
      focus: () => editorRef.current?.focus(),
      getAssembled: () => {
        const html = editorRef.current?.getHTML() ?? ''
        const text = editorRef.current?.getText() ?? ''
        return assembleEmail(html, text, attachments, quotedHtml, quotedHeader, signature)
      },
      getEditorRef: () => editorRef.current,
      addAttachment: (file: File) => setAttachments(prev => [...prev, file]),
      clearContent: () => {
        editorRef.current?.clearContent()
        setAttachments([])
      },
    }), [attachments, quotedHtml, quotedHeader, signature])

    const sendLabel = submitLabel ?? 'Send'
    const shortcutHint = submitShortcut ?? 'Ctrl+Enter'

    return (
      <div
        className={cx(
          'flex flex-col border border-border gds-radius-card bg-surface overflow-hidden',
          glass === true && glassClass(glass),
          glass === true && 'border-white/10 bg-bg/60',
          className,
        )}
        data-component="email-composer"
        data-variant={mode}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {/* recipient fields */}
        <div className="flex flex-col border-b border-border">
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
              <div className="shrink-0 flex gap-1.5 px-2">
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
        <div className="border-b border-border">
          <input
            type="text"
            value={subject}
            onChange={(e) => onSubjectChange(e.target.value)}
            placeholder="Subject"
            className="w-full bg-transparent px-3 py-2.5 gds-text-body text-fg placeholder:text-fg-muted/30 outline-none"
          />
        </div>

        {/* rich text body */}
        <div className="flex-1 min-h-0">
          <RichTextEditor
            ref={editorRef}
            mode="full"
            placeholder="Write your message..."
            onImageUpload={onImageUpload}
            onSubmit={handleSend}
            className="border-0 rounded-none"
          />
        </div>

        {/* attachments */}
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 border-t border-border px-3 py-2">
            {attachments.map((file, i) => (
              <div
                key={`${file.name}-${i}`}
                className="flex items-center gap-1.5 rounded-md bg-bg-secondary px-2 py-1 gds-text-label"
              >
                <Paperclip className="h-3 w-3 text-fg-muted" />
                <span className="truncate max-w-[140px] text-fg">{file.name}</span>
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
        {quotedHtml !== undefined && quotedHtml !== '' && (
          <div className="border-t border-border">
            <button
              type="button"
              className="flex items-center gap-1.5 w-full px-3 py-1.5 gds-text-label text-fg-muted hover:text-fg transition-colors"
              onClick={() => setQuoteCollapsed(prev => !prev)}
            >
              <svg
                className={cx('h-3 w-3 transition-transform', !quoteCollapsed && 'rotate-90')}
                fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
              {quoteCollapsed ? 'Show original' : 'Hide original'}
            </button>
            {!quoteCollapsed && (
              <div
                className="px-3 pb-3 border-l-2 border-accent/20 ml-3 text-fg-muted gds-text-body"
                dangerouslySetInnerHTML={{ __html: quotedHtml }}
              />
            )}
          </div>
        )}

        {/* footer: actions + send */}
        <div className="flex items-center justify-between border-t border-border px-3 py-2">
          <div className="flex items-center gap-2">
            {/* attachment button */}
            <button
              type="button"
              className="flex items-center justify-center rounded p-1.5 text-fg-muted hover:text-fg hover:bg-white/[0.04] transition-colors"
              onClick={() => fileInputRef.current?.click()}
              title="Attach file"
            >
              <Paperclip className="h-4 w-4" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
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
                className="gds-text-body text-fg-muted hover:text-fg transition-colors px-2 py-1"
                onClick={onDiscard}
              >
                Cancel
              </button>
            )}

            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 gds-text-body font-medium text-accent-fg hover:bg-accent-hover transition-colors"
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
  },
)
