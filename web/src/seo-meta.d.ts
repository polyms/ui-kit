declare module 'virtual:seo-meta' {
	import type { SeoPage } from './seo/document'

	export const seoByRoute: Record<string, SeoPage>
}
