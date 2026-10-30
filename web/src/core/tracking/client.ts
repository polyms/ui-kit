import * as Sentry from '@sentry/react'

// ── Constants ──────────────────────────────────────────────────────────────────────────────────────────────

const APP_NAME = 'ui-kit'
const dsn = import.meta.env.VITE_SENTRY_DSN

// ── Init ───────────────────────────────────────────────────────────────────────────────────────────────────

function scheduleNonCritical(task: () => void) {
	if (typeof window === 'undefined') return
	const start = () => {
		const idle = window.requestIdleCallback
		if (typeof idle === 'function') idle(() => task(), { timeout: 4000 })
		else window.setTimeout(task, 2000)
	}
	if (document.readyState === 'complete') start()
	else window.addEventListener('load', start, { once: true })
}

if (dsn) {
	Sentry.init({
		dsn,
		environment: import.meta.env.MODE,
		release: __VERSION__,
		replaysOnErrorSampleRate: 1,
		replaysSessionSampleRate: 0.1,
		tracesSampleRate: import.meta.env.PROD ? 0.01 : 1,

		// OAuth authorization codes travel in the query string.
		dataCollection: {
			urlQueryParams: { deny: ['code'] },
		},
	})
	scheduleNonCritical(() => {
		Sentry.addIntegration(Sentry.replayIntegration())
	})
	console.debug(`[client] initialized release ${__VERSION__} env ${import.meta.env.MODE}`)
}

const amplitudeApiKey = import.meta.env.VITE_AMPLITUDE_API_KEY
if (!amplitudeApiKey) {
	console.warn('Amplitude API key missing — analytics disabled')
} else {
	scheduleNonCritical(() => {
		void startAnalytics(amplitudeApiKey)
	})
}

async function startAnalytics(apiKey: string) {
	if (globalThis.__amplitudeInitialized) return
	globalThis.__amplitudeInitialized = true
	const amplitude = await import('@amplitude/unified')
	amplitude.add({
		name: 'ui-kit',
		type: 'enrichment',
		execute: async event => {
			event.event_properties = { ...event.event_properties, app_name: APP_NAME }
			return event
		},
	})
	await amplitude.initAll(apiKey, {
		analytics: { autocapture: true },
		sessionReplay: { sampleRate: 1 },
	})
}
