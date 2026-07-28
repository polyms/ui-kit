import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

import { polymsIcons } from './icons/plugins/icons-virtual.plugin'

export default defineConfig({
  plugins: [polymsIcons({ root: path.resolve(__dirname, './icons') }), react()],
  test: {
    projects: ['ui-kit', 'icons'],
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: [
      'ui-kit/src/**/*.test.{ts,tsx}',
      'icons/src/**/*.test.{ts,tsx}',
      'icons/scripts/**/*.test.mjs',
      'icons/plugins/**/*.test.mjs',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['ui-kit/src/**/*.{ts,tsx}', 'icons/src/**/*.{ts,tsx}'],
      exclude: ['ui-kit/src/**/*.d.ts', 'ui-kit/src/**/index.ts', 'node_modules/', 'dist/'],
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './ui-kit/src'),
    },
  },
})
