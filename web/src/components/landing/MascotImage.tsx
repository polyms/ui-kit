// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type MascotImageProps = {
	className?: string
	loading?: 'lazy'
	sizes: string
	priority?: 'high' | 'low' | 'auto'
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export function MascotImage({ className, loading, sizes, priority }: MascotImageProps) {
	return (
		<img
			alt='mascot'
			aria-hidden='true'
			className={className}
			decoding='async'
			fetchPriority={priority}
			height={585}
			loading={loading}
			sizes={sizes}
			src='/mascot.webp'
			srcSet='/mascot-320.webp 320w, /mascot.webp 640w'
			width={640}
		/>
	)
}
