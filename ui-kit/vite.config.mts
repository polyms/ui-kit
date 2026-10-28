import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, esmExternalRequirePlugin, type UserConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'

import pkg from './package.json' with { type: 'json' }

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
	const outDir = path.join(import.meta.dirname, process.env.OUTDIR ?? '../dist/ui-kit')
	const srcRoot = path.resolve(import.meta.dirname, 'src')

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
				name: 'ui-kit',
			},
			manifest: true,
			outDir,
			reportCompressedSize: true,
			// Rolldown preserves `require()` for externals; browser bundles need `import` (see rolldown.rs bundling-cjs).
			// Keep react out of top-level `external` here — handled by esmExternalRequirePlugin's own list.
			rolldownOptions: {
				// Bundled: @base-ui/react (+ its non-external transitive deps under vendor/).
				// External: zustand (optional host install), clsx + @floating-ui (package.json dependencies).
				external: ['zustand', 'clsx', 'use-sync-external-store', /^@floating-ui(\/.*)?$/],
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
		cacheDir: '../node_modules/.vite/ui-kit',
		define: {
			__UI_VERSION__: JSON.stringify(version),
			'process.env.NODE_ENV': JSON.stringify('production'),
		},
		plugins: [
			react(),
			viteStaticCopy({
				targets: [
					{ dest: '.', src: 'package.json' },
					{ dest: '.', src: 'README.md' },
					{ dest: 'styles', rename: { stripBase: 2 }, src: 'src/styles/*' },
					{ dest: '.', src: 'skills' },
					{ dest: '.', src: 'scripts' },
				],
			}),
			tailwindcssVite(),
			dts({
				afterBuild: async () => {
					// Copy @base-ui/react types to dist so consumers resolve them as ui-kit types.
					const fs = await import('node:fs/promises')
					const baseUiPath = path.resolve(import.meta.dirname, '../node_modules/@base-ui/react')
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
				tsconfigPath: path.join(import.meta.dirname, 'tsconfig.lib.json'),
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
		// Configuration for building your library.
		// See: https://vitejs.dev/guide/build.html#library-mode
		resolve: {
			dedupe: ['react', 'react-dom'],
		},
		root: import.meta.dirname,
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
