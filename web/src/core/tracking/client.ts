import type { AnyRouter } from '@tanstack/react-router'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type SentryModule = typeof import('@sentry/react')

declare global {
	interface Window {
		Sentry: typeof import('@sentry/react')
	}
}

// ── Constants ──────────────────────────────────────────────────────────────────────────────────────────────

const APP_NAME = 'ui-kit'
const dsn = import.meta.env.VITE_SENTRY_DSN

const queuedErrors: unknown[] = []
let sentry: SentryModule | null = null
let sentryStarted = false

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

export function captureException(error: unknown) {
	if (!dsn) return
	if (sentry) {
		sentry.captureException(error)
		return
	}
	queuedErrors.push(error)
}

export function installSentry(router: AnyRouter) {
	if (!dsn || sentryStarted) return
	sentryStarted = true
	scheduleNonCritical(() => {
		void startSentry(router)
	})
}

async function startSentry(router: AnyRouter) {
	const Sentry = await import('@sentry/react')
	window.Sentry = Sentry
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
	Sentry.addIntegration(Sentry.tanstackRouterBrowserTracingIntegration(router))
	Sentry.addIntegration(Sentry.replayIntegration())
	sentry = Sentry
	for (const error of queuedErrors.splice(0)) Sentry.captureException(error)
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
