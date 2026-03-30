// rich-text-editor — Tiptap-based WYSIWYG editor
// wraps Tiptap via anti-corruption layer (utils/tiptap)
// supports full mode (all extensions) and minimal mode (basic formatting)
// mailrs uses this for email composition and signature editing

import type { ReactNode } from 'react'
import { forwardRef, useEffect, useImperativeHandle, useMemo } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'
import type { Editor } from '../utils/tiptap'
import {
  EditorContent,
  ExtCodeBlockLowlight,
  ExtImage,
  ExtLink,
  ExtPlaceholder,
  ExtTable,
  ExtTableCell,
  ExtTableHeader,
  ExtTableRow,
  ExtTaskItem,
  ExtTaskList,
  ExtUnderline,
  StarterKit,
  useEditor,
} from '../utils/tiptap'

// ---- types ----

export type ToolbarItem =
  | 'bold' | 'italic' | 'underline' | 'strikethrough'
  | 'code' | 'codeBlock'
  | 'heading'
  | 'blockquote'
  | 'bulletList' | 'orderedList' | 'taskList'
  | 'link' | 'image'
  | 'table'
  | 'divider'
  | '|'

export type RichTextEditorHandle = {
  focus: () => void
  getHTML: () => string
  getText: () => string
  getEditor: () => Editor | null
  setContent: (html: string) => void
  clearContent: () => void
  isEmpty: () => boolean
}

export type RichTextEditorProps = {
  /** HTML string, controlled */
  value?: string
  /** HTML string, uncontrolled */
  defaultValue?: string
  /** Fires on content change */
  onChange?: (html: string, text: string) => void
  placeholder?: string

  /** full = all extensions, minimal = basic formatting only */
  mode?: 'full' | 'minimal'

  /** show/hide toolbar, default true */
  toolbar?: boolean
  /** override default toolbar items */
  toolbarItems?: ToolbarItem[]

  /** image upload handler — returns URL or null on failure */
  onImageUpload?: (file: File) => Promise<string | null>

  /** Ctrl/Cmd+Enter handler */
  onSubmit?: () => void

  /** frosted glass effect */
  glass?: boolean
  className?: string
}

// ---- toolbar button config ----

type ToolbarButton = {
  key: ToolbarItem
  label: string
  shortcut?: string
  icon: ReactNode
  action: (editor: Editor) => void
  isActive: (editor: Editor) => boolean
}

function makeToolbarButtons(): ToolbarButton[] {
  return [
    {
      key: 'bold', label: 'Bold', shortcut: 'Ctrl+B',
      icon: <span className="font-bold">B</span>,
      action: (e) => e.chain().focus().toggleBold().run(),
      isActive: (e) => e.isActive('bold'),
    },
    {
      key: 'italic', label: 'Italic', shortcut: 'Ctrl+I',
      icon: <span className="italic">I</span>,
      action: (e) => e.chain().focus().toggleItalic().run(),
      isActive: (e) => e.isActive('italic'),
    },
    {
      key: 'underline', label: 'Underline', shortcut: 'Ctrl+U',
      icon: <span className="underline">U</span>,
      action: (e) => e.chain().focus().toggleUnderline().run(),
      isActive: (e) => e.isActive('underline'),
    },
    {
      key: 'strikethrough', label: 'Strikethrough',
      icon: <span className="line-through">S</span>,
      action: (e) => e.chain().focus().toggleStrike().run(),
      isActive: (e) => e.isActive('strike'),
    },
    {
      key: 'code', label: 'Inline Code',
      icon: <span className="font-mono text-[11px]">&lt;/&gt;</span>,
      action: (e) => e.chain().focus().toggleCode().run(),
      isActive: (e) => e.isActive('code'),
    },
    {
      key: 'codeBlock', label: 'Code Block',
      icon: <span className="font-mono text-[10px]">{'{ }'}</span>,
      action: (e) => e.chain().focus().toggleCodeBlock().run(),
      isActive: (e) => e.isActive('codeBlock'),
    },
    {
      key: 'heading', label: 'Heading',
      icon: <span className="font-bold text-[11px]">H</span>,
      action: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: (e) => e.isActive('heading'),
    },
    {
      key: 'blockquote', label: 'Blockquote',
      icon: <span className="text-[13px]">"</span>,
      action: (e) => e.chain().focus().toggleBlockquote().run(),
      isActive: (e) => e.isActive('blockquote'),
    },
    {
      key: 'bulletList', label: 'Bullet List',
      icon: <span className="text-[11px]">•</span>,
      action: (e) => e.chain().focus().toggleBulletList().run(),
      isActive: (e) => e.isActive('bulletList'),
    },
    {
      key: 'orderedList', label: 'Ordered List',
      icon: <span className="text-[11px]">1.</span>,
      action: (e) => e.chain().focus().toggleOrderedList().run(),
      isActive: (e) => e.isActive('orderedList'),
    },
    {
      key: 'taskList', label: 'Task List',
      icon: <span className="text-[11px]">☑</span>,
      action: (e) => e.chain().focus().toggleTaskList().run(),
      isActive: (e) => e.isActive('taskList'),
    },
    {
      key: 'link', label: 'Link',
      icon: <span className="text-[11px]">🔗</span>,
      action: (e) => {
        const url = window.prompt('Enter URL')
        if (url !== null && url !== '') {
          e.chain().focus().setLink({ href: url }).run()
        }
      },
      isActive: (e) => e.isActive('link'),
    },
    {
      key: 'image', label: 'Image',
      icon: <span className="text-[11px]">🖼</span>,
      action: (e) => {
        const url = window.prompt('Enter image URL')
        if (url !== null && url !== '') {
          e.chain().focus().setImage({ src: url }).run()
        }
      },
      isActive: () => false,
    },
    {
      key: 'table', label: 'Table',
      icon: <span className="text-[10px]">⊞</span>,
      action: (e) => e.chain().focus().insertTable({ rows: 3, cols: 3 }).run(),
      isActive: () => false,
    },
    {
      key: 'divider', label: 'Divider',
      icon: <span className="text-[11px]">—</span>,
      action: (e) => e.chain().focus().setHorizontalRule().run(),
      isActive: () => false,
    },
  ]
}

