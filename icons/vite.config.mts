import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, esmExternalRequirePlugin, type UserConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'

import { VIRTUAL_ENTRY } from './plugins/icon-source.mjs'
import { iconOutputFileName, polymsIcons } from './plugins/icons-virtual.plugin'

/** Emit path for preserveModules — glyphs under bold-duotone/, own src flat, deps under vendor/. */
function preservedModuleFileName(facadeModuleId: string | undefined | null, name: string, srcRoot: string) {
  if (!facadeModuleId) return `${name}.mjs`

  const id = facadeModuleId.split('?')[0] ?? facadeModuleId
  const virtual = iconOutputFileName(id)
  if (virtual) return virtual

  if (id === srcRoot || id.startsWith(`${srcRoot}/`) || id.startsWith(`${srcRoot}${path.sep}`)) {
    const rel = path.relative(srcRoot, id).replace(/\.[cm]?[jt]sx?$/, '')
    return `${rel}.mjs`
  }

  const pnpm = id.match(/\/node_modules\/\.pnpm\/[^/]+\/node_modules\/(.+)$/)
  const plain = id.match(/\/node_modules\/(.+)$/)
  const pkgPath = (pnpm?.[1] ?? plain?.[1])?.replace(/\.[cm]?js$/, '')
  if (!pkgPath) return `vendor/${name}.mjs`

  return `vendor/${pkgPath}.mjs`
}

export default defineConfig(() => {
  const outDir = path.join(__dirname, process.env.OUTDIR ?? '../dist/icons')
  const srcRoot = path.resolve(__dirname, 'src')

  return {
    build: {
      cssCodeSplit: false,
      emptyOutDir: true,
      lib: {
        entry: { 'bold-duotone/index': VIRTUAL_ENTRY },
        formats: ['es' as const],
        name: 'icons',
      },
      manifest: true,
      outDir,
      reportCompressedSize: false,
      // Rolldown preserves `require()` for externals; browser bundles need `import`.
      rolldownOptions: {
        // zustand stays external — package dependency, not bundled duplicate.
        external: ['zustand'],
        // Takes precedence over `lib.entry`, which Vite would path-resolve into a missing file.
        input: { 'bold-duotone/index': VIRTUAL_ENTRY },
        output: {
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
      sourcemap: false,
    },
    cacheDir: '../node_modules/.vite/icons',
    plugins: [
      polymsIcons({ library: true, root: __dirname }),
      react(),
      viteStaticCopy({
        targets: [
          { dest: '.', src: 'README.md' },
          { dest: '.', src: 'LICENSE' },
        ],
      }),
      // Hand-written runtime only; the entry declarations come from `polymsIcons({ emitTypes })`.
      dts({
        entryRoot: 'src',
        insertTypesEntry: false,
        outDirs: outDir,
        strictOutput: true,
        tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
      }),
    ],
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
    root: __dirname,
  } satisfies UserConfig
})
