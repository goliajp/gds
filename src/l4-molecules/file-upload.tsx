// file-upload — drag-and-drop file upload zone
import type { ReactNode } from 'react'
import { forwardRef, useCallback, useRef, useState } from 'react'

import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

type FileUploadProps = {
  accept?: string
  children?: ReactNode
  className?: string
  disabled?: boolean
  glass?: boolean
  maxSize?: number
  multiple?: boolean
  onFiles: (files: File[]) => void
}

function filterBySize(files: File[], maxSize?: number): File[] {
  if (maxSize === undefined) return files
  return files.filter((f) => f.size <= maxSize)
}

function UploadIcon() {
  return (
    <svg
      className="text-fg-muted/40 h-8 w-8"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}

export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
  function FileUpload(
    {
      accept,
      children,
      className,
      disabled = false,
      glass,
      maxSize,
      multiple = false,
      onFiles,
    },
    ref
  ) {
    const [dragOver, setDragOver] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const inputRef = useRef<HTMLInputElement>(null)

    const handleFiles = useCallback(
      (fileList: FileList) => {
        const files = filterBySize(Array.from(fileList), maxSize)
        setSelectedFiles(files)
        onFiles(files)
      },
      [maxSize, onFiles]
    )

    const handleClick = useCallback(() => {
      if (disabled) return
      inputRef.current?.click()
    }, [disabled])

    const handleDragOver = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault()
        if (disabled) return
        setDragOver(true)
      },
      [disabled]
    )

    const handleDragLeave = useCallback((e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)
    }, [])

    const handleDrop = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault()
        setDragOver(false)
        if (disabled) return
        handleFiles(e.dataTransfer.files)
      },
      [disabled, handleFiles]
    )

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null) {
          handleFiles(e.target.files)
        }
      },
      [handleFiles]
    )

    return (
      <div
        ref={ref}
        className={cx(
          'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 transition-colors',
          !dragOver && !disabled && 'border-border hover:border-fg-muted',
          dragOver && 'border-accent bg-accent/5',
          disabled && 'pointer-events-none cursor-not-allowed opacity-50',
          glassClass(glass),
          className
        )}
        data-component="file-upload"
        data-state={dragOver ? 'drag-over' : 'idle'}
        onClick={handleClick}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          accept={accept}
          className="hidden"
          multiple={multiple}
          onChange={handleInputChange}
          ref={inputRef}
          type="file"
        />
        {children !== undefined ? (
          children
        ) : (
          <>
            <UploadIcon />
            <div className="text-fg-muted text-sm">
              Drop files here or click to browse
            </div>
            {selectedFiles.length > 0 && (
              <div className="text-fg-muted/60 text-xs">
                {selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''}{' '}
                selected
              </div>
            )}
          </>
        )}
      </div>
    )
  }
)

export type { FileUploadProps }
