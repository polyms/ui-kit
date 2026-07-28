import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

import { polymsIcons } from './plugins/icons-virtual.plugin'

export default defineConfig({
  plugins: [polymsIcons({ root: __dirname }), react()],
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
    },
  },
  test: {
    coverage: {
      exclude: ['node_modules/', 'dist/', '**/*.test.ts', '**/*.test.tsx', '**/index.ts'],
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
    environment: 'jsdom',
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
    globals: true,
    include: ['src/**/*.test.{ts,tsx}', 'scripts/**/*.test.mjs', 'plugins/**/*.test.mjs'],
    setupFiles: ['../vitest.setup.ts'],
  },
})
