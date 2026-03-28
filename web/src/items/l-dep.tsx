import { GDS_DEPS, GDS_INTERNAL_UTILS } from '@gds/l0-tokens/deps'

import { DocTable, DocSection } from '../components/demo'

import type { DevCenterItem } from '../types'

export const depItems: DevCenterItem[] = [
  {
    id: 'external-deps',
    label: 'External Deps',
    layer: 'l-dep',
    type: 'reference',
    tags: ['npm', 'package', 'dependency'],
    stage: () => {
      const peer = GDS_DEPS.filter(d => d.type === 'peer')
      const runtime = GDS_DEPS.filter(d => d.type === 'runtime')
      return (
        <div>
          <DocSection title="Peer dependencies">
            <DocTable
              headers={['Package', 'Version', 'Role']}
              rows={peer.map(d => [d.name, d.version, d.role])}
            />
          </DocSection>
          <DocSection title="Runtime dependencies">
            <DocTable
              headers={['Package', 'Version', 'Role', 'Used by']}
              rows={runtime.map(d => [d.name, d.version, d.role, d.usedBy.join(', ')])}
            />
          </DocSection>
        </div>
      )
    },
    code: () => `// peer deps — provided by consumer
"react": ">=19.0.0"
"react-dom": ">=19.0.0"

// runtime deps — bundled
"tailwindcss": "^4.2.1"
"class-variance-authority": "^0.7.1"
"jotai": "^2.18.1"`,
    docs: () => (
      <div className="space-y-3" data-selectable>
        <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-muted/30 mb-1">Dependency rules</div>
        <div className="space-y-1 text-[10px] text-fg-muted/50">
          <p>• Peer deps are NOT bundled — consumer app must install them</p>
          <p>• Runtime deps are bundled with the library output</p>
          <p>• Each layer has strict constraints on which deps it can import</p>
          <p>• L0 Tokens is pure CSS math — no React dependency</p>
          <p>• Internal utils (cx, focusCls, hooks) wrap external deps so components never import clsx/tailwind-merge directly</p>
        </div>
      </div>
    ),
  },
  {
    id: 'internal-utils',
    label: 'Internal Utils',
    layer: 'l-dep',
    type: 'reference',
    tags: ['cx', 'hooks', 'a11y', 'utility'],
    stage: () => (
      <div>
        <DocSection title="Utility functions & hooks">
          <DocTable
            headers={['Name', 'Module', 'Role', 'Layers']}
            rows={GDS_INTERNAL_UTILS.map(u => [u.name, u.module, u.role, u.usedBy])}
          />
        </DocSection>
      </div>
    ),
    code: () => `import { cx } from '@gds/utils/cx'
import { focusCls, srOnly } from '@gds/utils/a11y'
import { useScrollLock, useEscapeKey, useFocusTrap } from '@gds/utils/hooks'
import { mergeRefs, clamp, uid } from '@gds/utils/dom'`,
  },
  {
    id: 'layer-constraints',
    label: 'Layer Rules',
    layer: 'l-dep',
    type: 'reference',
    tags: ['architecture', 'constraints', 'layers'],
    stage: () => (
      <div>
        <DocSection title="Layer dependency constraints">
          <DocTable
            headers={['Layer', 'Rule', 'Allowed deps']}
            rows={[
              ['L0 Tokens', 'Pure CSS math, no React. Exports CSS vars + TS constants', 'tailwindcss'],
              ['L1 Systems', 'Cross-layer mechanisms. Jotai atoms, theme engine', 'react, jotai'],
              ['L2 Primitives', 'Stateless visual blocks. No useState, no useEffect', 'react, cx'],
              ['L3 Atoms', 'Simple composed. May use useState, minimal effects', '+ cva, lucide'],
              ['L4 Molecules', 'Multi-part stateful. Full interaction logic', '+ cva, lucide'],
              ['L5 Organisms', 'Complex features. Portal, focus trap, virtual scroll', '+ react-dom'],
              ['L6 Charts', 'Data visualization. Recharts wrapper layer', '+ recharts'],
              ['L7 Patterns', 'Page-level layouts. Compose L2-L6 components', 'react, cx'],
            ]}
          />
        </DocSection>
      </div>
    ),
  },
]
