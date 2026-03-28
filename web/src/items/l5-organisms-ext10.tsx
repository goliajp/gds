import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import { Embed } from '@gds/l5-organisms'

import type { DevCenterItem } from '../types'

const organismItemsExt10: DevCenterItem[] = []

const embedItem: DevCenterItem = {
  id: 'embed',
  label: 'Embed',
  layer: 'l5',
  type: 'interactive',
  tags: ['embed', 'iframe', 'video', 'map', 'responsive', 'organism'],
  defaultConfig: { ratio: 16 / 9, glass: false, allowFullscreen: true },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { Embed } from '@goliapkg/gds'" />
      <LivePreview className="block">
        <Embed
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Demo video"
          ratio={config.ratio}
          glass={config.glass}
          allowFullscreen={config.allowFullscreen}
        />
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="number" label="ratio" value={config.ratio} onChange={(v) => setConfig('ratio', v)} min={0.5} max={3} step={0.1} />
      <Ctrl type="check" label="glass" value={config.glass} onChange={(v) => setConfig('glass', v)} />
      <Ctrl type="check" label="allowFullscreen" value={config.allowFullscreen} onChange={(v) => setConfig('allowFullscreen', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { Embed } from '@goliapkg/gds'\n\n<Embed\n  src="https://www.youtube.com/embed/..."\n  title="Demo video"\n  ratio={${config.ratio}}\n  ${config.glass ? 'glass\n  ' : ''}allowFullscreen={${config.allowFullscreen}}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['src', 'URL to embed', 'string', '—'],
        ['title', 'iframe title for a11y', 'string', '—'],
        ['ratio', 'Aspect ratio', 'number', '16/9'],
        ['allowFullscreen', 'Allow fullscreen', 'boolean', 'true'],
        ['sandbox', 'iframe sandbox attribute', 'string', '—'],
        ['loading', 'Loading strategy', "'eager' | 'lazy'", "'lazy'"],
        ['glass', 'Glass material', 'boolean', 'false'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
organismItemsExt10.push(embedItem)

export { organismItemsExt10 }
