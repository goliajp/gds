// diff-viewer — side-by-side or unified text diff viewer
import { forwardRef, useMemo } from 'react'

import { cx } from '../utils/cx'
import type { DiffLine } from './diff-algorithm'
import { computeLcs, lineClass, linePrefix } from './diff-algorithm'

export type DiffViewerProps = {
  oldText: string
  newText: string
  mode?: 'split' | 'unified'
  oldTitle?: string
  newTitle?: string
  glass?: boolean
  className?: string
}

function UnifiedView({ lines }: { lines: DiffLine[] }) {
  return (
    <table className="w-full border-collapse font-mono text-xs">
      <tbody>
        {lines.map((line, idx) => (
          <tr key={idx} className={lineClass(line.type)}>
            <td className="text-fg-muted/50 w-10 pr-2 text-right select-none">
              {line.oldLineNum ?? ''}
            </td>
            <td className="text-fg-muted/50 w-10 pr-2 text-right select-none">
              {line.newLineNum ?? ''}
            </td>
            <td className="text-fg-muted/70 w-4 text-center select-none">
              {linePrefix(line.type)}
            </td>
            <td className="px-2 whitespace-pre">{line.content}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function SplitView({
  lines,
  oldTitle,
  newTitle,
}: {
  lines: DiffLine[]
  oldTitle: string
  newTitle: string
}) {
  // separate into old and new columns
  const oldLines: Array<DiffLine | null> = []
  const newLines: Array<DiffLine | null> = []

  for (const line of lines) {
    if (line.type === 'unchanged') {
      oldLines.push(line)
      newLines.push(line)
    } else if (line.type === 'removed') {
      oldLines.push(line)
      newLines.push(null)
    } else {
      oldLines.push(null)
      newLines.push(line)
    }
  }

  return (
    <div className="divide-border grid grid-cols-2 divide-x">
      <div>
        <div className="border-border text-fg-muted border-b px-3 py-1.5 text-[10px] font-medium select-none">
          {oldTitle}
        </div>
        <table className="w-full border-collapse font-mono text-xs">
          <tbody>
            {oldLines.map((line, idx) => (
              <tr
                key={idx}
                className={line !== null ? lineClass(line.type) : ''}
              >
                <td className="text-fg-muted/50 w-10 pr-2 text-right select-none">
                  {line?.oldLineNum ?? ''}
                </td>
                <td className="px-2 whitespace-pre">{line?.content ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <div className="border-border text-fg-muted border-b px-3 py-1.5 text-[10px] font-medium select-none">
          {newTitle}
        </div>
        <table className="w-full border-collapse font-mono text-xs">
          <tbody>
            {newLines.map((line, idx) => (
              <tr
                key={idx}
                className={line !== null ? lineClass(line.type) : ''}
              >
                <td className="text-fg-muted/50 w-10 pr-2 text-right select-none">
                  {line?.newLineNum ?? ''}
                </td>
                <td className="px-2 whitespace-pre">{line?.content ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export const DiffViewer = forwardRef<HTMLDivElement, DiffViewerProps>(
  function DiffViewer(
    {
      oldText,
      newText,
      mode = 'unified',
      oldTitle = 'Old',
      newTitle = 'New',
      glass,
      className,
    },
    ref
  ) {
    const lines = useMemo(() => {
      const oldLines = oldText.split('\n')
      const newLines = newText.split('\n')
      return computeLcs(oldLines, newLines)
    }, [oldText, newText])

    return (
      <div
        ref={ref}
        className={cx(
          'gds-radius-popover border-border overflow-auto border',
          glass === true && 'bg-white/5 backdrop-blur-md',
          glass !== true && 'bg-bg-secondary',
          className
        )}
        data-component="diff-viewer"
        data-variant={mode}
      >
        {mode === 'split' ? (
          <SplitView lines={lines} oldTitle={oldTitle} newTitle={newTitle} />
        ) : (
          <UnifiedView lines={lines} />
        )}
      </div>
    )
  }
)
