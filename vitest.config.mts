import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  test: {
    projects: ['ui-kit'],
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['ui-kit/src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['ui-kit/src/**/*.{ts,tsx}'],
      exclude: ['ui-kit/src/**/*.d.ts', 'ui-kit/src/**/index.ts', 'node_modules/', 'dist/'],
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(import.meta.dirname, './ui-kit/src'),
    },
  },
})
