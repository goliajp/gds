import { resolve } from 'node:path'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@gds': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: {
        'index': resolve(__dirname, 'src/index.ts'),
        'l0-tokens/index': resolve(__dirname, 'src/l0-tokens/index.ts'),
        'l1-systems/index': resolve(__dirname, 'src/l1-systems/index.ts'),
        'l2-primitives/index': resolve(__dirname, 'src/l2-primitives/index.ts'),
        'l3-atoms/index': resolve(__dirname, 'src/l3-atoms/index.ts'),
        'l4-molecules/index': resolve(__dirname, 'src/l4-molecules/index.ts'),
        'l5-organisms/index': resolve(__dirname, 'src/l5-organisms/index.ts'),
        'editor/index': resolve(__dirname, 'src/editor/index.ts'),
        'l6-charts/index': resolve(__dirname, 'src/l6-charts/index.ts'),
        'l7-patterns/index': resolve(__dirname, 'src/l7-patterns/index.ts'),
        'utils/index': resolve(__dirname, 'src/utils/index.ts'),
      },
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-router',
        'jotai',
        'recharts',
        'shiki',
        // v2: optional peer deps — must not be bundled
        /^@tiptap\//,
        'lowlight',
        'dompurify',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
  },
})