const DEFAULT_FULL_ITEMS: ToolbarItem[] = [
  'bold', 'italic', 'underline', 'strikethrough',
  '|', 'code', 'codeBlock',
  '|', 'heading', 'blockquote',
  '|', 'bulletList', 'orderedList', 'taskList',
  '|', 'link', 'image', 'table', 'divider',
]

const DEFAULT_MINIMAL_ITEMS: ToolbarItem[] = [
  'bold', 'italic', 'underline',
  '|', 'link',
]

// ---- component ----

export const RichTextEditor = forwardRef<RichTextEditorHandle, RichTextEditorProps>(
  function RichTextEditor({
    value,
    defaultValue,
    onChange,
    placeholder,
    mode = 'full',
    toolbar: showToolbar = true,
    toolbarItems,
    onImageUpload,
    onSubmit,
    glass,
    className,
  }, ref) {
    const isControlled = value !== undefined
    const initialContent = value ?? defaultValue ?? ''

    // build extensions based on mode
    const extensions = useMemo(() => {
      if (mode === 'minimal') {
        return [
          StarterKit.configure({
            code: false,
            codeBlock: false,
            heading: false,
            blockquote: false,
          }),
          ExtLink.configure({ autolink: true, openOnClick: false }),
          ExtUnderline,
          ExtPlaceholder.configure({ placeholder: placeholder ?? '' }),
        ]
      }
      // full mode
      return [
        StarterKit.configure({ codeBlock: false }),
        ExtCodeBlockLowlight.configure({}),
        ExtImage.configure({ inline: true }),
        ExtLink.configure({
          autolink: true,
          openOnClick: false,
          HTMLAttributes: { target: '_blank', rel: 'noopener noreferrer' },
        }),
        ExtTable.configure({ resizable: true }),
        ExtTableRow,
        ExtTableCell,
        ExtTableHeader,
        ExtTaskList,
        ExtTaskItem.configure({ nested: true }),
        ExtUnderline,
        ExtPlaceholder.configure({ placeholder: placeholder ?? '' }),
      ]
    }, [mode, placeholder])

    const editor = useEditor({
      extensions,
      content: initialContent,
      onUpdate: ({ editor: e }) => {
        if (onChange !== undefined) {
          onChange(e.getHTML(), e.getText())
        }
      },
    })

    // sync controlled value
    useEffect(() => {
      if (isControlled && editor !== null && value !== editor.getHTML()) {
        editor.commands.setContent(value, { emitUpdate: false })
      }
    }, [isControlled, value, editor])

    // Ctrl/Cmd+Enter submit
    useEffect(() => {
      if (editor === null || onSubmit === undefined) return
      const handleKeyDown = (event: KeyboardEvent) => {
        if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
          event.preventDefault()
          onSubmit()
        }
      }
      const el = editor.view.dom
      el.addEventListener('keydown', handleKeyDown)
      return () => el.removeEventListener('keydown', handleKeyDown)
    }, [editor, onSubmit])

    // image drop/paste handling
    useEffect(() => {
      if (editor === null || onImageUpload === undefined) return
      const handleDrop = async (event: DragEvent) => {
        const files = event.dataTransfer?.files
        if (files === undefined || files.length === 0) return
        for (const file of Array.from(files)) {
          if (file.type.startsWith('image/')) {
            event.preventDefault()
            const url = await onImageUpload(file)
            if (url !== null) {
              editor.chain().focus().setImage({ src: url }).run()
            }
          }
        }
      }
      const handlePaste = async (event: ClipboardEvent) => {
        const files = event.clipboardData?.files
        if (files === undefined || files.length === 0) return
        for (const file of Array.from(files)) {
          if (file.type.startsWith('image/')) {
            event.preventDefault()
            const url = await onImageUpload(file)
            if (url !== null) {
              editor.chain().focus().setImage({ src: url }).run()
            }
          }
        }
      }
      const el = editor.view.dom
      el.addEventListener('drop', handleDrop as unknown as EventListener)
      el.addEventListener('paste', handlePaste as unknown as EventListener)
      return () => {
        el.removeEventListener('drop', handleDrop as unknown as EventListener)
        el.removeEventListener('paste', handlePaste as unknown as EventListener)
      }
    }, [editor, onImageUpload])

    // imperative handle
    useImperativeHandle(ref, () => ({
      focus: () => editor?.commands.focus(),
      getHTML: () => editor?.getHTML() ?? '',
      getText: () => editor?.getText() ?? '',
      getEditor: () => editor,
      setContent: (html: string) => editor?.commands.setContent(html),
      clearContent: () => editor?.commands.clearContent(),
      isEmpty: () => editor?.isEmpty ?? true,
    }), [editor])

    // toolbar items
    const allButtons = useMemo(() => makeToolbarButtons(), [])
    const items = toolbarItems ?? (mode === 'full' ? DEFAULT_FULL_ITEMS : DEFAULT_MINIMAL_ITEMS)

    return (
      <div
        className={cx(
          'flex flex-col border border-border gds-radius-input bg-surface overflow-hidden',
          glass === true && glassClass(glass),
          glass === true && 'border-white/10 bg-bg/60',
          className,
        )}
        data-component="rich-text-editor"
        data-variant={mode}
      >
        {/* toolbar */}
        {showToolbar && editor !== null && (
          <div className="flex items-center flex-wrap gap-0.5 border-b border-border bg-bg-secondary px-2 py-1.5">
            {items.map((item, i) => {
              if (item === '|') {
                return <div key={`sep-${i}`} className="mx-1 h-4 w-px bg-border" />
              }
              const btn = allButtons.find(b => b.key === item)
              if (btn === undefined) return null
              const active = btn.isActive(editor)
              return (
                <button
                  key={btn.key}
                  type="button"
                  className={cx(
                    'flex items-center justify-center rounded px-1.5 py-1 text-xs transition-colors select-none',
                    active
                      ? 'bg-accent/15 text-accent'
                      : 'text-fg-muted hover:bg-white/[0.04] hover:text-fg',
                  )}
                  onClick={() => btn.action(editor)}
                  title={btn.shortcut !== undefined ? `${btn.label} (${btn.shortcut})` : btn.label}
                >
                  {btn.icon}
                </button>
              )
            })}
          </div>
        )}

        {/* editor content */}
        <div className="flex-1 min-h-[120px] overflow-y-auto" data-selectable>
          <EditorContent
            editor={editor}
            className={cx(
              'prose prose-sm max-w-none px-3 py-2 text-fg',
              'prose-headings:text-fg prose-p:text-fg prose-a:text-accent',
              'prose-strong:text-fg prose-em:text-fg',
              'prose-code:bg-bg-tertiary prose-code:rounded prose-code:px-1 prose-code:text-[0.85em]',
              'prose-pre:bg-bg-tertiary prose-pre:rounded-lg',
              'prose-blockquote:border-accent/30',
              '[&_.tiptap]:outline-none [&_.tiptap]:min-h-[100px]',
              '[&_.tiptap_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.tiptap_p.is-editor-empty:first-child::before]:text-fg-muted/30 [&_.tiptap_p.is-editor-empty:first-child::before]:float-left [&_.tiptap_p.is-editor-empty:first-child::before]:pointer-events-none [&_.tiptap_p.is-editor-empty:first-child::before]:h-0',
            )}
          />
        </div>
      </div>
    )
  },
)
