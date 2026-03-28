import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import importSort from 'eslint-plugin-simple-import-sort'

// base restricted imports — anti-corruption boundary for raw deps
const antiCorruptionPaths = [
  { name: 'clsx', message: 'Use cx() from @gds/utils instead' },
  { name: 'tailwind-merge', message: 'Use cx() from @gds/utils instead' },
  { name: 'class-variance-authority', importNames: ['VariantProps'], message: 'Import VariantProps from @gds/utils/types instead' },
  { name: 'react-dom', message: 'Use renderPortal() from @gds/utils/portal instead' },
]
const antiCorruptionPatterns = [
  { group: ['clsx/*'], message: 'Use cx() from @gds/utils instead' },
  { group: ['tailwind-merge/*'], message: 'Use cx() from @gds/utils instead' },
  { group: ['react-dom/*'], message: 'Use renderPortal() from @gds/utils/portal instead' },
]

// forbidden cross-layer patterns: layer N cannot import from layer M where M > N
// covers both relative (../lX-*) and alias (@gds/lX-*) paths
function forbidHigherLayers(fromLayerNum) {
  const layers = [
    { n: 1, id: 'l1-systems' },
    { n: 2, id: 'l2-primitives' },
    { n: 3, id: 'l3-atoms' },
    { n: 4, id: 'l4-molecules' },
    { n: 5, id: 'l5-organisms' },
    { n: 6, id: 'l6-charts' },
    { n: 7, id: 'l7-patterns' },
  ]
  const forbidden = layers.filter(l => l.n > fromLayerNum)
  if (forbidden.length === 0) return []
  return forbidden.flatMap(l => [
    { group: [`../${l.id}`, `../${l.id}/**`], message: `Layer L${fromLayerNum} cannot import from L${l.n} (${l.id})` },
    { group: [`@gds/${l.id}`, `@gds/${l.id}/**`], message: `Layer L${fromLayerNum} cannot import from L${l.n} (${l.id})` },
  ])
}

// forbidden external deps per layer (anything NOT in LAYER_DEP_CONSTRAINTS for that layer)
// note: clsx/tailwind-merge/react-dom already blocked globally via antiCorruptionPaths
function forbidExternalDeps(layerExternals) {
  const allExternals = ['jotai', 'lucide-react', 'recharts', 'class-variance-authority']
  return allExternals
    .filter(dep => !layerExternals.includes(dep))
    .map(dep => ({ name: dep, message: `This dependency is not allowed in this layer` }))
}

// build per-layer no-restricted-imports rule
function layerRule(layerNum, allowedExternals) {
  return {
    'no-restricted-imports': ['error', {
      paths: [
        ...antiCorruptionPaths,
        ...forbidExternalDeps(allowedExternals),
      ],
      patterns: [
        ...antiCorruptionPatterns,
        ...forbidHigherLayers(layerNum),
      ],
    }],
  }
}

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'simple-import-sort': importSort,
    },
    rules: {
      // typescript
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

      // react
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',

      // import sorting
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // style
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',

      // global anti-corruption baseline
      'no-restricted-imports': ['error', {
        paths: antiCorruptionPaths,
        patterns: antiCorruptionPatterns,
      }],
    },
    settings: {
      react: { version: 'detect' },
    },
  },

  // === per-layer dependency constraints ===

  // L0 — tokens: only tailwindcss (no react, no external deps)
  {
    files: ['src/l0-tokens/**/*.{ts,tsx}'],
    rules: layerRule(0, []),
  },

  // L1 — systems: react + jotai
  {
    files: ['src/l1-systems/**/*.{ts,tsx}'],
    rules: layerRule(1, ['jotai']),
  },

  // L2 — primitives: react + clsx + tailwind-merge (via cx) + cva
  {
    files: ['src/l2-primitives/**/*.{ts,tsx}'],
    rules: layerRule(2, ['class-variance-authority']),
  },

  // L3 — atoms: + cva + lucide-react
  {
    files: ['src/l3-atoms/**/*.{ts,tsx}'],
    rules: layerRule(3, ['class-variance-authority', 'lucide-react']),
  },

  // L4 — molecules: + cva + lucide-react
  {
    files: ['src/l4-molecules/**/*.{ts,tsx}'],
    rules: layerRule(4, ['class-variance-authority', 'lucide-react']),
  },

  // L5 — organisms: + cva + lucide-react
  {
    files: ['src/l5-organisms/**/*.{ts,tsx}'],
    rules: layerRule(5, ['class-variance-authority', 'lucide-react']),
  },

  // L6 — charts: recharts, no cva, no lucide
  {
    files: ['src/l6-charts/**/*.{ts,tsx}'],
    rules: layerRule(6, ['recharts']),
  },

  // L7 — patterns: react + clsx + tailwind-merge only
  {
    files: ['src/l7-patterns/**/*.{ts,tsx}'],
    rules: layerRule(7, []),
  },

  // utils — can import from l0-tokens only, no higher layers
  {
    files: ['src/utils/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', {
        paths: antiCorruptionPaths,
        patterns: [
          ...antiCorruptionPatterns,
          ...forbidHigherLayers(0).filter(p => !p.group.some(g => g.includes('l0-tokens'))),
        ],
      }],
    },
  },

  // anti-corruption wrapper files — allowed to import raw deps
  {
    files: ['src/utils/cx.ts', 'src/utils/types.ts', 'src/utils/portal.tsx'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
  {
    ignores: ['node_modules/', 'dist/', '*.config.*'],
  },
)
