// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type MascotImageProps = {
	className?: string
	loading?: 'lazy'
	sizes: string
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export function MascotImage({ className, loading, sizes }: MascotImageProps) {
	return (
		<img
			alt='mascot'
			aria-hidden='true'
			className={className}
			decoding='async'
			height={585}
			loading={loading}
			sizes={sizes}
			src='/mascot.webp'
			srcSet='/mascot-320.webp 320w, /mascot.webp 640w'
			width={640}
		/>
	)
}
