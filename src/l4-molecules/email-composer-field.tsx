// email-composer-field — recipient input with contact chips and autocomplete
// used by EmailComposer for To/Cc/Bcc fields
// based on TagInput + Combobox patterns

import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

// ---- types ----

export type EmailContact = {
  email: string
  name?: string
  avatar?: string
}

export type EmailComposerFieldProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  /** current recipient list */
  value: EmailContact[]
  /** update recipient list */
  onChange: (contacts: EmailContact[]) => void

  /** async search for contacts */
  onSearch: (query: string) => Promise<EmailContact[]>
  /** static suggestion list */
  suggestions?: EmailContact[]

  /** field label: "To", "Cc", "Bcc" */
  label: string
  placeholder?: string

  /** frosted glass effect */
  glass?: boolean
  className?: string
}

// simple email validation (RFC 5322 basic)
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// generate initials color from email (same algorithm as Avatar)
function emailColor(email: string): string {
  let hash = 0
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash)
  }
  const colors = [
    'bg-palette-0/20 text-palette-0',
    'bg-palette-1/20 text-palette-1',
    'bg-palette-2/20 text-palette-2',
    'bg-palette-3/20 text-palette-3',
    'bg-palette-4/20 text-palette-4',
    'bg-palette-5/20 text-palette-5',
    'bg-palette-6/20 text-palette-6',
    'bg-palette-7/20 text-palette-7',
  ]
  return colors[Math.abs(hash) % colors.length]
}

// ---- chip ----

function ContactChip({
  contact,
  onRemove,
}: {
  contact: EmailContact
  onRemove: () => void
}) {
  const displayName = contact.name ?? contact.email
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 gds-text-label select-none',
        emailColor(contact.email),
      )}
      data-component="contact-chip"
    >
      <span className="truncate max-w-[160px]">{displayName}</span>
      <button
        type="button"
        className="shrink-0 rounded-full p-0.5 hover:bg-white/10 transition-colors"
        onClick={onRemove}
        aria-label={`Remove ${displayName}`}
        tabIndex={-1}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M2 2l6 6M8 2l-6 6" />
        </svg>
      </button>
    </span>
  )
}

// ---- dropdown ----

