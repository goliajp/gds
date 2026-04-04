import { resolve } from 'node:path'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, 'src'),
      '@gds-v3/primitives': resolve(import.meta.dirname, '../src/l2-primitives'),
      '@gds-v3/atoms': resolve(import.meta.dirname, '../src/l3-atoms'),
      '@gds-v3/molecules': resolve(import.meta.dirname, '../src/l4-molecules'),
      '@gds-v3/utils': resolve(import.meta.dirname, '../src/utils'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
  },
})
