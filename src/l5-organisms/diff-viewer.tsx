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
            <td className="w-10 select-none pr-2 text-right text-fg-muted/50">
              {line.oldLineNum ?? ''}
            </td>
            <td className="w-10 select-none pr-2 text-right text-fg-muted/50">
              {line.newLineNum ?? ''}
            </td>
            <td className="w-4 select-none text-center text-fg-muted/70">
              {linePrefix(line.type)}
            </td>
            <td className="whitespace-pre px-2">{line.content}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function SplitView({ lines, oldTitle, newTitle }: {
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
    <div className="grid grid-cols-2 divide-x divide-border">
      <div>
        <div className="border-b border-border px-3 py-1.5 text-[10px] font-medium text-fg-muted select-none">
          {oldTitle}
        </div>
        <table className="w-full border-collapse font-mono text-xs">
          <tbody>
            {oldLines.map((line, idx) => (
              <tr key={idx} className={line !== null ? lineClass(line.type) : ''}>
                <td className="w-10 select-none pr-2 text-right text-fg-muted/50">
                  {line?.oldLineNum ?? ''}
                </td>
                <td className="whitespace-pre px-2">{line?.content ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <div className="border-b border-border px-3 py-1.5 text-[10px] font-medium text-fg-muted select-none">
          {newTitle}
        </div>
        <table className="w-full border-collapse font-mono text-xs">
          <tbody>
            {newLines.map((line, idx) => (
              <tr key={idx} className={line !== null ? lineClass(line.type) : ''}>
                <td className="w-10 select-none pr-2 text-right text-fg-muted/50">
                  {line?.newLineNum ?? ''}
                </td>
                <td className="whitespace-pre px-2">{line?.content ?? ''}</td>
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
    { oldText, newText, mode = 'unified', oldTitle = 'Old', newTitle = 'New', glass, className },
    ref,
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
          'overflow-auto gds-radius-popover border border-border',
          glass === true && 'bg-white/5 backdrop-blur-md',
          glass !== true && 'bg-bg-secondary',
          className,
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
  },
)
