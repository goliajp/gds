// json-node — recursive tree node for json-viewer
import { useCallback, useState } from 'react'

type NodeProps = {
  value: unknown
  keyName?: string
  depth: number
  defaultExpanded: boolean | number
}

function isExpandedAtDepth(defaultExpanded: boolean | number, depth: number): boolean {
  if (defaultExpanded === true) return true
  if (defaultExpanded === false) return false
  return depth < defaultExpanded
}

function JsonString({ value }: { value: string }) {
  return <span className="text-success">"{value}"</span>
}

function JsonNumber({ value }: { value: number }) {
  return <span className="text-accent">{String(value)}</span>
}

function JsonBoolean({ value }: { value: boolean }) {
  return <span className="text-[#c084fc]">{String(value)}</span>
}

function JsonNull() {
  return <span className="text-fg-muted">null</span>
}

export type { NodeProps as JsonNodeProps }

export function JsonNode({ value, keyName, depth, defaultExpanded }: NodeProps) {
  const [expanded, setExpanded] = useState(() => isExpandedAtDepth(defaultExpanded, depth))

  const handleToggle = useCallback(() => {
    setExpanded((prev) => !prev)
  }, [])

  // render key prefix
  const keyPrefix = keyName !== undefined ? (
    <span className="text-fg">{keyName}: </span>
  ) : null

  // primitives
  if (value === null || value === undefined) {
    return <div style={{ paddingLeft: `${depth * 16}px` }}>{keyPrefix}<JsonNull /></div>
  }
  if (typeof value === 'string') {
    return <div style={{ paddingLeft: `${depth * 16}px` }}>{keyPrefix}<JsonString value={value} /></div>
  }
  if (typeof value === 'number') {
    return <div style={{ paddingLeft: `${depth * 16}px` }}>{keyPrefix}<JsonNumber value={value} /></div>
  }
  if (typeof value === 'boolean') {
    return <div style={{ paddingLeft: `${depth * 16}px` }}>{keyPrefix}<JsonBoolean value={value} /></div>
  }

  // arrays
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return <div style={{ paddingLeft: `${depth * 16}px` }}>{keyPrefix}[]</div>
    }

    if (!expanded) {
      return (
        <div style={{ paddingLeft: `${depth * 16}px` }}>
          {keyPrefix}
          <button
            className="cursor-pointer text-fg-muted hover:text-fg"
            onClick={handleToggle}
            data-testid="toggle"
          >
            [...{value.length} items]
          </button>
        </div>
      )
    }

    return (
      <div>
        <div style={{ paddingLeft: `${depth * 16}px` }}>
          {keyPrefix}
          <button
            className="cursor-pointer text-fg-muted hover:text-fg"
            onClick={handleToggle}
            data-testid="toggle"
          >
            [
          </button>
        </div>
        {value.map((item, idx) => (
          <JsonNode key={idx} value={item} depth={depth + 1} defaultExpanded={defaultExpanded} />
        ))}
        <div style={{ paddingLeft: `${depth * 16}px` }}>]</div>
      </div>
    )
  }

  // objects
  if (typeof value === 'object') {
    const entries = Object.entries(value)
    if (entries.length === 0) {
      return <div style={{ paddingLeft: `${depth * 16}px` }}>{keyPrefix}{'{}'}</div>
    }

    if (!expanded) {
      return (
        <div style={{ paddingLeft: `${depth * 16}px` }}>
          {keyPrefix}
          <button
            className="cursor-pointer text-fg-muted hover:text-fg"
            onClick={handleToggle}
            data-testid="toggle"
          >
            {'{'} ...{entries.length} keys {'}'}
          </button>
        </div>
      )
    }

    return (
      <div>
        <div style={{ paddingLeft: `${depth * 16}px` }}>
          {keyPrefix}
          <button
            className="cursor-pointer text-fg-muted hover:text-fg"
            onClick={handleToggle}
            data-testid="toggle"
          >
            {'{'}
          </button>
        </div>
        {entries.map(([k, v]) => (
          <JsonNode key={k} value={v} keyName={k} depth={depth + 1} defaultExpanded={defaultExpanded} />
        ))}
        <div style={{ paddingLeft: `${depth * 16}px` }}>{'}'}</div>
      </div>
    )
  }

  // fallback
  return <div style={{ paddingLeft: `${depth * 16}px` }}>{keyPrefix}{String(value)}</div>
}
