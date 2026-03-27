import { Changelog } from '@gds/l5-organisms'

import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const organismItemsExt16: DevCenterItem[] = [
  {
    id: 'changelog',
    label: 'Changelog',
    layer: 'l5',
    type: 'interactive',
    tags: ['changelog', 'version', 'release', 'history', 'organism'],
    defaultConfig: {},

    stage: () => {
      const entries = [
        {
          version: 'v2.0.0',
          date: '2026-03-27',
          changes: [
            { type: 'added' as const, text: 'New glass material system' },
            { type: 'changed' as const, text: 'Redesigned token architecture' },
            { type: 'removed' as const, text: 'Deprecated shadow utilities' },
          ],
        },
        {
          version: 'v1.5.0',
          date: '2026-03-15',
          changes: [
            { type: 'added' as const, text: 'Contextual depth system' },
            { type: 'fixed' as const, text: 'Focus ring visibility on dark mode' },
          ],
        },
        {
          version: 'v1.4.2',
          date: '2026-03-01',
          changes: [
            { type: 'fixed' as const, text: 'Button disabled state contrast ratio' },
          ],
        },
      ]
      return (
        <div>
          <ImportLine text="import { Changelog } from '@golia/gds'" />
          <LivePreview className="!p-6">
            <Changelog entries={entries} />
          </LivePreview>
        </div>
      )
    },

    code: () => [
      "import { Changelog } from '@golia/gds'",
      '',
      '<Changelog',
      '  entries={[',
      '    {',
      "      version: 'v2.0.0',",
      "      date: '2026-03-27',",
      '      changes: [',
      "        { type: 'added', text: 'New feature' },",
      "        { type: 'fixed', text: 'Bug fix' },",
      '      ],',
      '    },',
      '  ]}',
      '/>',
    ].join('\n'),

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['entries', 'Changelog entries', 'ChangelogEntry[]', '—'],
          ['className', 'Root element class', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">ChangelogEntry</div>
          <DocTable rows={[
            ['version', 'Version string', 'string', '—'],
            ['date', 'Release date', 'string', '—'],
            ['changes', 'List of changes', 'ChangelogChange[]', '—'],
          ]} />
        </div>
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">ChangelogChange</div>
          <DocTable rows={[
            ['type', 'Change type', "'added' | 'changed' | 'fixed' | 'removed'", '—'],
            ['text', 'Description', 'string', '—'],
          ]} />
        </div>
      </div>
    ),
  },
]

export { organismItemsExt16 }
