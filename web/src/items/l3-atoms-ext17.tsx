import { StarRating } from '@gds/l3-atoms'

import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import type { DevCenterItem } from '../types'

const atomItemsR: DevCenterItem[] = []

const starRatingItem: DevCenterItem = {
  id: 'star-rating',
  label: 'StarRating',
  layer: 'l3',
  type: 'interactive',
  tags: ['star', 'rating', 'display', 'read-only', 'atom'],
  defaultConfig: { value: '3.5', size: 'default', max: '5' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { StarRating } from '@goliapkg/gds'" />
      <LivePreview>
        <StarRating
          value={Number(config.value ?? 0)}
          max={Number(config.max ?? 0)}
          size={config.size as 'sm' | 'default' | 'lg'}
        />
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="pills" label="value" value={config.value} options={['0', '1', '2.5', '3.5', '4', '5']} onChange={(v) => setConfig('value', v)} />
      <Ctrl type="pills" label="size" value={config.size} options={['sm', 'default', 'lg']} onChange={(v) => setConfig('size', v)} />
      <Ctrl type="pills" label="max" value={config.max} options={['3', '5', '10']} onChange={(v) => setConfig('max', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { StarRating } from '@goliapkg/gds'\n\n<StarRating value={${config.value}} size="${config.size}" max={${config.max}} />`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['value', 'Rating value (0-max, supports decimals)', 'number', '—'],
        ['max', 'Maximum number of stars', 'number', '5'],
        ['size', 'Star size', "'sm' | 'default' | 'lg'", "'default'"],
        ['color', 'Star fill color', 'string', "'currentColor'"],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
atomItemsR.push(starRatingItem)

export { atomItemsR }
