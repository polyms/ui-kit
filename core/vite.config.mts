import path from 'node:path'
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import react from '@vitejs/plugin-react'
import { defineConfig, esmExternalRequirePlugin, type UserConfig } from 'vite'
import dts from 'vite-plugin-dts'

import pkg from './package.json'

// import federation from './plugins/module-federation.plugin'

const footer = (mode: string, version: string) => `
const styles = [
  'color: #1e0dff',
  'border: 1px dashed #1e0dff',
  'background: #fff',
  'border-radius: .25rem',
  'padding: .25rem .5rem',
  'margin: .25rem','font-weight: bold',].join(';')
console.info(\`%c${pkg.name}%c${mode.toUpperCase()}%c${version}\`, styles, styles, styles)
`

export default defineConfig(async ({ mode }) => {
  const isLocal = process.env.LOCAL === 'true'
  const version = isLocal ? 'local' : pkg.version
  const tailwindcssVite = (await import('@tailwindcss/vite')).default
  const outDir = path.join(__dirname, process.env.OUTDIR ?? '../dist/core')

  return {
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      cssCodeSplit: true,
      emptyOutDir: true,
      lib: {
        // Could also be a dictionary or array of multiple entry points.
        entry: { index: 'src/index.ts', style: 'src/styles/tailwind.css' },
        fileName: (format, entryName) => {
          const extMap: Partial<Record<typeof format, string>> = {
            es: 'mjs',
            umd: 'js',
          }
          return `${entryName}.${extMap[format]}`
        },
        // Change this to the formats you want to support.
        // Don't forget to update your package.json as well.
        formats: ['es' as const],
        name: 'core',
      },
      manifest: true,
      outDir,
      reportCompressedSize: true,
      // Rolldown preserves `require()` for externals; browser bundles need `import` (see rolldown.rs bundling-cjs).
      // Keep react out of top-level `external` here — handled by esmExternalRequirePlugin's own list.
      rolldownOptions: {
        external: ['use-sync-external-store', 'zustand'],
        output: {
          assetFileNames: assetInfo => {
            if (assetInfo.names.some(name => name.endsWith('.css'))) {
              return isLocal ? 'styles.css' : 'styles-[hash].css'
            }
            return '[name]-[hash][extname]'
          },
          chunkFileNames(chunkInfo) {
            if (chunkInfo.name === 'index' && chunkInfo.facadeModuleId) {
              const match = chunkInfo.facadeModuleId.match(/\/([^/]*)(?=\/index.ts)/)
              if (match) return `${match[1]}-[hash].mjs`
            }
            return '[name]-[hash].mjs'
          },
          entryFileNames: '[name].mjs',
          footer: chunk => (chunk.isEntry ? footer(mode, version) : ''),
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'jsxRuntime',
          },
        },
        plugins: [
          esmExternalRequirePlugin({
            external: [/^react(-dom)?(\/.+)?$/],
          }),
        ],
        treeshake: true,
      },
      sourcemap: isLocal,
    },
    cacheDir: '../node_modules/.vite/core',
    define: {
      __UI_VERSION__: JSON.stringify(version),
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
    plugins: [
      react(),
      nxViteTsPaths(),
      nxCopyAssetsPlugin([
        '*.md',
        { glob: '**/*', input: 'src/styles', output: 'styles' },
        { glob: '**/*', input: 'skills', output: 'skills' },
        { glob: '**/*', input: 'scripts', output: 'scripts' },
      ]),
      tailwindcssVite(),
      dts({
        afterBuild: async () => {
          // Copy @base-ui/react types to dist
          const fs = await import('node:fs/promises')
          const baseUiPath = path.resolve(__dirname, '../node_modules/@base-ui/react')
          const destPath = path.join(outDir, 'base')

          const copyDir = async (src: string, dest: string) => {
            await fs.mkdir(dest, { recursive: true })
            const entries = await fs.readdir(src, { withFileTypes: true })

            for (const entry of entries) {
              const srcPath = path.join(src, entry.name)
              const destPath = path.join(dest, entry.name)

              if (entry.isDirectory()) {
                await copyDir(srcPath, destPath)
              } else if (entry.name.endsWith('.d.ts')) {
                await fs.copyFile(srcPath, destPath)
              }
            }
          }

          await copyDir(baseUiPath, destPath)
        },
        // bundledPackages: ['@base-ui/react'],
        beforeWriteFile(filePath, content) {
          const matchs = content.match(/(?:node_modules\/)?@base-ui\/react?/g)
          if (!matchs) return { content, filePath }

          const newPath = path.relative(path.dirname(filePath), `${outDir}/base/`)
          const modifiedContent = content.replaceAll(matchs[0], newPath === 'base' ? './base' : newPath)

          return { content: modifiedContent, filePath }
        },
        clearPureImport: true,
        entryRoot: 'src',
        insertTypesEntry: true,
        outDirs: outDir,
        staticImport: true,
        strictOutput: true,
        tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
      }),
    ].filter(Boolean),
    preview: {
      allowedHosts: ['local.polyms.app'],
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      host: '0.0.0.0',
      port: 6173,
    },
    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },
    // Configuration for building your library.
    // See: https://vitejs.dev/guide/build.html#library-mode
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
    root: __dirname,
    server: {
      host: '0.0.0.0',
      port: 5173,
    },
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData: `@import "src/styles/core.scss";`,
    //     },
    //   },
    // },
    // test: {
    //   watch: false,
    //   globals: true,
    //   environment: 'jsdom',
    //   include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    //   reporters: ['default'],
    //   coverage: {
    //     reportsDirectory: '../coverage/core',
    //     provider: 'v8' as const,
    //   },
    // },
  } satisfies UserConfig
})
