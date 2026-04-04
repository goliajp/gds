// diff-algorithm — pure LCS diff computation (no React dependency)

type DiffLine = {
  type: 'added' | 'removed' | 'unchanged'
  content: string
  oldLineNum: number | null
  newLineNum: number | null
}

// simple line-by-line diff using longest common subsequence
function computeLcs(oldLines: string[], newLines: string[]): DiffLine[] {
  const m = oldLines.length
  const n = newLines.length

  // build LCS table
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0)
  )
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (oldLines[i - 1] === newLines[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }

  // backtrack to produce diff
  const result: DiffLine[] = []
  let i = m
  let j = n
  while (i > 0 && j > 0) {
    if (oldLines[i - 1] === newLines[j - 1]) {
      result.unshift({
        type: 'unchanged',
        content: oldLines[i - 1],
        oldLineNum: i,
        newLineNum: j,
      })
      i--
      j--
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      result.unshift({
        type: 'removed',
        content: oldLines[i - 1],
        oldLineNum: i,
        newLineNum: null,
      })
      i--
    } else {
      result.unshift({
        type: 'added',
        content: newLines[j - 1],
        oldLineNum: null,
        newLineNum: j,
      })
      j--
    }
  }
  while (i > 0) {
    result.unshift({
      type: 'removed',
      content: oldLines[i - 1],
      oldLineNum: i,
      newLineNum: null,
    })
    i--
  }
  while (j > 0) {
    result.unshift({
      type: 'added',
      content: newLines[j - 1],
      oldLineNum: null,
      newLineNum: j,
    })
    j--
  }

  return result
}

function lineClass(type: DiffLine['type']): string {
  if (type === 'added') return 'bg-success/10'
  if (type === 'removed') return 'bg-danger/10'
  return ''
}

function linePrefix(type: DiffLine['type']): string {
  if (type === 'added') return '+'
  if (type === 'removed') return '-'
  return ' '
}

export { computeLcs, lineClass, linePrefix }
export type { DiffLine }
