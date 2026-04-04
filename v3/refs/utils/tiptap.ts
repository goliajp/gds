// anti-corruption wrapper — Tiptap rich text editor
// L5 components import from here, never directly from @tiptap/*
// consumers who don't use RichTextEditor don't need tiptap installed

export { CodeBlockLowlight as ExtCodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'
export { Image as ExtImage } from '@tiptap/extension-image'
export { Link as ExtLink } from '@tiptap/extension-link'
export { Placeholder as ExtPlaceholder } from '@tiptap/extension-placeholder'
export {
  Table as ExtTable,
  TableCell as ExtTableCell,
  TableHeader as ExtTableHeader,
  TableRow as ExtTableRow,
} from '@tiptap/extension-table'
export { TaskItem as ExtTaskItem } from '@tiptap/extension-task-item'
export { TaskList as ExtTaskList } from '@tiptap/extension-task-list'
export { Underline as ExtUnderline } from '@tiptap/extension-underline'
export type { Editor, UseEditorOptions } from '@tiptap/react'
export { EditorContent, useEditor } from '@tiptap/react'
export { StarterKit } from '@tiptap/starter-kit'
