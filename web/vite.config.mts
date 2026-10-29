/// <reference types='vitest' />
import { readFileSync } from 'node:fs'
import path from 'node:path'
import mdx from '@mdx-js/rollup'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import tailwindcssVite from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import svgr from 'vite-plugin-svgr'

import { mdxNavigationPlugin } from './plugins/mdxNavigation.plugin.ts'
import { seoPlugin } from './plugins/seo.plugin.ts'
import { stripFrontmatter } from './plugins/stripFrontmatter.plugin.ts'

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8')) as {
	version: string
}

function htmlVersionPlugin(version: string): Plugin {
	return {
		name: 'html-version',
		transformIndexHtml(html) {
			return html.replaceAll('__VERSION__', version)
		},
	}
}

export default defineConfig(({ mode }) => {
	const fileEnv = loadEnv(mode, import.meta.dirname, '')
	const sentryOrg = process.env.SENTRY_ORG || fileEnv.SENTRY_ORG
	const sentryProject = process.env.SENTRY_PROJECT || fileEnv.SENTRY_PROJECT
	const sentryAuthToken = process.env.SENTRY_AUTH_TOKEN || fileEnv.SENTRY_AUTH_TOKEN
	const missingSentry = (['SENTRY_ORG', 'SENTRY_PROJECT', 'SENTRY_AUTH_TOKEN'] as const).filter(
		name => !fileEnv[name] && !process.env[name]
	)
	const canUploadSourcemaps = missingSentry.length === 0

	if (mode === 'production') {
		if (canUploadSourcemaps) {
			console.info(
				`[sentry] uploading source maps org ${sentryOrg} project ${sentryProject} release ${pkg.version}`
			)
		} else {
			console.warn(`[sentry] source map upload skipped, missing ${missingSentry.join(', ')}`)
		}
	}

	return {
		build: {
			commonjsOptions: {
				transformMixedEsModules: true,
			},
			emptyOutDir: true,
			outDir: '../dist/web',
			reportCompressedSize: true,
			sourcemap: canUploadSourcemaps ? 'hidden' : false,
		},
		cacheDir: '../node_modules/.vite/web',
		define: {
			__VERSION__: JSON.stringify(pkg.version),
		},
		plugins: [
			htmlVersionPlugin(pkg.version),
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
			...sentryVitePlugin({
				authToken: sentryAuthToken,
				disable: !canUploadSourcemaps,
				org: sentryOrg,
				project: sentryProject,
				release: { name: pkg.version },
			}),
			seoPlugin(),
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
	}
})
