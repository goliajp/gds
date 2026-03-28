import { LoginForm } from '@gds/l7-patterns'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const patternItemsExt15: DevCenterItem[] = [
  {
    id: 'login-form',
    label: 'LoginForm',
    layer: 'l7',
    type: 'interactive',
    tags: ['login', 'auth', 'form', 'sign-in', 'pattern'],
    defaultConfig: { title: 'Sign in', error: '', glass: false, loading: false },

    stage: ({ config }) => (
      <div>
        <ImportLine text="import { LoginForm } from '@goliapkg/gds'" />
        <LivePreview className="!p-6">
          <LoginForm
            onSubmit={() => {}}
            title={config.title}
            error={config.error || undefined}
            glass={config.glass}
            loading={config.loading}
          />
        </LivePreview>
      </div>
    ),

    controls: ({ config, setConfig }) => (
      <>
        <Ctrl type="text" label="title" value={config.title} onChange={(v) => setConfig('title', v)} />
        <Ctrl type="text" label="error" value={config.error} onChange={(v) => setConfig('error', v)} />
        <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
        <Ctrl type="check" label="loading" value={config.loading} onChange={(v) => setConfig('loading', v)} />
      </>
    ),

    code: ({ config }) => [
      "import { LoginForm } from '@goliapkg/gds'",
      '',
      '<LoginForm',
      '  onSubmit={(data) => login(data)}',
      `  title="${config.title}"`,
      config.error ? `  error="${config.error}"` : null,
      config.glass ? '  glass' : null,
      config.loading ? '  loading' : null,
      '/>',
    ].filter(Boolean).join('\n'),

    docs: () => (
      <div className="space-y-4" data-selectable>
        <DocTable rows={[
          ['onSubmit', 'Form submit callback', '(data: LoginFormData) => void', '—'],
          ['title', 'Form heading', 'string', '"Sign in"'],
          ['error', 'Error message to display', 'string', '—'],
          ['loading', 'Show loading state on button', 'boolean', 'false'],
          ['glass', 'Apply glass material', 'boolean', 'false'],
          ['className', 'Root element class', 'string', '—'],
        ]} />
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30">LoginFormData</div>
          <DocTable rows={[
            ['email', 'Email input value', 'string', '—'],
            ['password', 'Password input value', 'string', '—'],
            ['remember', 'Remember me checkbox', 'boolean', '—'],
          ]} />
        </div>
      </div>
    ),
  },
]

export { patternItemsExt15 }
