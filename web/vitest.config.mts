import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: { '@polyms/ui-kit': resolve(import.meta.dirname, '../ui-kit/src/index.ts') },
	},
	root: import.meta.dirname,
	test: {
		environment: 'node',
		include: ['src/**/*.test.{ts,tsx}'],
	},
})
