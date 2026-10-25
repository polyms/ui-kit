// ── Helpers ────────────────────────────────────────────────────────────────────────────────────────────────

export function scrollToTop() {
	window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function scrollToHeading(headingId: string) {
	const el = document.getElementById(headingId)
	el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
