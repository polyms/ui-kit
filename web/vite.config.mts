/// <reference types='vitest' />
import path from 'node:path'
import mdx from '@mdx-js/rollup'
import tailwindcssVite from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

import { mdxNavigationPlugin } from './plugins/mdxNavigation.plugin.ts'
import { stripFrontmatter } from './plugins/stripFrontmatter.plugin.ts'

export default defineConfig({
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    emptyOutDir: true,
    outDir: '../dist/web',
    reportCompressedSize: true,
  },
  // base: '/',
  cacheDir: '../node_modules/.vite/web',
  plugins: [
    react(),
    stripFrontmatter(),
    mdx({ providerImportSource: '@mdx-js/react' }),
    mdxNavigationPlugin({
      contentDir: 'src/pages',
      routeBase: '/',
    }),
    tanstackRouter({ routesDirectory: './src/pages' }),
    svgr({ include: '**/*.svg' }),
    tailwindcssVite(),
  ],
  preview: {
    host: 'localhost',
    port: 4300,
  },
  resolve: {
    // Workspace package source — neither nxViteTsPaths nor vite-tsconfig-paths reliably
    // apply tsconfig.base paths to MDX under Vite 8; alias keeps docs/dev imports working.
    alias: {
      '@polyms/ui-kit': path.resolve(import.meta.dirname, '../ui-kit/src/index.ts'),
    },
  },
  root: import.meta.dirname,
  server: {
    host: 'localhost',
    port: 4200,
  },
})
