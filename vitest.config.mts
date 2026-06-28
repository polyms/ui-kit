import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['core/src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['core/src/**/*.{ts,tsx}'],
      exclude: ['core/src/**/*.d.ts', 'core/src/**/index.ts', 'node_modules/', 'dist/'],
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './core/src'),
    },
  },
})
