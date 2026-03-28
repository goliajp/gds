import { FileCard, SearchResults } from '@gds/l5-organisms'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const organismItemsExt24: DevCenterItem[] = []

const sampleResults = [
  { id: '1', title: 'React Component Library', description: 'Build reusable UI components with React and TypeScript', category: 'Docs' },
  { id: '2', title: 'React Hooks Guide', description: 'Learn custom hooks for state management', category: 'Tutorial' },
  { id: '3', title: 'React Performance Tips', category: 'Blog' },
]

const searchResultsItem: DevCenterItem = {
  id: 'search-results',
  label: 'SearchResults',
  layer: 'l5',
  type: 'interactive',
  tags: ['search', 'results', 'list', 'highlight', 'organism'],
  defaultConfig: { query: 'React', showTotal: 'true' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { SearchResults } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="w-80">
          <SearchResults
            results={sampleResults}
            query={config.query}
            total={config.showTotal === 'true' ? sampleResults.length : undefined}
            onSelect={(id) => alert(`Selected: ${id}`)}
          />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="query" value={config.query} options={['React', 'hooks', 'component']} onChange={(v) => setConfig('query', v)} />
      <Ctrl type="pills" label="showTotal" value={config.showTotal} options={['true', 'false']} onChange={(v) => setConfig('showTotal', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { SearchResults } from '@goliapkg/gds'\n\n<SearchResults\n  results={results}\n  query="${config.query}"${config.showTotal === 'true' ? '\n  total={results.length}' : ''}\n  onSelect={(id) => navigate(id)}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['results', 'Array of search result objects', 'SearchResult[]', '—'],
        ['query', 'Search query for highlighting', 'string', '—'],
        ['total', 'Total results count', 'number', '—'],
        ['onSelect', 'Called with result id on click', '(id: string) => void', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
organismItemsExt24.push(searchResultsItem)

const fileCardItem: DevCenterItem = {
  id: 'file-card',
  label: 'FileCard',
  layer: 'l5',
  type: 'interactive',
  tags: ['file', 'document', 'card', 'upload', 'organism'],
  defaultConfig: { name: 'design-spec.fig', size: '2.4 MB', type: 'Figma' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { FileCard } from '@goliapkg/gds'" />
      <LivePreview>
        <div className="w-48">
          <FileCard
            name={config.name}
            size={config.size !== '' ? config.size : undefined}
            type={config.type !== '' ? config.type : undefined}
            onClick={() => alert(`Open: ${config.name}`)}
          />
        </div>
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="name" value={config.name} options={['design-spec.fig', 'report.pdf', 'photo.jpg']} onChange={(v) => setConfig('name', v)} />
      <Ctrl type="pills" label="size" value={config.size} options={['', '128 KB', '2.4 MB', '15 MB']} onChange={(v) => setConfig('size', v)} />
      <Ctrl type="pills" label="type" value={config.type} options={['', 'Figma', 'PDF', 'Image']} onChange={(v) => setConfig('type', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { FileCard } from '@goliapkg/gds'\n\n<FileCard\n  name="${config.name}"${config.size !== '' ? `\n  size="${config.size}"` : ''}${config.type !== '' ? `\n  type="${config.type}"` : ''}\n  onClick={() => openFile()}\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['name', 'File name', 'string', '—'],
        ['size', 'File size display string', 'string', '—'],
        ['type', 'File type badge text', 'string', '—'],
        ['thumbnail', 'Thumbnail image URL', 'string', '—'],
        ['actions', 'Action buttons', 'ReactNode', '—'],
        ['onClick', 'Click handler', '() => void', '—'],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
organismItemsExt24.push(fileCardItem)

export { organismItemsExt24 }
