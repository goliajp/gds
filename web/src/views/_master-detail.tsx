import { cx } from '@goliapkg/gds'
import { useState } from 'react'

export type SectionImage = {
  url?: string
  svg?: string
  caption?: string
  alt?: string
}

export type Section = {
  heading: string
  body?: string
  points: string[]
  images?: SectionImage[]
}

export type Entry = {
  id: string
  title: string
  question: string
  sections: Section[]
  sources?: string[]
}

export function MasterDetailView({
  entries,
  listLabel,
  topicPrefix,
  emptyHint,
}: {
  entries: Entry[]
  listLabel: string
  topicPrefix: string
  emptyHint?: string
}) {
  const [selectedId, setSelectedId] = useState<string | null>(entries[0]?.id ?? null)
  const selected = selectedId ? entries.find((r) => r.id === selectedId) : null

  return (
    <div className="flex h-full flex-col gap-6 md:flex-row">
      <aside className="md:border-border md:w-72 md:shrink-0 md:overflow-y-auto md:border-r md:pr-4">
        <div className="text-accent mb-3 font-mono text-xs tracking-wider uppercase">
          {listLabel}
        </div>
        <ol className="space-y-1">
          {entries.map((r, i) => (
            <li key={r.id}>
              <button
                className={cx(
                  'flex w-full items-center rounded px-3 py-2 text-left text-sm transition-colors',
                  selectedId === r.id
                    ? 'bg-accent/10 text-accent'
                    : 'text-fg-secondary hover:bg-bg-tertiary hover:text-fg'
                )}
                onClick={() => setSelectedId(r.id)}
                title={r.title}
                type="button"
              >
                <span className="text-fg-muted mr-2 shrink-0 font-mono text-xs">#{i + 1}</span>
                <span className="truncate">{r.title}</span>
              </button>
            </li>
          ))}
        </ol>
      </aside>

      <article className="min-w-0 flex-1 space-y-6 md:overflow-y-auto md:pr-2">
        {selected ? (
          <EntryContent entry={selected} topicPrefix={topicPrefix} />
        ) : (
          <p className="text-fg-muted text-sm italic">
            {emptyHint ?? '暂无条目。等用户定义第一个。'}
          </p>
        )}
      </article>
    </div>
  )
}

function EntryContent({ entry, topicPrefix }: { entry: Entry; topicPrefix: string }) {
  return (
    <>
      <header className="space-y-2">
        <h2 className="text-fg text-xl font-bold">{entry.title}</h2>
        <p className="text-fg-muted text-sm italic">
          {topicPrefix}：{entry.question}
        </p>
      </header>

      {entry.sections.map((s) => (
        <section className="space-y-3" key={s.heading}>
          <h3 className="text-fg text-base font-semibold">{s.heading}</h3>
          {s.body ? (
            <p className="text-fg-secondary max-w-3xl text-sm leading-relaxed">{s.body}</p>
          ) : null}
          {s.points.length > 0 ? (
            <ul className="text-fg-secondary list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
              {s.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          ) : null}
          {s.images && s.images.length > 0 ? (
            <div className="mt-4 space-y-4">
              {s.images.map((img, idx) => (
                <figure key={img.url ?? `svg-${idx}`}>
                  {img.url ? (
                    <img
                      alt={img.alt ?? img.caption ?? ''}
                      className="border-border bg-bg-tertiary w-full max-w-3xl rounded-lg border"
                      loading="lazy"
                      src={img.url}
                    />
                  ) : null}
                  {img.svg ? (
                    <div
                      aria-label={img.alt ?? img.caption ?? ''}
                      className="border-border bg-bg-secondary w-full max-w-3xl overflow-hidden rounded-lg border p-4"
                      dangerouslySetInnerHTML={{ __html: img.svg }}
                      role="img"
                    />
                  ) : null}
                  {img.caption ? (
                    <figcaption className="text-fg-muted mt-2 text-xs">{img.caption}</figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          ) : null}
        </section>
      ))}

      {entry.sources && entry.sources.length > 0 ? (
        <aside className="border-border border-t pt-4">
          <h4 className="text-fg-muted mb-2 font-mono text-xs tracking-wider uppercase">
            Sources（AI 整理，审计请人工确认）
          </h4>
          <ul className="text-fg-muted space-y-1 text-xs">
            {entry.sources.map((s) => (
              <li key={s}>· {s}</li>
            ))}
          </ul>
        </aside>
      ) : null}
    </>
  )
}
