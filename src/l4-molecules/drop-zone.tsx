// drop-zone — file drop area with drag-over visual feedback
import type { ReactNode } from 'react'
import { forwardRef, useCallback, useState } from 'react'

import { focusCls } from '../utils/a11y'
import { cx } from '../utils/cx'
import { glassClass } from '../utils/glass'

export type DropZoneProps = {
  onDrop: (files: File[]) => void
  accept?: string
  active?: boolean
  children?: ReactNode
  glass?: boolean
  className?: string
}

export const DropZone = forwardRef<HTMLDivElement, DropZoneProps>(
  function DropZone({ onDrop, accept, active, children, glass, className }, ref) {
    const [dragOver, setDragOver] = useState(false)

    const isActive = active === true || dragOver

    const handleDragOver = useCallback((e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(true)
    }, [])

    const handleDragLeave = useCallback((e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)
    }, [])

    const handleDrop = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault()
        setDragOver(false)
        const files = Array.from(e.dataTransfer.files)
        onDrop(files)
      },
      [onDrop],
    )

    return (
      <div
        ref={ref}
        className={cx(
          'flex flex-col items-center justify-center gds-gap gds-radius border-2 border-dashed p-8 transition-colors',
          focusCls,
          isActive
            ? 'border-accent bg-accent/5'
            : 'border-border/40 bg-bg-secondary/20',
          glass === true && glassClass(glass),
          className,
        )}
        data-component="drop-zone"
        data-state={isActive ? 'active' : 'idle'}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {children ?? (
          <span className="text-sm text-fg-muted select-none">
            Drop files here
          </span>
        )}
        {accept !== undefined && (
          <span className="text-xs text-fg-muted/60">{accept}</span>
        )}
      </div>
    )
  },
)
