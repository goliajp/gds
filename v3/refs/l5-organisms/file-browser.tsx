// file-browser — table layout for file/folder navigation
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'

export type FileNode = {
  id: string
  name: string
  type: 'file' | 'folder'
  size?: number
  modified?: string
  icon?: ReactNode
}

export type FileBrowserProps = {
  files: FileNode[]
  onNavigate?: (id: string) => void
  onSelect?: (id: string) => void
  selected?: string
  className?: string
}

function FolderIcon() {
  return (
    <svg
      className="text-warning h-4 w-4"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path d="M1 3.5A1.5 1.5 0 012.5 2h3.379a1.5 1.5 0 011.06.44L8.062 3.5H13.5A1.5 1.5 0 0115 5v7.5a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 011 12.5v-9z" />
    </svg>
  )
}

function FileIcon() {
  return (
    <svg
      className="text-fg-muted h-4 w-4"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <path d="M4 1.5h5l3.5 3.5V14a.5.5 0 01-.5.5H4a.5.5 0 01-.5-.5V2a.5.5 0 01.5-.5z" />
      <path d="M9 1.5V5h3.5" />
    </svg>
  )
}

function formatSize(bytes?: number): string {
  if (bytes === undefined) return '—'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export const FileBrowser = forwardRef<HTMLDivElement, FileBrowserProps>(
  function FileBrowser(
    { files, onNavigate, onSelect, selected, className },
    ref
  ) {
    const handleClick = (node: FileNode) => {
      if (node.type === 'folder' && onNavigate !== undefined) {
        onNavigate(node.id)
      } else if (node.type === 'file' && onSelect !== undefined) {
        onSelect(node.id)
      }
    }

    return (
      <div
        ref={ref}
        className={cx(
          'gds-radius-popover border-border bg-surface overflow-auto border',
          className
        )}
        data-component="file-browser"
      >
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-border bg-bg-secondary/50 border-b">
              <th className="gds-pad-x gds-pad-y gds-text-body text-fg-muted text-left font-medium tracking-wider uppercase select-none">
                Name
              </th>
              <th className="gds-pad-x gds-pad-y gds-text-body text-fg-muted w-24 text-right font-medium tracking-wider uppercase select-none">
                Size
              </th>
              <th className="gds-pad-x gds-pad-y gds-text-body text-fg-muted w-32 text-right font-medium tracking-wider uppercase select-none">
                Modified
              </th>
            </tr>
          </thead>
          <tbody>
            {files.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="gds-pad-x text-fg-muted py-12 text-center text-sm"
                >
                  Empty folder
                </td>
              </tr>
            )}
            {files.map((node) => (
              <tr
                key={node.id}
                className={cx(
                  'border-border border-b transition-colors',
                  focusCls,
                  selected === node.id && 'bg-accent/10',
                  selected !== node.id && 'hover:bg-bg-secondary/60',
                  'cursor-pointer'
                )}
                onClick={() => handleClick(node)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleClick(node)
                }}
              >
                <td className="gds-pad-x gds-pad-y">
                  <div className="gds-gap-sm text-fg flex items-center">
                    {node.icon ??
                      (node.type === 'folder' ? <FolderIcon /> : <FileIcon />)}
                    <span
                      className={node.type === 'folder' ? 'font-medium' : ''}
                    >
                      {node.name}
                    </span>
                  </div>
                </td>
                <td className="gds-pad-x gds-pad-y text-fg-muted text-right">
                  {node.type === 'folder' ? '—' : formatSize(node.size)}
                </td>
                <td className="gds-pad-x gds-pad-y text-fg-muted text-right">
                  {node.modified ?? '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
)
