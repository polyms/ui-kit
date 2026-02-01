/// <reference types='vitest' />
import mdx from '@mdx-js/rollup'
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import tailwindcssVite from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

import { mdxNavigationPlugin } from './plugins/mdxNavigation.plugin'
import { stripFrontmatter } from './plugins/stripFrontmatter.plugin'

export default defineConfig({
  root: __dirname,
  // base: '/',
  cacheDir: '../node_modules/.vite/docs',
  server: {
    port: 4200,
    host: 'localhost',
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  plugins: [
    react(),
    nxViteTsPaths(),
    stripFrontmatter(),
    mdx({ providerImportSource: '@mdx-js/react' }),
    mdxNavigationPlugin({
      contentDir: 'src/pages',
      routeBase: '/',
    }),
    tanstackRouter({ routesDirectory: './src/pages' }),
    nxCopyAssetsPlugin(['*.md']),
    svgr({ include: '**/*.svg' }),
    tailwindcssVite(),
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  build: {
    outDir: '../dist/docs',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  // test: {
  //   watch: false,
  //   globals: true,
  //   environment: 'jsdom',
  //   include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  //   reporters: ['default'],
  //   coverage: {
  //     reportsDirectory: '../coverage/docs',
  //     provider: 'v8' as const,
  //   },
  // },
})
