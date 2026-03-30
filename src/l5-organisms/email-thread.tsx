// email-thread — renders email conversation threads with message bubbles,
// HTML/text rendering, attachments, expand/collapse, and AI analysis panel

import {
  ChevronDown,
  ChevronRight,
  Download,
  FileText,
  Forward,
  Image as ImageIcon,
  Paperclip,
  Reply,
  ReplyAll,
  Sparkles,
  Trash2,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { forwardRef, useCallback, useMemo, useState } from 'react'

import { IconButton } from '../l2-primitives/icon-button'
import { Avatar } from '../l3-atoms/avatar'
import { Tooltip } from '../l3-atoms/tooltip'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'
import { sanitizeEmailHtml } from '../utils/sanitize'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type EmailAttachment = {
  index: number
  filename: string
  mimeType: string
  size: number
  contentId?: string
  thumbnailUrl?: string
}

type EmailAiAnalysis = {
  summary?: string
  people?: Array<{ name: string; role?: string; email?: string }>
  dates?: Array<{ text: string; context?: string }>
  amounts?: Array<{ value: string; currency?: string; context?: string }>
  actionItems?: string[]
  deadline?: string
  riskScore?: number
  riskReason?: string
}

type EmailMessage = {
  id: string
  from: string
  fromName?: string
  to: string[]
  cc?: string[]
  date: string
  subject?: string
  textBody: string | null
  htmlBody: string | null
  isOwn: boolean
  attachments?: EmailAttachment[]
  aiAnalysis?: EmailAiAnalysis | null
}

type EmailThreadProps = React.HTMLAttributes<HTMLDivElement> & {
  messages: EmailMessage[]

  defaultExpandedIds?: Set<string>
  expandAll?: boolean

  onReply?: (message: EmailMessage) => void
  onReplyAll?: (message: EmailMessage) => void
  onForward?: (message: EmailMessage) => void
  onDelete?: (message: EmailMessage) => void
  onPrint?: (message: EmailMessage) => void
  onDownloadRaw?: (message: EmailMessage) => void

  onAttachmentClick?: (message: EmailMessage, attachment: EmailAttachment) => void
  onAttachmentDownload?: (message: EmailMessage, attachment: EmailAttachment) => void
  onAttachmentExtractText?: (message: EmailMessage, attachment: EmailAttachment) => void

  showAiAnalysis?: boolean

  renderMessageActions?: (message: EmailMessage) => ReactNode
  renderAttachment?: (attachment: EmailAttachment, message: EmailMessage) => ReactNode

  glass?: boolean
  className?: string
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMin = Math.floor(diffMs / 60_000)
  if (diffMin < 1) return 'just now'
  if (diffMin < 60) return `${diffMin}m ago`
  const diffHr = Math.floor(diffMin / 60)
  if (diffHr < 24) return `${diffHr}h ago`
  const diffDay = Math.floor(diffHr / 24)
  if (diffDay < 7) return `${diffDay}d ago`
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

function isImageMime(mime: string): boolean {
  return mime.startsWith('image/')
}

function isPdfMime(mime: string): boolean {
  return mime === 'application/pdf'
}

// ---------------------------------------------------------------------------
// EmailAttachmentPreview (internal)
// ---------------------------------------------------------------------------

function EmailAttachmentPreview({
  attachment,
  message,
  onAttachmentClick,
  onAttachmentDownload,
  onAttachmentExtractText,
  renderAttachment,
}: {
  attachment: EmailAttachment
  message: EmailMessage
  onAttachmentClick?: (message: EmailMessage, attachment: EmailAttachment) => void
  onAttachmentDownload?: (message: EmailMessage, attachment: EmailAttachment) => void
  onAttachmentExtractText?: (message: EmailMessage, attachment: EmailAttachment) => void
  renderAttachment?: (attachment: EmailAttachment, message: EmailMessage) => ReactNode
}) {
  if (renderAttachment !== undefined) {
    return <>{renderAttachment(attachment, message)}</>
  }

  const isImage = isImageMime(attachment.mimeType)
  const isPdf = isPdfMime(attachment.mimeType)

  return (
    <div
      className={cx(
        'flex items-center gap-2 rounded-md border border-border bg-bg-secondary p-2',
        onAttachmentClick !== undefined && 'cursor-pointer hover:bg-bg-tertiary',
      )}
      role={onAttachmentClick !== undefined ? 'button' : undefined}
      tabIndex={onAttachmentClick !== undefined ? 0 : undefined}
      onClick={onAttachmentClick !== undefined ? () => onAttachmentClick(message, attachment) : undefined}
      onKeyDown={onAttachmentClick !== undefined ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onAttachmentClick(message, attachment)
        }
      } : undefined}
      data-component="email-attachment-preview"
    >
      {isImage && attachment.thumbnailUrl !== undefined ? (
        <img
          src={attachment.thumbnailUrl}
          alt={attachment.filename}
          className="h-10 w-10 rounded object-cover"
        />
      ) : (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-bg-tertiary text-fg-muted">
          {isImage && <ImageIcon size={18} />}
            {!isImage && isPdf && <FileText size={18} />}
            {!isImage && !isPdf && <Paperclip size={18} />}
        </span>
      )}

      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-fg">{attachment.filename}</div>
        <div className="text-xs text-fg-muted">{formatFileSize(attachment.size)}</div>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        {isPdf && onAttachmentExtractText !== undefined && (
          <Tooltip content="Extract text">
            <IconButton
              size="sm"
              icon={<FileText size={14} />}
              tooltip="Extract text"
              onClick={(e) => {
                e.stopPropagation()
                onAttachmentExtractText(message, attachment)
              }}
            />
          </Tooltip>
        )}
        {onAttachmentDownload !== undefined && (
          <Tooltip content="Download">
            <IconButton
              size="sm"
              icon={<Download size={14} />}
              tooltip="Download attachment"
              onClick={(e) => {
                e.stopPropagation()
                onAttachmentDownload(message, attachment)
              }}
            />
          </Tooltip>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// EmailAiPanel (internal)
// ---------------------------------------------------------------------------

function EmailAiPanel({ analysis }: { analysis: EmailAiAnalysis }) {
  const [expanded, setExpanded] = useState(false)

  const hasSummary = analysis.summary !== undefined && analysis.summary.length > 0
  const hasDetails =
    (analysis.people !== undefined && analysis.people.length > 0) ||
    (analysis.dates !== undefined && analysis.dates.length > 0) ||
    (analysis.amounts !== undefined && analysis.amounts.length > 0) ||
    (analysis.actionItems !== undefined && analysis.actionItems.length > 0) ||
    analysis.deadline !== undefined ||
    analysis.riskScore !== undefined

  if (!hasSummary && !hasDetails) return null

  return (
    <div
      className="mt-2 rounded-md border border-accent/20 bg-accent/5 p-3"
      data-component="email-ai-panel"
    >
      <button
        type="button"
        className="flex w-full items-center gap-2 text-left text-xs font-medium text-accent"
        onClick={() => setExpanded((p) => !p)}
        aria-expanded={expanded}
        aria-label="AI Analysis"
      >
        <Sparkles size={14} />
        <span className="flex-1">AI Analysis</span>
        {hasDetails && (expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />)}
      </button>

      {hasSummary && (
        <p className="mt-1 text-xs text-fg-muted">{analysis.summary}</p>
      )}

      {expanded && hasDetails && (
        <div className="mt-2 flex flex-col gap-2 text-xs">
          {analysis.people !== undefined && analysis.people.length > 0 && (
            <div>
              <span className="font-medium text-fg">People:</span>
              <ul className="mt-0.5 list-inside list-disc text-fg-muted">
                {analysis.people.map((p, i) => (
                  <li key={i}>
                    {p.name}
                    {p.role !== undefined && <span className="text-fg-muted/60"> — {p.role}</span>}
                    {p.email !== undefined && <span className="text-fg-muted/60"> ({p.email})</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {analysis.dates !== undefined && analysis.dates.length > 0 && (
            <div>
              <span className="font-medium text-fg">Dates:</span>
              <ul className="mt-0.5 list-inside list-disc text-fg-muted">
                {analysis.dates.map((d, i) => (
                  <li key={i}>
                    {d.text}
                    {d.context !== undefined && <span className="text-fg-muted/60"> — {d.context}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {analysis.amounts !== undefined && analysis.amounts.length > 0 && (
            <div>
              <span className="font-medium text-fg">Amounts:</span>
              <ul className="mt-0.5 list-inside list-disc text-fg-muted">
                {analysis.amounts.map((a, i) => (
                  <li key={i}>
                    {a.value}
                    {a.currency !== undefined && <span> {a.currency}</span>}
                    {a.context !== undefined && <span className="text-fg-muted/60"> — {a.context}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {analysis.actionItems !== undefined && analysis.actionItems.length > 0 && (
            <div>
              <span className="font-medium text-fg">Action Items:</span>
              <ul className="mt-0.5 list-inside list-disc text-fg-muted">
                {analysis.actionItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {analysis.deadline !== undefined && (
            <div>
              <span className="font-medium text-danger">Deadline:</span>{' '}
              <span className="text-danger">{analysis.deadline}</span>
            </div>
          )}

          {analysis.riskScore !== undefined && (
            <div>
              <span className="font-medium text-warning">Risk: {analysis.riskScore}/10</span>
              {analysis.riskReason !== undefined && (
                <span className="text-fg-muted"> — {analysis.riskReason}</span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// EmailMessageBubble (internal)
// ---------------------------------------------------------------------------

function EmailMessageBubble({
  message,
  isExpanded,
  onToggleExpand,
  onReply,
  onReplyAll,
  onForward,
  onDelete,
  onAttachmentClick,
  onAttachmentDownload,
  onAttachmentExtractText,
  showAiAnalysis,
  renderMessageActions,
  renderAttachment,
}: {
  message: EmailMessage
  isExpanded: boolean
  onToggleExpand: () => void
  onReply?: (message: EmailMessage) => void
  onReplyAll?: (message: EmailMessage) => void
  onForward?: (message: EmailMessage) => void
  onDelete?: (message: EmailMessage) => void
  onAttachmentClick?: (message: EmailMessage, attachment: EmailAttachment) => void
  onAttachmentDownload?: (message: EmailMessage, attachment: EmailAttachment) => void
  onAttachmentExtractText?: (message: EmailMessage, attachment: EmailAttachment) => void
  showAiAnalysis?: boolean
  renderMessageActions?: (message: EmailMessage) => ReactNode
  renderAttachment?: (attachment: EmailAttachment, message: EmailMessage) => ReactNode
}) {
  const displayName = message.fromName ?? message.from
  const hasAttachments = message.attachments !== undefined && message.attachments.length > 0
  const hasAiAnalysis = showAiAnalysis === true && message.aiAnalysis !== undefined && message.aiAnalysis !== null

  // Build sanitized HTML content
  const sanitizedHtml = useMemo(() => {
    if (message.htmlBody === null) return null
    return sanitizeEmailHtml(message.htmlBody)
  }, [message.htmlBody])

  // Render body content
  const bodyContent = useMemo(() => {
    if (sanitizedHtml !== null) {
      return (
        <div
          className="prose prose-sm max-w-none dark:prose-invert break-words [&_img]:max-w-full [&_img]:h-auto [&_table]:text-xs"
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
      )
    }
    if (message.textBody !== null) {
      return (
        <pre className="whitespace-pre-wrap break-words text-sm text-fg font-sans leading-relaxed">
          {message.textBody}
        </pre>
      )
    }
    return <p className="text-sm italic text-fg-muted">No content</p>
  }, [sanitizedHtml, message.textBody])

  // Collapsed preview: first line of text
  const collapsedPreview = useMemo(() => {
    if (message.textBody !== null) {
      const lines = message.textBody.split('\n').filter((l) => l.trim().length > 0)
      const preview = lines.slice(0, 3).join(' ')
      if (preview.length > 200) return `${preview.slice(0, 200)}…`
      return preview
    }
    if (message.htmlBody !== null) {
      // Strip tags for preview
      const text = message.htmlBody.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
      if (text.length > 200) return `${text.slice(0, 200)}…`
      return text
    }
    return ''
  }, [message.textBody, message.htmlBody])

  const avatarEl = (
    <Avatar
      name={displayName}
      size="default"
    />
  )

  const headerEl = (
    <div className="flex min-w-0 flex-1 items-center gap-2">
      <button
        type="button"
        className="flex min-w-0 flex-1 items-center gap-2 text-left"
        onClick={onToggleExpand}
        aria-expanded={isExpanded}
        aria-label={isExpanded ? `Collapse message from ${displayName}` : `Expand message from ${displayName}`}
      >
        {isExpanded ? <ChevronDown size={14} className="shrink-0 text-fg-muted" /> : <ChevronRight size={14} className="shrink-0 text-fg-muted" />}
        <span className="truncate text-sm font-medium text-fg">{displayName}</span>
        <span className="truncate text-xs text-fg-muted">&lt;{message.from}&gt;</span>
      </button>
      <span className="shrink-0 text-xs text-fg-muted">{formatDate(message.date)}</span>
    </div>
  )

  const actionBar = renderMessageActions !== undefined ? (
    renderMessageActions(message)
  ) : (
    <div className="flex items-center gap-0.5">
      {onReply !== undefined && (
        <Tooltip content="Reply">
          <IconButton size="sm" icon={<Reply size={14} />} tooltip="Reply" onClick={() => onReply(message)} />
        </Tooltip>
      )}
      {onReplyAll !== undefined && (
        <Tooltip content="Reply All">
          <IconButton size="sm" icon={<ReplyAll size={14} />} tooltip="Reply all" onClick={() => onReplyAll(message)} />
        </Tooltip>
      )}
      {onForward !== undefined && (
        <Tooltip content="Forward">
          <IconButton size="sm" icon={<Forward size={14} />} tooltip="Forward" onClick={() => onForward(message)} />
        </Tooltip>
      )}
      {onDelete !== undefined && (
        <Tooltip content="Delete">
          <IconButton size="sm" variant="danger" icon={<Trash2 size={14} />} tooltip="Delete" onClick={() => onDelete(message)} />
        </Tooltip>
      )}
    </div>
  )

  const hasAnyAction = onReply !== undefined || onReplyAll !== undefined || onForward !== undefined || onDelete !== undefined || renderMessageActions !== undefined

  return (
    <div
      className={cx(
        'flex gap-3',
        message.isOwn && 'flex-row-reverse',
      )}
      data-component="email-message-bubble"
      data-state={isExpanded ? 'expanded' : 'collapsed'}
      data-own={message.isOwn ? 'true' : 'false'}
    >
      {/* Avatar */}
      <div className="shrink-0 pt-1">{avatarEl}</div>

      {/* Content */}
      <div
        className={cx(
          'min-w-0 flex-1 rounded-lg border gds-pad',
          message.isOwn
            ? 'border-accent/20 bg-accent/5'
            : 'border-border bg-bg-secondary',
        )}
      >
        {/* Header */}
        <div className="flex items-start gap-2">
          {headerEl}
          {isExpanded && hasAnyAction && (
            <div className="shrink-0">{actionBar}</div>
          )}
        </div>

        {/* Recipients (expanded only) */}
        {isExpanded && (
          <div className="mt-1 text-xs text-fg-muted">
            <span>To: {message.to.join(', ')}</span>
            {message.cc !== undefined && message.cc.length > 0 && (
              <span className="ml-2">Cc: {message.cc.join(', ')}</span>
            )}
          </div>
        )}

        {/* Body */}
        <div className="mt-2">
          {isExpanded ? bodyContent : (
            <button
              type="button"
              className="w-full text-left text-sm text-fg-muted"
              onClick={onToggleExpand}
              aria-expanded={false}
              aria-label={`Expand message from ${displayName}`}
            >
              <span className="line-clamp-2">{collapsedPreview}</span>
              <span className="text-xs text-accent"> Show more</span>
            </button>
          )}
        </div>

        {/* Attachments (expanded only) */}
        {isExpanded && hasAttachments && (
          <div className="mt-3">
            <div className="mb-1.5 flex items-center gap-1 text-xs font-medium text-fg-muted">
              <Paperclip size={12} />
              <span>{message.attachments?.length ?? 0} attachment{(message.attachments?.length ?? 0) > 1 ? 's' : ''}</span>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {(message.attachments ?? []).map((att) => (
                <EmailAttachmentPreview
                  key={att.index}
                  attachment={att}
                  message={message}
                  onAttachmentClick={onAttachmentClick}
                  onAttachmentDownload={onAttachmentDownload}
                  onAttachmentExtractText={onAttachmentExtractText}
                  renderAttachment={renderAttachment}
                />
              ))}
            </div>
          </div>
        )}

        {/* AI Analysis (expanded only) */}
        {isExpanded && hasAiAnalysis && message.aiAnalysis !== undefined && message.aiAnalysis !== null && (
          <EmailAiPanel analysis={message.aiAnalysis} />
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// EmailThread (exported)
// ---------------------------------------------------------------------------

const EmailThread = forwardRef<HTMLDivElement, EmailThreadProps>(
  function EmailThread(
    {
      messages,
      defaultExpandedIds,
      expandAll,
      onReply,
      onReplyAll,
      onForward,
      onDelete,
      onPrint: _onPrint,
      onDownloadRaw: _onDownloadRaw,
      onAttachmentClick,
      onAttachmentDownload,
      onAttachmentExtractText,
      showAiAnalysis,
      renderMessageActions,
      renderAttachment,
      glass,
      className,
      ...props
    },
    ref,
  ) {
    // Build initial expanded set: default last message expanded
    const initialExpanded = useMemo(() => {
      if (expandAll === true) return new Set(messages.map((m) => m.id))
      if (defaultExpandedIds !== undefined) return new Set(defaultExpandedIds)
      // Default: expand last message
      if (messages.length > 0) return new Set([messages[messages.length - 1].id])
      return new Set<string>()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally stable, only computed once on mount
    }, [])

    const [expandedIds, setExpandedIds] = useState<Set<string>>(initialExpanded)

    // When expandAll changes, override local state
    const effectiveExpanded = expandAll === true
      ? new Set(messages.map((m) => m.id))
      : expandedIds

    const toggleExpand = useCallback((id: string) => {
      setExpandedIds((prev) => {
        const next = new Set(prev)
        if (next.has(id)) {
          next.delete(id)
        } else {
          next.add(id)
        }
        return next
      })
    }, [])

    if (messages.length === 0) {
      return (
        <div
          ref={ref}
          className={cx(
            'flex flex-col items-center justify-center py-12 text-fg-muted gds-text-body',
            glass === true && glassClass(glass),
            className,
          )}
          data-component="email-thread"
          data-state="empty"
          {...props}
        >
          <p>No messages</p>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cx(
          'flex flex-col gds-gap',
          glass === true && glassClass(glass),
          className,
        )}
        data-component="email-thread"
        role="list"
        aria-label="Email thread"
        {...props}
      >
        {messages.map((message) => (
          <div key={message.id} role="listitem">
            <EmailMessageBubble
              message={message}
              isExpanded={effectiveExpanded.has(message.id)}
              onToggleExpand={() => toggleExpand(message.id)}
              onReply={onReply}
              onReplyAll={onReplyAll}
              onForward={onForward}
              onDelete={onDelete}
              onAttachmentClick={onAttachmentClick}
              onAttachmentDownload={onAttachmentDownload}
              onAttachmentExtractText={onAttachmentExtractText}
              showAiAnalysis={showAiAnalysis}
              renderMessageActions={renderMessageActions}
              renderAttachment={renderAttachment}
            />
          </div>
        ))}
      </div>
    )
  },
)

export { EmailThread }
export type { EmailAiAnalysis, EmailAttachment, EmailMessage, EmailThreadProps }
