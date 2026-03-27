import { QuickLinks, WeatherWidget } from '@gds/l5-organisms'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const organismItemsExt32: DevCenterItem[] = []

const quickLinksItem: DevCenterItem = {
  id: 'quick-links',
  label: 'QuickLinks',
  layer: 'l5',
  type: 'interactive',
  tags: ['links', 'grid', 'navigation', 'quick', 'organism'],
  defaultConfig: { columns: 4 },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { QuickLinks } from '@golia/gds'" />
      <LivePreview>
        <QuickLinks
          columns={config.columns}
          links={[
            { label: 'Dashboard', onClick: () => {} },
            { label: 'Settings', onClick: () => {} },
            { label: 'Members', onClick: () => {} },
            { label: 'Reports', onClick: () => {} },
          ]}
        />
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <Ctrl type="number" label="columns" value={config.columns} min={2} max={6} onChange={(v) => setConfig('columns', v)} />
  ),

  code: ({ config }) =>
    `import { QuickLinks } from '@golia/gds'\n\n<QuickLinks\n  columns={${config.columns}}\n  links={[\n    { label: 'Dashboard', onClick: handleClick },\n    { label: 'Settings', href: '/settings' },\n  ]}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['links', 'Array of link items', '{ label, href?, icon?, onClick? }[]', '—'],
        ['columns', 'Grid columns', 'number', '4'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
organismItemsExt32.push(quickLinksItem)

const weatherWidgetItem: DevCenterItem = {
  id: 'weather-widget',
  label: 'WeatherWidget',
  layer: 'l5',
  type: 'interactive',
  tags: ['weather', 'temperature', 'widget', 'dashboard', 'organism'],
  defaultConfig: { temp: 25, condition: 'Sunny', location: 'Tokyo', unit: 'C' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { WeatherWidget } from '@golia/gds'" />
      <LivePreview>
        <div className="flex items-start gap-4">
          <WeatherWidget temp={config.temp} condition={config.condition} location={config.location} unit={config.unit} />
          <WeatherWidget temp={72} condition="Partly Cloudy" location="San Francisco" unit="F" />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="number" label="temp" value={config.temp} min={-40} max={50} onChange={(v) => setConfig('temp', v)} />
      <Ctrl type="text" label="condition" value={config.condition} onChange={(v) => setConfig('condition', v)} />
      <Ctrl type="text" label="location" value={config.location} onChange={(v) => setConfig('location', v)} />
      <Ctrl type="pills" label="unit" value={config.unit} options={['C', 'F']} onChange={(v) => setConfig('unit', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { WeatherWidget } from '@golia/gds'\n\n<WeatherWidget temp={${config.temp}} condition="${config.condition}" location="${config.location}"${config.unit !== 'C' ? ` unit="${config.unit}"` : ''} />`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['temp', 'Temperature value', 'number', '—'],
        ['condition', 'Weather condition text', 'string', '—'],
        ['location', 'Location name', 'string', '—'],
        ['unit', 'Temperature unit', "'C' | 'F'", "'C'"],
        ['icon', 'Weather icon element', 'ReactNode', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
organismItemsExt32.push(weatherWidgetItem)

export { organismItemsExt32 }
