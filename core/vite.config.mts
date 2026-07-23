import path from 'node:path'
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import react from '@vitejs/plugin-react'
import { defineConfig, esmExternalRequirePlugin, type UserConfig } from 'vite'
import dts from 'vite-plugin-dts'

import pkg from './package.json'

// import federation from './plugins/module-federation.plugin'

/** Emit path for preserveModules — own src flat under outDir; deps under base/ or vendor/. */
function preservedModuleFileName(facadeModuleId: string | undefined | null, name: string, srcRoot: string) {
  if (!facadeModuleId) return `${name}.mjs`

  const id = facadeModuleId.split('?')[0] ?? facadeModuleId
  if (id === srcRoot || id.startsWith(`${srcRoot}/`) || id.startsWith(`${srcRoot}${path.sep}`)) {
    const rel = path.relative(srcRoot, id).replace(/\.[cm]?[jt]sx?$/, '')
    return `${rel}.mjs`
  }

  const pnpm = id.match(/\/node_modules\/\.pnpm\/[^/]+\/node_modules\/(.+)$/)
  const plain = id.match(/\/node_modules\/(.+)$/)
  const pkgPath = (pnpm?.[1] ?? plain?.[1])?.replace(/\.[cm]?js$/, '')
  if (!pkgPath) return `vendor/${name}.mjs`

  // Runtime next to cloned @base-ui types under dist/base/
  if (pkgPath === '@base-ui/react' || pkgPath.startsWith('@base-ui/react/')) {
    const sub = pkgPath === '@base-ui/react' ? 'index' : pkgPath.slice('@base-ui/react/'.length)
    return `base/${sub}.mjs`
  }

  return `vendor/${pkgPath}.mjs`
}

export default defineConfig(async () => {
  const isLocal = process.env.LOCAL === 'true'
  const version = isLocal ? 'local' : pkg.version
  const tailwindcssVite = (await import('@tailwindcss/vite')).default
  const outDir = path.join(__dirname, process.env.OUTDIR ?? '../dist/core')
  const srcRoot = path.resolve(__dirname, 'src')

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
      // @base-ui/react, clsx, @floating-ui/react-dom stay bundled so consumers do not install them.
      rolldownOptions: {
        // zustand stays external (programmatic overlay stores); @base-ui + its transitive deps are bundled.
        external: ['zustand'],
        output: {
          assetFileNames: assetInfo => {
            if (assetInfo.names.some(name => name.endsWith('.css'))) {
              return isLocal ? 'styles.css' : 'styles-[hash].css'
            }
            return '[name]-[hash][extname]'
          },
          chunkFileNames: chunk => preservedModuleFileName(chunk.facadeModuleId, chunk.name, srcRoot),
          entryFileNames: chunk => preservedModuleFileName(chunk.facadeModuleId, chunk.name, srcRoot),
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'jsxRuntime',
          },
          preserveModules: true,
          preserveModulesRoot: srcRoot,
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
          // Copy @base-ui/react types to dist so consumers resolve them as core-ui types.
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
          if (!/(?:node_modules\/)?@base-ui\/react/.test(content)) {
            return { content, filePath }
          }

          const newPath = path.relative(path.dirname(filePath), `${outDir}/base`)
          const baseImport = newPath === 'base' || newPath === '' ? './base' : newPath
          const modifiedContent = content.replaceAll(/(?:node_modules\/)?@base-ui\/react/g, baseImport)

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
