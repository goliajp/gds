// markdown-parser — pure markdown-to-html conversion without external deps

function sanitize(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<script[^>]*>/gi, '')
    .replace(/\son\w+\s*=\s*"[^"]*"/gi, '')
    .replace(/\son\w+\s*=\s*'[^']*'/gi, '')
    .replace(/\son\w+\s*=\s*[^\s>]*/gi, '')
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function parseInline(text: string): string {
  let result = escapeHtml(text)
  // code (backtick) — must come before bold/italic
  result = result.replace(/`([^`]+)`/g, '<code class="rounded bg-bg-tertiary px-1 py-0.5 font-mono text-[0.85em]">$1</code>')
  // bold
  result = result.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  // italic
  result = result.replace(/\*([^*]+)\*/g, '<em>$1</em>')
  // links
  result = result.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-accent hover:underline" target="_blank" rel="noopener noreferrer">$1</a>',
  )
  return result
}

export function parseMarkdown(content: string): string {
  const lines = content.split('\n')
  const output: string[] = []
  let inCodeBlock = false
  let codeLines: string[] = []
  let inList = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // fenced code blocks
    if (line.trimStart().startsWith('```')) {
      if (inCodeBlock) {
        output.push(
          `<pre class="overflow-auto rounded-lg bg-bg-tertiary p-3 font-mono text-xs"><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`,
        )
        codeLines = []
        inCodeBlock = false
      } else {
        if (inList) {
          output.push('</ul>')
          inList = false
        }
        inCodeBlock = true
      }
      continue
    }

    if (inCodeBlock) {
      codeLines.push(line)
      continue
    }

    // horizontal rule
    if (/^---+$/.test(line.trim())) {
      if (inList) {
        output.push('</ul>')
        inList = false
      }
      output.push('<hr class="my-3 border-border" />')
      continue
    }

    // headings
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/)
    if (headingMatch !== null) {
      if (inList) {
        output.push('</ul>')
        inList = false
      }
      const level = headingMatch[1].length
      const sizes = ['text-xl', 'text-lg', 'text-base', 'text-sm', 'text-xs', 'text-xs']
      const margins = ['mt-4 mb-2', 'mt-3 mb-2', 'mt-3 mb-1', 'mt-2 mb-1', 'mt-2 mb-1', 'mt-2 mb-1']
      output.push(
        `<h${level} class="font-semibold ${sizes[level - 1]} ${margins[level - 1]}">${parseInline(headingMatch[2])}</h${level}>`,
      )
      continue
    }

    // blockquote
    if (line.trimStart().startsWith('> ')) {
      if (inList) {
        output.push('</ul>')
        inList = false
      }
      const text = line.replace(/^>\s*/, '')
      output.push(
        `<blockquote class="border-l-2 border-accent/30 pl-3 text-fg-muted italic">${parseInline(text)}</blockquote>`,
      )
      continue
    }

    // unordered list
    const listMatch = line.match(/^(\s*)[-*]\s+(.+)$/)
    if (listMatch !== null) {
      if (!inList) {
        output.push('<ul class="list-disc pl-5 space-y-0.5">')
        inList = true
      }
      output.push(`<li>${parseInline(listMatch[2])}</li>`)
      continue
    }

    // close list if non-list line
    if (inList) {
      output.push('</ul>')
      inList = false
    }

    // empty line
    if (line.trim() === '') {
      continue
    }

    // paragraph
    output.push(`<p class="mb-2">${parseInline(line)}</p>`)
  }

  // close dangling blocks
  if (inCodeBlock) {
    output.push(
      `<pre class="overflow-auto rounded-lg bg-bg-tertiary p-3 font-mono text-xs"><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`,
    )
  }
  if (inList) {
    output.push('</ul>')
  }

  return sanitize(output.join('\n'))
}
