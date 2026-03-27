import { useState } from 'react'

import { MarkdownEditor } from '@gds/l5-organisms'

import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const organismItemsExt19: DevCenterItem[] = []

const cookieBannerItem: DevCenterItem = {
  id: 'cookie-banner',
  label: 'CookieBanner',
  layer: 'l5',
  type: 'interactive',
  tags: ['cookie', 'banner', 'consent', 'gdpr', 'organism'],
  defaultConfig: {},

  stage: () => (
    <div>
      <ImportLine text="import { CookieBanner } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="relative h-32 w-full overflow-hidden rounded-lg border border-border">
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 border-t border-border bg-surface/80 px-4 py-3 backdrop-blur-lg">
            <p className="text-xs text-fg-muted">We use cookies to improve your experience.</p>
            <div className="flex gap-2">
              <button className="rounded px-3 py-1 text-xs text-fg-muted hover:text-fg">Reject</button>
              <button className="rounded bg-accent px-3 py-1 text-xs text-white">Accept</button>
            </div>
          </div>
        </div>
      </LivePreview>
    </div>
  ),

  code: () =>
    `import { CookieBanner } from '@goliapkg/gds'\n\n<CookieBanner\n  onAccept={() => saveCookieConsent()}\n  onReject={() => rejectCookies()}\n  message="We use cookies..."\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['onAccept', 'Called when user accepts cookies', '() => void', '—'],
        ['onReject', 'Called when user rejects (optional)', '() => void', '—'],
        ['message', 'Custom message text', 'string', 'default message'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
organismItemsExt19.push(cookieBannerItem)

const markdownEditorItem: DevCenterItem = {
  id: 'markdown-editor',
  label: 'MarkdownEditor',
  layer: 'l5',
  type: 'interactive',
  tags: ['markdown', 'editor', 'preview', 'split', 'organism'],
  defaultConfig: {},

  stage: () => {
    const [value, setValue] = useState('# Hello\n\nWrite **markdown** here.\n\n- Item 1\n- Item 2')

    return (
      <div>
        <ImportLine text="import { MarkdownEditor } from '@goliapkg/gds'" />
        <LivePreview>
          <div className="w-full max-w-2xl">
            <MarkdownEditor value={value} onChange={setValue} placeholder="Write markdown..." />
          </div>
        </LivePreview>
      </div>
    )
  },

  code: () =>
    `import { MarkdownEditor } from '@goliapkg/gds'\n\n<MarkdownEditor\n  value={value}\n  onChange={setValue}\n  placeholder="Write markdown..."\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['value', 'Markdown text content', 'string', '—'],
        ['onChange', 'Called with new value on edit', '(value: string) => void', '—'],
        ['placeholder', 'Placeholder for textarea', 'string', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
organismItemsExt19.push(markdownEditorItem)

export { organismItemsExt19 }