function SuggestionDropdown({
  results,
  activeIndex,
  onSelect,
}: {
  results: EmailContact[]
  activeIndex: number
  onSelect: (contact: EmailContact) => void
}) {
  if (results.length === 0) return null

  return (
    <div className="absolute left-0 right-0 top-full mt-1 z-50 rounded-lg border border-border bg-bg-secondary shadow-lg overflow-hidden max-h-48 overflow-y-auto" role="listbox" id="email-composer-suggestions">
      {results.map((contact, i) => (
        <button
          key={contact.email}
          type="button"
          className={cx(
            'flex w-full items-center gap-2 px-3 py-2 text-left gds-text-body transition-colors',
            i === activeIndex ? 'bg-accent/10 text-accent' : 'text-fg hover:bg-white/[0.04]',
          )}
          onClick={() => onSelect(contact)}
          data-active={i === activeIndex}
          role="option"
          aria-selected={i === activeIndex}
        >
          <span className={cx('flex h-6 w-6 shrink-0 items-center justify-center rounded-full gds-text-caption font-medium', emailColor(contact.email))}>
            {(contact.name ?? contact.email).charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0 flex-1">
            {contact.name !== undefined && (
              <div className="truncate text-fg">{contact.name}</div>
            )}
            <div className="truncate text-fg-muted gds-text-label">{contact.email}</div>
          </div>
        </button>
      ))}
    </div>
  )
}

// ---- main component ----

export const EmailComposerField = forwardRef<HTMLDivElement, EmailComposerFieldProps>(
  function EmailComposerField({
    value,
    onChange,
    onSearch,
    suggestions,
    label,
    placeholder,
    glass,
    className,
    ...props
  }, ref) {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<EmailContact[]>([])
    const [activeIndex, setActiveIndex] = useState(0)
    const [showDropdown, setShowDropdown] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined)
    const searchSeqRef = useRef(0)
    const blurTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

    // cleanup blur timer on unmount
    useEffect(() => {
      return () => {
        if (blurTimerRef.current !== undefined) {
          clearTimeout(blurTimerRef.current)
        }
      }
    }, [])

    // async search with debounce
    useEffect(() => {
      if (query.length < 1) {
        setResults(suggestions ?? [])
        return
      }

      if (debounceRef.current !== undefined) {
        clearTimeout(debounceRef.current)
      }

      const seq = ++searchSeqRef.current

      debounceRef.current = setTimeout(async () => {
        const searchResults = await onSearch(query)
        // discard stale responses from out-of-order async completions
        if (seq !== searchSeqRef.current) return
        // filter out already-selected contacts
        const filtered = searchResults.filter(
          r => !value.some(v => v.email === r.email),
        )
        setResults(filtered)
        setActiveIndex(0)
      }, 200)

      return () => {
        if (debounceRef.current !== undefined) {
          clearTimeout(debounceRef.current)
        }
      }
    }, [query, onSearch, suggestions, value])

    const addContact = useCallback((contact: EmailContact) => {
      if (value.some(v => v.email === contact.email)) return
      onChange([...value, contact])
      setQuery('')
      setResults([])
      setShowDropdown(false)
      inputRef.current?.focus()
    }, [value, onChange])

    const addEmailFromText = useCallback((text: string) => {
      const trimmed = text.trim()
      if (trimmed === '') return
      // handle paste with commas
      const emails = trimmed.split(/[,;\n]+/).map(e => e.trim()).filter(e => e !== '')
      const newContacts: EmailContact[] = []
      for (const email of emails) {
        if (isValidEmail(email) && !value.some(v => v.email === email)) {
          newContacts.push({ email })
        }
      }
      if (newContacts.length > 0) {
        onChange([...value, ...newContacts])
        setQuery('')
      }
    }, [value, onChange])

    const removeContact = useCallback((index: number) => {
      const next = [...value]
      next.splice(index, 1)
      onChange(next)
    }, [value, onChange])

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown' && showDropdown) {
        e.preventDefault()
        setActiveIndex(prev => (prev + 1) % Math.max(results.length, 1))
      } else if (e.key === 'ArrowUp' && showDropdown) {
        e.preventDefault()
        setActiveIndex(prev => (prev - 1 + results.length) % Math.max(results.length, 1))
      } else if (e.key === 'Enter' && showDropdown && results[activeIndex] !== undefined) {
        e.preventDefault()
        addContact(results[activeIndex])
      } else if (e.key === 'Enter' || e.key === 'Tab' || e.key === ',') {
        if (query.trim() !== '') {
          e.preventDefault()
          addEmailFromText(query)
        }
      } else if (e.key === 'Backspace' && query === '' && value.length > 0) {
        removeContact(value.length - 1)
      }
    }, [showDropdown, results, activeIndex, query, value, addContact, addEmailFromText, removeContact])

    const handlePaste = useCallback((e: React.ClipboardEvent) => {
      const text = e.clipboardData.getData('text')
      if (text.includes(',') || text.includes(';') || text.includes('\n')) {
        e.preventDefault()
        addEmailFromText(text)
      }
    }, [addEmailFromText])

    return (
      <div
        {...props}
        ref={ref}
        className={cx('relative', className)}
        data-component="email-composer-field"
      >
        <div
          className={cx(
            'flex flex-wrap items-center gap-1 min-h-[36px] px-2 py-1 border border-border gds-radius-input bg-bg transition-colors',
            'focus-within:ring-2 focus-within:ring-accent/30',
            glass === true && glassClass(glass),
            glass === true && 'border-white/10 bg-bg/60',
          )}
          onClick={() => inputRef.current?.focus()}
        >
          <span className="shrink-0 gds-text-label text-fg-muted select-none w-6">{label}</span>

          {value.map((contact, i) => (
            <ContactChip
              key={contact.email}
              contact={contact}
              onRemove={() => removeContact(i)}
            />
          ))}

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setShowDropdown(true)
            }}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onFocus={() => setShowDropdown(true)}
            role="combobox"
            aria-expanded={showDropdown && results.length > 0}
            aria-autocomplete="list"
            aria-controls="email-composer-suggestions"
            aria-label={`${label} recipients`}
            onBlur={() => {
              // delay to allow dropdown click to fire
              if (blurTimerRef.current !== undefined) {
                clearTimeout(blurTimerRef.current)
              }
              blurTimerRef.current = setTimeout(() => {
                blurTimerRef.current = undefined
                setShowDropdown(false)
                if (query.trim() !== '') addEmailFromText(query)
              }, 200)
            }}
            placeholder={value.length === 0 ? (placeholder ?? `${label.toLowerCase()}@example.com`) : ''}
            className="flex-1 min-w-[120px] bg-transparent gds-text-body text-fg placeholder:text-fg-muted/30 outline-none"
          />
        </div>

        {showDropdown && results.length > 0 && (
          <SuggestionDropdown
            results={results}
            activeIndex={activeIndex}
            onSelect={addContact}
          />
        )}
      </div>
    )
  },
)
