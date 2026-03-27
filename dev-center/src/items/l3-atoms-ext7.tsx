import { Ctrl } from '../components/ctrl'
import { DocTable, ImportLine, LivePreview } from '../components/demo'

import { Barcode, QRCode } from '@gds/l3-atoms'

import type { DevCenterItem } from '../types'

const atomItemsH: DevCenterItem[] = []

const qrCodeItem: DevCenterItem = {
  id: 'qr-code',
  label: 'QRCode',
  layer: 'l3',
  type: 'interactive',
  tags: ['qr', 'code', 'matrix', 'scan', 'svg', 'atom'],
  defaultConfig: { value: 'https://golia.jp', size: 128, color: 'currentColor' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { QRCode } from '@golia/gds'" />
      <LivePreview>
        <QRCode
          value={config.value}
          size={config.size}
          color={config.color}
        />
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="text" label="value" value={config.value} onChange={(v) => setConfig('value', v)} />
      <Ctrl type="number" label="size" value={config.size} onChange={(v) => setConfig('size', v)} min={64} max={512} step={16} />
      <Ctrl type="text" label="color" value={config.color} onChange={(v) => setConfig('color', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { QRCode } from '@golia/gds'\n\n<QRCode\n  value="${config.value}"\n  size={${config.size}}\n  color="${config.color}"\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['value', 'Data to encode', 'string', '—'],
        ['size', 'Width and height in px', 'number', '128'],
        ['color', 'Module color', 'string', "'currentColor'"],
        ['bgColor', 'Background color', 'string', "'transparent'"],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
atomItemsH.push(qrCodeItem)

const barcodeItem: DevCenterItem = {
  id: 'barcode',
  label: 'Barcode',
  layer: 'l3',
  type: 'interactive',
  tags: ['barcode', 'bar', 'code', 'scan', 'svg', 'atom'],
  defaultConfig: { value: 'GOLIA-2026', width: 200, height: 60, showValue: true, color: 'currentColor' },

  stage: ({ config }) => (
    <div>
      <ImportLine text="import { Barcode } from '@golia/gds'" />
      <LivePreview>
        <Barcode
          value={config.value}
          width={config.width}
          height={config.height}
          showValue={config.showValue}
          color={config.color}
        />
      </LivePreview>
    </div>
  ),

  controls: ({ config, setConfig }) => (
    <>
      <Ctrl type="text" label="value" value={config.value} onChange={(v) => setConfig('value', v)} />
      <Ctrl type="number" label="width" value={config.width} onChange={(v) => setConfig('width', v)} min={100} max={400} step={10} />
      <Ctrl type="number" label="height" value={config.height} onChange={(v) => setConfig('height', v)} min={30} max={120} step={5} />
      <Ctrl type="check" label="showValue" value={config.showValue} onChange={(v) => setConfig('showValue', v)} />
      <Ctrl type="text" label="color" value={config.color} onChange={(v) => setConfig('color', v)} />
    </>
  ),

  code: ({ config }) =>
    `import { Barcode } from '@golia/gds'\n\n<Barcode\n  value="${config.value}"\n  width={${config.width}}\n  height={${config.height}}\n  showValue={${config.showValue}}\n  color="${config.color}"\n/>`,

  docs: () => (
    <div className="space-y-4" data-selectable>
      <DocTable rows={[
        ['value', 'Data to encode', 'string', '—'],
        ['width', 'SVG width in px', 'number', '200'],
        ['height', 'SVG height in px', 'number', '60'],
        ['showValue', 'Show text below bars', 'boolean', 'true'],
        ['color', 'Bar and text color', 'string', "'currentColor'"],
        ['className', 'Additional CSS classes', 'string', '—'],
      ]} />
    </div>
  ),
}
atomItemsH.push(barcodeItem)

export { atomItemsH }
