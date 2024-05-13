import mdx from '@mdx-js/rollup'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import react from '@vitejs/plugin-react-swc'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/landing-page',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [
    {
      enforce: 'pre',
      ...mdx({ remarkPlugins: [remarkGfm, remarkMdxFrontmatter, remarkFrontmatter] }),
    },
    svgr({
      include: '**/*.svg',
    }),
    react({
      plugins: [
        [
          '@swc/plugin-styled-components',
          {
            displayName: true,
          },
        ],
      ],
    }),
    TanStackRouterVite({ routesDirectory: './src/pages' }),
    nxViteTsPaths(),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    outDir: '../../dist/landing-page',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})
