import { afterEach, describe, expect, it, vi } from 'vitest'

import { track } from './track'

vi.mock('@amplitude/unified', () => ({
	track: vi.fn(),
}))

// ── Tests ──────────────────────────────────────────────────────────────────────────────────────────────────

describe('track', () => {
	afterEach(() => {
		vi.clearAllMocks()
	})

	it('no-ops when the amplitude key is absent', async () => {
		const amplitude = await import('@amplitude/unified')

		track('Copied Install Command', { command: 'pnpm add @polyms/ui-kit' })

		expect(amplitude.track).not.toHaveBeenCalled()
	})
})
