import * as amplitude from '@amplitude/unified'
import * as Sentry from '@sentry/react'

// ── Constants ──────────────────────────────────────────────────────────────────────────────────────────────

const APP_NAME = 'ui-kit'
const dsn = import.meta.env.VITE_SENTRY_DSN

// ── Init ───────────────────────────────────────────────────────────────────────────────────────────────────

if (dsn) {
	Sentry.init({
		dsn,
		environment: import.meta.env.MODE,
		integrations: [Sentry.replayIntegration()],
		release: __VERSION__,
		replaysOnErrorSampleRate: 1,
		replaysSessionSampleRate: 0.1,
		tracesSampleRate: import.meta.env.PROD ? 0.01 : 1,

		// OAuth authorization codes travel in the query string.
		dataCollection: {
			urlQueryParams: { deny: ['code'] },
		},
	})
	console.debug(`[client] initialized release ${__VERSION__} env ${import.meta.env.MODE}`)
}

const amplitudeApiKey = import.meta.env.VITE_AMPLITUDE_API_KEY
if (!amplitudeApiKey) {
	console.warn('Amplitude API key missing — analytics disabled')
} else if (!globalThis.__amplitudeInitialized) {
	globalThis.__amplitudeInitialized = true
	amplitude.add({
		name: 'ui-kit',
		type: 'enrichment',
		execute: async event => {
			event.event_properties = { ...event.event_properties, app_name: APP_NAME }
			return event
		},
	})
	amplitude.initAll(amplitudeApiKey, {
		analytics: { autocapture: true },
		sessionReplay: { sampleRate: 1 },
	})
}
