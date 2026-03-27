import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import importSort from 'eslint-plugin-simple-import-sort'

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

      // L-dep anti-corruption: components must use GDS wrappers, not raw deps
      'no-restricted-imports': ['error', {
        paths: [
          { name: 'clsx', message: 'Use cx() from @gds/utils instead' },
          { name: 'tailwind-merge', message: 'Use cx() from @gds/utils instead' },
          { name: 'class-variance-authority', importNames: ['VariantProps'], message: 'Import VariantProps from @gds/utils/types instead' },
        ],
        patterns: [
          { group: ['clsx/*'], message: 'Use cx() from @gds/utils instead' },
          { group: ['tailwind-merge/*'], message: 'Use cx() from @gds/utils instead' },
        ],
      }],
    },
    settings: {
      react: { version: 'detect' },
    },
  },
  // L-dep wrapper files — they ARE the anti-corruption boundary, allowed to import raw deps
  {
    files: ['src/utils/cx.ts', 'src/utils/types.ts'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
  {
    ignores: ['node_modules/', 'dist/', '*.config.*'],
  },
)
