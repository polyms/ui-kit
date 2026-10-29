import * as amplitude from '@amplitude/unified'

// ── Tracking ───────────────────────────────────────────────────────────────────────────────────────────────

function analyticsEnabled() {
	return typeof window !== 'undefined' && Boolean(import.meta.env.VITE_AMPLITUDE_API_KEY)
}

export function track(event: string, properties?: Record<string, string | number | boolean>) {
	if (!analyticsEnabled()) return
	amplitude.track(event, properties)
}
